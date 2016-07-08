<?php
$duel_bets = \App\duel_bet::where('game_id',$duel->id)->where('status',\App\duel_bet::STATUS_ACCEPTED)->orWhere('status',\App\duel_bet::STATUS_WAIT_TO_SENT)->orWhere('status',\App\duel_bet::STATUS_WAIT_TO_ACCEPT)->get();

$items = json_decode($duel_bets[0]->items);
$user = \App\User::where('id',$duel_bets[0]->user_id)->first();
if(count($duel_bets)>1)
    $user_joined = \App\User::where('id',$duel_bets[1]->user_id)->first();
?>

<tr id="duelRoom{{$duel->id}}" data-id="{{$duel->id}}" style="display: table-row;">
    <td class="cf-players">
        @if($duel->status == \App\duel::STATUS_PRE_FINISH || $duel->status == \App\duel::STATUS_FINISHED)
            <a href="http://steamcommunity.com/profiles/{{$user_joined->steamid64}}" target="_blank"><img src="{{$user_joined->avatar}}" alt="Profile" title="{{$user_joined->username}}"></a>
vs.
        @else
            @if($duel_bets[0]->coin == 1)
                <img src="{{asset('assets/img/coin-ct.png')}}">
            @else
                <img src="{{asset('assets/img/coin-t.png')}}">
            @endif
        @endif
            <a href="http://steamcommunity.com/profiles/{{$user->steamid64}}" target="_blank"><img src="{{$user->avatar}}" alt="Profile" title="{{$user->username}}"></a>
    </td>
    <td class="cf-items">
        <h3>{{count($items)}} предметов:</h3>
        <div>
            @foreach($items as $item)
                <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $item->classId }}/120fx120f" class="img-responsive" title="{{$item->market_hash_name}} - {{$item->price}} руб.">
            @endforeach
        </div>
    </td>
    <td class="cf-total">
        {{$duel_bets[0]->price}} руб.<br><span class="small">Надо: {{$duel_bets[0]->price-$duel_bets[0]->price*0.1}} - {{$duel_bets[0]->price+$duel_bets[0]->price*0.1}} руб.</span>
    </td>
    <td class="cf-timer">
        @if(isset($user_joined)&& ($duel->status == \App\duel::STATUS_PRE_FINISH || $duel->status == \App\duel::STATUS_PLAYING))
        <div id="timer{{$duel->id}}">
        </div>
            <?php
                if ($duel->status == \App\duel::STATUS_PRE_FINISH){
                    $cooldown = 10;
                    $color = '#00ff00';
                    $stroke = '#477050';
                } else {
                    $cooldown = 90;
                    $color = '#FF0000';
                    $stroke = '#700005';
                }
            $date = new Carbon\Carbon($duel_bets[1]->updated_at);
            $now = Carbon\Carbon::now();
            $diff = $cooldown-$date->diffInSeconds($now);
            ?>
            <script type="text/javascript" charset="utf-8">
                $("#timer{{$duel->id}}").countdown360({
                    radius      : 22,
                    seconds     : {{$diff}},
                    fontColor   : '#FFFFFF',
                    strokeStyle: '{{$stroke}}',
                    fillStyle: '{{$color}}',
                    autostart   : false,
                    onComplete  : function () {}
                }).start()
            </script>
        @endif
    </td>
    <td class="cf-action">
        @if(!isset($user_joined))
        <a class="cfRoundJoin" data-id="{{$duel->id}}">Войти</a>
        @else
            <a href="http://steamcommunity.com/profiles/{{$user_joined->steamid64}}" target="_blank"><img src="{{$user_joined->avatar}}" width="45" height="45" alt="Profile" title="{{$user_joined->username}}"></a>
        @endif
        @if($duel->status == \App\duel::STATUS_FINISHED)
                @if($duel->rand_number > 0.5)
                    <img src="{{asset('assets/img/coin-ct.png')}}">
                @else
                    <img src="{{asset('assets/img/coin-t.png')}}">
                @endif
            @endif
        <a class="cfRoundView" data-id="{{$duel->id}}">Смотреть</a>
    </td>
</tr>