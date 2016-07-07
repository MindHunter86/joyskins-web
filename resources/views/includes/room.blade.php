<?php
$duel_bets = \App\duel_bet::where('game_id',$duel->id)->where('status',\App\duel_bet::STATUS_ACCEPTED)->get();

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
        <div class="fifth circle" data-value="0.9" data-size="60" data-fill="{
            &quot;color&quot;: &quot;greenyellow&quot;
        }" >
            <strong></strong>
        </div>
    </td>
    <td class="cf-action" data-id="5776e133ec1914830cb7a4e0" data-team="1" data-steamid="76561198073444442">
        <a class="cfRoundJoin" data-id="{{$duel->id}}" href="#modalShowAction">Войти</a>
        <a class="cfRoundView">Смотреть</a>
    </td>
</tr>