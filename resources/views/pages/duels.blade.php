@extends('layout')
@section('content')
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
    <script type="text/javascript" src="{{asset('assets/js/jquery.countdown360.min.js')}}"></script>
    <link rel="stylesheet" href="{{asset('assets/css/duel.css')}}">
    <div class="content_bg">
        <div class="full">
            @if(\Auth::check())
            @foreach(\App\duel_bet::where('status',\App\duel_bet::STATUS_WAIT_TO_ACCEPT)->where('user_id',\Auth::user()->id)->get()  as $bet)
                <h3>Вы вступили в игру, у вас есть: 60 сек для подтверждения</h3>
                <h3>Ваша ставка:</h3>
                <?php $items = json_decode($bet->items)?>
                @foreach($items as $item)
                    <img width="45" height="45" src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $item->classId }}/120fx120f" alt="">
                @endforeach
                <br>
            @endforeach
            <div class="content_title"><div>Coin<b>flip</b> БЕТА. Создавайте или вступайте в игру. Мин. сумма ставки: 30 руб.</div></div>
            <div class="clear"></div>
            <div id="modalShowAction" class="window">
                <a title="Закрыть" class="close">X</a>
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
    margin-top: 15px;" class="content_title"><div>Нужно: <b id="room_start">500</b>-<b id="room_end">600</b> руб.</div></div>

                        <div class="clear"></div>
                    </div>
                    <div class="content_title inv_info"><div>Предметов выбрано: <b class="inv_count">0</b>, Сумма предметов: <b class="inv_price">0</b></div></div>
                </div>
                <div style="clear: both; content: ' '; display: table;" ></div>
                <div class="inv_table_duel">

                </div>
            </div>
            <a class="btnShowInv">Создать комнату</a>
                <a style="display: inline-block;
    float: left;
    padding: 15px;
    background-color: rgb(107, 39, 132);
    text-decoration: none;
    cursor:pointer;" onclick="loadDuelHistory()">История игр</a>
                @endif
            <div class="duel_games_list"><table class="coinflip-pots table">
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
                    @foreach(\App\duel::where('status',\App\duel::STATUS_PLAYING)->orWhere('status',\App\duel::STATUS_PRE_FINISH)->get() as $duel)
                        @include('includes.room',compact('duel'))
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="viewRoomBet">
    </div>
    <script>
        $(function(){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

        });
    </script>
    <div class="none">
        <div id="historyModal" class="duel_games_list"><table class="coinflip-pots table">
                <thead>
                <tr>
                    <th>Игроки</th>
                    <th>Предметы</th>
                    <th>Всего</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody id="roomHistoryList"></tbody>
            </table>
        </div>
    </div>
@endsection