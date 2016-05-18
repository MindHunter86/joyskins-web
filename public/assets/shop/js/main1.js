$(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    window.realList = [];
    window.realListObj = {};
    window.ITEM = {};

    window.itemsHolder = $('#items-list');
    var exterior_all = [
        ['Factory new'	    ,	'Factory new'],
        ['Minimal Wear'	,	'Minimal Wear'],
        ['Field-Tested'	,	'Field-Tested'],
        ['Well-Worn'	        ,	'Well-Worn'],
        ['Battle-Scarred'	,	'Battle-Scarred'],
        ['Normal'	        ,	'Normal'],
        [''				        ,	'']
    ];

    var rarity_all = [
        ['Classified'		,	'Classified'],
        ['Restricted'		,	'Restricted'],
        ['Industrial Grade'	,	'Industrial Grade'],
        ['Mil-Spec Grade'	,	'Mil-Spec Grade'],
        ['Consumer Grade'	,	'Consumer Grade'],
        ['High Grade'	,	'High Grade'],
        ['Base Grade'   ,   'Base Grade'],
        ['Exotic'   ,   'Exotic'],
        ['Covert'   ,   'Covert']
    ];

    var type_all = [
        ['Pistol'				,	'Pistol'],
        ['SMG'				,	'SMG'],
        ['Rifle'				,	'Rifle'],
        ['Shotgun'			,	'Shotgun'],
        ['Sniper Rifle'		,	'Sniper Rifle'],
        ['Machinegun'			,	'Machinegun'],
        ['Knife'				,	'Knife'],
        ['Container'			,	'Container'],
        ['Sticker'			,	'Sticker'],
        ['Music Kit'			,	'Music Kit'],
        ['Key'	,	'Key'],
        ['Pass'				,	'Pass'],
        ['Gift'			,	'Gift'],
        ['Tag'		,	'Tag'],
        ['Tool'				,	'Tool']
    ];

window.setupSelects = function() {
        type_all.forEach(function(filter) {
            if (filter[0] == 'NONE') return;
            $('#type_all').append('<option value="'+filter[0]+'">'+filter[1]+'</option>');
        });
        rarity_all.forEach(function(filter) {
            if (filter[0] == 'NONE') return;
            $('#rarity_all').append('<option value="'+filter[0]+'">'+filter[1]+'</option>');
        });
        exterior_all.forEach(function(filter) {
            if (filter[0] == 'NONE') return;
            $('#exterior_all').append('<option value="'+filter[0]+'">'+filter[1]+'</option>');
        });

    $('select')
        .show()
        .select2({
            placeholder: "Все",
            tags: true
        })
        .on("change", function(evt) {
        });
    $('.select2-search__field').attr('readonly', true);
    $('.select2-container .select2-selection').append('<span class="add-tag"></span>');

    setupScroller();
};
window.setupScroller = function() {
    var boxHeight = $(window).height() - 163;
    $('.sorting-items-container').height(boxHeight + 'px');
    $(".nano").nanoScroller({ alwaysVisible: true });

    $('.filter-container').height(boxHeight + 'px');

    //$("img.lazy").lazy({
    //    bind: "event",
    //    appendScroll: $(".nano-content")
    //});
};
window.setupSlider = function(max) {
    //Вызов Range Slider + его конфиг
    var snapSlider = document.getElementById('range-slider');
    noUiSlider.create(snapSlider, {
        start: [0, max],
        connect: true,
        step: 1,
        range: {
            'min': [0],
            'max': [max]
        }
    });

    var snapValues = [document.getElementById('priceFrom'), document.getElementById('priceTo')];
    snapSlider.noUiSlider.on('update', function(values, handle) {
        snapValues[handle].value = Math.round(values[handle]);
        clearTimeout(timer1);
        timer1 = setTimeout(getSortedItems, 200);
    });
    snapValues[0].addEventListener('change', function() {
        snapSlider.noUiSlider.set([this.value, null]);
    });
    snapValues[1].addEventListener('change', function() {
        snapSlider.noUiSlider.set([null, this.value]);
    });
};
    var timer1;
    window.getSortedItems = function(){
        options.minPrice = parseInt($('#priceFrom').val()) || 0;
        options.maxPrice = parseInt($('#priceTo').val()) || 10e10;
        console.log(options);
        $.ajax({
            url: '/ajax',
            type: 'POST',
            dataType: 'json',
            data: { action:'shopSort',options:options },
            success: function(items) {
                console.log(items);
                var html = '';
                items.forEach(function(item){
                    html += '<div class="sorting-item-block"> \
                    <div class="sorting-item-head"> \
                    <div class="sorting-item-head-title"> \
                    <h3>'+item.name+'</h3> \
                    </div> \
                    <div class="item_info"> \
                    <div class="left">'+item.quality+'</div> \
                    <div class="right">'+item.rarity+'</div> \
                    <div class="clearfix"></div> \
                    </div> \
                    </div> \
                    <div class="sorting-item-body"> \
                    <div class="item-image "> \
                    <img src="https://steamcommunity-a.akamaihd.net/economy/image/class/730/'+item.classId+'/120fx120f" alt=""> \
                    </div> \
                    <div class="block-price"> \
                    <div class="old-price">'+item.steam_price+' <span>руб</span></div> \
                    <div class="new-price">'+Math.floor(item.price)+' <span>руб</span></div> \
                    </div> \
                    </div> \
                    \
                    <div class="sorting-item-footer"> \
                    <div class="item-in-stock"> \
                    <div class="in-stock-yes">В наличии</div> \
                    <div class="in-stock-value">1 шт.</div> \
                    </div> \
                    <div class="item-buy-btn"><a class="buyItem" data-item="'+item.id+'">купить</a></div> \
                    </div> \
                    </div>'
                })
                console.log(html);
                $('#items-list').html(html);
                $('#countItems span').text(items.length);
                $('#countItems').show();
                initBuy();
            }
        });
    }

    window.initBuy =    function() {
        $('.buyItem').click(function () {
            if (confirm("Вы действительно хотите этот товар?")) {
                var that = $(this);
                $.ajax({
                    url: '/shop/buy',
                    type: 'POST',
                    dataType: 'json',
                    data: {id: $(this).data('item')},
                    success: function (data) {
                        if (data.success) {
                            $.notify(data.msg, {position: 'bottom right', className: "success"});
                            setTimeout(function () {
                                that.parent().parent().parent().hide()
                            }, 5500);
                            updateBalance();
                        }
                        else {
                            if (data.msg) $.notify(data.msg, {position: 'bottom right', className: "error"});
                        }
                    },
                    error: function () {
                        that.notify("Произошла ошибка. Попробуйте еще раз", {
                            position: 'bottom middle',
                            className: "error"
                        });
                    }
                });
            return false;
        }
    });
}

});
