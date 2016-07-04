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
        $items = json_decode($items);
        if (!$items)
            return response()->json(['success'=>false,'error'=>'Ошибка предметов.']);
        $userInv = file_get_contents('https://steamcommunity.com/profiles/76561198297166864/inventory/json/730/2');
        $userInv = json_decode($userInv);
        if(!$userInv->success)
            return response()->json(['success'=>false,'error'=>'Ошибка загрузки инвентаря.']);
        if(count($items) > self::DUEL_MAX_ITEMS_COUNT)
            return response()->json(['success'=>false,'error'=>'Вы выбрали слишком много предметов.']);
        $total_price = 0;
        foreach ($items as $item) {
            if(!$userInv->rgInventory[$item]||!$userInv->rgDescriptions[$userInv->rgInventory[$item]->classid.'_'.$userInv->rgInventory[$item]->instanceid])
                return response()->json(['success'=>false,'error'=>'У вас нету таких предметов!']);
            $d_item = $userInv['rgDescriptions'][$userInv['rgInventory'][$item]['classid'].'_'.$userInv['rgInventory'][$item]['instanceid']];
            $itemInfo = new CsgoFast($d_item);
            $item['price'] = $itemInfo->price;
            $item['name'] = $d_item['market_hash_name'];
            if(!$item['price'])
                return response()->json(['success'=>false,'error'=>'Извините, данный предмет запрещен: '.$item['market_hash_name']]);
            $total_price += $item['price'];
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
            $duel_bet->items = json_decode($items);
            $duel_bet->itemsCount = count($items);
            $duel_bet->coin = $coin;
            $duel_bet->price = $total_price;
            $duel_bet->status = duel_bet::STATUS_WAIT_TO_SENT;
            $duel_bet->save();
            
        } else {
            //joinRoom
        }
    }
}
