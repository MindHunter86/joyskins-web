@extends('layout')

@section('content')
    <script type="text/javascript" src="{{ asset('assets/js/circle-progress.js') }}"></script>
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
            float: left;
            padding: 15px;
            background-color: yellowgreen;
            text-decoration: none;
            cursor:pointer;
        }
        .btnCreateRoom:hover{
            text-decoration: none;;
        }
        .inv_info{
            float: left;
        }
        .show_inv{
            background-color: green;
            width: 100%;
            text-align: center;
            margin-top: 10px;
            padding: 15px;
            cursor:pointer;
        }
    </style>
    <div class="content_bg">
        <div class="full">
            <div class="content_title"><div>Ваш <b>ИНВЕНТАРЬ.</b>Выберите ставку.</div></div>
            <div class="clear"></div>
            <div class="inv_cash">Загрузка инвентаря...</div>
            <div style="display: block;">
                <a class="btnCreateRoom">Создать комнату</a>
                <div class="content_title inv_info"><div>Предметов выбрано: <b class="inv_count">0</b>, Сумма предметов: <b class="inv_price">0</b></div></div>

            </div>
            <div style="clear: both; content: ' '; display: table;" ></div>
            <div class="show_inv">Показать/скрыть инвентарь</div>
            <div class="inv_table_duel">

            </div>
            <div class="duel_games_list">
                <div class="second circle"></div>
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
            $('.second.circle').circleProgress({
                value: 0.6
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(parseInt(100 * progress));
            });
        });
    </script>
@endsection