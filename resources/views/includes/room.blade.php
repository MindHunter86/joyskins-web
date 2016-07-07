<?php
$duel_bets = \App\duel_bet::where('game_id',$duel->id)->where('status',\App\duel_bet::STATUS_ACCEPTED)->orWhere('status',\App\duel_bet::STATUS_WAIT_TO_SENT)->orWhere('status',\App\duel_bet::STATUS_WAIT_TO_ACCEPT)->get();

$items = json_decode($duel_bets[0]->items);
$user = \App\User::where('id',$duel_bets[0]->user_id)->first();
if(count($duel_bets)>1)
    $user_joined = \App\User::where('id',$duel_bets[1]->user_id)->first();
?>

<tr id="duelRoom" data-id="{{$duel->id}}" style="display: table-row;">
    <td class="cf-players">
        @if($duel_bets[0]->coin == 1)
            <img src="{{asset('assets/img/coin-ct.png')}}">
        @else
            <img src="{{asset('assets/img/coin-t.png')}}">
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
        @if(isset($user_joined))

        <div id="timer{{$duel->id}}">
        </div>
            <?php
            $date = new Carbon\Carbon($duel_bets[1]->updated_at);
            $now = Carbon\Carbon::now();
            $diff = 90-$date->diffInSeconds($now);
            ?>
            <script>
                var timer = jQuery("#timer{{$duel->id}}").radialProgress("init", {
                    'size': 100,
                    'fill': 5,
                    'perc': {{$diff}}
                });
                var time = {{$diff}}
                var timeout = setTimeout(function () {
                    time--;
                    timer.radialProgress("to", {'perc': time, 'time': 10000});
                    if(time <= 0)
                            return;
                            timeout();
                },1000);

            </script>
        @endif
    </td>
    <td class="cf-action" data-id="5776e133ec1914830cb7a4e0" data-team="1" data-steamid="76561198073444442">
        @if(!isset($user_joined))
        <a class="cfRoundJoin" data-id="{{$duel->id}}">Войти</a>
        @else
            <a href="http://steamcommunity.com/profiles/{{$user_joined->steamid64}}" target="_blank"><img src="{{$user_joined->avatar}}" width="45" height="45" alt="Profile" title="{{$user_joined->username}}"></a>
        @endif
        <a class="cfRoundView">Смотреть</a>
    </td>
</tr>