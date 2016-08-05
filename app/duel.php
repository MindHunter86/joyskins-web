<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class duel extends Model
{
    const STATUS_NOT_STARTED = 0;
    const STATUS_PLAYING = 1;
    const STATUS_PRE_FINISH = 2;
    const STATUS_FINISHED = 3;
    const STATUS_ERROR = 4;

    const STATUS_PRIZE_WAIT_TO_SENT = 0;
    const STATUS_PRIZE_SEND = 1;
    const STATUS_PRIZE_SEND_ERROR = 2;

    public function winner()
    {
        return $this->belongsTo('App\User');
    }

    public static function get_history_duel($id)
    {
        $key = md5('history_duel_id_'.$id);
        if(!\Cache::has($key)){
            $duel = duel::where('id',$id)->first();
            if($duel->status != self::STATUS_FINISHED)
                return false;
            \Cache::put($key,json_encode($duel),60);
        }
        return json_decode(\Cache::get($key));
    }
    public static function gamesToday()
    {
        return self::where('status', self::STATUS_FINISHED)->where('created_at', '>=', Carbon::today())->count();
    }
    public static function maxPriceToday()
    {
        return ($price = self::where('created_at', '>=', Carbon::today())->max('price')) ? $price : 0;
    }

    public static function maxPrice()
    {
        return self::max('price');
    }
    public static function usersToday()
    {
        return count(\DB::table('duels')
            ->join('duel_bets', 'duels.id', '=', 'duel_bets.game_id')
            ->join('users', 'duel_bets.user_id', '=', 'users.id')
            ->where('duels.created_at', '>=', Carbon::today())
            ->groupBy('users.username')
            ->select('users.username')->get());
    }
}
