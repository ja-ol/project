(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');


        /* 비주얼 */
        $window.on('load',function (){
            $('.visual').addClass('active');
        })

        var $visual = $container.find(".visual"),
            $visualList = $visual.find(".visual_list"),
            $visualCurrent = $visual.find(".visual_current"),
            $visualTotal = $visual.find(".visual_total"),
            $visualAuto = $visual.find(".visual_auto");

        var time = 3;
        var $bar, isPause, tick, percentTime;
        $bar = $(".visual .visual_control .progress_bar span");

        function digit(i) {
            if (i < 10) i = "0" + i;
            return i;
        }

        $visualList.on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
            var current = (currentSlide ? currentSlide : 0) + 1;
            current = digit(current);
            var total = digit(slick.slideCount);
            $visualCurrent.text(current);
            $visualTotal.text(total);
        });

        $visualList.slick({
            autoplay: true,
            draggable: false,
            infinite: true,
            slidesToShow: 1,
            fade: true,
            arrow: false,
        });

        $visualAuto.on("click", function () {
            if ($(this).hasClass("slick-play")) {
                isPause = false;
                $(this).removeClass("slick-play");
                $(this).text("정지");
            } else {
                isPause = true;
                $(this).addClass("slick-play");
                $(this).text("재생");
            }
        });

        function startProgressbar() {
            resetProgressbar();
            percentTime = 0;
            isPause = false;
            tick = setInterval(interval, 10);
        }

        function interval() {
            if (isPause === false) {
                percentTime += 1 / (time + 0.1);
                $bar.css({
                    width: percentTime + "%",
                });
                if (percentTime >= 100) {
                    $visualList.slick("slickNext");
                    startProgressbar();
                }
            }
        }

        function resetProgressbar() {
            $bar.css({
                width: 0 + "%",
            });
            clearTimeout(tick);
        }
        startProgressbar();

        $visualList.on("beforeChange", function (event, currentSlide, nextSlide) {
            if (!$(".visual_auto").hasClass("slick-play")) {
                startProgressbar();
            }
        });


        /* webzine */
        var $webzine = $container.find('.webzine'),
            $webzineInner = $webzine.find('.webzine_inner'),
            $webzineList = $webzineInner.find('.webzine_list'),
            $webzineDots = $webzineInner.find('.webzine_dots');

        $webzineList.slick({
            autoplay: false,
            infinite: false,
            slidesToShow : 1,
            slidesToScroll : 1,
            dots: true,
            appendDots: $webzineDots,
        });


        /* 포토갤러리 */
        var $gallery = $('.gallery'),
            $galleryList = $gallery.find('.gallery_list'),
            $galleryControl = $gallery.find('.gallery_control');

        $galleryList.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrow: true,
            autoplay: false,
            draggable: false,
            infinite: true,
            prevArrow: $galleryControl.find('.gallery_prev'),
            nextArrow: $galleryControl.find('.gallery_next'),
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow  : 3,
                        draggable: true,
                        variableWidth: true,
                    },
                },
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow  : 2,
                        draggable: true,
                        variableWidth: true,
                    },
                }]
        }).on('beforeChange', function (e, slick, current, next) {
            var $galleryClone = $galleryList.find('.slick-cloned');

            if (next >= (slick.slideCount - slick.options.slidesToShow)){
                console.log($galleryClone.eq(0).html())
                $galleryClone.eq(0).addClass('active');
            } else if (next === 0) {
                $galleryClone.eq(1).addClass('active');
            } else {
                $galleryClone.removeClass('active');
            }
        }).on('afterChange', function (e, slick, current, next) {
            var $galleryClone = $galleryList.find('.slick-cloned');
            $galleryClone.removeClass('active');
        });

    });
})(window.jQuery);