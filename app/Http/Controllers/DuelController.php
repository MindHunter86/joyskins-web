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


    private $steamAuth;

    const INFO_CHANNEL = 'msgChannel';
    const RECEIVE_ITEMS_CHANNEL = 'receiveBetItems.list';
    const WINNER_ITEMS_CHANNEL = 'sendWinnerPrizeDuel.list';

    const NEW_ROOM_CHANNEL = 'newRoom';
    const NEW_JOIN_CHANNEL = 'newJoin';
    const SHOW_DUEL_WINNERS = 'show.duel.winner';
    const USER_LEFT_ROOM_CHANNEL = 'userLeftRoom';
    const PRE_FINISH_CHANNEL = 'pre.finish.duel';

    const DUEL_MAX_ITEMS_COUNT = 15;
    const DUEL_MIN_PRICE = 15;

    public function __construct(SteamAuth $auth)
    {
        parent::__construct();
        $this->steamAuth = $auth;
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
    public function viewRoom(){
        $id = \Request::get('id');
        $duel = duel::where('id',$id)->first();
        if(is_null($duel) || $duel->status == duel::STATUS_NOT_STARTED || $duel->status == duel::STATUS_ERROR)
            return response(['success'=>false,'error'=>'Такой игры нет, или ошибка статуса игры!']);
        return [
            'success'=>true,
            'html'=>view('includes.roomView', compact('duel'))->render()
        ];
    }
    public function setPrizeStatus(){
        $id = \Request::get('id');
        $status = \Request::get('status');
        duel::where('id',$id)->update(['status_prize'=>$status]);
    }
    public function finishRoom(){
        $roomId = \Request::get('id');
        $duel = duel::where('id',$roomId)->first();
        $user = User::where('id', $duel->winner_id)->first();
        if($duel->status != duel::STATUS_PRE_FINISH)
            return;
        $items = json_decode($duel->won_items,true);
        $room_price = 0; // прайс комнаты
        $comission_price = $duel->price*2*0.1; // предположительная комиссия
        $sendItems = []; // предметы выигрыша
        $tempPrice = 0;  // сколько взяли комиссии
        foreach($items as $item) {
            $itemInfo = new CsgoFast($item);
            if($itemInfo->price )
            {
                $room_price += $itemInfo->price;
                if($itemInfo->price > 1.5 && ($tempPrice + $itemInfo->price < $comission_price)) {
                    $tempPrice += $itemInfo->price;
                } else {
                    $sendItems[] = $item;
                }
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
    public function setReceiveStatus()
    {
        $id = \Request::get('id');
        $status = \Request::get('status');
        $bet = duel_bet::where('id',$id)->first();
        if($status == $bet->status)
            return;
        $bet->status = $status;
        $bet->save();
        $bets = duel_bet::where('game_id',$bet->game_id)->count();
        if($bets == 1) {
            $items = urldecode(\Request::get('items'));
            if($status == duel_bet::STATUS_ACCEPTED) {
                duel::where('id', $bet->game_id)->update(['status' => duel::STATUS_PLAYING, 'won_items' => $items]);
                $duel = duel::where('id',$bet->game_id)->first();
                $user = User::where('id',$bet->user_id)->first();
                $returnValue = [
                    'betId' => $bet->id,
                    'roomId' => $bet->game_id,
                    'steamId' => $user->steamid64,
                    'html' => view('includes.room', compact('duel'))->render()
                ];
                $this->redis->publish(self::NEW_ROOM_CHANNEL, json_encode($returnValue));
            } elseif ($status == duel_bet::STATUS_DECLINED || $status == duel_bet::STATUS_SENT_ERROR) {
                duel::where('id',$bet->game_id)->update(['status'=>duel::STATUS_ERROR]);
            }
        } else {
            if($status == duel_bet::STATUS_WAIT_TO_ACCEPT) {
                $duel = duel::where('id',$bet->game_id)->first();
                $user = User::where('id',$bet->user_id)->first();
                $returnValue = [
                    'betId' => $bet->id,
                    'roomId' => $bet->game_id,
                    'steamId' => $user->steamid64,
                    'html' => view('includes.room', compact('duel'))->render()
                ];
                $this->redis->publish(self::NEW_JOIN_CHANNEL, json_encode($returnValue));
                return;
            } else if($status == duel_bet::STATUS_SENT_ERROR || $status == duel_bet::STATUS_DECLINED) {
                $duel = duel::where('id',$bet->game_id)->first();
                $user = User::where('id',$bet->user_id)->first();
                $returnValue = [
                    'betId' => $bet->id,
                    'roomId' => $bet->game_id,
                    'steamId' => $user->steamid64,
                    'html' => view('includes.room', compact('duel'))->render()
                ];
                $this->redis->publish(self::NEW_JOIN_CHANNEL, json_encode($returnValue));
            }
            $bets = duel_bet::where('game_id',$bet->game_id)->where('status',duel_bet::STATUS_ACCEPTED)->get();
            if(count($bets)==2) {
                $duel = duel::where('id', $bet->game_id)->first();
                if($duel->status == duel::STATUS_PLAYING) {
                    $duel->status = duel::STATUS_PRE_FINISH;
                    if (($bets[0]->coin && $duel->rand_number > 0.5) || (!$bets[0]->coin && $duel->rand_number < 0.5)) {
                        $duel->winner_id = $bets[0]->user_id;
                    } else {
                        $duel->winner_id = $bets[1]->user_id;
                    }
                    $first = json_decode($duel->won_items);
                    $second = json_decode(urldecode(\Request::get('items')));
                    $third = array_merge($first,$second);
                    $duel->won_items = json_encode($third);
                    $duel->save();
                    $returnValue = [
                        'roomId' => $bet->game_id,
                        'html' => view('includes.room', compact('duel'))->render()
                    ];
                    $this->redis->publish(self::PRE_FINISH_CHANNEL, json_encode($returnValue));
                }
            }
        }
    }
    public function receiveOffer()
    {
        $type = \Request::get('type');
        if($type == 'joinRoom') {
            $round_id = \Request::get('id');
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
        } else if($type == 'createRoom') {

        } else
            return response()->json(['success'=>false,'error'=>'Ошибка типа запроса!']);
        $items = \Request::get('items');
        $items = json_decode($items,true);
        if (!$items)
            return response()->json(['success'=>false,'error'=>'Ошибка предметов.']);
        $userInv = file_get_contents('https://steamcommunity.com/profiles/'.\Auth::user()->steamid64.'/inventory/json/730/2');
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
            $itemInfo = new CsgoFast($d_item);
            $d_item['price'] = $itemInfo->price;
            $s_item['price'] = $d_item['price'];
            $s_item['market_hash_name'] = $d_item['market_hash_name'];
            $s_item['id'] = $item;
            $s_item['classId'] = $d_item['classid'];
            if(!$d_item['price'])
                return response()->json(['success'=>false,'error'=>'Извините, данный предмет запрещен: '.$item['market_hash_name']]);
            $total_price += $d_item['price'];
            $d_items[] = $s_item;
        }
        if($type == 'createRoom') {
            if($total_price<self::DUEL_MIN_PRICE)
                return response()->json(['success'=>false,'error'=>'Минимальная сумма депозита для создания комнаты: '.self::DUEL_MIN_PRICE]);
            $rand_number = "0.".mt_rand(100000000,999999999).mt_rand(100000000,999999999);
            $game = new duel;
            $game->status = duel::STATUS_NOT_STARTED;
            $game->rand_number = $rand_number;
            $game->price = $total_price;
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
