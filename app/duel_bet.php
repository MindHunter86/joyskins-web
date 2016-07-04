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
}
