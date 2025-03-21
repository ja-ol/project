/*! Selectric ϟ v1.11.1 (2017-01-11) - git.io/tjl9sQ - Copyright (c) 2017 Leonardo Santos - MIT License */ ! function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = function (t, s) {
        return void 0 === s && (s = "undefined" != typeof window ? require("jquery") : require("jquery")(t)), e(s), s
    } : e(jQuery)
}(function (e) {
    "use strict";
    var t = e(document),
        s = e(window),
        i = "selectric",
        l = "Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Scroll Group GroupLabel",
        n = ".sl",
        a = ["a", "e", "i", "o", "u", "n", "c", "y"],
        o = [/[\xE0-\xE5]/g, /[\xE8-\xEB]/g, /[\xEC-\xEF]/g, /[\xF2-\xF6]/g, /[\xF9-\xFC]/g, /[\xF1]/g, /[\xE7]/g, /[\xFD-\xFF]/g],
        r = function (t, s) {
            var i = this;
            i.element = t, i.$element = e(t), i.state = {
                multiple: !!i.$element.attr("multiple"),
                enabled: !1,
                opened: !1,
                currValue: -1,
                selectedIdx: -1,
                highlightedIdx: -1
            }, i.eventTriggers = {
                open: i.open,
                close: i.close,
                destroy: i.destroy,
                refresh: i.refresh,
                init: i.init
            }, i.init(s)
        };
    r.prototype = {
        utils: {
            isMobile: function () {
                return /android|ip(hone|od|ad)/i.test(navigator.userAgent)
            },
            escapeRegExp: function (e) {
                return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            },
            replaceDiacritics: function (e) {
                for (var t = o.length; t--;) e = e.toLowerCase().replace(o[t], a[t]);
                return e
            },
            format: function (e) {
                var t = arguments;
                return ("" + e).replace(/\{(?:(\d+)|(\w+))\}/g, function (e, s, i) {
                    return i && t[1] ? t[1][i] : t[s]
                })
            },
            nextEnabledItem: function (e, t) {
                for (; e[t = (t + 1) % e.length].disabled;);
                return t
            },
            previousEnabledItem: function (e, t) {
                for (; e[t = (t > 0 ? t : e.length) - 1].disabled;);
                return t
            },
            toDash: function (e) {
                return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
            },
            triggerCallback: function (t, s) {
                var l = s.element,
                    n = s.options["on" + t],
                    a = [l].concat([].slice.call(arguments).slice(1));
                e.isFunction(n) && n.apply(l, a), e(l).trigger(i + "-" + this.toDash(t), a)
            },
            arrayToClassname: function (t) {
                var s = e.grep(t, function (e) {
                    return !!e
                });
                return e.trim(s.join(" "))
            }
        },
        init: function (t) {
            var s = this;
            if (s.options = e.extend(!0, {}, e.fn[i].defaults, s.options, t), s.utils.triggerCallback("BeforeInit", s), s.destroy(!0), s.options.disableOnMobile && s.utils.isMobile()) return void(s.disableOnMobile = !0);
            s.classes = s.getClassNames();
            var l = e("<input/>", {
                    class: s.classes.input,
                    readonly: s.utils.isMobile(),
                    type: 'hidden'
                }),
                n = e("<div/>", {
                    class: s.classes.items,
                    tabindex: -1
                }),
                a = e("<div/>", {
                    class: s.classes.scroll
                }),
                o = e("<div/>", {
                    class: s.classes.prefix,
                    html: s.options.arrowButtonMarkup
                }),
                r = e("<span/>", {
                    class: "label"
                }),
                u = s.$element.wrap("<div/>").parent().append(o.prepend(r), n, l),
                p = e("<div/>", {
                    class: s.classes.hideselect
                });
            s.elements = {
                input: l,
                items: n,
                itemsScroll: a,
                wrapper: o,
                label: r,
                outerWrapper: u
            }, s.options.nativeOnMobile && s.utils.isMobile() && (s.elements.input = void 0, p.addClass(s.classes.prefix + "-is-native"), s.$element.on("change", function () {
                s.refresh()
            })), s.$element.on(s.eventTriggers).wrap(p), s.originalTabindex = s.$element.prop("tabindex"), s.$element.prop("tabindex", -1), s.populate(), s.activate(), s.utils.triggerCallback("Init", s)
        },
        activate: function () {
            var e = this,
                t = e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),
                s = e.$element.width();
            t.removeClass(e.classes.tempshow), e.utils.triggerCallback("BeforeActivate", e), e.elements.outerWrapper.prop("class", e.utils.arrayToClassname([e.classes.wrapper, e.$element.prop("class").replace(/\S+/g, e.classes.prefix + "-$&"), e.options.responsive ? e.classes.responsive : ""])), e.options.inheritOriginalWidth && s > 0 && e.elements.outerWrapper.width(s), e.unbindEvents(), e.$element.prop("disabled") ? (e.elements.outerWrapper.addClass(e.classes.disabled), e.elements.input && e.elements.input.prop("disabled", !0)) : (e.state.enabled = !0, e.elements.outerWrapper.removeClass(e.classes.disabled), e.$li = e.elements.items.removeAttr("style").find("li"), e.bindEvents()), e.utils.triggerCallback("Activate", e), e.elements.input.removeAttr('tabindex')
        },
        getClassNames: function () {
            var t = this,
                s = t.options.customClass,
                i = {};
            return e.each(l.split(" "), function (e, l) {
                var n = s.prefix + l;
                i[l.toLowerCase()] = s.camelCase ? n : t.utils.toDash(n)
            }), i.prefix = s.prefix, i
        },
        setLabel: function () {
            var t = this,
                s = t.options.labelBuilder;
            if (t.state.multiple) {
                var i = e.isArray(t.state.currValue) ? t.state.currValue : [t.state.currValue];
                i = 0 === i.length ? [0] : i;
                var l = e.map(i, function (s) {
                    return e.grep(t.lookupItems, function (e) {
                        return e.index === s
                    })[0]
                });
                l = e.grep(l, function (t) {
                    return l.length > 1 || 0 === l.length ? "" !== e.trim(t.value) : t
                }), l = e.map(l, function (i) {
                    return e.isFunction(s) ? s(i) : t.utils.format(s, i)
                }), t.options.multiple.maxLabelEntries && (l.length >= t.options.multiple.maxLabelEntries + 1 ? (l = l.slice(0, t.options.multiple.maxLabelEntries), l.push(e.isFunction(s) ? s({
                    text: "..."
                }) : t.utils.format(s, {
                    text: "..."
                }))) : l.slice(l.length - 1)), t.elements.label.html(l.join(t.options.multiple.separator))
            } else {
                var n = t.lookupItems[t.state.currValue];
                t.elements.label.html(e.isFunction(s) ? s(n) : t.utils.format(s, n))
            }
        },
        populate: function () {
            var t = this,
                s = t.$element.children(),
                i = t.$element.find("option"),
                l = i.filter(":selected"),
                n = i.index(l),
                a = 0,
                o = t.state.multiple ? [] : 0;
            l.length > 1 && t.state.multiple && (n = [], l.each(function () {
                n.push(e(this).index())
            })), t.state.currValue = ~n ? n : o, t.state.selectedIdx = t.state.currValue, t.state.highlightedIdx = t.state.currValue, t.items = [], t.lookupItems = [], s.length && (s.each(function (s) {
                var i = e(this);
                if (i.is("optgroup")) {
                    var l = {
                        element: i,
                        label: i.prop("label"),
                        groupDisabled: i.prop("disabled"),
                        items: []
                    };
                    i.children().each(function (s) {
                        var i = e(this);
                        l.items[s] = t.getItemData(a, i, l.groupDisabled || i.prop("disabled")), t.lookupItems[a] = l.items[s], a++
                    }), t.items[s] = l
                } else t.items[s] = t.getItemData(a, i, i.prop("disabled")), t.lookupItems[a] = t.items[s], a++
            }), t.setLabel(), t.elements.items.append(t.elements.itemsScroll.html(t.getItemsMarkup(t.items))))
        },
        getItemData: function (t, s, i) {
            var l = this;
            return {
                index: t,
                element: s,
                value: s.val(),
                className: s.prop("class"),
                text: s.html(),
                slug: e.trim(l.utils.replaceDiacritics(s.html())),
                selected: s.prop("selected"),
                disabled: i
            }
        },
        getItemsMarkup: function (t) {
            var s = this,
                i = "<ul>";
            return e.isFunction(s.options.listBuilder) && s.options.listBuilder && (t = s.options.listBuilder(t)), e.each(t, function (t, l) {
                void 0 !== l.label ? (i += s.utils.format('<ul class="{1}"><li class="{2}">{3}</li>', s.utils.arrayToClassname([s.classes.group, l.groupDisabled ? "disabled" : "", l.element.prop("class")]), s.classes.grouplabel, l.element.prop("label")), e.each(l.items, function (e, t) {
                    i += s.getItemMarkup(t.index, t)
                }), i += "</ul>") : i += s.getItemMarkup(l.index, l)
            }), i + "</ul>"
        },
        getItemMarkup: function (t, s) {
            var i = this,
                l = i.options.optionsItemBuilder,
                n = {
                    value: s.value,
                    text: s.text,
                    slug: s.slug,
                    index: s.index
                };
            return i.utils.format('<li data-index="{1}" class="{2}">{3}</li>', t, i.utils.arrayToClassname([s.className, t === i.items.length - 1 ? "last" : "", s.disabled ? "disabled" : "", s.selected ? "selected" : ""]), e.isFunction(l) ? i.utils.format(l(s), s) : i.utils.format(l, n))
        },
        unbindEvents: function () {
            var e = this;
            e.elements.wrapper.add(e.$element).add(e.elements.outerWrapper).add(e.elements.input).off(n)
        },
        bindEvents: function () {
            var t = this;
            t.elements.outerWrapper.on("mouseenter" + n + " mouseleave" + n, function (s) {
                e(this).toggleClass(t.classes.hover, "mouseenter" === s.type), t.options.openOnHover && (clearTimeout(t.closeTimer), "mouseleave" === s.type ? t.closeTimer = setTimeout(e.proxy(t.close, t), t.options.hoverIntentTimeout) : t.open())
            }), t.elements.wrapper.on("click" + n, function (e) {
                t.state.opened ? t.close() : t.open(e)
            }), t.options.nativeOnMobile && t.utils.isMobile() || (t.$element.on("focus" + n, function () {
                t.elements.input.focus()
            }), t.elements.input.prop({
                tabindex: t.originalTabindex,
                disabled: !1
            }).on("keydown" + n, e.proxy(t.handleKeys, t)).on("focusin" + n, function (e) {
                t.elements.outerWrapper.addClass(t.classes.focus), t.elements.input.one("blur", function () {
                    t.elements.input.blur()
                }), t.options.openOnFocus && !t.state.opened && t.open(e)
            }).on("focusout" + n, function () {
                t.elements.outerWrapper.removeClass(t.classes.focus)
            }).on("input propertychange", function () {
                var s = t.elements.input.val(),
                    i = new RegExp("^" + t.utils.escapeRegExp(s), "i");
                clearTimeout(t.resetStr), t.resetStr = setTimeout(function () {
                    t.elements.input.val("")
                }, t.options.keySearchTimeout), s.length && e.each(t.items, function (e, s) {
                    if (!s.disabled && i.test(s.text) || i.test(s.slug)) return void t.highlight(e)
                })
            })), t.$li.on({
                mousedown: function (e) {
                    e.preventDefault(), e.stopPropagation()
                },
                click: function () {
                    return t.select(e(this).data("index")), !1
                }
            })
        },
        handleKeys: function (t) {
            var s = this,
                i = t.which,
                l = s.options.keys,
                n = e.inArray(i, l.previous) > -1,
                a = e.inArray(i, l.next) > -1,
                o = e.inArray(i, l.select) > -1,
                r = e.inArray(i, l.open) > -1,
                u = s.state.highlightedIdx,
                p = n && 0 === u || a && u + 1 === s.items.length,
                c = 0;
            if (13 !== i && 32 !== i || t.preventDefault(), n || a) {
                if (!s.options.allowWrap && p) return;
                n && (c = s.utils.previousEnabledItem(s.lookupItems, u)), a && (c = s.utils.nextEnabledItem(s.lookupItems, u)), s.highlight(c)
            }
            return o && s.state.opened ? (s.select(u), void(s.state.multiple && s.options.multiple.keepMenuOpen || s.close())) : void(r && !s.state.opened && s.open())
        },
        refresh: function () {
            var e = this;
            e.populate(), e.activate(), e.utils.triggerCallback("Refresh", e)
        },
        setOptionsDimensions: function () {
            var e = this,
                t = e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),
                s = e.options.maxHeight,
                i = e.elements.items.outerWidth(),
                l = e.elements.wrapper.outerWidth() - (i - e.elements.items.width());
            !e.options.expandToItemText || l > i ? e.finalWidth = l : (e.elements.items.css("overflow", "scroll"), e.elements.outerWrapper.width(9e4), e.finalWidth = e.elements.items.width(), e.elements.items.css("overflow", ""), e.elements.outerWrapper.width("")), e.elements.items.width(e.finalWidth).height() > s && e.elements.items.height(s), t.removeClass(e.classes.tempshow)
        },
        isInViewport: function () {
            var e = this,
                t = s.scrollTop(),
                i = s.height(),
                l = e.elements.outerWrapper.offset().top,
                n = e.elements.outerWrapper.outerHeight(),
                a = l + n + e.itemsHeight <= t + i,
                o = l - e.itemsHeight > t,
                r = !a && o;
            e.elements.outerWrapper.toggleClass(e.classes.above, r)
        },
        detectItemVisibility: function (t) {
            var s = this,
                i = s.$li.filter("[data-index]");
            s.state.multiple && (t = e.isArray(t) && 0 === t.length ? 0 : t, t = e.isArray(t) ? Math.min.apply(Math, t) : t);
            var l = i.eq(t).outerHeight(),
                n = i[t].offsetTop,
                a = s.elements.itemsScroll.scrollTop(),
                o = n + 2 * l;
            s.elements.itemsScroll.scrollTop(o > a + s.itemsHeight ? o - s.itemsHeight : n - l < a ? n - l : a)
        },
        open: function (s) {
            var l = this;
            return (!l.options.nativeOnMobile || !l.utils.isMobile()) && (l.utils.triggerCallback("BeforeOpen", l), s && (s.preventDefault(), l.options.stopPropagation && s.stopPropagation()), void(l.state.enabled && (l.setOptionsDimensions(), e("." + l.classes.hideselect, "." + l.classes.open).children()[i]("close"), l.state.opened = !0, l.itemsHeight = l.elements.items.outerHeight(), l.itemsInnerHeight = l.elements.items.height(), l.elements.outerWrapper.addClass(l.classes.open), l.elements.input.val(""), s && "focusin" !== s.type && l.elements.input.focus(), setTimeout(function () {
                t.on("click" + n, e.proxy(l.close, l)).on("scroll" + n, e.proxy(l.isInViewport, l))
            }, 1), l.isInViewport(), l.options.preventWindowScroll && t.on("mousewheel" + n + " DOMMouseScroll" + n, "." + l.classes.scroll, function (t) {
                var s = t.originalEvent,
                    i = e(this).scrollTop(),
                    n = 0;
                "detail" in s && (n = s.detail * -1), "wheelDelta" in s && (n = s.wheelDelta), "wheelDeltaY" in s && (n = s.wheelDeltaY), "deltaY" in s && (n = s.deltaY * -1), (i === this.scrollHeight - l.itemsInnerHeight && n < 0 || 0 === i && n > 0) && t.preventDefault()
            }), l.detectItemVisibility(l.state.selectedIdx), l.highlight(l.state.multiple ? -1 : l.state.selectedIdx), l.utils.triggerCallback("Open", l))))
        },
        close: function () {
            var e = this;
            e.utils.triggerCallback("BeforeClose", e), t.off(n), e.elements.outerWrapper.removeClass(e.classes.open), e.state.opened = !1, e.utils.triggerCallback("Close", e)
        },
        change: function () {
            var t = this;
            t.utils.triggerCallback("BeforeChange", t), t.state.multiple ? (e.each(t.lookupItems, function (e) {
                t.lookupItems[e].selected = !1, t.$element.find("option").prop("selected", !1)
            }), e.each(t.state.selectedIdx, function (e, s) {
                t.lookupItems[s].selected = !0, t.$element.find("option").eq(s).prop("selected", !0)
            }), t.state.currValue = t.state.selectedIdx, t.setLabel(), t.utils.triggerCallback("Change", t)) : t.state.currValue !== t.state.selectedIdx && (t.$element.prop("selectedIndex", t.state.currValue = t.state.selectedIdx).data("value", t.lookupItems[t.state.selectedIdx].text), t.setLabel(), t.utils.triggerCallback("Change", t))
        },
        highlight: function (e) {
            var t = this,
                s = t.$li.filter("[data-index]").removeClass("highlighted");
            t.utils.triggerCallback("BeforeHighlight", t), void 0 === e || e === -1 || t.lookupItems[e].disabled || (s.eq(t.state.highlightedIdx = e).addClass("highlighted"), t.detectItemVisibility(e), t.utils.triggerCallback("Highlight", t))
        },
        select: function (t) {
            var s = this,
                i = s.$li.filter("[data-index]");
            if (s.utils.triggerCallback("BeforeSelect", s, t), void 0 !== t && t !== -1 && !s.lookupItems[t].disabled) {
                if (s.state.multiple) {
                    s.state.selectedIdx = e.isArray(s.state.selectedIdx) ? s.state.selectedIdx : [s.state.selectedIdx];
                    var l = e.inArray(t, s.state.selectedIdx);
                    l !== -1 ? s.state.selectedIdx.splice(l, 1) : s.state.selectedIdx.push(t), i.removeClass("selected").filter(function (t) {
                        return e.inArray(t, s.state.selectedIdx) !== -1
                    }).addClass("selected")
                } else i.removeClass("selected").eq(s.state.selectedIdx = t).addClass("selected");
                s.state.multiple && s.options.multiple.keepMenuOpen || s.close(), s.change(), s.utils.triggerCallback("Select", s, t)
            }
        },
        destroy: function (e) {
            var t = this;
            t.state && t.state.enabled && (t.elements.items.add(t.elements.wrapper).add(t.elements.input).remove(), e || t.$element.removeData(i).removeData("value"), t.$element.prop("tabindex", t.originalTabindex).off(n).off(t.eventTriggers).unwrap().unwrap(), t.state.enabled = !1)
        }
    }, e.fn[i] = function (t) {
        return this.each(function () {
            var s = e.data(this, i);
            s && !s.disableOnMobile ? "string" == typeof t && s[t] ? s[t]() : s.init(t) : e.data(this, i, new r(this, t))
        })
    }, e.fn[i].defaults = {
        onChange: function (t) {
            e(t).change()
        },
        maxHeight: 300,
        keySearchTimeout: 500,
        arrowButtonMarkup: '<b class="button">&#x25be;</b>',
        disableOnMobile: !1,
        nativeOnMobile: !0,
        openOnFocus: !0,
        openOnHover: !1,
        hoverIntentTimeout: 500,
        expandToItemText: !1,
        responsive: !1,
        preventWindowScroll: !0,
        inheritOriginalWidth: !1,
        allowWrap: !0,
        stopPropagation: !0,
        optionsItemBuilder: "{text}",
        labelBuilder: "{text}",
        listBuilder: !1,
        keys: {
            previous: [37, 38],
            next: [39, 40],
            select: [9, 13, 27],
            open: [13, 32, 37, 38, 39, 40],
            close: [9, 27]
        },
        customClass: {
            prefix: i,
            camelCase: !1
        },
        multiple: {
            separator: ", ",
            keepMenuOpen: !0,
            maxLabelEntries: !1
        }
    }
});
