<?php

namespace App\Http\Controllers;

use App\Bet;
use App\Game;
use App\Promo;
use App\Item;
use App\Lottery;
use App\Services\CsgoFast;
use App\Services\BackPack;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class PagesController extends Controller
{

    public function about()
    {
        return view('pages.about');
    }
    public function support()
    {
        return view('pages.support');
    }
    public function promo() {
        $promo = User::where('promo_owner', $this->user->steamid64)->get();
        $referal = [];
        foreach($promo as $ref) {
            $referal[] = Bet::where('user_id', $ref->id)->orderBy('created_at', 'desc')->get();
        }
        return view('pages.promo', compact('referal'));
    }
    public function giveaway() {
        $lottery = Lottery::where('status', Game::STATUS_FINISHED)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();
        foreach($lottery as $key => $lot) {
            $lottery[$key]->items = json_decode($lot->items);
        }
        return view('pages.giveaway', compact('lottery'));
    }
    public function top()
    {
        $users = \DB::table('users')
            ->select('users.id',
                'users.username',
                'users.avatar',
                'users.steamid64',
                \DB::raw('SUM(games.price) as top_value'),
                \DB::raw('COUNT(games.id) as wins_count')
            )
            ->join('games', 'games.winner_id', '=', 'users.id')
            ->groupBy('users.id')
            ->orderBy('top_value', 'desc')
            ->limit(50)
            ->get();
        $place = 1;
        $i = 0;
        foreach($users as $u){
            $users[$i]->games_played = count(\DB::table('games')
                ->join('bets', 'games.id', '=', 'bets.game_id')
                ->where('bets.user_id', $u->id)
                ->groupBy('bets.game_id')
                ->select('bets.id')->get());
            $users[$i]->win_rate = round($users[$i]->wins_count / $users[$i]->games_played, 3) * 100;
            $i++;
        }
        return view('pages.top', compact('users', 'place'));
    }

    public function history()
    {
        $games = Game::with(['bets', 'winner'])
            ->where('status', Game::STATUS_FINISHED)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();
 
        foreach($games as $key => $game) {
            $items = array();
            $price = array();
            foreach($game->bets as $bet) {
                foreach(json_decode($bet->items) as $item) {
                    $items[] = (array)$item;
                    $price[] = (array)$item->price;
                }
            }
            array_multisort($price, SORT_DESC, $items);
            $games[$key]->game_items = json_encode(array_slice($items, 0, 7));
        }

        return view('pages.history', compact('games'));
    }
    public function profile()
    {
        $games = Game::where('winner_id', $this->user->id)->get();
        $wins = $games->count();
        $gamesPlayed = count(\DB::table('games')
            ->join('bets', 'games.id', '=', 'bets.game_id')
            ->where('bets.user_id', $this->user->id)
            ->groupBy('bets.game_id')
            ->select('bets.id')->get());
        $looses = $gamesPlayed - $wins;
        $win_price = $games->sum('price');
        return view('pages.profile', compact('wins', 'looses', 'win_price'));
    }
    public function myinventory(Request $request)
    {
        return view('pages.myinventory');
    }

    public function myhistory()
    {
        $games = Game::with(['bets', 'winner'])
            ->where('games.winner_id', $this->user->id)
            ->where('status', Game::STATUS_FINISHED)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get();

        foreach($games as $key => $game) {
            $items = array();
            $price = array();
            foreach($game->bets as $bet) {
                foreach(json_decode($bet->items) as $item) {
                    $items[] = (array)$item;
                    $price[] = (array)$item->price;
                }
            }
            array_multisort($price, SORT_DESC, $items);
            $games[$key]->game_items = json_encode(array_slice($items, 0, 7));
        }
        return view('pages.myhistory', compact('games'));
    }
    public function game($gameId)
    {
        if(isset($gameId) && Game::where('status', Game::STATUS_FINISHED)->where('id', $gameId)->count()){
            $game = Game::with(['winner'])->where('status', Game::STATUS_FINISHED)->where('id', $gameId)->first();
            $game->ticket = floor($game->rand_number * ($game->price * 100));
            $bets = $game->bets()->with(['user','game'])->get()->sortByDesc('to');
            $lastBet = Bet::where('game_id', $gameId)->orderBy('created_at', 'desc')->first();
            $chances = [];
            return view('pages.game', compact('game', 'bets', 'chances', 'lastBet'));
        }
        return redirect()->route('index');
    }
}
