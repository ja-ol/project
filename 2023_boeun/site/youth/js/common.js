(function($) {
    'use strict';

    $(function() {

        window.element = {};

        var $window = $(window),
            $html = $('html'),
            $header = $('#header'),
            $footer = $('#footer');

        /* 토글 */
        var $toggle = $('.toggle'),
            $toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

        $toggleSelector.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.toggle'),
                parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g,'').split(/\s+/).slice(-2)[0].replace(/_item/,'');

            if($this.is('[class*="_show"]')){
                if ($parent.siblings().hasClass('active')){
                    $parent.siblings().removeClass('active');
                    $html.removeClass(parentClass + '_open');
                }
                $html.toggleClass(parentClass + '_open');
                $parent.toggleClass('active');
            }

            if($this.is('[class*="_hide"]')){
                $html.removeClass(parentClass + '_open');
                $this.closest('.active').removeClass('active');
            }
        });

        /* 검색 */
        var $search = $header.find('.search'),
            $searchOpen = $search.find('.search_open'),
            $searchClose = $search.find('.search_close');

        $searchOpen.on('click', function(event) {
            $search.toggleClass('active');
            $html.addClass('search_open');
            $gnb.css('z-index', '50');
        });
        $searchClose.on('click', function(event) {
            $search.removeClass('active');
            $html.removeClass('search_open');
            $gnb.css('z-index', '70');
        });

        var $footer = element.$footer = $('#footer');
        /* 사이트 */
        var $site = $footer.find('.site'),
            $siteItem = $site.find('.site_item'),
            $siteOpen = $siteItem.find('.site_open'),
            $siteClose = $siteItem.find('.site_close');

        $siteOpen.on('click', function () {
            var $this = $(this);

            $site.find('.site_panel').slideUp('250', 'easeOutExpo');

            if($this.parent().hasClass('active') === true){
                $this.parent().removeClass('active');
                $siteClose.css("display","none");
                $this.parent().find('.site_panel').slideUp('250', 'easeOutExpo');
                $this.parent().find('.site_panel:before').slideUp('250', 'easeOutExpo');
            }else{
                $siteItem.find('.site_panel').slideUp('250', 'easeOutExpo');
                $this.parent().addClass('active').siblings().removeClass('active');
                $this.parent().find('.site_panel').slideDown('250', 'easeOutExpo');
                $this.parent().find('.site_panel:before').slideUp('250', 'easeOutExpo');
                $this.siblings().find('.site_close').css("display","block");
            }
        });

        $siteClose.on('click', function () {
            var $this = $(this);
            $this.parent('.site_panel').parent('.site_item').removeClass('active');
            $this.parent('.site_panel').parent('.site_item').removeClass('active');
            $this.parent('.site_panel').slideUp('250', 'easeOutExpo');
            $this.parent('.site_panel:before').slideUp('250', 'easeOutExpo');
            $siteClose.css("display","none");
        });

        /*패밀리사이트*/
        $('.family_open').on('click', function() {
            $('.family_panel').addClass('active');
            //$('.family_item:first-child .basic_item:first-child .basic_anchor').focus();
            $html.addClass('dimded').removeClass('menu_open');
            $('body').removeClass('menu_open');
        });
        $('.family_hide').on('click', function() {
            $('.family_panel').removeClass('active');
            $html.removeClass('dimded');
        });

        $(window).resize(function(){
            if(window.innerWidth < 1001){
                $('.family_open').on('click', function() {
                    if($html.hasClass('lnb_show') === true){
                        $('.family_panel').css("z-index","60");
                    }else{
                        $('.family_panel').css("z-index","0");
                    }
                });
                $('.family_hide').on('click', function() {
                    $('.family_panel').css("z-index","0");

                });
            }
        }).resize();


        $(window).on("load",function(){
            $("#family_panel .family_text").mCustomScrollbar();
        });

        $("#family_panel .family_text").mCustomScrollbar({
            theme:"rounded"
        });

        $("#family_panel .family_text").mCustomScrollbar("scrollTo","top",{
            scrollInertia:0
        });


        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next');

        $bannerList.slick({
            draggable : false,
            infinite: true,
            variableWidth: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            playText : '재생',
            pauseText : '정지',
            autoArrow : $bannerAuto,
            prevArrow : $bannerPrev,
            nextArrow : $bannerNext,
        });


        /* 상단으로 */
        var $bodyHtml = $('body,html'),
            $upButton = $footer.find('.up_button');

        $upButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });


        //2차메뉴 닫으면 3, 4차도 닫히게


        /* 상단으로 */
        var $bodyHtml = $('body,html'),
            $upButton = $footer.find('.up_button');

        $upButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });

    });
})(window.jQuery);
