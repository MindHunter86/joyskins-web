<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    const STATUS_NOT_STARTED = 0;
    const STATUS_PLAYING = 1;
    const STATUS_PRE_FINISH = 2;
    const STATUS_FINISHED = 3;
    const STATUS_ERROR = 4;

    const STATUS_PRIZE_WAIT_TO_SENT = 0;
    const STATUS_PRIZE_SEND = 1;
    const STATUS_PRIZE_SEND_ERROR = 2;

    protected $fillable = ['rand_number'];

    public function winner()
    {
        return $this->belongsTo('App\User');
    }
    public static function get_cache_game($id){
        $key = md5('history_game_'.$id);
        if(!\Cache::has($key)) {
            $game = self::with(['bets','winner'])->where('id',$id)->first();
            \Debugbar::info($game);
            \Cache::put($key,json_encode($game),60);
        }
        \Debugbar::info(\Cache::get($key));
        return json_decode(\Cache::get($key));
    }
    public function users()
    {
        return \DB::table('games')
            ->join('bets', 'games.id', '=', 'bets.game_id')
            ->join('users', 'bets.user_id', '=', 'users.id')
            ->where('games.id', $this->id)
            ->groupBy('users.username')
            ->select('users.*')
            ->get();
    }
    public function usersNoBot()
    {
        return \DB::table('games')
            ->join('bets', 'games.id', '=', 'bets.game_id')
            ->join('users', 'bets.user_id', '=', 'users.id')
            ->where('games.id', $this->id)
            ->where('users.steamid64', '!=', '0000000000000')
            ->groupBy('users.username')
            ->select('users.*')
            ->get();
    }
    public static function gamesToday()
    {
        return self::where('status', self::STATUS_FINISHED)->where('created_at', '>=', Carbon::today())->count();
    }

    public static function usersToday()
    {
        return count(\DB::table('games')
            ->join('bets', 'games.id', '=', 'bets.game_id')
            ->join('users', 'bets.user_id', '=', 'users.id')
            ->where('games.created_at', '>=', Carbon::today())
            ->groupBy('users.username')
            ->select('users.username')->get());
    }

    public static function maxPriceToday()
    {
        return ($price = self::where('created_at', '>=', Carbon::today())->max('price')) ? $price : 0;
    }

    public static function maxPrice()
    {
        return self::max('price');
    }

    public function bets()
    {
        return $this->hasMany('App\Bet');
    }
}
