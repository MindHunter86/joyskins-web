@extends('layout')

@section('content')
<div class="content_bg">
    <div class="full">
        <div class="content_title"><div>История <b>Игр</b></div></div>
        <div class="clear"></div>
        @forelse($games as $game)
            <div class="_hist">
                <div class="items-info">
                    <div class="items-ava">
                        <img data-profile="{{ $game->winner->steamid64 }}" src="{{ $game->winner->avatar }}" alt="" />
                        @if($game->status_prize == \App\Game::STATUS_PRIZE_WAIT_TO_SENT)
                            <div class="_item_status_white">Отправка</div>
                        @elseif($game->status_prize == \App\Game::STATUS_PRIZE_SEND)
                            <div class="_item_status_green" data-toggle="tooltip" data-original-title="Приз успешно отправлен победителю">Отправлен</div>
                        @else
                            <div class="_item_status_red" data-toggle="tooltip" data-original-title="Ошибка при отправке выигрыша">Ошибка</div>
                        @endif
                        <div class="_item_status_white" style="font-size: 10px;">{{ $game->updated_at->format('d.m.Y - H:i') }}</div>
                    </div>
                    <div class="items-in">
                        <div class="_item_panel_in">
                            <div class="_item_panel_game"><b>Игра:</b> #{{ $game->id }}</div>
                            <div class="_item_panel_rub"><b>Сумма джекпота:</b> {{ $game->price }} руб.</div>
                            <div class="_item_panel_user"><b>Победитель:</b> <a href="#" data-profile="{{ $game->winner->steamid64 }}">{{ $game->winner->username }}</a> (Шанс: {{ \App\Http\Controllers\GameController::_getUserChanceOfGame($game->winner, $game) }}%)</div>
                        </div>
                        <div class="items-panel">
                            <div class="left" data-toggle="tooltip" data-original-title="8 скинов из игры">Выигрыш:</div>
                            <div class="right"><a href="/game/{{ $game->id }}" class="_hist_link">Посмотреть историю игры</a></div>
                        </div>
                        @forelse(json_decode($game->game_items) as $i)
                            <div class="myitem @if(!isset($i->img)){{ $i->rarity }} @else card @endif" data-toggle="tooltip" data-original-title="{{ $i->name }}">
                                @if(!isset($i->img))
                                    <div class="myitem_images"><img src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $i->classid }}/200fx200f" alt="" /></div>
                                @else
                                    <div class="myitem_images"><img src="{{ $i->img }}" alt="" /></div>
                                @endif
                                <div class="myitem_rub">{{ $i->price }} <span>руб.</span></div>
                            </div>
                        @empty
                            <center><h1 style="color: #33BDA6;">Ошибка!</h1></center>
                        @endforelse
                        @if($game->items > 7) 
                            <a href="/game/{{ $game->id }}" class="myitem" style="text-decoration: none;">
                                <div class="myitem_images" style="
                                    height: 99px;
                                    font-size: 30px;
                                    cursor: pointer;
                                    line-height: 104px;
                                ">+{{ $game->items-7 }}</div>
                            </a>
                        @endif
                    </div>
                </div>
            </div>
        @empty
            <center><h1 style="color: #33BDA6;">Игр нет!</h1></center>
        @endforelse
    </div>
</div>
@endsection

@section('content')
    <div class="history-games-block">
        <div class="history-games-body">
            <div class="pageTitle">История игр<br><span style="color: #75A0B2; font-size: 11px;">Показаны последние 50 игр</span></div>
            @forelse($games as $game)
            <div class="history-prize-block">
                @if($game->status_prize == \App\Game::STATUS_PRIZE_WAIT_TO_SENT)
                    <div class="order-status sended_to_our_bot">Отправка выигрыша</div>
                @elseif($game->status_prize == \App\Game::STATUS_PRIZE_SEND)
                    <div class="order-status sended">Выигрыш отправлен</div>
                @else
                    <div class="order-status error">Ошибка отправки выигрыша</div>
                @endif
                <ul>
                    <li>
                        Игра <span>#{{ $game->id }}</span> <a href="/game/{{ $game->id }}" style="color: #33BDA6; font-size: 13px; text-transform: uppercase;">Посмотреть полную историю игры</a>
                    </li>
                    <li>
                        Победил: <a href="#" data-profile="{{ $game->winner->steamid64 }}">{{ $game->winner->username }}</a><span> (одержал победу с шансом {{ \App\Http\Controllers\GameController::_getUserChanceOfGame($game->winner, $game) }}%)</span>
                    </li>
                    <li>
                        Сумма джекпота: <span>{{ $game->price }}р</span>
                    </li>
                </ul>
            </div>
            @empty
                <center><h1 style="color: #33BDA6;">Игр нет!</h1></center>
            @endforelse
        </div>
    </div>
@endsection