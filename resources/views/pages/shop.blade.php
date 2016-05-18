@extends('layout')

@section('content')

    <div class="notice advantages">

        <div class="item inline-block">
            <div class="icon"><img src="{{ asset('assets/images/icon_percent.png') }}" alt=""></div>
            <h3>Дешевле чем в Steam на 30-50%</h3>
            <p><a href="{{ \App\Http\Controllers\ShopController::LINK_TO_BOT_INVENTORY }}">Посмотреть инвентарь бота</a></p>
        </div>

        <div class="item inline-block">
            <div class="icon"><img src="{{ asset('assets/images/icon_rocket.png') }}" alt=""></div>
            <h3>Моментальная отправка вещей</h3>
            <p><a href="{{ \App\Http\Controllers\ShopController::LINK_TO_REVIEWS }}">Читать отзывы</a></p>
        </div>

        <div class="clr-b"></div>

    </div> <!-- End of Notice -->

    <div class="store-page container">

        <h1>Магазин предметов</h1>

        <div id="countItems" class="pre" style="display: none;">По фильтрам найдено <span>0</span> предметов</div>

        <div class="filters">
            <form>

                <div class="field select left">
                    <div class="title">Категории</div>
                    <select id="searchType" multiple="multiple">
                        <option value="Нож">Нож</option>
                        <option value="Винтовка">Винтовка</option>
                        <option value="Дробовик">Дробовик</option>
                        <option value="Снайперская винтовка">Снайперская винтовка</option>
                        <option value="Пистолет">Пистолет</option>
                        <option value="Пулемёт">Пулемёт</option>
                    </select>
                </div>

                <div class="field select left">
                    <div class="title">Качество</div>
                    <select id="searchQuality" multiple="multiple">
                        <option value="Прямо с завода">Прямо с завода</option>
                        <option value="Немного поношенное">Немного поношенное</option>
                        <option value="После полевых испытаний">После полевых испытаний</option>
                        <option value="Поношенное">Поношенное</option>
                        <option value="Закаленное в боях">Закаленное в боях</option>
                    </select>
                </div>

                <div class="field select left">
                    <div class="title">Редкость</div>
                    <select id="searchRarity" multiple="multiple">
                        <option value="Тайное">Тайное</option>
                        <option value="Засекреченное">Засекреченное</option>
                        <option value="Запрещенное">Запрещенное</option>
                        <option value="Промышленное качество">Промышленное качество</option>
                        <option value="Армейское качество">Армейское качество</option>
                    </select>
                </div>

                <div class="field price left">
                    <div class="title">Диапазон цен</div>
                    <div class="wrapper-price-bar">
                        <div id="price-bar"></div>
                    </div>
                    <span id="price-min"></span><span id="price-max"></span>
                </div>

                <div class="field sort left">
                    <a href="#" onclick="changeSort(this); return false;">Сначала дешевые</a>
                </div>

                <div class="field search right">
                    <input id="searchName" type="text" name="search" value="" placeholder="Поиск">
                </div>

                <div class="clr-b"></div>

            </form>
        </div> <!-- End of Filters -->

        <div class="list-products">
            @foreach(\App\Shop::where('status', \App\Shop::ITEM_STATUS_FOR_SALE)->get() as $item)
            <div class="item left">
                <div class="image">
                    <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/{{ \App\Http\Controllers\GameController::APPID }}/{{ $item->classId }}/120fx120f" alt="">
                </div>
                <div class="wrapper">
                    <h2>{{ $item->name }}</h2>
                    <div class="chars">
                        <ul>
                            <li><span class="gray">Редкость:</span> <span class="{{ \App\Shop::getClassRarity($item->rarity) }}">{{ $item->rarity }}</span></li>
                            <li><span class="gray">Качество:</span> {{ $item->quality }}</li>
                            <li><span class="gray">В наличии:</span> 1 шт.</li>
                            <li><span class="gray">Цена в стиме:</span> {{ $item->steam_price }} руб.</li>
                        </ul>
                    </div>
                    <div class="price left">{{ $item->price }} руб.</div>
                    <div class="buy right">
                        <a class="buyItem" data-item="{{ $item->id }}" href="#">Купить</a>
                    </div>
                    <div class="clr-b"></div>
                </div>
            </div> <!-- End of Item -->
            @endforeach

        </div> <!-- End of List Products -->

    </div>
    </div>

    <!-- End of Content -->
@endsection