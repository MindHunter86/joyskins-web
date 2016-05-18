<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Lottery extends Model
{
    const STATUS_NOT_STARTED = 0;
    const STATUS_PLAYING = 1;
    const STATUS_PRE_FINISH = 2;
    const STATUS_FINISHED = 3;
    const STATUS_ERROR = 4;

    const STATUS_PRIZE_WAIT_TO_SENT = 0;
    const STATUS_PRIZE_SEND = 1;
    const STATUS_PRIZE_SEND_ERROR = 2;

    protected $table = 'lottery';
    protected $fillable = ['rand_number', 'items', 'price', 'max'];

    public function winner()
    {
        return $this->belongsTo('App\User');
    }

    public function users()
    {
        return \DB::table('lottery')
            ->join('players', 'lottery.id', '=', 'players.lottery_id')
            ->join('users', 'players.user_id', '=', 'users.id')
            ->where('lottery.id', $this->id)
            ->groupBy('users.username')
            ->select('users.*')
            ->get();
    }

    public function players()
    {
        return $this->hasMany('App\Players');
    }
}
