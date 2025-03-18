(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');


        /* 비주얼 */
        $window.on('load',function (){
            $visual.addClass('on');
        });

        var $visual = $container.find(".visual"),
            $visualList = $visual.find(".visual_list"),
            $visualPrev = $visual.find('.visual_prev'),
            $visualNext = $visual.find('.visual_next'),
            $visualCurrent = $visual.find(".visual_current"),
            $visualTotal = $visual.find(".visual_total"),
            $visualAuto = $visual.find(".visual_auto");

        $visualList.slick({
            fade : true,
            autoplay : true,
            autoplaySpeed: 4000,
            draggable : true,
            infinite : true,
            slidesToShow : 1,
            arrows : true,
            prevArrow : $visualPrev,
            nextArrow : $visualNext,
            autoArrow : $visualAuto,
            pauseText : '정지',
            playText : '재생',
            current : $visualCurrent,
            total : $visualTotal,
        });



        /* 시설안내 */
        var $facility = $container.find('.facility'),
            $facilityList = $facility.find('.facility_list.n1'),
            $facilityListHtml = $facility.find('.facility_list').html(),
            $facilityPrev = $facility.find('.facility_prev'),
            $facilityNext = $facility.find('.facility_next'),
            $facilityAuto = $facility.find('.facility_auto'),
            $facilityCurrent = $facility.find(".facility_current"),
            $facilityTotal = $facility.find(".facility_total"),
            $facilityProgress =  $facility.find('.progress_bar');

        $facilityList.after('<div class="facility_list n2"></div>');
        $('.facility_list.n2').html($facilityListHtml);
        var $facilityList2 = $facility.find('.facility_list.n2');


        $facilityList.slick({
            autoplaySpeed : 4000,
            fade : true,
            autoplay : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : true,
            prevArrow : $facilityPrev,
            nextArrow : $facilityNext,
            autoArrow : $facilityAuto,
            pauseText : '정지',
            playText : '재생',
            current : $facilityCurrent,
            total : $facilityTotal,
            swipe : true,
            draggable : true,
            setPosition: 0,
        }).on('beforeChange', function(event, slick, current, next){
            $facilityList2.slick('slickGoTo', next + 1);
            $facilityProgress.removeClass('on');
        }).on('afterChange', function(e, slick, current, next) {
            $facilityProgress.addClass('on');
        });

        $facilityList2.slick({
            autoplay: false,
            slidesToShow : 1,
            slidesToScroll : 1,
            initialSlide: 1,
            swipe : false,
            draggable : false,
            variableWidth : true,
            infinite : false,
            arrows : false,
            dots : false,
            swipeToSlide : true,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 5,
                    }
                },

            ]
        }).on('beforeChange', function(event, slick, current, next) {
            $facilityList.slick('slickGoTo', next);
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
        }); // 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때도 트랜지션이 적용되기 위한 코드입니다.;

        $facilityAuto.on('click', function(){
            if($(this).hasClass('slick-pause')){
                $facility.removeClass('pause');
            } else {
                $facility.addClass('pause');
            }
        });


        /* 바로가기 */
        var $shortcut = $container.find('.shortcut'),
            $shortcutList = $shortcut.find('.shortcut_list');

        $shortcutList.slick({
            slidesToShow: 7,
            slidesToScroll : 1,
            infinite : false,
            dots : true,
            appendDots: $shortcut.find('.shortcut_dots'),
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                    }
                },
                {
                    breakpoint: 601,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 451,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
            ]
        });


        /* 포토갤러리 */
        var $photo = $container.find('.photo'),
            $photoList = $photo.find('.photo_list');

        $photoList.slick({
            autoplay : false,
            slidesToShow : 2,
            slidesToScroll : 2,
            arrow : false,
            dots : true,
            appendDots: $photo.find('.photo_dots'),
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        variableWidth : true,
                    }
                },
            ]
        });


    });
})(window.jQuery);
