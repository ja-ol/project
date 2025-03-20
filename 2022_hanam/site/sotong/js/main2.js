(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {
        var $body = $('body'),
            $header = $('#header'),
            $wrapper = $('#wrapper'),
            $container = $('#container');


        /* main_lnb */
        $window.on('load', function(event) {
            $('.main_lnb').addClass('on');
        });


        // Hanam city
        $('.bg_text').addClass('on');

        /* 검색 시정홍보 */
        var $searchWrap = $('.search_word_wrap').find('.search_word.n2'),
            $wordList = $searchWrap.find('.word_list'),
            $wordPrev = $searchWrap.find('.word_prev'),
            $wordAuto = $searchWrap.find('.word_auto'),
            $wordNext = $searchWrap.find('.word_next');

        $wordList.slick({
            infinite: true,
            vertical: true,
            rows: 1,
            slidesToScroll: 1,
            autoplay: true,
            playText: '재생',
            pauseText: '정지',
            prevArrow: $wordPrev,
            nextArrow: $wordNext,
            autoArrow: $wordAuto,
        });


        /* 메인 lnb 모바일 순서변경 */
        var LnbItem1 = $('.main_lnb_wrap.one .main_lnb_depth1_item.n1');
        var LnbItem2 = $('.main_lnb_wrap.one .main_lnb_depth1_item.n2');
        var LnbItem3 = $('.main_lnb_wrap.two .main_lnb_depth1_item.n3');
        var LnbItem4 = $('.main_lnb_wrap.two .main_lnb_depth1_item.n4');

        function array(){

            if($(window).width() > 640){
                $('.main_lnb_wrap.one').append(LnbItem1, LnbItem2);
                $('.main_lnb_wrap.two').append(LnbItem3, LnbItem4);
            }else{
                $('.main_lnb_wrap.one').append(LnbItem1, LnbItem3);
                $('.main_lnb_wrap.two').append(LnbItem2, LnbItem4);
            }
        }

        array();
        $(window).resize(function(){
            if ($(window).width){
                array();
            }
        });


        //메인 lnb
        var $LnbLayer = $('.lnb_area'),
            $LnbItem = $LnbLayer.find('.lnb_item');

        if($(window).width() > 1000){
            $LnbItem.on('mouseover focusin', function () {
                var $this = $(this),
                    $MyParent = $this.parent('.main_lnb_depth1_item'),
                    IsActive = $MyParent.is('.active'),
                    $MyLayer = $this.siblings('.main_lnb_depth2'),
                    $OtherParents = $MyParent.siblings('.main_lnb_depth1_item'),
                    $OtherLayer = $OtherParents.find('.main_lnb_depth2'),
                    $OtherBtn = $OtherParents.find('.lnb_item'),
                    $MyLayerHeight = $MyLayer.innerHeight();

                if (!IsActive) {
                    console.log('if');
                    $OtherParents.removeClass('active');
                    $OtherLayer.stop().slideUp();
                    $MyParent.addClass('active');
                    $MyLayer.stop().slideDown();
                }else{
                    $MyParent.on('mouseleave', function (){
                        console.log('else');
                        $MyLayer.stop().slideUp();
                        $MyParent.removeClass('active');
                    });
                }

                $('.main_lnb_depth1_item:last-child .main_lnb_depth2_item:last-child a').on('keydown', function (e){
                    if ( e.keyCode == 9 || e.which == 9 ) {
                        $(this).parents('.main_lnb_depth2').stop().slideUp().parent().removeClass('active');
                    }
                })
                $('.main_lnb_depth1_item:first-child .lnb_item').on('keydown', function (e){
                    if ( e.keyCode == 9 && e.shiftKey ) {
                        $(this).next().stop().slideUp().parent().removeClass('active');
                    }
                })
            });
        } else{
            $LnbItem.on('click', function () {
                var $this = $(this),
                    $MyParent = $this.parent('.main_lnb_depth1_item'),
                    IsActive = $MyParent.is('.active'),
                    $MyLayer = $this.siblings('.main_lnb_depth2'),
                    $OtherParents = $MyParent.siblings('.main_lnb_depth1_item'),
                    $OtherLayer = $OtherParents.find('.main_lnb_depth2'),
                    $OtherBtn = $OtherParents.find('.lnb_item');

                if (!IsActive) {
                    $OtherParents.removeClass('active');
                    $OtherLayer.stop().slideUp();
                    $MyParent.addClass('active');
                    $MyLayer.stop().slideDown();
                }
                else{
                    $MyLayer.stop().slideUp();
                    $MyParent.removeClass('active');
                };
            });
        };


        /* search_box */
        $window.on('load', function(event) {
            $('.search').addClass('on');
        });
        $('.search_con .input_box .total_search').on('focus', function (){
            $('.input_box').addClass('active');
        })
        $('.search_con .input_box .total_search').on('focusout', function (){
            $('.input_box').removeClass('active');
        })


        /* 사이트맵 */
        var $sitemap = $header.find('.gnb .sitemap'),
            $sitemapOpen = $header.find('.gnb .sitemap_open'),
            $sitemapHide = $header.find('.gnb .sitemap_hide');

        $sitemapOpen.on('click', function(event) {
            $sitemap.addClass('active');
        });
        $sitemapHide.on('click', function(event) {
            $sitemap.removeClass('active');
        });


        /* 사이트맵 탭메뉴 */
        (function($) {
            'use strict';

            $(function() {
                var $tabButton = $('a.tab_button'),
                    $tabContent = $('.tab_content');

                $('.tab_select').click(function () {
                    $(this).parent('.tab').toggleClass('active');
                });

                $tabButton.click(function (event) {
                    var $this = $(this),
                        tabButtonText = $this.text(),
                        index = $tabButton.index(this);

                    $this.parent().addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
                    $this.parents('.tab').find('.tab_select span').text(tabButtonText);
                    $tabContent.eq(index).addClass('active').siblings().removeClass('active');
                    return false;
                });

                $('.sitemap_content .tab_item:nth-child(4) a').click(function(){
                    $(location).attr("href", "https://www.hanam.go.kr/sosik/index.do")
                })

            });

        })(window.jQuery);


    });
})(jQuery);
