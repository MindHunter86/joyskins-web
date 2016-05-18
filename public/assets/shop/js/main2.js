$(function() {

    //При клике на логин показываем дополнительный контейнер
    $('.add-funds-btn, .user-profile').click(function(e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).toggleClass('active');

        var block = $($(this).data('block'));
        if (block.is('.alwaysShow')) return;
        block.toggle();
        block.click(function(e) {
            e.stopPropagation();
        });
    });
    $(document).click(function() {
        var block = $('.add-funds-btn');
        block.removeClass('active');
        block = $(block.data('block'));
        if (!block.is('.alwaysShow')) block.hide();

        var block = $('.user-profile');
        block.removeClass('active');
        block = $(block.data('block'));
        if (!block.is('.alwaysShow')) block.hide();
    });

    $('[data-modal]').click(function() {
        $($(this).data('modal')).arcticmodal();
        return false;
    });
    $('.btnadd').click(function() {
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
    // Кнопка закрыть сообщение
    $(document).on('click', '.message-box-close', function(e) {
        e.preventDefault();
        $('.message-box').fadeOut();
    });

    $(document).on('keypress', '.numeric', function(e) {
        if (!(e.which >= 48 && e.which <=57)) {
            e.preventDefault();
        }
    });

    $('.add-funds-button').on('click', function () {
        $.ajax({
            url: '/ajax',
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'addbalance',
                payload: $(this).prev().val()
            },
            success: function(data) {
                if (data.url) {
                    document.location = data.url;
                }
                if (data.msg) $.notify(data.msg, { className: 'error', position:"bottom right" });
            },
            error: function () {
                $.notify('Произошла ошибка. Попробуйте еще раз', { className: 'error', position:"bottom right" });
            }
        });
    });

    function saveLink() {
        $.ajax({
            url: '/settings/save',
            type: 'POST',
            dataType: 'json',
            data: {trade_link: $('#offer-link').val()},
            success: function (data) {
                if (data.status == 'success') {
                    $.notify(data.msg, { className: 'success', position:"bottom right" });
                }
                else {
                    if (data.msg) $.notify(data.msg, { className: 'error', position:"bottom right" });
                }
            },
            error: function () {
                $.notify('Произошла ошибка. Попробуйте еще раз', { className: 'error', position:"bottom right" });
            }
        });
        return false;
    }
    $('#offer-link')
        .keypress(function(e) {
            if (e.which == 13) saveLink();
        })
        .on('paste', function() {
            setTimeout( function() {
                saveLink();
            }, 0);
        });

    $('.review-answer').click(function() {
        $(this).parents('.review-item').find('.reviews-add').show();
        return false;
    });

    window.isPictureVisible = function isPictureVisible() {
        return $.cookie('offpic') == undefined || $.cookie('offpic') == 'visible';
    };

    function setOffPicText() {
        if (isPictureVisible()) {
            $('.offpicBtn').text('Отключить картинки на сайте');
            $('.item-image').removeClass('offpic');
        }
        else {
            $('.offpicBtn').text('Включить картинки на сайте');
            $('.item-image').addClass('offpic');
        }
    }
    if (!$('.home-sales').length) setOffPicText();
    $('.offpicBtn').click(function() {
        isPictureVisible() ? $.cookie('offpic', 'hidden') : $.cookie('offpic', 'visible');
        setOffPicText();
    });
});
function n2w(n, w) {
    n %= 100;
    if (n > 19) n %= 10;

    switch (n) {
        case 1: return w[0];
        case 2:case 3:case 4: return w[1];
        default: return w[2];
    }
}
Number.prototype.format = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
function str_replace_1(search, replace, subject) {
    for (var i=0; i<search.length; i++) {
        subject = subject.replace(RegExp('^' + search[i] + ' '), replace[i] + ' ');
    }
    return subject;
};
function str_replace_2(search, replace, subject) {
    for (var i=0; i<search.length; i++) {
        subject = subject.replace(RegExp(' ' + search[i] + '$'), ' ' + replace[i]);
    }
    return subject;
};
function str_replace_3(search, replace, subject) {
    for (var i=0; i<search.length; i++) {
        subject = subject.replace(RegExp('^' + search[i] + '$'), '' + replace[i]);
    }
    return subject;
};