@extends('layout')
@section('content')
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
        <div class="full">
            <div class="game-top">
                <div class="left"><b>Игра:</b> <span>#<spans>{{ $game->id }}</spans></span></div>
                <div class="right"><b>Банк:</b> <b class="color-green"><span style="font-size: 14px;">{{ round($game->price) }}</span></b><span class="color-green">руб.</span></div>
            </div>
            <div>
                <ul class="rul_info">
                    <li class="winner-ticket"><b>Победный билет:</b> <span>#{{ $game->ticket }}</span></li>
                    <li class="winner-name"><b>Победил игрок:</b> <span>{{ $game->winner->username }}</span> <u>({{ \App\Http\Controllers\GameController::_getUserChanceOfGame($game->winner, $game) }}%)</u></li>
                </ul>
                <div class="clear"></div>
                <div class="rul_win"><b>Выигрыш:</b> <span class="winner-cost-value">{{ $game->price }}</span> (рублей)</div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
    <div class="notification notification_3"><b>Игра завершилась!</b> <a data-modal="#fairplay" href="#fairplay" class="gamestart_bg">ЧЕСТНАЯ ИГРА</a> Число раунда: <span style="color:#236235;">{{ $game->rand_number }}</span></div>
    <div class="items-full full">
        @foreach($bets as $bet)
            @include('includes.bet')
        @endforeach
    </div>
    <div class="clear"></div>
    <div class="gamestart"><b>ИГРА НАЧАЛАСЬ! ВНОСИТЕ ДЕПОЗИТЫ!</b> <a class="gamestart_bg" data-modal="#fairplay" href="#fairplay">ЧЕСТНАЯ ИГРА</a> Хэш раунда: <span style="color:#236235;">{{ md5($game->rand_number) }}</span></div>
@endsection

@section('content')
    <div class="infobanner">
        Мы используем систему шифрования MD5. Это значит что мы никак не можем подстроить победителя <a data-modal="#fairplay" href="#fairplay">Узнать подробнее</a>
    </div>
    <div class="game">
        <div class="game-info">
            <div class="game-price">
                <div class="game-price-inner">
                    <div class="game-price-content">
                        <p>
                            <span class="game-id">ИГРА <span>#<span>{{ $game->id }}</span></span></span>

                            <span class="game-bank"><span>{{ round($game->price) }}</span><span style="font-size: 14px; padding-left: 3px; color: #ccc;">РУБ</span> БАНК</span>
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


            <div class="gameCarousel">
                <div class="winnerHistory" style="color: #333;">
                    <div class="winner-left">
                        <div class="winner-ticket">Победный билет: <span>#{{ $game->ticket }}</span> <u>(всего: {{ $bankTotal = $game->price * 100 }})</u></div>
                        <div class="winner-name">Победил игрок: <span>{{ $game->winner->username }}</span> <u>({{ \App\Http\Controllers\GameController::_getUserChanceOfGame($game->winner, $game) }}%)</u></div>
                        <div class="winner-cost">
                            <span class="winner-cost-title">Выигрыш:</span>
                            <span class="winner-cost-value">{{ $game->price }}</span>
                            <span class="winner-cost-rub">(рублей)</span>
                        </div>
                    </div>
                    <div class="winner-right">
                        <div class="newgame-timer">
                            <div class="gameover">
                                <a href="/">Вернуться на главную страницу</a>
                            </div>
                        </div>
                    </div>
                    <span class="arrow-wh-top"></span>
                    <span class="arrow-wh-top"></span>
                    <span class="arrow-wh-top"></span>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="fairgame">
        <a data-modal="#fairplay" href="#fairplay">Честная игра</a>
        <span>{{ $game->rand_number }}</span> (число раунда) *
        <span style="color: #FFFCC8;">{{ $bankTotal }}</span> (банк в копейках) =
        <span>{{ $game->ticket }}</span> (победный билет)
    </div>
    <div class="msgs startfinish-msg gameEnd current-round">
        <div class="icon-all icon-end"></div>
        <div class="gametimeCont">Игра завершилась!<br><a data-modal="#fairplay" href="#fairplay">Честная игра</a> <u style="font-weight: 400;">Число раунда:</u> <u style="text-decoration: underline;">{{ $game->rand_number }}</u></div>
    </div>
    <div class="history-block">
        @foreach($bets as $bet)
            @include('includes.bet')
        @endforeach
    </div>

    <div class="msgs startfinish-msg gameStart current-round">
        <div class="icon-all icon-start"></div>
        <div class="gametimeCont">Игра началась! Вносите депозиты!<br>
            <a data-modal="#fairplay" href="#fairplay">Честная игра</a>
            <u style="font-weight: 400;">Хэш раунда:</u> <u style="text-decoration: underline;">{{ md5($game->rand_number) }}</u></div>
    </div>
@endsection