var BANNED_DOMAINS = '(csgofast|csgolucky|csgocasino|game-luck|g2a|csgostar|hellstore|cs-drop|csgo|csgoshuffle|csgotop|csbets|csgobest|csgolike|fast-jackpot|skins-up|hardluck-shop|csgogamble|csgohot|csgofairplay|csgoluxe|csgo1|csgo-chance|csgofb|ezyskins|ezpzskins|csgokill|csgoway|csgolotter|csgomany|csrandom|csgo-winner|csgoninja|csgopick|csgodraw|csgoeasy|csgojackpot|game-raffle|csgonice|kinguin|realskins|csgofart|csgetto|csgo-rand|csgo-jackpot|timeluck|forgames|csgobig|csgo-lottery|csgovictory|csgotrophy|csgo-farming|ezskinz)\.(ru|com|net|gl|one|c|pro)';

$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('.history-block-item .user .username').each(function(){
        $(this).text(replaceLogin($(this).text()));
    });

    ITEMUP.init();
    $('[data-modal]').click(function() {
        $($(this).data('modal')).arcticmodal();
        return false;
    });

    $('.no-link').click(function () {
        $('.linkMsg').removeClass('msgs-not-visible');
        return false;
    });

    $('.offer-link input, .offer-link-inMsg input')
        .keypress(function(e) {
            if (e.which == 13) $(this).next().click()
        })
        .on('paste', function() {
            var that = $(this);
            setTimeout( function() {
                that.next().click();
            }, 0);
        });
    $('.addbalBtn').click(function() {
        $.ajax({
            url: '/merchant',
            type: 'POST',
            dataType: 'json',
            data: {sum: $('#sumadd').val() },
            success: function (data) {
                if (data.status == 'success') {
                    document.location.href = data.url;
                }
                else {
                    if(data.msg) $(btn).notify(data.text, {position: 'bottom middle', className :"error"});
                }
            },
            error: function () {
                $(btn).notify("Произошла ошибка. Попробуйте еще раз", {position: 'bottom middle', className :"error"});
            }
        });
    });
    $('.save-link, .save-link2').click(function () {
        var that = $(this).prev();
        $.ajax({
            url: '/settings/save',
            type: 'POST',
            dataType: 'json',
            data: {trade_link: $(this).prev().val()},
            success: function (data) {
                if (data.status == 'success') {
                    that.notify(data.msg, {position: 'left middle', className :"success"});
                    $('.no-link').attr('href', '/deposit').removeClass('.no-auth').off('click');
                    $('.linkMsg').addClass('msgs-not-visible');
                }
                else {
                    if(data.msg) that.notify(data.msg, {position: 'left middle', className :"error"});
                }
            },
            error: function () {
                that.notify("Произошла ошибка. Попробуйте еще раз", {position: 'left middle', className :"error"});
            }
        });
        return false;
    });


    $(document).on('click', '#checkHash', function () {
        var hash = $('#roundHash1').val();
        var number = $('#roundNumber1').val() || '';
        var bank = $('#roundPrice1').val() || 0;
        var result = $('#checkResult');
        if (hex_md5(number) == hash) {
            var n = Math.floor(bank * parseFloat(number));
            result.html('Хэш Раунда и Число Раунда верны.<br/> ПОБЕДНЫЙ БИЛЕТ - ' + n);
        }
        else {
            result.html('Хэш Раунда и Число Раунда не совпадают.');
        }
    });
});

function getRarity(type) {
    var rarity = '';
    var arr = type.split(',');
    if (arr.length == 2) type = arr[1].trim();
    if (arr.length == 3) type = arr[2].trim();
    if (arr.length && arr[0] == 'Нож') type = '★';
    switch (type) {
        case 'Армейское качество':      rarity = 'milspec'; break;
        case 'Запрещенное':             rarity = 'restricted'; break;
        case 'Засекреченное':           rarity = 'classified'; break;
        case 'Тайное':                  rarity = 'covert'; break;
        case 'Ширпотреб':               rarity = 'common'; break;
        case 'Промышленное качество':   rarity = 'common'; break;
        case '★':                       rarity = 'rare'; break;
        case 'card':                    rarity = 'card'; break;
    }
    return rarity;
}

function n2w(n, w) {
    n %= 100;
    if (n > 19) n %= 10;

    switch (n) {
        case 1: return w[0];
        case 2:case 3:case 4: return w[1];
        default: return w[2];
    }
}
function lpad(str, length) {
    while (str.toString().length < length)
        str = '0' + str;
    return str;
}

function replaceLogin(login) {
    var reg = new RegExp(BANNED_DOMAINS, 'i');
    return login.replace(reg, "");
}

if (START) {
    var socket = io.connect('139.162.150.233:44314' /*{ secure: true }*/);
    socket
        .on('connect', function () {
            $('#loader').hide();
        })
        .on('disconnect', function () {
            $('#loader').show();
        })
        .on('newDeposit', function(data){
            data = JSON.parse(data);
            $('#bets').prepend(data.html);
            var username = $('#bet_'+ data.id +' .history-block-item .user .username').text();
            $('#bet_'+ data.id +' .history-block-item .user .username').text(replaceLogin(username));
            $('#roundBank').text(Math.round(data.gamePrice));
            $('.progressbar-text').html('<span>'+data.itemsCount+'</span>' + n2w(data.itemsCount, [' предмет', ' предмета', ' предметов']));
            $('.progressbar-value').css('width', data.itemsCount + '%');
            console.log( data.chances);
            data.chances.forEach(function(info){
                if(USER_ID == info.steamid64){
                    $('#myItems').text(info.items + n2w(info.items, [' предмет', ' предмета', ' предметов']));
                    $('#myChance').text(info.chance);
                    $('.myDepositButton').addClass('big').text('Внести еще предметов');
                }
                $('.chance_' + info.steamid64).text('('+ info.chance +' %)');
            });
            $('#newBet')[0].play();
            ITEMUP.initTheme();
        })
        .on('online', function (data) {
            $('.stats-onlineNow').text(Math.abs(data));
        })
        .on('timer', function (time) {
            if(timerStatus) {
                console.log(time);
                timerStatus = false;
                $('.gameEndTimer').empty().removeClass('not-active').countdown({seconds: time});
            }
        })
        .on('slider', function (data) {
            if(ngtimerStatus) {
                ngtimerStatus = false;
                console.log(data);
                var users = data.users;
                users = mulAndShuffle(users, Math.ceil(110 / users.length));
                users[6] = data.winner;
                users[100] = data.winner;
                html = '';
                users.forEach(function (i) {
                    html += '<li><img src="' + i.avatar + '"></li>';
                });

                $('.ngtimer').empty().countdown({seconds: data.time});

                $('.current-round .game-progress').addClass('hidden');
                $('.current-round .details-wrap').addClass('hidden');
                $('.current-round .gameCarousel').removeClass('hidden');

                $('.current-round .all-players-list').html(html);
                $('.current-round .winner-cost-value').text(data.game.price);
                $('.current-round .winner-ticket span').html('???');
                $('.current-round .winner-ticket u').text('');
                $('.current-round .winner-name span').html('???');
                $('.current-round .winner-name u').text('');
                $('.current-round .all-players-list').removeClass('active');

                if(data.showSlider) {
                    setTimeout(function () {
                        $('.current-round .all-players-list').addClass('active');
                    }, 500);
                }
                var timeout = data.showSlider ? 13 : 0;
                setTimeout(function () {
                    $('#roundNumber').text(data.round_number);
                    $('.notification_3').removeClass('msgs-not-visible');

                    $('.current-round .winner-ticket span').text('#' + data.ticket);
                    $('.current-round .winner-ticket u').text('(ВСЕГО: ' + data.tickets + ')');
                    $('.current-round .winner-name span').html('<a data-profile="' + data.winner.steamid64 + '" href="#"></a>');
                    $('.current-round .winner-name span a').text(replaceLogin(data.winner.username));
                    $('.current-round .winner-name u').text('(' + data.chance + '%)');
                }, 1000 * timeout);
            }
        })
        .on('newGame', function (data) {
            $('.notification_3').addClass('msgs-not-visible');
            $('.current-round .game-progress').removeClass('hidden');
            $('.current-round .details-wrap').removeClass('hidden');
            $('.current-round .gameCarousel').addClass('hidden');
            $('.current-round .all-players-list').removeClass('active');
            $('#bets').html('');
            $('#myItems').text('0 предметов');
            $('#myChance').text(0);
            $('.stats-gamesToday').text(data.today);
            $('.stats-uniqueUsers').text(data.userstoday);
            $('.myDepositButton').removeClass('big').text('Внести предметы');
            $('#roundId').text(data.id);
            $('#roundBank').text(0);
            $('#roundHash').text(data.hash);
            $('.progressbar-text').html('<span>0</span> предметов');
            $('.progressbar-value').css('width','0%');
            $('.gameEndTimer').addClass('not-active');
            timerStatus = true;
            ngtimerStatus = true;
        })
        .on('queue', function (data) {
            console.log(data);
            if (data) {
                var n = data.indexOf(USER_ID);
                if (n !== -1) {
                    $('.queueMsg u').text('Ваш депозит обрабатывается. Вы '+(n + 1)+' в очереди.');
                    $('.queueMsg').removeClass('msgs-not-visible');
                }
                else {
                    $('.queueMsg').addClass('msgs-not-visible');
                }
            }
        })
        .on('depositDecline', function (data) {
            data = JSON.parse(data);

            if (data.user == USER_ID) {
                clearTimeout(declineTimeout);
                declineTimeout = setTimeout(function() {
                    $('.declineMsg').addClass('msgs-not-visible');
                }, 1000 * 10)
                $('.declineMsg').text(data.msg);
                $('.queueMsg').addClass('msgs-not-visible');
                $('.declineMsg').removeClass('msgs-not-visible');
            }
        })
    var declineTimeout,
        timerStatus = true,
        ngtimerStatus = true;
}

function loadMyInventory() {
    $('thead').hide();
    $.ajax({
        url: '/myinventory',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var text = '<tr><td colspan="4" style="text-align: center">Произошла ошибка. Попробуйте еще раз</td></tr>';
            var totalPrice = 0;

            if (!data.success && data.Error) text = '<tr><td colspan="4" style="text-align: center">'+data.Error+'</td></tr>';

            if (data.success && data.rgInventory && data.rgDescriptions) {
                text = '';
                var items = mergeWithDescriptions(data.rgInventory, data.rgDescriptions);
                console.table(items);
                items.sort(function(a, b) { return parseFloat(b.price) - parseFloat(a.price) });
                _.each(items, function(item) {
                    item.price = item.price || 0;
                    totalPrice += parseFloat(item.price);
                    item.price = item.price;
                    item.image = 'https://steamcommunity-a.akamaihd.net/economy/image/class/730/'+item.classid+'/200fx200f';
                    item.market_name = item.market_name || '';
                    text += ''
                    +'<tr>'
                    +'<td>'+'<img style="width:40px; margin: 0px 30px 0px 40px;" src="'+item.image+'">'+'</td>'
                    +'<td class="' + getRarity(item.type) + '">'+item.name+'</td>'
                    +'<td>'+item.market_name.replace(item.name,'').replace('(','').replace(')','')+'</td>'
                    +'<td>'+(item.price || '---')+'</td>'
                    +'</tr>'
                });
                $('#totalPrice').text(totalPrice.toFixed(2) );
                $('thead').show();
            }

            $('tbody').html(text);
        },
        error: function () {
            $('tbody').html('<tr><td colspan="4" style="text-align: center">Произошла ошибка. Попробуйте еще раз<td></tr>');
        }
    });
}

function mergeWithDescriptions(items, descriptions) {
    return Object.keys(items).map(function(id) {
        var item = items[id];
        var description = descriptions[item.classid + '_' + (item.instanceid || '0')];
        for (var key in description) {
            item[key] = description[key];

            delete item['icon_url'];
            delete item['icon_drag_url'];
            delete item['icon_url_large'];
        }
        return item;
    })
}

function mulAndShuffle(arr, k) {
    var
        res = [],
        len = arr.length,
        total = k * len,
        rand, prev;
    while (total) {
        rand = arr[Math.floor(Math.random() * len)];
        if (len == 1) {
            res.push(prev = rand);
            total--;
        }
        else if (rand !== prev) {
            res.push(prev = rand);
            total--;
        }
    }
    return res;
}

$(document).on('click', '.vote', function() {
    var that = $(this);
    $.ajax({
        url: '/ajax',
        type: 'POST',
        dataType: 'json',
        data: { action: 'voteUser', id: $(this).data('profile') },
        success: function(data) {
            if (data.status == 'success') {
                $('#myProfile').find('.votes').text(data.votes || 0);
            }
            else {
                if (data.msg) that.notify(data.msg, {position: 'bottom middle', className :"error"});
            }
        },
        error: function() {
            that.notify("Произошла ошибка. Попробуйте еще раз", {position: 'bottom middle', className :"error"});
        }
    });
});
    $(document).on('click', '.depositCardBtn, .mainUpCardCont, .items-block-item.card', function () {
        $.post('https://joyskins.top/getBalance', function (data) {
            console.log(data);
            $('#balanced').text(data);
        });

        $('#upCards').arcticmodal();

        //updateCards();

        return false;
    });
$(document).on('click', '[data-profile]', function() {
    var modal = $('#myProfile');
    modal.find('.loading').show();
    modal.find('.clearfix').hide();
    modal.arcticmodal();

    var id = $(this).data('profile');
    $.ajax({
        url: '/ajax',
        type: 'POST',
        dataType: 'json',
        data: { action: 'userInfo', id: id },
        success: function(data) {
            modal.find('.login span').text(replaceLogin(data.username));
            modal.find('.games span').text(data.games);
            modal.find('.wins span').text(data.wins);
            modal.find('.winrate span').text(data.winrate + '%');
            modal.find('.totalBank span').text(data.totalBank + ' руб');
            modal.find('.votes').text(data.votes || 0);
            modal.find('.profile a').attr('href', data.url).text(data.url);
            modal.find('img').attr('src', data.avatar);

            var html = '';
            data.list.forEach(function(game) {
                html += '<div class="myprofile-history-line">';
                html += '<div class="myprofile-history-line-left">ИГРА <span>'+game.id+'</span></div>';
                html += '<div style="float: left; width: 50px; padding: 0px 28px 0px 28px;"><span>'+ game.chance + '%' +'</span></div>';
                html += '<div style="float: left; width: 65px; padding: 0px 10px 0px 0px;"><span>'+ game.bank +'р.</span></div>';
                if (game.win == -1) html += '<div class="myprofile-history-btn" style="color: #ccc;">Не завершена</div>';
                else if (game.win) html += '<div class="myprofile-history-btn" style="color: #09CB64;">Победа</div>';
                else html += '<div class="myprofile-history-btn" style="color: #F16060;">Проигрыш</div>';

                html += '<a href="/game/'+game.id+'" target="_blank">Посмотреть игру</a>';
                html += '</div>';
            });

            modal.find('.games-list').html(html);

            modal.find('.vote').data('profile', id);

            modal.find('.loading').hide();
            modal.find('.clearfix').show();

            if (modal.find('.games-list').is('.ps-container')) modal.find('.games-list').perfectScrollbar('destroy');
            modal.find('.games-list').perfectScrollbar();
        },
        error: function() {
            $.notify("Произошла ошибка. Попробуйте еще раз", {className :"error"});
        }
    });
    return false;
});
