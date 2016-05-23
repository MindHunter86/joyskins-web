<?php

namespace App\Http\Controllers;

use App\Game;
use App\Shop;
use App\User;
use App\Item;
use App\Bet;
use Firebase\Firebase;
use App\Services\CsgoFast;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use PhpParser\Node\Expr\Cast\Object_;

class AjaxController extends Controller
{
    static $FIREBASE_URL = 'https://csgo-prod.firebaseio.com/';
    static $FIREBASE_SECRET = 'cUfAEGeYcVJqwl6IrudJNyq6gGeStT1s1bJQ6PTe';
    public function chat(Request $request) {
        $type = $request->get('type');
        if(!$request->has('type')) {
            return response()->json(['success' => false, 'text' => 'Тип запроса не указан']);
        }
        $fb = Firebase::initialize(self::$FIREBASE_URL, self::$FIREBASE_SECRET);
        if($type == 'push') {
            $censure = array('залупа', '.ru', '.com', '. ru', 'ru', '.in', '. com', 'заходи', 'классный сайт', 'го на');
            $message = $request->get('message');
            if(is_null($message)) {
                return response()->json(['success' => false, 'text' => 'Вы не ввели сообщение']);
            }
            if(strlen($message) == 0) {
                return response()->json(['success' => false, 'text' => 'Вы не ввели сообщение']);
            }
            if(strlen($message) > 200) {
                return response()->json(['success' => false, 'text' => 'Максимум 200 символов']);
            }
            $gamesCount = Bet::where('user_id', $this->user->id)->count();
          /*  if($gamesCount == $gamesCount) {
                return response()->json(['success' => false, 'text' => 'Вы должны сделать хотябы 5 депозитов на сайте!']);
            }*/
            $message = str_replace($censure, '*мат*', $message);
            $push = array(
                'username' => $this->user->username,
                'avatar' => $this->user->avatar,
                'steamid' => $this->user->steamid64,
                'is_admin' => $this->user->is_admin,
                'is_moderator' => $this->user->is_moderator,
                'is_vip'    => $this->user->is_vip,
                'message' => $message
            );
            $pusher = $fb->push('/chat/4', $push);
            if(is_null($pusher)) {
                return response()->json(['success' => false, 'text' => 'Ошибка сервера (mp01)']);
            }
            return response()->json(['success' => true, 'text' => 'Сообщение добавлено']);
        }
        if($type == 'remove') {
            if(!$this->user->is_moderator && !$this->user->is_admin) {
                return response()->json(['success' => false, 'text' => 'Вам недоступная данная функция!']);
            }

            $id = $request->get('id');
            if(!\Cache::has('ban_chat_'.$id)) \Cache::put('ban_chat_' . $id,'',1);
            $pusher = $fb->delete('/chat/4/'.$id);
            return response()->json(['success' => true, 'text' => 'Сообщение удалено']);
        }
    }
    //
    public function parseAction(Request $request)
    {
        switch($request->get('action')){
            case 'myinventory':
                $jsonInventory = file_get_contents('http://steamcommunity.com/profiles/' . $this->user->steamid64 . '/inventory/json/730/2');
                $items = json_decode($jsonInventory, true);
                if ($items['success']) {
                    foreach ($items['rgDescriptions'] as $class_instance => $item) {
                        $itemInfo = new CsgoFast($item);
                        if(empty($itemInfo->price)) $itemInfo->price = 0;
                        $items['rgDescriptions'][$class_instance]['price'] = $itemInfo->price;
                    }

                }
                return response()->json($items);
                break;
            case 'gameInfo': 
                $game = Game::orderBy('id', 'desc')->first();
                return $game;
            case 'userInfo':
                $user = User::where('steamid64', $request->get('id'))->first();
                if(!is_null($user)) {
                    $games = Game::where('winner_id', $user->id)->get();
                    $wins = $games->count();
                    $gamesPlayed = \DB::table('games')
                        ->join('bets', 'games.id', '=', 'bets.game_id')
                        ->where('bets.user_id', $user->id)
                        ->groupBy('bets.game_id')
                        ->orderBy('games.created_at', 'desc')
                        ->select('games.*', \DB::raw('SUM(bets.price) as betValue'))->get();
                    $gamesList = [];
                    $i = 0;
                    foreach ($gamesPlayed as $game) {
                        $gamesList[$i] = (object)[];
                        $gamesList[$i]->id = $game->id;
                        $gamesList[$i]->win = false;
                        $gamesList[$i]->bank = $game->price;
                        if ($game->winner_id == $user->id) $gamesList[$i]->win = true;
                        if ($game->status != Game::STATUS_FINISHED) $gamesList[$i]->win = -1;
                        $gamesList[$i]->chance = round($game->betValue / $game->price, 3) * 100;
                        $i++;
                    }
                    return response()->json([
                        'username' => $user->username,
                        'avatar' => $user->avatar,
                        'votes' => $user->votes,
                        'wins' => $wins,
                        'url' => 'http://steamcommunity.com/profiles/' . $user->steamid64 . '/',
                        'winrate' => count($gamesPlayed) ? round($wins / count($gamesPlayed), 3) * 100 : 0,
                        'totalBank' => $games->sum('price'),
                        'games' => count($gamesPlayed),
                        'list' => $gamesList
                    ]);
                }
                return response('Error. User not found.', 404);
                break;
            case 'voteUser':
                $user = User::where('steamid64', $request->get('id'))->first();
                if(!is_null($user)) {
                    if($user->id == $this->user->id)
                        return response()->json([
                            'status' => 'error',
                            'msg' => 'Вы не можете голосовать за себя.'
                        ]);
                    $votes = $this->redis->lrange($user->steamid64 . '.user.votes.list', 0, -1);
                    if(in_array($this->user->id, $votes)){
                        return response()->json([
                            'status' => 'error',
                            'msg' => 'Вы уже голосовали за этого пользователя.'
                        ]);
                    }else{
                        $user->votes++;
                        $user->save();
                        $this->redis->rpush($user->steamid64 . '.user.votes.list', $this->user->id);
                        return response()->json([
                            'status' => 'success',
                            'votes' => $user->votes
                        ]);
                    }
                }
                return response('Error. User not found.', 404);
                break;
            case 'shopSort':
                $options = $request->get('options');
                if(empty($options['searchRarity'])) $options['searchRarity'] = [ "Тайное", "Classified", "Restricted", "Industrial Grade", "Mil-Spec Grade", "Consumer Grade", "High Grade", "Base Grade", "Exotic", "Covert"];
                if(empty($options['searchQuality'])) $options['searchQuality'] = [ "Factory new", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred", "Normal", "StatTrak™", "Souvenir"];
                if(empty($options['searchType'])) $options['searchType'] = [ "Pistol", "SMG", "Rifle", "Shotgun", "Sniper Rifle", "Machinegun", "Container", "Knife", "Sticker", "Music Kit", "Key", "Pass", "Gift", "Tag", "Tool"];
                //if(empty($options['searchType'])) $options['searchType'] = [ "Knife", "Винтовка", "Дробовик", "Pistol", "Снайперская винтовка", "Пулемёт", "Контейнер", "Пистолет-пулемёт", "Sitcket", "Набор музыки", "Ключ", "Подарок"];

                $items = Shop::where('name', 'like', '%'.$options['searchName'].'%')
                    ->whereBetween('price', [$options['minPrice'], $options['maxPrice'] + 1])
                    ->whereIn('type', $options['searchType'])
                    ->whereIn('rarity', $options['searchRarity'])
                    ->whereIn('quality', $options['searchQuality'])
                    ->orderBy('price', $options['sort'])
                    ->where('status', Shop::ITEM_STATUS_FOR_SALE)
                    ->get();
                return response()->json($items->toArray());
                break;
        }
    }
}
