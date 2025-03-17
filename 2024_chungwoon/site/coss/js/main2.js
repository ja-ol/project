(function($) {
    'use strict';

    $(function() {


        var $window = $(window),
            $container = $('#container');


        /* visual */
        $window.on('load',function (){
            $visual.addClass('on');
        });

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


        /* gallery  */
        var $gallery = $container.find('.gallery'),
            $galleryList1 = $gallery.find('.gallery_list.n1'),
            $galleryList2 = $gallery.find('.gallery_list.n2'),
            $galleryList1Html = $gallery.find('.gallery_list.n1').html(),
            $galleryPrev = $gallery.find('.gallery_prev'),
            $galleryNext = $gallery.find('.gallery_next'),
            $galleryItem,
            last;

        $galleryList1.slick({
            autoplay : false,
            speed: 700,
            dots : false,
            swipe : false,
            draggable : false,
            initialSlide: -1,
            arrows:false,
            variableWidth: false,
            infinite: true,
        })

        var $galleryList2Html = $visual.find('.gallery_list.n2').html(),
            $galleryListItem,
            last;

        $galleryList2.slick({
            autoplay : false,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            variableWidth: false,
            centerMode: false,
            fade: true,
            swipe: false,
            draggable: false,
            prevArrow : $galleryPrev,
            nextArrow : $galleryNext,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 4,
                        fade: false,
                        swipe: true,
                        draggable: true,
                        variableWidth: true,
                    }
                },
            ]
        });

        $galleryList2.after('<div class="gallery_list n3"></div>');
        $('.gallery_list.n3').html($galleryList1Html);
        var $galleryList3 = $gallery.find('.gallery_list.n3');

        $galleryList3.slick({
            autoplay : false,
            speed: 700,
            slidesToShow: 4,
            swipe : false,
            draggable : false,
            variableWidth: true,
            infinite: true,
            arrows:false,
            initialSlide: 1,
        });

        $galleryList2.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $galleryList1.slick('slickGoTo', nextSlide - 1);
            $galleryList3.slick('slickGoTo', nextSlide + 1);
        });


        /* sns */
        var $sns = $container.find('.sns'),
            $snsTabButton = $sns.find('.tab_button'),
            $snsTabPanel = $sns.find('.sns_panel'),
            $snsSlickOpt = {
                slidesToShow : 4,
                slidesToScroll : 1,
                infinite : true,
                arrows : false,
                autoplay : false,
                swipe: false,
                draggable : false,
                variableWidth : true,
                responsive: [
                    {
                        breakpoint: 1001,
                        settings: {
                            swipe: true,
                            draggable: true,
                        }
                    },
                ]
            };
        $('.sns .sns_panel.active .sns_list').slick($snsSlickOpt).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
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

        $snsTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().children('.tab_button').removeAttr('title');
            $snsTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');

            $snsTabPanel.each(function () {
                $(this).find('.program_list').slick('unslick');
                $snsTabPanel.eq(parentIndex).find('.sns_list').slick($snsSlickOpt).slick('setPosition');
            })
        });


        /* schedule */
        var $schedule = $container.find('.schedule'),
            $scheduleList = $schedule.find('.schedule_list'),
            $schedulePrev = $schedule.find('.schedule_prev'),
            $scheduleNext = $schedule.find('.schedule_next');

        $scheduleList.slick({
            infinite : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            prevArrow : $schedulePrev,
            nextArrow : $scheduleNext,
            dots: true,
            appendDots: $schedule.find('.schedule_dots'),
            responsive: [
                {
                    breakpoint: 751,
                    settings: {
                        slidesToShow : 2,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        infinite : false,
                        slidesToShow : 2,
                        slidesToScroll : 2,
                    }
                },
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


        /* fade */
        var $fade = $('.fade');

        function fade() {
            $fade.each(function () {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $window.scrollTop() + $window.height();

                if($(this).hasClass('rowgroup5')){
                    if (bottom_of_window > bottom_of_object / 1.1) {
                        $(this).addClass('show');
                    } else {
                        $(this).removeClass('show');
                    }
                }
                else if($(this).hasClass('rowgroup6')){
                    if (bottom_of_window > bottom_of_object / 1.1) {
                        $(this).addClass('show');
                    } else {
                        $(this).removeClass('show');
                    }
                }
                else{
                    if (bottom_of_window > bottom_of_object / 1.2) {
                        $(this).addClass('show');
                    } else {
                        $(this).removeClass('show');
                    }
                }
            });
        }

        fade();
        $window.scroll(function () {
            fade();
        });


    });
})(jQuery);




