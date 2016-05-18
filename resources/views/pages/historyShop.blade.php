@extends('layout')

@section('content')
<div class="content_bg">
    <div class="full">
        <div class="content_title"><div>История <b>покупок</b></div></div>
        <div class="clear"></div>
        <div class="inv_table">
            <div class="inv_table_panel">
                <div class="type1">Предмет</div>
                <div class="type2">Цена</div>
                <div class="type3">Статус</div>
            </div>
        </div>
        @forelse($items as $item)
            <div class="inv_table_info">
                <div class="type1">
                    <div><img src="https://steamcommunity-a.akamaihd.net/economy/image/class/730/{{ $item->classId }}/200fx200f"/></div>
                    {{ $item->name }}
                </div>
                <div class="type2">{{ $item->price }} руб.</div>
                <div class="type3">
                    @if($item->status == \App\Shop::ITEM_STATUS_SOLD)
                        <span style="color:orange;">Отправка предмета</span>
                    @elseif($item->status == \App\Shop::ITEM_STATUS_SEND)
                        <span style="color:green;">Отправлен</span>
                    @elseif($item->status == \App\Shop::ITEM_STATUS_NOT_FOUND)
                        <span style="color:red;">Предмет не найден</span>
                    @elseif($item->status == \App\Shop::ITEM_STATUS_ERROR_TO_SEND)
                       <span style="color:red;">Ошибка при отправке</span>
                    @endif
                </div>
            </div>
        @empty
        <center><h3>Покупок не найдено!</h3></center>
        @endforelse
    </div>
</div>
@endsection