<?php

namespace App\Http\Controllers;

use App\Bet;
use App\Game;
use App\Item;
use App\Players;
use App\Lottery;
use App\Referer;
use App\Services\CsgoFast;
use App\Services\BackPack;
use App\Ticket;
use App\User;
use App\Bonus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Invisnik\LaravelSteamAuth\SteamAuth;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class GameController extends Controller
{
    const SECRET_KEY    = 'oDWx4GYTr4Acbdms';
    const BOT_TRADE_LINK    = 'https://steamcommunity.com/tradeoffer/new/?partner=325864551&token=zco-sm1t';

    const MIN_PRICE     = 20;                    # Минимальная ставка
    const MAX_ITEMS     = 16;                   # Максимальное кол-во предметов в ставке
    const COMMISSION    = 10;                   # Комиссия
    const COMMISSION_FOR_FIRST_PLAYER    = 7;   # Комиссия для первого игрока сделавшего ставку.
    const APPID         = 730;                  # AppID игры: 570 - Dota2, 730 - CS:GO

    const SEND_OFFERS_LIST = 'send.offers.list';
    const NEW_BET_CHANNEL = 'newDeposit';
    const BET_DECLINE_CHANNEL = 'depositDecline';
    const INFO_CHANNEL = 'msgChannel';
    const SHOW_WINNERS = 'show.winners';

    const SHOW_LOTTERY_WINNERS = 'show.lottery.winners';
    const ADD_LOTTERY_ITEMS = 'lottery.additems';
    const NEW_PLAYER_CHANNEL = 'newPlayer';
    const SEND_OFFERS_LIST_LOTTERY = 'send.offers.list.lottery';
    public $redis;
    public $game;
    public $lottery;
    public $comission;//

    private static $chances_cache = [];

    public function __construct()
    {
        parent::__construct();
        $this->game = $this->getLastGame();
        $this->lottery = $this->getLastLottery();
        $this->redis->set('current.game', $this->game->id);
    }

    public function deposit()
    {
        return redirect(self::BOT_TRADE_LINK);
    }

    public function currentGame()
    {
        Referer::referer();
        //$lottery = Lottery::orderBy('id', 'desc')->first();
        //$lottery->items = json_decode($lottery->items);
        $lottery = Lottery::where('status', 0)->orderBy('id', 'desc')->first();
        if(!is_null($lottery)) {
            $lottery->items = json_decode($lottery->items);
            $players = $lottery->players()->with(['user','lottery'])->get()->sortByDesc('created_at');
        }
        $game = Game::orderBy('id', 'desc')->first();
        $bets = $game->bets()->with(['user','game'])->get()->sortByDesc('to');
        $percents = $this->_getChancesOfGame($game, true);
        $user_chance = $this->_getUserChanceOfGame($this->user, $game);
        if(!is_null($this->user))
            $user_items = $this->user->itemsCountByGame($game);
        return view('pages.index', compact('game', 'bets', 'user_chance','percents', 'user_items', 'lottery', 'players'));
    }

    public function getLastGame()
    {
        $game = Game::orderBy('id', 'desc')->first();
        if(is_null($game)) {
            $game = $this->newGame();
        }
        return $game;
    }
    public function getLastLottery()
    {
        $lottery = Lottery::orderBy('id', 'desc')->first();
        if(is_null($lottery)) {
            $lottery = $this->newLottery();
        }
        return $lottery;
    }


    public function getCurrentGame()
    {
        $this->game->winner;
        return $this->game;
    }
    public function getCurrentLottery()
    {
        $this->lottery->winner;
        return $this->lottery;
    }

    public function getWinners()
    {
        /*if($this->game->price > 700) {
            $rand_number = "0.97".mt_rand(1000000,9999999).mt_rand(100000000,999999999);
            $this->game->rand_number = $rand_number;
            $this->game->save();
            $this->addTicketFake();
            $this->addTicketFake();
        }*/
        $us = $this->game->usersNoBot();
        /*$us = $us->filter(function ($item) {
            return $item->steamid64 != '0000000000000';
        });*/
        $lastBet = Bet::where('game_id', $this->game->id)->orderBy('to', 'desc')->first();
        $winTicket = round($this->game->rand_number * $lastBet->to);

        $winningBet = Bet::where('game_id', $this->game->id)->where('from', '<=', $winTicket)->where('to', '>=', $winTicket)->first();

        $this->game->winner_id      = $winningBet->user_id;
        $this->game->status         = Game::STATUS_FINISHED;
        $this->game->finished_at    = Carbon::now();
        $this->game->won_items      = json_encode($this->sendItems($this->game->bets, $this->game->winner));
        $this->game->comission      = $this->comission;
        $this->game->save();

        $returnValue = [
            'game'   => $this->game,
            'winner' => $this->game->winner,
            'round_number' => $this->game->rand_number,
            'ticket' => $winTicket,
            'tickets' => ($this->game->price * 100),
            'users' => $us,
            'chance' => $this->_getUserChanceOfGame($this->game->winner, $this->game)
        ];

        return response()->json($returnValue);
    }
    public function getWinnersLottery()
    {
        $us = $this->lottery->users();

        $lastBet = Players::where('lottery_id', $this->lottery->id)->orderBy('to', 'desc')->first();
        $winTicket = round($this->lottery->rand_number * $lastBet->to);

        $winningBet = Players::where('lottery_id', $this->lottery->id)->where('from', '<=', $winTicket)->where('to', '>=', $winTicket)->first();

        $this->lottery->winner_id      = $winningBet->user_id;
        $this->lottery->status         = Game::STATUS_FINISHED;
        $this->lottery->finished_at    = Carbon::now();
        $this->lottery->save();

        $this->sendItemsLottery($this->lottery->items, $this->lottery->winner);
        $returnValue = [
            'game'   => $this->lottery,
            'winner' => $this->lottery->winner,
            'round_number' => $this->lottery->rand_number,
            'players'   => $this->lottery->players,
            'ticket' => $winTicket,
            'tickets' => ($this->lottery->price * 100)
        ];

        return response()->json($returnValue);
    }

    public function sendItemsLottery($bets, $user) {

        $value = [
            'appId' => self::APPID,
            'steamid' => $user->steamid64,
            'accessToken' => $user->accessToken,
            'items' => $bets,
            'game' => $this->lottery->id
        ];
        $this->redis->rpush(self::SEND_OFFERS_LIST_LOTTERY, json_encode($value));
        return $bets;
    }
    public function _sortCommission($notUserItems) {
        $items = [];
        $price = [];
        foreach($notUserItems as $item) {
            $items[] = $item;
            $price[] = $item['price'];
        }
        array_multisort($price, SORT_DESC, $items);
        return $items;
    }
    public function sendItems($bets, $user) {
        $itemsInfo = [];
        $items = [];
        $commission = self::COMMISSION;
        $commissionItems = [];
        $returnItems = [];
        $tempPrice = 0;
        $bonus = null;
        //$firstBet = Bet::where('game_id', $this->game->id)->orderBy('created_at', 'asc')->first();
        //if($firstBet->user == $user) $commission = self::COMMISSION_FOR_FIRST_PLAYER;
        $commissionPrice = round(($this->game->price / 100) * $commission);

        foreach($bets as $bet){
            $betItems = json_decode($bet->items, true);
            foreach($betItems as $item){
                    //(Отдавать всю ставку игроку обратно)
                $itemsInfo[] = $item;
                if($bet->user == $user) {
                    if(isset($item['classid'])) {
                        if($item['classid'] != "1111111111")
                            $returnItems[] = $item['classid'];
                    }else{
                        $user->money = $user->money + $item['price'];
                    }
                }else {
                    $items[] = $item;
                }
            }
        }

        foreach($items as $item){
            if($item['price'] < 1) $item['price'] = 1;
            if(($item['price'] >= 5) && ($tempPrice+$item['price'] < $commissionPrice)) {
                if(isset($item['classid'])) {
                    if($item['classid'] != "1111111111") {
                        $commissionItems[] = $item;
                        $tempPrice = $tempPrice + $item['price'];
                        if($item['price'] <= 17 && count($bonus) < 2) {
                            $bonus[] = $item; 
                        }
                    }
                } else {
                    $commissionItems[] = $item;
                    $tempPrice = $tempPrice + $item['price'];
                }
            } else{
                if(isset($item['classid'])) {
                    if($item['classid'] != "1111111111")
                        $returnItems[] = $item['classid'];
                }else{
                    $user->money = $user->money + $item['price'];
                }
            }
        }
        $this->comission = $tempPrice;

        $user->save();

        $value = [
            'appId' => self::APPID,
            'steamid' => $user->steamid64,
            'accessToken' => $user->accessToken,
            'items' => $returnItems,
            'game' => $this->game->id
        ];
        if(!is_null($bonus)) {
            foreach($bonus as $bon) {
                if(!isset($bon['market_hash_name']))
                    $bon['market_hash_name'] = 'Undefined';
                if(!isset($bon['name']))
                    $bon['name'] = 'Undefined';
                if(!isset($bon['rarity']))
                    $bon['rarity'] = 'Undefined';
                Bonus::create([
                    'name' => $bon['name'],
                    'market_hash_name' => $bon['market_hash_name'],
                    'classid' => $bon['classid'],
                    'price' => $bon['price'],
                    'rarity' => $bon['rarity']
                ]);
            }
        }
        if(count($returnItems) > 0) {
            $this->redis->rpush(self::SEND_OFFERS_LIST, json_encode($value));
        }
        if(count($commissionItems) > 0) {
            $this->redis->rpush(self::ADD_LOTTERY_ITEMS, json_encode($commissionItems));
        }
        return $itemsInfo;
    }

    public function newGame()
    {
        $rand_number = "0.".mt_rand(0,9).mt_rand(10000000,99999999).mt_rand(100000000,999999999);
        //$rand_number = "0.10".mt_rand(1000000,9999999).mt_rand(100000000,999999999);
        $game = Game::create(['rand_number' => $rand_number]);
        //$game->rand_number = "0.".mt_rand(100000000,999999999).mt_rand(100000000,999999999);
        $game->hash = md5($rand_number);
        $game->today = Game::gamesToday();
        $game->userstoday = Game::usersToday();
        $game->maxwin = Game::maxPriceToday();
        $this->redis->set('current.game', $game->id);
        return $game;
    }
    public function acceptLottery(SteamAuth $auth) {
        $steamAuth = $auth;
        $steamAuth->steamId = $this->user->steamid64;
        $steamInfo = $steamAuth->parseInfo();
        $steamInfo = $steamAuth->getUserInfo();

        $this->user->username = $steamInfo->getNick();
        $this->user->save();

        if(stripos($this->user->username, 'joyskins.top') === false) {
            return response()->json(['success' => false, 'msg' => 'Для участия в розыгрыше, вы должны добавить в свой ник домен нашего сайта - joyskins.top']);
        }
        if($this->lottery->players >= $this->lottery->max) {
            return response()->json(['success' => false, 'msg' => 'Все места заняты!']);
        }
        $gamesCount = Bet::where('user_id', $this->user->id)->count();
        if($gamesCount < 1) {
            return response()->json(['success' => false, 'msg' => 'Вы должны сделать хотябы 1 депозит на сайте!']);
        }
        /*if($this->user->is_admin == 0) {
            return response()->json(['success' => false, 'msg' => 'В данный момент только администрация может учавствовать!']);
        }*/
        $player = Players::where('user_id', $this->user->id)->where('lottery_id', $this->lottery->id)->first();

        if(!is_null($player)) {
            return response()->json(['success' => false, 'msg' => 'Вы уже участвуете в этой раздаче!']);
        }
        $lastBet = Players::where('lottery_id', $this->lottery->id)->orderBy('to', 'desc')->first();
        $ticketFrom = 0;
        $ticketTo = 1;
        if(!is_null($lastBet)) {
            $ticketFrom = $lastBet->to + 1;
            $ticketTo = $ticketFrom + 1;
        }
        $players = new Players();   
        $players->user()->associate($this->user);
        $players->from = $ticketFrom;
        $players->to = $ticketTo;
        $players->lottery()->associate($this->lottery);
        $players->save();

        $this->lottery->players = $this->lottery->players + 1;
        $newPlayer = [
            'players' => $this->lottery->players,
            'user' => $this->user
        ];
        $this->redis->publish(self::NEW_PLAYER_CHANNEL, json_encode($newPlayer));

        if($this->lottery->players == $this->lottery->max) {
            $this->lottery->status = Game::STATUS_FINISHED;
            $this->redis->publish(self::SHOW_LOTTERY_WINNERS, true);
        }   
        $this->lottery->save();
        $responseSite = [
            'success' => true,
            'players' => $this->lottery->players
        ];
        return response()->json($responseSite);
    }
    public function newLottery()
    {
        $rand_number = "0.".mt_rand(0,9).mt_rand(10000000,99999999).mt_rand(100000000,999999999);
        $newBet = Bonus::first();
        if(is_null($newBet)) {
            return response()->json(['success' => false]);
        }
        $create = new Lottery();
        $create->rand_number = $rand_number;
        $create->items = json_encode($newBet);
        $create->price = $newBet->price;
        $create->max = round($newBet->price * 8);
        $create->save();

        $lottery = [
            'max' => $create->max,
            'items' => json_encode($newBet),
            'hash' => md5($rand_number),
            'id' => $create->id,
            'success' => true
        ];
        $newBet->delete();

        $this->redis->set('current.lottery', $lottery['id']);
        return response()->json($lottery);
    }

    public function checkOffer()
    {
        $data = $this->redis->lrange('check.list', 0, -1);
        foreach($data as $offerJson) {
            $offer = json_decode($offerJson);
            $accountID = $offer->accountid;
            $items = json_decode($offer->items, true);
            $itemsCount = count($items);

            $user = User::where('steamid64', $accountID)->first();
            if (is_null($user)) {
                $this->redis->lrem('usersQueue.list', 1, $accountID);
                $this->redis->lrem('check.list', 0, $offerJson);
                $this->redis->rpush('decline.list', $offer->offerid);
                continue;
            }
            $totalItems = $user->itemsCountByGame($this->game);
            if ($itemsCount > self::MAX_ITEMS /*|| $totalItems > self::MAX_ITEMS || ($itemsCount+$totalItems) > self::MAX_ITEMS*/) {
                $this->_responseErrorToSite('Максимальное кол-во предметов для депозита - ' . self::MAX_ITEMS, $accountID, self::BET_DECLINE_CHANNEL);
                $this->redis->lrem('usersQueue.list', 1, $accountID);
                $this->redis->lrem('check.list', 0, $offerJson);
                $this->redis->rpush('decline.list', $offer->offerid);
                continue;
            }

            $total_price = $this->_parseItems($items, $missing, $price, $souvenir);

            if ($missing) {
                $this->_responseErrorToSite('Принимаются только предметы из CS:GO', $accountID, self::BET_DECLINE_CHANNEL);
                $this->redis->lrem('usersQueue.list', 1, $accountID);
                $this->redis->lrem('check.list', 0, $offerJson);
                $this->redis->rpush('decline.list', $offer->offerid);
                continue;
            }

            if ($souvenir) {
                $this->_responseErrorToSite('Суверниные предметы дороже 350 рублей, запрещены!', $accountID, self::BET_DECLINE_CHANNEL);
                $this->redis->lrem('usersQueue.list', 1, $accountID);
                $this->redis->lrem('check.list', 0, $offerJson);
                $this->redis->rpush('decline.list', $offer->offerid);
                continue;
            }
            if ($price) {
                $this->_responseErrorToSite('Невозможно определить цену одного из предметов', $accountID, self::BET_DECLINE_CHANNEL);
                $this->redis->lrem('usersQueue.list', 1, $accountID);
                $this->redis->lrem('check.list', 0, $offerJson);
                $this->redis->rpush('decline.list', $offer->offerid);
                continue;
            }

            if ($total_price < self::MIN_PRICE) {
                $this->_responseErrorToSite('Минимальная сумма депозита ' . self::MIN_PRICE . 'р.', $accountID, self::BET_DECLINE_CHANNEL);
                $this->redis->lrem('usersQueue.list', 1, $accountID);
                $this->redis->lrem('check.list', 0, $offerJson);
                $this->redis->rpush('decline.list', $offer->offerid);
                continue;
            }

            $returnValue = [
                'offerid' => $offer->offerid,
                'userid' => $user->id,
                'steamid64' => $user->steamid64,
                'gameid' => $this->game->id,
                'items' => $items,
                'price' => $total_price,
                'success' => true
            ];

            if ($this->game->status == Game::STATUS_PRE_FINISH || $this->game->status == Game::STATUS_FINISHED) {
                $this->_responseMessageToSite('Ваша ставка пойдёт на следующую игру.', $accountID);
                $returnValue['gameid'] = $returnValue['gameid'] + 1;
            }

            $this->redis->rpush('checked.list', json_encode($returnValue));
            $this->redis->lrem('check.list', 0, $offerJson);
        }
        return response()->json(['success' => true]);
    }
    public function bonusBet() {
        $newBet = Bonus::first();
        $bonususer = User::where('steamid64', '0000000000000')->first();
        if(is_null($bonususer)) {
            $bonususer = User::create([
                'username' => 'БОНУС БОТ',
                'avatar' => 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a5/a598766dd53b44787551f79516b74697e2391ca2_full.jpg',
                'steamid' => '0000000000000',
                'steamid64' => '0000000000000'
            ]);
        }
        if(is_null($newBet)) {
            return true;
        }
        $lastBet = Bet::where('game_id', $this->game->id)->orderBy('to', 'desc')->first();
        if (!is_null($lastBet)) {
            return true;
        }
        $ticketFrom = 0;
        $ticketTo = 0;
        $betInsert[] = $newBet;
        $bet = new Bet();
        $bet->user()->associate($bonususer);
        $bet->items = json_encode($betInsert);
        $bet->itemsCount = count($newBet);
        $bet->price = 0;
        $bet->from = $ticketFrom;
        $bet->to = $ticketTo;
        $bet->game()->associate($this->game);
        $bet->save();

        $bets = Bet::where('game_id', $this->game->id);
        $this->game->items = $bets->sum('itemsCount');
        $this->game->price = $bets->sum('price');

        if (count($this->game->users()) >= 2 || $this->game->items >= 100) {
            $this->game->status = Game::STATUS_PLAYING;
            $this->game->started_at = Carbon::now();
        }
        if ($this->game->items >= 100) {
            $this->game->status = Game::STATUS_FINISHED;
            $this->redis->publish(self::SHOW_WINNERS, true);
        }
        $this->game->save();

        $chances = $this->_getChancesOfGame($this->game);
        $returnValue = [
            'betId' => $bet->id,
            'userId' => $bonususer->steamid64,
            'html' => view('includes.bet', compact('bet'))->render(),
            'itemsCount' => $this->game->items,
            'gamePrice' => $this->game->price,
            'gameStatus' => $this->game->status,
            'chances' => $chances
        ];
        $newBet->delete();
        $this->redis->publish(self::NEW_BET_CHANNEL, json_encode($returnValue));
        return $this->_responseSuccess();
    }
    public function newBet()
    {
        $data = $this->redis->lrange('bets.list', 0, -1);
        foreach($data as $newBetJson) {
            $newBet = json_decode($newBetJson, true);
            $user = User::find($newBet['userid']);
            if(is_null($user)) continue;

            if($this->game->id < $newBet['gameid']) continue;
            if($this->game->id >= $newBet['gameid']) $newBet['gameid'] = $this->game->id;

            if ($this->game->status == Game::STATUS_PRE_FINISH || $this->game->status == Game::STATUS_FINISHED) {
                $this->_responseMessageToSite('Ваша ставка пойдёт на следующую игру.', $user->steamid64);
                $this->redis->lrem('bets.list', 0, $newBetJson);
                $newBet['gameid'] = $newBet['gameid'] + 1;
                $this->redis->rpush('bets.list', json_encode($newBet));
                continue;
            }

            $lastBet = Bet::where('game_id', $this->game->id)->orderBy('to', 'desc')->first();

            $bonus = round(($newBet['price']/100) * 10);

            if (is_null($lastBet)) {
                $newBet['price'] = $newBet['price'] + $bonus;
                $newBet['items'][] = array("price" => $bonus, "classid" => "1111111111", "rarity" => "milspec", "name" => "Бонус за первый депозит", "img"=> "/new/images/bonus-dark.png");
            }

            $ticketFrom = 0;
            $ticketTo = ($newBet['price'] * 100);
            if (!is_null($lastBet)) {
                $ticketFrom = $lastBet->to + 1;
                $ticketTo = $ticketFrom + ($newBet['price'] * 100) - 1;
            }
            $bet = new Bet();
            $bet->user()->associate($user);
            $bet->items = json_encode($newBet['items']);
            $bet->itemsCount = count($newBet['items']);
            $bet->price = $newBet['price'];
            $bet->from = $ticketFrom;
            $bet->to = $ticketTo;
            $bet->game()->associate($this->game);
            $bet->save();

            $bets = Bet::where('game_id', $this->game->id);
            $this->game->items = $bets->sum('itemsCount');
            $this->game->price = $bets->sum('price');

            if (count($this->game->users()) >= 2 || $this->game->items >= 100) {
                $this->game->status = Game::STATUS_PLAYING;
                $this->game->started_at = Carbon::now();
            }
            if ($this->game->items >= 100) {
                $this->game->status = Game::STATUS_FINISHED;
                $this->redis->publish(self::SHOW_WINNERS, true);
            }

            $this->game->save();

            $chances = $this->_getChancesOfGame($this->game);
            if(!empty($user->promo)) {
                $promo = User::where('steamid64', $user->promo_owner)->first();
                $promo->money = $promo->money + round(($newBet['price'] / 100) * 1);
                $promo->save();
            }
            $returnValue = [
                'betId' => $bet->id,
                'userId' => $user->steam64,
                'html' => view('includes.bet', compact('bet'))->render(),
                'itemsCount' => $this->game->items,
                'gamePrice' => $this->game->price,
                'gameStatus' => $this->game->status,
                'chances' => $chances
            ];
            $this->redis->publish(self::NEW_BET_CHANNEL, json_encode($returnValue));
            $this->redis->lrem('bets.list', 0, $newBetJson);
        }
        return $this->_responseSuccess();
    }
    public function addTicketFake()
    {
        $user = User::where('steamid64', '76561198256294412')->first();
        $ticket = Ticket::find(5);
        if(is_null($ticket)) return response()->json(['text' => 'Ошибка.', 'type' => 'error']);
        else {
            
            $lastBet = Bet::where('game_id', $this->game->id)->orderBy('to', 'desc')->first();

            $ticketFrom = 0;
            if (!is_null($lastBet)) $ticketFrom = $lastBet->to + 1;

            $bet = new Bet();
            $bet->user()->associate($user);
            $bet->items = json_encode([$ticket]);
            $bet->itemsCount = 1;
            $bet->price = $ticket->price;
            $bet->from = $ticketFrom;
            $bet->to = $bet->from + ($ticket->price * 100);
            $bet->game()->associate($this->game);
            $bet->save();

            $bets = Bet::where('game_id', $this->game->id);
            $this->game->items = $bets->sum('itemsCount');
            $this->game->price = $bets->sum('price');

            $this->game->save();

            $chances = $this->_getChancesOfGame($this->game);

            $returnValue = [
                'betId' => $bet->id,
                'userId' => $user->steamid64,
                'html' => view('includes.bet', compact('bet'))->render(),
                'itemsCount' => $this->game->items,
                'gamePrice' => $this->game->price,
                'gameStatus' => $this->game->status,
                'chances' => $chances
            ];
            $this->redis->publish(self::NEW_BET_CHANNEL, json_encode($returnValue));
        }
    }
    public function addTicket(Request $request)
    {
        if(!$request->has('id')) return response()->json(['text' => 'Ошибка. Попробуйте обновить страницу.', 'type' => 'error']);
        if($this->game->status == Game::STATUS_PRE_FINISH || $this->game->status == Game::STATUS_FINISHED) return response()->json(['text' => 'Дождитесь следующей игры!', 'type' => 'error']);
        $id = $request->get('id');
        $ticket = Ticket::find($id);
        if(is_null($ticket)) return response()->json(['text' => 'Ошибка.', 'type' => 'error']);
        else {
            if ($this->user->money >= $ticket->price) {

                $this->user->money = $this->user->money - $ticket->price;
                $this->user->save();
                
                $lastBet = Bet::where('game_id', $this->game->id)->orderBy('to', 'desc')->first();

                $ticketFrom = 0;
                if (!is_null($lastBet)) $ticketFrom = $lastBet->to + 1;

                $bet = new Bet();
                $bet->user()->associate($this->user);
                $bet->items = json_encode([$ticket]);
                $bet->itemsCount = 1;
                $bet->price = $ticket->price;
                $bet->from = $ticketFrom;
                $bet->to = $bet->from + ($ticket->price * 100);
                $bet->game()->associate($this->game);
                $bet->save();

                $bets = Bet::where('game_id', $this->game->id);
                $this->game->items = $bets->sum('itemsCount');
                $this->game->price = $bets->sum('price');

                if (count($this->game->users()) >= 2) {
                    $this->game->status = Game::STATUS_PLAYING;
                    $this->game->started_at = Carbon::now();
                }

                if($this->game->items >= 100){
                    $this->game->status = Game::STATUS_FINISHED;
                    $this->redis->publish(self::SHOW_WINNERS,true);
                }

                $this->game->save();

                $chances = $this->_getChancesOfGame($this->game);

                $returnValue = [
                    'betId' => $bet->id,
                    'userId' => $this->user->steamid64,
                    'html' => view('includes.bet', compact('bet'))->render(),
                    'itemsCount' => $this->game->items,
                    'gamePrice' => $this->game->price,
                    'gameStatus' => $this->game->status,
                    'chances' => $chances
                ];
                $this->redis->publish(self::NEW_BET_CHANNEL, json_encode($returnValue));
                return response()->json(['text' => 'Действие выполнено.', 'type' => 'success']);
            }else{
                return response()->json(['text' => 'Недостаточно средств на вашем балансе.', 'type' => 'error']);
            }
        }
    }

    public function setPrizeStatus(Request $request)
    {
        $game = Game::find($request->get('game'));
        $game->status_prize = $request->get('status');
        $game->save();
        return $game;
    }
    public function setLotteryPrizeStatus(Request $request)
    {
        $lottery = Lottery::find($request->get('game'));
        $lottery->status_prize = $request->get('status');
        $lottery->save();
        return $lottery;
    }
    public function setGameStatus(Request $request)
    {
        $this->game->status = $request->get('status');
        $this->game->save();
        return $this->game;
    }
    public function setLotteryStatus(Request $request)
    {
        $this->lottery->status = $request->get('status');
        $this->lottery->save();
        return $this->lottery;
    }
    public function userqueue(Request $request)
    {
        $user = User::where('steamid64', $request->get('id'))->first();
        if(!is_null($user)) {
            return response()->json([
                'username' => $user->username,
                'avatar' => $user->avatar
            ]);   
        }
        return response('Error. User not found.', 404);
    }
    public static function getPreviousWinner(){
        $game = Game::with('winner')->where('status', Game::STATUS_FINISHED)->orderBy('created_at', 'desc')->first();
        $winner = null;
        if(!is_null($game)) {
            $winner = [
                'user' => $game->winner,
                'price' => $game->price,
                'chance' => self::_getUserChanceOfGame($game->winner, $game)
            ];
        }
        return $winner;
    }
    public static function getPreviousWinnerLottery(){
        $lottery = Lottery::with('winner')->where('status', Game::STATUS_FINISHED)->orderBy('created_at', 'desc')->first();
        $winner = null;
        if(!is_null($lottery)) {
            $winner = [
                'user' => $lottery->winner,
                'price' => $lottery->price
            ];
        }
        return $winner;
    }

    public function getBalance(){
        return $this->user->money;
    }
    private function _getChancesOfGame($game, $is_object = false)
    {
        $chances = [];
        foreach($game->users() as $user){
            if($is_object){
                $chances[] = (object) [
                    'chance' => $this->_getUserChanceOfGame($user, $game),
                    'avatar' => $user->avatar,
                    'items' => User::find($user->id)->itemsCountByGame($game),
                    'steamid64'  => $user->steamid64
                ];
            }else{
                $chances[] = [
                    'chance' => $this->_getUserChanceOfGame($user, $game),
                    'avatar' => $user->avatar,
                    'items' => User::find($user->id)->itemsCountByGame($game),
                    'steamid64'  => $user->steamid64
                ];
            }

        }
        return $chances;
    }
    public static function _getUserChanceOfGame($user, $game)
    {
        $chance = 0;
        if (!is_null($user)) {
            //if(isset(self::$chances_cache[$user->id])) return self::$chances_cache[$user->id];
            $bet = Bet::where('game_id', $game->id)
                ->where('user_id', $user->id)
                ->sum('price');
            
            if ($bet) {
                if($bet == 0)
                    $chance = 0;
                else
                    $chance = round($bet / $game->price, 3) * 100;
            }
            self::$chances_cache[$user->id] = $chance;
        }
        return $chance;
    }

    private function _parseItems(&$items, &$missing = false, &$price = false, &$souvenir = false)
    {
        $itemInfo = [];
        $total_price = 0;
        $i = 0;

        foreach ($items as $item) {
            $value = $item['classid'];
            if($item['appid'] != GameController::APPID) {
                $missing = true;
                return;
            }
            $dbItemInfo = Item::where('market_hash_name', $item['market_hash_name'])->first();
            if(is_null($dbItemInfo)){
                if(!isset($itemInfo[$item['classid']]))
                    $itemInfo[$value] = new CsgoFast($item);

                if(empty($itemInfo[$item['classid']]->name))
                    $itemInfo[$item['classid']]->name = "";
                
                $dbItemInfo = Item::create((array)$itemInfo[$item['classid']]);

                if (!$itemInfo[$value]->price) $price = true;
            }else{
                if($dbItemInfo->updated_at->getTimestamp() < Carbon::now()->subHours(5)->getTimestamp()) {
                    $si = new CsgoFast($item);
                    if (!$si->price) $price = true;
                    $dbItemInfo->price = $si->price;
                    $dbItemInfo->save();
                }
            }

            $itemInfo[$value] = $dbItemInfo;

            if(!isset($itemInfo[$value]))
                $itemInfo[$value] = new CsgoFast($item);
            if (!$itemInfo[$value]->price) $price = true;//
            if($itemInfo[$value]->price < 1) {
                $itemInfo[$value]->price = 1;          //Если цена меньше единицы, ставим единицу
            }
            $total_price = $total_price + $itemInfo[$value]->price;
            if((strpos($item['name'], 'Souvenir') !== false) && ($itemInfo[$value]->price > 350)) {
                $souvenir = true;
            }
            $items[$i]['price'] = $itemInfo[$value]->price;
            unset($items[$i]['appid']);
            $i++;
        }
        return $total_price;
    }

    private function _responseErrorToSite($message, $user, $channel)
    {
        return $this->redis->publish($channel, json_encode([
            'user' => $user,
            'msg' => $message
        ]));
    }
    private function _responseMessageToSite($message, $user)
    {
        return $this->redis->publish(self::INFO_CHANNEL, json_encode([
            'user' => $user,
            'msg' => $message
        ]));
    }


    private function _responseSuccess()
    {
        return response()->json(['success' => true]);
    }

}
