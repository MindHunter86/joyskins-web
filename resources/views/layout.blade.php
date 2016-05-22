<!DOCTYPE html>
<html>
<head>
    <title>JOYSKINS.TOP</title>
    <meta charset="utf-8">
    <meta property="og:title" content="JOYSKINS.TOP" />
    <meta name="keywords" content="Рулетка cs go для бомжей с минимальной ставкой 1 рубль. Именно рулетки кс го с минимальной ставкой 1 рубль самые доступные для бомжей. JOYSKINS.TOP - это cs go рулетка не больше 100 рублей без минимальной ставки. " />
    <meta name="description" content="Рулетка cs go для бомжей с минимальной ставкой 1 рубль. Именно рулетки кс го с минимальной ставкой 1 рубль самые доступные для бомжей. JOYSKINS.TOP - это cs go рулетка не больше 100 рублей без минимальной ставки. " />
    <meta name="csrf-token" content="{!!  csrf_token()   !!}">
    <link rel="shortcut icon" href="{{ asset('favicon.png') }}" type="image/png">
    <link href="{{ asset('assets/css/animate.css') }}" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="{{ asset('new/css/style.css') }}" />
    <script type="text/javascript" src="{{ asset('new/js/jquery.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('new/js/jquery.arcticmodal-0.3.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('new/js/bootstrap.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('new/js/bootstrap-tooltip.js') }}"></script>
    <script type="text/javascript" src="{{ asset('new/js/script.js') }}"></script>
    <script src="{{ asset('assets/js/inc.js') }}" ></script>
    <script src="{{ asset('assets/js/main.js') }}" ></script>

    <script>
        var CHAT_CONNECT = '/chat/4';
    </script>

    @if(!Auth::guest())
        <script>
            const USER_ID = '{{ $u->steamid64 }}';
            var START = true;
        </script>
    @else
        <script>
            const USER_ID = '0';
            var START = true;
        </script>
    @endif
</head>
<audio id="newBet-1" src="{{ asset('new/sound/deposit-1.mp3') }}" preload="auto"></audio>
<audio id="newBet-2" src="{{ asset('new/sound/deposit-2.mp3') }}" preload="auto"></audio>
<audio id="newBet-3" src="{{ asset('new/sound/deposit-3.mp3') }}" preload="auto"></audio>
<audio id="newGame" src="{{ asset('new/sound/game-start.mp3') }}" preload="auto"></audio>
<body>
    <div class="shares">
        <a href="https://vk.com/joyskins_top" target="_blank" class="share"><img style="width: 40px; height: 160px;" src="{{ asset('new/images/Bez-imeni-1.png') }}" /></a>
    </div>
    <div class="chats" style="display:none;">
        <a href="#" class="share chatShow"><img style="width: 40px; height: 160px;" src="{{ asset('new/images/chatOpen.png') }}" /></a>
    </div>
    <div class="wrapper">
        <div id="loader" class="corner">
            <div class="loader-inner ball-clip-rotate-multiple blue-loader">
                <div></div><div></div>
            </div>
        </div>
        <div class="header">
            <div class="full hf">
                <a href="/" class="logo"></a>
                @if(Auth::guest())
                <div class="auth"><a href="{{ route('login') }}">Авторизация</a></div>
                @else
                <div class="mini-profile block">
                    <div class="mini-profile-ava" data-profile="{{ $u->steamid64 }}" style="cursor:pointer;"><img src="{{ $u->avatar }}" alt="" /></div>
                    <div class="mini-profile-login ellipsis" data-profile="{{ $u->steamid64 }}">{{ $u->username }}</div>
                    <a href="/logout" class="mini-profile-logout"></a>
                </div>
                @endif
                <div class="nav">
                    <ul>
                        <li><a href="/top">Топ игроков</a></li>
                        <li><a href="/history">История игр</a></li>
                        <li><a data-modal="#fairplay" href="#fairplay">Честная игра</a></li>
                        <li><a data-modal="#about" href="#about">О сайте</a></li>
                        <li><a href="/shop">Магазин</a></li>
                        <li><a href="#support" data-modal="#support">Поддержка</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="stats full">
            <div><b class="stats-onlineNow">0</b>Сейчас онлайн</div>
            <div><b class="stats-gamesToday">{{ \App\Game::gamesToday() }}</b>Игр сегодня</div>
            <div><b class="stats-uniqueUsers">{{ \App\Game::usersToday() }}</b>Игроков сегодня</div>
            <div><b class="stats-wintoday">{{ \App\Game::maxPriceToday() }}<span>руб.</span></b>Макс.выигрыш сегодня</div>
            <div><b>{{ \App\Game::maxPrice() }}<span>руб.</span></b>Макс.выигрыш</div>
        </div>
        @yield('content')
    </div>
    <div id="chatContainer">
        <div id="chatHeader">
            <span class="chat-text">Чат</span>
            <div class="closeChat">
                <a href="#" class="chatHide"><img class="closeImg" src="{{ asset('new/images/chathide.png') }}" /></a>
            </div>
        </div>
        <div id="chatBody" style="display: block;">
            <div id="chatScroll" class="ps-container ps-active-y">
                <div id="chat_messages">
                
                </div>
            </div>
            <div class="chatText">
                <textarea id="sendie" placeholder="Введите сообщение"></textarea>
                @if($god)
                <!--<a class="chatSmileOpen">
                    <img class="rotsmile" src="{{ asset('new/images/smile.png') }}" style="width: 20px;">
                </a>
                <div class="chatSmileWindow" style="display: none;">
                    <img src="https://dotalucky.ru/dotalucky/smile/1.png" class="smileClick" incert="*1*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/10.png" class="smileClick" incert="*10*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/11.png" class="smileClick" incert="*11*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/12.png" class="smileClick" incert="*12*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/13.png" class="smileClick" incert="*13*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/14.png" class="smileClick" incert="*14*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/15.png" class="smileClick" incert="*15*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/16.png" class="smileClick" incert="*16*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/17.png" class="smileClick" incert="*17*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/18.png" class="smileClick" incert="*18*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/19.png" class="smileClick" incert="*19*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/2.png" class="smileClick" incert="*2*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/20.png" class="smileClick" incert="*20*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/21.png" class="smileClick" incert="*21*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/22.png" class="smileClick" incert="*22*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/23.png" class="smileClick" incert="*23*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/24.png" class="smileClick" incert="*24*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/25.png" class="smileClick" incert="*25*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/26.png" class="smileClick" incert="*26*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/3.png" class="smileClick" incert="*3*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/4.png" class="smileClick" incert="*4*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/5.png" class="smileClick" incert="*5*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/6.png" class="smileClick" incert="*6*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/7.png" class="smileClick" incert="*7*"> 
                    <img src="https://dotalucky.ru/dotalucky/smile/8.png" class="smileClick" incert="*8*">   
                </div>-->
                @endif
            </div>
        </div>
    </div>
    <div class="footer"><a href="https://vk.com/joyskins_top">МЫ ВКонтакте</a><a href="//www.free-kassa.ru/"><img src="//www.free-kassa.ru/img/fk_btn/16.png"></a></div>

    <div class="none">
        <div class="box-modal" id="about" style="width:900px;">
            <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>О сайте</div>
            <div class="rules">
                <div style="margin-bottom: 10px; border-left: 1px solid #FFBD4C; padding-left: 6px;">
                    <span style="color: #FFBD57;">JoySkins</span> – Сервис в котором участвующие вносят свои предметы (скины) и когда в сумме набирается 100 предметов или проходит 3 минуты с момента второго депозита, система определяет 1 победителя, которому и достаются все внесенные предметы.<br>
                    Победитель определяется случайным образом, шанс выигрыша зависит от стоимости внесенных скинов.
                </div>
                <div style="margin-bottom: 10px; padding: 5px 6px; border: 1px solid #5cb85c;">
                    <span style="text-transform: uppercase; color: #3FAA5D;">Принцип прост:</span> Чем больше и дороже предметы Вы ставите, тем больше шанс сорвать джекпот! Но даже вкладывая {{ $min_price = \App\Http\Controllers\GameController::MIN_PRICE }}р., у Вас есть возможность сорвать джекпот!
                </div>
                <div style="margin-bottom: 10px; border-left: 1px solid #60B3E5; padding-left: 6px; line-height: 16px;">
                    <span style="color: #60B3E5; padding-bottom: 5px; text-transform: uppercase;">Как это работает:</span><br>
                    <div style="margin-bottom: 8px; margin-top: 2px; padding-left: 30px;">
                        1. <span style="">Вы вносите свои предметы через кнопку «Принять участие», отправляя трейд нашему боту.<br>
                    Вы можете внести максимум 20 скинов за раз, общая сумма которых не может быть меньше 30р</span>
                    </div>
                    <div style="margin-bottom: 8px; padding-left: 30px;">
                        2. Мы переводим внесенные вами предметы в билеты в соотвествии с их ценой. За каждую 1 копейку стоимости предметов вы получите 1 билет (1 рубль - 100 билетов)<br>
                        Шанс на победу зависит от количества поинтов. Чем больше предметов вы внесете – тем выше ваш шанс на победу.
                    </div>
                    <div style="padding-left: 30px;">
                        3. При достижении порога в 100 скинов (или 2 минуты с момента второго депозита), мы собираем все выданные поинты вместе и случайным образом выбираем одного победителя, но в приоритете те участники, у которых поинтов больше чем у остальных.<br>
                        Победитель получает все внесенные предметы по окончанию раунда.
                    </div>
                </div>
                <div class="rules_text" style="margin-bottom: 10px;padding-left: 6px;line-height: 18px;border: 1px solid #3FAA80;">
                    <div style="color: #EC785D; padding-top: 5px; text-transform: uppercase;">Правила и особенности:</div>
                    <ol style="padding: 0px 30px; margin: 3px; line-height: 15px; font-size: 13px;">
                        <li style="padding-bottom: 6px;">Максимальный депозит - {{ $max_items = \App\Http\Controllers\GameController::MAX_ITEMS }} предметов на трейд. Нет ограничений по стоимости предметов. Стоимость одного депозита - минимум {{ $min_price = \App\Http\Controllers\GameController::MIN_PRICE }}р.</li>
                        <li style="padding-bottom: 6px;">Для развития сайта и проведения конкурсов, мы взымаем комиссию с каждой игры - до 10% от всех вещей игры.</li>
                        <li style="padding-bottom: 6px;">Депозиты и вывод призового фонда происходят автоматически. Срок отправки выигрыша зависит от загруженности ботов и серверов Steam (в среднем - 1-5 минут)</li>
                        <li style="padding-bottom: 6px;">Каждый раз отправляя предметы, Вы соглашаетесь с правилами использования сайта.</li>
                        <li style="padding-bottom: 6px;">Если Ваш инвентарь закрыт, и\или обмены разрешены только с друзьями, приз будет аннулирован!</li>
                        <li style="padding-bottom: 6px;">Принимаются вещи только из CS:GO, другие вещи будут приняты, но не засчитаны на сайте. Так-же мы можем гарантировать правильную оценку стоимости вещи только тогда, когда она есть на Торговой площадке Steam, иначе ваш предмет может быть неверно оценен.</li>
                        <li style="padding-bottom: 6px;">Вы имеете гарантию получения ваших вещей в течение получаса с момента закрытия пула. По истечении этого времени мы не несем ответственности за утерянные вещи.</li>
                        <li style="padding-bottom: 6px;">Если вы отменили обмен или отправили контр-предложение после победы, то ваши вещи возвращены вам не будут, так как бот не рассчитан на повторную отправку вещей</li>
                        <li style="padding-bottom: 6px;">Если нашего бота забанили в течение 30 минут с окончания матча, мы возмещаем только вашу ставку, но не выигрыш.</li>
                        <li style="padding-bottom: 6px;">Если вы ставите в течение 30 секунд до окончания матча, то есть возможность что ваши скины попадут на следующую игру. Мы не несем за это ответственность: стим не всегда обрабатывает обмены мгновенно</li>
                    </ol>
                </div>
                <a href="//www.free-kassa.ru/"><img src="//www.free-kassa.ru/img/fk_btn/13.png"></a>
            </div>
        </div>
        <div class="box-modal" id="support" style="width:800px;">
            <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>Поддержка supports@joyskins.top</div>
            <div class="support">
                <div class="support_text">
<div style="line-height: 15px;">                <div style="color: #3FAA5D; padding-bottom: 5px; text-transform: uppercase;">Огромная просьба перед тем как задавать вопрос в нашу тех.поддержку прочитайте данный FAQ, где вы вероятнее всего найдете ответы на ваши вопросы.</div>                                <div style="margin-top: 15px; margin-bottom: 7px; border-bottom: 1px dashed #6A717B; padding-bottom: 7px;">                    <span style="color: #F12E00;">Вопрос:</span> Мне пришли не все предметы после победы!<br>                    <span style="color: #08C108;">Ответ:</span> С каждой игры мы берем комиссию 10%                </div>                <div style="margin-bottom: 7px; border-bottom: 1px dashed #6A717B; padding-bottom: 7px;">                    <span style="color: #F12E00;">Вопрос:</span> Мне не пришел выигрыш!<br>                    <span style="color: #08C108;">Ответ:</span> Отправка предметов может занимать до 30 минут (в зависимости от загруженности ботов), а также обратите внимание на то, что в настройках приватности вашего аккаунта Steam ваш инвентарь должен быть открыт: <a href="http://steamcommunity.com/id/me/edit/settings/" style="color: #86C9EA;" target="_blank">http://steamcommunity.com/id/me/edit/settings/</a>                </div>                <div style="margin-bottom: 7px; border-bottom: 1px dashed #6A717B; padding-bottom: 7px;">                    <span style="color: #F12E00;">Вопрос:</span> Моя вещь на засчиталась, что делать?<br>                    <span style="color: #08C108;">Ответ:</span> Все пришедшие вещи засчитываются. Если вещь не отображается, не стоит волноваться. Мы просто не смогли загрузить из Стима информацию и картинку. Но цена вещи из Стима всегда загружается и вещь участвует на равных правах в играх.                </div>                <div style="padding-bottom: 7px;">                    <span style="color: #F12E00;">Вопрос:</span> Ваш бот отклоняет мой трейд!<br>                    <span style="color: #08C108;">Ответ:</span>                    Принимаюся только те предметы, которые есть на <a href="http://steamcommunity.com/market/search?appid=730" style="color: #86C9EA;" target="_blank">торговой площадке Steam</a>,                    т.к. мы не сможем определить цену вашего предмета.<br>                    А также принимается вещи только из CS:GO. Если вы положили в трейд предметы с другой игры, такой трейд будет отклонен нашим ботом.                </div>                                                            </div>
                </div>
                <div class="support_text2">Если вы здесь не нашли ответа на ваш вопрос, тогда вы можете отправить в службу поддержки</div>
                <div class="support_button"><a target="_blank" href="https://vk.com/nsapportov"></a></div>
            </div>
        </div>
        <div class="box-modal" id="fairplay" style="width:800px;">
            <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>Честная игра</div>
            <div class="fairgame">
                <div class="fairgame_text">
                    <div style="color: #3FAA5D;padding-bottom: 7px;text-align: center;text-transform: uppercase;font-size: 18px;">Честная игра - как это работает?</div>
                    <div style="line-height: 18px;font-size: 13px;">           <div style="padding-bottom: 10px;">           За каждую внесенную <span style="color: #3FAA5D;">1 копейку</span> вы получаете 1 билет. Например, если вы внесли депозит на 100 руб, то вы получите 10000 билетов <span style="color: #FF8A74;">(т.к. 100р = 10000 копеек, а 1 копейка = 1 билет)</span><br>           </div>           <div style="padding-bottom: 10px;">           В начале каждого раунда наша система берет абсолютно рандомное длинное число от 0 до 1 <span style="color: #3FAA5D;">(например, 0.83952926436439157)</span> и шифрует его через md5 , и показывает его в зашифрованном виде в начале раунда.           <span style="color: #3FAA5D;">(если вы не знаете, что такое md5 - можете <a href="https://ru.wikipedia.org/wiki/MD5" style="color: #324488;" target="_blank">почитать статью на википедии</a>)</span>           </div>           <div style="padding-bottom: 10px;">           Затем, когда раунд завершился, система показывает то число, которое было зашифровано вначале <span style="color: #3FAA5D;">(проверить его вы можете на сайте <a href="http://www.md5.cz/" style="color: #324488;" target="_blank">md5.cz</a>)</span>           и умножает его на банк <span style="color: #3FAA5D;">(в копейках)</span>.           </div>           <div style="padding-bottom: 10px;">           Например, в конце раунда банк составил 1000 рублей,           а 1000 рублей = 100000 копеек <span style="color: #3FAA5D;">(1 рубль = 100 копеек)</span>, то нужно будет число 0.83952926436439157 умножить на банк 100000 копеек <span style="color: #3FAA5D;">(это цифры, которые мы брали для примера)</span> и получим число 83952.           То есть <span style="color: #FF8A74;">в раунде победит человек, у которого есть билет № 83952.</span><br>           <span style="color: #060606;">Следовательно, чем дороже предметы вы внесете - тем больше билетов вы получите, а значит выше шанс получить выигрышный билет.</span>           </div>           <div style="padding-bottom: 10px;">           Вот и всё. Принцип работы честной игры заключается в том, что <span style="color: #FF8A74;">мы никак не можем знать, какой будет банк в конце игры,           а рандомное число для умножения на банк мы даем в самом начале раунда</span> и следовательно, даже если бы мы сильно этого захотели, то никак бы не смогли сделать подставного победителя.           </div>       </div>
                </div>
                <div class="fairgame_check">
                    <b>ПРОВЕРКА ЧЕСТНОЙ ИГРЫ</b>
                    <span>Число раунда * банк (в копейках) = выигрышный билет</span>
                    <div><input type="text" id="roundHash1" placeholder="Хеш раунда" /></div>
                    <div><input type="text" id="roundNumber1" placeholder="Число раунда" /></div>
                    <div><input type="text" id="roundPrice1" placeholder="Кол-во копеек в раунде" /></div>
                    <div><button type="submit" id="checkHash"></button></div>
                </div>
            </div>
        </div>
        <div class="box-modal" id="rulescheck" style="width:800px;">
            <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>Согласитесь с правилами</div>
            <div class="rules">
                <div class="rules_text" style="margin-bottom: 10px;padding-left: 6px;line-height: 18px;border: 1px solid #3FAA80;">
                    <div style="color: #EC785D; padding-top: 5px; text-transform: uppercase;">Правила и особенности:</div>
                    <ol style="padding: 0px 30px; margin: 3px; line-height: 15px; font-size: 13px;">
                        <li style="padding-bottom: 6px;">Максимальный депозит - 20 предметов на трейд. Нет ограничений по стоимости предметов. Стоимость одного депозита - минимум 30р.</li>
                        <li style="padding-bottom: 6px;">Для развития сайта и проведения конкурсов, мы взымаем комиссию с каждой игры - до 10% от всех вещей игры.</li>
                        <li style="padding-bottom: 6px;">Депозиты и вывод призового фонда происходят происходят автоматически. Срок отправки выигрыша зависит от загруженности ботов и серверов Steam (в среднем - 1-5 минут)</li>
                        <li style="padding-bottom: 6px;">Каждый раз отправляя предметы, Вы соглашаетесь с правилами использования сайта.</li>
                        <li style="padding-bottom: 6px;">Если Ваш инвентарь закрыт, и\или обмены разрешены только с друзьями, приз будет аннулирован!</li>
                        <li style="padding-bottom: 6px;">Принимаются вещи только из CS:GO, другие вещи будут приняты, но не засчитаны на сайте. Так-же мы можем гарантировать правильную оценку стоимости вещи только тогда, когда она есть на Торговой площадке Steam, иначе ваш предмет может быть неверно оценен.</li>
                        <li style="padding-bottom: 6px;">Вы имеете гарантию получения ваших вещей в течение получаса с момента закрытия пула. По истечении этого времени мы не несем ответственности за утерянные вещи.</li>
                        <li style="padding-bottom: 6px;">Если вы отменили обмен или отправили контр-предложение после победы, то ваши вещи возвращены вам не будут, так как бот не рассчитан на повторную отправку вещей</li>
                        <li style="padding-bottom: 6px;">Если нашего бота забанили в течение 30 минут с окончания матча, мы возмещаем только вашу ставку, но не выигрыш.</li>
                        <li style="padding-bottom: 6px;">Если вы ставите в течение 30 секунд до окончания матча, то есть возможность что ваши скины попадут на следующую игру. Мы не несем за это ответственность: стим не всегда обрабатывает обмены мгновенно</li>
                    </ol>
                </div>
                <a id="CheckBox" type="checkbox" class="CheckBoxClass"></a>
                <label id="Label" for="CheckBox" class="CheckBoxLabelClass">Согласен с правилама проекта</label>
                <div class="rules_button noactive"><a href="#"></a></div>
            </div>
        </div>
        <div class="box-modal" id="upCards" style="width:560px;">
            <div class="box-modal-top"><div class="box-modal_close arcticmodal-close"></div>Выберите фишки <b>которые хотите купить и внести в игру</b></div>
            <div class="modalcart">
                <div class="modalcart_balance">ВАШ БАЛАНС: <b class="balanced">@if(Auth::check()) {{$u->money}} @else 0 @endif</b> <span>руб.</span></div>
                <div class="modalcart_form">
                    <input id="sumadd" type="text" placeholder="Введите сумму" />
                    <button type="submit" value="" class="addbalBtn"></button>
                </div>
                <div class="modalcart_full">
                    <div class="modalcart_info">
                        <div class="modalcart_info_rub">25 руб.</div>
                        <div class="modalcart_info_img"><img src="{{ asset('new/images/_carts_1.png') }}" alt="" /></div>
                        <div class="modalcart_info_link _links_1" onclick="addTicket(1, this); return false;">Внести</div>
                    </div>
                    <div class="modalcart_info">
                        <div class="modalcart_info_rub">50 руб.</div>
                        <div class="modalcart_info_img"><img src="{{ asset('new/images/_carts_2.png') }}" alt="" /></div>
                        <div class="modalcart_info_link _links_2" onclick="addTicket(2, this); return false;">Внести</div>
                    </div>
                    <div class="modalcart_info">
                        <div class="modalcart_info_rub">150 руб.</div>
                        <div class="modalcart_info_img"><img src="{{ asset('new/images/_carts_3.png') }}" alt="" /></div>
                        <div class="modalcart_info_link _links_3" onclick="addTicket(3, this); return false;">Внести</div>
                    </div>
                    <div class="modalcart_info">
                        <div class="modalcart_info_rub">300 руб.</div>
                        <div class="modalcart_info_img"><img src="{{ asset('new/images/_carts_4.png') }}" alt="" /></div>
                        <div class="modalcart_info_link _links_4" onclick="addTicket(4, this); return false;">Внести</div>
                    </div>
                    <div class="modalcart_info">
                        <div class="modalcart_info_rub">1000 руб.</div>
                        <div class="modalcart_info_img"><img src="{{ asset('new/images/_carts_5.png') }}" alt="" /></div>
                        <div class="modalcart_info_link _links_5" onclick="addTicket(5, this); return false;">Внести</div>
                    </div>
                </div>
                <div class="modalcart_text">
                    <b>ДЛЯ ЧЕГО НУЖНЫ ФИШКИ?</b>
                    Вы можете вносить депозит фишками вместо предметов. Фишки моментально вносятся в раунд без задержек.
                    <br /><br />
                    Фишки меняются на деньги, на которые вы можете совершать покупки в нашем магазине <a href="/shop" target="_blank">JOYSKINS.TOP/SHOP</a>
                </div>
            </div>
        </div>
        <div class="box-modal" id="myProfile" style="width:500px;">
            <div class="loading" style="text-align: center;">Подождите...</div>  
            <div class="box-modal-top tabs"><div class="box-modal_close arcticmodal-close"></div><b class="login"><span></span></b></div>
            <div class="tabs">
                <ul class="tabs_button">
                    <li class="active">Профиль</li>
                    <li class="settingskey">Настройки</li>
                    <li class="settingskey">Партнерка</li>
                </ul>
                <ul class="tabs_link">
                    <li><a href="/profile/history">Мои игры</a></li>
                    <li><a href="/profile/inventory">Инвентарь</a></li>
                </ul>
                <div class="clear"></div>
                <div class="tabs_info active">
                    <div class="profile">
                        <div class="profile_left">
                            <div class="profile_ava"><img src="" alt="" /></div>
                            <div class="profile_repnum">Репутация: <span class="votes"></span></div>
                            <div class="profile_replus vote"></div>
                        </div>
                        <div class="profile_in">
                            <div class="profile_info pico1 login">Ник: <span></span></div>
                            <div class="profile_info pico2 games">Игр: <span></span></div>
                            <div class="profile_info pico3 wins">Побед: <span></span></div>
                            <div class="profile_info pico4 winrate">Winrate: <span></span></div>
                            <div class="profile_info pico5 totalBank">Сумма банков: <span></span></div>
                            <div class="profile_info profile" style="padding: 0 0 0 px; font-size: 10px;"><a href="#" target="_blank">#</a></div>
                        </div>
                        <div class="clear"></div>
                        <div class="profile_hist">История игр</div>
                        <div class="games-list" style="max-height: 395px"></div>
                    </div>
                </div>
                <div class="tabs_info">
                    <form class="mysettings">
                        <b>ВВЕДИТЕ ВАШУ ССЫЛКУ НА ОБМЕН</b>
                        <div>
                        @if(!Auth::guest())
                        <input type="text" placeholder="Введите ссылку на трейд" value="{{ $u->trade_link }}"/>
                        @endif
                        <button class="mysettings_button save-link" type="submit"></button>
                        </div>
                        <div class="mysettings_trade"><a href="http://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank">Где взять ссылку на обмен?</a></div>
                        <div class="clear"></div>
                    </form>
                </div>
                <div class="tabs_info">
                    <form class="mysettings">
                        <b>Активация реферального кода</b>
                        <div>
                        @if(!Auth::guest())
                        <input type="text" class='promo-accept-text' placeholder="Введите реферальный код" value="{{ $u->promo }}"/>
                        @endif
                        <button class="mysettings_button accept-promo" type="submit"></button>
                        </div>
                        <b>Создайте свой реферальный код</b>
                        <div>
                        @if(!Auth::guest())
                        <input type="text" class='promo-create-text' placeholder="Введите реферальный код" value="{{ $code }}"/>
                        @endif
                        <button class="mysettings_button create-promo" type="submit"></button>
                        </div>
                        <div class="mysettings_trade">
                            <a href="/promo">Мои партнерские начисления</a>
                            <br><br>
                            <center><p>ИНФОРМАЦИЯ</p></center>
                            <p>1. После активации кода вы получаете 15 руб. на свой счет, Вы можете потратить их в магазине или использовать как карточку.</p>
                            <p>2. Активация кода возможна только один раз!</p><br><br>
                            <center><p>Как получить реферала</p></center>
                            <p>Попросите своего друга или знакомого активировать Ваш личный код у себя в реферальной системе.</p>
                            <p>Вы будете получать 1% себе на баланс с каждой его ставки</p>
                        </div>
                        <div class="clear"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
<script>(function(a,e,f,g,b,c,d){a.GoogleAnalyticsObject=b;a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)};a[b].l=1*new Date;c=e.createElement(f);d=e.getElementsByTagName(f)[0];c.async=1;c.src=g;d.parentNode.insertBefore(c,d)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create","UA-64317858-6","auto");ga("send","pageview");</script>
<script src="https://cdn.socket.io/socket.io-1.3.5.js"></script>
<script>
    @if(!Auth::guest())
    var timeout = false;
    function updateBalance() {
        $.post('{{route('get.balance')}}', function (data) {
            console.log(data);
            $('.balanced').text(data);
        });
    }
    function addTicket(id, btn) {
        if(!timeout) {
            timeout = true;
            $.post('{{route('add.ticket')}}',{id:id}, function(data){
                updateBalance();
                timeout = false;
                return $(btn).notify(data.text, {position: 'bottom middle', className :data.type});
            });
        }
        else {
            return $(btn).notify('Пожалуйста подождите..', {position: 'bottom middle', className :'error'});
        }

    }
    
    @endif

</script>
<script type="text/javascript" src="{{ asset('new/js/lemmon-slider.js') }}"></script>
<script src="{{ asset('assets/js/firebase.js') }}" ></script>
<script src="{{ asset('assets/js/newapp.js') }}" ></script>
<script src="{{ asset('assets/js/chat.js') }}" ></script>
</body>
</html>
