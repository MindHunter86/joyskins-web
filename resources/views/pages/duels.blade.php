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
                <table class="coinflip-pots table">
                    <thead>
                    <tr>
                        <th>Players</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody><tr data-amount="20.72" data-id="5776dea8ec1914830cb7a1c4" style="display: table-row;">
                        <td class="cf-players">
                            <img src="/assets/images/coinflip/coin-ct.png" class="coin">
                            <a href="http://steamcommunity.com/profiles/76561197986291877" target="_blank"><img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/62/62636d37d5e62f58d22fbe4e187c635c7be385a1_medium.jpg" alt="Profile" title="pdr =DD"></a>
                        </td>
                        <td class="cf-items">
                            <h3>1 items</h3>
                            <div>
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/310776630/120fx100f" class="img-responsive" title="SSG 08 | Blood in the Water (Minimal Wear) - $20.72">

                            </div>
                        </td>
                        <td class="cf-total">
                            <i class="fa fa-dollar"></i> 20.72<br><span class="small">Needs: $18.65 - 22.79</span>
                        </td>
                        <td class="cf-timer"></td>
                        <td class="cf-action" data-id="5776dea8ec1914830cb7a1c4" data-team="0" data-steamid="76561197986291877">
                            <button class="btn btn-primary cfRoundJoin">Join</button>
                            <button class="btn btn-info cfRoundView">View</button>
                        </td>
                    </tr><tr data-amount="2.85" data-id="5776e133ec1914830cb7a4e0" style="display: table-row;">
                        <td class="cf-players">
                            <img src="/assets/images/coinflip/coin-t.png" class="coin">
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
                                <span>+ 10 more</span>
                            </div>
                        </td>
                        <td class="cf-total">
                            <i class="fa fa-dollar"></i> 2.85<br><span class="small">Needs: $2.57 - 3.14</span>
                        </td>
                        <td class="cf-timer"></td>
                        <td class="cf-action" data-id="5776e133ec1914830cb7a4e0" data-team="1" data-steamid="76561198073444442">
                            <button class="btn btn-primary cfRoundJoin">Join</button>
                            <button class="btn btn-info cfRoundView">View</button>
                        </td>
                    </tr><tr data-amount="2.57" data-id="5776e148ec1914830cb7a51a" style="display: table-row;">
                        <td class="cf-players">
                            <img src="/assets/images/coinflip/coin-t.png" class="coin">
                            <a href="http://steamcommunity.com/profiles/76561198138463382" target="_blank"><img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/48/482e788133d7490a952742132c3513acc1c7c984_medium.jpg" alt="Profile" title="×RzK´ | #NoTeVayasLio"></a>
                        </td>
                        <td class="cf-items">
                            <h3>4 items</h3>
                            <div>
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/310776629/120fx100f" class="img-responsive" title="P250 | Hive (Factory New) - $0.8">
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/1703140611/120fx100f" class="img-responsive" title="StatTrak™ MP9 | Bioleak (Factory New) - $0.79">
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/1351099146/120fx100f" class="img-responsive" title="StatTrak™ Glock-18 | Wraiths (Battle-Scarred) - $0.5">
                                <img src=" https://steamcommunity-a.akamaihd.net/economy/image/class/730/310779173/120fx100f" class="img-responsive" title="Nova | Tempest (Field-Tested) - $0.48">

                            </div>
                        </td>
                        <td class="cf-total">
                            <i class="fa fa-dollar"></i> 2.57<br><span class="small">Needs: $2.31 - 2.83</span>
                        </td>
                        <td class="cf-timer"><div style="display: inline; width: 40px; height: 40px;"><canvas width="80" height="80" style="width: 40px; height: 40px;"></canvas><input data-readonly="true" data-displayinput="true" class="cfRoundKnob" value="90" readonly="readonly" style="width: 24px; height: 13px; position: absolute; vertical-align: middle; margin-top: 13px; margin-left: -32px; border: 0px; background: none; font-style: normal; font-variant: normal; font-weight: bold; font-stretch: normal; font-size: 10px; line-height: normal; font-family: Arial; text-align: center; color: rgb(85, 85, 85); padding: 0px; -webkit-appearance: none;"></div></td>
                        <td class="cf-action" data-id="5776e148ec1914830cb7a51a" data-team="1" data-steamid="76561198138463382">
                            <a href="http://steamcommunity.com/profiles/76561198129132345" target="_blank"><img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4b/4b34f18c80e3a2c50f6f7c1590ea624b06716636_medium.jpg" alt="Profile" title="Kreysi"></a>
                            <button class="btn btn-info cfRoundView">View</button>
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
            $('.second.circle').circleProgress({
                value: 1
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(parseInt(50 * progress) + ' с.');
            });
        });
    </script>
@endsection