(function ($) {
    'use strict';

    $(function () {

        var $html = $('html'),
            $footer = $('#footer');

        /* 토글 */
        var $toggle = $('.toggle'),
            $toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

        $toggleSelector.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parent(),
                parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g, '').split(/\s+/).slice(-2)[0];

            if ($this.is('[class*="_show"]')) {
                if ($parent.siblings().hasClass('active')) {
                    //$parent.siblings().removeClass('active');
                    $html.removeClass(parentClass + '_open');
                }
                $html.toggleClass(parentClass + '_open');
                $parent.toggleClass('active');
            }

            if ($this.is('[class*="_hide"]')) {
                $html.removeClass(parentClass + '_open');
                $this.closest('.active').removeClass('active');
            }
        });

        $('.lnb .menu .depth_text').each(function(){
            if($(this).attr('href') === window.location.href.substr(20)){
                $(this).parents('.depth_item').addClass('active');
            }
        });

        //분야별정보 메뉴삭제 임시처리
        $('.lnb .menu .depth1_item.n5 .depth2_item').each(function(){
            if(!$(this).find('.depth3_item').length){
                $(this).removeClass('has').find('.depth3').remove();
            }
        });


        /* 주요누리집 */
        var $header = $html.find('#header'),
            $family = $header.find('.family'),
            $familyPanel = $header.find('.family_panel'),
            $familyButton = $family.find('.link_anchor'),
            $familyTabButton = $familyPanel.find('.family_tab_button'),
            $familyHide = $familyPanel.find('.family_hide'),
            $focuspoint;

        $familyButton.on('click keydown', function (e) {
            if (e.type === 'keydown' && e.key !== 'Enter' && e.keyCode !== 13) return;

            $familyPanel.addClass('active');
            $html.addClass('family_open');
            $focuspoint = $familyButton;

            setTimeout(function () {
                var $target = $familyPanel.find('.family_item:first-child .family_content ul li:first-child a');
                if ($target.length) {
                    $target.focus();
                }
            }, 100);

            setTimeout(function () {
                $html.removeClass('lnb_show');
            }, 500);
        });

        $familyHide.click(function(){
            $familyPanel.removeClass('active');
            $html.removeClass('family_open');
            $focuspoint.focus();
        });

        $familyTabButton.on('click', function () {
            var $this = $(this),
                $familyItem = $this.parents('.family_item'),
                $familyContent = $familyItem.children('.family_content'),
                $otherItem = $familyItem.siblings('.family_item');

            if ($familyItem.hasClass('active')){
                $this.attr('title', '열기');
                $familyItem.removeClass('active');
                $familyContent.slideUp().attr('title', '닫힘');
            }
            else {
                $this.attr('title', '닫기');
                $familyItem.addClass('active');
                $familyContent.slideDown().attr('title', '열림');
                $otherItem.removeClass('active').find('.family_tab_button').attr('title', '열기');

                $otherItem.each(function () {
                    var $other = $(this);
                    $other.removeClass('active');
                    $other.find('.family_tab_button').attr('title', '열기');
                    $other.find('.family_content').slideUp().attr('title', '닫힘');
                });
            }
        });


        /* 외국어 */
        var $language = $('.gnb .language, .menu_header .link_item.language'),
            $languageBtn = $language.find('.link_anchor'),
            $languagePanel = $language.find('.language_panel');
        $languageBtn.click(function(){
            var $this = $(this),
                $language = $this.parent('.language'),
                $languagePanel = $this.siblings('.language_panel'),
                OnOff = $language.is('.active');

            if(!OnOff){
                $this.attr('title', '언어 선택 닫기');
                $languagePanel.slideDown();
                $language.addClass('active');
            } else{
                $this.attr('title', '언어 선택 열기');
                $language.removeClass('active');
                $languagePanel.slideUp();
            }
        });
        $('.language_item:last-child').focusout(function(){
            $languageBtn.attr('title', '언어 선택 열기');
            $language.removeClass('active');
            $languagePanel.slideUp();
        });


        /* 검색 */
        var $searchShow = $header.find('.search_show .search_btn'),
            $mobileSearch = $header.find('.mobile_search'),
            $searchHide = $mobileSearch.find('.search_hide');

        $searchShow.on('click', function (){
            $mobileSearch.addClass('active').slideDown();
        });
        $searchHide.on('click', function (){
            $mobileSearch.removeClass('active').slideUp();
        })


        /* 인기검색어 */
        $('.search_box .keyword').each(function () {
            var $keyword = $(this),
                $keywordList = $keyword.find('.keyword_list'),
                $keywordPrev = $keyword.find('.keyword_button.prev'),
                $keywordAuto = $keyword.find('.keyword_button.auto'),
                $keywordNext = $keyword.find('.keyword_button.next');

            $keywordList.slick({
                autoplay: true,
                dots: false,
                draggable: true,
                swipe: true,
                swipeToSlide: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                variableWidth: true,
                infinite: true,
                arrows: true,
                prevArrow: $keywordPrev,
                autoArrow : $keywordAuto,
                nextArrow: $keywordNext,
                playText: '재생',
                pauseText: '정지'
            });
        });


        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next');

        $bannerList.slick({
            draggable     : false,
            infinite      : true,
            variableWidth : true,
            slidesToShow  : 8,
            slidesToScroll: 1,
            autoplay      : true,
            playText      : '재생',
            pauseText     : '정지',
            autoArrow     : $bannerAuto,
            prevArrow     : $bannerPrev,
            nextArrow     : $bannerNext,
        });


        /* 푸터 sns */
        var $footerSns = $('#footer .footer_sns'),
            $footerSnsButton = $footerSns.find('.sns_button'),
            $footerSnsPanel = $footerSns.find('.sns_panel');
        $footerSnsButton.click(function(){
            var $this = $(this),
                $footerSns = $this.parent('.footer_sns'),
                $footerSnsPanel = $this.siblings('.sns_panel'),
                OnOff = $footerSns.is('.active');

            if(!OnOff){
                $this.attr('title', 'SNS 목록 닫기');
                $footerSnsPanel.slideDown();
                $footerSns.addClass('active');
            } else{
                $this.attr('title', 'SNS 목록 열기');
                $footerSns.removeClass('active');
                $footerSnsPanel.slideUp();
            }
        });
        $('#footer .footer_sns .sns_item:last-child').focusout(function(){
            $footerSnsButton.attr('title', 'SNS 목록 열기');
            $footerSns.removeClass('active');
            $footerSnsPanel.slideUp();
        });


        /* up button */
        var $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            $footerBox = $footer.find('.footer_box'),
            $upButton = $footer.find('.up_button'),
            windowTop = 0,
            windowArea = 0;

        if($upButton.length){
            $upButton.on('click', function(e) {
                $htmlBody.animate({
                    scrollTop : $wrapper.offset().top
                },250);
                e.preventDefault();
            });
        }

        $(window).scroll(function(){
            if($(window).scrollTop() > 50){
                $footerBox.addClass('active');
            }else{
                $footerBox.removeClass('active');
            }

            var footerTop = $('#footer').offset().top;
            windowTop = $(window).scrollTop();
            windowArea = windowTop + $(window).height() - $footerBox.height();

        });

        /* 메뉴 - 분야별정보 */
        $('#header .lnb .depth1_text span').filter(function() {
            return $(this).text().trim() === '분야별정보';
        }).closest('.depth1_item').addClass('sector');


    });
})(window.jQuery);