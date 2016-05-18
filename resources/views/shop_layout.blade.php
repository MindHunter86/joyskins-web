<!doctype html>
<html class="no-js" lang="ru">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>ITEMUP.RU/SHOP - Магазин Counter Strike: Global Offensive</title>
    <meta name="keys" content="csgomarket, csgo market, магазин csgo" />
    <meta name="description" content="Магазин скинов CS:GO в котором можно покупать и продавать предметы" />
    <meta name="viewport" content="width=1200">
    <meta name="csrf-token" content="{!!  csrf_token()   !!}">

    <link rel="stylesheet" href="{{ asset('assets/css/normalize.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/shop/css/select2.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/shop/css/style.css') }}" />
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,700&subset=latin,cyrillic' rel='stylesheet' type='text/css' />
    <script src="{{ asset('assets/shop/js/app.js') }}"></script>
    <script src="{{ asset('assets/shop/js/main1.js') }}"></script>
    <script src="{{ asset('assets/shop/js/main2.js') }}"></script>
    <script type="text/javascript" src="https://dotalucky.ru/application/public/js/freshwidget.js"></script>
    <script>
        FreshWidget.init("", {"queryString": "&widgetType=popup&screenshot=no", "widgetType": "popup", "buttonText": "Support", "buttonColor": "white", "buttonBg": "#006063", "backgroundImage": "", "alignment": "4", "offset": "-1500px", "formHeight": "500px", "url": "https://dotalucky.freshdesk.com"} ); 
    </script>

</head>
<body>
<div class="main-container">
    <aside class="sidebar">
        <div class="filter-container">
            <div class="nano">
                <div class="nano-content">
                    <div class="search-form">
                        <span class="search-btn"></span>
                        <input id="searchInput" type="text" placeholder="Поиск по названию" />
                    </div>

                    <div class="range-slide-form">
                        <h2 class="title-style">Цена</h2>
                        <div class="input-block">
                            <div class="form-control">
                                <input type="text" class="numeric" id="priceFrom" value="" />
                            </div>
                            <div class="form-control">
                                <input type="text" class="numeric" id="priceTo" value="" />
                            </div>
                            <div class="currency-type">
                                руб.
                            </div>
                        </div>
                        <div id="range-slider"></div>
                    </div>

                    <div class="select-container">
                        <h2 class="title-style">Качество</h2>
                        <select multiple="multiple" style="display: none" id="exterior_all">
                        </select>
                    </div>

                    <div class="select-container">
                        <h2 class="title-style">Раритетность</h2>
                        <select multiple="multiple" style="display: none" id="rarity_all">
                        </select>
                    </div>

                    <div class="select-container">
                        <h2 class="title-style">Тип</h2>
                        <select multiple="multiple" style="display: none" id="type_all">
                        </select>
                    </div>

                </div>
            </div>
        </div>
    </aside>
    <section class="main">
        <div class="head-content">
            <a class="logotype" href="/"></a>
            <nav class="header-nav">
                <ul id="navbar" class="navbar-nav">
                    <li  class="active" >
                        <a href="/shop">Купить</a>
                    </li>
                </ul>

                <div class="navbar-middle">
                    <li><a href="/comments">Отзывы</a></li>
                    <li><a href="#" data-modal="#botsModal">Инвентарь бота</a></li>
                    <li><a href="#" data-modal="#contactsModal">Контакты</a></li>
                </div>
                @if(Auth::guest())
                <ul class="navbar-nav navbar-right">
                    <li class="authorization-block">
                        <a href="{{ route('login') }}">войти через в steam</a>
                    </li>
                </ul>
                @else
                <ul class="navbar-nav navbar-right">
                    <ul class="rightnavskos">
                        <li class="balance-wrap">
                            <div class="balance">
                                На счету: <span>{{ $u->money }}</span> руб
                            </div>
                            <div class="add-funds-btn" data-block="#balanceInput"></div>
                            <div id="balanceInput" class="add-balance-input" style="display:none;">
                                <div class="form-control">
                                    <input id="sumadd" class="numeric" name="sum" placeholder="Введите сумму" type="text">
                                    <input class="btn btnadd" class="btn add-funds-button btnadd" type="submit" value="Пополнить">
                                </div>
                            </div>
                        </li>
                        <li class="user-profile-container">
                            <div class="user-profile" data-block="#profileContainer">
                                <img src="{{ $u->avatar }}">
                                <span>настройки</span>
                            </div>

                        </li>
                    </ul>

                    <div id="profileContainer" class="user-profile-box" style="display: none;">
                        <div class="user-profile-container">

                            <div class="user-profile-box-left">
                                <img src="{{ $u->avatar }}">
                                <div class="user-profile-box-info">
                                    <div class="user-profile-info-head">
                                        Вы вошли как: {{ $u->username }}
                                        <div class="user-logout-btn">
                                            <a href="/logout">Выйти</a>
                                        </div>
                                    </div>
                                    <div class="user-profile-info-body">
                                        <a href="/shop/history" class="user-profile-btn ">История покупок</a>
                                    </div>
                                </div>
                            </div>

                            <div class="user-profile-box-right">
                                <div class="offer-link-head">
                                    Укажите вашу ссылку на обмен в Steam
                                    <a class="helper-link" href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank">Как узнать ссылку</a>
                                </div>
                                <div class="offer-link-body">
                                    <input id="offer-link" style="width: 100%;" value="{{ $u->trade_link }}" placeholder="Вставьте сюда вашу ссылку на обмен" type="url">
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
                @endif
            </nav>
        </div>
        <div class="body-content">
            <div class="sorting-items-nav">
                <h2>Сортирововать предметы:</h2>
                <ul id="navbar-sort" class="list-sorting">
                    <li onclick="changeSort(this, 'desc'); " class="active"><a href="#">от дорогих к дешевым</a></li>
                    <li onclick="changeSort(this, 'asc'); "><a href="#" >от дешевых к дорогим</a></li>
                </ul>
                <div class="offpicBtn"></div>
            </div>
            <div class="sorting-items-container">
                <div class="nano">
                    <div class="nano-content">
                        <div id="items-list" class="sorting-content">
                            @forelse(\App\Shop::where('status', \App\Shop::ITEM_STATUS_FOR_SALE)->get() as $item)
                                <div class="sorting-item-block Rarity_Ancient_Weapon">
                                    <div class="sorting-item-head">
                                        <div class="sorting-item-head-title">
                                            <h3>{{ $item->name }}</h3>
                                        </div>
                                        <div class="item_info">
                                            <div class="left">{{ $item->quality }}</div>
                                            <div class="right">{{ $item->rarity }}</div>
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                    <div class="sorting-item-body">
                                        <div class="item-image ">
                                            <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $item->classId }}/120fx120f" alt="">
                                        </div>
                                        <div class="block-price">
                                            <div class="old-price">{{ $item->steam_price }} <span>руб</span></div>
                                            <div class="new-price">{{ floor($item->price) }} <span>руб</span></div>
                                        </div>
                                    </div>

                                    <div class="sorting-item-footer">
                                        <div class="item-in-stock">
                                            <div class="in-stock-yes">В наличии</div>
                                            <div class="in-stock-value">1 шт.</div>
                                        </div>
                                        <div class="item-buy-btn buyItem" data-item="{{ $item->id }}"><a>купить</a></div>
                                    </div>
                                </div>
                                @empty
                                    <!--<div id="empty-msg" style="text-align: center">Пока что вещей нет</div>-->
                            @endforelse
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<div style="display:none;">
    <div id="buyModal" class="modal-window">
        <div class="detailed-info">
            <div class="modal-close arcticmodal-close"></div>
            <div class="detailed-info-body">
                <div class="detailed-info-body-left">
                    <div class="detailed-image">
                        <img src="" />
                    </div>
                    <a href="#" class="explore-game" style="display: none; position: relative; z-index: 3;">осмотреть в игре</a>
                </div>
                <div class="detailed-info-body-right">
                    <h2 class="name"></h2>
                    <div class="detailed-info-desc-wrap">
                        <div class="detailed-info-desc">
                            <dl>
                                <dt>Редкость</dt>
                                <dd class="rarity"></dd>
                            </dl>
                        </div>
                        <div class="detailed-info-desc">
                            <dl>
                                <dt>качество</dt>
                                <dd class="type2"></dd>
                            </dl>
                        </div>
                    </div>
                    <div class="detailed-info-price-wrap">
                        <div class="detailed-info-price">
                            <dl>
                                <dt>
                                <div class="detailed-steam-price steamPrice">0 <span>руб</span></div>
                                </dt>
                                <dd>цена в steam</dd>
                            </dl>
                        </div>
                        <div class="detailed-info-price">
                            <dl>
                                <dt class="detailed-our-price ourPrice">0 <span>руб</span></dt>
                                <dd>наша цена</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detailed-info-footer">
                <div class="detailed-info-footer-left">
                    <div class="detailed-info-checkbox">
                        <input id="agreement" type="checkbox" checked="checked">
                        <label for="agreement">
                            Я согласен с <a href="#">условиями</a> и подтверждаю, <br>что не имею ограничений на обмен в Steam.
                        </label>
                    </div>
                    <div class="detailed-info-time">
                        Вы должны будете принять обмен в течении <span>1 часа</span>
                    </div>
                </div>
                <div class="detailed-info-footer-right">
                    <div class="buy-btn">Купить</div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>

<div id="buySuccessMsg" class="message-box message-success" style="display:none;">
    <h2>Вы успешно приобрели предмет</h2>
    <div class="message-text">
        <p>Трейд от нашего бота будет отправлен вам в течении <span>3-х</span> минут.</p>
        <p>Если в течении этих <span>3-х</span> минут вы совершите еще покупки, то все предметы будут отправлены вам в одном трейде от нашего бота.</p>
    </div>
    <div class="ok-btn-block">
        <div class="ok-btn message-box-close">ок</div>
    </div>
</div>

<div style="display:none;">
    <div id="contactsModal">
        <div class="supModalbsc">
            <div class="modal-close arcticmodal-close"></div>
            <h2 class="history-page-title">Служба поддержки</h2>

            <div style="margin-bottom: 7px; border-bottom: 1px dashed #6A717B; padding-bottom: 7px;">
                <span style="color: #ECA594;">Вопрос:</span> Мне не пришел предмет!<br>
                <span style="color: #B7E5B7;">Ответ:</span> Отправка предметов может занимать до 30 минут (в зависимости от загруженности ботов), а также обратите внимание на то, что в настройках приватности вашего аккаунта Steam ваш инвентарь должен быть открыт: <a href="http://steamcommunity.com/id/me/edit/settings/" style="color: #86C9EA;" target="_blank">http://steamcommunity.com/id/me/edit/settings/</a>
            </div>

            <div style="margin-bottom: 7px; border-bottom: 1px dashed #6A717B; padding-bottom: 7px;">
                <span style="color: #ECA594;">Вопрос:</span> Пополнил баланс, а средства не зачислились на аккаунт!<br>
                <span style="color: #B7E5B7;">Ответ:</span> Пополнения через мобильные платежи и банковские карточки могут обрабатываться до 15 минут.
            </div>

            <div class="vksupIf">Если вы здесь не нашли ответа на ваш вопрос, тогда вы можете задать его нашему саппорту<br>через эту форму отправки.</div>
            <a class="vksupBtn" onclick="FreshWidget.show(); return false;" target="_blank">Отправить сообщение саппорту</a>
        </div>
    </div>
</div>



<div style="display:none;">
    <div id="botsModal">
        <div class="supModalbsc">
            <div class="modal-close arcticmodal-close"></div>
            <h2 class="history-page-title">Инвентарь ботов</h2>

            <div style="">
                Вы можете сами убедиться в том, что все продаваемые предметы на нашем сайте есть в наличии у наших ботов:
            </div>

            <div class="botList clearfix">
                <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/aa/aa65d61be43d19ebbd4fb5be16c91f51c33ac3dd_full.jpg"></img>
                <div style="float: left; margin-top: 2px;">
                    <span>ITEMUP.RU SHOP BOT</span><br>
                    <a href="https://steamcommunity.com/profiles/76561198038766700/inventory/#730" target="_blank">Посмотреть инвентарь</a>
                </div>
            </div>
        </div>
    </div>
</div>
<script>

    var options = {
        maxPrice : {{ ($max_price = \App\Shop::where('status', \App\Shop::ITEM_STATUS_FOR_SALE)->max('price')) ? $max_price : $max_price = 1}},
        minPrice : 0,
        searchName : $('#searchInput').val(),
        searchType : null,
        searchRarity: null,
        searchQuality: null,
        sort: 'desc'
    }, timer;
    function changeSort(btn, sort){
        if(options.sort != sort){
            $('#navbar-sort li').removeClass('active');
            $(btn).addClass('active');
            options.sort = sort;
        }
        clearTimeout(timer);
        timer = setTimeout(getSortedItems, 100);
    }

    $(function() {
        initBuy();
        setupSelects();
        setupSlider({{ $max_price }});


        $('#type_all').change(function () {
            options.searchType = $(this).val();
            clearTimeout(timer);
            timer = setTimeout(getSortedItems, 100);
            console.log(options);
        })
        $('#rarity_all').change(function () {
            options.searchRarity = $(this).val();
            clearTimeout(timer);
            timer = setTimeout(getSortedItems, 100);
            console.log(options);
        })
        $('#exterior_all').change(function () {
            options.searchQuality = $(this).val();
            clearTimeout(timer);
            timer = setTimeout(getSortedItems, 100);
            console.log(options);
        })

        $('#searchInput').keyup(function () {
            options.searchName = $(this).val();
            clearTimeout(timer);
            timer = setTimeout(getSortedItems, 100);
            console.log(options);
        })

        $('#priceTo').change(function () {
            options.maxPrice = $(this).val();
            clearTimeout(timer);
            timer = setTimeout(getSortedItems, 100);
        })
        $('#priceFrom').change(function () {
            options.minPrice = $(this).val();
            clearTimeout(timer);
            timer = setTimeout(getSortedItems, 100);
        })

   });
</script>
</body>
</html>