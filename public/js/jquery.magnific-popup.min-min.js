! function(e) {"function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto) }(function(e) {
    var t, n, i, o, r, a, s ="Close",
        l ="BeforeClose",
        c ="MarkupParse",
        d ="Open",
        u ="Change",
        p ="mfp",
        f ="." + p,
        m ="mfp-ready",
        g ="mfp-removing",
        v ="mfp-prevent-close",
        h = function() {},
        y = !!window.jQuery,
        C = e(window),
        w = function(e, n) { t.ev.on(p + e + f, n) },
        b = function(t, n, i, o) { var r = document.createElement("div"); return r.className ="mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r },
        I = function(n, i) { t.ev.triggerHandler(p + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i])) },
        x = function(n) { return n === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), a = n), t.currTemplate.closeBtn },
        k = function() { e.magnificPopup.instance || (t = new h, t.init(), e.magnificPopup.instance = t) },
        T = function() {
            var e = document.createElement("p").style,
                t = ["ms","O","Moz","Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() +"Transition" in e) return !0;
            return !1
        };
    h.prototype = {
        constructor: h,
        init: function() {
            var n = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = T(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = e(document), t.popupsCache = {}
        },
        open: function(n) {
            var o;
            if (!1 === n.isObj) {
                t.items = n.items.toArray(), t.index = 0;
                var a, s = n.items;
                for (o = 0; o < s.length; o++)
                    if (a = s[o], a.parsed && (a = a.el[0]), a === n.el[0]) { t.index = o; break }
            } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
            if (t.isOpen) return void t.updateItemHTML();
            t.types = [], r ="", n.mainEl && n.mainEl.length ? t.ev = n.mainEl.eq(0) : t.ev = i, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos ="auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = b("bg").on("click" + f, function() { t.close() }), t.wrap = b("wrap").attr("tabindex", -1).on("click" + f, function(e) { t._checkIfClose(e.target) && t.close() }), t.container = b("container", t.wrap)), t.contentContainer = b("content"), t.st.preloader && (t.preloader = b("preloader", t.container, t.st.tLoading));
            var l = e.magnificPopup.modules;
            for (o = 0; o < l.length; o++) {
                var u = l[o];
                u = u.charAt(0).toUpperCase() + u.slice(1), t["init" + u].call(t)
            }
            I("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (w(c, function(e, t, n, i) { n.close_replaceWith = x(i.type) }), r +=" mfp-close-btn-in") : t.wrap.append(x())), t.st.alignTop && (r +=" mfp-align-top"), t.fixedContentPos ? t.wrap.css({ overflow: t.st.overflowY, overflowX:"hidden", overflowY: t.st.overflowY }) : t.wrap.css({ top: C.scrollTop(), position:"absolute" }), (!1 === t.st.fixedBgPos ||"auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({ height: i.height(), position:"absolute" }), t.st.enableEscapeKey && i.on("keyup" + f, function(e) { 27 === e.keyCode && t.close() }), C.on("resize" + f, function() { t.updateSize() }), t.st.closeOnContentClick || (r +=" mfp-auto-cursor"), r && t.wrap.addClass(r);
            var p = t.wH = C.height(),
                g = {};
            if (t.fixedContentPos && t._hasScrollBar(p)) {
                var v = t._getScrollbarSize();
                v && (g.marginRight = v)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow","hidden") : g.overflow ="hidden");
            var h = t.st.mainClass;
            return t.isIE7 && (h +=" mfp-ie7"), h && t._addClassToMFP(h), t.updateItemHTML(), I("BuildControls"), e("html").css(g), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function() { t.content ? (t._addClassToMFP(m), t._setFocus()) : t.bgOverlay.addClass(m), i.on("focusin" + f, t._onFocusIn) }, 16), t.isOpen = !0, t.updateSize(p), I(d), n
        },
        close: function() { t.isOpen && (I(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(g), setTimeout(function() { t._close() }, t.st.removalDelay)) : t._close()) },
        _close: function() {
            I(s);
            var n = g +"" + m +"";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass +""), t._removeClassFromMFP(n), t.fixedContentPos) {
                var o = { marginRight:"" };
                t.isIE7 ? e("body, html").css("overflow","") : o.overflow ="", e("html").css(o)
            }
            i.off("keyup.mfp focusin" + f), t.ev.off(f), t.wrap.attr("class","mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class","mfp-bg"), t.container.attr("class","mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, I("AfterClose")
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || C.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), I("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (I("BeforeChange", [t.currItem ? t.currItem.type :"", i]), t.currItem = n, !t.currTemplate[i]) {
                var r = !!t.st[i] && t.st[i].markup;
                I("FirstMarkupParse", r), t.currTemplate[i] = !r || e(r)
            }
            o && o !== n.type && t.container.removeClass("mfp-" + o +"-holder");
            var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
            t.appendContent(a, i), n.preloaded = !0, I(u, n), o = n.type, t.container.prepend(t.contentContainer), I("AfterChange")
        },
        appendContent: function(e, n) { t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[n] ? t.content.find(".mfp-close").length || t.content.append(x()) : t.content = e : t.content ="", I("BeforeAppend"), t.container.addClass("mfp-" + n +"-holder"), t.contentContainer.append(t.content) },
        parseEl: function(n) {
            var i, o = t.items[n];
            if (o.tagName ? o = { el: e(o) } : (i = o.type, o = { data: o, src: o.src }), o.el) {
                for (var r = t.types, a = 0; a < r.length; a++)
                    if (o.el.hasClass("mfp-" + r[a])) { i = r[a]; break }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = i || t.st.type ||"inline", o.index = n, o.parsed = !0, t.items[n] = o, I("ElementParse", o), t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) { i.mfpEl = this, t._openClick(i, e, n) };
            n || (n = {});
            var o ="click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
        },
        _openClick: function(n, i, o) {
            if ((void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick) || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
                var r = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (r)
                    if (e.isFunction(r)) { if (!r.call(t)) return !0 } else if (C.width() < r) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), i ||"loading" !== e || (i = t.st.tLoading);
                var o = { status: e, text: i };
                I("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", function(e) { e.stopImmediatePropagation() }), t.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(v)) {
                var i = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (i && o) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) { if (i) return !0 } else if (o && e.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) { t.bgOverlay.addClass(e), t.wrap.addClass(e) },
        _removeClassFromMFP: function(e) { this.bgOverlay.removeClass(e), t.wrap.removeClass(e) },
        _hasScrollBar: function(e) { return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || C.height()) },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(n) { return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1) },
        _parseMarkup: function(t, n, i) {
            var o;
            i.data && (n = e.extend(i.data, n)), I(c, [t, n, i]), e.each(n, function(n, i) { if (void 0 === i || !1 === i) return !0; if (o = n.split("_"), o.length > 1) { var r = t.find(f +"-" + o[0]); if (r.length > 0) { var a = o[1];"replaceWith" === a ? r[0] !== i[0] && r.replaceWith(i) :"img" === a ? r.is("img") ? r.attr("src", i) : r.replaceWith(e("<img>").attr("src", i).attr("class", r.attr("class"))) : r.attr(o[1], i) } } else t.find(f +"-" + n).html(i) })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText ="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = { instance: null, proto: h.prototype, modules: [], open: function(t, n) { return k(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t) }, close: function() { return e.magnificPopup.instance && e.magnificPopup.instance.close() }, registerModule: function(t, n) { n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t) }, defaults: { disableOn: 0, key: null, midClick: !1, mainClass:"", preloader: !0, focus:"", closeOnContentClick: !1, closeOnBgClick: !0, closeBtnInside: !0, showCloseBtn: !0, enableEscapeKey: !0, modal: !1, alignTop: !1, removalDelay: 0, prependTo: null, fixedContentPos:"auto", fixedBgPos:"auto", overflowY:"auto", closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>', tClose:"Close (Esc)", tLoading:"Loading...", autoFocusLast: !0 } }, e.fn.magnificPopup = function(n) {
        k();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var o, r = y ? i.data("magnificPopup") : i[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[a] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), t._openClick({ mfpEl: o }, i, r)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
        else n = e.extend(!0, {}, n), y ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
        return i
    };
    var _, P, S, E ="inline",
        z = function() { S && (P.after(S.addClass(_)).detach(), S = null) };
    e.magnificPopup.registerModule(E, {
        options: { hiddenClass:"hide", markup:"", tNotFound:"Content not found" },
        proto: {
            initInline: function() { t.types.push(E), w(s +"." + E, function() { z() }) },
            getInline: function(n, i) {
                if (z(), n.src) {
                    var o = t.st.inline,
                        r = e(n.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (P || (_ = o.hiddenClass, P = b(_), _ ="mfp-" + _), S = r.after(P).detach().removeClass(_)), t.updateStatus("ready")
                    } else t.updateStatus("error", o.tNotFound), r = e("<div>");
                    return n.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
            }
        }
    });
    var O, M ="ajax",
        B = function() { O && e(document.body).removeClass(O) },
        L = function() { B(), t.req && t.req.abort() };
    e.magnificPopup.registerModule(M, {
        options: { settings: null, cursor:"mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
        proto: {
            initAjax: function() { t.types.push(M), O = t.st.ajax.cursor, w(s +"." + M, L), w("BeforeChange." + M, L) },
            getAjax: function(n) {
                O && e(document.body).addClass(O), t.updateStatus("loading");
                var i = e.extend({
                    url: n.src,
                    success: function(i, o, r) {
                        var a = { data: i, xhr: r };
                        I("ParseAjax", a), t.appendContent(e(a.data), M), n.finished = !0, B(), t._setFocus(), setTimeout(function() { t.wrap.addClass(m) }, 16), t.updateStatus("ready"), I("AjaxContentAdded")
                    },
                    error: function() { B(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src)) }
                }, t.st.ajax.settings);
                return t.req = e.ajax(i),""
            }
        }
    });
    var H, A = function(n) { if (n.data && void 0 !== n.data.title) return n.data.title; var i = t.st.image.titleSrc; if (i) { if (e.isFunction(i)) return i.call(t, n); if (n.el) return n.el.attr(i) ||"" } return"" };
    e.magnificPopup.registerModule("image", {
        options: { markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>', cursor:"mfp-zoom-out-cur", titleSrc:"title", verticalFit: !0, tError: '<a href="%url%">The image</a> could not be loaded.' },
        proto: {
            initImage: function() {
                var n = t.st.image,
                    i =".image";
                t.types.push("image"), w(d + i, function() {"image" === t.currItem.type && n.cursor && e(document.body).addClass(n.cursor) }), w(s + i, function() { n.cursor && e(document.body).removeClass(n.cursor), C.off("resize" + f) }), w("Resize" + i, t.resizeImage), t.isLowIE && w("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) { e.img && (e.hasSize = !0, H && clearInterval(H), e.isCheckingImgSize = !1, I("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1)) },
            findImageSize: function(e) {
                var n = 0,
                    i = e.img[0],
                    o = function(r) { H && clearInterval(H), H = setInterval(function() { return i.naturalWidth > 0 ? void t._onImageHasSize(e) : (n > 200 && clearInterval(H), n++, void(3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500))) }, r) };
                o(1)
            },
            getImage: function(n, i) {
                var o = 0,
                    r = function() { n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, I("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : a())) },
                    a = function() { n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0) },
                    s = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className ="mfp-img", n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")), n.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return t._parseMarkup(i, { title: A(n), img_replaceWith: n.img }, n), t.resizeImage(), n.hasSize ? (H && clearInterval(H), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
            }
        }
    });
    var F, j = function() { return void 0 === F && (F = void 0 !== document.createElement("p").style.MozTransform), F };
    e.magnificPopup.registerModule("zoom", {
        options: { enabled: !1, easing:"ease-in-out", duration: 300, opener: function(e) { return e.is("img") ? e : e.find("img") } },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom,
                    i =".zoom";
                if (n.enabled && t.supportsTransition) {
                    var o, r, a = n.duration,
                        c = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i ="all" + n.duration / 1e3 +"s" + n.easing,
                                o = { position:"fixed", zIndex: 9999, left: 0, top: 0,"-webkit-backface-visibility":"hidden" },
                                r ="transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
                        },
                        d = function() { t.content.css("visibility","visible") };
                    w("BuildControls" + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content.css("visibility","hidden"), !(e = t._getItemToZoom())) return void d();
                            r = c(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function() { r.css(t._getOffset(!0)), o = setTimeout(function() { d(), setTimeout(function() { r.remove(), e = r = null, I("ZoomAnimationEnded") }, 16) }, a) }, 16)
                        }
                    }), w(l + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay = a, !e) {
                                if (!(e = t._getItemToZoom())) return;
                                r = c(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility","hidden"), setTimeout(function() { r.css(t._getOffset()) }, 16)
                        }
                    }), w(s + i, function() { t._allowZoom() && (d(), r && r.remove(), e = null) })
                }
            },
            _allowZoom: function() { return"image" === t.currItem.type },
            _getItemToZoom: function() { return !!t.currItem.hasSize && t.currItem.img },
            _getOffset: function(n) {
                var i;
                i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var o = i.offset(),
                    r = parseInt(i.css("padding-top"), 10),
                    a = parseInt(i.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var s = { width: i.width(), height: (y ? i.innerHeight() : i[0].offsetHeight) - a - r };
                return j() ? s["-moz-transform"] = s.transform ="translate(" + o.left +"px," + o.top +"px)" : (s.left = o.left, s.top = o.top), s
            }
        }
    });
    var N ="iframe",
        W ="//about:blank",
        Z = function(e) {
            if (t.currTemplate[N]) {
                var n = t.currTemplate[N].find("iframe");
                n.length && (e || (n[0].src = W), t.isIE8 && n.css("display", e ?"block" :"none"))
            }
        };
    e.magnificPopup.registerModule(N, {
        options: { markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>', srcAction:"iframe_src", patterns: { youtube: { index:"youtube.com", id:"v=", src:"//www.youtube.com/embed/%id%?autoplay=1" }, vimeo: { index:"vimeo.com/", id:"/", src:"//player.vimeo.com/video/%id%?autoplay=1" }, gmaps: { index:"//maps.google.", src:"%id%&output=embed" } } },
        proto: {
            initIframe: function() { t.types.push(N), w("BeforeChange", function(e, t, n) { t !== n && (t === N ? Z() : n === N && Z(!0)) }), w(s +"." + N, function() { Z() }) },
            getIframe: function(n, i) {
                var o = n.src,
                    r = t.st.iframe;
                e.each(r.patterns, function() { return o.indexOf(this.index) > -1 ? (this.id && (o ="string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0 });
                var a = {};
                return r.srcAction && (a[r.srcAction] = o), t._parseMarkup(i, a, n), t.updateStatus("ready"), i
            }
        }
    });
    var q = function(e) { var n = t.items.length; return e > n - 1 ? e - n : 0 > e ? n + e : e },
        R = function(e, t, n) { return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n) };
    e.magnificPopup.registerModule("gallery", {
        options: { enabled: !1, arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', preload: [0, 2], navigateByImgClick: !0, arrows: !0, tPrev:"Previous (Left arrow key)", tNext:"Next (Right arrow key)", tCounter:"%curr% of %total%" },
        proto: {
            initGallery: function() {
                var n = t.st.gallery,
                    o =".mfp-gallery";
                return t.direction = !0, !(!n || !n.enabled) && (r +=" mfp-gallery", w(d + o, function() { n.navigateByImgClick && t.wrap.on("click" + o,".mfp-img", function() { return t.items.length > 1 ? (t.next(), !1) : void 0 }), i.on("keydown" + o, function(e) { 37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next() }) }), w("UpdateStatus" + o, function(e, n) { n.text && (n.text = R(n.text, t.currItem.index, t.items.length)) }), w(c + o, function(e, i, o, r) {
                    var a = t.items.length;
                    o.counter = a > 1 ? R(n.tCounter, r.index, a) :""
                }), w("BuildControls" + o, function() {
                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                        var i = n.arrowMarkup,
                            o = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi,"left")).addClass(v),
                            r = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi,"right")).addClass(v);
                        o.click(function() { t.prev() }), r.click(function() { t.next() }), t.container.append(o.add(r))
                    }
                }), w(u + o, function() { t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() { t.preloadNearbyImages(), t._preloadTimeout = null }, 16) }), void w(s + o, function() { i.off(o), t.wrap.off("click" + o), t.arrowRight = t.arrowLeft = null }))
            },
            next: function() { t.direction = !0, t.index = q(t.index + 1), t.updateItemHTML() },
            prev: function() { t.direction = !1, t.index = q(t.index - 1), t.updateItemHTML() },
            goTo: function(e) { t.direction = e >= t.index, t.index = e, t.updateItemHTML() },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload,
                    i = Math.min(n[0], t.items.length),
                    o = Math.min(n[1], t.items.length);
                for (e = 1; e <= (t.direction ? o : i); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? i : o); e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(n) {
                if (n = q(n), !t.items[n].preloaded) {
                    var i = t.items[n];
                    i.parsed || (i = t.parseEl(n)), I("LazyLoad", i),"image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function() { i.hasSize = !0 }).on("error.mfploader", function() { i.hasSize = !0, i.loadError = !0, I("LazyLoadError", i) }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var K ="retina";
    e.magnificPopup.registerModule(K, {
        options: { replaceSrc: function(e) { return e.src.replace(/\.\w+$/, function(e) { return"@2x" + e }) }, ratio: 1 },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        n = e.ratio;
                    (n = isNaN(n) ? n() : n) > 1 && (w("ImageHasSize." + K, function(e, t) { t.img.css({"max-width": t.img[0].naturalWidth / n, width:"100%" }) }), w("ElementParse." + K, function(t, i) { i.src = e.replaceSrc(i, n) }))
                }
            }
        }
    }), k()
});