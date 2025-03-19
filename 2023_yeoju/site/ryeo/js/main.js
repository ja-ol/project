(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');

        $window.on('load',function (){
            $visual.addClass('on');
        });

        /* 비주얼 */
        var $visual = $container.find(".visual"),
            $visualList = $visual.find(".visual_list"),
            $visualCurrent = $visual.find(".visual_current"),
            $visualTotal = $visual.find(".visual_total"),
            $visualAuto = $visual.find(".visual_auto"),
            $visualProgress =  $visual.find('.progress_bar');

        $visualList.slick({
            fade : true,
            autoplaySpeed : 4000,
            autoplay : true,
            draggable : true,
            infinite : true,
            slidesToShow : 1,
            prevArrow : false,
            nextArrow : false,
            pauseText : '정지',
            playText : '재생',
            autoArrow : $visualAuto,
            current : $visualCurrent,
            total : $visualTotal,
        }).on("beforeChange",function(event, slick, currentSlide, nextSlide) {
            $visualProgress.removeClass('on');
        }).on('afterChange', function(e, slick, current, next) {
            $visualProgress.addClass('on');
        });

        $visualAuto.on('click', function(){
            if($(this).hasClass('slick-pause')){
                $visual.removeClass('pause');
            } else {
                $visual.addClass('pause');
            }
        });


        /* 전시 */
        var $exhibit = $container.find('.exhibit'),
            $exhibitList = $exhibit.find('.exhibit_list'),
            $exhibitPrev = $exhibit.find('.exhibit_prev'),
            $exhibitsNext = $exhibit.find('.exhibit_next');

        $exhibitList.slick({
            autoplay : false,
            infinite : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            prevArrow : $exhibitPrev,
            nextArrow : $exhibitsNext,
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        variableWidth : true,
                    }
                }
            ]
        });


        /* 교육·문화행사 */
        var $event = $container.find('.event'),
            $eventList = $event.find('.event_list');

        $eventList.slick({
            autoplay : false,
            draggable: false,
            infinite : true,
            slidesToShow : 4,
            slidesToScroll : 1,
            arrows : false,
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow : 3,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        variableWidth : true,
                        slidesToShow : 3,
                    }
                }
            ]
        });


        /* 미술관 소식 */
        var $news = $container.find('.news'),
            $newsTab = $news.find('.news_tab'),
            $newsBtn = $newsTab.find('button'),
            $newsPanel = $news.find('.news_panel'),
            $newsItem = $newsPanel.find('.news_item');

        $news.find('.news_more').attr('href','0');
        $newsBtn.on('click',function(){
            var thisType = $(this).attr('data-type'),
                thisText = $(this).text(),
                thisIdx = $(this).parent().index();
            if(thisText === '전체'){
                thisText = '전체'
            }

            $newsBtn.removeAttr('title');
            $(this).attr('title','선택됨').parent().addClass('active').siblings().removeClass('active');
            $newsPanel.find('.skip').text(thisText + ' 목록')
            $newsItem.removeClass('active last');
            if(thisType === 'all'){
                $newsPanel.find('.news_item:nth-child(-n+3)').addClass('active');
            }else{
                $newsPanel.find('.news_item.' + thisType).addClass('active');
            }
            $newsPanel.find('.notice_item.active').eq(3).addClass('last');
            if(thisIdx === 0){
                $news.find('.news_more').attr('href','1');
            }else if(thisIdx === 1){
                $news.find('.news_more').attr('href','2');
            }else if(thisIdx === 2){
                $news.find('.news_more').attr('href','3');
            }else if(thisIdx === 3){
                $news.find('.news_more').attr('href','4');
            }else if(thisIdx === 4){
                $news.find('.news_more').attr('href','5');
            }else if(thisIdx === 5){
                $news.find('.news_more').attr('href','6');
            }
        });


        /* 소장품 */
        $window.on('load',function(){
            $('.grid_wrap').masonry({
                itemSelector: '.grid_item'
            });
        });

        $window.on('scroll',function(){
            $('.grid_item').each(function() {
                var $item = $(".grid_item"),
                    itemTop = $(this).offset().top,
                    windowBottom = $window.scrollTop() + $(window).height();

                // 아이템이 화면에 보일 때
                if (itemTop < windowBottom) {
                    $(this).addClass('on');
                }
            });
        });

        $('.collection_list').on('scroll',function(){
            var itemTop = $('.collection_item').first().offset().top,
                listTop = $('.collection_list').offset().top;

            if (itemTop === listTop){
                $('.collection').removeClass('end');
            } else{
                $('.collection').addClass('end');
            }
        });

        var elem = document.querySelector('.grid');
        var msnry = new Masonry( elem, {
            // options
            itemSelector: '.grid_item',
            columnWidth: '.grid_sizer',
            percentPosition: true,
            horizontalOrder: false,
            originLeft: true,
            originTop: true
        });


        /* 스크롤 */
        $window.on('load scroll', function (){
            var $rowgroup = $("[class^=\'rowgroup\']"),
                scrollTop = $(window).scrollTop();

            $rowgroup.each(function (index){
                var rowgroupOffset = $(this).offset().top;

                if(rowgroupOffset < scrollTop + 500) {
                    $rowgroup.eq(index).addClass('active');
                }
            });

            var collectionBottom = $('.collection').offset().top + $('.collection').outerHeight(),
                windowBottom = $window.scrollTop() + $(window).height();

            if(collectionBottom < windowBottom + 108){
                $('html').addClass('end');
            } else {
                $('html').removeClass('end');
            }


        });




    });
})(window.jQuery);
