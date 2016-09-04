<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Referer;
use App\Lottery;
use App\Http\Controllers\Controller;
use Invisnik\LaravelSteamAuth\SteamAuth;
use Carbon\Carbon;
use App\duel;
use App\duel_bet;
use App\Services\CsgoFast;

class DuelController extends Controller
{
    const INFO_CHANNEL = 'msgChannel';
    const RECEIVE_ITEMS_CHANNEL = 'receiveBetItems.list';
    const WINNER_ITEMS_CHANNEL = 'sendWinnerPrizeDuel.list';

    const NEW_ROOM_CHANNEL = 'newRoom';
    const NEW_JOIN_CHANNEL = 'newJoin';
    const SHOW_DUEL_WINNERS = 'show.duel.winner';
    const USER_LEFT_ROOM_CHANNEL = 'userLeftRoom';
    const PRE_FINISH_CHANNEL = 'pre.finish.duel';

    const DUEL_MAX_ITEMS_COUNT = 15;
    const DUEL_MIN_PRICE = 30;

    public function __construct()
    {
        parent::__construct();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function currentDuels()
    {
        return view('pages.duels');
    }
    /*
     * Возвращает активные игры
     */
    public function getActiveGame(){
        $html = '';
        $duels = duel::where('status',duel::STATUS_PLAYING)->orWhere('status',duel::STATUS_PRE_FINISH)->get();
        foreach($duels as $duel) {
            $html .= view('includes.room', compact('duel'))->render();
        }
        unset($duels);
        return response($html);
    }
    public function sendAjaxDuel(Request $request)
    {
        $id = $request->get('game');
        $duel = duel::where('id',$id)->select('won_items','winner_id')->first();
        if(is_null($duel))
            return response()->json(['text' => 'Дуэли не существует.', 'type' => 'error']);
        $user = User::where('id',$duel->winner_id)->select('steamid64','accessToken')->first();
        $value = [
            'id' => $duel->id,
            'items' => json_decode($duel->won_items),
            'partnerSteamId' => $user->steamid64,
            'accessToken' => $user->accessToken,
            'typeSend' => 1
        ];
        $this->redis->rpush(self::WINNER_ITEMS_CHANNEL, json_encode($value));
        unset($value);
        return response()->json(['type'=>'success']);
    }
    public function sendItemsWeek()
    {
        $lastWeek = new Carbon('last week');
        $duels = duel::where('updated_at','>=',$lastWeek)->where('status_prize',duel::STATUS_PRIZE_SEND_ERROR)->get();
        foreach($duels as $duel)
        {
            $user = User::where('id',$duel->winner_id)->first();
            $value = [
                'id' => $duel->id,
                'items' => json_decode($duel->won_items),
                'partnerSteamId' => $user->steamid64,
                'accessToken' => $user->accessToken,
                'typeSend' => 0
            ];
            $this->redis->rpush(self::WINNER_ITEMS_CHANNEL, json_encode($value));
        }
        return response()->json(['success'=>true,'tradeoffer_count'=>count($duels)]);
    }
    public function viewRoom(Request $request){
        $id = $request->get('id');
        $key = md5('view_room_render_'.$id);
        $duel = duel::where('id',$id)->first();
        if(is_null($duel) || $duel->status == duel::STATUS_NOT_STARTED || $duel->status == duel::STATUS_ERROR)
            return response(['success'=>false,'error'=>'Такой игры нет, или ошибка статуса игры!']);
        $value = '';
        if(\Cache::has($key)) {
            $value = \Cache::get($key);
            if ($value['time'] ===  $duel->updated_at) {
                $value = $value['html'];
            } else {
                $value['time'] = $duel->updated_at;
                $value['html'] = view('includes.roomView', compact('duel'))->render();
                \Cache::put($key,$value,30);
                $value = $value['html'];
            }
        } else {
            $value['time'] = $duel->updated_at;
            $value['html'] = view('includes.roomView', compact('duel'))->render();
            \Cache::put($key,$value,30);
            $value = $value['html'];
        }
        return [
            'success'=>true,
            'html'=>$value
        ];
    }
    public function setPrizeStatus(Request $request){
        $id = $request->get('id');
        $status = $request->get('status');
        duel::where('id',$id)->update(['status_prize'=>$status]);
    }
    public function finishRoom(Request $request){
        $roomId = $request->get('id');
        $duel = duel::where('id',$roomId)->first();
        if(is_null($duel))
            return;
        $user = User::where('id', $duel->winner_id)->select(['accessToken','steamid64'])->first();
        if($duel->status != duel::STATUS_PRE_FINISH)
            return;
        $items = json_decode($duel->won_items,true);
        $room_price = 0; // прайс комнаты
        $comission_price = $duel->price*2*0.1; // предположительная комиссия
        $sendItems = []; // предметы выигрыша
        $tempPrice = 0;  // сколько взяли комиссия
        foreach($items as $key=>$item) {
            $items[$key]['price'] = CsgoFast::getPriceFromCache($item['market_hash_name']);
            if( $items[$key]['price'] )
                $room_price += $items[$key]['price'];
        }
        usort($items,function($a,$b){
            return $b['price']-$a['price'];
        });
        foreach ($items as $item) {
            if($item['price'] > 1.5 && ($tempPrice + $item['price'] < $comission_price)) {
                $tempPrice += $item['price'];
            } else {
                $sendItems[] = $item;
            }
        }
        $value = [
            'id' => $duel->id,
            'items' => $sendItems,
            'partnerSteamId' => $user->steamid64,
            'accessToken' => $user->accessToken
        ];
        $duel->won_items = json_encode($sendItems);
        $duel->price = $room_price;
        $duel->comission = $tempPrice;
        $duel->status = duel::STATUS_FINISHED;
        $duel->save();
        $this->redis->rpush(self::WINNER_ITEMS_CHANNEL, json_encode($value));
        $returnValue = [
            'roomId' => $duel->id,
            'steamId' => $user->steamid64,
            'html' => view('includes.room', compact('duel'))->render()
        ];
        $this->redis->publish(self::SHOW_DUEL_WINNERS, json_encode($returnValue));
    }
    public function setReceiveStatus(Request $request)
    {
        $id = $request->get('id');
        $status = $request->get('status');
        $bet = duel_bet::where('id',$id)->select(['id','game_id','user_id','status'])->first();
        if($status == $bet->status)
            return;
        $bet->status = $status;
        $bet->save();
        $bet = $bet->toArray();
        $bets = duel_bet::where('game_id',$bet['game_id'])->count();
        if($bets == 1) {
            $items = urldecode($request->get('items'));
            if($status == duel_bet::STATUS_ACCEPTED) {
                $duel = duel::where('id',$bet['game_id'])->first();
                $duel->status = duel::STATUS_PLAYING;
                $duel->won_items = $items;
                $duel->save();
                $user = User::where('id',$bet['user_id'])->select(['steamid64'])->first()->toArray();
                $returnValue = [
                    'betId' => $bet['id'],
                    'roomId' => $bet['game_id'],
                    'steamId' => $user['steamid64'],
                    'html' => view('includes.room', compact('duel'))->render()
                ];
                $this->redis->publish(self::NEW_ROOM_CHANNEL, json_encode($returnValue));
            } elseif ($status == duel_bet::STATUS_DECLINED || $status == duel_bet::STATUS_SENT_ERROR) {
                duel::where('id',$bet['game_id'])->update(['status'=>duel::STATUS_ERROR]);
            }
        } else {
            if($status === duel_bet::STATUS_WAIT_TO_ACCEPT) {
                $duel = duel::where('id',$bet['game_id'])->first();
                $user = User::where('id',$bet['user_id'])->select(['steamid64'])->first()->toArray();
                $returnValue = [
                    'betId' => $bet['id'],
                    'roomId' => $bet['game_id'],
                    'steamId' => $user['steamid64'],
                    'html' => view('includes.room', compact('duel'))->render()
                ];
                $this->redis->publish(self::NEW_JOIN_CHANNEL, json_encode($returnValue));
                return;
            } else if($status == duel_bet::STATUS_SENT_ERROR || $status == duel_bet::STATUS_DECLINED) {
                $duel = duel::where('id',$bet['game_id'])->first();
                $user = User::where('id',$bet['user_id'])->select(['steamid64'])->first()->toArray();
                $returnValue = [
                    'betId' => $bet['id'],
                    'roomId' => $bet['game_id'],
                    'steamId' => $user['steamid64'],
                    'html' => view('includes.room', compact('duel'))->render()
                ];
                $this->redis->publish(self::NEW_JOIN_CHANNEL, json_encode($returnValue));
            }
            $bets = duel_bet::where('game_id',$bet['game_id'])->where('status',duel_bet::STATUS_ACCEPTED)->select('price','coin','user_id')->get()->toArray();
            if(count($bets)==2) {
                $duel = duel::where('id', $bet['game_id'])->first();
                if($duel->status == duel::STATUS_PLAYING) {
                    $duel->status = duel::STATUS_PRE_FINISH;
                    $duel->save();
                    $total_price = $bets[0]['price'] + $bets[1]['price'];

                    if($bets[0]['coin'] == 0){
                        if($bets[0]['price'] / $total_price > $duel->rand_number)
                            $duel->winner_id = $bets[0]['user_id'];
                        else
                            $duel->winner_id = $bets[1]['user_id'];
                    } else if ($bets[1]['coin'] == 0){
                        if($bets[1]['price'] / $total_price > $duel->rand_number)
                            $duel->winner_id = $bets[1]['user_id'];
                        else
                            $duel->winner_id = $bets[0]['user_id'];
                    }
                    $first = json_decode($duel->won_items);
                    $second = json_decode(urldecode($request->get('items')));
                    $third = array_merge($first,$second);
                    $duel->won_items = json_encode($third);
                    $duel->save();
                    $returnValue = [
                        'roomId' => $bet['game_id'],
                        'html' => view('includes.room', compact('duel'))->render()
                    ];
                    $this->redis->publish(self::PRE_FINISH_CHANNEL, json_encode($returnValue));
                }
            }
        }
    }
    public function receiveOffer(Request $request)
    {
        $type = $request->get('type');
        if($type == 'joinRoom') {
            $round_id = $request->get('id');
            if(!$round_id)
                return response()->json(['success'=>false,'error'=>'Не верная комната!']);
            $game = duel::where('id',$round_id)->where('status',duel::STATUS_PLAYING)->first();
            if(is_null($game))
                return response()->json(['success'=>false,'error'=>'Комната не существует, или уже занята или завершена!']);
            $count = duel_bet::where('game_id',$round_id)->where(function($query){
                $query->where('status',duel_bet::STATUS_WAIT_TO_ACCEPT)
                    ->orWhere('status',duel_bet::STATUS_ACCEPTED)
                    ->orWhere('status',duel_bet::STATUS_WAIT_TO_SENT);
            })->count();
            if($count != 1)
                return response()->json(['success'=>false,'error'=>'Данная комната уже занята!']);
        } else if($type != 'createRoom')
            return response()->json(['success'=>false,'error'=>'Ошибка типа запроса!']);
        $items = $request->get('items');
        $items = json_decode($items,true);
        if (!$items)
            return response()->json(['success'=>false,'error'=>'Ошибка предметов.']);
        $userInv = file_get_contents('https://steamcommunity.com/profiles/'.$this->user->steamid64.'/inventory/json/730/2');
        $userInv = json_decode($userInv,true);
        if(!$userInv['success'])
            return response()->json(['success'=>false,'error'=>'Ошибка загрузки инвентаря.']);
        if(count($items) > self::DUEL_MAX_ITEMS_COUNT)
            return response()->json(['success'=>false,'error'=>'Вы выбрали слишком много предметов.']);
        $total_price = 0;
        $d_items = [];
        foreach ($items as $item) {
            if(!isset($userInv['rgInventory'][$item]) || !$userInv['rgDescriptions'][$userInv['rgInventory'][$item]['classid'].'_'.$userInv['rgInventory'][$item]['instanceid']]
            )
                return response()->json(['success'=>false,'error'=>'У вас нету таких предметов!']);
            $d_item = $userInv['rgDescriptions'][$userInv['rgInventory'][$item]['classid'].'_'.$userInv['rgInventory'][$item]['instanceid']];
            $d_item['price'] = CsgoFast::getPriceFromCache($d_item['market_hash_name']);
            $s_item['price'] = $d_item['price'];
            if(strpos($d_item['type'], 'Container') !== false)
                return response()->json(['success'=>false,'error'=>'Извините, но на сайте запрещены кейсы!']);
            $s_item['market_hash_name'] = $d_item['market_hash_name'];
            $s_item['id'] = $item;
            $s_item['classId'] = $d_item['classid'];
            if(!$d_item['price'])
                return response()->json(['success'=>false,'error'=>'Извините, данный предмет запрещен: '.$item['market_hash_name']]);
            $total_price += $d_item['price'];
            $d_items[] = $s_item;
        }
        unset($userInv);
        if($type == 'createRoom') {
            if($total_price<self::DUEL_MIN_PRICE)
                return response()->json(['success'=>false,'error'=>'Минимальная сумма депозита для создания комнаты: '.self::DUEL_MIN_PRICE.' руб.']);
            $rand_number = "0.".mt_rand(100000000,999999999).mt_rand(100000000,999999999);

            $game = new duel;
            $game->status = duel::STATUS_NOT_STARTED;
            $game->rand_number = $rand_number;
            $game->price = $total_price;
            $game->secret = substr(md5(uniqid(rand(), true)),0,8);
            $coin = (boolean) \Request::get('coin');
            $game->save();
            $duel_bet = new duel_bet;
            $duel_bet->user_id = \Auth::user()->id;
            $duel_bet->game_id = $game->id;
            $duel_bet->items = json_encode($d_items);
            $duel_bet->itemsCount = count($d_items);
            $duel_bet->coin = $coin;
            $duel_bet->price = $total_price;
            $duel_bet->status = duel_bet::STATUS_WAIT_TO_SENT;
            $duel_bet->save();
            $value = [
                'id' => $duel_bet->id,
                'items' => $d_items,
                'hash' => md5($game->secret.':'.$game->rand_number),
                'partnerSteamId' => $this->user->steamid64,
                'accessToken' => $this->user->accessToken
            ];
            $this->redis->rpush(self::RECEIVE_ITEMS_CHANNEL, json_encode($value));
            return response()->json(['success'=>true,'text'=>'Вы успешно создали комнату, примите стимоффер!']);
        } else {
            $count = duel_bet::where('game_id',$round_id)->where(function($query){
                $query->where('status',duel_bet::STATUS_WAIT_TO_ACCEPT)
                    ->orWhere('status',duel_bet::STATUS_ACCEPTED)
                    ->orWhere('status',duel_bet::STATUS_WAIT_TO_SENT);
            })->count();
            if($count != 1)
                return response()->json(['success'=>false,'error'=>'Данная комната уже занята!']);
            $host_bet = duel_bet::where('game_id',$round_id)->where('status',duel_bet::STATUS_ACCEPTED)->first();
            if($total_price>$host_bet->price*0.9 && $total_price < $host_bet->price*1.1){
                $duel_bet = new duel_bet;
                $duel_bet->user_id = \Auth::user()->id;
                $duel_bet->game_id = $round_id;
                $duel_bet->items = json_encode($d_items);
                $duel_bet->itemsCount = count($d_items);
                $duel_bet->coin = !$host_bet->coin;
                $duel_bet->price = $total_price;
                $duel_bet->status = duel_bet::STATUS_WAIT_TO_SENT;
                $duel_bet->save();
                $value = [
                    'id' => $duel_bet->id,
                    'items' => $d_items,
                    'partnerSteamId' => $this->user->steamid64,
                    'hash' => md5($game->secret.':'.$game->rand_number),
                    'accessToken' => $this->user->accessToken
                ];
                $this->redis->rpush(self::RECEIVE_ITEMS_CHANNEL, json_encode($value));
                return response()->json(['success'=>true,'text'=>'Вы успешно вошли в комнату, примите стимоффер!']);
            }else{
                return response()->json(['success'=>false,'error'=>'Вам не хватает или вы выбрали слишком много предметов']);
            }
        }
    }
}
