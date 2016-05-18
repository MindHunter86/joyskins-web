(function($) {
    $.fn.countdown = function(prop) {
        var options = $.extend({
            seconds: 0,
            freeze: false
        }, prop);
        var left, m, s, positions;
        init(this, options);
        positions = this.find(".position");
        var start = Math.floor(new Date / 1e3);
        (function tick() {
            left = start - Math.floor(new Date / 1e3) + options.seconds;
            if (left < 0) {
                left = 0
            }
            m = Math.floor(left / 60);
            updateDuo(0, 1, m);
            s = left - m * 60;
            updateDuo(2, 3, s);
            if (!options.freeze) setTimeout(tick, 1e3)
        })();

        function updateDuo(minor, major, value) {
            switchDigit(positions.eq(minor), Math.floor(value / 10) % 10);
            switchDigit(positions.eq(major), value % 10)
        }
        return this
    };

    function init(elem, options) {
        elem.addClass("countdownHolder");
        $.each(["Minutes", "Seconds"], function(i) {
            $('<span class="count' + this + '"><span class="position"><span class="digit static">0</span></span><span class="position"><span class="digit static">0</span></span></span>').appendTo(elem);
            if (this != "Seconds") {
                elem.append('<span class="countDiv countDiv' + i + '">:</span>')
            }
        })
    }

    function switchDigit(position, number) {
        var digit = position.find(".digit");
        if (digit.is(":animated")) {
            return false
        }
        if (position.data("digit") == number) {
            return false
        }
        position.data("digit", number);
        var replacement = $("<span>", {
            "class": "digit",
            css: {
                top: "-2.1em",
                opacity: 0
            },
            html: number
        });
        digit.before(replacement).removeClass("static").animate({
            top: "2.5em",
            opacity: 0
        }, "fast", function() {
            digit.remove()
        });
        replacement.delay(100).animate({
            top: 0,
            opacity: 1
        }, "fast", function() {
            replacement.addClass("static")
        })
    }
})(jQuery);