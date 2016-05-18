@extends('layout')

@section('content')
<div class="content_bg">
    <div class="full">
        <div class="content_title"><div>Топ <b>Игроков</b></div></div>
        <div class="clear"></div>
        <div class="top_table">
            <div class="top_table_panel">
                <div class="types1">Место</div>
                <div class="types2">Профиль</div>
                <div class="types3">Игр</div>
                <div class="types4">Побед</div>
                <div class="types5">WIN rate</div>
                <div class="types6">Сумма банков</div>
            </div>
            @foreach($users as $user)
                <div class="top_table_info top_table_num_{{ $place }}">
                    <div class="types1"><div>{{ $place++ }}</div></div>
                    <div class="types2"><div><img src="{{ $user->avatar }}" alt="" /></div><a href="#" data-profile="{{ $user->steamid64 }}">{{ $user->username }}</a></div>
                    <div class="types3">{{ $user->games_played }}</div>
                    <div class="types4">{{ $user->wins_count }}</div>
                    <div class="types5">{{ $user->win_rate }}%</div>
                    <div class="types6">{{ round($user->top_value) }} руб.</div>
                </div>
            @endforeach
        </div>
    </div>
@endsection