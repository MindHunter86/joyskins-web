<?php
$duel_bets = \App\duel_bet::get_room_bets($duel->id);

$items = json_decode($duel_bets[0]->items);
$user = \App\User::where('id',$duel_bets[0]->user_id)->first();
        $j_count = 0;
if(count($duel_bets)>1){
    $user_joined = \App\User::where('id',$duel_bets[1]->user_id)->first();
    $j_count = count(json_decode($duel_bets[1]->items));
}
?>

<tr id="duelRoom{{$duel->id}}" data-price="{{$duel_bets[0]->price}}" data-id="{{$duel->id}}" style="display: table-row;">
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
        <h3>{{count($items)+$j_count}} предметов:</h3>
        <div>
            <?php $preCount = 0; ?>
            @foreach($items as $item)
                <?php $preCount++; ?>
                @if($preCount < 6)
                <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $item->classId }}/120fx120f" class="img-responsive" title="{{$item->market_hash_name}} - {{$item->price}} руб.">
                        @endif
                        @endforeach
                @if(count($items) > 5)
                    <div style="vertical-align: middle;     padding-bottom: 5px;">+ еще {{count($items)-5}} предмет(ов)</div>
                @endif
        </div>

    </td>
    <td class="cf-total">
        @if($duel->status == \App\duel::STATUS_PRE_FINISH || $duel->status == \App\duel::STATUS_FINISHED)
                {{$duel_bets[0]->price+$duel_bets[1]->price}} руб.
            @else
            {{$duel_bets[0]->price}} руб.<br><span class="small">Надо: {{$duel_bets[0]->price-$duel_bets[0]->price*0.1}} - {{$duel_bets[0]->price+$duel_bets[0]->price*0.1}} руб.</span>

        @endif
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
                    strokeWidth: 2,
                    autostart   : false,
                    onComplete  : function () {}
                }).start()
            </script>
        @endif
    </td>
    <td class="cf-action">
        @if($duel->status == \App\duel::STATUS_FINISHED)

            <?php $win_coin = ($duel->winner_id==$user_joined->id) ? $duel_bets[1]->coin : $duel_bets[0]->coin; ?>
        @if($duel->winner_id == $user_joined->id)
                    <a href="http://steamcommunity.com/profiles/{{$user_joined->steamid64}}" target="_blank"><img src="{{$user_joined->avatar}}" width="45" height="45" alt="Profile" title="{{$user_joined->username}}"></a>

                @else
                    <a href="http://steamcommunity.com/profiles/{{$user->steamid64}}" target="_blank"><img src="{{$user->avatar}}" width="45" height="45" alt="Profile" title="{{$user->username}}"></a>

                @endif
                @if($win_coin == 1)
                    <img width="45" src="{{asset('assets/img/coin-ct.png')}}">
                @else
                    <img height="45" src="{{asset('assets/img/coin-t.png')}}">
                @endif
            @else
                @if(!isset($user_joined))
                    <a class="cfRoundJoin" data-price="{{$duel_bets[0]->price}}" data-id="{{$duel->id}}">Войти</a>
                @else
                    <a href="http://steamcommunity.com/profiles/{{$user_joined->steamid64}}" target="_blank"><img src="{{$user_joined->avatar}}" width="45" height="45" alt="Profile" title="{{$user_joined->username}}"></a>
                @endif
            @endif

        <a class="cfRoundView" data-id="{{$duel->id}}">Смотреть</a>
    </td>
</tr>