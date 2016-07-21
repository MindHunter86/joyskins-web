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
                <a style="display: inline-block;
    float: left;
    padding: 15px;
    background-color: rgb(9, 132, 100);
    text-decoration: none;
    cursor:pointer;" onclick="$('#getStart').arcticmodal()">О дуэлях</a>
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
@endsection
@section('modals')
    <div class="box-modal" id="getStart" style="width:900px;">
        <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>О сайте</div>
        <div class="rules">
            <div style="margin-bottom: 10px; border-left: 1px solid #FFBD4C; padding-left: 6px;">
                <span style="color: #FFBD57;">О Дуэлях</span>-Вы можете создать новую дуэль или присоединиться к уже существующей. Вам необходимо выбрать вещи из инвентаря на нашей странице, а затем нажмите кнопку, чтобы создать. После этого мы вышлем Вам трейд оффер в кратчайшие сроки,который содержит элементы, которые вы выбрали. Вы должны принять это предложение и подтвердить его с помощью мобильного телефона. После того как вы подтверждаете,у вас создатся ваша комната. <br>
                Победитель определяется случайным образом, шанс выигрыша зависит от стоимости внесенных скинов.
            </div>
            <div style="margin-bottom: 10px; padding: 5px 6px; border: 1px solid #5cb85c;">
                <span style="text-transform: uppercase; color: #3FAA5D;">ПОБЕДИТЕЛЬ ПРЕДМЕТОВ:</span>По состоянию конца игры, победитель будет показан. Победитель получит все элементы которые были в раунде. В каждой игре мы забираем 0-15%. Он рассчитывается от общей стоимости банка.</div>
            <div style="margin-bottom: 10px; border-left: 1px solid #60B3E5; padding-left: 6px; line-height: 16px;">
                <span style="color: #60B3E5; padding-bottom: 5px; text-transform: uppercase;">ПРОСОЕДИНИТСЯ К ИГРЕ:</span><br>
                <div style="margin-bottom: 8px; margin-top: 2px; padding-left: 30px;">
                    1. <span style="">Вы можете присоединиться к раунду, нажав на кнопку войти. После присоединения у Вас будет 90 секунд на принятие обмена. Если время истекло, мы отменим отправленное предложение и комната снова будет свободна.
Для того, чтобы создать комнату, вы должны иметь Steam, включен Mobile Authenticator.

<br></span>
                </div>


            </div>
            <div class="rules_text" style="margin-bottom: 10px;padding-left: 6px;line-height: 18px;border: 1px solid #3FAA80;">
                <div style="color: #EC785D; padding-top: 5px; text-transform: uppercase;">Правила и особенности:</div>
                <ol style="padding: 0px 30px; margin: 3px; line-height: 15px; font-size: 13px;">
                    <li style="padding-bottom: 6px;">Максимальный депозит - 15 предметов на трейд. Нет ограничений по стоимости предметов. Стоимость одного депозита - минимум 30р.</li>
                    <li style="padding-bottom: 6px;">Для развития сайта и проведения конкурсов, мы взымаем комиссию с каждой игры - до 10% от всех вещей игры.</li>
                    <li style="padding-bottom: 6px;">Депозиты и вывод призового фонда происходят автоматически. Срок отправки выигрыша зависит от загруженности ботов и серверов Steam (в среднем - 1-5 минут)</li>
                    <li style="padding-bottom: 6px;">Каждый раз отправляя предметы, Вы соглашаетесь с правилами использования сайта.</li>
                    <li style="padding-bottom: 6px;">Если Ваш инвентарь закрыт, и\или обмены разрешены только с друзьями, приз будет аннулирован!</li>
                    <li style="padding-bottom: 6px;">Принимаются вещи только из CS:GO, другие вещи будут приняты, но не засчитаны на сайте. Так-же мы можем гарантировать правильную оценку стоимости вещи только тогда, когда она есть на Торговой площадке Steam, иначе ваш предмет может быть неверно оценен.</li>
                    <li style="padding-bottom: 6px;">Вы имеете гарантию получения ваших вещей в течение получаса с момента закрытия пула. По истечении этого времени мы не несем ответственности за утерянные вещи.</li>
                    <li style="padding-bottom: 6px;">Если вы отменили обмен или отправили контр-предложение после победы, то ваши вещи возвращены вам не будут, так как бот не рассчитан на повторную отправку вещей</li>
                    <li style="padding-bottom: 6px;">Если нашего бота забанили в течение 30 минут с окончания матча, мы возмещаем только вашу ставку, но не выигрыш.</li>
                    <li style="padding-bottom: 6px;"></li>
                </ol>
            </div>
            <a href="http://www.free-kassa.ru/"><img src="./JOYSKINS.TOP_files/13.png"></a>
        </div>
    </div>
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
        </table></div>
@endsection