(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');

        $window.on('load',function (){
            $visual.addClass('on');
        });


        /* 비주얼 */
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualPrev = $visual.find('.visual_prev'),
            $visualNext = $visual.find('.visual_next'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal = $visual.find('.visual_total'),
            $visualAuto = $visual.find('.visual_auto'),
            $visualProgress =  $visual.find('.progress_bar');

        $visualList.slick({
            fade : true,
            autoplay : true,
            autoplaySpeed : 4000,
            draggable : true,
            infinite : true,
            slidesToShow : 1,
            pauseText : '정지',
            playText : '재생',
            prevArrow : $visualPrev,
            nextArrow : $visualNext,
            autoArrow : $visualAuto,
            current : $visualCurrent,
            total : $visualTotal,
            customState : function(state) {
                if (state.current < 10) {
                    state.current = '0' + state.current;
                }
                if (state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            }
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

        $('.visual_list .slick-track .visual_item').eq(0).addClass('first');
        /* 한개 이하 */
        if ($('.visual_list .slick-track .visual_item').length < 2 ){
            $visual.addClass('one');
        }



        /* 공연안내 */
        var $performance = $container.find('.performance'),
            $performanceList = $performance.find('.performance_list'),
            $performancePrev = $performance.find('.performance_prev'),
            $performanceNext = $performance.find('.performance_next');

        $performanceList.slick({
            autoplay : false,
            draggable : true,
            infinite : true,
            slidesToShow : 4,
            variableWidth : true,
            prevArrow : $performancePrev,
            nextArrow : $performanceNext,
            responsive: [
                {
                    breakpoint: 1501,
                    settings: {
                        slidesToShow : 3,
                    }
                },
            ]
        });


        /* 자주찾는 메뉴 */
        var $favorite = $container.find('.favorite'),
            $favoriteList = $favorite.find('.favorite_list');

        $favoriteList.on('scroll',function(){
            var $this = $(this);

            if( $this[0].scrollWidth - $this.scrollLeft() - '20' <= $this.outerWidth()) {
                $favorite.addClass('end');
            }else{
                $favorite.removeClass('end');
            }
        });


        /* 일정안내 */
        var $schedule = $container.find('.schedule'),
            $scheduleButton = $schedule.find('.calendar_table td .day'),
            $scheduleClose = $schedule.find('.calendar_table .schedule_layer .schedule_close');

        $scheduleButton.on('click', function () {
            var $this = $(this);
            $this.parent().addClass('active');
            $this.parent().siblings().removeClass('active');
            $this.parent().parents().siblings().children().removeClass('active');
        });

        $scheduleClose.on('click', function (){
            $(this).parents().removeClass('active');
        })

        $('.calendar_table tbody td').each( function (){
            if($(this).children().is('.schedule_layer') === true){
                $(this).children('button').addClass('schedule_open').attr('title','일정보기')
            }
        });


    });
})(window.jQuery);
