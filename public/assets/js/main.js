
var ITEMUP = function(){

    'use strict';

    var initAjaxToken = function() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    };

    var initTooltips = function() {
        $(function () {
            $('.wrapper').tooltip({
                trigger: "hover",
                selector: "div[data-toggle=tooltip]"
            })
            $('.game-button-2').tooltip({});
        })
    };

    return {
        init: function() {
            initAjaxToken();
            ITEMUP.initTheme();
        },
        initTheme: function() {
            initTooltips();
        },
        alert: function(response) {
            return noty({
                text: response.text,
                type: response.type,
                theme: 'relax',
                layout: 'topRight',
                timeout: 5000,
                animation: {
                    open:   'animated bounceInRight',
                    close:  'animated bounceOutUp'
                }
            });
        }
    }
}();