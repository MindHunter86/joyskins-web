@extends('layout')
@section('modals')
    <div class="box-modal" id="about" style="width:900px;">
        <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>О сайте</div>
        <div class="rules">
            <div style="margin-bottom: 10px; border-left: 1px solid #FFBD4C; padding-left: 6px;">
                <span style="color: #FFBD57;">JoySkins</span> – Сервис в котором участвующие вносят свои предметы (скины) и когда в сумме набирается 100 предметов или проходит 3 минуты с момента второго депозита, система определяет 1 победителя, которому и достаются все внесенные предметы.<br>
                Победитель определяется случайным образом, шанс выигрыша зависит от стоимости внесенных скинов.
            </div>
            <div style="margin-bottom: 10px; padding: 5px 6px; border: 1px solid #5cb85c;">
                <span style="text-transform: uppercase; color: #3FAA5D;">Принцип прост:</span> Чем больше и дороже предметы Вы ставите, тем больше шанс сорвать джекпот! Но даже вкладывая {{ $min_price = \App\Http\Controllers\GameController::MIN_PRICE }}р., у Вас есть возможность сорвать джекпот!
            </div>
            <div style="margin-bottom: 10px; border-left: 1px solid #60B3E5; padding-left: 6px; line-height: 16px;">
                <span style="color: #60B3E5; padding-bottom: 5px; text-transform: uppercase;">Как это работает:</span><br>
                <div style="margin-bottom: 8px; margin-top: 2px; padding-left: 30px;">
                    1. <span style="">Вы вносите свои предметы через кнопку «Принять участие», отправляя трейд нашему боту.<br>
                    Вы можете внести максимум 20 скинов за раз, общая сумма которых не может быть меньше 30р</span>
                </div>
                <div style="margin-bottom: 8px; padding-left: 30px;">
                    2. Мы переводим внесенные вами предметы в билеты в соотвествии с их ценой. За каждую 1 копейку стоимости предметов вы получите 1 билет (1 рубль - 100 билетов)<br>
                    Шанс на победу зависит от количества поинтов. Чем больше предметов вы внесете – тем выше ваш шанс на победу.
                </div>
                <div style="padding-left: 30px;">
                    3. При достижении порога в 100 скинов (или 2 минуты с момента второго депозита), мы собираем все выданные поинты вместе и случайным образом выбираем одного победителя, но в приоритете те участники, у которых поинтов больше чем у остальных.<br>
                    Победитель получает все внесенные предметы по окончанию раунда.
                </div>
            </div>
            <div class="rules_text" style="margin-bottom: 10px;padding-left: 6px;line-height: 18px;border: 1px solid #3FAA80;">
                <div style="color: #EC785D; padding-top: 5px; text-transform: uppercase;">Правила и особенности:</div>
                <ol style="padding: 0px 30px; margin: 3px; line-height: 15px; font-size: 13px;">
                    <li style="padding-bottom: 6px;">Максимальный депозит - {{ $max_items = \App\Http\Controllers\GameController::MAX_ITEMS }} предметов на трейд. Нет ограничений по стоимости предметов. Стоимость одного депозита - минимум {{ $min_price = \App\Http\Controllers\GameController::MIN_PRICE }}р.</li>
                    <li style="padding-bottom: 6px;">Для развития сайта и проведения конкурсов, мы взымаем комиссию с каждой игры - до 10% от всех вещей игры.</li>
                    <li style="padding-bottom: 6px;">Депозиты и вывод призового фонда происходят автоматически. Срок отправки выигрыша зависит от загруженности ботов и серверов Steam (в среднем - 1-5 минут)</li>
                    <li style="padding-bottom: 6px;">Каждый раз отправляя предметы, Вы соглашаетесь с правилами использования сайта.</li>
                    <li style="padding-bottom: 6px;">Если Ваш инвентарь закрыт, и\или обмены разрешены только с друзьями, приз будет аннулирован!</li>
                    <li style="padding-bottom: 6px;">Принимаются вещи только из CS:GO, другие вещи будут приняты, но не засчитаны на сайте. Так-же мы можем гарантировать правильную оценку стоимости вещи только тогда, когда она есть на Торговой площадке Steam, иначе ваш предмет может быть неверно оценен.</li>
                    <li style="padding-bottom: 6px;">Вы имеете гарантию получения ваших вещей в течение получаса с момента закрытия пула. По истечении этого времени мы не несем ответственности за утерянные вещи.</li>
                    <li style="padding-bottom: 6px;">Если вы отменили обмен или отправили контр-предложение после победы, то ваши вещи возвращены вам не будут, так как бот не рассчитан на повторную отправку вещей</li>
                    <li style="padding-bottom: 6px;">Если нашего бота забанили в течение 30 минут с окончания матча, мы возмещаем только вашу ставку, но не выигрыш.</li>
                    <li style="padding-bottom: 6px;">Если вы ставите в течение 30 секунд до окончания матча, то есть возможность что ваши скины попадут на следующую игру. Мы не несем за это ответственность: стим не всегда обрабатывает обмены мгновенно</li>
                </ol>
            </div>
            <a href="//www.free-kassa.ru/"><img src="//www.free-kassa.ru/img/fk_btn/13.png"></a>
        </div>
    </div>
@endsection
@section('content')
    @if(!is_null($lottery))
    <div class="none">
        <div class="box-modal" id="modal-6" style="width:450px;">
            <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>Список участников раздачи</div>
            <div class="list_participant">
                @foreach($players as $player)
                    <p><img src="{{ $player->user->avatar }}" alt="" /><a href="#" data-profile="{{ $player->user->steamid64 }}" class="ellipsis">{{ $player->user->username }}</a></p>
                @endforeach
            </div>
        </div>
    </div>
    <div class="hoax full">
        <div id="slider" class="slider">
            <ul class="list-players">
                @foreach($players as $player)
                    @include('includes.lottery')
                @endforeach
            </ul>
        </div>
        <div class="controls">
            <button class="prev-slide" type="submit"></button>
            <button class="next-slide" type="submit"></button>
        </div>
        <div class="slider-panel">
            <div class="left">Всего: <span><span class='currentPlayer'>{{ $lottery->players }}</span> / <span class='currentMax'>{{ $lottery->max }}</span></span></div>
            <div class="right"><a href="#" class="listPlayers">Список участников</a></div>
        </div>
        <div class="hoax-item">
            <div class="hoax-item-images"><div class="hoax-item-img"><b class="ellipsis lotteryName">{{ $lottery->items->market_hash_name }}</b> Стоимость: <b class="lotteryPrice">{{ $lottery->price }}</b> руб.</div><img class="lotteryImg" src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $lottery->items->classid }}/200fx200f" alt="" /></div>
            <div class="hoax-item-time"><span class="lotteryPrice">{{ $lottery->price }}</span> руб.</div>
        </div>
        <div class="hoax-right">
            <div class="hoax-button"></div>
            <div class="hoax-link">
                <a href="{{ route('giveaway') }}">История розыгрышей</a>
                <a style="display:none;" href="#" onclick="$('#modal-1').arcticmodal(); return false;">Как это работает?</a>
            </div>
        </div>
    </div>
    @endif
    <div class="information full">
        <div class="info-in">
            <div class="info-images"><img src="{{ asset('new/images/info1.png') }}" alt="" /></div>
            <div class="info-text">Чем дороже предметы вы ставите <br /> тем выше шанс на победу</div>
        </div>
        <div class="info-in">
            <div class="info-images"><img src="{{ asset('new/images/info2.png') }}" alt="" /></div>
            <div class="info-text">Максимальный депозит - {{ $max_items = \App\Http\Controllers\GameController::MAX_ITEMS }} предметов <br /> Минимальная сумма депозита - {{ $min_price = \App\Http\Controllers\GameController::MIN_PRICE }} руб</div>
        </div>
        <div class="info-in">
            <div class="info-images"><img src="{{ asset('new/images/info3.png') }}" alt="" /></div>
            <div class="info-text">Сделай депозит первым и получи<br />бонус 10% от его суммы</div>
        </div>
        <div class="clear"></div>
        <div class="info-md5">Нами используется <a data-modal="#fairplay" href="#fairplay">система шифрования MD5</a> Обратите внимания, что мы - никак не можем подстроить победителя.</div>
    </div>
    <div class="game">
        <div class="full gf">

            <div class="game-top">
                <div class="left"><b>Игра:</b> <span>#<spans id="roundId">{{ $game->id }}</spans></span></div>
                <div class="right"><b>Банк:</b> <b class="color-green"><span id="roundBank" style="font-size: 14px;">{{ round($game->price) }}</span></b><span class="color-green">руб.</span></div>
            </div>
            <div class="game-progress">
                <div class="game-scale"><span class="progressbar-text">Внесено {{ $game->items }} из 100 предметов </span><div class="progressbar-value" style="width:{{ $game->items }}%;"></div></div>
                <div class="timer gameEndTimer">
                    <span class="countMinutes">00</span>
                    <span class="countSeconds">00</span>
                </div>
            </div>
            <div class="gameCarousel none">
                <div class="rulet">
                    <ul class="rul-block all-players-list">
                    </ul>
                </div>
                <ul class="rul_info">
                    <li class="winner-ticket"><b>Победный билет:</b> <span class="wt-span">#0</span></li>
                    <li class="winner-name"><b>Победил игрок:</b> <span class="wn-span"></span> <u class="wn-u">(0%)</u></li>
                </ul>
                <div class="new_timer"><div class="ngtimer"><span class="countSeconds"><span class="position"><span class="digit static">0</span></span><span class="position"><span class="digit static">0</span></span></span></div>Новая игра через:</div>
                <div class="clear"></div>
                <div class="rul_win"><b>Выигрыш:</b> <span class="winner-cost-value win-price">0</span> (рублей)</div>
                <div class="rul_button depositModal"><a href="/deposit"></a></div>
                <div class="clear"></div>
            </div>
            <div class="details-wrap">
                @if(!Auth::guest())
                <div class="game-button-2">
                    <a href="{{ route('deposit') }}" target="_blank" class="browser depositModal @if(empty($u->accessToken)) no-link @endif rulesBtn"></a>
                    <a href="steam://url/SteamIDPage/76561198281349456" class="client @if(empty($u->accessToken)) no-link @endif rulesBtn"></a>
                </div>
                @else
                <div class="game-button"><a href="{{ route('login') }}" target="_blank"></a></div>
                @endif
                <div class="clear"></div>
                <div class="notification notification_5 linkMsg msgs-not-visible">
                    <div class="_nt5"><span>ВВЕДИТЕ ССЫЛКУ НА ОБМЕН</span> <a href="http://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank">УЗНАТЬ МОЖНО ТУТ</a></div> 
                    <form>
                        <input type="text" placeholder="Введите ссылку на обмен" />
                        <input type="submit" class="save-link2" value="Сохранить" />
                    </form>
                </div>
                @if(!Auth::guest())
                <div class="game-chance">
                    <div>Вы внесли - <b id="myItems">{{ $user_items }} {{ trans_choice('lang.items', $user_items) }}</b></div>
                    <div>Ваш шанс на победу - <b class="color-green" style="font-size:24px;"><span id="myChance">{{ $user_chance }}</span>%</b></div>
                </div>
                @endif
            </div>
            <div class="cart">
                <div class="cart-text">Вместо предметов вы можете вносить наши фишки <br /> Потом эти фишки можно обменивать на предметы</div>
                <div class="cart-loop">
                    <div class="_carts _carts-1">
                        <div class="cart-bg"><img src="{{ asset('new/images/carts-1.png') }}" alt="" /></div>
                        <div class="cart-rub">25p.</div>
                    </div>
                    <div class="_carts _carts-2">
                        <div class="cart-bg"><img src="{{ asset('new/images/carts-2.png') }}" alt="" /></div>
                        <div class="cart-rub">50р.</div>
                    </div>
                    <div class="_carts _carts-3">
                        <div class="cart-bg"><img src="{{ asset('new/images/carts-3.png') }}" alt="" /></div>
                        <div class="cart-rub">150р.</div>
                    </div>
                    <div class="_carts _carts-4">
                        <div class="cart-bg"><img src="{{ asset('new/images/carts-4.png') }}" alt="" /></div>
                        <div class="cart-rub">300р.</div>
                    </div>
                    <div class="_carts _carts-5">
                        <div class="cart-bg"><img src="{{ asset('new/images/carts-5.png') }}" alt="" /></div>
                        <div class="cart-rub">1000р.</div>
                    </div>
                </div>
                <div class="cart-button"><a class="depositCardBtn" href="#"></a></div>
            </div>
        </div>
    </div>
    <div class="part @if(count($percents) == 0) none @endif" id="game-chances">
        @foreach($percents as $p)
        <div class="block">
        <ul>
            <li>
                <span class="queue-ava">
                    <span class="queue-col">{{ $p->chance }}%</span>
                    <img src="{{ $p->avatar }}" alt="" />
                </span>
            </li>
        </ul>
        </div>
        @endforeach
    </div>
    <div class="queue1 queueMsg1 msgs-not-visible">
        <div class="full">
            <ul class="que">
            </ul>
        </div>
    </div>
    <div class="notification notification_1 sendMsg msgs-not-visible">
        <div class="gametimeCont">Подождите, ваш запрос обрабатывается<br><u class="sendMsgu" style="font-weight: 400; color: #F2F2F2;"></u></div>
    </div>
    <div class="notification notification_2 declineMsg msgs-not-visible bc"></div>
    <div class="notification notification_3 msgs-not-visible bc"><b>Игра завершилась!</b> <a data-modal="#fairplay" href="#fairplay" class="gamestart_bg">ЧЕСТНАЯ ИГРА</a> Число раунда: <span style="color:#236235;" id="roundNumber"></span></div>
    <div id="bets" class="items-full full">
        @foreach($bets as $bet)
            @include('includes.bet')
        @endforeach
    </div>
    <div class="clear"></div>
    <div class="gamestart bc"><b>ИГРА НАЧАЛАСЬ! ВНОСИТЕ ДЕПОЗИТЫ!</b> <a class="gamestart_bg" data-modal="#fairplay" href="#fairplay">ЧЕСТНАЯ ИГРА</a> Хэш раунда: <span style="color:#236235;" id="roundHash">{{ md5($game->rand_number) }}</span></div>
@endsection


@section('content')
    <div class="infobanner">
        Мы используем систему шифрования MD5. Это значит что мы никак не можем подстроить победителя <a data-modal="#fairplay" href="#fairplay">Узнать подробнее</a>
    </div>
    <a href="#" data-modal="#sites" target="_blank"><img src="{{ asset('assets/img/banner.png') }}" /></a>
    <div class="game current-round">
        <div class="game-info">
            <div class="game-price">
                <div class="game-price-inner">
                    <div class="game-price-content">
                        <p>
                            <span class="game-id">ИГРА <span>#<span id="roundId">{{ $game->id }}</span></span></span><span style="margin: 0px 7px;"><img src="{{ asset('assets/img/xline.png') }}" style="margin-top: -3px;"></span>

                            <span class="game-bank"><span id="roundBank">{{ round($game->price) }}</span><span style="font-size: 14px; padding-left: 3px; color: #ccc;">РУБ</span> БАНК</span>
                        </p>
                    </div>
                    <div class="game-price-decor-left">
                        <i class="arrow-wh-right"></i>
                        <i class="arrow-wh-right"></i>
                        <i class="arrow-wh-right"></i>
                        <div>
                            <span><s></s></span>
                            <span><s></s></span>
                        </div>
                    </div>
                    <div class="game-price-decor-right">
                        <i class="arrow-wh-left"></i>
                        <i class="arrow-wh-left"></i>
                        <i class="arrow-wh-left"></i>
                        <div>
                            <span><s></s></span>
                            <span><s></s></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="game-progress">
                <div class="timer countdownHolder gameEndTimer not-active">
                    <span class="countMinutes"><span class="position"><span class="digit static">0</span></span><span class="position"><span class="digit static">0</span></span></span>
                    <span class="countDiv countDiv0">:</span>
                    <span class="countSeconds"><span class="position"><span class="digit static">0</span></span><span class="position"><span class="digit static">0</span></span></span>
                </div>
                <div class="or-text">или через</div>
                <div class="wrap-progressbar" style="box-shadow: none;">
                    <div class="progressbar"></div>
                    <div class="progressbar-text"><span>{{ $game->items }}</span>предметов</div>
                    <div class="progressbar-value" style="width: {{ $game->items }}%"></div>
                </div>
            </div>

            <div class="gameCarousel hidden">
                <div class="all-players">
                    <ul class="all-players-list">
                    </ul>
                </div>
                <div class="winner">
                    <div class="winner-left">
                        <div class="winner-ticket">Победный билет: <span>#0</span> <u>(всего: 0)</u></div>
                        <div class="winner-name">Победил игрок: <span>???</span> <u>(0%)</u></div>
                        <div class="winner-cost">
                            <span class="winner-cost-title">Выигрыш:</span>
                            <span class="winner-cost-value">0</span>
                            <span class="winner-cost-rub">(рублей)</span>
                        </div>
                    </div>
                    <div class="winner-right">
                        <div class="newgame-timer">
                            <span class="newgame-timer-title">Новая игра через:</span>
                            <div class="ngtimer countdownHolder">
                                <span class="countSeconds"><span class="position"><span class="digit static">0</span></span><span class="position"><span class="digit static">0</span></span></span>
                            </div>
                        </div>
                        <div style="float: right; margin-top: 10px;">
                            <a class="depositTwoBtn depositModal" style="width: 215px; padding: 5px 10px 4px;" href="/deposit" target="_blank">Внести предметы первым</a>
                        </div>
                    </div>
                    <span class="arrow-wh-top"></span>
                    <span class="arrow-wh-top"></span>
                    <span class="arrow-wh-top"></span>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>

        <div class="details-wrap @if(Auth::guest()) not-auth @endif">
            @if(!Auth::guest())
                <div class="details type-second clearfix">
                    <div class="arrInfoLogin" style="margin-left: 6px;">
                        Вы внесли в игру - <span id="myItems">{{ $user_items }} {{ trans_choice('lang.items', $user_items) }}</span>
                    </div>
                    <div class="arrInfoLogin">
                        <div style="float: left;">Ваш шанс на победу:</div>
                        <div class="arrInfoLoginPercent"><span id="myChance">{{ $user_chance }}</span>%</div>
                    </div>
                    <div class="arrInfoLogin" style="float:right;margin-right:3px;margin-left:0px;">
                        <a class="depositTwoBtn myDepositButton @if(empty($u->accessToken)) no-link @endif" target="_blank" style="width: 195px;" href="{{ route('deposit') }}">Внести предметы</a>
                    </div>
                </div>
            @else
                <div class="arrInfo" style="margin-left: 18px;">Чем дороже предметы вы ставите<br>тем выше шанс на победу</div>
                <div class="arrInfo">Максимальный депозит - {{ $max_items = \App\Http\Controllers\GameController::MAX_ITEMS }} предметов<br>Минимальная сумма депозита - {{ $min_price = \App\Http\Controllers\GameController::MIN_PRICE }} руб</div>
                <div class="arrInfo4Btn">
                    <a class="depositTwoBtn" style="width:208px;margin-top:-3px;margin-left:8px;" href="{{ route('login') }}">Принять участие</a>
                </div>
            @endif
        </div>
    </div>

    <div class="infobanner">
        Минимальная сумма депозита - {{ $min_price = \App\Http\Controllers\GameController::MIN_PRICE }} руб. На один трейд максимум {{ $max_items = \App\Http\Controllers\GameController::MAX_ITEMS }} предметов (можно вносить любое количество трейдов!)
    </div>
    <div class="cardsMain type-second clearfix">
            <div class="ContUpCard">
                <div style="">Вместо предметов вы можете вносить наши фишки</div>
                <div style="letter-spacing: 0.15px;">Потом эти фишки можно обменивать на предметы</div>
            </div>
                    <div style="float: left;">
                                    <div class="mainUpCard">
                        <div class="mainUpCardCont">
                            <span class="price">30 руб</span>
                            <div class="mainUpCardCont-img"><img src="/assets/img/tickets/card_5.png"></div>
                        </div>
                    </div>
                                    <div class="mainUpCard">
                        <div class="mainUpCardCont">
                            <span class="price">60 руб</span>
                            <div class="mainUpCardCont-img"><img src="/assets/img/tickets/card_4.png"></div>
                        </div>
                    </div>
                                    <div class="mainUpCard">
                        <div class="mainUpCardCont">
                            <span class="price">120 руб</span>
                            <div class="mainUpCardCont-img"><img src="/assets/img/tickets/card_3.png"></div>
                        </div>
                    </div>
                    <div class="mainUpCard">
                        <div class="mainUpCardCont">
                            <span class="price">240 руб</span>
                            <div class="mainUpCardCont-img"><img src="/assets/img/tickets/card_2.png"></div>
                        </div>
                    </div>
                    <div class="mainUpCard">
                        <div class="mainUpCardCont">
                            <span class="price">480 руб</span>
                            <div class="mainUpCardCont-img"><img src="/assets/img/tickets/card_1.png"></div>
                        </div>
                    </div>
                </div>
            <div>
                <a class="depositCardBtn" href="#upCards" style="margin-top: 11px; padding: 8px 15px 7px;">Внести фишки</a>
            </div>
        <div class="clearfix"></div>
    </div>
    <div class="msgs error-msg linkMsg msgs-not-visible">
        <div class="icon-all icon-error"></div>
        <div class="offer-link-inMsgCont">
            Введите вашу ссылку на обмен <a href="http://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank">Узнать ссылку на обмен</a>
            <div class="offer-link-inMsg">
                <div class="input-group-inMsg">
                    <input type="text" placeholder="Вставьте ссылку на обмен..." />
                    <button type="submit" class="input-group-addon-inMsg save-link2">Сохранить</button>
                </div>
            </div>
        </div>
    </div>

    <div class="msgs wait-msg queueMsg msgs-not-visible">
        <div class="icon-all icon-wait"></div>
        <div class="gametimeCont">Подождите, ваш запрос обрабатывается<br><u style="font-weight: 400; color: #F2F2F2;"></u></div>
    </div>

    <div class="msgs error-msg declineMsg msgs-not-visible">
        <div class="icon-all icon-error"></div>
        <div class="gametimeCont">Ваше предложение обмена отклонено<br><u style="font-weight: 400; color: #F2F2F2;"></u></div>
    </div>

    <div class="msgs startfinish-msg gameEnd current-round msgs-not-visible">
        <div class="icon-all icon-end"></div>
        <div class="gametimeCont">Игра завершилась!<br><a data-modal="#fairplay" href="#fairplay">Честная игра</a> <u style="font-weight: 400;">Число раунда:</u> <u style="text-decoration: underline;" id="roundNumber"></u></div>
    </div>

    <div class="msgs endtime-msg forceClose msgs-not-visible">
        <div class="icon-all icon-timer"></div>
        <div class="gametimeCont">Время вышло!<br><u style="font-weight: 400;">Принимаются последние ставки из очереди в текущую игру.</u></div>
    </div>

    <div id="bets" class="history-block">
        @foreach($bets as $bet)
            @include('includes.bet')
        @endforeach
    </div>

    <div class="msgs startfinish-msg gameStart current-round">
        <div class="icon-all icon-start"></div>
        <div class="gametimeCont">Игра началась! Вносите депозиты!<br>
            <a data-modal="#fairplay" href="#fairplay">Честная игра</a>
            <u style="font-weight: 400;">Хэш раунда:</u> <u style="text-decoration: underline;" id="roundHash">{{ md5($game->rand_number) }}</u></div>
    </div>
    <div style="display: none;">
    <div id="upCards" class="itemmodal" style="width: 600px;">
        <div class="box-modal_close arcticmodal-close mini"></div>
        <div class="myUpCardMainCont">

            <div class="myUpCardTitle">
                <div style="text-align: center;margin-left: 10px;">Выберите фишки, которые хотите купить и внести в раунд</div>
            </div>

        </div>

        <div class="buyUpMainCont">
            <div style="display:inline-block;">
                <div class="upCardLeftCol"><div class="upCardLeftColInfo">Ваш баланс: <span class="cardNewBalance" class="balanced">0</span> руб</div></div>
                <div class="addbalCont">
                    <div class="input-group">
                        <input id="sumadd" type="text" placeholder="Введите сумму" /><button type="submit" class="addbalBtn">Пополнить</button>
                    </div>
                </div>
            </div>

            <div style="margin-left: 14px; margin-top: 5px;padding:2px 0px 15px 15px;">
                                                        <div class="buyUpCard">
                            <div class="buyUpCardCont">
                                <span class="buy buyCard" onclick="addTicket(1, this); return false;">внести</span>
                                <span class="price">30 <span style="text-transform:uppercase;font-size: 10px;">руб</span></span>
                                <div class="buyUpCardCont-img"><img src="/assets/img/tickets/card_5.png" /></div>
                            </div>
                        </div>
                                        <div class="buyUpCard">
                            <div class="buyUpCardCont">
                                <span class="buy buyCard" onclick="addTicket(2, this); return false;">внести</span>
                                <span class="price">60 <span style="text-transform:uppercase;font-size: 10px;">руб</span></span>
                                <div class="buyUpCardCont-img"><img src="/assets/img/tickets/card_4.png" /></div>
                            </div>
                        </div>
                                        <div class="buyUpCard">
                            <div class="buyUpCardCont">
                                <span class="buy buyCard" onclick="addTicket(3, this); return false;">внести</span>
                                <span class="price">120 <span style="text-transform:uppercase;font-size: 10px;">руб</span></span>
                                <div class="buyUpCardCont-img"><img src="/assets/img/tickets/card_3.png" /></div>
                            </div>
                        </div>
                                        <div class="buyUpCard">
                            <div class="buyUpCardCont">
                                <span class="buy buyCard" onclick="addTicket(4, this); return false;">внести</span>
                                <span class="price">240 <span style="text-transform:uppercase;font-size: 10px;">руб</span></span>
                                <div class="buyUpCardCont-img"><img src="/assets/img/tickets/card_2.png" /></div>
                            </div>
                        </div>
                                        <div class="buyUpCard">
                            <div class="buyUpCardCont">
                                <span class="buy buyCard" onclick="addTicket(5, this); return false;">внести</span>
                                <span class="price">480 <span style="text-transform:uppercase;font-size: 10px;">руб</span></span>
                                <div class="buyUpCardCont-img"><img src="/assets/img/tickets/card_1.png" /></div>
                            </div>
                        </div>
                            </div>
        </div>

        <div class="myUpCardsInfo">
        <div class="myUpCardsInfoTitle">Для чего нужны фишки?</div>
        <p style="margin-bottom: 8px;">Вы сможете вносить депoзит фишками, вместо предметов. <br>Фишки моментально вносится в раунд без задержек.</p>
        <p>Фишки меняются на деньги и вы можете совершать покупки в нашем магазине <a href="https://JoySkins.Top/shop" target="_blank">JOYSKINS.TOP/SHOP</a></p>
        </div>
    </div>
</div>
@endsection