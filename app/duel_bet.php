<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class duel_bet extends Model
{
    const STATUS_WAIT_TO_SENT = 0;
    const STATUS_ACCEPTED = 1;
    const STATUS_WAIT_TO_ACCEPT = 2;
    const STATUS_SENT_ERROR = 3;
    const STATUS_DECLINED = 4;

    // Возвращает ставки из кэша если завершен раунд иначе из бд
    public static function get_room_bets($id){
        $key = 'room_bets_id_'.$id;
        if(!\Cache::has($key)){
            if(\App\duel::get_history_duel($id))
            {
                \Cache::put($key,self::duel_bets_query($id),60);
            }else{
                return self::duel_bets_query($id);
            }
        }
        return \Cache::get($key);
    }

    public function duel_bets_query($id){
        return self::where('game_id',$id)->where(function($query){
            $query->where('status',\App\duel_bet::STATUS_WAIT_TO_ACCEPT)
                ->orWhere('status',\App\duel_bet::STATUS_ACCEPTED);
        })->get();
    }
}
