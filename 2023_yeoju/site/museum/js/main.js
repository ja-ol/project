(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');


        /* 비주얼 */
        $window.on('load',function (){
            setTimeout(function() { $('.visual').addClass('on');}, 500);
        });

        var $visual = $container.find(".visual"),
            $visualList = $visual.find(".visual_list"),
            $visualCurrent = $visual.find(".visual_current"),
            $visualTotal = $visual.find(".visual_total"),
            $visualAuto = $visual.find(".visual_auto"),
            $visualProgress =  $visual.find('.progress_bar');

        $visualList.slick({
            autoplay: true,
            draggable: true,
            infinite: true,
            slidesToShow: 1,
            pauseText: '정지',
            playText: '재생',
            autoArrow: $visualAuto,
            current: $visualCurrent,
            total: $visualTotal,
            customState : function(state) {
                var slidesToShow = $visualList.slick('getSlick').options.slidesToShow,
                    current = Math.ceil(state.current / slidesToShow),
                    total = Math.ceil(state.total / slidesToShow);
                if (current < 10) {
                    state.current = '0' + current;
                }
                if (total < 10) {
                    state.total = '0' + total;
                }
                return state;
            }
        }).on("beforeChange",function(event, slick, currentSlide, nextSlide) {
            $visualProgress.removeClass('on');
            $('.visual_list').slick('resize');
        }).on('afterChange', function(event, slick, current){
            $visualProgress.addClass('on');
            $('.visual_list').slick('resize');
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
            $exhibitsNext = $exhibit.find('.exhibit_next'),
            $exhibitAuto = $exhibit.find('.exhibit_auto');

        $exhibitList.slick({
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow : $exhibitPrev,
            nextArrow : $exhibitsNext,
            autoArrow: $exhibitAuto,
            pauseText: '정지',
            playText: '재생',
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow: 4,
                        variableWidth : true,
                    }
                }
            ]
        }).on('afterChange', function(event, slick, current) {
            const _last = slick.slideCount - slick.options.slidesToShow

            if (_last === current) {
                $exhibitList.slick('slickPause')
                $exhibitAuto.removeClass('slick-pause').addClass('slick-play').text('재생');
                $exhibit.addClass('end');
            }else{
                $exhibit.removeClass('end');
            }
        });

        $(document).on('click','.exhibit .exhibit_auto, .exhibit .exhibit_next.slick-disabled',function(){
            if($('.exhibit').hasClass('end')){
                $exhibitList.slick('slickGoTo',0);

                setTimeout(function(){
                    $exhibitList.slick('slickPlay');
                    $exhibitAuto.removeClass('slick-play').addClass('slick-pause').text('정지');
                },800);
            }
        });



        /* 팝업존 */
        var $popupzone = $container.find('.popupzone'),
            $popupzoneList = $popupzone.find('.popupzone_list'),
            $popupzoneAuto =  $popupzone.find('.popupzone_auto'),
            $popupzonePrev =  $popupzone.find('.popupzone_prev'),
            $popupzoneNext =  $popupzone.find('.popupzone_next');

        $popupzoneList.slick({
            slidesToShow: 1,
            autoplay: true,
            infinite: true,
            playText: '재생',
            pauseText: '정지',
            autoArrow: $popupzoneAuto,
            prevArrow: $popupzonePrev,
            nextArrow: $popupzoneNext,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        variableWidth : true,
                    }
                }
            ]
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            if (currentSlide !== nextSlide) {
                $('.slick-active + .slick-cloned').each(function (index, node) {
                    var $node = $(node);
                    setTimeout(function () {
                        $node.addClass('slick-current');
                        $node.addClass('slick-active');
                    });
                });
            }
        });



        /* 전시관 안내 */
        var $guide = $container.find('.guide'),
            $guideSlideImg = $guide.find('.guide_slide_img .img_list'),
            $guideSlideInfo = $guide.find('.guide_slide_info .info_list'),
            $guidePrev = $guide.find('.guide_prev'),
            $guideNext = $guide.find('.guide_next'),
            $progressBar =  $guide.find('.progress'),
            $progressBarLabel = $guide.find('.progress_span' );

        $guideSlideImg.slick({
            slidesToShow: 1,
            arrows: true,
            fade: true,
            prevArrow : $guidePrev,
            nextArrow : $guideNext,
            asNavFor: $guideSlideInfo,
            dots : true,
            appendDots : $('.guide_wrap .guide_dots'),
            customPaging: function (slider, i) {
                var title = $(slider.$slides[i]).data('title');
                return '<button type="button" class="dots_title">' + title + ' </button>';
            }
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;

            $progressBar
                .css('background-size', calc + '% 100%')
                .attr('aria-valuenow', calc );

            $progressBarLabel.text( calc + '% completed' );

            const _last = slick.slideCount - slick.options.slidesToShow - 1
            if (_last === currentSlide) {
                $progressBar.addClass('last');
            } else{
                $progressBar.removeClass('last');
            }
        });
        $guideSlideInfo.slick({
            slidesToShow: 1,
            arrows: false,
            fade: true,
            asNavFor: $guideSlideImg,
        });


        /* 스크롤 */
        $window.on('load scroll', function (){
            var $rowgroup = $("[class^=\'rowgroup\']"),
                scrollTop = $(window).scrollTop();

            $rowgroup.each(function (index){
                var rowgroupOffset = $(this).offset().top;

                if(rowgroupOffset < scrollTop + 500) {
                    $rowgroup.eq(index).addClass('active');
                } /*else {
                    $rowgroup.eq(index).removeClass('active');
                }*/
            })
        })


    });
})(window.jQuery);
