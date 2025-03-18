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
            autoplaySpeed : 5000,
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


        /* 오늘의 식단 */
        var $menu = $container.find('.menu'),
            $menuList = $menu.find('.menu_list'),
            $menuPrev = $menu.find('.menu_prev'),
            $menuNext = $menu.find('.menu_next');

        $menuList.slick({
            autoplay : false,
            draggable : true,
            infinite : true,
            slidesToShow : 1,
            prevArrow : $menuPrev,
            nextArrow : $menuNext,
        });


        /* 팝업존 */
        var $popupzone = $container.find('.popupzone'),
            $popupzoneCurrent = $popupzone.find('.popupzone_current'),
            $popupzoneTotal = $popupzone.find('.popupzone_total'),
            $popupzoneAuto = $popupzone.find('.popupzone_auto'),
            $popupzonePrev = $popupzone.find('.popupzone_prev'),
            $popupzoneNext = $popupzone.find('.popupzone_next'),
            $popupzoneSlickOpt = {
                slidesToShow: 1,
                autoplay: true,
                current: $popupzoneCurrent,
                total: $popupzoneTotal,
                playText: '재생',
                pauseText: '정지',
                autoArrow: $popupzoneAuto,
                prevArrow: $popupzonePrev,
                nextArrow: $popupzoneNext,
                customState : function(state) {
                    if (state.current < 10) {
                        state.current = '0' + state.current;
                    }
                    if (state.total < 10) {
                        state.total = '0' + state.total;
                    }
                    return state;
                },
            }
        $('.popupzone .popupzone_list').slick($popupzoneSlickOpt);



        /* 일정안내 */
        var $schedule = $container.find('.schedule'),
            $scheduleScroll = $schedule.find('.schedule_box .day_scroll'),
            $scheduleList = $schedule.find('.schedule_box .day_list'),
            $scheduleItem = $schedule.find('.schedule_box .day_item'),
            $scheduleButton = $schedule.find('.schedule_box .day_item .day_button');

        $scheduleButton.on('click', function () {
            var $this = $(this);
            $this.parent().addClass('active').attr('title','선택됨');
            $this.parent().siblings().removeClass('active').removeAttr('title');
        });

        if ($scheduleItem.length > 30) {
            $('.day_list').addClass('long');
        }

        $scheduleList.on('scroll',function(){
            var $this = $(this);

            if( $this[0].scrollWidth - $this.scrollLeft() - '20' <= $this.outerWidth()) {
                $scheduleScroll.addClass('end');
            }else{
                $scheduleScroll.removeClass('end');
            }
        });



        /* 프로그램 안내 */
        var $program = $container.find('.program'),
            $programTabButton = $program.find('.tab_button'),
            $programTabPanel = $program.find('.program_panel'),
            $programPrev = $program.find('.program_prev'),
            $programNext = $program.find('.program_next'),
            $programSlickOpt = {
                autoplaySpeed : 4000,
                fade : true,
                slidesToShow : 1,
                slidesToScroll : 1,
                infinite : true,
                arrows : true,
                autoplay : false,
                prevArrow : $programPrev,
                nextArrow : $programNext,
                swipe : true,
                draggable : true,
                setPosition: 0,
            },
            $programSlickOpt2 = {
                autoplay: false,
                slidesToShow : 1,
                slidesToScroll : 1,
                initialSlide: 1,
                swipe : false,
                draggable : false,
                variableWidth : true,
                infinite : true,
                arrows : false,
                dots : false,
                swipeToSlide : true,
            };

        $('.program .program_panel.active .program_list.n1').slick($programSlickOpt).on('beforeChange', function(event, slick, current, next){
            $('.program_panel.active .program_list.n2').slick('slickGoTo', next + 1);
        });

        $('.program .program_panel.active .program_list.n2').slick($programSlickOpt2).on('beforeChange', function(event, slick, current, next) {
            $('.program_panel.active .program_list.n1').slick('slickGoTo', next);
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


        $programTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().children('.tab_button').removeAttr('title');
            $programTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');

            $programTabPanel.each(function () {

                $(this).find('.program_list.n1').slick('unslick');
                $programTabPanel.eq(parentIndex).find('.program_list.n1').slick($programSlickOpt).slick('setPosition').on('beforeChange', function(event, slick, current, next){
                    $('.program_panel.active .program_list.n2').slick('slickGoTo', next + 1);
                });

                $(this).find('.program_list.n2').slick('unslick');
                $programTabPanel.eq(parentIndex).find('.program_list.n2').slick($programSlickOpt2).slick('setPosition').on('beforeChange', function(event, slick, current, next) {
                    $('.program_panel.active .program_list.n1').slick('slickGoTo', next);
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
            })
        });


        /* 포토갤러리 */
        var $photo = $container.find('.photo'),
            $photoList = $photo.find('.photo_list');

        $photoList.slick({
            infinite : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            draggable : true,

            variableWidth : true,
            centerMode: false,
            dots : false,
            arrows : false,
            cssEase: 'ease-in-out',
            initialSlide: 1,
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

    });
})(window.jQuery);
