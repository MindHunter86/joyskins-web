@extends('layout')

@section('content')
    <script type="text/javascript" src="{{ asset('assets/js/circle-progress.js') }}"></script>
    <style>
        .inv_d_item {
            display: inline-block;
            margin: 2px;
        }
        .inv_choosen {
            background-color: greenyellow;
        }
        .coin.choosen {
            background-color: darkseagreen;
        }
        .coin {
            margin: 2px;
            display: inline-block;
        }
        .btnCreateRoom {
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: yellowgreen;
            text-decoration: none;
            cursor:pointer;
        }
        .btnCreateRoom:hover{
            text-decoration: none;;
        }
        .inv_info{
            float: left;
        }
        .show_inv{
            background-color: green;
            width: 100%;
            text-align: center;
            margin-top: 10px;
            padding: 15px;
            cursor:pointer;
        }
        .cf-items{
            font-size: 10px;
        }
        .cf-items img{
            width: 45px;
            height: 45px;
        }
        .coinflip-pots {
            margin-top: 10px;
            border-top: 3px solid #3faa5d;
            border-collapse: collapse;
            width: 100%;
        }
        .coinflip-pots .cf-players {
            width: 150px;
            text-align: center;
            padding: 8px;
            line-height: 1.42857143;
        }
        .coinflip-pots .cf-players img{
            width: 45px;
            height: 45px;
        }
        .coinflip-pots tbody tr{
            padding-top: 5px;
            padding-bottom: 5px;
        }
        .coinflip-pots tbody tr:nth-child(2n)
        {
            background-color: #002f17;
        }
        .coinflip-pots thead{
            border-bottom: 1px solid #3faa5d;

        }
        .coinflip-pots thead tr th{
            padding: 8px;

        }
        .cfRoundJoin{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: #45b0cd;
            text-decoration: none;
            cursor:pointer;
        }
        .cfRoundView{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: #b550cd;
            text-decoration: none;
            cursor:pointer;
        }
        .circle strong {
            position: absolute;
            margin-top: 22px;
            margin-left: -40px;
            text-align: center;
        }
        .window {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0,0,0,0.7);
            z-index: 99999;
            -webkit-transition: opacity 400ms ease-in;
            -moz-transition: opacity 400ms ease-in;
            transition: opacity 400ms ease-in;
            display: none;
            pointer-events: none;
        }

        .window:target {
            display: block;
            pointer-events: auto;
        }


        .close {
            background: #cc3300;
            color: #FFFFFF;
            line-height: 25px;
            position: absolute;
            right: 10px;
            text-align: center;
            top: 22px;
            width: 24px;
            text-decoration: none;
            font-weight: bold;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            border-radius: 12px;
            -moz-box-shadow: 1px 1px 3px #000;
            -webkit-box-shadow: 1px 1px 3px #000;
            box-shadow: 1px 1px 3px #000;
        }
        .close:hover { background: #990000; }
        .btnShowInv{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: yellowgreen;
            text-decoration: none;
            cursor:pointer;
            width:100%;
        }
        .btnShowInv:hover{
            text-decoration: none;;
        }
        .btnJoinRoom{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: yellowgreen;
            text-decoration: none;
            cursor:pointer;
            width:100%;
        }
        .btnJoinRoom:hover{
            text-decoration: none;;
        }
        .inv_table_duel {
            overflow: auto;
            height: 100%;
        }
        .btnCheckBet{
            display: inline-block;
            float: left;
            padding: 15px;
            text-align: center;
            background-color: #00bdcd;
            text-decoration: none;
            cursor:pointer;
            width:100%;
        }
        .btnCheckBet:hover{
            text-decoration: none;;
        }
    </style>
    <div class="content_bg">
        <div class="full">
            @foreach(\App\duel_bet::where('status',\App\duel_bet::STATUS_WAIT_TO_ACCEPT)->where('user_id',\Auth::user()->id)->get()  as $bet)
                <h3>Вы вступили в игру, у вас есть: 60 сек для подтверждения</h3>
                <h3>Ваша ставка:</h3>
                <?php $items = json_decode($bet->items);?>
                @foreach($items as $item)
                    <img width="45" height="45" src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $item->classId }}/120fx120f" alt="">
                @endforeach
                <a class="btnCheckBet" data-id="{{$bet->id}}">Проверить ставку</a>
                <br>
            @endforeach
            <div class="content_title"><div>Coin<b>flip</b>. Создавайте или вступайте в игру.</div></div>
            <div class="clear"></div>
            <div id="modalShowAction" class="window">
                <a href="#close" title="Закрыть" class="close">X</a>
                <div class="clear"></div>
                <div class="inv_cash">Загрузка инвентаря...</div>
                <div style="display: block;">
                    <div id="createRoom">
                        <a class="btnCreateRoom">Создать комнату</a>
                        <img src="{{asset('assets/img/coin-t.png')}}" data-coin="0" class="coin choosen">
                        <img src="{{asset('assets/img/coin-ct.png')}}" data-coin="1" class="coin">
                    </div>
                    <div  id="joinRoom">
                        <a class="btnJoinRoom" style="width:auto;">Войти в комнату</a>
                        <div style="left: 20%;
    margin-top: 15px;" class="content_title"><div>Нужно: <b id="room_start">500</b>-<b class="room_end">600</b> руб.</div></div>

                        <div class="clear"></div>
                    </div>
                    <div class="content_title inv_info"><div>Предметов выбрано: <b class="inv_count">0</b>, Сумма предметов: <b class="inv_price">0</b></div></div>
                </div>
                <div style="clear: both; content: ' '; display: table;" ></div>
                <div class="inv_table_duel">

                </div>
            </div>
            <a class="btnShowInv" href="#modalShowAction">Создать комнату</a>
            <div class="duel_games_list">
                <table class="coinflip-pots table">
                    <thead>
                    <tr>
                        <th>Игроки</th>
                        <th>Предметы</th>
                        <th>Всего</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody id="roomList">
                    @foreach(\App\duel::where('status',\App\duel::STATUS_PLAYING)->get() as $duel)
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
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script>
        $(function(){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $('.fifth.circle').circleProgress({
                value: 0.7
                // all other config options were taken from "data-" attributes
                // options passed in config object have higher priority than "data-" attributes
                // "data-" attributes are taken into account only on init (not on update/redraw)
                // "data-fill" (and other object options) should be in valid JSON format
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(parseInt(20 * progress) + 'с');
            });
        });
    </script>
@endsection