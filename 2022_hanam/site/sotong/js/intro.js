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


        /* quick, main_lnb */
        $window.on('load', function(event) {
            $('.quick').addClass('on');
            setTimeout(function(){
                $('.lnb_area').addClass('on');
            }, 500);
        });


        // Hanam city
        $('.bg_text').addClass('on');


        /* 메인 lnb 모바일 순서변경 */
        var Quick = $('.quick.n1').html();
        var QuickItem2 = $('.quick .quick_list .quick_item.n2');
        var SotongWrap = $('.sotong_wrap');
        var LnbItem1 = $('.main_lnb_wrap.one .main_lnb_depth1_item.n1');
        var LnbItem2 = $('.main_lnb_wrap.one .main_lnb_depth1_item.n2');
        var LnbItem3 = $('.main_lnb_wrap.two .main_lnb_depth1_item.n3');
        var LnbItem4 = $('.main_lnb_wrap.two .main_lnb_depth1_item.n4');

        function array(){
            if($(window).width() > 800){
                $('.main_lnb_wrap.one').append(LnbItem1, LnbItem2);
                $('.main_lnb_wrap.two').append(LnbItem3, LnbItem4);
                $('.quick.n2').html('').addClass('hidden');
            }else{
                $('.main_lnb_wrap.one').append(LnbItem1, LnbItem3);
                $('.main_lnb_wrap.two').append(LnbItem2, LnbItem4);
                $('.quick.n2').html(Quick).removeClass('hidden');
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
                    $Area = $this.parents('.lnb_area'),
                    $MyParent = $this.parent('.main_lnb_depth1_item'),
                    IsActive = $MyParent.is('.active'),
                    $MyLayer = $this.siblings('.main_lnb_depth2'),
                    $OtherParents = $MyParent.siblings('.main_lnb_depth1_item'),
                    $OtherLayer = $OtherParents.find('.main_lnb_depth2'),
                    $OtherBtn = $OtherParents.find('.lnb_item'),
                    $MyLayerHeight = $MyLayer.innerHeight();

                if (!IsActive) {
                    $OtherParents.removeClass('active');
                    $OtherLayer.slideUp();
                    $MyParent.addClass('active');
                    $Area.addClass('active');
                    $MyLayer.slideDown();
                }
                else( $MyParent).on('mouseleave', function (){
                    $MyLayer.slideUp();
                    $MyParent.removeClass('active');
                    $Area.removeClass('active');
                });

                /*$('.main_lnb_depth1_item .main_lnb_depth2_item:last-child a').on('focusout', function (){
                    $MyParent.removeClass('active');
                    $MyLayer.slideUp();
                })*/

                $('.main_lnb_depth1_item:last-child .main_lnb_depth2_item:last-child a').on('keydown', function (e){
                    if ( e.keyCode == 9 || e.which == 9 ) {
                        console.log('tab')
                        $(this).parents('.main_lnb_depth2').slideUp().parent().removeClass('active');
                    }
                })
                $('.main_lnb_depth1_item:first-child .lnb_item').on('keydown', function (e){
                    if ( e.keyCode == 9 && e.shiftKey ) {
                        console.log('shift tab')
                        $(this).next().slideUp().parent().removeClass('active');
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
                    $OtherLayer.slideUp();
                    $MyParent.addClass('active');
                    $MyLayer.slideDown();
                }
                else{
                    $MyLayer.slideUp();
                    $MyParent.removeClass('active');
                }
            });
        };


        /* search_box */
        $('.search_con .input_box .total_search').on('focus', function (){
            $('.input_box').addClass('active');
        })
        $('.search_con .input_box .total_search').on('focusout', function (){
            $('.input_box').removeClass('active');
        })


    });
})(jQuery);