(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');


        /* visual */
        $window.load(function(){
            $('.visual').addClass('active');
        });

        var $visualSearch = $container.find('.visual_search'),
            $searchSelect = $visualSearch.find('.search_select'),
            $selectedButton = $searchSelect.find('.selected_button'),
            $selectPanel =  $searchSelect.find('.select_panel'),
            $selectButton = $selectPanel.find('.select_button'),
            $searchOpen = $visualSearch.find('.search_open');

        $selectedButton.on('click', function() {
            var $this = $(this),
                OnOff = $visualSearch.is('.active');

            if(!OnOff){
                $selectPanel.slideDown();
                $visualSearch.addClass('active');
                $selectedButton.attr('title', '접수상태 목록 닫기');
            } else{
                $visualSearch.removeClass('active');
                $selectPanel.slideUp();
                $selectedButton.attr('title', '접수상태 목록 열기');
            }
        });

        $selectButton.click(function() {
            var SelectText = $(this).text();
            $selectedButton.text(SelectText);

            $selectPanel.slideUp();
            $visualSearch.removeClass('active');
        });

        /* 상세검색 */
        $searchOpen.on('click', function (){
            $('.search_detail').addClass('active');
            $('body').addClass('search_popup');
        })
        $('.search_detail .search_close').on('click', function() {
            $(this).parents('.search_detail').removeClass('active');
            $('body').removeClass('search_popup');
        });


        /* 바로가기 */
        var $shortcut = $container.find('.shortcut'),
            $shortcutList = $shortcut.find('.shortcut_list');

        $shortcutList.slick({
            slidesToShow: 7,
            slidesToScroll : 1,
            infinite : false,
            autoPlay : false,
            dots : true,
            appendDots: $shortcut.find('.shortcut_dots'),
            responsive: [
                {
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                    }
                },
                {
                    breakpoint: 801,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
            ]
        });


        /* 프로그램 */
        var $program = $container.find('.program'),
            $ProgramList = $program.find('.program_list'),
            $ProgramPrev = $program.find('.program_prev'),
            $ProgramNext = $program.find('.program_next'),

        programSlickOpt = {
            slidesToShow : 4,
            slidesToScroll: 1,
            autoplay : false,
            draggable : false,
            infinite : true,
            prevArrow : $ProgramPrev,
            nextArrow : $ProgramNext,
            responsive: [
                {
                    breakpoint: 1441,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        };

        $(window).on('load resize', function() {
            if($(window).width() < 1001) {
                $ProgramList.slick('unslick');
            }
            else {
                $ProgramList.not('.slick-initialized').slick(programSlickOpt);
            }
        });

        $ProgramList.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
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

        var $ProgramItem = $('.program_item');

        $ProgramItem.each(function(){
            var $ProgramNum = $(this).find('.progress.num'),
                $programTotal = $(this).find('.progress.total'),
                total = $programTotal.text(),
                num = $ProgramNum.text(),
                per = (num / total) * 100;

            $ProgramNum.css('width', per + '%');
        });


        /* 공지사항 */
        var $board = $container.find('.board'),
            $boardTabButton = $board.find('.tab_button'),
            $boardTabPanel = $board.find('.board_panel');

        $boardTabButton.on('click', function () {
            var $this = $(this),
                thisText = $(this).text(),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $('.board_content').find('.skip').text(thisText + ' 목록')
            $parent.siblings().children('.tab_button').removeAttr('title');
            $boardTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
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
})(window.jQuery);
