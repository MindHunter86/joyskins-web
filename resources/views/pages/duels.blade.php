@extends('layout')

@section('content')
    <style>
        .inv_d_item {
            display: inline-block;
            margin: 2px;
        }
        .inv_choosen {
            background-color: greenyellow;
        }
        .btnCreateRoom {
            display: inline-block;
            text-align: right;
            float: right;
            padding: 15px;
            background-color: yellowgreen;
            text-decoration: none;
        }
    </style>
    <div class="content_bg">
        <div class="full">
            <div class="content_title"><div>Ваш <b>ИНВЕНТАРЬ.</b>Выберите ставку.</div></div>
            <div class="clear"></div>
            <div class="inv_cash">Загрузка инвентаря...</div>
            <div style="display: block;">
                <div class="inv_info content_title">Предметов выбрано: <span class="inv_count">0</span>, Сумма предметов: <span class="inv_price">0</span></div>
                <h2 style="display:inline-block; float: left;">Ваш инвентарь:</h2>
                <a class="btnCreateRoom">Создать комнату</a>
            </div>
            <div style="clear: both;" ></div>
            <div class="inv_table_duel">

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
            loadMyDuelInventory();
        });
    </script>
@endsection