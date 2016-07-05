<?php

namespace App\Http\Controllers;

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
    const RECEIVE_ITEMS_CHANNEL = 'receiveBetItems.list';
    const WINNER_ITEMS_CHANNEL = 'sendWinnerPrizeDuel.list';

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
    public function checkOffer(){
        $id = \Request::get('id');
        
    }
    public function setReceiveStatus()
    {
        $id = \Request::get('id');
        $status = \Request::get('status');
        $bet = duel_bet::where('id',$id)->first();
        $bet->status = $status;
        $bet->save();
        $bets = duel_bet::where('game_id',$bet->game_id)->count();
        if($bets == 1) {
            duel::where('id',$bet->game_id)->update(['status',duel::STATUS_PLAYING]);
        } else {
            duel::where('id',$bet->game_id)->update(['status',duel::STATUS_PRE_FINISH]);
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
        } else {
            //joinRoom
        }
    }
}
