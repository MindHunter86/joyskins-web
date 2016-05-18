window.Modernizr = function(a, b, c) {
    function D(a) {
        j.cssText = a
    }

    function E(a, b) {
        return D(n.join(a + ";") + (b || ""))
    }

    function F(a, b) {
        return typeof a === b
    }

    function G(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function H(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!G(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
        }
        return !1
    }

    function I(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : F(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function J(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + p.join(d + " ") + d).split(" ");
        return F(b, "string") || F(b, "undefined") ? H(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), I(e, b, c))
    }

    function K() {
        e.input = function(c) {
            for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k;
            return u.list && (u.list = !! b.createElement("datalist") && !! a.HTMLDataListElement), u
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), t[a[d]] = !! e;
            return t
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var d = "2.8.3",
        e = {}, f = !0,
        g = b.documentElement,
        h = "modernizr",
        i = b.createElement(h),
        j = i.style,
        k = b.createElement("input"),
        l = ":)",
        m = {}.toString,
        n = " -webkit- -moz- -o- -ms- ".split(" "),
        o = "Webkit Moz O ms",
        p = o.split(" "),
        q = o.toLowerCase().split(" "),
        r = {
            svg: "http://www.w3.org/2000/svg"
        }, s = {}, t = {}, u = {}, v = [],
        w = v.slice,
        x, y = function(a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"),
                m = b.body,
                n = m || b.createElement("body");
            if (parseInt(d, 10))
                while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !! i
        }, z = function(b) {
            var c = a.matchMedia || a.msMatchMedia;
            if (c) return c(b) && c(b).matches || !1;
            var d;
            return y("@media " + b + " { #" + h + " { position: absolute; } }", function(b) {
                d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute"
            }), d
        }, A = function() {
            function d(d, e) {
                e = e || b.createElement(a[d] || "div"), d = "on" + d;
                var f = d in e;
                return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = F(e[d], "function"), F(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f
            }
            var a = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return d
        }(),
        B = {}.hasOwnProperty,
        C;
    !F(B, "undefined") && !F(B.call, "undefined") ? C = function(a, b) {
        return B.call(a, b)
    } : C = function(a, b) {
        return b in a && F(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = w.call(arguments, 1),
            e = function() {
                if (this instanceof e) {
                    var a = function() {};
                    a.prototype = c.prototype;
                    var f = new a,
                        g = c.apply(f, d.concat(w.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return c.apply(b, d.concat(w.call(arguments)))
            };
        return e
    }), s.flexbox = function() {
        return J("flexWrap")
    }, s.canvas = function() {
        var a = b.createElement("canvas");
        return !!a.getContext && !! a.getContext("2d")
    }, s.canvastext = function() {
        return !!e.canvas && !! F(b.createElement("canvas").getContext("2d").fillText, "function")
    }, s.webgl = function() {
        return !!a.WebGLRenderingContext
    }, s.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = a.offsetTop === 9
        }), c
    }, s.geolocation = function() {
        return "geolocation" in navigator
    }, s.postmessage = function() {
        return !!a.postMessage
    }, s.websqldatabase = function() {
        return !!a.openDatabase
    }, s.indexedDB = function() {
        return !!J("indexedDB", a)
    }, s.hashchange = function() {
        return A("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
    }, s.history = function() {
        return !!a.history && !! history.pushState
    }, s.draganddrop = function() {
        var a = b.createElement("div");
        return "draggable" in a || "ondragstart" in a && "ondrop" in a
    }, s.websockets = function() {
        return "WebSocket" in a || "MozWebSocket" in a
    }, s.rgba = function() {
        return D("background-color:rgba(150,255,150,.5)"), G(j.backgroundColor, "rgba")
    }, s.hsla = function() {
        return D("background-color:hsla(120,40%,100%,.5)"), G(j.backgroundColor, "rgba") || G(j.backgroundColor, "hsla")
    }, s.multiplebgs = function() {
        return D("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background)
    }, s.backgroundsize = function() {
        return J("backgroundSize")
    }, s.borderimage = function() {
        return J("borderImage")
    }, s.borderradius = function() {
        return J("borderRadius")
    }, s.boxshadow = function() {
        return J("boxShadow")
    }, s.textshadow = function() {
        return b.createElement("div").style.textShadow === ""
    }, s.opacity = function() {
        return E("opacity:.55"), /^0.55$/.test(j.opacity)
    }, s.cssanimations = function() {
        return J("animationName")
    }, s.csscolumns = function() {
        return J("columnCount")
    }, s.cssgradients = function() {
        var a = "background-image:",
            b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            c = "linear-gradient(left top,#9f9, white);";
        return D((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), G(j.backgroundImage, "gradient")
    }, s.cssreflections = function() {
        return J("boxReflect")
    }, s.csstransforms = function() {
        return !!J("transform")
    }, s.csstransforms3d = function() {
        var a = !! J("perspective");
        return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
            a = b.offsetLeft === 9 && b.offsetHeight === 3
        }), a
    }, s.csstransitions = function() {
        return J("transition")
    }, s.fontface = function() {
        var a;
        return y('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
            var e = b.getElementById("smodernizr"),
                f = e.sheet || e.styleSheet,
                g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0
        }), a
    }, s.generatedcontent = function() {
        var a;
        return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
            a = b.offsetHeight >= 3
        }), a
    }, s.video = function() {
        var a = b.createElement("video"),
            c = !1;
        try {
            if (c = !! a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
        } catch (d) {}
        return c
    }, s.audio = function() {
        var a = b.createElement("audio"),
            c = !1;
        try {
            if (c = !! a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "")
        } catch (d) {}
        return c
    }, s.localstorage = function() {
        try {
            return localStorage.setItem(h, h), localStorage.removeItem(h), !0
        } catch (a) {
            return !1
        }
    }, s.sessionstorage = function() {
        try {
            return sessionStorage.setItem(h, h), sessionStorage.removeItem(h), !0
        } catch (a) {
            return !1
        }
    }, s.webworkers = function() {
        return !!a.Worker
    }, s.applicationcache = function() {
        return !!a.applicationCache
    }, s.svg = function() {
        return !!b.createElementNS && !! b.createElementNS(r.svg, "svg").createSVGRect
    }, s.inlinesvg = function() {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg
    }, s.smil = function() {
        return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")))
    }, s.svgclippaths = function() {
        return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")))
    };
    for (var L in s) C(s, L) && (x = L.toLowerCase(), e[x] = s[L](), v.push((e[x] ? "" : "no-") + x));
    return e.input || K(), e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a) C(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, D(""), i = k = null,
    function(a, b) {
        function l(a, b) {
            var c = a.createElement("p"),
                d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function m() {
            var a = s.elements;
            return typeof a == "string" ? a.split(" ") : a
        }

        function n(a) {
            var b = j[a[h]];
            return b || (b = {}, i++, a[h] = i, j[i] = b), b
        }

        function o(a, c, d) {
            c || (c = b);
            if (k) return c.createElement(a);
            d || (d = n(c));
            var g;
            return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g
        }

        function p(a, c) {
            a || (a = b);
            if (k) return a.createDocumentFragment();
            c = c || n(a);
            var d = c.frag.cloneNode(),
                e = 0,
                f = m(),
                g = f.length;
            for (; e < g; e++) d.createElement(f[e]);
            return d
        }

        function q(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                return s.shivMethods ? o(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function(a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(s, b.frag)
        }

        function r(a) {
            a || (a = b);
            var c = n(a);
            return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !! l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a
        }
        var c = "3.7.0",
            d = a.html5 || {}, e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            g, h = "_html5shiv",
            i = 0,
            j = {}, k;
        (function() {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function() {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                }()
            } catch (c) {
                g = !0, k = !0
            }
        })();
        var s = {
            elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: c,
            shivCSS: d.shivCSS !== !1,
            supportsUnknownElements: k,
            shivMethods: d.shivMethods !== !1,
            type: "default",
            shivDocument: r,
            createElement: o,
            createDocumentFragment: p
        };
        a.html5 = s, r(b)
    }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.mq = z, e.hasEvent = A, e.testProp = function(a) {
        return H([a])
    }, e.testAllProps = J, e.testStyles = y, e.prefixed = function(a, b, c) {
        return b ? J(a, b, c) : J(a, "pfx")
    }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e
}(this, this.document),
function(a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a)
    }

    function e(a) {
        return "string" == typeof a
    }

    function f() {}

    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function() {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }
        var j = j || B.errorTimeout,
            l = b.createElement(a),
            o = 0,
            r = 0,
            u = {
                t: d,
                s: c,
                e: f,
                a: i,
                x: j
            };
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r)
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
        var a = B;
        return a.loader = {
            load: j,
            i: 0
        }, a
    }
    var l = b.documentElement,
        m = a.setTimeout,
        n = b.getElementsByTagName("script")[0],
        o = {}.toString,
        p = [],
        q = 0,
        r = "MozAppearance" in l.style,
        s = r && !! b.createRange().compareNode,
        t = s ? l : n.parentNode,
        l = a.opera && "[object Opera]" == o.call(a.opera),
        l = !! b.attachEvent && !l,
        u = r ? "object" : l ? "script" : "img",
        v = l ? "script" : u,
        w = Array.isArray || function(a) {
            return "[object Array]" == o.call(a)
        }, x = [],
        y = {}, z = {
            timeout: function(a, b) {
                return b.length && (a.timeout = b[0]), a
            }
        }, A, B;
    B = function(a) {
        function b(a) {
            var a = a.split("!"),
                b = x.length,
                c = a.pop(),
                d = a.length,
                c = {
                    url: c,
                    origUrl: c,
                    prefixes: a
                }, e, f, g;
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c
        }

        function g(a, e, f, g, h) {
            var i = b(a),
                j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
            })))
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    }), g(a, j, b, 0, h);
                    else if (Object(a) === a)
                        for (n in m = function() {
                            var b = 0,
                                c;
                            for (c in a) a.hasOwnProperty(c) && b++;
                            return b
                        }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l()
                        } : j[n] = function(a) {
                            return function() {
                                var b = [].slice.call(arguments);
                                a && a.apply(this, b), l()
                            }
                        }(k[n])), g(a[n], j, b, n, h))
                } else !c && l()
            }
            var h = !! a.test,
                i = a.load || a.both,
                j = a.callback || f,
                k = j,
                l = a.complete || f,
                m, n;
            c(h ? a.yep : a.nope, !! i), i && c(i)
        }
        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0);
        else if (w(a))
            for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
        else Object(a) === a && h(a, l)
    }, B.addPrefix = function(a, b) {
        z[a] = b
    }, B.addFilter = function(a) {
        x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k = b.createElement("script"),
            l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function() {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var e = b.createElement("link"),
            j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
};
! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [],
        d = c.slice,
        e = c.concat,
        f = c.push,
        g = c.indexOf,
        h = {}, i = h.toString,
        j = h.hasOwnProperty,
        k = {}, l = a.document,
        m = "2.1.3",
        n = function(a, b) {
            return new n.fn.init(a, b)
        }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        p = /^-ms-/,
        q = /-([\da-z])/gi,
        r = function(a, b) {
            return b.toUpperCase()
        };
    n.fn = n.prototype = {
        jquery: m,
        constructor: n,
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
        },
        pushStack: function(a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return n.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(n.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: c.sort,
        splice: c.splice
    }, n.extend = n.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (a = arguments[h]))
                for (b in a) c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === n.type(a)
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window
        },
        isNumeric: function(a) {
            return !n.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isPlainObject: function(a) {
            return "object" !== n.type(a) || a.nodeType || n.isWindow(a) ? !1 : a.constructor && !j.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        },
        globalEval: function(a) {
            var b, c = eval;
            a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        },
        camelCase: function(a) {
            return a.replace(p, "ms-").replace(q, r)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, c) {
            var d, e = 0,
                f = a.length,
                g = s(a);
            if (c) {
                if (g) {
                    for (; f > e; e++)
                        if (d = b.apply(a[e], c), d === !1) break
                } else
                    for (e in a)
                        if (d = b.apply(a[e], c), d === !1) break
            } else if (g) {
                for (; f > e; e++)
                    if (d = b.call(a[e], e, a[e]), d === !1) break
            } else
                for (e in a)
                    if (d = b.call(a[e], e, a[e]), d === !1) break; return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(o, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : g.call(b, a, c)
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var d, f = 0,
                g = a.length,
                h = s(a),
                i = [];
            if (h)
                for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
            else
                for (f in a) d = b(a[f], f, c), null != d && i.push(d);
            return e.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, e, f;
            return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (e = d.call(arguments, 2), f = function() {
                return a.apply(b || this, e.concat(d.call(arguments)))
            }, f.guid = a.guid = a.guid || n.guid++, f) : void 0
        },
        now: Date.now,
        support: k
    }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });

    function s(a) {
        var b = a.length,
            c = n.type(a);
        return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    var t = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
            v = a.document,
            w = 0,
            x = 0,
            y = hb(),
            z = hb(),
            A = hb(),
            B = function(a, b) {
                return a === b && (l = !0), 0
            }, C = 1 << 31,
            D = {}.hasOwnProperty,
            E = [],
            F = E.pop,
            G = E.push,
            H = E.push,
            I = E.slice,
            J = function(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            }, K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            L = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            N = M.replace("w", "w#"),
            O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
            P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
            Q = new RegExp(L + "+", "g"),
            R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
            S = new RegExp("^" + L + "*," + L + "*"),
            T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
            U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
            V = new RegExp(P),
            W = new RegExp("^" + N + "$"),
            X = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + O),
                PSEUDO: new RegExp("^" + P),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + K + ")$", "i"),
                needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
            }, Y = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            $ = /^[^{]+\{\s*\[native \w/,
            _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ab = /[+~]/,
            bb = /'|\\/g,
            cb = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
            db = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            }, eb = function() {
                m()
            };
        try {
            H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
        } catch (fb) {
            H = {
                apply: E.length ? function(a, b) {
                    G.apply(a, I.call(b))
                } : function(a, b) {
                    var c = a.length,
                        d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1
                }
            }
        }

        function gb(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w, x;
            if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;
            if (!e && p) {
                if (11 !== k && (f = _.exec(a)))
                    if (j = f[1]) {
                        if (9 === k) {
                            if (h = b.getElementById(j), !h || !h.parentNode) return d;
                            if (h.id === j) return d.push(h), d
                        } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d
                    } else {
                        if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;
                        if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)), d
                    }
                if (c.qsa && (!q || !q.test(a))) {
                    if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                        o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                        while (l--) o[l] = s + rb(o[l]);
                        w = ab.test(a) && pb(b.parentNode) || b, x = o.join(",")
                    }
                    if (x) try {
                        return H.apply(d, w.querySelectorAll(x)), d
                    } catch (y) {} finally {
                        r || b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(R, "$1"), b, d, e)
        }

        function hb() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }
            return b
        }

        function ib(a) {
            return a[u] = !0, a
        }

        function jb(a) {
            var b = n.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function kb(a, b) {
            var c = a.split("|"),
                e = a.length;
            while (e--) d.attrHandle[c[e]] = b
        }

        function lb(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c)
                while (c = c.nextSibling)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function mb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function nb(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function ob(a) {
            return ib(function(b) {
                return b = +b, ib(function(c, d) {
                    var e, f = a([], c.length, b),
                        g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function pb(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }
        c = gb.support = {}, f = gb.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, m = gb.setDocument = function(a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", eb, !1) : e.attachEvent && e.attachEvent("onunload", eb)), p = !f(g), c.attributes = jb(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = jb(function(a) {
                return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = jb(function(a) {
                return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length
            }), c.getById ? (d.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, d.filter.ID = function(a) {
                var b = a.replace(cb, db);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function(a) {
                var b = a.replace(cb, db);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                return p ? b.getElementsByClassName(a) : void 0
            }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (jb(function(a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
            }), jb(function(a) {
                var b = g.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && jb(function(a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    while (b = b.parentNode)
                        if (b === a) return !0;
                return !1
            }, B = b ? function(a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
            } : function(a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    h = [a],
                    i = [b];
                if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                if (e === f) return lb(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) i.unshift(c);
                while (h[d] === i[d]) d++;
                return d ? lb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
            }, g) : n
        }, gb.matches = function(a, b) {
            return gb(a, null, null, b)
        }, gb.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return gb(b, n, null, [a]).length > 0
        }, gb.contains = function(a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, gb.attr = function(a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, gb.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, gb.uniqueSort = function(a) {
            var b, d = [],
                e = 0,
                f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return k = null, a
        }, e = gb.getText = function(a) {
            var b, c = "",
                d = 0,
                f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else
                while (b = a[d++]) c += e(b);
            return c
        }, d = gb.selectors = {
            cacheLength: 50,
            createPseudo: ib,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || gb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && gb.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(cb, db).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = gb.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p])
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [w, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
                            else
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break; return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || gb.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ib(function(a, c) {
                        var d, f = e(a, b),
                            g = f.length;
                        while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function(a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: ib(function(a) {
                    var b = [],
                        c = [],
                        d = h(a.replace(R, "$1"));
                    return d[u] ? ib(function(a, b, c, e) {
                        var f, g = d(a, null, e, []),
                            h = a.length;
                        while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                    }
                }),
                has: ib(function(a) {
                    return function(b) {
                        return gb(a, b).length > 0
                    }
                }),
                contains: ib(function(a) {
                    return a = a.replace(cb, db),
                    function(b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                    }
                }),
                lang: ib(function(a) {
                    return W.test(a || "") || gb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(),
                    function(b) {
                        var c;
                        do
                            if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === o
                },
                focus: function(a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !! (a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !! a.checked || "option" === b && !! a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !d.pseudos.empty(a)
                },
                header: function(a) {
                    return Z.test(a.nodeName)
                },
                input: function(a) {
                    return Y.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();

                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: ob(function() {
                    return [0]
                }),
                last: ob(function(a, b) {
                    return [b - 1]
                }),
                eq: ob(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: ob(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: ob(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: ob(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: ob(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) d.pseudos[b] = mb(b);
        for (b in {
            submit: !0,
            reset: !0
        }) d.pseudos[b] = nb(b);

        function qb() {}
        qb.prototype = d.filters = d.pseudos, d.setFilters = new qb, g = gb.tokenize = function(a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(R, " ")
                }), h = h.slice(c.length));
                for (g in d.filter)!(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? gb.error(a) : z(a, i).slice(0)
        };

        function rb(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function sb(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;
            return b.first ? function(b, c, f) {
                while (b = b[d])
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [w, f];
                if (g) {
                    while (b = b[d])
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    while (b = b[d])
                        if (1 === b.nodeType || e) {
                            if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function tb(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function ub(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) gb(a, b[d], c);
            return c
        }

        function vb(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function wb(a, b, c, d, e, f) {
            return d && !d[u] && (d = wb(d)), e && !e[u] && (e = wb(e, f)), ib(function(f, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = f || ub(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : vb(p, m, a, h, i),
                    r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = vb(r, n), d(j, [], h, i), k = j.length;
                    while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--)(l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = vb(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
            })
        }

        function xb(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sb(function(a) {
                    return a === b
                }, h, !0), l = sb(function(a) {
                    return J(b, a) > -1
                }, h, !0), m = [
                    function(a, c, d) {
                        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                        return b = null, e
                    }
                ]; f > i; i++)
                if (c = d.relative[a[i].type]) m = [sb(tb(m), c)];
                else {
                    if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                        for (e = ++i; f > e; e++)
                            if (d.relative[a[e].type]) break;
                        return wb(i > 1 && tb(m), i > 1 && rb(a.slice(0, i - 1).concat({
                            value: " " === a[i - 2].type ? "*" : ""
                        })).replace(R, "$1"), c, e > i && xb(a.slice(i, e)), f > e && xb(a = a.slice(e)), f > e && rb(a))
                    }
                    m.push(c)
                }
            return tb(m)
        }

        function yb(a, b) {
            var c = b.length > 0,
                e = a.length > 0,
                f = function(f, g, h, i, k) {
                    var l, m, o, p = 0,
                        q = "0",
                        r = f && [],
                        s = [],
                        t = j,
                        u = f || e && d.find.TAG("*", k),
                        v = w += null == t ? 1 : Math.random() || .1,
                        x = u.length;
                    for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                        if (e && l) {
                            m = 0;
                            while (o = a[m++])
                                if (o(l, g, h)) {
                                    i.push(l);
                                    break
                                }
                            k && (w = v)
                        }
                        c && ((l = !o && l) && p--, f && r.push(l))
                    }
                    if (p += q, c && q !== p) {
                        m = 0;
                        while (o = b[m++]) o(r, s, g, h);
                        if (f) {
                            if (p > 0)
                                while (q--) r[q] || s[q] || (s[q] = F.call(i));
                            s = vb(s)
                        }
                        H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && gb.uniqueSort(i)
                    }
                    return k && (w = v, j = t), r
                };
            return c ? ib(f) : f
        }
        return h = gb.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = xb(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, yb(e, d)), f.selector = a
            }
            return f
        }, i = gb.select = function(a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a,
                o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b) return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                }
                i = X.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type]) break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && pb(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && rb(j), !a) return H.apply(e, f), e;
                        break
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, ab.test(a) && pb(b.parentNode) || b), e
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !! l, m(), c.sortDetached = jb(function(a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"))
        }), jb(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || kb("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && jb(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || kb("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), jb(function(a) {
            return null == a.getAttribute("disabled")
        }) || kb(K, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), gb
    }(a);
    n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
    var u = n.expr.match.needsContext,
        v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        w = /^.[^:#\[\.,]*$/;

    function x(a, b, c) {
        if (n.isFunction(b)) return n.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return n.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (w.test(b)) return n.filter(b, a, c);
            b = n.filter(b, a)
        }
        return n.grep(a, function(a) {
            return g.call(b, a) >= 0 !== c
        })
    }
    n.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, n.fn.extend({
        find: function(a) {
            var b, c = this.length,
                d = [],
                e = this;
            if ("string" != typeof a) return this.pushStack(n(a).filter(function() {
                for (b = 0; c > b; b++)
                    if (n.contains(e[b], this)) return !0
            }));
            for (b = 0; c > b; b++) n.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
        },
        filter: function(a) {
            return this.pushStack(x(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(x(this, a || [], !0))
        },
        is: function(a) {
            return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1).length
        }
    });
    var y, z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        A = n.fn.init = function(a, b) {
            var c, d;
            if (!a) return this;
            if ("string" == typeof a) {
                if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), v.test(c[1]) && n.isPlainObject(b))
                        for (c in b) n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                return d = l.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = l, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
        };
    A.prototype = n.fn, y = n(l);
    var B = /^(?:parents|prev(?:Until|All))/,
        C = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    n.extend({
        dir: function(a, b, c) {
            var d = [],
                e = void 0 !== c;
            while ((a = a[b]) && 9 !== a.nodeType)
                if (1 === a.nodeType) {
                    if (e && n(a).is(c)) break;
                    d.push(a)
                }
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), n.fn.extend({
        has: function(a) {
            var b = n(a, this),
                c = b.length;
            return this.filter(function() {
                for (var a = 0; c > a; a++)
                    if (n.contains(this, b[a])) return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? n.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? g.call(n(a), this[0]) : g.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(n.unique(n.merge(this.get(), n(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function D(a, b) {
        while ((a = a[b]) && 1 !== a.nodeType);
        return a
    }
    n.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return n.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return n.dir(a, "parentNode", c)
        },
        next: function(a) {
            return D(a, "nextSibling")
        },
        prev: function(a) {
            return D(a, "previousSibling")
        },
        nextAll: function(a) {
            return n.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return n.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return n.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return n.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return n.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return n.sibling(a.firstChild)
        },
        contents: function(a) {
            return a.contentDocument || n.merge([], a.childNodes)
        }
    }, function(a, b) {
        n.fn[a] = function(c, d) {
            var e = n.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (C[a] || n.unique(e), B.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var E = /\S+/g,
        F = {};

    function G(a) {
        var b = F[a] = {};
        return n.each(a.match(E) || [], function(a, c) {
            b[c] = !0
        }), b
    }
    n.Callbacks = function(a) {
        a = "string" == typeof a ? F[a] || G(a) : n.extend({}, a);
        var b, c, d, e, f, g, h = [],
            i = !a.once && [],
            j = function(l) {
                for (b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0; h && f > g; g++)
                    if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                        b = !1;
                        break
                    }
                d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable())
            }, k = {
                add: function() {
                    if (h) {
                        var c = h.length;
                        ! function g(b) {
                            n.each(b, function(b, c) {
                                var d = n.type(c);
                                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && g(c)
                            })
                        }(arguments), d ? f = h.length : b && (e = c, j(b))
                    }
                    return this
                },
                remove: function() {
                    return h && n.each(arguments, function(a, b) {
                        var c;
                        while ((c = n.inArray(b, h, c)) > -1) h.splice(c, 1), d && (f >= c && f--, g >= c && g--)
                    }), this
                },
                has: function(a) {
                    return a ? n.inArray(a, h) > -1 : !(!h || !h.length)
                },
                empty: function() {
                    return h = [], f = 0, this
                },
                disable: function() {
                    return h = i = b = void 0, this
                },
                disabled: function() {
                    return !h
                },
                lock: function() {
                    return i = void 0, b || k.disable(), this
                },
                locked: function() {
                    return !i
                },
                fireWith: function(a, b) {
                    return !h || c && !i || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? i.push(b) : j(b)), this
                },
                fire: function() {
                    return k.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!c
                }
            };
        return k
    }, n.extend({
        Deferred: function(a) {
            var b = [
                ["resolve", "done", n.Callbacks("once memory"), "resolved"],
                ["reject", "fail", n.Callbacks("once memory"), "rejected"],
                ["notify", "progress", n.Callbacks("memory")]
            ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return n.Deferred(function(c) {
                            n.each(b, function(b, f) {
                                var g = n.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? n.extend(a, d) : d
                    }
                }, e = {};
            return d.pipe = d.then, n.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b = 0,
                c = d.call(arguments),
                e = c.length,
                f = 1 !== e || a && n.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : n.Deferred(),
                h = function(a, b, c) {
                    return function(e) {
                        b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                }, i, j, k;
            if (e > 1)
                for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
            return f || g.resolveWith(k, c), g.promise()
        }
    });
    var H;
    n.fn.ready = function(a) {
        return n.ready.promise().done(a), this
    }, n.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? n.readyWait++ : n.ready(!0)
        },
        ready: function(a) {
            (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))))
        }
    });

    function I() {
        l.removeEventListener("DOMContentLoaded", I, !1), a.removeEventListener("load", I, !1), n.ready()
    }
    n.ready.promise = function(b) {
        return H || (H = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", I, !1), a.addEventListener("load", I, !1))), H.promise(b)
    }, n.ready.promise();
    var J = n.access = function(a, b, c, d, e, f, g) {
        var h = 0,
            i = a.length,
            j = null == c;
        if ("object" === n.type(c)) {
            e = !0;
            for (h in c) n.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
            return j.call(n(a), c)
        })), b))
            for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    };
    n.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    };

    function K() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = n.expando + K.uid++
    }
    K.uid = 1, K.accepts = n.acceptData, K.prototype = {
        key: function(a) {
            if (!K.accepts(a)) return 0;
            var b = {}, c = a[this.expando];
            if (!c) {
                c = K.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    }, Object.defineProperties(a, b)
                } catch (d) {
                    b[this.expando] = c, n.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c
        },
        set: function(a, b, c) {
            var d, e = this.key(a),
                f = this.cache[e];
            if ("string" == typeof b) f[b] = c;
            else if (n.isEmptyObject(f)) n.extend(this.cache[e], b);
            else
                for (d in b) f[d] = b[d];
            return f
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b]
        },
        access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
        },
        remove: function(a, b) {
            var c, d, e, f = this.key(a),
                g = this.cache[f];
            if (void 0 === b) this.cache[f] = {};
            else {
                n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(E) || [])), c = d.length;
                while (c--) delete g[d[c]]
            }
        },
        hasData: function(a) {
            return !n.isEmptyObject(this.cache[a[this.expando]] || {})
        },
        discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }
    };
    var L = new K,
        M = new K,
        N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        O = /([A-Z])/g;

    function P(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)
            if (d = "data-" + b.replace(O, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c
                } catch (e) {}
                M.set(a, b, c)
            } else c = void 0;
        return c
    }
    n.extend({
        hasData: function(a) {
            return M.hasData(a) || L.hasData(a)
        },
        data: function(a, b, c) {
            return M.access(a, b, c)
        },
        removeData: function(a, b) {
            M.remove(a, b)
        },
        _data: function(a, b, c) {
            return L.access(a, b, c)
        },
        _removeData: function(a, b) {
            L.remove(a, b)
        }
    }), n.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = M.get(f), 1 === f.nodeType && !L.get(f, "hasDataAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
                    L.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                M.set(this, a)
            }) : J(this, function(b) {
                var c, d = n.camelCase(a);
                if (f && void 0 === b) {
                    if (c = M.get(f, a), void 0 !== c) return c;
                    if (c = M.get(f, d), void 0 !== c) return c;
                    if (c = P(f, d, void 0), void 0 !== c) return c
                } else this.each(function() {
                    var c = M.get(this, d);
                    M.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && M.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                M.remove(this, a)
            })
        }
    }), n.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = L.get(a, b), c && (!d || n.isArray(c) ? d = L.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = n.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = n._queueHooks(a, b),
                g = function() {
                    n.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return L.get(a, c) || L.access(a, c, {
                empty: n.Callbacks("once memory").add(function() {
                    L.remove(a, [b + "queue", c])
                })
            })
        }
    }), n.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                n.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
                e = n.Deferred(),
                f = this,
                g = this.length,
                h = function() {
                    --d || e.resolveWith(f, [f])
                };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = L.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        R = ["Top", "Right", "Bottom", "Left"],
        S = function(a, b) {
            return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
        }, T = /^(?:checkbox|radio)$/i;
    ! function() {
        var a = l.createDocumentFragment(),
            b = a.appendChild(l.createElement("div")),
            c = l.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !! b.cloneNode(!0).lastChild.defaultValue
    }();
    var U = "undefined";
    k.focusinBubbles = "onfocusin" in a;
    var V = /^key/,
        W = /^(?:mouse|pointer|contextmenu)|click/,
        X = /^(?:focusinfocus|focusoutblur)$/,
        Y = /^([^.]*)(?:\.(.+)|)$/;

    function Z() {
        return !0
    }

    function $() {
        return !1
    }

    function _() {
        try {
            return l.activeElement
        } catch (a) {}
    }
    n.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = L.get(a);
            if (r) {
                c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function(b) {
                    return typeof n !== U && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0
                }), b = (b || "").match(E) || [""], j = b.length;
                while (j--) h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && n.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0)
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = L.hasData(a) && L.get(a);
            if (r && (i = r.events)) {
                b = (b || "").match(E) || [""], j = b.length;
                while (j--)
                    if (h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                        l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
                        while (f--) k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o])
                    } else
                        for (o in i) n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(i) && (delete r.handle, L.remove(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, k, m, o, p = [d || l],
                q = j.call(b, "type") ? b.type : b,
                r = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || l, 3 !== d.nodeType && 8 !== d.nodeType && !X.test(q + n.event.triggered) && (q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), k = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = r.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, e || !o.trigger || o.trigger.apply(d, c) !== !1)) {
                if (!e && !o.noBubble && !n.isWindow(d)) {
                    for (i = o.delegateType || q, X.test(i + q) || (g = g.parentNode); g; g = g.parentNode) p.push(g), h = g;
                    h === (d.ownerDocument || l) && p.push(h.defaultView || h.parentWindow || a)
                }
                f = 0;
                while ((g = p[f++]) && !b.isPropagationStopped()) b.type = f > 1 ? i : o.bindType || q, m = (L.get(g, "events") || {})[b.type] && L.get(g, "handle"), m && m.apply(g, c), m = k && g[k], m && m.apply && n.acceptData(g) && (b.result = m.apply(g, c), b.result === !1 && b.preventDefault());
                return b.type = q, e || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !n.acceptData(d) || k && n.isFunction(d[q]) && !n.isWindow(d) && (h = d[k], h && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = void 0, h && (d[k] = h)), b.result
            }
        },
        dispatch: function(a) {
            a = n.event.fix(a);
            var b, c, e, f, g, h = [],
                i = d.call(arguments),
                j = (L.get(this, "events") || {})[a.type] || [],
                k = n.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, c = 0;
                    while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i !== this; i = i.parentNode || this)
                    if (i.disabled !== !0 || "click" !== a.type) {
                        for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) >= 0 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        fix: function(a) {
            if (a[n.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = W.test(e) ? this.mouseHooks : V.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;
            while (b--) c = d[b], a[c] = f[c];
            return a.target || (a.target = l), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== _() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === _() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(a) {
                    return n.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = n.extend(new n.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, n.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }, n.Event = function(a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? Z : $) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(a, b)
    }, n.Event.prototype = {
        isDefaultPrevented: $,
        isPropagationStopped: $,
        isImmediatePropagationStopped: $,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = Z, a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = Z, a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = Z, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, n.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        n.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), k.focusinBubbles || n.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            n.event.simulate(b, a.target, n.event.fix(a), !0)
        };
        n.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = L.access(d, b);
                e || d.addEventListener(a, c, !0), L.access(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = L.access(d, b) - 1;
                e ? L.access(d, b, e) : (d.removeEventListener(a, c, !0), L.remove(d, b))
            }
        }
    }), n.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a) this.on(g, b, c, a[g], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = $;
            else if (!d) return this;
            return 1 === e && (f = d, d = function(a) {
                return n().off(a), f.apply(this, arguments)
            }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function() {
                n.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = $), this.each(function() {
                n.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                n.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0
        }
    });
    var ab = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        bb = /<([\w:]+)/,
        cb = /<|&#?\w+;/,
        db = /<(?:script|style|link)/i,
        eb = /checked\s*(?:[^=]|=\s*.checked.)/i,
        fb = /^$|\/(?:java|ecma)script/i,
        gb = /^true\/(.*)/,
        hb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ib = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    ib.optgroup = ib.option, ib.tbody = ib.tfoot = ib.colgroup = ib.caption = ib.thead, ib.th = ib.td;

    function jb(a, b) {
        return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function kb(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function lb(a) {
        var b = gb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function mb(a, b) {
        for (var c = 0, d = a.length; d > c; c++) L.set(a[c], "globalEval", !b || L.get(b[c], "globalEval"))
    }

    function nb(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (L.hasData(a) && (f = L.access(a), g = L.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j)
                    for (c = 0, d = j[e].length; d > c; c++) n.event.add(b, e, j[e][c])
            }
            M.hasData(a) && (h = M.access(a), i = n.extend({}, h), M.set(b, i))
        }
    }

    function ob(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c
    }

    function pb(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && T.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }
    n.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0),
                i = n.contains(a.ownerDocument, a);
            if (!(k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
                for (g = ob(h), f = ob(a), d = 0, e = f.length; e > d; d++) pb(f[d], g[d]);
            if (b)
                if (c)
                    for (f = f || ob(a), g = g || ob(h), d = 0, e = f.length; e > d; d++) nb(f[d], g[d]);
                else nb(a, h);
            return g = ob(h, "script"), g.length > 0 && mb(g, !i && ob(a, "script")), h
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, o = a.length; o > m; m++)
                if (e = a[m], e || 0 === e)
                    if ("object" === n.type(e)) n.merge(l, e.nodeType ? [e] : e);
                    else if (cb.test(e)) {
                f = f || k.appendChild(b.createElement("div")), g = (bb.exec(e) || ["", ""])[1].toLowerCase(), h = ib[g] || ib._default, f.innerHTML = h[1] + e.replace(ab, "<$1></$2>") + h[2], j = h[0];
                while (j--) f = f.lastChild;
                n.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
            } else l.push(b.createTextNode(e));
            k.textContent = "", m = 0;
            while (e = l[m++])
                if ((!d || -1 === n.inArray(e, d)) && (i = n.contains(e.ownerDocument, e), f = ob(k.appendChild(e), "script"), i && mb(f), c)) {
                    j = 0;
                    while (e = f[j++]) fb.test(e.type || "") && c.push(e)
                }
            return k
        },
        cleanData: function(a) {
            for (var b, c, d, e, f = n.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                if (n.acceptData(c) && (e = c[L.expando], e && (b = L.cache[e]))) {
                    if (b.events)
                        for (d in b.events) f[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
                    L.cache[e] && delete L.cache[e]
                }
                delete M.cache[c[M.expando]]
            }
        }
    }), n.fn.extend({
        text: function(a) {
            return J(this, function(a) {
                return void 0 === a ? n.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
                })
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = jb(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = jb(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || n.cleanData(ob(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && mb(ob(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (n.cleanData(ob(a, !1)), a.textContent = "");
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return n.clone(this, a, b)
            })
        },
        html: function(a) {
            return J(this, function(a) {
                var b = this[0] || {}, c = 0,
                    d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !db.test(a) && !ib[(bb.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(ab, "<$1></$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(ob(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, n.cleanData(ob(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = e.apply([], a);
            var c, d, f, g, h, i, j = 0,
                l = this.length,
                m = this,
                o = l - 1,
                p = a[0],
                q = n.isFunction(p);
            if (q || l > 1 && "string" == typeof p && !k.checkClone && eb.test(p)) return this.each(function(c) {
                var d = m.eq(c);
                q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
            });
            if (l && (c = n.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                for (f = n.map(ob(c, "script"), kb), g = f.length; l > j; j++) h = c, j !== o && (h = n.clone(h, !0, !0), g && n.merge(f, ob(h, "script"))), b.call(this[j], h, j);
                if (g)
                    for (i = f[f.length - 1].ownerDocument, n.map(f, lb), j = 0; g > j; j++) h = f[j], fb.test(h.type || "") && !L.access(h, "globalEval") && n.contains(i, h) && (h.src ? n._evalUrl && n._evalUrl(h.src) : n.globalEval(h.textContent.replace(hb, "")));

            }
            return this
        }
    }), n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        n.fn[a] = function(a) {
            for (var c, d = [], e = n(a), g = e.length - 1, h = 0; g >= h; h++) c = h === g ? this : this.clone(!0), n(e[h])[b](c), f.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var qb, rb = {};

    function sb(b, c) {
        var d, e = n(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : n.css(e[0], "display");
        return e.detach(), f
    }

    function tb(a) {
        var b = l,
            c = rb[a];
        return c || (c = sb(a, b), "none" !== c && c || (qb = (qb || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = qb[0].contentDocument, b.write(), b.close(), c = sb(a, b), qb.detach()), rb[a] = c), c
    }
    var ub = /^margin/,
        vb = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
        wb = function(b) {
            return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
        };

    function xb(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || wb(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), vb.test(g) && ub.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function yb(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }! function() {
        var b, c, d = l.documentElement,
            e = l.createElement("div"),
            f = l.createElement("div");
        if (f.style) {
            f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === f.style.backgroundClip, e.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", e.appendChild(f);

            function g() {
                f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f.innerHTML = "", d.appendChild(e);
                var g = a.getComputedStyle(f, null);
                b = "1%" !== g.top, c = "4px" === g.width, d.removeChild(e)
            }
            a.getComputedStyle && n.extend(k, {
                pixelPosition: function() {
                    return g(), b
                },
                boxSizingReliable: function() {
                    return null == c && g(), c
                },
                reliableMarginRight: function() {
                    var b, c = f.appendChild(l.createElement("div"));
                    return c.style.cssText = f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", f.style.width = "1px", d.appendChild(e), b = !parseFloat(a.getComputedStyle(c, null).marginRight), d.removeChild(e), f.removeChild(c), b
                }
            })
        }
    }(), n.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var zb = /^(none|table(?!-c[ea]).+)/,
        Ab = new RegExp("^(" + Q + ")(.*)$", "i"),
        Bb = new RegExp("^([+-])=(" + Q + ")", "i"),
        Cb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, Db = {
            letterSpacing: "0",
            fontWeight: "400"
        }, Eb = ["Webkit", "O", "Moz", "ms"];

    function Fb(a, b) {
        if (b in a) return b;
        var c = b[0].toUpperCase() + b.slice(1),
            d = b,
            e = Eb.length;
        while (e--)
            if (b = Eb[e] + c, b in a) return b;
        return d
    }

    function Gb(a, b, c) {
        var d = Ab.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function Hb(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + R[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + R[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + R[f] + "Width", !0, e))) : (g += n.css(a, "padding" + R[f], !0, e), "padding" !== c && (g += n.css(a, "border" + R[f] + "Width", !0, e)));
        return g
    }

    function Ib(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = wb(a),
            g = "border-box" === n.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = xb(a, b, f), (0 > e || null == e) && (e = a.style[b]), vb.test(e)) return e;
            d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + Hb(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function Jb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = L.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && S(d) && (f[g] = L.access(d, "olddisplay", tb(d.nodeName)))) : (e = S(d), "none" === c && e || L.set(d, "olddisplay", e ? c : n.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }
    n.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = xb(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b),
                    i = a.style;
                return b = n.cssProps[h] || (n.cssProps[h] = Fb(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Bb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = Fb(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = xb(a, b, d)), "normal" === e && b in Db && (e = Db[b]), "" === c || c ? (f = parseFloat(e), c === !0 || n.isNumeric(f) ? f || 0 : e) : e
        }
    }), n.each(["height", "width"], function(a, b) {
        n.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? zb.test(n.css(a, "display")) && 0 === a.offsetWidth ? n.swap(a, Cb, function() {
                    return Ib(a, b, d)
                }) : Ib(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && wb(a);
                return Gb(a, c, d ? Hb(a, b, d, "border-box" === n.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), n.cssHooks.marginRight = yb(k.reliableMarginRight, function(a, b) {
        return b ? n.swap(a, {
            display: "inline-block"
        }, xb, [a, "marginRight"]) : void 0
    }), n.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        n.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + R[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, ub.test(a) || (n.cssHooks[a + b].set = Gb)
    }), n.fn.extend({
        css: function(a, b) {
            return J(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (n.isArray(b)) {
                    for (d = wb(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return Jb(this, !0)
        },
        hide: function() {
            return Jb(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                S(this) ? n(this).show() : n(this).hide()
            })
        }
    });

    function Kb(a, b, c, d, e) {
        return new Kb.prototype.init(a, b, c, d, e)
    }
    n.Tween = Kb, Kb.prototype = {
        constructor: Kb,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = Kb.propHooks[this.prop];
            return a && a.get ? a.get(this) : Kb.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = Kb.propHooks[this.prop];
            return this.pos = b = this.options.duration ? n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Kb.propHooks._default.set(this), this
        }
    }, Kb.prototype.init.prototype = Kb.prototype, Kb.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, Kb.propHooks.scrollTop = Kb.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, n.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, n.fx = Kb.prototype.init, n.fx.step = {};
    var Lb, Mb, Nb = /^(?:toggle|show|hide)$/,
        Ob = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
        Pb = /queueHooks$/,
        Qb = [Vb],
        Rb = {
            "*": [
                function(a, b) {
                    var c = this.createTween(a, b),
                        d = c.cur(),
                        e = Ob.exec(b),
                        f = e && e[3] || (n.cssNumber[a] ? "" : "px"),
                        g = (n.cssNumber[a] || "px" !== f && +d) && Ob.exec(n.css(c.elem, a)),
                        h = 1,
                        i = 20;
                    if (g && g[3] !== f) {
                        f = f || g[3], e = e || [], g = +d || 1;
                        do h = h || ".5", g /= h, n.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                    }
                    return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
                }
            ]
        };

    function Sb() {
        return setTimeout(function() {
            Lb = void 0
        }), Lb = n.now()
    }

    function Tb(a, b) {
        var c, d = 0,
            e = {
                height: a
            };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = R[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function Ub(a, b, c) {
        for (var d, e = (Rb[b] || []).concat(Rb["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function Vb(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this,
            m = {}, o = a.style,
            p = a.nodeType && S(a),
            q = L.get(a, "fxshow");
        c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? L.get(a, "olddisplay") || tb(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function() {
            o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], Nb.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                    if ("show" !== e || !q || void 0 === q[d]) continue;
                    p = !0
                }
                m[d] = q && q[d] || n.style(a, d)
            } else j = void 0;
        if (n.isEmptyObject(m)) "inline" === ("none" === j ? tb(a.nodeName) : j) && (o.display = j);
        else {
            q ? "hidden" in q && (p = q.hidden) : q = L.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function() {
                n(a).hide()
            }), l.done(function() {
                var b;
                L.remove(a, "fxshow");
                for (b in m) n.style(a, b, m[b])
            });
            for (d in m) g = Ub(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function Wb(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function Xb(a, b, c) {
        var d, e, f = 0,
            g = Qb.length,
            h = n.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = Lb || Sb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            }, j = h.promise({
                elem: a,
                props: n.extend({}, b),
                opts: n.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: Lb || Sb(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (Wb(k, j.opts.specialEasing); g > f; f++)
            if (d = Qb[f].call(j, a, k, j.opts)) return d;
        return n.map(k, Ub, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    n.Animation = n.extend(Xb, {
        tweener: function(a, b) {
            n.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], Rb[c] = Rb[c] || [], Rb[c].unshift(b)
        },
        prefilter: function(a, b) {
            b ? Qb.unshift(a) : Qb.push(a)
        }
    }), n.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? n.extend({}, a) : {
            complete: c || !c && b || n.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !n.isFunction(b) && b
        };
        return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
        }, d
    }, n.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(S).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = n.isEmptyObject(a),
                f = n.speed(b, c, d),
                g = function() {
                    var b = Xb(this, n.extend({}, a), f);
                    (e || L.get(this, "finish")) && b.stop(!0)
                };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                var b = !0,
                    e = null != a && a + "queueHooks",
                    f = n.timers,
                    g = L.get(this);
                if (e) g[e] && g[e].stop && d(g[e]);
                else
                    for (e in g) g[e] && g[e].stop && Pb.test(e) && d(g[e]);
                for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                (b || !c) && n.dequeue(this, a)
            })
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = L.get(this),
                    d = c[a + "queue"],
                    e = c[a + "queueHooks"],
                    f = n.timers,
                    g = d ? d.length : 0;
                for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), n.each(["toggle", "show", "hide"], function(a, b) {
        var c = n.fn[b];
        n.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Tb(b, !0), a, d, e)
        }
    }), n.each({
        slideDown: Tb("show"),
        slideUp: Tb("hide"),
        slideToggle: Tb("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        n.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), n.timers = [], n.fx.tick = function() {
        var a, b = 0,
            c = n.timers;
        for (Lb = n.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
        c.length || n.fx.stop(), Lb = void 0
    }, n.fx.timer = function(a) {
        n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
    }, n.fx.interval = 13, n.fx.start = function() {
        Mb || (Mb = setInterval(n.fx.tick, n.fx.interval))
    }, n.fx.stop = function() {
        clearInterval(Mb), Mb = null
    }, n.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, n.fn.delay = function(a, b) {
        return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d)
            }
        })
    },
    function() {
        var a = l.createElement("input"),
            b = l.createElement("select"),
            c = b.appendChild(l.createElement("option"));
        a.type = "checkbox", k.checkOn = "" !== a.value, k.optSelected = c.selected, b.disabled = !0, k.optDisabled = !c.disabled, a = l.createElement("input"), a.value = "t", a.type = "radio", k.radioValue = "t" === a.value
    }();
    var Yb, Zb, $b = n.expr.attrHandle;
    n.fn.extend({
        attr: function(a, b) {
            return J(this, n.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                n.removeAttr(this, a)
            })
        }
    }), n.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === U ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? Zb : Yb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void n.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(E);
            if (f && 1 === a.nodeType)
                while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!k.radioValue && "radio" === b && n.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), Zb = {
        set: function(a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = $b[b] || n.find.attr;
        $b[b] = function(a, b, d) {
            var e, f;
            return d || (f = $b[b], $b[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, $b[b] = f), e
        }
    });
    var _b = /^(?:input|select|textarea|button)$/i;
    n.fn.extend({
        prop: function(a, b) {
            return J(this, n.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[n.propFix[a] || a]
            })
        }
    }), n.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || _b.test(a.nodeName) || a.href ? a.tabIndex : -1
                }
            }
        }
    }), k.optSelected || (n.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }
    }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        n.propFix[this.toLowerCase()] = this
    });
    var ac = /[\t\r\n\f]/g;
    n.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).addClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(E) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ac, " ") : " ")) {
                        f = 0;
                        while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = n.trim(d), c.className !== g && (c.className = g)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).removeClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(E) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ac, " ") : "")) {
                        f = 0;
                        while (e = b[f++])
                            while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                        g = a ? n.trim(d) : "", c.className !== g && (c.className = g)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function(c) {
                n(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c) {
                    var b, d = 0,
                        e = n(this),
                        f = a.match(E) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else(c === U || "boolean" === c) && (this.className && L.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : L.get(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ac, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    });
    var bc = /\r/g;
    n.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0]; {
                if (arguments.length) return d = n.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(bc, "") : null == c ? "" : c)
            }
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = n.find.attr(a, "value");
                    return null != b ? b : n.trim(n.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup"))) {
                            if (b = n(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    var c, d, e = a.options,
                        f = n.makeArray(b),
                        g = e.length;
                    while (g--) d = e[g], (d.selected = n.inArray(d.value, f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), n.each(["radio", "checkbox"], function() {
        n.valHooks[this] = {
            set: function(a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0
            }
        }, k.checkOn || (n.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        n.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), n.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var cc = n.now(),
        dc = /\?/;
    n.parseJSON = function(a) {
        return JSON.parse(a + "")
    }, n.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a) return null;
        try {
            c = new DOMParser, b = c.parseFromString(a, "text/xml")
        } catch (d) {
            b = void 0
        }
        return (!b || b.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + a), b
    };
    var ec = /#.*$/,
        fc = /([?&])_=[^&]*/,
        gc = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        hc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        ic = /^(?:GET|HEAD)$/,
        jc = /^\/\//,
        kc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        lc = {}, mc = {}, nc = "*/".concat("*"),
        oc = a.location.href,
        pc = kc.exec(oc.toLowerCase()) || [];

    function qc(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(E) || [];
            if (n.isFunction(c))
                while (d = f[e++]) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function rc(a, b, c, d) {
        var e = {}, f = a === mc;

        function g(h) {
            var i;
            return e[h] = !0, n.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function sc(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && n.extend(!0, a, d), a
    }

    function tc(a, b, c) {
        var d, e, f, g, h = a.contents,
            i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)
            for (e in h)
                if (h[e] && h[e].test(d)) {
                    i.unshift(e);
                    break
                }
        if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function uc(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: oc,
            type: "GET",
            isLocal: hc.test(pc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": nc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": n.parseJSON,
                "text xml": n.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? sc(sc(a, n.ajaxSettings), b) : sc(n.ajaxSettings, a)
        },
        ajaxPrefilter: qc(lc),
        ajaxTransport: qc(mc),
        ajax: function(a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = n.ajaxSetup({}, b),
                l = k.context || k,
                m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event,
                o = n.Deferred(),
                p = n.Callbacks("once memory"),
                q = k.statusCode || {}, r = {}, s = {}, t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === t) {
                            if (!f) {
                                f = {};
                                while (b = gc.exec(e)) f[b[1].toLowerCase()] = b[2]
                            }
                            b = f[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === t ? e : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return t || (k.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (2 > t)
                                for (b in a) q[b] = [q[b], a[b]];
                            else v.always(a[v.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || u;
                        return c && c.abort(b), x(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || oc) + "").replace(ec, "").replace(jc, pc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (h = kc.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === pc[1] && h[2] === pc[2] && (h[3] || ("http:" === h[1] ? "80" : "443")) === (pc[3] || ("http:" === pc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), rc(lc, k, b, v), 2 === t) return v;
            i = n.event && k.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !ic.test(k.type), d = k.url, k.hasContent || (k.data && (d = k.url += (dc.test(d) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = fc.test(d) ? d.replace(fc, "$1_=" + cc++) : d + (dc.test(d) ? "&" : "?") + "_=" + cc++)), k.ifModified && (n.lastModified[d] && v.setRequestHeader("If-Modified-Since", n.lastModified[d]), n.etag[d] && v.setRequestHeader("If-None-Match", n.etag[d])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + nc + "; q=0.01" : "") : k.accepts["*"]);
            for (j in k.headers) v.setRequestHeader(j, k.headers[j]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (j in {
                success: 1,
                error: 1,
                complete: 1
            }) v[j](k[j]);
            if (c = rc(mc, k, b, v)) {
                v.readyState = 1, i && m.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                    v.abort("timeout")
                }, k.timeout));
                try {
                    t = 1, c.send(r, x)
                } catch (w) {
                    if (!(2 > t)) throw w;
                    x(-1, w)
                }
            } else x(-1, "No Transport");

            function x(a, b, f, h) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), c = void 0, e = h || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, f && (u = tc(k, v, f)), u = uc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[d] = w), w = v.getResponseHeader("etag"), w && (n.etag[d] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, i && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), i && (m.trigger("ajaxComplete", [v, k]), --n.active || n.event.trigger("ajaxStop")))
            }
            return v
        },
        getJSON: function(a, b, c) {
            return n.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return n.get(a, void 0, b, "script")
        }
    }), n.each(["get", "post"], function(a, b) {
        n[b] = function(a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), n._evalUrl = function(a) {
        return n.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, n.fn.extend({
        wrapAll: function(a) {
            var b;
            return n.isFunction(a) ? this.each(function(b) {
                n(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                var a = this;
                while (a.firstElementChild) a = a.firstElementChild;
                return a
            }).append(this)), this)
        },
        wrapInner: function(a) {
            return this.each(n.isFunction(a) ? function(b) {
                n(this).wrapInner(a.call(this, b))
            } : function() {
                var b = n(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = n.isFunction(a);
            return this.each(function(c) {
                n(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
            }).end()
        }
    }), n.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0
    }, n.expr.filters.visible = function(a) {
        return !n.expr.filters.hidden(a)
    };
    var vc = /%20/g,
        wc = /\[\]$/,
        xc = /\r?\n/g,
        yc = /^(?:submit|button|image|reset|file)$/i,
        zc = /^(?:input|select|textarea|keygen)/i;

    function Ac(a, b, c, d) {
        var e;
        if (n.isArray(b)) n.each(b, function(b, e) {
            c || wc.test(a) ? d(a, e) : Ac(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== n.type(b)) d(a, b);
        else
            for (e in b) Ac(a + "[" + e + "]", b[e], c, d)
    }
    n.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function() {
            e(this.name, this.value)
        });
        else
            for (c in a) Ac(c, a[c], b, e);
        return d.join("&").replace(vc, "+")
    }, n.fn.extend({
        serialize: function() {
            return n.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = n.prop(this, "elements");
                return a ? n.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !n(this).is(":disabled") && zc.test(this.nodeName) && !yc.test(a) && (this.checked || !T.test(a))
            }).map(function(a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(xc, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(xc, "\r\n")
                }
            }).get()
        }
    }), n.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (a) {}
    };
    var Bc = 0,
        Cc = {}, Dc = {
            0: 200,
            1223: 204
        }, Ec = n.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in Cc) Cc[a]()
    }), k.cors = !! Ec && "withCredentials" in Ec, k.ajax = Ec = !! Ec, n.ajaxTransport(function(a) {
        var b;
        return k.cors || Ec && !a.crossDomain ? {
            send: function(c, d) {
                var e, f = a.xhr(),
                    g = ++Bc;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                    for (e in a.xhrFields) f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c) f.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete Cc[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Dc[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                            text: f.responseText
                        } : void 0, f.getAllResponseHeaders()))
                    }
                }, f.onload = b(), f.onerror = b("error"), b = Cc[g] = b("abort");
                try {
                    f.send(a.hasContent && a.data || null)
                } catch (h) {
                    if (b) throw h
                }
            },
            abort: function() {
                b && b()
            }
        } : void 0
    }), n.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return n.globalEval(a), a
            }
        }
    }), n.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), n.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = n("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                    }), l.head.appendChild(b[0])
                },
                abort: function() {
                    c && c()
                }
            }
        }
    });
    var Fc = [],
        Gc = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Fc.pop() || n.expando + "_" + cc++;
            return this[a] = !0, a
        }
    }), n.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Gc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Gc.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Gc, "$1" + e) : b.jsonp !== !1 && (b.url += (dc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || n.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Fc.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), n.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || l;
        var d = v.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes))
    };
    var Hc = n.fn.load;
    n.fn.load = function(a, b, c) {
        if ("string" != typeof a && Hc) return Hc.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, f || [a.responseText, b, a])
        }), this
    }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        n.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), n.expr.filters.animated = function(a) {
        return n.grep(n.timers, function(b) {
            return a === b.elem
        }).length
    };
    var Ic = a.document.documentElement;

    function Jc(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }
    n.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, "position"),
                l = n(a),
                m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, n.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                n.offset.setOffset(this, a, b)
            });
            var b, c, d = this[0],
                e = {
                    top: 0,
                    left: 0
                }, f = d && d.ownerDocument;
            if (f) return b = f.documentElement, n.contains(b, d) ? (typeof d.getBoundingClientRect !== U && (e = d.getBoundingClientRect()), c = Jc(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0],
                    d = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - n.css(c, "marginTop", !0),
                    left: b.left - d.left - n.css(c, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || Ic;
                while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) a = a.offsetParent;
                return a || Ic
            })
        }
    }), n.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, c) {
        var d = "pageYOffset" === c;
        n.fn[b] = function(e) {
            return J(this, function(b, e, f) {
                var g = Jc(b);
                return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
            }, b, e, arguments.length, null)
        }
    }), n.each(["top", "left"], function(a, b) {
        n.cssHooks[b] = yb(k.pixelPosition, function(a, c) {
            return c ? (c = xb(a, b), vb.test(c) ? n(a).position()[b] + "px" : c) : void 0
        })
    }), n.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        n.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            n.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return J(this, function(b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), n.fn.size = function() {
        return this.length
    }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return n
    });
    var Kc = a.jQuery,
        Lc = a.$;
    return n.noConflict = function(b) {
        return a.$ === n && (a.$ = Lc), b && a.jQuery === n && (a.jQuery = Kc), n
    }, typeof b === U && (a.jQuery = a.$ = n), n
});
! function t(e, n, r) {
    function o(l, s) {
        if (!n[l]) {
            if (!e[l]) {
                var a = "function" == typeof require && require;
                if (!s && a) return a(l, !0);
                if (i) return i(l, !0);
                var c = new Error("Cannot find module '" + l + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[l] = {
                exports: {}
            };
            e[l][0].call(u.exports, function(t) {
                var n = e[l][1][t];
                return o(n ? n : t)
            }, u, u.exports, t, e, n, r)
        }
        return n[l].exports
    }
    for (var i = "function" == typeof require && require, l = 0; l < r.length; l++) o(r[l]);
    return o
}({
    1: [
        function(t, e) {
            "use strict";

            function n(t) {
                t.fn.perfectScrollbar = function(e) {
                    return this.each(function() {
                        if ("object" == typeof e || "undefined" == typeof e) {
                            var n = e;
                            o.get(this) || r.initialize(this, n)
                        } else {
                            var i = e;
                            "update" === i ? r.update(this) : "destroy" === i && r.destroy(this)
                        }
                        return t(this)
                    })
                }
            }
            var r = t("../main"),
                o = t("../plugin/instances");
            if ("function" == typeof define && define.amd) define(["jquery"], n);
            else {
                var i = window.jQuery ? window.jQuery : window.$;
                "undefined" != typeof i && n(i)
            }
            e.exports = n
        }, {
            "../main": 7,
            "../plugin/instances": 18
        }
    ],
    2: [
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                var n = t.className.split(" ");
                n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
            }

            function o(t, e) {
                var n = t.className.split(" "),
                    r = n.indexOf(e);
                r >= 0 && n.splice(r, 1), t.className = n.join(" ")
            }
            n.add = function(t, e) {
                t.classList ? t.classList.add(e) : r(t, e)
            }, n.remove = function(t, e) {
                t.classList ? t.classList.remove(e) : o(t, e)
            }, n.list = function(t) {
                return t.classList ? t.classList : t.className.split(" ")
            }
        }, {}
    ],
    3: [
        function(t, e, n) {
            "use strict";

            function r(t, e) {
                return window.getComputedStyle(t)[e]
            }

            function o(t, e, n) {
                return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
            }

            function i(t, e) {
                for (var n in e) {
                    var r = e[n];
                    "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r
                }
                return t
            }
            n.e = function(t, e) {
                var n = document.createElement(t);
                return n.className = e, n
            }, n.appendTo = function(t, e) {
                return e.appendChild(t), t
            }, n.css = function(t, e, n) {
                return "object" == typeof e ? i(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n)
            }, n.matches = function(t, e) {
                return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
            }, n.remove = function(t) {
                "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
            }
        }, {}
    ],
    4: [
        function(t, e) {
            "use strict";
            var n = function(t) {
                this.element = t, this.events = {}
            };
            n.prototype.bind = function(t, e) {
                "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
            }, n.prototype.unbind = function(t, e) {
                var n = "undefined" != typeof e;
                this.events[t] = this.events[t].filter(function(r) {
                    return n && r !== e ? !0 : (this.element.removeEventListener(t, r, !1), !1)
                }, this)
            }, n.prototype.unbindAll = function() {
                for (var t in this.events) this.unbind(t)
            };
            var r = function() {
                this.eventElements = []
            };
            r.prototype.eventElement = function(t) {
                var e = this.eventElements.filter(function(e) {
                    return e.element === t
                })[0];
                return "undefined" == typeof e && (e = new n(t), this.eventElements.push(e)), e
            }, r.prototype.bind = function(t, e, n) {
                this.eventElement(t).bind(e, n)
            }, r.prototype.unbind = function(t, e, n) {
                this.eventElement(t).unbind(e, n)
            }, r.prototype.unbindAll = function() {
                for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
            }, r.prototype.once = function(t, e, n) {
                var r = this.eventElement(t),
                    o = function(t) {
                        r.unbind(e, o), n(t)
                    };
                r.bind(e, o)
            }, e.exports = r
        }, {}
    ],
    5: [
        function(t, e) {
            "use strict";
            e.exports = function() {
                function t() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }
                return function() {
                    return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
                }
            }()
        }, {}
    ],
    6: [
        function(t, e, n) {
            "use strict";
            var r = t("./class"),
                o = t("./dom");
            n.toInt = function(t) {
                return "string" == typeof t ? parseInt(t, 10) : ~~t
            }, n.clone = function(t) {
                if (null === t) return null;
                if ("object" == typeof t) {
                    var e = {};
                    for (var n in t) e[n] = this.clone(t[n]);
                    return e
                }
                return t
            }, n.extend = function(t, e) {
                var n = this.clone(t);
                for (var r in e) n[r] = this.clone(e[r]);
                return n
            }, n.isEditable = function(t) {
                return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
            }, n.removePsClasses = function(t) {
                for (var e = r.list(t), n = 0; n < e.length; n++) {
                    var o = e[n];
                    0 === o.indexOf("ps-") && r.remove(t, o)
                }
            }, n.outerWidth = function(t) {
                return this.toInt(o.css(t, "width")) + this.toInt(o.css(t, "paddingLeft")) + this.toInt(o.css(t, "paddingRight")) + this.toInt(o.css(t, "borderLeftWidth")) + this.toInt(o.css(t, "borderRightWidth"))
            }, n.startScrolling = function(t, e) {
                r.add(t, "ps-in-scrolling"), "undefined" != typeof e ? r.add(t, "ps-" + e) : (r.add(t, "ps-x"), r.add(t, "ps-y"))
            }, n.stopScrolling = function(t, e) {
                r.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? r.remove(t, "ps-" + e) : (r.remove(t, "ps-x"), r.remove(t, "ps-y"))
            }, n.env = {
                isWebKit: "WebkitAppearance" in document.documentElement.style,
                supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                supportsIePointer: null !== window.navigator.msMaxTouchPoints
            }
        }, {
            "./class": 2,
            "./dom": 3
        }
    ],
    7: [
        function(t, e) {
            "use strict";
            var n = t("./plugin/destroy"),
                r = t("./plugin/initialize"),
                o = t("./plugin/update");
            e.exports = {
                initialize: r,
                update: o,
                destroy: n
            }
        }, {
            "./plugin/destroy": 9,
            "./plugin/initialize": 17,
            "./plugin/update": 20
        }
    ],
    8: [
        function(t, e) {
            "use strict";
            e.exports = {
                wheelSpeed: 1,
                wheelPropagation: !1,
                swipePropagation: !0,
                minScrollbarLength: null,
                maxScrollbarLength: null,
                useBothWheelAxes: !1,
                useKeyboard: !0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0
            }
        }, {}
    ],
    9: [
        function(t, e) {
            "use strict";
            var n = t("../lib/dom"),
                r = t("../lib/helper"),
                o = t("./instances");
            e.exports = function(t) {
                var e = o.get(t);
                e.event.unbindAll(), n.remove(e.scrollbarX), n.remove(e.scrollbarY), n.remove(e.scrollbarXRail), n.remove(e.scrollbarYRail), r.removePsClasses(t), o.remove(t)
            }
        }, {
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18
        }
    ],
    10: [
        function(t, e) {
            "use strict";

            function n(t, e) {
                function n(t) {
                    return t.getBoundingClientRect()
                }
                var o = window.Event.prototype.stopPropagation.bind;
                e.event.bind(e.scrollbarY, "click", o), e.event.bind(e.scrollbarYRail, "click", function(o) {
                    var l = r.toInt(e.scrollbarYHeight / 2),
                        s = o.pageY - n(e.scrollbarYRail).top - l,
                        a = e.containerHeight - e.scrollbarYHeight,
                        c = s / a;
                    0 > c ? c = 0 : c > 1 && (c = 1), t.scrollTop = (e.contentHeight - e.containerHeight) * c, i(t)
                }), e.event.bind(e.scrollbarX, "click", o), e.event.bind(e.scrollbarXRail, "click", function(o) {
                    var l = r.toInt(e.scrollbarXWidth / 2),
                        s = o.pageX - n(e.scrollbarXRail).left - l;
                    console.log(o.pageX, e.scrollbarXRail.offsetLeft);
                    var a = e.containerWidth - e.scrollbarXWidth,
                        c = s / a;
                    0 > c ? c = 0 : c > 1 && (c = 1), t.scrollLeft = (e.contentWidth - e.containerWidth) * c, i(t)
                })
            }
            var r = t("../../lib/helper"),
                o = t("../instances"),
                i = t("../update-geometry");
            e.exports = function(t) {
                var e = o.get(t);
                n(t, e)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }
    ],
    11: [
        function(t, e) {
            "use strict";

            function n(t, e) {
                function n(n) {
                    var o = r + n,
                        l = e.containerWidth - e.scrollbarXWidth;
                    e.scrollbarXLeft = 0 > o ? 0 : o > l ? l : o;
                    var s = i.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.scrollbarXWidth));
                    t.scrollLeft = s
                }
                var r = null,
                    l = null,
                    a = function(e) {
                        n(e.pageX - l), s(t), e.stopPropagation(), e.preventDefault()
                    }, c = function() {
                        i.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", a)
                    };
                e.event.bind(e.scrollbarX, "mousedown", function(n) {
                    l = n.pageX, r = i.toInt(o.css(e.scrollbarX, "left")), i.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", a), e.event.once(e.ownerDocument, "mouseup", c), n.stopPropagation(), n.preventDefault()
                })
            }

            function r(t, e) {
                function n(n) {
                    var o = r + n,
                        l = e.containerHeight - e.scrollbarYHeight;
                    e.scrollbarYTop = 0 > o ? 0 : o > l ? l : o;
                    var s = i.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.scrollbarYHeight));
                    t.scrollTop = s
                }
                var r = null,
                    l = null,
                    a = function(e) {
                        n(e.pageY - l), s(t), e.stopPropagation(), e.preventDefault()
                    }, c = function() {
                        i.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", a)
                    };
                e.event.bind(e.scrollbarY, "mousedown", function(n) {
                    l = n.pageY, r = i.toInt(o.css(e.scrollbarY, "top")), i.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", a), e.event.once(e.ownerDocument, "mouseup", c), n.stopPropagation(), n.preventDefault()
                })
            }
            var o = t("../../lib/dom"),
                i = t("../../lib/helper"),
                l = t("../instances"),
                s = t("../update-geometry");
            e.exports = function(t) {
                var e = l.get(t);
                n(t, e), r(t, e)
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }
    ],
    12: [
        function(t, e) {
            "use strict";

            function n(t, e) {
                function n(n, r) {
                    var o = t.scrollTop;
                    if (0 === n) {
                        if (!e.scrollbarYActive) return !1;
                        if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && 0 > r) return !e.settings.wheelPropagation
                    }
                    var i = t.scrollLeft;
                    if (0 === r) {
                        if (!e.scrollbarXActive) return !1;
                        if (0 === i && 0 > n || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                    }
                    return !0
                }
                var o = !1;
                e.event.bind(t, "mouseenter", function() {
                    o = !0
                }), e.event.bind(t, "mouseleave", function() {
                    o = !1
                });
                var l = !1;
                e.event.bind(e.ownerDocument, "keydown", function(s) {
                    if ((!s.isDefaultPrevented || !s.isDefaultPrevented()) && o) {
                        var a = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                        if (a) {
                            for (; a.shadowRoot;) a = a.shadowRoot.activeElement;
                            if (r.isEditable(a)) return
                        }
                        var c = 0,
                            u = 0;
                        switch (s.which) {
                            case 37:
                                c = -30;
                                break;
                            case 38:
                                u = 30;
                                break;
                            case 39:
                                c = 30;
                                break;
                            case 40:
                                u = -30;
                                break;
                            case 33:
                                u = 90;
                                break;
                            case 32:
                            case 34:
                                u = -90;
                                break;
                            case 35:
                                u = s.ctrlKey ? -e.contentHeight : -e.containerHeight;
                                break;
                            case 36:
                                u = s.ctrlKey ? t.scrollTop : e.containerHeight;
                                break;
                            default:
                                return
                        }
                        t.scrollTop = t.scrollTop - u, t.scrollLeft = t.scrollLeft + c, i(t), l = n(c, u), l && s.preventDefault()
                    }
                })
            }
            var r = t("../../lib/helper"),
                o = t("../instances"),
                i = t("../update-geometry");
            e.exports = function(t) {
                var e = o.get(t);
                n(t, e)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }
    ],
    13: [
        function(t, e) {
            "use strict";

            function n(t, e) {
                function n(n, r) {
                    var o = t.scrollTop;
                    if (0 === n) {
                        if (!e.scrollbarYActive) return !1;
                        if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && 0 > r) return !e.settings.wheelPropagation
                    }
                    var i = t.scrollLeft;
                    if (0 === r) {
                        if (!e.scrollbarXActive) return !1;
                        if (0 === i && 0 > n || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                    }
                    return !0
                }

                function o(t) {
                    var e = t.deltaX,
                        n = -1 * t.deltaY;
                    return ("undefined" == typeof e || "undefined" == typeof n) && (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), [e, n]
                }

                function l(e, n) {
                    var r = t.querySelector("textarea:hover");
                    if (r) {
                        var o = r.scrollHeight - r.clientHeight;
                        if (o > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === o && 0 > n)) return !0;
                        var i = r.scrollLeft - r.clientWidth;
                        if (i > 0 && !(0 === r.scrollLeft && 0 > e || r.scrollLeft === i && e > 0)) return !0
                    }
                    return !1
                }

                function s(s) {
                    if (r.env.isWebKit || !t.querySelector("select:focus")) {
                        var c = o(s),
                            u = c[0],
                            d = c[1];
                        l(u, d) || (a = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (t.scrollTop = d ? t.scrollTop - d * e.settings.wheelSpeed : t.scrollTop + u * e.settings.wheelSpeed, a = !0) : e.scrollbarXActive && !e.scrollbarYActive && (t.scrollLeft = u ? t.scrollLeft + u * e.settings.wheelSpeed : t.scrollLeft - d * e.settings.wheelSpeed, a = !0) : (t.scrollTop = t.scrollTop - d * e.settings.wheelSpeed, t.scrollLeft = t.scrollLeft + u * e.settings.wheelSpeed), i(t), a = a || n(u, d), a && (s.stopPropagation(), s.preventDefault()))
                    }
                }
                var a = !1;
                "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", s) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", s)
            }
            var r = t("../../lib/helper"),
                o = t("../instances"),
                i = t("../update-geometry");
            e.exports = function(t) {
                var e = o.get(t);
                n(t, e)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }
    ],
    14: [
        function(t, e) {
            "use strict";

            function n(t, e) {
                e.event.bind(t, "scroll", function() {
                    o(t)
                })
            }
            var r = t("../instances"),
                o = t("../update-geometry");
            e.exports = function(t) {
                var e = r.get(t);
                n(t, e)
            }
        }, {
            "../instances": 18,
            "../update-geometry": 19
        }
    ],
    15: [
        function(t, e) {
            "use strict";

            function n(t, e) {
                function n() {
                    var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                    return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
                }

                function l() {
                    a || (a = setInterval(function() {
                        return o.get(t) ? (t.scrollTop = t.scrollTop + c.top, t.scrollLeft = t.scrollLeft + c.left, void i(t)) : void clearInterval(a)
                    }, 50))
                }

                function s() {
                    a && (clearInterval(a), a = null), r.stopScrolling(t)
                }
                var a = null,
                    c = {
                        top: 0,
                        left: 0
                    }, u = !1;
                e.event.bind(e.ownerDocument, "selectionchange", function() {
                    t.contains(n()) ? u = !0 : (u = !1, s())
                }), e.event.bind(window, "mouseup", function() {
                    u && (u = !1, s())
                }), e.event.bind(window, "mousemove", function(e) {
                    if (u) {
                        var n = {
                            x: e.pageX,
                            y: e.pageY
                        }, o = {
                                left: t.offsetLeft,
                                right: t.offsetLeft + t.offsetWidth,
                                top: t.offsetTop,
                                bottom: t.offsetTop + t.offsetHeight
                            };
                        n.x < o.left + 3 ? (c.left = -5, r.startScrolling(t, "x")) : n.x > o.right - 3 ? (c.left = 5, r.startScrolling(t, "x")) : c.left = 0, n.y < o.top + 3 ? (c.top = o.top + 3 - n.y < 5 ? -5 : -20, r.startScrolling(t, "y")) : n.y > o.bottom - 3 ? (c.top = n.y - o.bottom + 3 < 5 ? 5 : 20, r.startScrolling(t, "y")) : c.top = 0, 0 === c.top && 0 === c.left ? s() : l()
                    }
                })
            }
            var r = t("../../lib/helper"),
                o = t("../instances"),
                i = t("../update-geometry");
            e.exports = function(t) {
                var e = o.get(t);
                n(t, e)
            }
        }, {
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19
        }
    ],
    16: [
        function(t, e) {
            "use strict";

            function n(t, e, n, i) {
                function l(n, r) {
                    var o = t.scrollTop,
                        i = t.scrollLeft,
                        l = Math.abs(n),
                        s = Math.abs(r);
                    if (s > l) {
                        if (0 > r && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation
                    } else if (l > s && (0 > n && i === e.contentWidth - e.containerWidth || n > 0 && 0 === i)) return !e.settings.swipePropagation;
                    return !0
                }

                function s(e, n) {
                    t.scrollTop = t.scrollTop - n, t.scrollLeft = t.scrollLeft - e, o(t)
                }

                function a() {
                    w = !0
                }

                function c() {
                    w = !1
                }

                function u(t) {
                    return t.targetTouches ? t.targetTouches[0] : t
                }

                function d(t) {
                    return t.targetTouches && 1 === t.targetTouches.length ? !0 : t.pointerType && "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE ? !0 : !1
                }

                function p(t) {
                    if (d(t)) {
                        y = !0;
                        var e = u(t);
                        b.pageX = e.pageX, b.pageY = e.pageY, g = (new Date).getTime(), null !== m && clearInterval(m), t.stopPropagation()
                    }
                }

                function f(t) {
                    if (!w && y && d(t)) {
                        var e = u(t),
                            n = {
                                pageX: e.pageX,
                                pageY: e.pageY
                            }, r = n.pageX - b.pageX,
                            o = n.pageY - b.pageY;
                        s(r, o), b = n;
                        var i = (new Date).getTime(),
                            a = i - g;
                        a > 0 && (v.x = r / a, v.y = o / a, g = i), l(r, o) && (t.stopPropagation(), t.preventDefault())
                    }
                }

                function h() {
                    !w && y && (y = !1, clearInterval(m), m = setInterval(function() {
                        return r.get(t) ? Math.abs(v.x) < .01 && Math.abs(v.y) < .01 ? void clearInterval(m) : (s(30 * v.x, 30 * v.y), v.x *= .8, void(v.y *= .8)) : void clearInterval(m)
                    }, 10))
                }
                var b = {}, g = 0,
                    v = {}, m = null,
                    w = !1,
                    y = !1;
                n && (e.event.bind(window, "touchstart", a), e.event.bind(window, "touchend", c), e.event.bind(t, "touchstart", p), e.event.bind(t, "touchmove", f), e.event.bind(t, "touchend", h)), i && (window.PointerEvent ? (e.event.bind(window, "pointerdown", a), e.event.bind(window, "pointerup", c), e.event.bind(t, "pointerdown", p), e.event.bind(t, "pointermove", f), e.event.bind(t, "pointerup", h)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", a), e.event.bind(window, "MSPointerUp", c), e.event.bind(t, "MSPointerDown", p), e.event.bind(t, "MSPointerMove", f), e.event.bind(t, "MSPointerUp", h)))
            }
            var r = t("../instances"),
                o = t("../update-geometry");
            e.exports = function(t, e, o) {
                var i = r.get(t);
                n(t, i, e, o)
            }
        }, {
            "../instances": 18,
            "../update-geometry": 19
        }
    ],
    17: [
        function(t, e) {
            "use strict";
            var n = t("../lib/class"),
                r = t("../lib/helper"),
                o = t("./instances"),
                i = t("./update-geometry"),
                l = t("./handler/click-rail"),
                s = t("./handler/drag-scrollbar"),
                a = t("./handler/keyboard"),
                c = t("./handler/mouse-wheel"),
                u = t("./handler/native-scroll"),
                d = t("./handler/selection"),
                p = t("./handler/touch");
            e.exports = function(t, e) {
                e = "object" == typeof e ? e : {}, n.add(t, "ps-container");
                var f = o.add(t);
                f.settings = r.extend(f.settings, e), l(t), s(t), c(t), u(t), d(t), (r.env.supportsTouch || r.env.supportsIePointer) && p(t, r.env.supportsTouch, r.env.supportsIePointer), f.settings.useKeyboard && a(t), i(t)
            }
        }, {
            "../lib/class": 2,
            "../lib/helper": 6,
            "./handler/click-rail": 10,
            "./handler/drag-scrollbar": 11,
            "./handler/keyboard": 12,
            "./handler/mouse-wheel": 13,
            "./handler/native-scroll": 14,
            "./handler/selection": 15,
            "./handler/touch": 16,
            "./instances": 18,
            "./update-geometry": 19
        }
    ],
    18: [
        function(t, e, n) {
            "use strict";

            function r(t) {
                var e = this;
                e.settings = d.clone(a), e.containerWidth = null, e.containerHeight = null, e.contentWidth = null, e.contentHeight = null, e.isRtl = "rtl" === s.css(t, "direction"), e.event = new c, e.ownerDocument = t.ownerDocument || document, e.scrollbarXRail = s.appendTo(s.e("div", "ps-scrollbar-x-rail"), t), e.scrollbarX = s.appendTo(s.e("div", "ps-scrollbar-x"), e.scrollbarXRail), e.scrollbarXActive = null, e.scrollbarXWidth = null, e.scrollbarXLeft = null, e.scrollbarXBottom = d.toInt(s.css(e.scrollbarXRail, "bottom")), e.isScrollbarXUsingBottom = e.scrollbarXBottom === e.scrollbarXBottom, e.scrollbarXTop = e.isScrollbarXUsingBottom ? null : d.toInt(s.css(e.scrollbarXRail, "top")), e.railBorderXWidth = d.toInt(s.css(e.scrollbarXRail, "borderLeftWidth")) + d.toInt(s.css(e.scrollbarXRail, "borderRightWidth")), e.railXMarginWidth = d.toInt(s.css(e.scrollbarXRail, "marginLeft")) + d.toInt(s.css(e.scrollbarXRail, "marginRight")), e.railXWidth = null, e.scrollbarYRail = s.appendTo(s.e("div", "ps-scrollbar-y-rail"), t), e.scrollbarY = s.appendTo(s.e("div", "ps-scrollbar-y"), e.scrollbarYRail), e.scrollbarYActive = null, e.scrollbarYHeight = null, e.scrollbarYTop = null, e.scrollbarYRight = d.toInt(s.css(e.scrollbarYRail, "right")), e.isScrollbarYUsingRight = e.scrollbarYRight === e.scrollbarYRight, e.scrollbarYLeft = e.isScrollbarYUsingRight ? null : d.toInt(s.css(e.scrollbarYRail, "left")), e.scrollbarYOuterWidth = e.isRtl ? d.outerWidth(e.scrollbarY) : null, e.railBorderYWidth = d.toInt(s.css(e.scrollbarYRail, "borderTopWidth")) + d.toInt(s.css(e.scrollbarYRail, "borderBottomWidth")), e.railYMarginHeight = d.toInt(s.css(e.scrollbarYRail, "marginTop")) + d.toInt(s.css(e.scrollbarYRail, "marginBottom")), e.railYHeight = null
            }

            function o(t) {
                return "undefined" == typeof t.dataset ? t.getAttribute("data-ps-id") : t.dataset.psId
            }

            function i(t, e) {
                "undefined" == typeof t.dataset ? t.setAttribute("data-ps-id", e) : t.dataset.psId = e
            }

            function l(t) {
                "undefined" == typeof t.dataset ? t.removeAttribute("data-ps-id") : delete t.dataset.psId
            }
            var s = t("../lib/dom"),
                a = t("./default-setting"),
                c = t("../lib/event-manager"),
                u = t("../lib/guid"),
                d = t("../lib/helper"),
                p = {};
            n.add = function(t) {
                var e = u();
                return i(t, e), p[e] = new r(t), p[e]
            }, n.remove = function(t) {
                delete p[o(t)], l(t)
            }, n.get = function(t) {
                return p[o(t)]
            }
        }, {
            "../lib/dom": 3,
            "../lib/event-manager": 4,
            "../lib/guid": 5,
            "../lib/helper": 6,
            "./default-setting": 8
        }
    ],
    19: [
        function(t, e) {
            "use strict";

            function n(t, e) {
                return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
            }

            function r(t, e) {
                var n = {
                    width: e.railXWidth
                };
                n.left = e.isRtl ? t.scrollLeft + e.containerWidth - e.contentWidth : t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, i.css(e.scrollbarXRail, n);
                var r = {
                    top: t.scrollTop,
                    height: e.railYHeight
                };
                e.isScrollbarYUsingRight ? r.right = e.isRtl ? e.contentWidth - t.scrollLeft - e.scrollbarYRight - e.scrollbarYOuterWidth : e.scrollbarYRight - t.scrollLeft : r.left = e.isRtl ? t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : e.scrollbarYLeft + t.scrollLeft, i.css(e.scrollbarYRail, r), i.css(e.scrollbarX, {
                    left: e.scrollbarXLeft,
                    width: e.scrollbarXWidth - e.railBorderXWidth
                }), i.css(e.scrollbarY, {
                    top: e.scrollbarYTop,
                    height: e.scrollbarYHeight - e.railBorderYWidth
                })
            }
            var o = t("../lib/class"),
                i = t("../lib/dom"),
                l = t("../lib/helper"),
                s = t("./instances");
            e.exports = function(t) {
                var e = s.get(t);
                e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || i.appendTo(e.scrollbarXRail, t), t.contains(e.scrollbarYRail) || i.appendTo(e.scrollbarYRail, t), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.scrollbarXWidth = n(e, l.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = l.toInt(t.scrollLeft * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : (e.scrollbarXActive = !1, e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = 0), !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.scrollbarYHeight = n(e, l.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = l.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : (e.scrollbarYActive = !1, e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0), e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), r(t, e), o[e.scrollbarXActive ? "add" : "remove"](t, "ps-active-x"), o[e.scrollbarYActive ? "add" : "remove"](t, "ps-active-y")
            }
        }, {
            "../lib/class": 2,
            "../lib/dom": 3,
            "../lib/helper": 6,
            "./instances": 18
        }
    ],
    20: [
        function(t, e) {
            "use strict";
            var n = t("../lib/dom"),
                r = t("./instances"),
                o = t("./update-geometry");
            e.exports = function(t) {
                var e = r.get(t);
                n.css(e.scrollbarXRail, "display", "none"), n.css(e.scrollbarYRail, "display", "none"), o(t), n.css(e.scrollbarXRail, "display", "block"), n.css(e.scrollbarYRail, "display", "block")
            }
        }, {
            "../lib/dom": 3,
            "./instances": 18,
            "./update-geometry": 19
        }
    ]
}, {}, [1]);
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.alert");
            n || o.data("bs.alert", n = new i(this)), "string" == typeof e && n[e].call(o)
        })
    }
    var o = '[data-dismiss="alert"]',
        i = function(e) {
            t(e).on("click", o, this.close)
        };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 150, i.prototype.close = function(e) {
        function o() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var n = t(this),
            s = n.attr("data-target");
        s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var r = t(s);
        e && e.preventDefault(), r.length || (r = n.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o())
    };
    var n = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
        return t.fn.alert = n, this
    }, t(document).on("click.bs.alert.data-api", o, i.prototype.close)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.tooltip"),
                s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || i.data("bs.tooltip", n = new o(this, s)), "string" == typeof e && n[e]())
        })
    }
    var o = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, e)
    };
    o.VERSION = "3.3.2", o.TRANSITION_DURATION = 150, o.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, o.prototype.init = function(e, o, i) {
        if (this.enabled = !0, this.type = e, this.$element = t(o), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var r = n[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin",
                    l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, o.prototype.getDefaults = function() {
        return o.DEFAULTS
    }, o.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, o.prototype.getDelegateOptions = function() {
        var e = {}, o = this.getDefaults();
        return this._options && t.each(this._options, function(t, i) {
            o[t] != i && (e[t] = i)
        }), e
    }, o.prototype.enter = function(e) {
        var o = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return o && o.$tip && o.$tip.is(":visible") ? void(o.hoverState = "in") : (o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o)), clearTimeout(o.timeout), o.hoverState = "in", o.options.delay && o.options.delay.show ? void(o.timeout = setTimeout(function() {
            "in" == o.hoverState && o.show()
        }, o.options.delay.show)) : o.show())
    }, o.prototype.leave = function(e) {
        var o = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o)), clearTimeout(o.timeout), o.hoverState = "out", o.options.delay && o.options.delay.hide ? void(o.timeout = setTimeout(function() {
            "out" == o.hoverState && o.hide()
        }, o.options.delay.hide)) : o.hide()
    }, o.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i) return;
            var n = this,
                s = this.tip(),
                r = this.getUID(this.type);
            this.setContent(), s.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && s.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                p = l.test(a);
            p && (a = a.replace(l, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element);
            var h = this.getPosition(),
                f = s[0].offsetWidth,
                c = s[0].offsetHeight;
            if (p) {
                var u = a,
                    d = this.options.container ? t(this.options.container) : this.$element.parent(),
                    g = this.getPosition(d);
                a = "bottom" == a && h.bottom + c > g.bottom ? "top" : "top" == a && h.top - c < g.top ? "bottom" : "right" == a && h.right + f > g.width ? "left" : "left" == a && h.left - f < g.left ? "right" : a, s.removeClass(u).addClass(a)
            }
            var v = this.getCalculatedOffset(a, h, f, c);
            this.applyPlacement(v, a);
            var y = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", y).emulateTransitionEnd(o.TRANSITION_DURATION) : y()
        }
    }, o.prototype.applyPlacement = function(e, o) {
        var i = this.tip(),
            n = i[0].offsetWidth,
            s = i[0].offsetHeight,
            r = parseInt(i.css("margin-top"), 10),
            a = parseInt(i.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top = e.top + r, e.left = e.left + a, t.offset.setOffset(i[0], t.extend({
            using: function(t) {
                i.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), i.addClass("in");
        var l = i[0].offsetWidth,
            p = i[0].offsetHeight;
        "top" == o && p != s && (e.top = e.top + s - p);
        var h = this.getViewportAdjustedDelta(o, e, l, p);
        h.left ? e.left += h.left : e.top += h.top;
        var f = /top|bottom/.test(o),
            c = f ? 2 * h.left - n + l : 2 * h.top - s + p,
            u = f ? "offsetWidth" : "offsetHeight";
        i.offset(e), this.replaceArrow(c, i[0][u], f)
    }, o.prototype.replaceArrow = function(t, e, o) {
        this.arrow().css(o ? "left" : "top", 50 * (1 - t / e) + "%").css(o ? "top" : "left", "")
    }, o.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, o.prototype.hide = function(e) {
        function i() {
            "in" != n.hoverState && s.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), e && e()
        }
        var n = this,
            s = t(this.$tip),
            r = t.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i(), this.hoverState = null, this)
    }, o.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, o.prototype.hasContent = function() {
        return this.getTitle()
    }, o.prototype.getPosition = function(e) {
        e = e || this.$element;
        var o = e[0],
            i = "BODY" == o.tagName,
            n = o.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = i ? {
            top: 0,
            left: 0
        } : e.offset(),
            r = {
                scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            }, a = i ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, n, r, a, s)
    }, o.prototype.getCalculatedOffset = function(t, e, o, i) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - o / 2
        } : "top" == t ? {
            top: e.top - i,
            left: e.left + e.width / 2 - o / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - i / 2,
            left: e.left - o
        } : {
            top: e.top + e.height / 2 - i / 2,
            left: e.left + e.width
        }
    }, o.prototype.getViewportAdjustedDelta = function(t, e, o, i) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);

        if (/right|left/.test(t)) {
            var a = e.top - s - r.scroll,
                l = e.top + s - r.scroll + i;
            a < r.top ? n.top = r.top - a : l > r.top + r.height && (n.top = r.top + r.height - l)
        } else {
            var p = e.left - s,
                h = e.left + s + o;
            p < r.left ? n.left = r.left - p : h > r.width && (n.left = r.left + r.width - h)
        }
        return n
    }, o.prototype.getTitle = function() {
        var t, e = this.$element,
            o = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call(e[0]) : o.title)
    }, o.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, o.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }, o.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, o.prototype.enable = function() {
        this.enabled = !0
    }, o.prototype.disable = function() {
        this.enabled = !1
    }, o.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, o.prototype.toggle = function(e) {
        var o = this;
        e && (o = t(e.currentTarget).data("bs." + this.type), o || (o = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, o))), o.tip().hasClass("in") ? o.leave(o) : o.enter(o)
    }, o.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = o, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i, this
    }
}(jQuery);
(function() {
    var n = this,
        t = n._,
        r = {}, e = Array.prototype,
        u = Object.prototype,
        i = Function.prototype,
        a = e.push,
        o = e.slice,
        c = e.concat,
        l = u.toString,
        f = u.hasOwnProperty,
        s = e.forEach,
        p = e.map,
        h = e.reduce,
        v = e.reduceRight,
        g = e.filter,
        d = e.every,
        m = e.some,
        y = e.indexOf,
        b = e.lastIndexOf,
        x = Array.isArray,
        w = Object.keys,
        _ = i.bind,
        j = function(n) {
            return n instanceof j ? n : this instanceof j ? void(this._wrapped = n) : new j(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = "1.6.0";
    var A = j.each = j.forEach = function(n, t, e) {
        if (null == n) return n;
        if (s && n.forEach === s) n.forEach(t, e);
        else if (n.length === +n.length) {
            for (var u = 0, i = n.length; i > u; u++)
                if (t.call(e, n[u], u, n) === r) return
        } else
            for (var a = j.keys(n), u = 0, i = a.length; i > u; u++)
                if (t.call(e, n[a[u]], a[u], n) === r) return; return n
    };
    j.map = j.collect = function(n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
            e.push(t.call(r, n, u, i))
        }), e)
    };
    var O = "Reduce of empty array with no initial value";
    j.reduce = j.foldl = j.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduce === h) return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function(n, i, a) {
            u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
        }), !u) throw new TypeError(O);
        return r
    }, j.reduceRight = j.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduceRight === v) return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = j.keys(n);
            i = a.length
        }
        if (A(n, function(o, c, l) {
            c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0)
        }), !u) throw new TypeError(O);
        return r
    }, j.find = j.detect = function(n, t, r) {
        var e;
        return k(n, function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0
        }), e
    }, j.filter = j.select = function(n, t, r) {
        var e = [];
        return null == n ? e : g && n.filter === g ? n.filter(t, r) : (A(n, function(n, u, i) {
            t.call(r, n, u, i) && e.push(n)
        }), e)
    }, j.reject = function(n, t, r) {
        return j.filter(n, function(n, e, u) {
            return !t.call(r, n, e, u)
        }, r)
    }, j.every = j.all = function(n, t, e) {
        t || (t = j.identity);
        var u = !0;
        return null == n ? u : d && n.every === d ? n.every(t, e) : (A(n, function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r
        }), !! u)
    };
    var k = j.some = j.any = function(n, t, e) {
        t || (t = j.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0
        }), !! u)
    };
    j.contains = j.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : k(n, function(n) {
            return n === t
        })
    }, j.invoke = function(n, t) {
        var r = o.call(arguments, 2),
            e = j.isFunction(t);
        return j.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r)
        })
    }, j.pluck = function(n, t) {
        return j.map(n, j.property(t))
    }, j.where = function(n, t) {
        return j.filter(n, j.matches(t))
    }, j.findWhere = function(n, t) {
        return j.find(n, j.matches(t))
    }, j.max = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.max.apply(Math, n);
        var e = -1 / 0,
            u = -1 / 0;
        return A(n, function(n, i, a) {
            var o = t ? t.call(r, n, i, a) : n;
            o > u && (e = n, u = o)
        }), e
    }, j.min = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.min.apply(Math, n);
        var e = 1 / 0,
            u = 1 / 0;
        return A(n, function(n, i, a) {
            var o = t ? t.call(r, n, i, a) : n;
            u > o && (e = n, u = o)
        }), e
    }, j.shuffle = function(n) {
        var t, r = 0,
            e = [];
        return A(n, function(n) {
            t = j.random(r++), e[r - 1] = e[t], e[t] = n
        }), e
    }, j.sample = function(n, t, r) {
        return null == t || r ? (n.length !== +n.length && (n = j.values(n)), n[j.random(n.length - 1)]) : j.shuffle(n).slice(0, Math.max(0, t))
    };
    var E = function(n) {
        return null == n ? j.identity : j.isFunction(n) ? n : j.property(n)
    };
    j.sortBy = function(n, t, r) {
        return t = E(t), j.pluck(j.map(n, function(n, e, u) {
            return {
                value: n,
                index: e,
                criteria: t.call(r, n, e, u)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = E(r), A(t, function(i, a) {
                var o = r.call(e, i, a, t);
                n(u, o, i)
            }), u
        }
    };
    j.groupBy = F(function(n, t, r) {
        j.has(n, t) ? n[t].push(r) : n[t] = [r]
    }), j.indexBy = F(function(n, t, r) {
        n[t] = r
    }), j.countBy = F(function(n, t) {
        j.has(n, t) ? n[t]++ : n[t] = 1
    }), j.sortedIndex = function(n, t, r, e) {
        r = E(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
            var o = i + a >>> 1;
            r.call(e, n[o]) < u ? i = o + 1 : a = o
        }
        return i
    }, j.toArray = function(n) {
        return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : []
    }, j.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length
    }, j.first = j.head = j.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : o.call(n, 0, t)
    }, j.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t))
    }, j.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
    }, j.rest = j.tail = j.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t)
    }, j.compact = function(n) {
        return j.filter(n, j.identity)
    };
    var M = function(n, t, r) {
        return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function(n) {
            j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : M(n, t, r) : r.push(n)
        }), r)
    };
    j.flatten = function(n, t) {
        return M(n, t, [])
    }, j.without = function(n) {
        return j.difference(n, o.call(arguments, 1))
    }, j.partition = function(n, t) {
        var r = [],
            e = [];
        return A(n, function(n) {
            (t(n) ? r : e).push(n)
        }), [r, e]
    }, j.uniq = j.unique = function(n, t, r, e) {
        j.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? j.map(n, r, e) : n,
            i = [],
            a = [];
        return A(u, function(r, e) {
            (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e]))
        }), i
    }, j.union = function() {
        return j.uniq(j.flatten(arguments, !0))
    }, j.intersection = function(n) {
        var t = o.call(arguments, 1);
        return j.filter(j.uniq(n), function(n) {
            return j.every(t, function(t) {
                return j.contains(t, n)
            })
        })
    }, j.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return j.filter(n, function(n) {
            return !j.contains(t, n)
        })
    }, j.zip = function() {
        for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++) t[r] = j.pluck(arguments, "" + r);
        return t
    }, j.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, j.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0,
            u = n.length;
        if (r) {
            if ("number" != typeof r) return e = j.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r
        }
        if (y && n.indexOf === y) return n.indexOf(t, r);
        for (; u > e; e++)
            if (n[e] === t) return e;
        return -1
    }, j.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--;)
            if (n[u] === t) return u;
        return -1
    }, j.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;) i[u++] = n, n += r;
        return i
    };
    var R = function() {};
    j.bind = function(n, t) {
        var r, e;
        if (_ && n.bind === _) return _.apply(n, o.call(arguments, 1));
        if (!j.isFunction(n)) throw new TypeError;
        return r = o.call(arguments, 2), e = function() {
            if (!(this instanceof e)) return n.apply(t, r.concat(o.call(arguments)));
            R.prototype = n.prototype;
            var u = new R;
            R.prototype = null;
            var i = n.apply(u, r.concat(o.call(arguments)));
            return Object(i) === i ? i : u
        }
    }, j.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++) e[u] === j && (e[u] = arguments[r++]);
            for (; r < arguments.length;) e.push(arguments[r++]);
            return n.apply(this, e)
        }
    }, j.bindAll = function(n) {
        var t = o.call(arguments, 1);
        if (0 === t.length) throw new Error("bindAll must be passed function names");
        return A(t, function(t) {
            n[t] = j.bind(n[t], n)
        }), n
    }, j.memoize = function(n, t) {
        var r = {};
        return t || (t = j.identity),
        function() {
            var e = t.apply(this, arguments);
            return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
        }
    }, j.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, j.defer = function(n) {
        return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1)))
    }, j.throttle = function(n, t, r) {
        var e, u, i, a = null,
            o = 0;
        r || (r = {});
        var c = function() {
            o = r.leading === !1 ? 0 : j.now(), a = null, i = n.apply(e, u), e = u = null
        };
        return function() {
            var l = j.now();
            o || r.leading !== !1 || (o = l);
            var f = t - (l - o);
            return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u), e = u = null) : a || r.trailing === !1 || (a = setTimeout(c, f)), i
        }
    }, j.debounce = function(n, t, r) {
        var e, u, i, a, o, c = function() {
                var l = j.now() - a;
                t > l ? e = setTimeout(c, t - l) : (e = null, r || (o = n.apply(i, u), i = u = null))
            };
        return function() {
            i = this, u = arguments, a = j.now();
            var l = r && !e;
            return e || (e = setTimeout(c, t)), l && (o = n.apply(i, u), i = u = null), o
        }
    }, j.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t)
        }
    }, j.wrap = function(n, t) {
        return j.partial(t, n)
    }, j.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [n[r].apply(this, t)];
            return t[0]
        }
    }, j.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, j.keys = function(n) {
        if (!j.isObject(n)) return [];
        if (w) return w(n);
        var t = [];
        for (var r in n) j.has(n, r) && t.push(r);
        return t
    }, j.values = function(n) {
        for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
        return e
    }, j.pairs = function(n) {
        for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
        return e
    }, j.invert = function(n) {
        for (var t = {}, r = j.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
        return t
    }, j.functions = j.methods = function(n) {
        var t = [];
        for (var r in n) j.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, j.extend = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t) n[r] = t[r]
        }), n
    }, j.pick = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        return A(r, function(r) {
            r in n && (t[r] = n[r])
        }), t
    }, j.omit = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        for (var u in n) j.contains(r, u) || (t[u] = n[u]);
        return t
    }, j.defaults = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t) n[r] === void 0 && (n[r] = t[r])
        }), n
    }, j.clone = function(n) {
        return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n
    }, j.tap = function(n, t) {
        return t(n), n
    };
    var S = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t)) return !1;
        switch (u) {
            case "[object String]":
                return n == String(t);
            case "[object Number]":
                return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n == +t;
            case "[object RegExp]":
                return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof n || "object" != typeof t) return !1;
        for (var i = r.length; i--;)
            if (r[i] == n) return e[i] == t;
        var a = n.constructor,
            o = t.constructor;
        if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o) && "constructor" in n && "constructor" in t) return !1;
        r.push(n), e.push(t);
        var c = 0,
            f = !0;
        if ("[object Array]" == u) {
            if (c = n.length, f = c == t.length)
                for (; c-- && (f = S(n[c], t[c], r, e)););
        } else {
            for (var s in n)
                if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e)))) break;
            if (f) {
                for (s in t)
                    if (j.has(t, s) && !c--) break;
                f = !c
            }
        }
        return r.pop(), e.pop(), f
    };
    j.isEqual = function(n, t) {
        return S(n, t, [], [])
    }, j.isEmpty = function(n) {
        if (null == n) return !0;
        if (j.isArray(n) || j.isString(n)) return 0 === n.length;
        for (var t in n)
            if (j.has(n, t)) return !1;
        return !0
    }, j.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }, j.isArray = x || function(n) {
        return "[object Array]" == l.call(n)
    }, j.isObject = function(n) {
        return n === Object(n)
    }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) {
        j["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]"
        }
    }), j.isArguments(arguments) || (j.isArguments = function(n) {
        return !(!n || !j.has(n, "callee"))
    }), "function" != typeof / . / && (j.isFunction = function(n) {
        return "function" == typeof n
    }), j.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, j.isNaN = function(n) {
        return j.isNumber(n) && n != +n
    }, j.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
    }, j.isNull = function(n) {
        return null === n
    }, j.isUndefined = function(n) {
        return n === void 0
    }, j.has = function(n, t) {
        return f.call(n, t)
    }, j.noConflict = function() {
        return n._ = t, this
    }, j.identity = function(n) {
        return n
    }, j.constant = function(n) {
        return function() {
            return n
        }
    }, j.property = function(n) {
        return function(t) {
            return t[n]
        }
    }, j.matches = function(n) {
        return function(t) {
            if (t === n) return !0;
            for (var r in n)
                if (n[r] !== t[r]) return !1;
            return !0
        }
    }, j.times = function(n, t, r) {
        for (var e = Array(Math.max(0, n)), u = 0; n > u; u++) e[u] = t.call(r, u);
        return e
    }, j.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, j.now = Date.now || function() {
        return (new Date).getTime()
    };
    var T = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;"
        }
    };
    T.unescape = j.invert(T.escape);
    var I = {
        escape: new RegExp("[" + j.keys(T.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + j.keys(T.unescape).join("|") + ")", "g")
    };
    j.each(["escape", "unescape"], function(n) {
        j[n] = function(t) {
            return null == t ? "" : ("" + t).replace(I[n], function(t) {
                return T[n][t]
            })
        }
    }), j.result = function(n, t) {
        if (null == n) return void 0;
        var r = n[t];
        return j.isFunction(r) ? r.call(n) : r
    }, j.mixin = function(n) {
        A(j.functions(n), function(t) {
            var r = j[t] = n[t];
            j.prototype[t] = function() {
                var n = [this._wrapped];
                return a.apply(n, arguments), z.call(this, r.apply(j, n))
            }
        })
    };
    var N = 0;
    j.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t : t
    }, j.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var q = /(.)^/,
        B = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    j.template = function(n, t, r) {
        var e;
        r = j.defaults({}, r, j.templateSettings);
        var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$", "g"),
            i = 0,
            a = "__p+='";
        n.replace(u, function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(D, function(n) {
                return "\\" + B[n]
            }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t
        }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = new Function(r.variable || "obj", "_", a)
        } catch (o) {
            throw o.source = a, o
        }
        if (t) return e(t, j);
        var c = function(n) {
            return e.call(this, n, j)
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c
    }, j.chain = function(n) {
        return j(n).chain()
    };
    var z = function(n) {
        return this._chain ? j(n).chain() : n
    };
    j.mixin(j), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], z.call(this, r)
        }
    }), A(["concat", "join", "slice"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            return z.call(this, t.apply(this._wrapped, arguments))
        }
    }), j.extend(j.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    }), "function" == typeof define && define.amd && define("underscore", [], function() {
        return j
    })
}).call(this);
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.io = e()
    }
}(function() {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
                var f = n[o] = {
                    exports: {}
                };
                t[o][0].call(f.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, f, f.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    }({
        1: [
            function(_dereq_, module, exports) {
                module.exports = _dereq_("./lib/")
            }, {
                "./lib/": 2
            }
        ],
        2: [
            function(_dereq_, module, exports) {
                var url = _dereq_("./url");
                var parser = _dereq_("socket.io-parser");
                var Manager = _dereq_("./manager");
                var debug = _dereq_("debug")("socket.io-client");
                module.exports = exports = lookup;
                var cache = exports.managers = {};

                function lookup(uri, opts) {
                    if (typeof uri == "object") {
                        opts = uri;
                        uri = undefined
                    }
                    opts = opts || {};
                    var parsed = url(uri);
                    var source = parsed.source;
                    var id = parsed.id;
                    var io;
                    if (opts.forceNew || opts["force new connection"] || false === opts.multiplex) {
                        debug("ignoring socket cache for %s", source);
                        io = Manager(source, opts)
                    } else {
                        if (!cache[id]) {
                            debug("new io instance for %s", source);
                            cache[id] = Manager(source, opts)
                        }
                        io = cache[id]
                    }
                    return io.socket(parsed.path)
                }
                exports.protocol = parser.protocol;
                exports.connect = lookup;
                exports.Manager = _dereq_("./manager");
                exports.Socket = _dereq_("./socket")
            }, {
                "./manager": 3,
                "./socket": 5,
                "./url": 6,
                debug: 10,
                "socket.io-parser": 46
            }
        ],
        3: [
            function(_dereq_, module, exports) {
                var url = _dereq_("./url");
                var eio = _dereq_("engine.io-client");
                var Socket = _dereq_("./socket");
                var Emitter = _dereq_("component-emitter");
                var parser = _dereq_("socket.io-parser");
                var on = _dereq_("./on");
                var bind = _dereq_("component-bind");
                var object = _dereq_("object-component");
                var debug = _dereq_("debug")("socket.io-client:manager");
                var indexOf = _dereq_("indexof");
                var Backoff = _dereq_("backo2");
                module.exports = Manager;

                function Manager(uri, opts) {
                    if (!(this instanceof Manager)) return new Manager(uri, opts);
                    if (uri && "object" == typeof uri) {
                        opts = uri;
                        uri = undefined
                    }
                    opts = opts || {};
                    opts.path = opts.path || "/socket.io";
                    this.nsps = {};
                    this.subs = [];
                    this.opts = opts;
                    this.reconnection(opts.reconnection !== false);
                    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
                    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
                    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
                    this.randomizationFactor(opts.randomizationFactor || .5);
                    this.backoff = new Backoff({
                        min: this.reconnectionDelay(),
                        max: this.reconnectionDelayMax(),
                        jitter: this.randomizationFactor()
                    });
                    this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
                    this.readyState = "closed";
                    this.uri = uri;
                    this.connected = [];
                    this.encoding = false;
                    this.packetBuffer = [];
                    this.encoder = new parser.Encoder;
                    this.decoder = new parser.Decoder;
                    this.autoConnect = opts.autoConnect !== false;
                    if (this.autoConnect) this.open()
                }
                Manager.prototype.emitAll = function() {
                    this.emit.apply(this, arguments);
                    for (var nsp in this.nsps) {
                        this.nsps[nsp].emit.apply(this.nsps[nsp], arguments)
                    }
                };
                Manager.prototype.updateSocketIds = function() {
                    for (var nsp in this.nsps) {
                        this.nsps[nsp].id = this.engine.id
                    }
                };
                Emitter(Manager.prototype);
                Manager.prototype.reconnection = function(v) {
                    if (!arguments.length) return this._reconnection;
                    this._reconnection = !! v;
                    return this
                };
                Manager.prototype.reconnectionAttempts = function(v) {
                    if (!arguments.length) return this._reconnectionAttempts;
                    this._reconnectionAttempts = v;
                    return this
                };
                Manager.prototype.reconnectionDelay = function(v) {
                    if (!arguments.length) return this._reconnectionDelay;
                    this._reconnectionDelay = v;
                    this.backoff && this.backoff.setMin(v);
                    return this
                };
                Manager.prototype.randomizationFactor = function(v) {
                    if (!arguments.length) return this._randomizationFactor;
                    this._randomizationFactor = v;
                    this.backoff && this.backoff.setJitter(v);
                    return this
                };
                Manager.prototype.reconnectionDelayMax = function(v) {
                    if (!arguments.length) return this._reconnectionDelayMax;
                    this._reconnectionDelayMax = v;
                    this.backoff && this.backoff.setMax(v);
                    return this
                };
                Manager.prototype.timeout = function(v) {
                    if (!arguments.length) return this._timeout;
                    this._timeout = v;
                    return this
                };
                Manager.prototype.maybeReconnectOnOpen = function() {
                    if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
                        this.reconnect()
                    }
                };
                Manager.prototype.open = Manager.prototype.connect = function(fn) {
                    debug("readyState %s", this.readyState);
                    if (~this.readyState.indexOf("open")) return this;
                    debug("opening %s", this.uri);
                    this.engine = eio(this.uri, this.opts);
                    var socket = this.engine;
                    var self = this;
                    this.readyState = "opening";
                    this.skipReconnect = false;
                    var openSub = on(socket, "open", function() {
                        self.onopen();
                        fn && fn()
                    });
                    var errorSub = on(socket, "error", function(data) {
                        debug("connect_error");
                        self.cleanup();
                        self.readyState = "closed";
                        self.emitAll("connect_error", data);
                        if (fn) {
                            var err = new Error("Connection error");
                            err.data = data;
                            fn(err)
                        } else {
                            self.maybeReconnectOnOpen()
                        }
                    });
                    if (false !== this._timeout) {
                        var timeout = this._timeout;
                        debug("connect attempt will timeout after %d", timeout);
                        var timer = setTimeout(function() {
                            debug("connect attempt timed out after %d", timeout);
                            openSub.destroy();
                            socket.close();
                            socket.emit("error", "timeout");
                            self.emitAll("connect_timeout", timeout)
                        }, timeout);
                        this.subs.push({
                            destroy: function() {
                                clearTimeout(timer)
                            }
                        })
                    }
                    this.subs.push(openSub);
                    this.subs.push(errorSub);
                    return this
                };
                Manager.prototype.onopen = function() {
                    debug("open");
                    this.cleanup();
                    this.readyState = "open";
                    this.emit("open");
                    var socket = this.engine;
                    this.subs.push(on(socket, "data", bind(this, "ondata")));
                    this.subs.push(on(this.decoder, "decoded", bind(this, "ondecoded")));
                    this.subs.push(on(socket, "error", bind(this, "onerror")));
                    this.subs.push(on(socket, "close", bind(this, "onclose")))
                };
                Manager.prototype.ondata = function(data) {
                    this.decoder.add(data)
                };
                Manager.prototype.ondecoded = function(packet) {
                    this.emit("packet", packet)
                };
                Manager.prototype.onerror = function(err) {
                    debug("error", err);
                    this.emitAll("error", err)
                };
                Manager.prototype.socket = function(nsp) {
                    var socket = this.nsps[nsp];
                    if (!socket) {
                        socket = new Socket(this, nsp);
                        this.nsps[nsp] = socket;
                        var self = this;
                        socket.on("connect", function() {
                            socket.id = self.engine.id;
                            if (!~indexOf(self.connected, socket)) {
                                self.connected.push(socket)
                            }
                        })
                    }
                    return socket
                };
                Manager.prototype.destroy = function(socket) {
                    var index = indexOf(this.connected, socket);
                    if (~index) this.connected.splice(index, 1);
                    if (this.connected.length) return;
                    this.close()
                };
                Manager.prototype.packet = function(packet) {
                    debug("writing packet %j", packet);
                    var self = this;
                    if (!self.encoding) {
                        self.encoding = true;
                        this.encoder.encode(packet, function(encodedPackets) {
                            for (var i = 0; i < encodedPackets.length; i++) {
                                self.engine.write(encodedPackets[i])
                            }
                            self.encoding = false;
                            self.processPacketQueue()
                        })
                    } else {
                        self.packetBuffer.push(packet)
                    }
                };
                Manager.prototype.processPacketQueue = function() {
                    if (this.packetBuffer.length > 0 && !this.encoding) {
                        var pack = this.packetBuffer.shift();
                        this.packet(pack)
                    }
                };
                Manager.prototype.cleanup = function() {
                    var sub;
                    while (sub = this.subs.shift()) sub.destroy();
                    this.packetBuffer = [];
                    this.encoding = false;
                    this.decoder.destroy()
                };
                Manager.prototype.close = Manager.prototype.disconnect = function() {
                    this.skipReconnect = true;
                    this.backoff.reset();
                    this.readyState = "closed";
                    this.engine && this.engine.close()
                };
                Manager.prototype.onclose = function(reason) {
                    debug("close");
                    this.cleanup();
                    this.backoff.reset();
                    this.readyState = "closed";
                    this.emit("close", reason);
                    if (this._reconnection && !this.skipReconnect) {
                        this.reconnect()
                    }
                };
                Manager.prototype.reconnect = function() {
                    if (this.reconnecting || this.skipReconnect) return this;
                    var self = this;
                    if (this.backoff.attempts >= this._reconnectionAttempts) {
                        debug("reconnect failed");
                        this.backoff.reset();
                        this.emitAll("reconnect_failed");
                        this.reconnecting = false
                    } else {
                        var delay = this.backoff.duration();
                        debug("will wait %dms before reconnect attempt", delay);
                        this.reconnecting = true;
                        var timer = setTimeout(function() {
                            if (self.skipReconnect) return;
                            debug("attempting reconnect");
                            self.emitAll("reconnect_attempt", self.backoff.attempts);
                            self.emitAll("reconnecting", self.backoff.attempts);
                            if (self.skipReconnect) return;
                            self.open(function(err) {
                                if (err) {
                                    debug("reconnect attempt error");
                                    self.reconnecting = false;
                                    self.reconnect();
                                    self.emitAll("reconnect_error", err.data)
                                } else {
                                    debug("reconnect success");
                                    self.onreconnect()
                                }
                            })
                        }, delay);
                        this.subs.push({
                            destroy: function() {
                                clearTimeout(timer)
                            }
                        })
                    }
                };
                Manager.prototype.onreconnect = function() {
                    var attempt = this.backoff.attempts;
                    this.reconnecting = false;
                    this.backoff.reset();
                    this.updateSocketIds();
                    this.emitAll("reconnect", attempt)
                }
            }, {
                "./on": 4,
                "./socket": 5,
                "./url": 6,
                backo2: 7,
                "component-bind": 8,
                "component-emitter": 9,
                debug: 10,
                "engine.io-client": 11,
                indexof: 42,
                "object-component": 43,
                "socket.io-parser": 46
            }
        ],
        4: [
            function(_dereq_, module, exports) {
                module.exports = on;

                function on(obj, ev, fn) {
                    obj.on(ev, fn);
                    return {
                        destroy: function() {
                            obj.removeListener(ev, fn)
                        }
                    }
                }
            }, {}
        ],
        5: [
            function(_dereq_, module, exports) {
                var parser = _dereq_("socket.io-parser");
                var Emitter = _dereq_("component-emitter");
                var toArray = _dereq_("to-array");
                var on = _dereq_("./on");
                var bind = _dereq_("component-bind");
                var debug = _dereq_("debug")("socket.io-client:socket");
                var hasBin = _dereq_("has-binary");
                module.exports = exports = Socket;
                var events = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1
                };
                var emit = Emitter.prototype.emit;

                function Socket(io, nsp) {
                    this.io = io;
                    this.nsp = nsp;
                    this.json = this;
                    this.ids = 0;
                    this.acks = {};
                    if (this.io.autoConnect) this.open();
                    this.receiveBuffer = [];
                    this.sendBuffer = [];
                    this.connected = false;
                    this.disconnected = true
                }
                Emitter(Socket.prototype);
                Socket.prototype.subEvents = function() {
                    if (this.subs) return;
                    var io = this.io;
                    this.subs = [on(io, "open", bind(this, "onopen")), on(io, "packet", bind(this, "onpacket")), on(io, "close", bind(this, "onclose"))]
                };
                Socket.prototype.open = Socket.prototype.connect = function() {
                    if (this.connected) return this;
                    this.subEvents();
                    this.io.open();
                    if ("open" == this.io.readyState) this.onopen();
                    return this
                };
                Socket.prototype.send = function() {
                    var args = toArray(arguments);
                    args.unshift("message");
                    this.emit.apply(this, args);
                    return this
                };
                Socket.prototype.emit = function(ev) {
                    if (events.hasOwnProperty(ev)) {
                        emit.apply(this, arguments);
                        return this
                    }
                    var args = toArray(arguments);
                    var parserType = parser.EVENT;
                    if (hasBin(args)) {
                        parserType = parser.BINARY_EVENT
                    }
                    var packet = {
                        type: parserType,
                        data: args
                    };
                    if ("function" == typeof args[args.length - 1]) {
                        debug("emitting packet with ack id %d", this.ids);
                        this.acks[this.ids] = args.pop();
                        packet.id = this.ids++
                    }
                    if (this.connected) {
                        this.packet(packet)
                    } else {
                        this.sendBuffer.push(packet)
                    }
                    return this
                };
                Socket.prototype.packet = function(packet) {
                    packet.nsp = this.nsp;
                    this.io.packet(packet)
                };
                Socket.prototype.onopen = function() {
                    debug("transport is open - connecting");
                    if ("/" != this.nsp) {
                        this.packet({
                            type: parser.CONNECT
                        })
                    }
                };
                Socket.prototype.onclose = function(reason) {
                    debug("close (%s)", reason);
                    this.connected = false;
                    this.disconnected = true;
                    delete this.id;
                    this.emit("disconnect", reason)
                };
                Socket.prototype.onpacket = function(packet) {
                    if (packet.nsp != this.nsp) return;
                    switch (packet.type) {
                        case parser.CONNECT:
                            this.onconnect();
                            break;
                        case parser.EVENT:
                            this.onevent(packet);
                            break;
                        case parser.BINARY_EVENT:
                            this.onevent(packet);
                            break;
                        case parser.ACK:
                            this.onack(packet);
                            break;
                        case parser.BINARY_ACK:
                            this.onack(packet);
                            break;
                        case parser.DISCONNECT:
                            this.ondisconnect();
                            break;
                        case parser.ERROR:
                            this.emit("error", packet.data);
                            break
                    }
                };
                Socket.prototype.onevent = function(packet) {
                    var args = packet.data || [];
                    debug("emitting event %j", args);
                    if (null != packet.id) {
                        debug("attaching ack callback to event");
                        args.push(this.ack(packet.id))
                    }
                    if (this.connected) {
                        emit.apply(this, args)
                    } else {
                        this.receiveBuffer.push(args)
                    }
                };
                Socket.prototype.ack = function(id) {
                    var self = this;
                    var sent = false;
                    return function() {
                        if (sent) return;
                        sent = true;
                        var args = toArray(arguments);
                        debug("sending ack %j", args);
                        var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
                        self.packet({
                            type: type,
                            id: id,
                            data: args
                        })
                    }
                };
                Socket.prototype.onack = function(packet) {
                    debug("calling ack %s with %j", packet.id, packet.data);
                    var fn = this.acks[packet.id];
                    fn.apply(this, packet.data);
                    delete this.acks[packet.id]
                };
                Socket.prototype.onconnect = function() {
                    this.connected = true;
                    this.disconnected = false;
                    this.emit("connect");
                    this.emitBuffered()
                };
                Socket.prototype.emitBuffered = function() {
                    var i;
                    for (i = 0; i < this.receiveBuffer.length; i++) {
                        emit.apply(this, this.receiveBuffer[i])
                    }
                    this.receiveBuffer = [];
                    for (i = 0; i < this.sendBuffer.length; i++) {
                        this.packet(this.sendBuffer[i])
                    }
                    this.sendBuffer = []
                };
                Socket.prototype.ondisconnect = function() {
                    debug("server disconnect (%s)", this.nsp);
                    this.destroy();
                    this.onclose("io server disconnect")
                };
                Socket.prototype.destroy = function() {
                    if (this.subs) {
                        for (var i = 0; i < this.subs.length; i++) {
                            this.subs[i].destroy()
                        }
                        this.subs = null
                    }
                    this.io.destroy(this)
                };
                Socket.prototype.close = Socket.prototype.disconnect = function() {
                    if (this.connected) {
                        debug("performing disconnect (%s)", this.nsp);
                        this.packet({
                            type: parser.DISCONNECT
                        })
                    }
                    this.destroy();
                    if (this.connected) {
                        this.onclose("io client disconnect")
                    }
                    return this
                }
            }, {
                "./on": 4,
                "component-bind": 8,
                "component-emitter": 9,
                debug: 10,
                "has-binary": 38,
                "socket.io-parser": 46,
                "to-array": 50
            }
        ],
        6: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var parseuri = _dereq_("parseuri");
                    var debug = _dereq_("debug")("socket.io-client:url");
                    module.exports = url;

                    function url(uri, loc) {
                        var obj = uri;
                        var loc = loc || global.location;
                        if (null == uri) uri = loc.protocol + "//" + loc.host;
                        if ("string" == typeof uri) {
                            if ("/" == uri.charAt(0)) {
                                if ("/" == uri.charAt(1)) {
                                    uri = loc.protocol + uri
                                } else {
                                    uri = loc.hostname + uri
                                }
                            }
                            if (!/^(https?|wss?):\/\//.test(uri)) {
                                debug("protocol-less url %s", uri);
                                if ("undefined" != typeof loc) {
                                    uri = loc.protocol + "//" + uri
                                } else {
                                    uri = "https://" + uri
                                }
                            }
                            debug("parse %s", uri);
                            obj = parseuri(uri)
                        }
                        if (!obj.port) {
                            if (/^(http|ws)$/.test(obj.protocol)) {
                                obj.port = "80"
                            } else if (/^(http|ws)s$/.test(obj.protocol)) {
                                obj.port = "443"
                            }
                        }
                        obj.path = obj.path || "/";
                        obj.id = obj.protocol + "://" + obj.host + ":" + obj.port;
                        obj.href = obj.protocol + "://" + obj.host + (loc && loc.port == obj.port ? "" : ":" + obj.port);
                        return obj
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                debug: 10,
                parseuri: 44
            }
        ],
        7: [
            function(_dereq_, module, exports) {
                module.exports = Backoff;

                function Backoff(opts) {
                    opts = opts || {};
                    this.ms = opts.min || 100;
                    this.max = opts.max || 1e4;
                    this.factor = opts.factor || 2;
                    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
                    this.attempts = 0
                }
                Backoff.prototype.duration = function() {
                    var ms = this.ms * Math.pow(this.factor, this.attempts++);
                    if (this.jitter) {
                        var rand = Math.random();
                        var deviation = Math.floor(rand * this.jitter * ms);
                        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation
                    }
                    return Math.min(ms, this.max) | 0
                };
                Backoff.prototype.reset = function() {
                    this.attempts = 0
                };
                Backoff.prototype.setMin = function(min) {
                    this.ms = min
                };
                Backoff.prototype.setMax = function(max) {
                    this.max = max
                };
                Backoff.prototype.setJitter = function(jitter) {
                    this.jitter = jitter
                }
            }, {}
        ],
        8: [
            function(_dereq_, module, exports) {
                var slice = [].slice;
                module.exports = function(obj, fn) {
                    if ("string" == typeof fn) fn = obj[fn];
                    if ("function" != typeof fn) throw new Error("bind() requires a function");
                    var args = slice.call(arguments, 2);
                    return function() {
                        return fn.apply(obj, args.concat(slice.call(arguments)))
                    }
                }
            }, {}
        ],
        9: [
            function(_dereq_, module, exports) {
                module.exports = Emitter;

                function Emitter(obj) {
                    if (obj) return mixin(obj)
                }

                function mixin(obj) {
                    for (var key in Emitter.prototype) {
                        obj[key] = Emitter.prototype[key]
                    }
                    return obj
                }
                Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
                    this._callbacks = this._callbacks || {};
                    (this._callbacks[event] = this._callbacks[event] || []).push(fn);
                    return this
                };
                Emitter.prototype.once = function(event, fn) {
                    var self = this;
                    this._callbacks = this._callbacks || {};

                    function on() {
                        self.off(event, on);
                        fn.apply(this, arguments)
                    }
                    on.fn = fn;
                    this.on(event, on);
                    return this
                };
                Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
                    this._callbacks = this._callbacks || {};
                    if (0 == arguments.length) {
                        this._callbacks = {};
                        return this
                    }
                    var callbacks = this._callbacks[event];
                    if (!callbacks) return this;
                    if (1 == arguments.length) {
                        delete this._callbacks[event];
                        return this
                    }
                    var cb;
                    for (var i = 0; i < callbacks.length; i++) {
                        cb = callbacks[i];
                        if (cb === fn || cb.fn === fn) {
                            callbacks.splice(i, 1);
                            break
                        }
                    }
                    return this
                };
                Emitter.prototype.emit = function(event) {
                    this._callbacks = this._callbacks || {};
                    var args = [].slice.call(arguments, 1),
                        callbacks = this._callbacks[event];
                    if (callbacks) {
                        callbacks = callbacks.slice(0);
                        for (var i = 0, len = callbacks.length; i < len; ++i) {
                            callbacks[i].apply(this, args)
                        }
                    }
                    return this
                };
                Emitter.prototype.listeners = function(event) {
                    this._callbacks = this._callbacks || {};
                    return this._callbacks[event] || []
                };
                Emitter.prototype.hasListeners = function(event) {
                    return !!this.listeners(event).length
                }
            }, {}
        ],
        10: [
            function(_dereq_, module, exports) {
                module.exports = debug;

                function debug(name) {
                    if (!debug.enabled(name)) return function() {};
                    return function(fmt) {
                        fmt = coerce(fmt);
                        var curr = new Date;
                        var ms = curr - (debug[name] || curr);
                        debug[name] = curr;
                        fmt = name + " " + fmt + " +" + debug.humanize(ms);
                        window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                    }
                }
                debug.names = [];
                debug.skips = [];
                debug.enable = function(name) {
                    try {
                        localStorage.debug = name
                    } catch (e) {}
                    var split = (name || "").split(/[\s,]+/),
                        len = split.length;
                    for (var i = 0; i < len; i++) {
                        name = split[i].replace("*", ".*?");
                        if (name[0] === "-") {
                            debug.skips.push(new RegExp("^" + name.substr(1) + "$"))
                        } else {
                            debug.names.push(new RegExp("^" + name + "$"))
                        }
                    }
                };
                debug.disable = function() {
                    debug.enable("")
                };
                debug.humanize = function(ms) {
                    var sec = 1e3,
                        min = 60 * 1e3,
                        hour = 60 * min;
                    if (ms >= hour) return (ms / hour).toFixed(1) + "h";
                    if (ms >= min) return (ms / min).toFixed(1) + "m";
                    if (ms >= sec) return (ms / sec | 0) + "s";
                    return ms + "ms"
                };
                debug.enabled = function(name) {
                    for (var i = 0, len = debug.skips.length; i < len; i++) {
                        if (debug.skips[i].test(name)) {
                            return false
                        }
                    }
                    for (var i = 0, len = debug.names.length; i < len; i++) {
                        if (debug.names[i].test(name)) {
                            return true
                        }
                    }
                    return false
                };

                function coerce(val) {
                    if (val instanceof Error) return val.stack || val.message;
                    return val
                }
                try {
                    if (window.localStorage) debug.enable(localStorage.debug)
                } catch (e) {}
            }, {}
        ],
        11: [
            function(_dereq_, module, exports) {
                module.exports = _dereq_("./lib/")
            }, {
                "./lib/": 12
            }
        ],
        12: [
            function(_dereq_, module, exports) {
                module.exports = _dereq_("./socket");
                module.exports.parser = _dereq_("engine.io-parser")
            }, {
                "./socket": 13,
                "engine.io-parser": 25
            }
        ],
        13: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var transports = _dereq_("./transports");
                    var Emitter = _dereq_("component-emitter");
                    var debug = _dereq_("debug")("engine.io-client:socket");
                    var index = _dereq_("indexof");
                    var parser = _dereq_("engine.io-parser");
                    var parseuri = _dereq_("parseuri");
                    var parsejson = _dereq_("parsejson");
                    var parseqs = _dereq_("parseqs");
                    module.exports = Socket;

                    function noop() {}

                    function Socket(uri, opts) {
                        if (!(this instanceof Socket)) return new Socket(uri, opts);
                        opts = opts || {};
                        if (uri && "object" == typeof uri) {
                            opts = uri;
                            uri = null
                        }
                        if (uri) {
                            uri = parseuri(uri);
                            opts.host = uri.host;
                            opts.secure = uri.protocol == "https" || uri.protocol == "wss";
                            opts.port = uri.port;
                            if (uri.query) opts.query = uri.query
                        }
                        this.secure = null != opts.secure ? opts.secure : global.location && "https:" == location.protocol;
                        if (opts.host) {
                            var pieces = opts.host.split(":");
                            opts.hostname = pieces.shift();
                            if (pieces.length) {
                                opts.port = pieces.pop()
                            } else if (!opts.port) {
                                opts.port = this.secure ? "443" : "80"
                            }
                        }
                        this.agent = opts.agent || false;
                        this.hostname = opts.hostname || (global.location ? location.hostname : "localhost");
                        this.port = opts.port || (global.location && location.port ? location.port : this.secure ? 443 : 80);
                        this.query = opts.query || {};
                        if ("string" == typeof this.query) this.query = parseqs.decode(this.query);
                        this.upgrade = false !== opts.upgrade;
                        this.path = (opts.path || "/engine.io").replace(/\/$/, "") + "/";
                        this.forceJSONP = !! opts.forceJSONP;
                        this.jsonp = false !== opts.jsonp;
                        this.forceBase64 = !! opts.forceBase64;
                        this.enablesXDR = !! opts.enablesXDR;
                        this.timestampParam = opts.timestampParam || "t";
                        this.timestampRequests = opts.timestampRequests;
                        this.transports = opts.transports || ["polling", "websocket"];
                        this.readyState = "";
                        this.writeBuffer = [];
                        this.callbackBuffer = [];
                        this.policyPort = opts.policyPort || 843;
                        this.rememberUpgrade = opts.rememberUpgrade || false;
                        this.binaryType = null;
                        this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
                        this.pfx = opts.pfx || null;
                        this.key = opts.key || null;
                        this.passphrase = opts.passphrase || null;
                        this.cert = opts.cert || null;
                        this.ca = opts.ca || null;
                        this.ciphers = opts.ciphers || null;
                        this.rejectUnauthorized = opts.rejectUnauthorized || null;
                        this.open()
                    }
                    Socket.priorWebsocketSuccess = false;
                    Emitter(Socket.prototype);
                    Socket.protocol = parser.protocol;
                    Socket.Socket = Socket;
                    Socket.Transport = _dereq_("./transport");
                    Socket.transports = _dereq_("./transports");
                    Socket.parser = _dereq_("engine.io-parser");
                    Socket.prototype.createTransport = function(name) {
                        debug('creating transport "%s"', name);
                        var query = clone(this.query);
                        query.EIO = parser.protocol;
                        query.transport = name;
                        if (this.id) query.sid = this.id;
                        var transport = new transports[name]({
                            agent: this.agent,
                            hostname: this.hostname,
                            port: this.port,
                            secure: this.secure,
                            path: this.path,
                            query: query,
                            forceJSONP: this.forceJSONP,
                            jsonp: this.jsonp,
                            forceBase64: this.forceBase64,
                            enablesXDR: this.enablesXDR,
                            timestampRequests: this.timestampRequests,
                            timestampParam: this.timestampParam,
                            policyPort: this.policyPort,
                            socket: this,
                            pfx: this.pfx,
                            key: this.key,
                            passphrase: this.passphrase,
                            cert: this.cert,
                            ca: this.ca,
                            ciphers: this.ciphers,
                            rejectUnauthorized: this.rejectUnauthorized
                        });
                        return transport
                    };

                    function clone(obj) {
                        var o = {};
                        for (var i in obj) {
                            if (obj.hasOwnProperty(i)) {
                                o[i] = obj[i]
                            }
                        }
                        return o
                    }
                    Socket.prototype.open = function() {
                        var transport;
                        if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") != -1) {
                            transport = "websocket"
                        } else if (0 == this.transports.length) {
                            var self = this;
                            setTimeout(function() {
                                self.emit("error", "No transports available")
                            }, 0);
                            return
                        } else {
                            transport = this.transports[0]
                        }
                        this.readyState = "opening";
                        var transport;
                        try {
                            transport = this.createTransport(transport)
                        } catch (e) {
                            this.transports.shift();
                            this.open();
                            return
                        }
                        transport.open();
                        this.setTransport(transport)
                    };
                    Socket.prototype.setTransport = function(transport) {
                        debug("setting transport %s", transport.name);
                        var self = this;
                        if (this.transport) {
                            debug("clearing existing transport %s", this.transport.name);
                            this.transport.removeAllListeners()
                        }
                        this.transport = transport;
                        transport.on("drain", function() {
                            self.onDrain()
                        }).on("packet", function(packet) {
                            self.onPacket(packet)
                        }).on("error", function(e) {
                            self.onError(e)
                        }).on("close", function() {
                            self.onClose("transport close")
                        })
                    };
                    Socket.prototype.probe = function(name) {
                        debug('probing transport "%s"', name);
                        var transport = this.createTransport(name, {
                            probe: 1
                        }),
                            failed = false,
                            self = this;
                        Socket.priorWebsocketSuccess = false;

                        function onTransportOpen() {
                            if (self.onlyBinaryUpgrades) {
                                var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
                                failed = failed || upgradeLosesBinary
                            }
                            if (failed) return;
                            debug('probe transport "%s" opened', name);
                            transport.send([{
                                type: "ping",
                                data: "probe"
                            }]);
                            transport.once("packet", function(msg) {
                                if (failed) return;
                                if ("pong" == msg.type && "probe" == msg.data) {
                                    debug('probe transport "%s" pong', name);
                                    self.upgrading = true;
                                    self.emit("upgrading", transport);
                                    if (!transport) return;
                                    Socket.priorWebsocketSuccess = "websocket" == transport.name;
                                    debug('pausing current transport "%s"', self.transport.name);
                                    self.transport.pause(function() {
                                        if (failed) return;
                                        if ("closed" == self.readyState) return;
                                        debug("changing transport and sending upgrade packet");
                                        cleanup();
                                        self.setTransport(transport);
                                        transport.send([{
                                            type: "upgrade"
                                        }]);
                                        self.emit("upgrade", transport);
                                        transport = null;
                                        self.upgrading = false;
                                        self.flush()
                                    })
                                } else {
                                    debug('probe transport "%s" failed', name);
                                    var err = new Error("probe error");
                                    err.transport = transport.name;
                                    self.emit("upgradeError", err)
                                }
                            })
                        }

                        function freezeTransport() {
                            if (failed) return;
                            failed = true;
                            cleanup();
                            transport.close();
                            transport = null
                        }

                        function onerror(err) {
                            var error = new Error("probe error: " + err);
                            error.transport = transport.name;
                            freezeTransport();
                            debug('probe transport "%s" failed because of error: %s', name, err);
                            self.emit("upgradeError", error)
                        }

                        function onTransportClose() {
                            onerror("transport closed")
                        }

                        function onclose() {
                            onerror("socket closed")
                        }

                        function onupgrade(to) {
                            if (transport && to.name != transport.name) {
                                debug('"%s" works - aborting "%s"', to.name, transport.name);
                                freezeTransport()
                            }
                        }

                        function cleanup() {
                            transport.removeListener("open", onTransportOpen);
                            transport.removeListener("error", onerror);
                            transport.removeListener("close", onTransportClose);
                            self.removeListener("close", onclose);
                            self.removeListener("upgrading", onupgrade)
                        }
                        transport.once("open", onTransportOpen);
                        transport.once("error", onerror);
                        transport.once("close", onTransportClose);
                        this.once("close", onclose);
                        this.once("upgrading", onupgrade);
                        transport.open()
                    };
                    Socket.prototype.onOpen = function() {
                        debug("socket open");
                        this.readyState = "open";
                        Socket.priorWebsocketSuccess = "websocket" == this.transport.name;
                        this.emit("open");
                        this.flush();
                        if ("open" == this.readyState && this.upgrade && this.transport.pause) {
                            debug("starting upgrade probes");
                            for (var i = 0, l = this.upgrades.length; i < l; i++) {
                                this.probe(this.upgrades[i])
                            }
                        }
                    };
                    Socket.prototype.onPacket = function(packet) {
                        if ("opening" == this.readyState || "open" == this.readyState) {
                            debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
                            this.emit("packet", packet);
                            this.emit("heartbeat");
                            switch (packet.type) {
                                case "open":
                                    this.onHandshake(parsejson(packet.data));
                                    break;
                                case "pong":
                                    this.setPing();
                                    break;
                                case "error":
                                    var err = new Error("server error");
                                    err.code = packet.data;
                                    this.emit("error", err);
                                    break;
                                case "message":
                                    this.emit("data", packet.data);
                                    this.emit("message", packet.data);
                                    break
                            }
                        } else {
                            debug('packet received with socket readyState "%s"', this.readyState)
                        }
                    };
                    Socket.prototype.onHandshake = function(data) {
                        this.emit("handshake", data);
                        this.id = data.sid;
                        this.transport.query.sid = data.sid;
                        this.upgrades = this.filterUpgrades(data.upgrades);
                        this.pingInterval = data.pingInterval;
                        this.pingTimeout = data.pingTimeout;
                        this.onOpen();
                        if ("closed" == this.readyState) return;
                        this.setPing();
                        this.removeListener("heartbeat", this.onHeartbeat);
                        this.on("heartbeat", this.onHeartbeat)
                    };
                    Socket.prototype.onHeartbeat = function(timeout) {
                        clearTimeout(this.pingTimeoutTimer);
                        var self = this;
                        self.pingTimeoutTimer = setTimeout(function() {
                            if ("closed" == self.readyState) return;
                            self.onClose("ping timeout")
                        }, timeout || self.pingInterval + self.pingTimeout)
                    };
                    Socket.prototype.setPing = function() {
                        var self = this;
                        clearTimeout(self.pingIntervalTimer);
                        self.pingIntervalTimer = setTimeout(function() {
                            debug("writing ping packet - expecting pong within %sms", self.pingTimeout);
                            self.ping();
                            self.onHeartbeat(self.pingTimeout)
                        }, self.pingInterval)
                    };
                    Socket.prototype.ping = function() {
                        this.sendPacket("ping")
                    };
                    Socket.prototype.onDrain = function() {
                        for (var i = 0; i < this.prevBufferLen; i++) {
                            if (this.callbackBuffer[i]) {
                                this.callbackBuffer[i]()
                            }
                        }
                        this.writeBuffer.splice(0, this.prevBufferLen);
                        this.callbackBuffer.splice(0, this.prevBufferLen);
                        this.prevBufferLen = 0;
                        if (this.writeBuffer.length == 0) {
                            this.emit("drain")
                        } else {
                            this.flush()
                        }
                    };
                    Socket.prototype.flush = function() {
                        if ("closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
                            debug("flushing %d packets in socket", this.writeBuffer.length);
                            this.transport.send(this.writeBuffer);
                            this.prevBufferLen = this.writeBuffer.length;
                            this.emit("flush")
                        }
                    };
                    Socket.prototype.write = Socket.prototype.send = function(msg, fn) {
                        this.sendPacket("message", msg, fn);
                        return this
                    };
                    Socket.prototype.sendPacket = function(type, data, fn) {
                        if ("closing" == this.readyState || "closed" == this.readyState) {
                            return
                        }
                        var packet = {
                            type: type,
                            data: data
                        };
                        this.emit("packetCreate", packet);
                        this.writeBuffer.push(packet);
                        this.callbackBuffer.push(fn);
                        this.flush()
                    };
                    Socket.prototype.close = function() {
                        if ("opening" == this.readyState || "open" == this.readyState) {
                            this.readyState = "closing";
                            var self = this;

                            function close() {
                                self.onClose("forced close");
                                debug("socket closing - telling transport to close");
                                self.transport.close()
                            }

                            function cleanupAndClose() {
                                self.removeListener("upgrade", cleanupAndClose);
                                self.removeListener("upgradeError", cleanupAndClose);
                                close()
                            }

                            function waitForUpgrade() {
                                self.once("upgrade", cleanupAndClose);
                                self.once("upgradeError", cleanupAndClose)
                            }
                            if (this.writeBuffer.length) {
                                this.once("drain", function() {
                                    if (this.upgrading) {
                                        waitForUpgrade()
                                    } else {
                                        close()
                                    }
                                })
                            } else if (this.upgrading) {
                                waitForUpgrade()
                            } else {
                                close()
                            }
                        }
                        return this
                    };
                    Socket.prototype.onError = function(err) {
                        debug("socket error %j", err);
                        Socket.priorWebsocketSuccess = false;
                        this.emit("error", err);
                        this.onClose("transport error", err)
                    };
                    Socket.prototype.onClose = function(reason, desc) {
                        if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                            debug('socket close with reason: "%s"', reason);
                            var self = this;
                            clearTimeout(this.pingIntervalTimer);
                            clearTimeout(this.pingTimeoutTimer);
                            setTimeout(function() {
                                self.writeBuffer = [];
                                self.callbackBuffer = [];
                                self.prevBufferLen = 0
                            }, 0);
                            this.transport.removeAllListeners("close");
                            this.transport.close();
                            this.transport.removeAllListeners();
                            this.readyState = "closed";
                            this.id = null;
                            this.emit("close", reason, desc)
                        }
                    };
                    Socket.prototype.filterUpgrades = function(upgrades) {
                        var filteredUpgrades = [];
                        for (var i = 0, j = upgrades.length; i < j; i++) {
                            if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i])
                        }
                        return filteredUpgrades
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                "./transport": 14,
                "./transports": 15,
                "component-emitter": 9,
                debug: 22,
                "engine.io-parser": 25,
                indexof: 42,
                parsejson: 34,
                parseqs: 35,
                parseuri: 36
            }
        ],
        14: [
            function(_dereq_, module, exports) {
                var parser = _dereq_("engine.io-parser");
                var Emitter = _dereq_("component-emitter");
                module.exports = Transport;

                function Transport(opts) {
                    this.path = opts.path;
                    this.hostname = opts.hostname;
                    this.port = opts.port;
                    this.secure = opts.secure;
                    this.query = opts.query;
                    this.timestampParam = opts.timestampParam;
                    this.timestampRequests = opts.timestampRequests;
                    this.readyState = "";
                    this.agent = opts.agent || false;
                    this.socket = opts.socket;
                    this.enablesXDR = opts.enablesXDR;
                    this.pfx = opts.pfx;
                    this.key = opts.key;
                    this.passphrase = opts.passphrase;
                    this.cert = opts.cert;
                    this.ca = opts.ca;
                    this.ciphers = opts.ciphers;
                    this.rejectUnauthorized = opts.rejectUnauthorized
                }
                Emitter(Transport.prototype);
                Transport.timestamps = 0;
                Transport.prototype.onError = function(msg, desc) {
                    var err = new Error(msg);
                    err.type = "TransportError";
                    err.description = desc;
                    this.emit("error", err);
                    return this
                };
                Transport.prototype.open = function() {
                    if ("closed" == this.readyState || "" == this.readyState) {
                        this.readyState = "opening";
                        this.doOpen()
                    }
                    return this
                };
                Transport.prototype.close = function() {
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.doClose();
                        this.onClose()
                    }
                    return this
                };
                Transport.prototype.send = function(packets) {
                    if ("open" == this.readyState) {
                        this.write(packets)
                    } else {
                        throw new Error("Transport not open")
                    }
                };
                Transport.prototype.onOpen = function() {
                    this.readyState = "open";
                    this.writable = true;
                    this.emit("open")
                };
                Transport.prototype.onData = function(data) {
                    var packet = parser.decodePacket(data, this.socket.binaryType);
                    this.onPacket(packet)
                };
                Transport.prototype.onPacket = function(packet) {
                    this.emit("packet", packet)
                };
                Transport.prototype.onClose = function() {
                    this.readyState = "closed";
                    this.emit("close")
                }
            }, {
                "component-emitter": 9,
                "engine.io-parser": 25
            }
        ],
        15: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var XMLHttpRequest = _dereq_("xmlhttprequest");
                    var XHR = _dereq_("./polling-xhr");
                    var JSONP = _dereq_("./polling-jsonp");
                    var websocket = _dereq_("./websocket");
                    exports.polling = polling;
                    exports.websocket = websocket;

                    function polling(opts) {
                        var xhr;
                        var xd = false;
                        var xs = false;
                        var jsonp = false !== opts.jsonp;
                        if (global.location) {
                            var isSSL = "https:" == location.protocol;
                            var port = location.port;
                            if (!port) {
                                port = isSSL ? 443 : 80
                            }
                            xd = opts.hostname != location.hostname || port != opts.port;
                            xs = opts.secure != isSSL
                        }
                        opts.xdomain = xd;
                        opts.xscheme = xs;
                        xhr = new XMLHttpRequest(opts);
                        if ("open" in xhr && !opts.forceJSONP) {
                            return new XHR(opts)
                        } else {
                            if (!jsonp) throw new Error("JSONP disabled");
                            return new JSONP(opts)
                        }
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                "./polling-jsonp": 16,
                "./polling-xhr": 17,
                "./websocket": 19,
                xmlhttprequest: 20
            }
        ],
        16: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var Polling = _dereq_("./polling");
                    var inherit = _dereq_("component-inherit");
                    module.exports = JSONPPolling;
                    var rNewline = /\n/g;
                    var rEscapedNewline = /\\n/g;
                    var callbacks;
                    var index = 0;

                    function empty() {}

                    function JSONPPolling(opts) {
                        Polling.call(this, opts);
                        this.query = this.query || {};
                        if (!callbacks) {
                            if (!global.___eio) global.___eio = [];
                            callbacks = global.___eio
                        }
                        this.index = callbacks.length;
                        var self = this;
                        callbacks.push(function(msg) {
                            self.onData(msg)
                        });
                        this.query.j = this.index;
                        if (global.document && global.addEventListener) {
                            global.addEventListener("beforeunload", function() {
                                if (self.script) self.script.onerror = empty
                            }, false)
                        }
                    }
                    inherit(JSONPPolling, Polling);
                    JSONPPolling.prototype.supportsBinary = false;
                    JSONPPolling.prototype.doClose = function() {
                        if (this.script) {
                            this.script.parentNode.removeChild(this.script);
                            this.script = null
                        }
                        if (this.form) {
                            this.form.parentNode.removeChild(this.form);
                            this.form = null;
                            this.iframe = null
                        }
                        Polling.prototype.doClose.call(this)
                    };
                    JSONPPolling.prototype.doPoll = function() {
                        var self = this;
                        var script = document.createElement("script");
                        if (this.script) {
                            this.script.parentNode.removeChild(this.script);
                            this.script = null
                        }
                        script.async = true;
                        script.src = this.uri();
                        script.onerror = function(e) {
                            self.onError("jsonp poll error", e)
                        };
                        var insertAt = document.getElementsByTagName("script")[0];
                        insertAt.parentNode.insertBefore(script, insertAt);
                        this.script = script;
                        var isUAgecko = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                        if (isUAgecko) {
                            setTimeout(function() {
                                var iframe = document.createElement("iframe");
                                document.body.appendChild(iframe);
                                document.body.removeChild(iframe)
                            }, 100)
                        }
                    };
                    JSONPPolling.prototype.doWrite = function(data, fn) {
                        var self = this;
                        if (!this.form) {
                            var form = document.createElement("form");
                            var area = document.createElement("textarea");
                            var id = this.iframeId = "eio_iframe_" + this.index;
                            var iframe;
                            form.className = "socketio";
                            form.style.position = "absolute";
                            form.style.top = "-1000px";
                            form.style.left = "-1000px";
                            form.target = id;
                            form.method = "POST";
                            form.setAttribute("accept-charset", "utf-8");
                            area.name = "d";
                            form.appendChild(area);
                            document.body.appendChild(form);
                            this.form = form;
                            this.area = area
                        }
                        this.form.action = this.uri();

                        function complete() {
                            initIframe();
                            fn()
                        }

                        function initIframe() {
                            if (self.iframe) {
                                try {
                                    self.form.removeChild(self.iframe)
                                } catch (e) {
                                    self.onError("jsonp polling iframe removal error", e)
                                }
                            }
                            try {
                                var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
                                iframe = document.createElement(html)
                            } catch (e) {
                                iframe = document.createElement("iframe");
                                iframe.name = self.iframeId;
                                iframe.src = "javascript:0"
                            }
                            iframe.id = self.iframeId;
                            self.form.appendChild(iframe);
                            self.iframe = iframe
                        }
                        initIframe();
                        data = data.replace(rEscapedNewline, "\\\n");
                        this.area.value = data.replace(rNewline, "\\n");
                        try {
                            this.form.submit()
                        } catch (e) {}
                        if (this.iframe.attachEvent) {
                            this.iframe.onreadystatechange = function() {
                                if (self.iframe.readyState == "complete") {
                                    complete()
                                }
                            }
                        } else {
                            this.iframe.onload = complete
                        }
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                "./polling": 18,
                "component-inherit": 21
            }
        ],
        17: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var XMLHttpRequest = _dereq_("xmlhttprequest");
                    var Polling = _dereq_("./polling");
                    var Emitter = _dereq_("component-emitter");
                    var inherit = _dereq_("component-inherit");
                    var debug = _dereq_("debug")("engine.io-client:polling-xhr");
                    module.exports = XHR;
                    module.exports.Request = Request;

                    function empty() {}

                    function XHR(opts) {
                        Polling.call(this, opts);
                        if (global.location) {
                            var isSSL = "https:" == location.protocol;
                            var port = location.port;
                            if (!port) {
                                port = isSSL ? 443 : 80
                            }
                            this.xd = opts.hostname != global.location.hostname || port != opts.port;
                            this.xs = opts.secure != isSSL
                        }
                    }
                    inherit(XHR, Polling);
                    XHR.prototype.supportsBinary = true;
                    XHR.prototype.request = function(opts) {
                        opts = opts || {};
                        opts.uri = this.uri();
                        opts.xd = this.xd;
                        opts.xs = this.xs;
                        opts.agent = this.agent || false;
                        opts.supportsBinary = this.supportsBinary;
                        opts.enablesXDR = this.enablesXDR;
                        opts.pfx = this.pfx;
                        opts.key = this.key;
                        opts.passphrase = this.passphrase;
                        opts.cert = this.cert;
                        opts.ca = this.ca;
                        opts.ciphers = this.ciphers;
                        opts.rejectUnauthorized = this.rejectUnauthorized;
                        return new Request(opts)
                    };
                    XHR.prototype.doWrite = function(data, fn) {
                        var isBinary = typeof data !== "string" && data !== undefined;
                        var req = this.request({
                            method: "POST",
                            data: data,
                            isBinary: isBinary
                        });
                        var self = this;
                        req.on("success", fn);
                        req.on("error", function(err) {
                            self.onError("xhr post error", err)
                        });
                        this.sendXhr = req
                    };
                    XHR.prototype.doPoll = function() {
                        debug("xhr poll");
                        var req = this.request();
                        var self = this;
                        req.on("data", function(data) {
                            self.onData(data)
                        });
                        req.on("error", function(err) {
                            self.onError("xhr poll error", err)
                        });
                        this.pollXhr = req
                    };

                    function Request(opts) {
                        this.method = opts.method || "GET";
                        this.uri = opts.uri;
                        this.xd = !! opts.xd;
                        this.xs = !! opts.xs;
                        this.async = false !== opts.async;
                        this.data = undefined != opts.data ? opts.data : null;
                        this.agent = opts.agent;
                        this.isBinary = opts.isBinary;
                        this.supportsBinary = opts.supportsBinary;
                        this.enablesXDR = opts.enablesXDR;
                        this.pfx = opts.pfx;
                        this.key = opts.key;
                        this.passphrase = opts.passphrase;
                        this.cert = opts.cert;
                        this.ca = opts.ca;
                        this.ciphers = opts.ciphers;
                        this.rejectUnauthorized = opts.rejectUnauthorized;
                        this.create()
                    }
                    Emitter(Request.prototype);
                    Request.prototype.create = function() {
                        var opts = {
                            agent: this.agent,
                            xdomain: this.xd,
                            xscheme: this.xs,
                            enablesXDR: this.enablesXDR
                        };
                        opts.pfx = this.pfx;
                        opts.key = this.key;
                        opts.passphrase = this.passphrase;
                        opts.cert = this.cert;
                        opts.ca = this.ca;
                        opts.ciphers = this.ciphers;
                        opts.rejectUnauthorized = this.rejectUnauthorized;
                        var xhr = this.xhr = new XMLHttpRequest(opts);
                        var self = this;
                        try {
                            debug("xhr open %s: %s", this.method, this.uri);
                            xhr.open(this.method, this.uri, this.async);
                            if (this.supportsBinary) {
                                xhr.responseType = "arraybuffer"
                            }
                            if ("POST" == this.method) {
                                try {
                                    if (this.isBinary) {
                                        xhr.setRequestHeader("Content-type", "application/octet-stream")
                                    } else {
                                        xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                                    }
                                } catch (e) {}
                            }
                            if ("withCredentials" in xhr) {
                                xhr.withCredentials = true
                            }
                            if (this.hasXDR()) {
                                xhr.onload = function() {
                                    self.onLoad()
                                };
                                xhr.onerror = function() {
                                    self.onError(xhr.responseText)
                                }
                            } else {
                                xhr.onreadystatechange = function() {
                                    if (4 != xhr.readyState) return;
                                    if (200 == xhr.status || 1223 == xhr.status) {
                                        self.onLoad()
                                    } else {
                                        setTimeout(function() {
                                            self.onError(xhr.status)
                                        }, 0)
                                    }
                                }
                            }
                            debug("xhr data %s", this.data);
                            xhr.send(this.data)
                        } catch (e) {
                            setTimeout(function() {
                                self.onError(e)
                            }, 0);
                            return
                        }
                        if (global.document) {
                            this.index = Request.requestsCount++;
                            Request.requests[this.index] = this
                        }
                    };
                    Request.prototype.onSuccess = function() {
                        this.emit("success");
                        this.cleanup()
                    };
                    Request.prototype.onData = function(data) {
                        this.emit("data", data);
                        this.onSuccess()
                    };
                    Request.prototype.onError = function(err) {
                        this.emit("error", err);
                        this.cleanup(true)
                    };
                    Request.prototype.cleanup = function(fromError) {
                        if ("undefined" == typeof this.xhr || null === this.xhr) {
                            return
                        }
                        if (this.hasXDR()) {
                            this.xhr.onload = this.xhr.onerror = empty
                        } else {
                            this.xhr.onreadystatechange = empty
                        } if (fromError) {
                            try {
                                this.xhr.abort()
                            } catch (e) {}
                        }
                        if (global.document) {
                            delete Request.requests[this.index]
                        }
                        this.xhr = null
                    };
                    Request.prototype.onLoad = function() {
                        var data;
                        try {
                            var contentType;
                            try {
                                contentType = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                            } catch (e) {}
                            if (contentType === "application/octet-stream") {
                                data = this.xhr.response
                            } else {
                                if (!this.supportsBinary) {
                                    data = this.xhr.responseText
                                } else {
                                    data = "ok"
                                }
                            }
                        } catch (e) {
                            this.onError(e)
                        }
                        if (null != data) {
                            this.onData(data)
                        }
                    };
                    Request.prototype.hasXDR = function() {
                        return "undefined" !== typeof global.XDomainRequest && !this.xs && this.enablesXDR
                    };
                    Request.prototype.abort = function() {
                        this.cleanup()
                    };
                    if (global.document) {
                        Request.requestsCount = 0;
                        Request.requests = {};
                        if (global.attachEvent) {
                            global.attachEvent("onunload", unloadHandler)
                        } else if (global.addEventListener) {
                            global.addEventListener("beforeunload", unloadHandler, false)
                        }
                    }

                    function unloadHandler() {
                        for (var i in Request.requests) {
                            if (Request.requests.hasOwnProperty(i)) {
                                Request.requests[i].abort()
                            }
                        }
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                "./polling": 18,
                "component-emitter": 9,
                "component-inherit": 21,
                debug: 22,
                xmlhttprequest: 20
            }
        ],
        18: [
            function(_dereq_, module, exports) {
                var Transport = _dereq_("../transport");
                var parseqs = _dereq_("parseqs");
                var parser = _dereq_("engine.io-parser");
                var inherit = _dereq_("component-inherit");
                var debug = _dereq_("debug")("engine.io-client:polling");
                module.exports = Polling;
                var hasXHR2 = function() {
                    var XMLHttpRequest = _dereq_("xmlhttprequest");
                    var xhr = new XMLHttpRequest({
                        xdomain: false
                    });
                    return null != xhr.responseType
                }();

                function Polling(opts) {
                    var forceBase64 = opts && opts.forceBase64;
                    if (!hasXHR2 || forceBase64) {
                        this.supportsBinary = false
                    }
                    Transport.call(this, opts)
                }
                inherit(Polling, Transport);
                Polling.prototype.name = "polling";
                Polling.prototype.doOpen = function() {
                    this.poll()
                };
                Polling.prototype.pause = function(onPause) {
                    var pending = 0;
                    var self = this;
                    this.readyState = "pausing";

                    function pause() {
                        debug("paused");
                        self.readyState = "paused";
                        onPause()
                    }
                    if (this.polling || !this.writable) {
                        var total = 0;
                        if (this.polling) {
                            debug("we are currently polling - waiting to pause");
                            total++;
                            this.once("pollComplete", function() {
                                debug("pre-pause polling complete");
                                --total || pause()
                            })
                        }
                        if (!this.writable) {
                            debug("we are currently writing - waiting to pause");
                            total++;
                            this.once("drain", function() {
                                debug("pre-pause writing complete");
                                --total || pause()
                            })
                        }
                    } else {
                        pause()
                    }
                };
                Polling.prototype.poll = function() {
                    debug("polling");
                    this.polling = true;
                    this.doPoll();
                    this.emit("poll")
                };
                Polling.prototype.onData = function(data) {
                    var self = this;
                    debug("polling got data %s", data);
                    var callback = function(packet, index, total) {
                        if ("opening" == self.readyState) {
                            self.onOpen()
                        }
                        if ("close" == packet.type) {
                            self.onClose();
                            return false
                        }
                        self.onPacket(packet)
                    };
                    parser.decodePayload(data, this.socket.binaryType, callback);
                    if ("closed" != this.readyState) {
                        this.polling = false;
                        this.emit("pollComplete");
                        if ("open" == this.readyState) {
                            this.poll()
                        } else {
                            debug('ignoring poll - transport state "%s"', this.readyState)
                        }
                    }
                };
                Polling.prototype.doClose = function() {
                    var self = this;

                    function close() {
                        debug("writing close packet");
                        self.write([{
                            type: "close"
                        }])
                    }
                    if ("open" == this.readyState) {
                        debug("transport open - closing");
                        close()
                    } else {
                        debug("transport not open - deferring close");
                        this.once("open", close)
                    }
                };
                Polling.prototype.write = function(packets) {
                    var self = this;
                    this.writable = false;
                    var callbackfn = function() {
                        self.writable = true;
                        self.emit("drain")
                    };
                    var self = this;
                    parser.encodePayload(packets, this.supportsBinary, function(data) {
                        self.doWrite(data, callbackfn)
                    })
                };
                Polling.prototype.uri = function() {
                    var query = this.query || {};
                    var schema = this.secure ? "https" : "http";
                    var port = "";
                    if (false !== this.timestampRequests) {
                        query[this.timestampParam] = +new Date + "-" + Transport.timestamps++
                    }
                    if (!this.supportsBinary && !query.sid) {
                        query.b64 = 1
                    }
                    query = parseqs.encode(query);
                    if (this.port && ("https" == schema && this.port != 443 || "http" == schema && this.port != 80)) {
                        port = ":" + this.port
                    }
                    if (query.length) {
                        query = "?" + query
                    }
                    return schema + "://" + this.hostname + port + this.path + query
                }
            }, {
                "../transport": 14,
                "component-inherit": 21,
                debug: 22,
                "engine.io-parser": 25,
                parseqs: 35,
                xmlhttprequest: 20
            }
        ],
        19: [
            function(_dereq_, module, exports) {
                var Transport = _dereq_("../transport");
                var parser = _dereq_("engine.io-parser");
                var parseqs = _dereq_("parseqs");
                var inherit = _dereq_("component-inherit");
                var debug = _dereq_("debug")("engine.io-client:websocket");
                var WebSocket = _dereq_("ws");
                module.exports = WS;

                function WS(opts) {
                    var forceBase64 = opts && opts.forceBase64;
                    if (forceBase64) {
                        this.supportsBinary = false
                    }
                    Transport.call(this, opts)
                }
                inherit(WS, Transport);
                WS.prototype.name = "websocket";
                WS.prototype.supportsBinary = true;
                WS.prototype.doOpen = function() {
                    if (!this.check()) {
                        return
                    }
                    var self = this;
                    var uri = this.uri();
                    var protocols = void 0;
                    var opts = {
                        agent: this.agent
                    };
                    opts.pfx = this.pfx;
                    opts.key = this.key;
                    opts.passphrase = this.passphrase;
                    opts.cert = this.cert;
                    opts.ca = this.ca;
                    opts.ciphers = this.ciphers;
                    opts.rejectUnauthorized = this.rejectUnauthorized;
                    this.ws = new WebSocket(uri, protocols, opts);
                    if (this.ws.binaryType === undefined) {
                        this.supportsBinary = false
                    }
                    this.ws.binaryType = "arraybuffer";
                    this.addEventListeners()
                };
                WS.prototype.addEventListeners = function() {
                    var self = this;
                    this.ws.onopen = function() {
                        self.onOpen()
                    };
                    this.ws.onclose = function() {
                        self.onClose()
                    };
                    this.ws.onmessage = function(ev) {
                        self.onData(ev.data)
                    };
                    this.ws.onerror = function(e) {
                        self.onError("websocket error", e)
                    }
                };
                if ("undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
                    WS.prototype.onData = function(data) {
                        var self = this;
                        setTimeout(function() {
                            Transport.prototype.onData.call(self, data)
                        }, 0)
                    }
                }
                WS.prototype.write = function(packets) {
                    var self = this;
                    this.writable = false;
                    for (var i = 0, l = packets.length; i < l; i++) {
                        parser.encodePacket(packets[i], this.supportsBinary, function(data) {
                            try {
                                self.ws.send(data)
                            } catch (e) {
                                debug("websocket closed before onclose event")
                            }
                        })
                    }

                    function ondrain() {
                        self.writable = true;
                        self.emit("drain")
                    }
                    setTimeout(ondrain, 0)
                };
                WS.prototype.onClose = function() {
                    Transport.prototype.onClose.call(this)
                };
                WS.prototype.doClose = function() {
                    if (typeof this.ws !== "undefined") {
                        this.ws.close()
                    }
                };
                WS.prototype.uri = function() {
                    var query = this.query || {};
                    var schema = this.secure ? "wss" : "ws";
                    var port = "";
                    if (this.port && ("wss" == schema && this.port != 443 || "ws" == schema && this.port != 80)) {
                        port = ":" + this.port
                    }
                    if (this.timestampRequests) {
                        query[this.timestampParam] = +new Date
                    }
                    if (!this.supportsBinary) {
                        query.b64 = 1
                    }
                    query = parseqs.encode(query);
                    if (query.length) {
                        query = "?" + query
                    }
                    return schema + "://" + this.hostname + port + this.path + query
                };
                WS.prototype.check = function() {
                    return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name)
                }
            }, {
                "../transport": 14,
                "component-inherit": 21,
                debug: 22,
                "engine.io-parser": 25,
                parseqs: 35,
                ws: 37
            }
        ],
        20: [
            function(_dereq_, module, exports) {
                var hasCORS = _dereq_("has-cors");
                module.exports = function(opts) {
                    var xdomain = opts.xdomain;
                    var xscheme = opts.xscheme;
                    var enablesXDR = opts.enablesXDR;
                    try {
                        if ("undefined" != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
                            return new XMLHttpRequest
                        }
                    } catch (e) {}
                    try {
                        if ("undefined" != typeof XDomainRequest && !xscheme && enablesXDR) {
                            return new XDomainRequest
                        }
                    } catch (e) {}
                    if (!xdomain) {
                        try {
                            return new ActiveXObject("Microsoft.XMLHTTP")
                        } catch (e) {}
                    }
                }
            }, {
                "has-cors": 40
            }
        ],
        21: [
            function(_dereq_, module, exports) {
                module.exports = function(a, b) {
                    var fn = function() {};
                    fn.prototype = b.prototype;
                    a.prototype = new fn;
                    a.prototype.constructor = a
                }
            }, {}
        ],
        22: [
            function(_dereq_, module, exports) {
                exports = module.exports = _dereq_("./debug");
                exports.log = log;
                exports.formatArgs = formatArgs;
                exports.save = save;
                exports.load = load;
                exports.useColors = useColors;
                exports.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];

                function useColors() {
                    return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
                }
                exports.formatters.j = function(v) {
                    return JSON.stringify(v)
                };

                function formatArgs() {
                    var args = arguments;
                    var useColors = this.useColors;
                    args[0] = (useColors ? "%c" : "") + this.namespace + (useColors ? " %c" : " ") + args[0] + (useColors ? "%c " : " ") + "+" + exports.humanize(this.diff);
                    if (!useColors) return args;
                    var c = "color: " + this.color;
                    args = [args[0], c, "color: inherit"].concat(Array.prototype.slice.call(args, 1));
                    var index = 0;
                    var lastC = 0;
                    args[0].replace(/%[a-z%]/g, function(match) {
                        if ("%" === match) return;
                        index++;
                        if ("%c" === match) {
                            lastC = index
                        }
                    });
                    args.splice(lastC, 0, c);
                    return args
                }

                function log() {
                    return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
                }

                function save(namespaces) {
                    try {
                        if (null == namespaces) {
                            localStorage.removeItem("debug")
                        } else {
                            localStorage.debug = namespaces
                        }
                    } catch (e) {}
                }

                function load() {
                    var r;
                    try {
                        r = localStorage.debug
                    } catch (e) {}
                    return r
                }
                exports.enable(load())
            }, {
                "./debug": 23
            }
        ],
        23: [
            function(_dereq_, module, exports) {
                exports = module.exports = debug;
                exports.coerce = coerce;
                exports.disable = disable;
                exports.enable = enable;
                exports.enabled = enabled;
                exports.humanize = _dereq_("ms");
                exports.names = [];
                exports.skips = [];
                exports.formatters = {};
                var prevColor = 0;
                var prevTime;

                function selectColor() {
                    return exports.colors[prevColor++ % exports.colors.length]
                }

                function debug(namespace) {
                    function disabled() {}
                    disabled.enabled = false;

                    function enabled() {
                        var self = enabled;
                        var curr = +new Date;
                        var ms = curr - (prevTime || curr);
                        self.diff = ms;
                        self.prev = prevTime;
                        self.curr = curr;
                        prevTime = curr;
                        if (null == self.useColors) self.useColors = exports.useColors();
                        if (null == self.color && self.useColors) self.color = selectColor();
                        var args = Array.prototype.slice.call(arguments);
                        args[0] = exports.coerce(args[0]);
                        if ("string" !== typeof args[0]) {
                            args = ["%o"].concat(args)
                        }
                        var index = 0;
                        args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
                            if (match === "%") return match;
                            index++;
                            var formatter = exports.formatters[format];
                            if ("function" === typeof formatter) {
                                var val = args[index];

                                match = formatter.call(self, val);
                                args.splice(index, 1);
                                index--
                            }
                            return match
                        });
                        if ("function" === typeof exports.formatArgs) {
                            args = exports.formatArgs.apply(self, args)
                        }
                        var logFn = enabled.log || exports.log || console.log.bind(console);
                        logFn.apply(self, args)
                    }
                    enabled.enabled = true;
                    var fn = exports.enabled(namespace) ? enabled : disabled;
                    fn.namespace = namespace;
                    return fn
                }

                function enable(namespaces) {
                    exports.save(namespaces);
                    var split = (namespaces || "").split(/[\s,]+/);
                    var len = split.length;
                    for (var i = 0; i < len; i++) {
                        if (!split[i]) continue;
                        namespaces = split[i].replace(/\*/g, ".*?");
                        if (namespaces[0] === "-") {
                            exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"))
                        } else {
                            exports.names.push(new RegExp("^" + namespaces + "$"))
                        }
                    }
                }

                function disable() {
                    exports.enable("")
                }

                function enabled(name) {
                    var i, len;
                    for (i = 0, len = exports.skips.length; i < len; i++) {
                        if (exports.skips[i].test(name)) {
                            return false
                        }
                    }
                    for (i = 0, len = exports.names.length; i < len; i++) {
                        if (exports.names[i].test(name)) {
                            return true
                        }
                    }
                    return false
                }

                function coerce(val) {
                    if (val instanceof Error) return val.stack || val.message;
                    return val
                }
            }, {
                ms: 24
            }
        ],
        24: [
            function(_dereq_, module, exports) {
                var s = 1e3;
                var m = s * 60;
                var h = m * 60;
                var d = h * 24;
                var y = d * 365.25;
                module.exports = function(val, options) {
                    options = options || {};
                    if ("string" == typeof val) return parse(val);
                    return options.long ? long(val) : short(val)
                };

                function parse(str) {
                    var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(str);
                    if (!match) return;
                    var n = parseFloat(match[1]);
                    var type = (match[2] || "ms").toLowerCase();
                    switch (type) {
                        case "years":
                        case "year":
                        case "y":
                            return n * y;
                        case "days":
                        case "day":
                        case "d":
                            return n * d;
                        case "hours":
                        case "hour":
                        case "h":
                            return n * h;
                        case "minutes":
                        case "minute":
                        case "m":
                            return n * m;
                        case "seconds":
                        case "second":
                        case "s":
                            return n * s;
                        case "ms":
                            return n
                    }
                }

                function short(ms) {
                    if (ms >= d) return Math.round(ms / d) + "d";
                    if (ms >= h) return Math.round(ms / h) + "h";
                    if (ms >= m) return Math.round(ms / m) + "m";
                    if (ms >= s) return Math.round(ms / s) + "s";
                    return ms + "ms"
                }

                function long(ms) {
                    return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms"
                }

                function plural(ms, n, name) {
                    if (ms < n) return;
                    if (ms < n * 1.5) return Math.floor(ms / n) + " " + name;
                    return Math.ceil(ms / n) + " " + name + "s"
                }
            }, {}
        ],
        25: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var keys = _dereq_("./keys");
                    var hasBinary = _dereq_("has-binary");
                    var sliceBuffer = _dereq_("arraybuffer.slice");
                    var base64encoder = _dereq_("base64-arraybuffer");
                    var after = _dereq_("after");
                    var utf8 = _dereq_("utf8");
                    var isAndroid = navigator.userAgent.match(/Android/i);
                    var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);
                    var dontSendBlobs = isAndroid || isPhantomJS;
                    exports.protocol = 3;
                    var packets = exports.packets = {
                        open: 0,
                        close: 1,
                        ping: 2,
                        pong: 3,
                        message: 4,
                        upgrade: 5,
                        noop: 6
                    };
                    var packetslist = keys(packets);
                    var err = {
                        type: "error",
                        data: "parser error"
                    };
                    var Blob = _dereq_("blob");
                    exports.encodePacket = function(packet, supportsBinary, utf8encode, callback) {
                        if ("function" == typeof supportsBinary) {
                            callback = supportsBinary;
                            supportsBinary = false
                        }
                        if ("function" == typeof utf8encode) {
                            callback = utf8encode;
                            utf8encode = null
                        }
                        var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;
                        if (global.ArrayBuffer && data instanceof ArrayBuffer) {
                            return encodeArrayBuffer(packet, supportsBinary, callback)
                        } else if (Blob && data instanceof global.Blob) {
                            return encodeBlob(packet, supportsBinary, callback)
                        }
                        if (data && data.base64) {
                            return encodeBase64Object(packet, callback)
                        }
                        var encoded = packets[packet.type];
                        if (undefined !== packet.data) {
                            encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data)
                        }
                        return callback("" + encoded)
                    };

                    function encodeBase64Object(packet, callback) {
                        var message = "b" + exports.packets[packet.type] + packet.data.data;
                        return callback(message)
                    }

                    function encodeArrayBuffer(packet, supportsBinary, callback) {
                        if (!supportsBinary) {
                            return exports.encodeBase64Packet(packet, callback)
                        }
                        var data = packet.data;
                        var contentArray = new Uint8Array(data);
                        var resultBuffer = new Uint8Array(1 + data.byteLength);
                        resultBuffer[0] = packets[packet.type];
                        for (var i = 0; i < contentArray.length; i++) {
                            resultBuffer[i + 1] = contentArray[i]
                        }
                        return callback(resultBuffer.buffer)
                    }

                    function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
                        if (!supportsBinary) {
                            return exports.encodeBase64Packet(packet, callback)
                        }
                        var fr = new FileReader;
                        fr.onload = function() {
                            packet.data = fr.result;
                            exports.encodePacket(packet, supportsBinary, true, callback)
                        };
                        return fr.readAsArrayBuffer(packet.data)
                    }

                    function encodeBlob(packet, supportsBinary, callback) {
                        if (!supportsBinary) {
                            return exports.encodeBase64Packet(packet, callback)
                        }
                        if (dontSendBlobs) {
                            return encodeBlobAsArrayBuffer(packet, supportsBinary, callback)
                        }
                        var length = new Uint8Array(1);
                        length[0] = packets[packet.type];
                        var blob = new Blob([length.buffer, packet.data]);
                        return callback(blob)
                    }
                    exports.encodeBase64Packet = function(packet, callback) {
                        var message = "b" + exports.packets[packet.type];
                        if (Blob && packet.data instanceof Blob) {
                            var fr = new FileReader;
                            fr.onload = function() {
                                var b64 = fr.result.split(",")[1];
                                callback(message + b64)
                            };
                            return fr.readAsDataURL(packet.data)
                        }
                        var b64data;
                        try {
                            b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data))
                        } catch (e) {
                            var typed = new Uint8Array(packet.data);
                            var basic = new Array(typed.length);
                            for (var i = 0; i < typed.length; i++) {
                                basic[i] = typed[i]
                            }
                            b64data = String.fromCharCode.apply(null, basic)
                        }
                        message += global.btoa(b64data);
                        return callback(message)
                    };
                    exports.decodePacket = function(data, binaryType, utf8decode) {
                        if (typeof data == "string" || data === undefined) {
                            if (data.charAt(0) == "b") {
                                return exports.decodeBase64Packet(data.substr(1), binaryType)
                            }
                            if (utf8decode) {
                                try {
                                    data = utf8.decode(data)
                                } catch (e) {
                                    return err
                                }
                            }
                            var type = data.charAt(0);
                            if (Number(type) != type || !packetslist[type]) {
                                return err
                            }
                            if (data.length > 1) {
                                return {
                                    type: packetslist[type],
                                    data: data.substring(1)
                                }
                            } else {
                                return {
                                    type: packetslist[type]
                                }
                            }
                        }
                        var asArray = new Uint8Array(data);
                        var type = asArray[0];
                        var rest = sliceBuffer(data, 1);
                        if (Blob && binaryType === "blob") {
                            rest = new Blob([rest])
                        }
                        return {
                            type: packetslist[type],
                            data: rest
                        }
                    };
                    exports.decodeBase64Packet = function(msg, binaryType) {
                        var type = packetslist[msg.charAt(0)];
                        if (!global.ArrayBuffer) {
                            return {
                                type: type,
                                data: {
                                    base64: true,
                                    data: msg.substr(1)
                                }
                            }
                        }
                        var data = base64encoder.decode(msg.substr(1));
                        if (binaryType === "blob" && Blob) {
                            data = new Blob([data])
                        }
                        return {
                            type: type,
                            data: data
                        }
                    };
                    exports.encodePayload = function(packets, supportsBinary, callback) {
                        if (typeof supportsBinary == "function") {
                            callback = supportsBinary;
                            supportsBinary = null
                        }
                        var isBinary = hasBinary(packets);
                        if (supportsBinary && isBinary) {
                            if (Blob && !dontSendBlobs) {
                                return exports.encodePayloadAsBlob(packets, callback)
                            }
                            return exports.encodePayloadAsArrayBuffer(packets, callback)
                        }
                        if (!packets.length) {
                            return callback("0:")
                        }

                        function setLengthHeader(message) {
                            return message.length + ":" + message
                        }

                        function encodeOne(packet, doneCallback) {
                            exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
                                doneCallback(null, setLengthHeader(message))
                            })
                        }
                        map(packets, encodeOne, function(err, results) {
                            return callback(results.join(""))
                        })
                    };

                    function map(ary, each, done) {
                        var result = new Array(ary.length);
                        var next = after(ary.length, done);
                        var eachWithIndex = function(i, el, cb) {
                            each(el, function(error, msg) {
                                result[i] = msg;
                                cb(error, result)
                            })
                        };
                        for (var i = 0; i < ary.length; i++) {
                            eachWithIndex(i, ary[i], next)
                        }
                    }
                    exports.decodePayload = function(data, binaryType, callback) {
                        if (typeof data != "string") {
                            return exports.decodePayloadAsBinary(data, binaryType, callback)
                        }
                        if (typeof binaryType === "function") {
                            callback = binaryType;
                            binaryType = null
                        }
                        var packet;
                        if (data == "") {
                            return callback(err, 0, 1)
                        }
                        var length = "",
                            n, msg;
                        for (var i = 0, l = data.length; i < l; i++) {
                            var chr = data.charAt(i);
                            if (":" != chr) {
                                length += chr
                            } else {
                                if ("" == length || length != (n = Number(length))) {
                                    return callback(err, 0, 1)
                                }
                                msg = data.substr(i + 1, n);
                                if (length != msg.length) {
                                    return callback(err, 0, 1)
                                }
                                if (msg.length) {
                                    packet = exports.decodePacket(msg, binaryType, true);
                                    if (err.type == packet.type && err.data == packet.data) {
                                        return callback(err, 0, 1)
                                    }
                                    var ret = callback(packet, i + n, l);
                                    if (false === ret) return
                                }
                                i += n;
                                length = ""
                            }
                        }
                        if (length != "") {
                            return callback(err, 0, 1)
                        }
                    };
                    exports.encodePayloadAsArrayBuffer = function(packets, callback) {
                        if (!packets.length) {
                            return callback(new ArrayBuffer(0))
                        }

                        function encodeOne(packet, doneCallback) {
                            exports.encodePacket(packet, true, true, function(data) {
                                return doneCallback(null, data)
                            })
                        }
                        map(packets, encodeOne, function(err, encodedPackets) {
                            var totalLength = encodedPackets.reduce(function(acc, p) {
                                var len;
                                if (typeof p === "string") {
                                    len = p.length
                                } else {
                                    len = p.byteLength
                                }
                                return acc + len.toString().length + len + 2
                            }, 0);
                            var resultArray = new Uint8Array(totalLength);
                            var bufferIndex = 0;
                            encodedPackets.forEach(function(p) {
                                var isString = typeof p === "string";
                                var ab = p;
                                if (isString) {
                                    var view = new Uint8Array(p.length);
                                    for (var i = 0; i < p.length; i++) {
                                        view[i] = p.charCodeAt(i)
                                    }
                                    ab = view.buffer
                                }
                                if (isString) {
                                    resultArray[bufferIndex++] = 0
                                } else {
                                    resultArray[bufferIndex++] = 1
                                }
                                var lenStr = ab.byteLength.toString();
                                for (var i = 0; i < lenStr.length; i++) {
                                    resultArray[bufferIndex++] = parseInt(lenStr[i])
                                }
                                resultArray[bufferIndex++] = 255;
                                var view = new Uint8Array(ab);
                                for (var i = 0; i < view.length; i++) {
                                    resultArray[bufferIndex++] = view[i]
                                }
                            });
                            return callback(resultArray.buffer)
                        })
                    };
                    exports.encodePayloadAsBlob = function(packets, callback) {
                        function encodeOne(packet, doneCallback) {
                            exports.encodePacket(packet, true, true, function(encoded) {
                                var binaryIdentifier = new Uint8Array(1);
                                binaryIdentifier[0] = 1;
                                if (typeof encoded === "string") {
                                    var view = new Uint8Array(encoded.length);
                                    for (var i = 0; i < encoded.length; i++) {
                                        view[i] = encoded.charCodeAt(i)
                                    }
                                    encoded = view.buffer;
                                    binaryIdentifier[0] = 0
                                }
                                var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;
                                var lenStr = len.toString();
                                var lengthAry = new Uint8Array(lenStr.length + 1);
                                for (var i = 0; i < lenStr.length; i++) {
                                    lengthAry[i] = parseInt(lenStr[i])
                                }
                                lengthAry[lenStr.length] = 255;
                                if (Blob) {
                                    var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
                                    doneCallback(null, blob)
                                }
                            })
                        }
                        map(packets, encodeOne, function(err, results) {
                            return callback(new Blob(results))
                        })
                    };
                    exports.decodePayloadAsBinary = function(data, binaryType, callback) {
                        if (typeof binaryType === "function") {
                            callback = binaryType;
                            binaryType = null
                        }
                        var bufferTail = data;
                        var buffers = [];
                        var numberTooLong = false;
                        while (bufferTail.byteLength > 0) {
                            var tailArray = new Uint8Array(bufferTail);
                            var isString = tailArray[0] === 0;
                            var msgLength = "";
                            for (var i = 1;; i++) {
                                if (tailArray[i] == 255) break;
                                if (msgLength.length > 310) {
                                    numberTooLong = true;
                                    break
                                }
                                msgLength += tailArray[i]
                            }
                            if (numberTooLong) return callback(err, 0, 1);
                            bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
                            msgLength = parseInt(msgLength);
                            var msg = sliceBuffer(bufferTail, 0, msgLength);
                            if (isString) {
                                try {
                                    msg = String.fromCharCode.apply(null, new Uint8Array(msg))
                                } catch (e) {
                                    var typed = new Uint8Array(msg);
                                    msg = "";
                                    for (var i = 0; i < typed.length; i++) {
                                        msg += String.fromCharCode(typed[i])
                                    }
                                }
                            }
                            buffers.push(msg);
                            bufferTail = sliceBuffer(bufferTail, msgLength)
                        }
                        var total = buffers.length;
                        buffers.forEach(function(buffer, i) {
                            callback(exports.decodePacket(buffer, binaryType, true), i, total)
                        })
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                "./keys": 26,
                after: 27,
                "arraybuffer.slice": 28,
                "base64-arraybuffer": 29,
                blob: 30,
                "has-binary": 31,
                utf8: 33
            }
        ],
        26: [
            function(_dereq_, module, exports) {
                module.exports = Object.keys || function keys(obj) {
                    var arr = [];
                    var has = Object.prototype.hasOwnProperty;
                    for (var i in obj) {
                        if (has.call(obj, i)) {
                            arr.push(i)
                        }
                    }
                    return arr
                }
            }, {}
        ],
        27: [
            function(_dereq_, module, exports) {
                module.exports = after;

                function after(count, callback, err_cb) {
                    var bail = false;
                    err_cb = err_cb || noop;
                    proxy.count = count;
                    return count === 0 ? callback() : proxy;

                    function proxy(err, result) {
                        if (proxy.count <= 0) {
                            throw new Error("after called too many times")
                        }--proxy.count;
                        if (err) {
                            bail = true;
                            callback(err);
                            callback = err_cb
                        } else if (proxy.count === 0 && !bail) {
                            callback(null, result)
                        }
                    }
                }

                function noop() {}
            }, {}
        ],
        28: [
            function(_dereq_, module, exports) {
                module.exports = function(arraybuffer, start, end) {
                    var bytes = arraybuffer.byteLength;
                    start = start || 0;
                    end = end || bytes;
                    if (arraybuffer.slice) {
                        return arraybuffer.slice(start, end)
                    }
                    if (start < 0) {
                        start += bytes
                    }
                    if (end < 0) {
                        end += bytes
                    }
                    if (end > bytes) {
                        end = bytes
                    }
                    if (start >= bytes || start >= end || bytes === 0) {
                        return new ArrayBuffer(0)
                    }
                    var abv = new Uint8Array(arraybuffer);
                    var result = new Uint8Array(end - start);
                    for (var i = start, ii = 0; i < end; i++, ii++) {
                        result[ii] = abv[i]
                    }
                    return result.buffer
                }
            }, {}
        ],
        29: [
            function(_dereq_, module, exports) {
                (function(chars) {
                    "use strict";
                    exports.encode = function(arraybuffer) {
                        var bytes = new Uint8Array(arraybuffer),
                            i, len = bytes.length,
                            base64 = "";
                        for (i = 0; i < len; i += 3) {
                            base64 += chars[bytes[i] >> 2];
                            base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
                            base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
                            base64 += chars[bytes[i + 2] & 63]
                        }
                        if (len % 3 === 2) {
                            base64 = base64.substring(0, base64.length - 1) + "="
                        } else if (len % 3 === 1) {
                            base64 = base64.substring(0, base64.length - 2) + "=="
                        }
                        return base64
                    };
                    exports.decode = function(base64) {
                        var bufferLength = base64.length * .75,
                            len = base64.length,
                            i, p = 0,
                            encoded1, encoded2, encoded3, encoded4;
                        if (base64[base64.length - 1] === "=") {
                            bufferLength--;
                            if (base64[base64.length - 2] === "=") {
                                bufferLength--
                            }
                        }
                        var arraybuffer = new ArrayBuffer(bufferLength),
                            bytes = new Uint8Array(arraybuffer);
                        for (i = 0; i < len; i += 4) {
                            encoded1 = chars.indexOf(base64[i]);
                            encoded2 = chars.indexOf(base64[i + 1]);
                            encoded3 = chars.indexOf(base64[i + 2]);
                            encoded4 = chars.indexOf(base64[i + 3]);
                            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
                            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
                            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63
                        }
                        return arraybuffer
                    }
                })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
            }, {}
        ],
        30: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;
                    var blobSupported = function() {
                        try {
                            var b = new Blob(["hi"]);
                            return b.size == 2
                        } catch (e) {
                            return false
                        }
                    }();
                    var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

                    function BlobBuilderConstructor(ary, options) {
                        options = options || {};
                        var bb = new BlobBuilder;
                        for (var i = 0; i < ary.length; i++) {
                            bb.append(ary[i])
                        }
                        return options.type ? bb.getBlob(options.type) : bb.getBlob()
                    }
                    module.exports = function() {
                        if (blobSupported) {
                            return global.Blob
                        } else if (blobBuilderSupported) {
                            return BlobBuilderConstructor
                        } else {
                            return undefined
                        }
                    }()
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {}
        ],
        31: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var isArray = _dereq_("isarray");
                    module.exports = hasBinary;

                    function hasBinary(data) {
                        function _hasBinary(obj) {
                            if (!obj) return false;
                            if (global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                                return true
                            }
                            if (isArray(obj)) {
                                for (var i = 0; i < obj.length; i++) {
                                    if (_hasBinary(obj[i])) {
                                        return true
                                    }
                                }
                            } else if (obj && "object" == typeof obj) {
                                if (obj.toJSON) {
                                    obj = obj.toJSON()
                                }
                                for (var key in obj) {
                                    if (obj.hasOwnProperty(key) && _hasBinary(obj[key])) {
                                        return true
                                    }
                                }
                            }
                            return false
                        }
                        return _hasBinary(data)
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                isarray: 32
            }
        ],
        32: [
            function(_dereq_, module, exports) {
                module.exports = Array.isArray || function(arr) {
                    return Object.prototype.toString.call(arr) == "[object Array]"
                }
            }, {}
        ],
        33: [
            function(_dereq_, module, exports) {
                (function(global) {
                    (function(root) {
                        var freeExports = typeof exports == "object" && exports;
                        var freeModule = typeof module == "object" && module && module.exports == freeExports && module;
                        var freeGlobal = typeof global == "object" && global;
                        if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
                            root = freeGlobal
                        }
                        var stringFromCharCode = String.fromCharCode;

                        function ucs2decode(string) {
                            var output = [];
                            var counter = 0;
                            var length = string.length;
                            var value;
                            var extra;
                            while (counter < length) {
                                value = string.charCodeAt(counter++);
                                if (value >= 55296 && value <= 56319 && counter < length) {
                                    extra = string.charCodeAt(counter++);
                                    if ((extra & 64512) == 56320) {
                                        output.push(((value & 1023) << 10) + (extra & 1023) + 65536)
                                    } else {
                                        output.push(value);
                                        counter--
                                    }
                                } else {
                                    output.push(value)
                                }
                            }
                            return output
                        }

                        function ucs2encode(array) {
                            var length = array.length;
                            var index = -1;
                            var value;
                            var output = "";
                            while (++index < length) {
                                value = array[index];
                                if (value > 65535) {
                                    value -= 65536;
                                    output += stringFromCharCode(value >>> 10 & 1023 | 55296);
                                    value = 56320 | value & 1023
                                }
                                output += stringFromCharCode(value)
                            }
                            return output
                        }

                        function createByte(codePoint, shift) {
                            return stringFromCharCode(codePoint >> shift & 63 | 128)
                        }

                        function encodeCodePoint(codePoint) {
                            if ((codePoint & 4294967168) == 0) {
                                return stringFromCharCode(codePoint)
                            }
                            var symbol = "";
                            if ((codePoint & 4294965248) == 0) {
                                symbol = stringFromCharCode(codePoint >> 6 & 31 | 192)
                            } else if ((codePoint & 4294901760) == 0) {
                                symbol = stringFromCharCode(codePoint >> 12 & 15 | 224);
                                symbol += createByte(codePoint, 6)
                            } else if ((codePoint & 4292870144) == 0) {
                                symbol = stringFromCharCode(codePoint >> 18 & 7 | 240);
                                symbol += createByte(codePoint, 12);
                                symbol += createByte(codePoint, 6)
                            }
                            symbol += stringFromCharCode(codePoint & 63 | 128);
                            return symbol
                        }

                        function utf8encode(string) {
                            var codePoints = ucs2decode(string);
                            var length = codePoints.length;
                            var index = -1;
                            var codePoint;
                            var byteString = "";
                            while (++index < length) {
                                codePoint = codePoints[index];
                                byteString += encodeCodePoint(codePoint)
                            }
                            return byteString
                        }

                        function readContinuationByte() {
                            if (byteIndex >= byteCount) {
                                throw Error("Invalid byte index")
                            }
                            var continuationByte = byteArray[byteIndex] & 255;
                            byteIndex++;
                            if ((continuationByte & 192) == 128) {
                                return continuationByte & 63
                            }
                            throw Error("Invalid continuation byte")
                        }

                        function decodeSymbol() {
                            var byte1;
                            var byte2;
                            var byte3;
                            var byte4;
                            var codePoint;
                            if (byteIndex > byteCount) {
                                throw Error("Invalid byte index")
                            }
                            if (byteIndex == byteCount) {
                                return false
                            }
                            byte1 = byteArray[byteIndex] & 255;
                            byteIndex++;
                            if ((byte1 & 128) == 0) {
                                return byte1
                            }
                            if ((byte1 & 224) == 192) {
                                var byte2 = readContinuationByte();
                                codePoint = (byte1 & 31) << 6 | byte2;
                                if (codePoint >= 128) {
                                    return codePoint
                                } else {
                                    throw Error("Invalid continuation byte")
                                }
                            }
                            if ((byte1 & 240) == 224) {
                                byte2 = readContinuationByte();
                                byte3 = readContinuationByte();
                                codePoint = (byte1 & 15) << 12 | byte2 << 6 | byte3;
                                if (codePoint >= 2048) {
                                    return codePoint
                                } else {
                                    throw Error("Invalid continuation byte")
                                }
                            }
                            if ((byte1 & 248) == 240) {
                                byte2 = readContinuationByte();
                                byte3 = readContinuationByte();
                                byte4 = readContinuationByte();
                                codePoint = (byte1 & 15) << 18 | byte2 << 12 | byte3 << 6 | byte4;
                                if (codePoint >= 65536 && codePoint <= 1114111) {
                                    return codePoint
                                }
                            }
                            throw Error("Invalid UTF-8 detected")
                        }
                        var byteArray;
                        var byteCount;
                        var byteIndex;

                        function utf8decode(byteString) {
                            byteArray = ucs2decode(byteString);
                            byteCount = byteArray.length;
                            byteIndex = 0;
                            var codePoints = [];
                            var tmp;
                            while ((tmp = decodeSymbol()) !== false) {
                                codePoints.push(tmp)
                            }
                            return ucs2encode(codePoints)
                        }
                        var utf8 = {
                            version: "2.0.0",
                            encode: utf8encode,
                            decode: utf8decode
                        };
                        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
                            define(function() {
                                return utf8
                            })
                        } else if (freeExports && !freeExports.nodeType) {
                            if (freeModule) {
                                freeModule.exports = utf8
                            } else {
                                var object = {};
                                var hasOwnProperty = object.hasOwnProperty;
                                for (var key in utf8) {
                                    hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key])
                                }
                            }
                        } else {
                            root.utf8 = utf8
                        }
                    })(this)
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {}
        ],
        34: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var rvalidchars = /^[\],:{}\s]*$/;
                    var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
                    var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
                    var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
                    var rtrimLeft = /^\s+/;
                    var rtrimRight = /\s+$/;
                    module.exports = function parsejson(data) {
                        if ("string" != typeof data || !data) {
                            return null
                        }
                        data = data.replace(rtrimLeft, "").replace(rtrimRight, "");
                        if (global.JSON && JSON.parse) {
                            return JSON.parse(data)
                        }
                        if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                            return new Function("return " + data)()
                        }
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {}
        ],
        35: [
            function(_dereq_, module, exports) {
                exports.encode = function(obj) {
                    var str = "";
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            if (str.length) str += "&";
                            str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i])
                        }
                    }
                    return str
                };
                exports.decode = function(qs) {
                    var qry = {};
                    var pairs = qs.split("&");
                    for (var i = 0, l = pairs.length; i < l; i++) {
                        var pair = pairs[i].split("=");
                        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
                    }
                    return qry
                }
            }, {}
        ],
        36: [
            function(_dereq_, module, exports) {
                var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
                var parts = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                module.exports = function parseuri(str) {
                    var src = str,
                        b = str.indexOf("["),
                        e = str.indexOf("]");
                    if (b != -1 && e != -1) {
                        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length)
                    }
                    var m = re.exec(str || ""),
                        uri = {}, i = 14;
                    while (i--) {
                        uri[parts[i]] = m[i] || ""
                    }
                    if (b != -1 && e != -1) {
                        uri.source = src;
                        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
                        uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
                        uri.ipv6uri = true
                    }
                    return uri
                }
            }, {}
        ],
        37: [
            function(_dereq_, module, exports) {
                var global = function() {
                    return this
                }();
                var WebSocket = global.WebSocket || global.MozWebSocket;
                module.exports = WebSocket ? ws : null;

                function ws(uri, protocols, opts) {
                    var instance;
                    if (protocols) {
                        instance = new WebSocket(uri, protocols)
                    } else {
                        instance = new WebSocket(uri)
                    }
                    return instance
                }
                if (WebSocket) ws.prototype = WebSocket.prototype
            }, {}
        ],
        38: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var isArray = _dereq_("isarray");
                    module.exports = hasBinary;

                    function hasBinary(data) {
                        function _hasBinary(obj) {
                            if (!obj) return false;
                            if (global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                                return true
                            }
                            if (isArray(obj)) {
                                for (var i = 0; i < obj.length; i++) {
                                    if (_hasBinary(obj[i])) {
                                        return true
                                    }
                                }
                            } else if (obj && "object" == typeof obj) {
                                if (obj.toJSON) {
                                    obj = obj.toJSON()
                                }
                                for (var key in obj) {
                                    if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
                                        return true
                                    }
                                }
                            }
                            return false
                        }
                        return _hasBinary(data)
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                isarray: 39
            }
        ],
        39: [
            function(_dereq_, module, exports) {
                module.exports = _dereq_(32)
            }, {}
        ],
        40: [
            function(_dereq_, module, exports) {
                var global = _dereq_("global");
                try {
                    module.exports = "XMLHttpRequest" in global && "withCredentials" in new global.XMLHttpRequest
                } catch (err) {
                    module.exports = false
                }
            }, {
                global: 41
            }
        ],
        41: [
            function(_dereq_, module, exports) {
                module.exports = function() {
                    return this
                }()
            }, {}
        ],
        42: [
            function(_dereq_, module, exports) {
                var indexOf = [].indexOf;
                module.exports = function(arr, obj) {
                    if (indexOf) return arr.indexOf(obj);
                    for (var i = 0; i < arr.length; ++i) {
                        if (arr[i] === obj) return i
                    }
                    return -1
                }
            }, {}
        ],
        43: [
            function(_dereq_, module, exports) {
                var has = Object.prototype.hasOwnProperty;
                exports.keys = Object.keys || function(obj) {
                    var keys = [];
                    for (var key in obj) {
                        if (has.call(obj, key)) {
                            keys.push(key)
                        }
                    }
                    return keys
                };
                exports.values = function(obj) {
                    var vals = [];
                    for (var key in obj) {
                        if (has.call(obj, key)) {
                            vals.push(obj[key])
                        }
                    }
                    return vals
                };
                exports.merge = function(a, b) {
                    for (var key in b) {
                        if (has.call(b, key)) {
                            a[key] = b[key]
                        }
                    }
                    return a
                };
                exports.length = function(obj) {
                    return exports.keys(obj).length
                };
                exports.isEmpty = function(obj) {
                    return 0 == exports.length(obj)
                }
            }, {}
        ],
        44: [
            function(_dereq_, module, exports) {
                var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
                var parts = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                module.exports = function parseuri(str) {
                    var m = re.exec(str || ""),
                        uri = {}, i = 14;
                    while (i--) {
                        uri[parts[i]] = m[i] || ""
                    }
                    return uri
                }
            }, {}
        ],
        45: [
            function(_dereq_, module, exports) {
                (function(global) {
                    var isArray = _dereq_("isarray");
                    var isBuf = _dereq_("./is-buffer");
                    exports.deconstructPacket = function(packet) {
                        var buffers = [];
                        var packetData = packet.data;

                        function _deconstructPacket(data) {
                            if (!data) return data;
                            if (isBuf(data)) {
                                var placeholder = {
                                    _placeholder: true,
                                    num: buffers.length
                                };
                                buffers.push(data);
                                return placeholder
                            } else if (isArray(data)) {
                                var newData = new Array(data.length);
                                for (var i = 0; i < data.length; i++) {
                                    newData[i] = _deconstructPacket(data[i])
                                }
                                return newData
                            } else if ("object" == typeof data && !(data instanceof Date)) {
                                var newData = {};
                                for (var key in data) {
                                    newData[key] = _deconstructPacket(data[key])
                                }
                                return newData
                            }
                            return data
                        }
                        var pack = packet;
                        pack.data = _deconstructPacket(packetData);
                        pack.attachments = buffers.length;
                        return {
                            packet: pack,
                            buffers: buffers
                        }
                    };
                    exports.reconstructPacket = function(packet, buffers) {
                        var curPlaceHolder = 0;

                        function _reconstructPacket(data) {
                            if (data && data._placeholder) {
                                var buf = buffers[data.num];
                                return buf
                            } else if (isArray(data)) {
                                for (var i = 0; i < data.length; i++) {
                                    data[i] = _reconstructPacket(data[i])
                                }
                                return data
                            } else if (data && "object" == typeof data) {
                                for (var key in data) {
                                    data[key] = _reconstructPacket(data[key])
                                }
                                return data
                            }
                            return data
                        }
                        packet.data = _reconstructPacket(packet.data);
                        packet.attachments = undefined;
                        return packet
                    };
                    exports.removeBlobs = function(data, callback) {
                        function _removeBlobs(obj, curKey, containingObject) {
                            if (!obj) return obj;
                            if (global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                                pendingBlobs++;
                                var fileReader = new FileReader;
                                fileReader.onload = function() {
                                    if (containingObject) {
                                        containingObject[curKey] = this.result
                                    } else {
                                        bloblessData = this.result
                                    } if (!--pendingBlobs) {
                                        callback(bloblessData)
                                    }
                                };
                                fileReader.readAsArrayBuffer(obj)
                            } else if (isArray(obj)) {
                                for (var i = 0; i < obj.length; i++) {
                                    _removeBlobs(obj[i], i, obj)
                                }
                            } else if (obj && "object" == typeof obj && !isBuf(obj)) {
                                for (var key in obj) {
                                    _removeBlobs(obj[key], key, obj)
                                }
                            }
                        }
                        var pendingBlobs = 0;
                        var bloblessData = data;
                        _removeBlobs(bloblessData);
                        if (!pendingBlobs) {
                            callback(bloblessData)
                        }
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {
                "./is-buffer": 47,
                isarray: 48
            }
        ],
        46: [
            function(_dereq_, module, exports) {
                var debug = _dereq_("debug")("socket.io-parser");
                var json = _dereq_("json3");
                var isArray = _dereq_("isarray");
                var Emitter = _dereq_("component-emitter");
                var binary = _dereq_("./binary");
                var isBuf = _dereq_("./is-buffer");
                exports.protocol = 4;
                exports.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"];
                exports.CONNECT = 0;
                exports.DISCONNECT = 1;
                exports.EVENT = 2;
                exports.ACK = 3;
                exports.ERROR = 4;
                exports.BINARY_EVENT = 5;
                exports.BINARY_ACK = 6;
                exports.Encoder = Encoder;
                exports.Decoder = Decoder;

                function Encoder() {}
                Encoder.prototype.encode = function(obj, callback) {
                    debug("encoding packet %j", obj);
                    if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
                        encodeAsBinary(obj, callback)
                    } else {
                        var encoding = encodeAsString(obj);
                        callback([encoding])
                    }
                };

                function encodeAsString(obj) {
                    var str = "";
                    var nsp = false;
                    str += obj.type;
                    if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
                        str += obj.attachments;
                        str += "-"
                    }
                    if (obj.nsp && "/" != obj.nsp) {
                        nsp = true;
                        str += obj.nsp
                    }
                    if (null != obj.id) {
                        if (nsp) {
                            str += ",";
                            nsp = false
                        }
                        str += obj.id
                    }
                    if (null != obj.data) {
                        if (nsp) str += ",";
                        str += json.stringify(obj.data)
                    }
                    debug("encoded %j as %s", obj, str);
                    return str
                }

                function encodeAsBinary(obj, callback) {
                    function writeEncoding(bloblessData) {
                        var deconstruction = binary.deconstructPacket(bloblessData);
                        var pack = encodeAsString(deconstruction.packet);
                        var buffers = deconstruction.buffers;
                        buffers.unshift(pack);
                        callback(buffers)
                    }
                    binary.removeBlobs(obj, writeEncoding)
                }

                function Decoder() {
                    this.reconstructor = null
                }
                Emitter(Decoder.prototype);
                Decoder.prototype.add = function(obj) {
                    var packet;
                    if ("string" == typeof obj) {
                        packet = decodeString(obj);
                        if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) {
                            this.reconstructor = new BinaryReconstructor(packet);
                            if (this.reconstructor.reconPack.attachments === 0) {
                                this.emit("decoded", packet)
                            }
                        } else {
                            this.emit("decoded", packet)
                        }
                    } else if (isBuf(obj) || obj.base64) {
                        if (!this.reconstructor) {
                            throw new Error("got binary data when not reconstructing a packet")
                        } else {
                            packet = this.reconstructor.takeBinaryData(obj);
                            if (packet) {
                                this.reconstructor = null;
                                this.emit("decoded", packet)
                            }
                        }
                    } else {
                        throw new Error("Unknown type: " + obj)
                    }
                };

                function decodeString(str) {
                    var p = {};
                    var i = 0;
                    p.type = Number(str.charAt(0));
                    if (null == exports.types[p.type]) return error();
                    if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
                        var buf = "";
                        while (str.charAt(++i) != "-") {
                            buf += str.charAt(i);
                            if (i + 1 == str.length) break
                        }
                        if (buf != Number(buf) || str.charAt(i) != "-") {
                            throw new Error("Illegal attachments")
                        }
                        p.attachments = Number(buf)
                    }
                    if ("/" == str.charAt(i + 1)) {
                        p.nsp = "";
                        while (++i) {
                            var c = str.charAt(i);
                            if ("," == c) break;
                            p.nsp += c;
                            if (i + 1 == str.length) break
                        }
                    } else {
                        p.nsp = "/"
                    }
                    var next = str.charAt(i + 1);
                    if ("" !== next && Number(next) == next) {
                        p.id = "";
                        while (++i) {
                            var c = str.charAt(i);
                            if (null == c || Number(c) != c) {
                                --i;
                                break
                            }
                            p.id += str.charAt(i);
                            if (i + 1 == str.length) break
                        }
                        p.id = Number(p.id)
                    }
                    if (str.charAt(++i)) {
                        try {
                            p.data = json.parse(str.substr(i))
                        } catch (e) {
                            return error()
                        }
                    }
                    debug("decoded %s as %j", str, p);
                    return p
                }
                Decoder.prototype.destroy = function() {
                    if (this.reconstructor) {
                        this.reconstructor.finishedReconstruction()
                    }
                };

                function BinaryReconstructor(packet) {
                    this.reconPack = packet;
                    this.buffers = []
                }
                BinaryReconstructor.prototype.takeBinaryData = function(binData) {
                    this.buffers.push(binData);
                    if (this.buffers.length == this.reconPack.attachments) {
                        var packet = binary.reconstructPacket(this.reconPack, this.buffers);
                        this.finishedReconstruction();
                        return packet
                    }
                    return null
                };
                BinaryReconstructor.prototype.finishedReconstruction = function() {
                    this.reconPack = null;
                    this.buffers = []
                };

                function error(data) {
                    return {
                        type: exports.ERROR,
                        data: "parser error"
                    }
                }
            }, {
                "./binary": 45,
                "./is-buffer": 47,
                "component-emitter": 9,
                debug: 10,
                isarray: 48,
                json3: 49
            }
        ],
        47: [
            function(_dereq_, module, exports) {
                (function(global) {
                    module.exports = isBuf;

                    function isBuf(obj) {
                        return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer
                    }
                }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
            }, {}
        ],
        48: [
            function(_dereq_, module, exports) {
                module.exports = _dereq_(32)
            }, {}
        ],
        49: [
            function(_dereq_, module, exports) {
                (function(window) {
                    var getClass = {}.toString,
                        isProperty, forEach, undef;
                    var isLoader = typeof define === "function" && define.amd;
                    var nativeJSON = typeof JSON == "object" && JSON;
                    var JSON3 = typeof exports == "object" && exports && !exports.nodeType && exports;
                    if (JSON3 && nativeJSON) {
                        JSON3.stringify = nativeJSON.stringify;
                        JSON3.parse = nativeJSON.parse
                    } else {
                        JSON3 = window.JSON = nativeJSON || {}
                    }
                    var isExtended = new Date(-0xc782b5b800cec);
                    try {
                        isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708
                    } catch (exception) {}

                    function has(name) {
                        if (has[name] !== undef) {
                            return has[name]
                        }
                        var isSupported;
                        if (name == "bug-string-char-index") {
                            isSupported = "a" [0] != "a"
                        } else if (name == "json") {
                            isSupported = has("json-stringify") && has("json-parse")
                        } else {
                            var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                            if (name == "json-stringify") {
                                var stringify = JSON3.stringify,
                                    stringifySupported = typeof stringify == "function" && isExtended;
                                if (stringifySupported) {
                                    (value = function() {
                                        return 1
                                    }).toJSON = value;
                                    try {
                                        stringifySupported = stringify(0) === "0" && stringify(new Number) === "0" && stringify(new String) == '""' && stringify(getClass) === undef && stringify(undef) === undef && stringify() === undef && stringify(value) === "1" && stringify([value]) == "[1]" && stringify([undef]) == "[null]" && stringify(null) == "null" && stringify([undef, getClass, null]) == "[null,null,null]" && stringify({
                                            a: [value, true, false, null, "\x00\b\n\f\r	"]
                                        }) == serialized && stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && stringify(new Date(-864e13)) == '"-271821-04-20T00:00:00.000Z"' && stringify(new Date(864e13)) == '"+275760-09-13T00:00:00.000Z"' && stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"'
                                    } catch (exception) {
                                        stringifySupported = false
                                    }
                                }
                                isSupported = stringifySupported
                            }
                            if (name == "json-parse") {
                                var parse = JSON3.parse;
                                if (typeof parse == "function") {
                                    try {
                                        if (parse("0") === 0 && !parse(false)) {
                                            value = parse(serialized);
                                            var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                                            if (parseSupported) {
                                                try {
                                                    parseSupported = !parse('"	"')
                                                } catch (exception) {}
                                                if (parseSupported) {
                                                    try {
                                                        parseSupported = parse("01") !== 1
                                                    } catch (exception) {}
                                                }
                                                if (parseSupported) {
                                                    try {
                                                        parseSupported = parse("1.") !== 1
                                                    } catch (exception) {}
                                                }
                                            }
                                        }
                                    } catch (exception) {
                                        parseSupported = false
                                    }
                                }
                                isSupported = parseSupported;

                            }
                        }
                        return has[name] = !! isSupported
                    }
                    if (!has("json")) {
                        var functionClass = "[object Function]";
                        var dateClass = "[object Date]";
                        var numberClass = "[object Number]";
                        var stringClass = "[object String]";
                        var arrayClass = "[object Array]";
                        var booleanClass = "[object Boolean]";
                        var charIndexBuggy = has("bug-string-char-index");
                        if (!isExtended) {
                            var floor = Math.floor;
                            var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
                            var getDay = function(year, month) {
                                return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400)
                            }
                        }
                        if (!(isProperty = {}.hasOwnProperty)) {
                            isProperty = function(property) {
                                var members = {}, constructor;
                                if ((members.__proto__ = null, members.__proto__ = {
                                    toString: 1
                                }, members).toString != getClass) {
                                    isProperty = function(property) {
                                        var original = this.__proto__,
                                            result = property in (this.__proto__ = null, this);
                                        this.__proto__ = original;
                                        return result
                                    }
                                } else {
                                    constructor = members.constructor;
                                    isProperty = function(property) {
                                        var parent = (this.constructor || constructor).prototype;
                                        return property in this && !(property in parent && this[property] === parent[property])
                                    }
                                }
                                members = null;
                                return isProperty.call(this, property)
                            }
                        }
                        var PrimitiveTypes = {
                            "boolean": 1,
                            number: 1,
                            string: 1,
                            undefined: 1
                        };
                        var isHostType = function(object, property) {
                            var type = typeof object[property];
                            return type == "object" ? !! object[property] : !PrimitiveTypes[type]
                        };
                        forEach = function(object, callback) {
                            var size = 0,
                                Properties, members, property;
                            (Properties = function() {
                                this.valueOf = 0
                            }).prototype.valueOf = 0;
                            members = new Properties;
                            for (property in members) {
                                if (isProperty.call(members, property)) {
                                    size++
                                }
                            }
                            Properties = members = null;
                            if (!size) {
                                members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
                                forEach = function(object, callback) {
                                    var isFunction = getClass.call(object) == functionClass,
                                        property, length;
                                    var hasProperty = !isFunction && typeof object.constructor != "function" && isHostType(object, "hasOwnProperty") ? object.hasOwnProperty : isProperty;
                                    for (property in object) {
                                        if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                                            callback(property)
                                        }
                                    }
                                    for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
                                }
                            } else if (size == 2) {
                                forEach = function(object, callback) {
                                    var members = {}, isFunction = getClass.call(object) == functionClass,
                                        property;
                                    for (property in object) {
                                        if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                                            callback(property)
                                        }
                                    }
                                }
                            } else {
                                forEach = function(object, callback) {
                                    var isFunction = getClass.call(object) == functionClass,
                                        property, isConstructor;
                                    for (property in object) {
                                        if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                                            callback(property)
                                        }
                                    }
                                    if (isConstructor || isProperty.call(object, property = "constructor")) {
                                        callback(property)
                                    }
                                }
                            }
                            return forEach(object, callback)
                        };
                        if (!has("json-stringify")) {
                            var Escapes = {
                                92: "\\\\",
                                34: '\\"',
                                8: "\\b",
                                12: "\\f",
                                10: "\\n",
                                13: "\\r",
                                9: "\\t"
                            };
                            var leadingZeroes = "000000";
                            var toPaddedString = function(width, value) {
                                return (leadingZeroes + (value || 0)).slice(-width)
                            };
                            var unicodePrefix = "\\u00";
                            var quote = function(value) {
                                var result = '"',
                                    index = 0,
                                    length = value.length,
                                    isLarge = length > 10 && charIndexBuggy,
                                    symbols;
                                if (isLarge) {
                                    symbols = value.split("")
                                }
                                for (; index < length; index++) {
                                    var charCode = value.charCodeAt(index);
                                    switch (charCode) {
                                        case 8:
                                        case 9:
                                        case 10:
                                        case 12:
                                        case 13:
                                        case 34:
                                        case 92:
                                            result += Escapes[charCode];
                                            break;
                                        default:
                                            if (charCode < 32) {
                                                result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                                                break
                                            }
                                            result += isLarge ? symbols[index] : charIndexBuggy ? value.charAt(index) : value[index]
                                    }
                                }
                                return result + '"'
                            };
                            var serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
                                var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
                                try {
                                    value = object[property]
                                } catch (exception) {}
                                if (typeof value == "object" && value) {
                                    className = getClass.call(value);
                                    if (className == dateClass && !isProperty.call(value, "toJSON")) {
                                        if (value > -1 / 0 && value < 1 / 0) {
                                            if (getDay) {
                                                date = floor(value / 864e5);
                                                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                                                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                                                date = 1 + date - getDay(year, month);
                                                time = (value % 864e5 + 864e5) % 864e5;
                                                hours = floor(time / 36e5) % 24;
                                                minutes = floor(time / 6e4) % 60;
                                                seconds = floor(time / 1e3) % 60;
                                                milliseconds = time % 1e3
                                            } else {
                                                year = value.getUTCFullYear();
                                                month = value.getUTCMonth();
                                                date = value.getUTCDate();
                                                hours = value.getUTCHours();
                                                minutes = value.getUTCMinutes();
                                                seconds = value.getUTCSeconds();
                                                milliseconds = value.getUTCMilliseconds()
                                            }
                                            value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + "." + toPaddedString(3, milliseconds) + "Z"
                                        } else {
                                            value = null
                                        }
                                    } else if (typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || isProperty.call(value, "toJSON"))) {
                                        value = value.toJSON(property)
                                    }
                                }
                                if (callback) {
                                    value = callback.call(object, property, value)
                                }
                                if (value === null) {
                                    return "null"
                                }
                                className = getClass.call(value);
                                if (className == booleanClass) {
                                    return "" + value
                                } else if (className == numberClass) {
                                    return value > -1 / 0 && value < 1 / 0 ? "" + value : "null"
                                } else if (className == stringClass) {
                                    return quote("" + value)
                                }
                                if (typeof value == "object") {
                                    for (length = stack.length; length--;) {
                                        if (stack[length] === value) {
                                            throw TypeError()
                                        }
                                    }
                                    stack.push(value);
                                    results = [];
                                    prefix = indentation;
                                    indentation += whitespace;
                                    if (className == arrayClass) {
                                        for (index = 0, length = value.length; index < length; index++) {
                                            element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                                            results.push(element === undef ? "null" : element)
                                        }
                                        result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]"
                                    } else {
                                        forEach(properties || value, function(property) {
                                            var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                                            if (element !== undef) {
                                                results.push(quote(property) + ":" + (whitespace ? " " : "") + element)
                                            }
                                        });
                                        result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}"
                                    }
                                    stack.pop();
                                    return result
                                }
                            };
                            JSON3.stringify = function(source, filter, width) {
                                var whitespace, callback, properties, className;
                                if (typeof filter == "function" || typeof filter == "object" && filter) {
                                    if ((className = getClass.call(filter)) == functionClass) {
                                        callback = filter
                                    } else if (className == arrayClass) {
                                        properties = {};
                                        for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1));
                                    }
                                }
                                if (width) {
                                    if ((className = getClass.call(width)) == numberClass) {
                                        if ((width -= width % 1) > 0) {
                                            for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
                                        }
                                    } else if (className == stringClass) {
                                        whitespace = width.length <= 10 ? width : width.slice(0, 10)
                                    }
                                }
                                return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", [])
                            }
                        }
                        if (!has("json-parse")) {
                            var fromCharCode = String.fromCharCode;
                            var Unescapes = {
                                92: "\\",
                                34: '"',
                                47: "/",
                                98: "\b",
                                116: "	",
                                110: "\n",
                                102: "\f",
                                114: "\r"
                            };
                            var Index, Source;
                            var abort = function() {
                                Index = Source = null;
                                throw SyntaxError()
                            };
                            var lex = function() {
                                var source = Source,
                                    length = source.length,
                                    value, begin, position, isSigned, charCode;
                                while (Index < length) {
                                    charCode = source.charCodeAt(Index);
                                    switch (charCode) {
                                        case 9:
                                        case 10:
                                        case 13:
                                        case 32:
                                            Index++;
                                            break;
                                        case 123:
                                        case 125:
                                        case 91:
                                        case 93:
                                        case 58:
                                        case 44:
                                            value = charIndexBuggy ? source.charAt(Index) : source[Index];
                                            Index++;
                                            return value;
                                        case 34:
                                            for (value = "@", Index++; Index < length;) {
                                                charCode = source.charCodeAt(Index);
                                                if (charCode < 32) {
                                                    abort()
                                                } else if (charCode == 92) {
                                                    charCode = source.charCodeAt(++Index);
                                                    switch (charCode) {
                                                        case 92:
                                                        case 34:
                                                        case 47:
                                                        case 98:
                                                        case 116:
                                                        case 110:
                                                        case 102:
                                                        case 114:
                                                            value += Unescapes[charCode];
                                                            Index++;
                                                            break;
                                                        case 117:
                                                            begin = ++Index;
                                                            for (position = Index + 4; Index < position; Index++) {
                                                                charCode = source.charCodeAt(Index);
                                                                if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                                                    abort()
                                                                }
                                                            }
                                                            value += fromCharCode("0x" + source.slice(begin, Index));
                                                            break;
                                                        default:
                                                            abort()
                                                    }
                                                } else {
                                                    if (charCode == 34) {
                                                        break
                                                    }
                                                    charCode = source.charCodeAt(Index);
                                                    begin = Index;
                                                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                                                        charCode = source.charCodeAt(++Index)
                                                    }
                                                    value += source.slice(begin, Index)
                                                }
                                            }
                                            if (source.charCodeAt(Index) == 34) {
                                                Index++;
                                                return value
                                            }
                                            abort();
                                        default:
                                            begin = Index;
                                            if (charCode == 45) {
                                                isSigned = true;
                                                charCode = source.charCodeAt(++Index)
                                            }
                                            if (charCode >= 48 && charCode <= 57) {
                                                if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                                                    abort()
                                                }
                                                isSigned = false;
                                                for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++);
                                                if (source.charCodeAt(Index) == 46) {
                                                    position = ++Index;
                                                    for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
                                                    if (position == Index) {
                                                        abort()
                                                    }
                                                    Index = position
                                                }
                                                charCode = source.charCodeAt(Index);
                                                if (charCode == 101 || charCode == 69) {
                                                    charCode = source.charCodeAt(++Index);
                                                    if (charCode == 43 || charCode == 45) {
                                                        Index++
                                                    }
                                                    for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
                                                    if (position == Index) {
                                                        abort()
                                                    }
                                                    Index = position
                                                }
                                                return +source.slice(begin, Index)
                                            }
                                            if (isSigned) {
                                                abort()
                                            }
                                            if (source.slice(Index, Index + 4) == "true") {
                                                Index += 4;
                                                return true
                                            } else if (source.slice(Index, Index + 5) == "false") {
                                                Index += 5;
                                                return false
                                            } else if (source.slice(Index, Index + 4) == "null") {
                                                Index += 4;
                                                return null
                                            }
                                            abort()
                                    }
                                }
                                return "$"
                            };
                            var get = function(value) {
                                var results, hasMembers;
                                if (value == "$") {
                                    abort()
                                }
                                if (typeof value == "string") {
                                    if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                                        return value.slice(1)
                                    }
                                    if (value == "[") {
                                        results = [];
                                        for (;; hasMembers || (hasMembers = true)) {
                                            value = lex();
                                            if (value == "]") {
                                                break
                                            }
                                            if (hasMembers) {
                                                if (value == ",") {
                                                    value = lex();
                                                    if (value == "]") {
                                                        abort()
                                                    }
                                                } else {
                                                    abort()
                                                }
                                            }
                                            if (value == ",") {
                                                abort()
                                            }
                                            results.push(get(value))
                                        }
                                        return results
                                    } else if (value == "{") {
                                        results = {};
                                        for (;; hasMembers || (hasMembers = true)) {
                                            value = lex();
                                            if (value == "}") {
                                                break
                                            }
                                            if (hasMembers) {
                                                if (value == ",") {
                                                    value = lex();
                                                    if (value == "}") {
                                                        abort()
                                                    }
                                                } else {
                                                    abort()
                                                }
                                            }
                                            if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                                                abort()
                                            }
                                            results[value.slice(1)] = get(lex())
                                        }
                                        return results
                                    }
                                    abort()
                                }
                                return value
                            };
                            var update = function(source, property, callback) {
                                var element = walk(source, property, callback);
                                if (element === undef) {
                                    delete source[property]
                                } else {
                                    source[property] = element
                                }
                            };
                            var walk = function(source, property, callback) {
                                var value = source[property],
                                    length;
                                if (typeof value == "object" && value) {
                                    if (getClass.call(value) == arrayClass) {
                                        for (length = value.length; length--;) {
                                            update(value, length, callback)
                                        }
                                    } else {
                                        forEach(value, function(property) {
                                            update(value, property, callback)
                                        })
                                    }
                                }
                                return callback.call(source, property, value)
                            };
                            JSON3.parse = function(source, callback) {
                                var result, value;
                                Index = 0;
                                Source = "" + source;
                                result = get(lex());
                                if (lex() != "$") {
                                    abort()
                                }
                                Index = Source = null;
                                return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result
                            }
                        }
                    }
                    if (isLoader) {
                        define(function() {
                            return JSON3
                        })
                    }
                })(this)
            }, {}
        ],
        50: [
            function(_dereq_, module, exports) {
                module.exports = toArray;

                function toArray(list, index) {
                    var array = [];
                    index = index || 0;
                    for (var i = index || 0; i < list.length; i++) {
                        array[i - index] = list[i]
                    }
                    return array
                }
            }, {}
        ]
    }, {}, [1])(1)
});
! function(t, i, n, e) {
    "use strict";
    var r, o, s, a, l, h, c, u, p, d, f, m, y, w, v, g, b, x, S, P, C, N, k, H, T, A, M, z = [].indexOf || function(t) {
            for (var i = 0, n = this.length; n > i; i++)
                if (i in this && this[i] === t) return i;
            return -1
        };
    C = "notify", P = C + "", s = C + "!blank", k = {
        t: "top",
        m: "middle",
        b: "bottom",
        l: "left",
        c: "center",
        r: "right"
    }, y = ["l", "c", "r"], M = ["t", "m", "b"], b = ["t", "b", "l", "r"], x = {
        t: "b",
        m: null,
        b: "t",
        l: "r",
        c: null,
        r: "l"
    }, S = function(t) {
        var i;
        return i = [], n.each(t.split(/\W+/), function(t, n) {
            var e;
            return e = n.toLowerCase().charAt(0), k[e] ? i.push(e) : void 0
        }), i
    }, A = {}, a = {
        name: "core",
        html: '<div class="' + P + '-wrapper">\n  <div class="' + P + '-arrow"></div>\n  <div class="' + P + '-container"></div>\n</div>',
        css: "." + P + "-corner {\n  position: fixed;\n  margin: 20px;\n  z-index: 1050;\n}\n\n." + P + "-corner ." + P + "-wrapper,\n." + P + "-corner ." + P + "-container {\n  position: relative;\n  display: block;\n  height: inherit;\n  width: 395px;\n  margin: 3px;\n}\n\n." + P + "-wrapper {\n  z-index: 1;\n  position: absolute;\n  display: inline-block;\n  height: 0;\n  width: 0;\n}\n\n." + P + "-container {\n  display: none;\n  z-index: 1;\n  position: absolute;\n}\n\n." + P + "-hidable {\n  cursor: pointer;\n}\n\n[data-notify-text],[data-notify-html] {\n  position: relative;\n}\n\n." + P + "-arrow {\n  position: absolute;\n  z-index: 2;\n  width: 0;\n  height: 0;\n}"
    }, T = {
        "border-radius": ["-webkit-", "-moz-"]
    }, f = function(t) {
        return A[t]
    }, o = function(i, e) {
        var r, o, s, a;
        if (!i) throw "Missing Style name";
        if (!e) throw "Missing Style definition";
        if (!e.html) throw "Missing Style HTML";
        return (null != (a = A[i]) ? a.cssElem : void 0) && (t.console && console.warn("" + C + ": overwriting style '" + i + "'"), A[i].cssElem.remove()), e.name = i, A[i] = e, r = "", e.classes && n.each(e.classes, function(t, i) {
            return r += "." + P + "-" + e.name + "-" + t + " {\n", n.each(i, function(t, i) {
                return T[t] && n.each(T[t], function(n, e) {
                    return r += "  " + e + t + ": " + i + ";\n"
                }), r += "  " + t + ": " + i + ";\n"
            }), r += "}\n"
        }), e.css && (r += "/* styles for " + e.name + " */\n" + e.css), r && (e.cssElem = g(r), e.cssElem.attr("id", "notify-" + e.name)), s = {}, o = n(e.html), p("html", o, s), p("text", o, s), e.fields = s
    }, g = function(t) {
        var i;
        i = l("style"), i.attr("type", "text/css"), n("head").append(i);
        try {
            i.html(t)
        } catch (e) {
            i[0].styleSheet.cssText = t
        }
        return i
    }, p = function(t, i, e) {
        var r;
        return "html" !== t && (t = "text"), r = "data-notify-" + t, u(i, "[" + r + "]").each(function() {
            var i;
            return i = n(this).attr(r), i || (i = s), e[i] = t
        })
    }, u = function(t, i) {
        return t.is(i) ? t : t.find(i)
    }, N = {
        clickToHide: !0,
        autoHide: !0,
        autoHideDelay: 5e3,
        arrowShow: !0,
        arrowSize: 5,
        breakNewLines: !0,
        elementPosition: "bottom",
        globalPosition: "top right",
        style: "alert",
        className: "error",
        showAnimation: "slideDown",
        showDuration: 400,
        hideAnimation: "slideUp",
        hideDuration: 200,
        gap: 5
    }, v = function(t, i) {
        var e;
        return e = function() {}, e.prototype = t, n.extend(!0, new e, i)
    }, h = function(t) {
        return n.extend(N, t)
    }, l = function(t) {
        return n("<" + t + "></" + t + ">")
    }, m = {}, d = function(t) {
        var i;
        return t.is("[type=radio]") && (i = t.parents("form:first").find("[type=radio]").filter(function(i, e) {
            return n(e).attr("name") === t.attr("name")
        }), t = i.first()), t
    }, w = function(t, i, n) {
        var r, o;
        if ("string" == typeof n) n = parseInt(n, 10);
        else if ("number" != typeof n) return;
        if (!isNaN(n)) return r = k[x[i.charAt(0)]], o = i, t[r] !== e && (i = k[r.charAt(0)], n = -n), t[i] === e ? t[i] = n : t[i] += n, null
    }, H = function(t, i, n) {
        if ("l" === t || "t" === t) return 0;
        if ("c" === t || "m" === t) return n / 2 - i / 2;
        if ("r" === t || "b" === t) return n - i;
        throw "Invalid alignment"
    }, c = function(t) {
        return c.e = c.e || l("div"), c.e.text(t).html()
    }, r = function() {
        function t(t, i, e) {
            "string" == typeof e && (e = {
                className: e
            }), this.options = v(N, n.isPlainObject(e) ? e : {}), this.loadHTML(), this.wrapper = n(a.html), this.options.clickToHide && this.wrapper.addClass("" + P + "-hidable"), this.wrapper.data(P, this), this.arrow = this.wrapper.find("." + P + "-arrow"), this.container = this.wrapper.find("." + P + "-container"), this.container.append(this.userContainer), t && t.length && (this.elementType = t.attr("type"), this.originalElement = t, this.elem = d(t), this.elem.data(P, this), this.elem.before(this.wrapper)), this.container.hide(), this.run(i)
        }
        return t.prototype.loadHTML = function() {
            var t;
            return t = this.getStyle(), this.userContainer = n(t.html), this.userFields = t.fields
        }, t.prototype.show = function(t, i) {
            var n, e, r, o, s, a = this;
            if (e = function() {
                return t || a.elem || a.destroy(), i ? i() : void 0
            }, s = this.container.parent().parents(":hidden").length > 0, r = this.container.add(this.arrow), n = [], s && t) o = "show";
            else if (s && !t) o = "hide";
            else if (!s && t) o = this.options.showAnimation, n.push(this.options.showDuration);
            else {
                if (s || t) return e();
                o = this.options.hideAnimation, n.push(this.options.hideDuration)
            }
            return n.push(e), r[o].apply(r, n)
        }, t.prototype.setGlobalPosition = function() {
            var t, i, e, r, o, s, a, h;
            return h = this.getPosition(), a = h[0], s = h[1], o = k[a], t = k[s], r = a + "|" + s, i = m[r], i || (i = m[r] = l("div"), e = {}, e[o] = 0, "middle" === t ? e.top = "45%" : "center" === t ? e.left = "45%" : e[t] = 0, i.css(e).addClass("" + P + "-corner"), n("body").append(i)), i.prepend(this.wrapper)
        }, t.prototype.setElementPosition = function() {
            var t, i, e, r, o, s, a, l, h, c, u, p, d, f, m, v, g, S, P, C, N, T, A, D, E, j, L, O, I;
            for (A = this.getPosition(), C = A[0], S = A[1], P = A[2], u = this.elem.position(), l = this.elem.outerHeight(), p = this.elem.outerWidth(), h = this.elem.innerHeight(), c = this.elem.innerWidth(), D = this.wrapper.position(), o = this.container.height(), s = this.container.width(), f = k[C], v = x[C], g = k[v], a = {}, a[g] = "b" === C ? l : "r" === C ? p : 0, w(a, "top", u.top - D.top), w(a, "left", u.left - D.left), I = ["top", "left"], E = 0, L = I.length; L > E; E++) N = I[E], m = parseInt(this.elem.css("margin-" + N), 10), m && w(a, N, m);
            if (d = Math.max(0, this.options.gap - (this.options.arrowShow ? e : 0)), w(a, g, d), this.options.arrowShow) {
                for (e = this.options.arrowSize, i = n.extend({}, a), t = this.userContainer.css("border-color") || this.userContainer.css("background-color") || "white", j = 0, O = b.length; O > j; j++) N = b[j], T = k[N], N !== v && (r = T === f ? t : "transparent", i["border-" + T] = "" + e + "px solid " + r);
                w(a, k[v], e), z.call(b, S) >= 0 && w(i, k[S], 2 * e)
            } else this.arrow.hide();
            return z.call(M, C) >= 0 ? (w(a, "left", H(S, s, p)), i && w(i, "left", H(S, e, c))) : z.call(y, C) >= 0 && (w(a, "top", H(S, o, l)), i && w(i, "top", H(S, e, h))), this.container.is(":visible") && (a.display = "block"), this.container.removeAttr("style").css(a), i ? this.arrow.removeAttr("style").css(i) : void 0
        }, t.prototype.getPosition = function() {
            var t, i, n, e, r, o, s, a;
            if (i = this.options.position || (this.elem ? this.options.elementPosition : this.options.globalPosition), t = S(i), 0 === t.length && (t[0] = "b"), n = t[0], z.call(b, n) < 0) throw "Must be one of [" + b + "]";
            return (1 === t.length || (e = t[0], z.call(M, e) >= 0 && (r = t[1], z.call(y, r) < 0)) || (o = t[0], z.call(y, o) >= 0 && (s = t[1], z.call(M, s) < 0))) && (t[1] = (a = t[0], z.call(y, a) >= 0 ? "m" : "l")), 2 === t.length && (t[2] = t[1]), t
        }, t.prototype.getStyle = function(t) {
            var i;
            if (t || (t = this.options.style), t || (t = "default"), i = A[t], !i) throw "Missing style: " + t;
            return i
        }, t.prototype.updateClasses = function() {
            var t, i;
            return t = ["base"], n.isArray(this.options.className) ? t = t.concat(this.options.className) : this.options.className && t.push(this.options.className), i = this.getStyle(), t = n.map(t, function(t) {
                return "" + P + "-" + i.name + "-" + t
            }).join(" "), this.userContainer.attr("class", t)
        }, t.prototype.run = function(t, i) {
            var e, r, o, a, l, h = this;
            if (n.isPlainObject(i) ? n.extend(this.options, i) : "string" === n.type(i) && (this.options.className = i), this.container && !t) return void this.show(!1);
            if (this.container || t) {
                r = {}, n.isPlainObject(t) ? r = t : r[s] = t;
                for (o in r) e = r[o], a = this.userFields[o], a && ("text" === a && (e = c(e), this.options.breakNewLines && (e = e.replace(/\n/g, "<br/>"))), l = o === s ? "" : "=" + o, u(this.userContainer, "[data-notify-" + a + l + "]").html(e));
                return this.updateClasses(), this.elem ? this.setElementPosition() : this.setGlobalPosition(), this.show(!0), this.options.autoHide ? (clearTimeout(this.autohideTimer), this.autohideTimer = setTimeout(function() {
                    return h.show(!1)
                }, this.options.autoHideDelay)) : void 0
            }
        }, t.prototype.destroy = function() {
            return this.wrapper.remove()
        }, t
    }(), n[C] = function(t, i, e) {
        return t && t.nodeName || t.jquery ? n(t)[C](i, e) : (e = i, i = t, new r(null, i, e)), t
    }, n.fn[C] = function(t, i) {
        return n(this).each(function() {
            var e;
            return e = d(n(this)).data(P), e ? e.run(t, i) : new r(n(this), t, i)
        }), this
    }, n.extend(n[C], {
        defaults: h,
        addStyle: o,
        pluginOptions: N,
        getStyle: f,
        insertCSS: g
    }), n(function() {
        return g(a.css).attr("id", "core-notify"), n(i).on("click", "." + P + "-hidable", function() {
            return n(this).trigger("notify-hide")
        }), n(i).on("notify-hide", "." + P + "-wrapper", function() {
            var t;
            return null != (t = n(this).data(P)) ? t.show(!1) : void 0
        })
    })
}(window, document, jQuery), $.notify.addStyle("alert", {
    html: "<div>\n<span data-notify-text=''></span>\n</div>"
});
(function(d) {
    var g = {
        type: "html",
        content: "",
        url: "",
        ajax: {},
        ajax_request: null,
        closeOnEsc: !0,
        closeOnOverlayClick: !0,
        clone: !1,
        overlay: {
            block: void 0,
            tpl: '<div class="arcticmodal-overlay"></div>',
            css: {
                backgroundColor: "#000",
                opacity: .6
            }
        },
        container: {
            block: void 0,
            tpl: '<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>'
        },
        wrap: void 0,
        body: void 0,
        errors: {
            tpl: '<div class="arcticmodal-error arcticmodal-close"></div>',
            autoclose_delay: 2e3,
            ajax_unsuccessful_load: "Error"
        },
        openEffect: {
            type: "fade",
            speed: 400
        },
        closeEffect: {
            type: "fade",
            speed: 400
        },
        beforeOpen: d.noop,
        afterOpen: d.noop,
        beforeClose: d.noop,
        afterClose: d.noop,
        afterLoading: d.noop,
        afterLoadingOnShow: d.noop,
        errorLoading: d.noop
    }, j = 0,
        e = d([]),
        m = {
            isEventOut: function(a, b) {
                var c = !0;
                d(a).each(function() {
                    d(b.target).get(0) == d(this).get(0) && (c = !1);
                    0 == d(b.target).closest("HTML", d(this).get(0)).length && (c = !1)
                });
                return c
            }
        }, f = {
            getParentEl: function(a) {
                var b = d(a);
                return b.data("arcticmodal") ? b : (b = d(a).closest(".arcticmodal-container").data("arcticmodalParentEl")) ? b : !1
            },
            transition: function(a, b, c, e) {
                e = void 0 == e ? d.noop : e;
                switch (c.type) {
                    case "fade":
                        "show" == b ? a.fadeIn(c.speed, e) : a.fadeOut(c.speed, e);
                        break;
                    case "none":
                        "show" == b ? a.show() : a.hide(), e()
                }
            },
            prepare_body: function(a, b) {
                d(".arcticmodal-close", a.body).unbind("click.arcticmodal").bind("click.arcticmodal", function() {
                    b.arcticmodal("close");
                    return !1
                })
            },
            init_el: function(a, b) {
                var c = a.data("arcticmodal");
                if (!c) {
                    c = b;
                    j++;
                    c.modalID = j;
                    c.overlay.block = d(c.overlay.tpl);
                    c.overlay.block.css(c.overlay.css);
                    c.container.block = d(c.container.tpl);
                    c.body = d(".arcticmodal-container_i2", c.container.block);
                    b.clone ? c.body.html(a.clone(!0)) : (a.before('<div id="arcticmodalReserve' + c.modalID + '" style="display: none" />'), c.body.html(a));
                    f.prepare_body(c, a);
                    c.closeOnOverlayClick && c.overlay.block.add(c.container.block).click(function(b) {
                        m.isEventOut(d(">*", c.body), b) && a.arcticmodal("close")
                    });
                    c.container.block.data("arcticmodalParentEl", a);
                    a.data("arcticmodal", c);
                    e = d.merge(e, a);
                    d.proxy(h.show, a)();
                    if ("html" == c.type) return a;
                    if (void 0 != c.ajax.beforeSend) {
                        var k = c.ajax.beforeSend;
                        delete c.ajax.beforeSend
                    }
                    if (void 0 != c.ajax.success) {
                        var g = c.ajax.success;
                        delete c.ajax.success
                    }
                    if (void 0 != c.ajax.error) {
                        var l = c.ajax.error;
                        delete c.ajax.error
                    }
                    var n = d.extend(!0, {
                        url: c.url,
                        beforeSend: function() {
                            void 0 == k ? c.body.html('<div class="arcticmodal-loading" />') : k(c, a)
                        },
                        success: function(b) {
                            a.trigger("afterLoading");
                            c.afterLoading(c, a, b);
                            void 0 == g ? c.body.html(b) : g(c, a, b);
                            f.prepare_body(c, a);
                            a.trigger("afterLoadingOnShow");
                            c.afterLoadingOnShow(c, a, b)
                        },
                        error: function() {
                            a.trigger("errorLoading");
                            c.errorLoading(c, a);
                            void 0 == l ? (c.body.html(c.errors.tpl), d(".arcticmodal-error", c.body).html(c.errors.ajax_unsuccessful_load), d(".arcticmodal-close", c.body).click(function() {
                                a.arcticmodal("close");
                                return !1
                            }), c.errors.autoclose_delay && setTimeout(function() {
                                a.arcticmodal("close")
                            }, c.errors.autoclose_delay)) : l(c, a)
                        }
                    }, c.ajax);
                    c.ajax_request = d.ajax(n);
                    a.data("arcticmodal", c)
                }
            },
            init: function(a) {
                a = d.extend(!0, {}, g, a);
                if (d.isFunction(this))
                    if (void 0 == a) d.error("jquery.arcticmodal: Uncorrect parameters");
                    else if ("" == a.type) d.error('jquery.arcticmodal: Don\'t set parameter "type"');
                else switch (a.type) {
                    case "html":
                        if ("" == a.content) {
                            d.error('jquery.arcticmodal: Don\'t set parameter "content"');
                            break
                        }
                        var b = a.content;
                        a.content = "";
                        return f.init_el(d(b), a);
                    case "ajax":
                        if ("" == a.url) {
                            d.error('jquery.arcticmodal: Don\'t set parameter "url"');
                            break
                        }
                        return f.init_el(d("<div />"), a)
                } else return this.each(function() {
                    f.init_el(d(this), d.extend(!0, {}, a))
                })
            }
        }, h = {
            show: function() {
                var a = f.getParentEl(this);
                if (!1 === a) d.error("jquery.arcticmodal: Uncorrect call");
                else {
                    var b = a.data("arcticmodal");
                    b.overlay.block.hide();
                    b.container.block.hide();
                    d("BODY").append(b.overlay.block);
                    d("BODY").append(b.container.block);
                    b.beforeOpen(b, a);
                    a.trigger("beforeOpen");
                    if ("hidden" != b.wrap.css("overflow")) {
                        b.wrap.data("arcticmodalOverflow", b.wrap.css("overflow"));
                        var c = b.wrap.outerWidth(!0);
                        b.wrap.css("overflow", "hidden");
                        var g = b.wrap.outerWidth(!0);
                        g != c && b.wrap.css("marginRight", g - c + "px")
                    }
                    e.not(a).each(function() {
                        d(this).data("arcticmodal").overlay.block.hide()
                    });
                    f.transition(b.overlay.block, "show", 1 < e.length ? {
                        type: "none"
                    } : b.openEffect);
                    f.transition(b.container.block, "show", 2 < e.length ? {
                        type: "none"
                    } : b.openEffect, function() {
                        b.afterOpen(b, a);
                        a.trigger("afterOpen")
                    });
                    return a
                }
            },
            close: function() {
                if (d.isFunction(this)) e.each(function() {
                    d(this).arcticmodal("close")
                });
                else return this.each(function() {
                    var a = f.getParentEl(this);
                    if (!1 === a) d.error("jquery.arcticmodal: Uncorrect call");
                    else {
                        var b = a.data("arcticmodal");
                        !1 !== b.beforeClose(b, a) && (a.trigger("beforeClose"), e.not(a).last().each(function() {
                            d(this).data("arcticmodal").overlay.block.show()
                        }), f.transition(b.overlay.block, "hide", 1 < e.length ? {
                            type: "none"
                        } : b.closeEffect), f.transition(b.container.block, "hide", 1 < e.length ? {
                            type: "none"
                        } : b.closeEffect, function() {
                            b.afterClose(b, a);
                            a.trigger("afterClose");
                            b.clone || d("#arcticmodalReserve" + b.modalID).replaceWith(b.body.find(">*"));
                            b.overlay.block.remove();
                            b.container.block.remove();
                            a.data("arcticmodal", null);
                            d(".arcticmodal-container").length || (b.wrap.data("arcticmodalOverflow") && b.wrap.css("overflow", b.wrap.data("arcticmodalOverflow")), b.wrap.css("marginRight", 0))
                        }), "ajax" == b.type && b.ajax_request.abort(), e = e.not(a))
                    }
                })
            },
            setDefault: function(a) {
                d.extend(!0, g, a)
            }
        };
    d(function() {
        g.wrap = d(document.all && !document.querySelector ? "html" : "body")
    });
    d(document).bind("keyup.arcticmodal", function(a) {
        var b = e.last();
        b.length && b.data("arcticmodal").closeOnEsc && 27 === a.keyCode && b.arcticmodal("close")
    });
    d.arcticmodal = d.fn.arcticmodal = function(a) {
        if (h[a]) return h[a].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === typeof a || !a) return f.init.apply(this, arguments);
        d.error("jquery.arcticmodal: Method " + a + " does not exist")
    }
})(jQuery);
var hexcase = 0;

function hex_md5(a) {
    return rstr2hex(rstr_md5(str2rstr_utf8(a)))
}

function hex_hmac_md5(a, b) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b)))
}

function md5_vm_test() {
    return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
}

function rstr_md5(a) {
    return binl2rstr(binl_md5(rstr2binl(a), a.length * 8))
}

function rstr_hmac_md5(c, f) {
    var e = rstr2binl(c);
    if (e.length > 16) {
        e = binl_md5(e, c.length * 8)
    }
    var a = Array(16),
        d = Array(16);
    for (var b = 0; b < 16; b++) {
        a[b] = e[b] ^ 909522486;
        d[b] = e[b] ^ 1549556828
    }
    var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8);
    return binl2rstr(binl_md5(d.concat(g), 512 + 128))
}

function rstr2hex(c) {
    try {
        hexcase
    } catch (g) {
        hexcase = 0
    }
    var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var b = "";
    var a;
    for (var d = 0; d < c.length; d++) {
        a = c.charCodeAt(d);
        b += f.charAt(a >>> 4 & 15) + f.charAt(a & 15)
    }
    return b
}

function str2rstr_utf8(c) {
    var b = "";
    var d = -1;
    var a, e;
    while (++d < c.length) {
        a = c.charCodeAt(d);
        e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0;
        if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) {
            a = 65536 + ((a & 1023) << 10) + (e & 1023);
            d++
        }
        if (a <= 127) {
            b += String.fromCharCode(a)
        } else {
            if (a <= 2047) {
                b += String.fromCharCode(192 | a >>> 6 & 31, 128 | a & 63)
            } else {
                if (a <= 65535) {
                    b += String.fromCharCode(224 | a >>> 12 & 15, 128 | a >>> 6 & 63, 128 | a & 63)
                } else {
                    if (a <= 2097151) {
                        b += String.fromCharCode(240 | a >>> 18 & 7, 128 | a >>> 12 & 63, 128 | a >>> 6 & 63, 128 | a & 63)
                    }
                }
            }
        }
    }
    return b
}

function rstr2binl(b) {
    var a = Array(b.length >> 2);
    for (var c = 0; c < a.length; c++) {
        a[c] = 0
    }
    for (var c = 0; c < b.length * 8; c += 8) {
        a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << c % 32
    }
    return a
}

function binl2rstr(b) {
    var a = "";
    for (var c = 0; c < b.length * 32; c += 8) {
        a += String.fromCharCode(b[c >> 5] >>> c % 32 & 255)
    }
    return a
}

function binl_md5(p, k) {
    p[k >> 5] |= 128 << k % 32;
    p[(k + 64 >>> 9 << 4) + 14] = k;
    var o = 1732584193;
    var n = -271733879;
    var m = -1732584194;
    var l = 271733878;
    for (var g = 0; g < p.length; g += 16) {
        var j = o;
        var h = n;
        var f = m;
        var e = l;
        o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936);
        l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586);
        m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819);
        n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330);
        o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897);
        l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426);
        m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341);
        n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983);
        o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416);
        l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417);
        m = md5_ff(m, l, o, n, p[g + 10], 17, -42063);
        n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162);
        o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682);
        l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101);
        m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290);
        n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329);
        o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510);
        l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632);
        m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713);
        n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302);
        o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691);
        l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083);
        m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335);
        n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848);
        o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438);
        l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690);
        m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961);
        n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501);
        o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467);
        l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784);
        m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473);
        n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734);
        o = md5_hh(o, n, m, l, p[g + 5], 4, -378558);
        l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463);
        m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562);
        n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556);
        o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060);
        l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353);
        m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632);
        n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640);
        o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174);
        l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222);
        m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979);
        n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189);
        o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487);
        l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835);
        m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520);
        n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651);
        o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844);
        l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415);
        m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905);
        n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055);
        o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571);
        l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606);
        m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523);
        n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799);
        o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359);
        l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744);
        m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380);
        n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649);
        o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070);
        l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379);
        m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259);
        n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551);
        o = safe_add(o, j);
        n = safe_add(n, h);
        m = safe_add(m, f);
        l = safe_add(l, e)
    }
    return Array(o, n, m, l)
}

function md5_cmn(h, e, d, c, g, f) {
    return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
}

function md5_ff(g, f, k, j, e, i, h) {
    return md5_cmn(f & k | ~f & j, g, f, e, i, h)
}

function md5_gg(g, f, k, j, e, i, h) {
    return md5_cmn(f & j | k & ~j, g, f, e, i, h)
}

function md5_hh(g, f, k, j, e, i, h) {
    return md5_cmn(f ^ k ^ j, g, f, e, i, h)
}

function md5_ii(g, f, k, j, e, i, h) {
    return md5_cmn(k ^ (f | ~j), g, f, e, i, h)
}

function safe_add(a, d) {
    var c = (a & 65535) + (d & 65535);
    var b = (a >> 16) + (d >> 16) + (c >> 16);
    return b << 16 | c & 65535
}

function bit_rol(a, b) {
    return a << b | a >>> 32 - b
}(function($) {
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
                opacity: 1
            },
            html: number
        });
        digit.before(replacement).removeClass("static").animate({
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
jQuery && function(e) {
    function t(t, i) {
        var s = t ? e(this) : i,
            o = e(s.attr("data-dropdown")),
            u = s.hasClass("dropdown-open");
        if (t) {
            if (e(t.target).hasClass("dropdown-ignore")) return;
            t.preventDefault();
            t.stopPropagation()
        } else if (s !== i.target && e(i.target).hasClass("dropdown-ignore")) return;

        n();
        if (u || s.hasClass("dropdown-disabled")) return;
        s.addClass("dropdown-open");
        o.data("dropdown-trigger", s).show();
        r();
        o.trigger("show", {
            dropdown: o,
            trigger: s
        })
    }

    function n(t) {
        var n = t ? e(t.target).parents().addBack() : null;
        if (n && n.is(".dropdown")) {
            if (!n.is(".dropdown-menu")) return;
            if (!n.is("A")) return
        }
        e(document).find(".dropdown:visible").each(function() {
            var t = e(this);
            t.hide().removeData("dropdown-trigger").trigger("hide", {
                dropdown: t
            })
        });
        e(document).find(".dropdown-open").removeClass("dropdown-open")
    }

    function r() {
        var t = e(".dropdown:visible").eq(0),
            n = t.data("dropdown-trigger"),
            r = n ? parseInt(n.attr("data-horizontal-offset") || 0, 10) : null,
            i = n ? parseInt(n.attr("data-vertical-offset") || 0, 10) : null;
        if (t.length === 0 || !n) return;
        t.hasClass("dropdown-relative") ? t.css({
            left: t.hasClass("dropdown-anchor-right") ? n.position().left - (t.outerWidth(!0) - n.outerWidth(!0)) - parseInt(n.css("margin-right"), 10) + r : n.position().left + parseInt(n.css("margin-left"), 10) + r,
            top: n.position().top + n.outerHeight(!0) - parseInt(n.css("margin-top"), 10) + i
        }) : t.css({
            left: t.hasClass("dropdown-anchor-right") ? n.offset().left - (t.outerWidth() - n.outerWidth()) + r : n.offset().left + r,
            top: n.offset().top + n.outerHeight() + i
        })
    }
    e.extend(e.fn, {
        dropdown: function(r, i) {
            switch (r) {
                case "show":
                    t(null, e(this));
                    return e(this);
                case "hide":
                    n();
                    return e(this);
                case "attach":
                    return e(this).attr("data-dropdown", i);
                case "detach":
                    n();
                    return e(this).removeAttr("data-dropdown");
                case "disable":
                    return e(this).addClass("dropdown-disabled");
                case "enable":
                    n();
                    return e(this).removeClass("dropdown-disabled")
            }
        }
    });
    e(document).on("click.dropdown", "[data-dropdown]", t);
    e(document).on("click.dropdown", n);
    e(window).on("resize", r)
}(jQuery);
