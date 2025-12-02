(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $wrapper = $('#wrapper'),
            $container = $('#container');


        $window.load(function(){
            $('.rowgroup, .rowgroup2').addClass('show');
        });


        //popupzone
        var $popupzone = $container.find('.popupzone'),
            $popupzoneList = $popupzone.find('.popupzone_list'),
            popupzoneListHtml = $popupzoneList.html(),
            $popupzoneItem = $popupzoneList.find('.popupzone_item'),
            ItemLength = $popupzoneItem.length,
            $popupzonePrev =  $popupzone.find('.popupzone_button.prev'),
            $popupzoneNext =  $popupzone.find('.popupzone_button.next');

        $popupzoneList.slick({
            fade: true,
            pauseOnHover: false,
            swipe : false,
            draggable : false,
            slidesToShow : 1,
            slidesToScroll: 1,
            autoplay: false,
            infinite: true,
            variableWidth: false,
            focusOnSelect: true,
            swipeToSlide: true,
            prevArrow: $popupzonePrev,
            nextArrow: $popupzoneNext,
            zIndex: 5,
            responsive : [
                {
                    breakpoint: 641,
                    settings: {
                        swipe: true,
                        draggable: true,
                        fade: false,
                    }
                }
            ]
        });

        //모아보기
        var $popupzoneAll = $wrapper.find('.popupzone_all'),
            $popupzoneAllCount = $popupzoneAll.find('.popupzone_all_title em'),
            $popupzoneAllList = $popupzoneAll.find('.popupzone_all_list'),
            $popupzoneAllPrev = $popupzoneAll.find('.popupzone_all_button.prev'),
            $popupzoneAllNext = $popupzoneAll.find('.popupzone_all_button.next');

        $popupzoneAllList.append(popupzoneListHtml);
        $popupzoneAllCount.text(ItemLength);
        $popupzoneAllList.slick({
            autoplay : false,
            infinite : true,
            dots : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            rows : 2,
            slidesPerRow : 3,
            prevArrow : $popupzoneAllPrev,
            nextArrow : $popupzoneAllNext,
            responsive : [
                {
                    breakpoint: 1001,
                    settings: {
                        rows : 2,
                        slidesPerRow : 2,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        rows : 2,
                        slidesPerRow : 1,
                    }
                },
            ]
        });

        var savedScrollTop = 0;
        var $focuspoint;

        $('.popupzone .popupzone_button.more').on('click', function () {
            savedScrollTop = $(window).scrollTop();
            $focuspoint = $(this);

            $('body').addClass('popupzone_open');
            $('html, body').scrollTop(0);

            $('.popupzone_all').attr('tabindex', '0'); // 포커스 가능한 요소로
            setTimeout(function () {
                $('.popupzone_all_list .slick-slide div a').first().focus();
            }, 30);
        });

        $('.popupzone_all .popupzone_close').on('click', function () {
            $('body').removeClass('popupzone_open');
            $('html, body').scrollTop(savedScrollTop);

            if ($focuspoint && $focuspoint.length) {
                $focuspoint.focus();
            }
        });


        //board
        var $board = $container.find('.board'),
            $boardTabItem = $board.find('.board_tab .tab_item'),
            $boardPanel = $board.find('.board_panel'),
            $boardPanelList = $board.find('.board_panel .board_list'),
            $boardPanelItem = $board.find('.board_panel .board_item'),
            $boardPanelTitle = $board.find('.board_panel h3'),
            $boardPrev = $board.find('.board_button.prev'),
            $boardNext = $board.find('.board_button.next'),
            boardSlickOpt = {
                infinite: false,
                draggable: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                autoplay: false,
                prevArrow: $boardPrev,
                nextArrow: $boardNext,
                responsive: [
                    {
                        breakpoint: 1201,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            },
            slickEnabled = false,
            currentType = 'all',
            $boardOriginal = $boardPanelItem.clone();

        // 모바일에서는 3개만
        function renderItems() {
            var $items = (currentType === 'all')
                ? $boardOriginal
                : $boardOriginal.filter('[data-type="' + currentType + '"]');

            if (window.innerWidth <= 800) {
                $items = $items.slice(0, 3);
            }
            $boardPanelList.html($items);
        }

        function initBoardSlick() {
            if (window.innerWidth > 800) {
                if (!slickEnabled) {
                    $boardPanelList.slick(boardSlickOpt);
                    slickEnabled = true;
                }
            } else {
                if (slickEnabled) {
                    $boardPanelList.slick('unslick');
                    slickEnabled = false;
                }
            }
        }

        $boardTabItem.on('click', function () {
            var $this = $(this),
                thisIdx = $this.index(),
                newPanelTitle = $this.find('button').text(),
                data = $this.data();

            currentType = data.type;

            $boardTabItem.removeAttr('title');
            $this.attr('title', '선택됨').addClass('active').siblings().removeClass('active');
            $boardPanelTitle.text(newPanelTitle + ' 목록');
            if (thisIdx === 0) {
                $board.find('.board_more').attr('href', '0');
            } else if (thisIdx === 1) {
                $board.find('.board_more').attr('href', '1');
            } else if (thisIdx === 2) {
                $board.find('.board_more').attr('href', '2');
            } else if (thisIdx === 3) {
                $board.find('.board_more').attr('href', '3');
            } else if (thisIdx === 4) {
                $board.find('.board_more').attr('href', '4');
            } else if (thisIdx === 5) {
                $board.find('.board_more').attr('href', '5');
            }

            if (slickEnabled) {
                $boardPanelList.slick('unslick');
                slickEnabled = false;
            }

            renderItems();
            initBoardSlick();
        });


        if ($boardPanelList.hasClass('slick-initialized')) {
            $boardPanelList.slick('unslick');
            slickEnabled = false;
        }
        $boardTabItem.filter('.active').triggerHandler('click');


        var resizeTimer = null;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (slickEnabled) {
                    $boardPanelList.slick('unslick');
                    slickEnabled = false;
                }
                renderItems();
                initBoardSlick();
            }, 120);
        });



        $('.board .board_tab .tab_list').on('scroll', function () {
            var $this = $(this),
                scrollLeft = $this.scrollLeft(),
                scrollWidth = $this[0].scrollWidth,
                outerWidth = $this.outerWidth();

            if (scrollLeft + outerWidth >= scrollWidth - 1) {
                $this.closest('.board_tab').addClass('end');
            } else {
                $this.closest('.board_tab').removeClass('end');
            }
        });


        //photo
        var $photo = $container.find('.photo'),
            $photoBox = $photo.find('.photo_box'),
            $photoAnchor = $photoBox.find('.photo_anchor');

        $photoAnchor.on('mouseover', function (){
            $photoBox.addClass('on');
        });
        $photoAnchor.on('mouseleave', function (){
            $photoBox.removeClass('on');
        });


        // service
        var $service = $container.find('.service'),
            $serviceItem = $service.find('.service_item'),
            $serviceButton = $serviceItem.find('.service_button'),
            $serviceContent = $serviceItem.find('.service_content');

        function setService() {
            if (window.innerWidth > 640) {
                $serviceButton.off('click');
                $serviceItem.removeClass('active');
                $serviceButton.attr('title', '열기');
                $serviceContent.stop(true, true).removeAttr('style').show().attr('title', '열림');

            } else {
                $serviceItem.removeClass('active');
                $serviceButton.attr('title', '열기');
                $serviceContent.stop(true, true).hide().attr('title', '닫힘');

                $serviceButton.off('click').on('click', function () {
                    var $this = $(this),
                        $item = $this.closest('.service_item'),
                        $content = $item.children('.service_content'),
                        $others = $item.siblings('.service_item');

                    if ($item.hasClass('active')) {
                        $this.attr('title', '열기');
                        $item.removeClass('active');
                        $content.stop(true, true).slideUp().attr('title', '닫힘');
                    } else {
                        $this.attr('title', '닫기');
                        $item.addClass('active');
                        $content.stop(true, true).slideDown().attr('title', '열림');

                        $others.removeClass('active').find('.service_content').stop(true, true).slideUp().attr('title', '닫힘');
                        $others.find('.service_button').attr('title', '열기');
                    }
                });
            }
        }
        setService();

        $(window).on('resize', function () {
            setService();
        });


        //shortcut
        var $shortcut = $container.find('.shortcut'),
            $shortcutList = $shortcut.find('.shortcut_list'),
            $shortcutPrev =  $shortcut.find('.shortcut_button.prev'),
            $shortcutNext =  $shortcut.find('.shortcut_button.next');

        $shortcutList.slick({
            draggable: false,
            infinite: true,
            slidesToShow: 10,
            slidesToScroll: 1,
            rows: 1,
            arrows: true,
            prevArrow: $shortcutPrev,
            nextArrow: $shortcutNext,
            responsive: [
                {
                    breakpoint: 1601,
                    settings: {
                        slidesToShow: 9
                    }
                },
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow: 7
                    }
                },
                {
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 6
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 801,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        rows: 2
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        rows: 2
                    }
                },
            ]
        });


        //tour
        var $tour = $container.find('.tour'),
            $tourList = $tour.find('.tour_list'),
            $tourAuto =  $tour.find('.tour_button.auto');

        $tourList.slick({
            fade: true,
            speed: 1500,
            draggable: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            autoArrow: $tourAuto,
            dots: true,
            appendDots: $tour.find('.tour_dots'),
            customPaging : function (slider, i) {
                return '<button type="button"><span>' + (i + 1) + '번째 보기</span></button>';
            },
        }).on('afterChange', function(event, slick, currentSlide){
            if(currentSlide === 1){
                $('.tour_control').addClass('n2');
            } else {
                $('.tour_control').removeClass('n2');
            }
        });


        //Top
        var $bodyHtml = $('body,html'),
            $upButton = $('#footer').find('.up_button'),
            windowTop = 0,
            windowArea = 0;

        $upButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0}, 250);
        });

        $window.on('scroll resize load', function () {
            if($window.scrollTop() > 200){
                $upButton.addClass('show');
            }else{
                $upButton.removeClass('show');
            }

            var footerBottom = $('#footer').offset().top + $('#footer').outerHeight();
            var windowBottom = $window.scrollTop() + $window.height();

            if (windowBottom >= footerBottom - 1)  {
                $upButton.addClass('fixed');
            } else {
                $upButton.removeClass('fixed');
            }
        }).trigger('scroll');


        //fade
        var $fade = $container.find('.fade');

        function fade() {
            $fade.each(function(i) {
                var top_of_object = $(this).offset().top;
                var bottom_of_window = $window.scrollTop() + $window.height();

                if (bottom_of_window > top_of_object) {
                    $(this).addClass('show');
                } else {
                    $(this).removeClass('show');
                }
            });
        }

        fade();
        $window.scroll(function () {
            fade();
        });

    });
})(window.jQuery);
