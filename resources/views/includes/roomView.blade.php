<?php
$duel_bets = \App\duel_bet::get_room_bets($duel->id);
$host_user = \App\User::get_user_cache($duel_bets[0]->user_id);
if(count($duel_bets)>1)
    $join_user = \App\User::get_user_cache($duel_bets[1]->user_id);
$total_bet = 0;
$items = json_decode($duel_bets[0]->items);
if(isset($join_user))
    $j_items = json_decode($duel_bets[1]->items);

if($duel->status == \App\duel::STATUS_PRE_FINISH || $duel->status == \App\duel::STATUS_FINISHED){
    foreach ($duel_bets as $bet)
        $total_bet += $bet->price;
    $host_chance = $duel_bets[0]->price*100/$total_bet;
}
else{
    $host_chance = 100;
    $total_bet = $duel_bets[0]->price;
}
?>

<div class="box-modal-top">Дуэль # {{$duel->id}}</div>
<div class="duel_row">
    <div class="duel_header">
        <div class="duel_h_block">
            <img src="{{$host_user->avatar}}"/>
            <div style="position:relative;     ">
                <img style="
                        width: 50px;
                        bottom: -10px;
    left: -10px; position: absolute;" class="coin-ava" src="@if($duel_bets[0]->coin){{asset('assets/img/coin-ct.png')}}@else{{asset('assets/img/coin-t.png')}}@endif">
            </div>
        </div>
        <div class="duel_h_center_block">
            @if($duel->status == \App\duel::STATUS_FINISHED)
                <?php $win_coin = ($duel->winner_id==$join_user->id) ? $duel_bets[1]->coin : $duel_bets[0]->coin; ?>
                @if($win_coin == 1)
                    <div style="display: block;" id="cfanim-wrapper"><div class="animation1260" id="coin"><div class="front"></div><div class="back"></div></div></div>
                @else
                    <div style="display: block;" id="cfanim-wrapper"><div class="animation1080" id="coin"><div class="back"></div><div class="front"></div></div></div>
                @endif
            @elseif(isset($join_user) && ($duel->status == \App\duel::STATUS_PRE_FINISH || $duel->status == \App\duel::STATUS_PLAYING))
                <div id="viewtimer{{$duel->id}}">
                </div>
                <?php
                if ($duel->status == \App\duel::STATUS_PRE_FINISH){
                    $cooldown = 10;
                    $color = '#236235';
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
                    $("#viewtimer{{$duel->id}}").countdown360({
                        radius      : 50,
                        seconds     : {{$diff}},
                        fontColor   : '#FFFFFF',
                        strokeWidth : 4,
                        strokeStyle: '{{$stroke}}',
                        fillStyle: '{{$color}}',
                        autostart   : false,
                        onComplete  : function () {}
                    }).start()
                </script>
            @endif
        </div>
        <div class="duel_h_block">
            @if(isset($join_user))
                <img src="{{$join_user->avatar}}">
                <div style="position:relative;">
                    <img style="bottom: -10px;
                        width: 50px;
    left: 80px; position: absolute;" class="coin-ava" src="@if($duel_bets[1]->coin){{asset('assets/img/coin-ct.png')}}@else{{asset('assets/img/coin-t.png')}}@endif">
                </div>
            @endif
        </div>
    </div>

    <div class="duel_info">
        <span id="d_nickname">{{$host_user->username}}</span>
        <span id="d_game">Хэш: {{md5($duel->secret.':'.$duel->rand_number)}}
            @if($duel->status == \App\duel::STATUS_FINISHED)
                <script>setTimeout(function(){$('#duel_hide_info').show();},3000);</script>
                <span id="duel_hide_info">
                <br>Процент: {{$duel->rand_number}}<br>Секретка: {{$duel->secret}}
                    </span>
            @endif
                </span>
        @if(isset($join_user))
            <span id="d_nickname">{{$join_user->username}}</span>
        @endif
        <div class="clearfix"></div>
    </div>
    <div class="duel_items">
        <div id="duel_items_block">
            <div id="d_items_header">
                <span>{{$duel_bets[0]->price}}</span>
                <span>{{count($items)}} предметов</span>
                <span>{{$host_chance}}%</span>
            </div>
            <div id="d_items_body">
                @foreach($items as $item)
                    <div class="d_item">
                        <div id="d_item_img">
                            <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/730/{{ $item->classId }}/120fx100f" alt="" class="img-responsive">
                        </div>
                        <div id="d_item_name">{{$item->market_hash_name}}</div>
                        <div id="d_item_price">{{$item->price}}</div>
                        <div class="clearfix"></div>
                    </div>
                @endforeach
            </div>
        </div>

            <div id="duel_items_block">
                @if(isset($join_user))
                    @if($duel->status == \App\duel::STATUS_FINISHED || $duel->status == \App\duel::STATUS_PRE_FINISH)
                <div id="d_items_header">
                    <span>{{$duel_bets[1]->price}}</span>
                    <span>{{count($j_items)}} предметов</span>
                    <span>{{100-$host_chance}}%</span>
                </div>
                <div id="d_items_body">
                    @foreach($j_items as $item)
                        <div class="d_item">
                            <div id="d_item_img">
                                <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/730/{{ $item->classId }}/120fx100f" alt="" class="img-responsive">
                            </div>
                            <div id="d_item_name">{{$item->market_hash_name}}</div>
                            <div id="d_item_price">{{$item->price}}</div>
                            <div class="clearfix"></div>
                        </div>
                    @endforeach
                </div>
                        @else
                        <h2 style="text-align: center;">Пользователь заходит.</h2>
                        @endif
                @else
                    <h2 style="text-align: center;">Ждем опонента.</h2>
                    @endif
            </div>

    </div>
    <div class="clearfix"></div>
</div>