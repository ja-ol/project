/**
 * 사이드 메뉴
 */


$(function(){
    var menu = $(".menu-list > ul");
    var navDepth1 = menu.find(" > li");

    navDepth1.each(function() {
        var thisLength = $(this).find("> ul").length;
        if(thisLength){
            $(this).addClass("has-children");
        }
    });

    navDepth1.find(" > a").on("click",function(event){
        var thisItem = $(this).parent("li"),
            thisLength = $(this).next("ul").length;
        if(thisLength){
            event.preventDefault();
            if (!thisItem.hasClass("active")){
                navDepth1.not(thisItem).removeClass("active");
                $(this).parent().addClass("active");
            }  else {
                $(this).parent().removeClass("active");
            }
        }
    });
});



$(function () {
    /**
     * affix default 확인
     * @param element
     * @param options
     * @constructor
     */
    var Affix = function(element, options) {
        var setDefault = {
            offset: 0,
            target: window
        };
        this.window  = $(window);
        this.body    = $(document.body);
        this.options = $.extend({}, setDefault, options);
        this.$target = $(this.options.target)
        .on("scroll.affix, resize.affix", $.proxy(this.checkPosition, this));
        this.$element     = $(element);
        this.affixed      = null;
        this.checkPosition();
    };

    /**
     * 상태 확인, 현재 스크롤 위치가  offsetTop 보다 크면 실행된것으로 상태는 false로 리턴
     * @param scrollHeight
     * @param height
     * @param offsetTop
     * @returns {*}
     */
    Affix.prototype.getState = function(scrollHeight, height, offsetTop) {
        var scrollTop    = this.$target.scrollTop();

        if (offsetTop != null && this.affixed == "top") {
            return scrollTop < offsetTop ? "top" : false;
        }

        if (offsetTop != null && scrollTop <= offsetTop) {
            return "top";
        }
        return false
    };

    Affix.prototype.getLonger = function(windowHeight, height) {
        var scrollTop = this.$target.scrollTop(),
            distanceHeight = Math.abs(windowHeight - height);

        if (scrollTop >= distanceHeight) {
            return "longer";
        }
        else {
            return "longer-top";
        }
    };

    /**
     * css 등 state 체크 적용
     * @type {string}
     */
    Affix.RESET    = "affix affix-top affix-bottom affix-longer affix-longer-top";

    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(":visible")) return;
        var height          = this.$element.innerHeight();
        var offset          = this.options.offset;
        var logerUse        = this.options.longer;
        var addAffix        = this.options.addaffix;
        var offsetTop       = offset.top;
        var scrollHeight    = Math.max($(document).height(), $(document.body).height());
        var windowHeight    =  this.window.height();
        var affix;

        if (typeof offsetTop == "function"){
            offsetTop    = offset.top(this.$element);
        }

        if (logerUse && (height > windowHeight)) {
            affix = this.getLonger(windowHeight, height);
        }
        else{
            affix = this.getState(scrollHeight, height, offsetTop);
        }

        if (this.affixed != affix) {
            var affixType = "affix" + (affix ? "-" + affix : "");
            this.affixed = affix;
            this.$element
            .removeClass(Affix.RESET)
            .addClass(affixType);
            if(addAffix){
                //console.log(addAffix);
                $(addAffix)
                .removeClass(Affix.RESET)
                .addClass(affixType);
            }
        }
    };

    /**
     * 로딩 또는 호출시 각 영역을 체크하여 실행함
     * @param option
     * @returns {JQuery|*}
     */
    function affix(option){
        return this.each(function() {
            var $this   = $(this);
            var data    = $this.data("affix");
            var options = typeof option == "object" && option;

            if (!data) $this.data("affix", (data = new Affix(this, options)));
            if (typeof option == "string") data[option]()
        })
    }

    /**
     * js로 호출시 ($.fn.affix)  affix 함수 실행
     * @type {affix}
     */
    $.fn.affix             = affix;

    if (navigator.appVersion.indexOf("MSIE 7.") == -1 && navigator.appVersion.indexOf("MSIE 8.") == -1) {
        $(window).on("load", function () {
            $(".header").affix();
            $("[data-spy=\"affix\"]").each(function () {
                var $spy = $(this);
                var data = $spy.data();

                data.offset = data.offset || {};

                if (data.offsetTop != null) {
                    data.offset.top = data.offsetTop;
                }

                affix.call($spy, data)
            })
        });
    }
});



/* onClick - add/remove Class */
$(function(){
    var template =  {
        body : $(".menu-list-wrap"),
        button : $(".header__button-tpl"),
        activeClass : "tpl-active"
    };
    template.button.on("click", function () {
        if (!template.body.hasClass(template.activeClass)){
            template.body.addClass(template.activeClass);
        }  else {
            template.body.removeClass(template.activeClass);
        }
    });
});


//html tag < > & " 변환
function escapeHTML(text) {
    var replacements= {'<': '&lt;', '>': '&gt;','&': '&amp;', '"': '&quot;'};
    return text.replace(/[<>&"]/g, function(character) {
        return replacements[character];
    });
}

/*
$(function(){
    var escapeHtml = function(el, options) {
        $element            = $(el);
        this.element        = el;
        this.options        = options;
        $target             = $(this.options.target).html();
        this.translate();
    };
    escapeHtml.prototype.translate = function(){
        var aa = escapeHTML($target);
        var bb = aa.replace(/(<([^>]+)>)/ig,"");
        console.log(aa);
        $element.html(aa)
    };

    function checkEscapeHtml(option){
        var $this = $(this);
        var data  = $this.data("escape");
        var options = typeof option === 'object' && option;
        if (data) $this.data('escape', (data = new escapeHtml(this, options)));
        if (typeof option === 'string') data[option]()
    }

    $(window).on("load",function(){
        $("[data-escape=\"html\"]").each(function () {
            var $this = $(this);   //버튼
            var option = $this.data();
            checkEscapeHtml.call($this, option);
        });

    });
});
*/
