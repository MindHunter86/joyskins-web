<?php
    $host_user = \App\User::where('id',$duel_bets[0]->user_id)->first();
    if(!is_null($duel_bets[1]))
        $join_user = \App\User::where('id',$duel_bets[1]->user_id)->first();
?>
<h1>CoinFlip раунд № {{$duel->id}}</h1>
<div class="info-block">
    <div class="host-player">
        @if(isset($host_user))
            <img src="{{$host_user->avatar}}" style="width: 100%;" />
        @endif
    </div>
    <div class="center-coin">
        @if($duel->status == \App\duel::STATUS_FINISHED)
            @if($duel->rand_number>0.5)
                <img src="{{asset('assets/img/coin-ct.png')}}">
            @else
                <img src="{{asset('assets/img/coin-t.png')}}">
            @endif
        @elseif($duel->status == \App\duel::STATUS_PRE_FINISH || $duel->status == \App\duel::STATUS_PLAYING)
            <div id="viewtimer{{$duel->id}}">
            </div>
            <?php
            if ($duel->status == \App\duel::STATUS_PRE_FINISH){
                $cooldown = 15;
                $color = '#00ff00';
            } else {
                $cooldown = 90;
                $color = '#FF0000';
            }
            $date = new Carbon\Carbon($duel_bets[1]->updated_at);
            $now = Carbon\Carbon::now();
            $diff = $cooldown-$date->diffInSeconds($now);
            ?>
                <script>
                    var timer = jQuery("#viewtimer{{$duel->id}}").radialProgress("init", {
                        'size': auto,
                        'fill': 5,
                        'color': '{{$color}}',
                        'font-size': 25,
                        'perc': parseInt({{$diff*100/$cooldown}})
                    });
                    var time = {{$diff}};
                    setInterval(function () {
                        if(time<=0) return;
                        timer.radialProgress("to", {'perc': parseInt(time*100/90) , 'time': (parseInt(time*100/90) ? 90 : 10)});
                        time--;
                    },1000);
                </script>
        @endif
    </div>
    <div class="join-player">
        @if(isset($join_user))
            <img src="{{$join_user->avatar}}" style="width: 100%;" />
        @endif
    </div>
</div>
<div class="hash-line">

</div>
<div class="items-block">
    <div class="host-items">

    </div>
    <div class="join-items">

    </div>
</div>