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
            $wrapper = $('#wrapper'),
            $container = $('#container'),
            $header = $('#header'),
            $rowgroup = $('#container .rowgroup');

        $window.on('screen:wide screen:web', function(event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';
        });



        //여기서부터 코드 작성해주세요

        $(document).ready(function() {
            if($('.site_link_list .site_link_item.member .layer ul li:nth-child(1)').hasClass('active') === true){
                $body.addClass('home_1');
            }
            if($('.site_link_list .site_link_item.member .layer ul li:nth-child(2)').hasClass('active') === true){
                $body.addClass('home_2');
            }
            if($('.site_link_list .site_link_item.member .layer ul li:nth-child(3)').hasClass('active') === true){
                $body.addClass('home_3');
            }
            if($('.site_link_list .site_link_item.member .layer ul li:nth-child(4)').hasClass('active') === true){
                $body.addClass('home_4');
            }
            if($('.site_link_list .site_link_item.member .layer ul li:nth-child(5)').hasClass('active') === true){
                $body.addClass('home_5');
            }
            if($('.site_link_list .site_link_item.member .layer ul li:nth-child(6)').hasClass('active') === true){
                $body.addClass('home_6');
            }
            if($('.site_link_list .site_link_item.member .layer ul li:nth-child(7)').hasClass('active') === true){
                $body.addClass('home_7');
            }
        });


        /* 비주얼 */
        var $visual = $container.find('.visual'),
            thisBg =  $visual.find('.visual_image .image span').css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');

        $window.on('load',function (){
            setTimeout(function(){
                $visual.addClass('on');
            }, 850);
        });

        $visual.find('.bg').attr('style','background-image:url(' + thisBg + ');');



        /* 의정활동 사진 */
        var $photo = $container.find('.photo'),
            $photoSlide = $container.find('.photo_slide'),
            $photoList = $photo.find('.photo_list.n1'),
            $photoListHtml = $photo.find('.photo_list').html(),
            $photoPrev = $photo.find('.photo_prev'),
            $photoNext = $photo.find('.photo_next'),
            $photoAuto = $photo.find('.photo_auto');

        $photoSlide.after('<div class="photo_list n2"></div>');
        $('.photo_list.n2').html($photoListHtml);
        var $photoList2 = $photo.find('.photo_list.n2');

        $photoList.slick({
            fade : true,
            autoplay : true,
            infinite : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            pauseOnDotsHover : true,
            prevArrow : $photoPrev,
            nextArrow : $photoNext,
            autoArrow : $photoAuto,
            pauseText : '정지',
            playText : '재생',
            swipe : true,
            setPosition: 0,
            draggable : true,
        });

        $photoList2.slick({
            autoplay : false,
            swipe : false,
            draggable : false,
            slidesToShow : 3,
            slidesToScroll : 1,
            initialSlide : 1,
            variableWidth : true,
            infinite : true,
            arrows : false,
            dots : false,
            swipeToSlide : true,
            asNavFor : $photoList,
            focusOnSelect : true,
        });

        $photoList2.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $photoList.slick('slickGoTo', currentSlide);
        });

        $photoList.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $photoList2.slick('slickGoTo', nextSlide + 1);
        });


        /* 자주찾는 메뉴 */
        var $favorite = $container.find('.favorite'),
            $favoriteWrap = $favorite.find('.favorite_wrap'),
            $favoriteList = $favorite.find('.favorite_list');

            $favoriteWrap.on('scroll',function(){
            if(Math.ceil($(this).scrollLeft() + $(this).width()) == $favoriteList.width()) {
                $favorite.addClass('end');
            }else{
                $favorite.removeClass('end');
            }
        });


        /* gng 의원홈페이지 */
        $('.site_link_list .site_link_item.member .site_link').on('click', function() {
            var $this = $(this),
                $Parent = $this.parent('.site_link_item'),
                IsActive = $Parent.is('.on'),
                $Layer = $this.siblings('.layer');
            if(!IsActive){
                $Parent.addClass('on');
                $this.attr('title', '의원홈페이지 닫기');
                $Layer.slideDown();
            } else{
                $Parent.removeClass('on');
                $this.attr('title', '의원홈페이지 열기');
                $Layer.slideUp();
            }
        });


        /* 스크롤 */
        $window.on('load scroll', function (){
            var $rowgroup = $("[class^=\'rowgroup\']"),
                scrollTop = $(window).scrollTop();

            $rowgroup.each(function (index){
                var rowgroupOffset = $(this).offset().top;

                if(rowgroupOffset < scrollTop + 600) {
                    $rowgroup.eq(index).addClass('active');
                }
            });

        });




        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);