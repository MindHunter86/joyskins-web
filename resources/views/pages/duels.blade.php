@extends('layout')

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