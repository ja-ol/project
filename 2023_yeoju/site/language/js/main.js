(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');


        /* 비주얼 */
        var $visual = $('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal =  $visual.find('.visual_total'),
            $visualAuto = $visual.find('.visual_auto'),
            $visualProgress =  $visual.find('.progress_bar'),
            $navList = $visual.find('.nav_list');


        $window.on('load',function (){
            $visual.addClass('on');
            /*$navList.find(".nav_item.slick-active").next().addClass('next_on').next().addClass('next_on');*/
            setTimeout(function(){
                $navList.find(".nav_item.slick-current").addClass('now');
            });

        });


        $visualList.slick({
            autoplay : true,
            fade : true,
            speed : 1500,
            autoplaySpeed : 4000,
            swipe : false,
            draggable: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite : true,
            pauseOnHover: true,
            prevArrow : false,
            nextArrow : false,
            autoArrow : $visualAuto,
            pauseText : '정지',
            playText : '재생',
            current : $visualCurrent,
            total : $visualTotal,
            asNavFor: $navList,
            dots: true,
            appendDots : $('.visual .visual_slide .visual_dots'),
            customPaging: function (slider, i) {
                var title = $(slider.$slides[i]).data('title');
                return '<button type="button" class="dots_title">' + title + ' </button>';
            },
            customState : function(state) {
                if (state.current < 10) {
                    state.current = '0' + state.current;
                }
                if (state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        swipe : true,
                        draggable : true
                    }
                }
            ]
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

        $navList.slick({
            swipe: false,
            speed : 1500,
            autoplaySpeed : 4000,
            draggable: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: true,
            arrows: false,
            dots: false,
            asNavFor: $visualList,
            focusOnSelect: true,
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $currentslide = $(slick.$slides[currentSlide]),
                $nextslide = $(slick.$slides[nextSlide]);
            setTimeout(function(){
                $nextslide.addClass('now');
                $currentslide.removeClass('now');
            }, 1000);

            if (currentSlide !== nextSlide) {
                $('.slick-active + .slick-cloned').each(function (index, node) {
                    var $node = $(node);
                    setTimeout(function () {
                        $node.addClass('slick-active');
                    });
                });
            }

        });


        /* 투어 */
        var $tourism = $container.find('.tourism'),
            $tourismSlide = $tourism.find('.tourism_slide'),
            $tourismList = $tourism.find('.tourism_list'),
            $nextSlide = $tourism.find('.next_slide'),
            $tourismPrev = $tourismSlide.find('.tourism_prev'),
            $tourismNext = $tourismSlide.find('.tourism_next');

        $tourismList.slick({
            autoplay : false,
            fade : true,
            speed : 1000,
            infinite : true,
            draggable :false,
            slidesToShow : 1,
            slidesToScroll : 1,
            arrows : true,
            prevArrow : $tourismPrev,
            nextArrow : $tourismNext,
            pauseText : '정지',
            playText : '재생',
        }).on('beforeChange', function(event, slick, current, next){
            $nextSlide.slick('slickGoTo', next + 1);
        });

        $nextSlide.slick({
            autoplay : false,
            fade : false,
            speed : 1000,
            infinite : true,
            draggable :false,
            slidesToShow:1,
            slidesToScroll: 1,
            arrows : false,
            initialSlide: 1,
        }).on('beforeChange', function(event, slick, current, next) {
            $tourismList.slick('slickGoTo', next);
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



    });
})(window.jQuery);
