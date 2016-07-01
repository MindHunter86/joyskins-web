@extends('layout')

@section('content')
<div class="content_bg">
    <div class="full">
        <div class="content_title"><div>Ваш <b>ИНВЕНТАРЬ</b></div></div>
        <div class="clear"></div>
        <div class="inv_cash">Загрузка инвентаря...</div>
        <div class="inv_table">
            <div class="inv_table_panel">
                <div class="type1">Название</div>
                <div class="type2">Качество</div>
                <div class="type3">Цена</div>
            </div>
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
        loadMyInventory();
    });
</script>
@endsection