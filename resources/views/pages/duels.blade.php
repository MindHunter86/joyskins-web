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
        .cf-items{
            font-size: 10px;
        }
        .cf-items img{
            width: 45px;
            height: 45px;
        }
        .coinflip-pots {
            margin-top: 10px;
            border-top: 3px solid #3faa5d;
            border-collapse: collapse;
            width: 100%;
        }
        .coinflip-pots .cf-players {
            width: 150px;
            text-align: center;
            padding: 8px;
            line-height: 1.42857143;
        }
        .coinflip-pots .cf-players img{
            width: 45px;
            height: 45px;
        }
        .coinflip-pots tbody tr:nth-child(2n)
        {
            background-color: #002f17;
        }
        .coinflip-pots thead{
            border-bottom: 1px solid #3faa5d;

        }
        .coinflip-pots thead tr th{
            padding: 8px;

        }
        .cfRoundJoin{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: #45b0cd;
            text-decoration: none;
            cursor:pointer;
        }
        .cfRoundView{
            display: inline-block;
            float: left;
            padding: 15px;
            background-color: #b550cd;
            text-decoration: none;
            cursor:pointer;
        }
        .circle strong {
            position: absolute;
            top: 30px;
            left: 0;
            width: 100%;
            text-align: center;
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
                <table class="coinflip-pots table">
                    <thead>
                    <tr>
                        <th>Игроки</th>
                        <th>Предметы</th>
                        <th>Всего</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody><tr style="display: table-row;">
                        <td class="cf-players">
                            <img src="{{asset('assets/img/coin-t.png')}}" class="coin">
                            <a href="http://steamcommunity.com/profiles/76561197986291877" target="_blank"><img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/62/62636d37d5e62f58d22fbe4e187c635c7be385a1_medium.jpg" alt="Profile" title="pdr =DD"></a>
                        </td>
                        <td class="cf-items">
                            <h3>1 предмет</h3>
                            <div>
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/310776630/120fx100f" class="img-responsive" title="SSG 08 | Blood in the Water (Minimal Wear) - $20.72">

                            </div>
                        </td>
                        <td class="cf-total">
                            <i class="fa fa-dollar"></i> 300 руб.<br><span class="small">Надо: 200 - 500 руб.</span>
                        </td>
                        <td class="cf-timer">
                            <div class="fifth circle" data-value="0.9" data-size="60" data-fill="{
            &quot;color&quot;: &quot;red&quot;
        }" >
                                <strong></strong>
                            </div>
                        </td>
                        <td class="cf-action" data-id="5776dea8ec1914830cb7a1c4" data-team="0" data-steamid="76561197986291877">
                            <a class="btn btn-primary cfRoundJoin">Войти</a>
                            <a class="btn btn-info cfRoundView">Смотреть</a>
                        </td>
                    </tr><tr data-amount="2.85" data-id="5776e133ec1914830cb7a4e0" style="display: table-row;">
                        <td class="cf-players">
                            <img src="{{asset('assets/img/coin-ct.png')}}" class="coin">
                            <a href="http://steamcommunity.com/profiles/76561198073444442" target="_blank"><img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/167406a1ba12afe633900dfa910461dff72cafd4_medium.jpg" alt="Profile" title="{SFY} BreZz CSGOCasino.net"></a>
                        </td>
                        <td class="cf-items">
                            <h3>15 items</h3>
                            <div>
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/1440515303/120fx100f" class="img-responsive" title="Negev | Power Loader (Field-Tested) - $0.4">
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/1560432555/120fx100f" class="img-responsive" title="Glock-18 | Royal Legion (Field-Tested) - $0.35">
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/1310007376/120fx100f" class="img-responsive" title="M249 | Nebula Crusader (Field-Tested) - $0.33">
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/520028714/120fx100f" class="img-responsive" title="PP-Bizon | Osiris (Minimal Wear) - $0.26">
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/1011934811/120fx100f" class="img-responsive" title="MP9 | Ruby Poison Dart (Field-Tested) - $0.22">
                                <span>+ еще 10</span>
                            </div>
                        </td>
                        <td class="cf-total">
                            <i class="fa fa-dollar"></i> 200 руб.<br><span class="small">Надо: 100 - 300 руб.</span>
                        </td>
                        <td class="cf-timer">
                            <div class="fifth circle" data-value="0.9" data-size="60" data-fill="{
            &quot;color&quot;: &quot;greenyellow&quot;
        }" >
                                <strong></strong>
                            </div>
                        </td>
                        <td class="cf-action" data-id="5776e133ec1914830cb7a4e0" data-team="1" data-steamid="76561198073444442">
                            <a class="cfRoundJoin">Войти</a>
                            <a class="cfRoundView">Смотреть</a>
                        </td>
                    </tr></tbody>
                </table>
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
            $('.fifth.circle').circleProgress({
                value: 0.7
                // all other config options were taken from "data-" attributes
                // options passed in config object have higher priority than "data-" attributes
                // "data-" attributes are taken into account only on init (not on update/redraw)
                // "data-fill" (and other object options) should be in valid JSON format
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(parseInt(20 * progress) + 'с');
            });
        });
    </script>
@endsection