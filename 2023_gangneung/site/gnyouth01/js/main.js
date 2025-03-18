(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');


        /* 비주얼 */
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualPrev = $visual.find('.visual_prev'),
            $visualNext = $visual.find('.visual_next'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal = $visual.find('.visual_total'),
            $visualAuto = $visual.find('.visual_auto');

        $visualList.slick({
            autoplay : true,
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
            customState : function(state) {
                if (state.current < 10) {
                    state.current = '0' + state.current;
                }
                if (state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            }
        });


        /* 프로그램 */
        var $program = $container.find('.program'),
            $programList = $program.find('.program_list'),
            $programPrev = $program.find('.program_prev'),
            $programNext = $program.find('.program_next');

        $programList.slick({
            autoplay : false,
            draggable : true,
            infinite : false,
            slidesToShow : 4,
            arrows : true,
            prevArrow : $programPrev,
            nextArrow : $programNext,
            responsive: [
                {
                    breakpoint: 1501,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 501,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });


        /* 자주찾는 서비스 */
        var $service = $container.find('.service'),
            $serviceList = $service.find('.service_list');

        $serviceList.on('scroll',function(){
            var $this = $(this);

            if( $this[0].scrollWidth - $this.scrollLeft() - '20' <= $this.outerWidth()) {
                $service.addClass('end');
            }else{
                $service.removeClass('end');
            }
        });


    });
})(window.jQuery);
