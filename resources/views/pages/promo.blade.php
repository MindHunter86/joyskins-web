@extends('layout')

@section('content')
<div class="content_bg">
    <div class="full">
        <div class="content_title"><div>Ваши <b>ПАРТНЕРСКИЕ НАЧИСЛЕНИЯ</b></div></div>
        <div class="clear"></div>
        <div class="inv_table">
            <div class="inv_table_panel">
                <div class="type1">Реферал</div>
                <div class="type2">Ставка</div>
                <div class="type3">Ваш доход</div>
            </div>
        </div>
        @foreach($referal as $refa)
            @foreach($refa as $key => $ref)
                <div class="inv_table_info">
                    <div class="type1"><a href="#" data-profile="{{ $ref->user->steamid64 }}">{{ $ref->user->username }}</a></div>
                    <div class="type2">{{ $ref->price }} руб.</div>
                    <div class="type3">{{ round(($ref->price / 100) * 1)  }} руб.</div>
                </div>
            @endforeach
        @endforeach
    </div>
</div>
@endsection