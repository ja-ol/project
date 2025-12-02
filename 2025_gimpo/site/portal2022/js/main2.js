(function ($) {
    'use strict';

    $(function () {

        var $window = $(window),
            $html = $('html'),
            $wrapper = $('#wrapper'),
            $container = $('#container');


        /* visual */
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            visualListHtml = $visualList.html(),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal =  $visual.find('.visual_total'),
            $visualAuto = $visual.find('.visual_button.auto'),
            $visualPrev = $visual.find('.visual_button.prev'),
            $visualNext = $visual.find('.visual_button.next');

        $visualList.slick({
            infinite : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            autoplay : true,
            draggable : true,
            current : $visualCurrent,
            total : $visualTotal,
            autoArrow : $visualAuto,
            prevArrow : $visualPrev,
            nextArrow : $visualNext,
            playText : '재생',
            pauseText : '정지',
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

        /* 모아보기 */
        $('.visual .visual_more').on('click',function(){
            $('html').addClass('visual_open');
        });
        $('.visual_all .visual_close').on('click',function(){
            $('html').removeClass('visual_open');
        });

        var $visualAll = $visual.find('.visual_all'),
            $visualAllList = $visualAll.find('.visual_all_list');

        $visualAllList.append(visualListHtml);


        /* service */
        var $service = $container.find('.service'),
            $serviceTabButton = $service.find('.tab_button'),
            $serviceTabPanel = $service.find('.service_panel');

        var $serviceSlickOpt = {
            slidesToShow : 6,
            slidesToScroll : 1,
            rows : 1,
            infinite : false,
            autoplay : false,
            swipe : false,
            draggable : true,
            dots : true,
            customPaging : function (slider, i) {
                return '<button type="button"><span>' + (i + 1) + '번째 보기</span></button>';
            },
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        swipe : true,
                        slidesToShow : 8,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        swipe : true,
                        slidesToShow : 3,
                        slidesToScroll : 3,
                        rows : 2
                    }
                }
            ]
        };

        $serviceTabPanel.each(function () {
            var $panel = $(this);
            if ($panel.hasClass('active')) {
                var $servicelist = $panel.find('.service_list');
                var $serviceprev = $panel.find('.service_button.prev');
                var $servicenext = $panel.find('.service_button.next');
                var $servicedots = $panel.find('.service_dots');

                $servicelist.slick($.extend({}, $serviceSlickOpt, {
                    prevArrow: $serviceprev,
                    nextArrow: $servicenext,
                    appendDots: $servicedots
                })).slick('setPosition');
            }
        });

        $serviceTabButton.on('click', function () {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().children('.tab_button').removeAttr('title');
            $serviceTabPanel.removeClass('active').removeAttr('title').eq(parentIndex).addClass('active').attr('title', '선택됨');

            $serviceTabPanel.each(function () {
                var $servicelist = $(this).find('.service_list');
                if ($servicelist.hasClass('slick-initialized')) {
                    $servicelist.slick('unslick');
                }
            });

            var $targetPanel = $serviceTabPanel.eq(parentIndex),
                $servicelist = $targetPanel.find('.service_list'),
                $serviceprev = $targetPanel.find('.service_button.prev'),
                $servicenext = $targetPanel.find('.service_button.next'),
                $servicedots = $targetPanel.find('.service_dots');

            $servicelist.slick($.extend({}, $serviceSlickOpt, {
                prevArrow: $serviceprev,
                nextArrow: $servicenext,
                appendDots: $servicedots
            })).slick('setPosition');
        });

        var resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                var $activePanel = $serviceTabPanel.filter('.active');
                var $servicelist = $activePanel.find('.service_list');

                if ($servicelist.hasClass('slick-initialized')) {
                    $servicelist.slick('unslick');
                }

                var $serviceprev = $activePanel.find('.service_button.prev');
                var $servicenext = $activePanel.find('.service_button.next');
                var $servicedots = $activePanel.find('.service_dots');

                $servicelist.slick($.extend({}, $serviceSlickOpt, {
                    prevArrow: $serviceprev,
                    nextArrow: $servicenext,
                    appendDots: $servicedots
                })).slick('setPosition');
            }, 150);
        });


        /* board */
        var $board = $container.find('.board'),
            $boardTabButton = $board.find('button.tab_button'),
            $boardContent = $board.find('.board_content'),
            $boardTabPanel = $board.find('.board_panel');

        function getSlickOpt($panel) {
            return {
                rows: 1,
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                draggable: false,
                swipe: false,
                arrows: false,
                dots: true,
                appendDots: $panel.find('.board_dots'),
                customPaging: function (slider, i) {
                    return '<button type="button"><span>' + (i + 1) + '번째 보기</span></button>';
                },
                responsive: [
                    {
                        breakpoint: 1001,
                        settings: {
                            draggable: true,
                            swipe: true,
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 801,
                        settings: {
                            draggable: true,
                            swipe: true,
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            draggable: true,
                            swipe: true,
                            slidesToShow: 1,
                            rows: 4,
                            slidesToScroll: 1
                        }
                    }
                ]
            };
        }

        function initBoardSlick() {
            $boardTabPanel.each(function () {
                var $panel = $(this);
                var $list = $panel.find('.board_list');

                if (!$list.hasClass('slick-initialized')) {
                    $list.slick(getSlickOpt($panel));
                }
            });
        }
        initBoardSlick();

        $(window).on('resize', function () {
            $boardTabPanel.each(function () {
                var $list = $(this).find('.board_list');
                if ($list.hasClass('slick-initialized')) {
                    $list.slick('setPosition');
                }
            });
        });

        $boardTabButton.on('click', function () {
            var $this = $(this),
                $parent = $this.closest('.tab_item'),
                parentIndex = $parent.index(),
                thisText = $this.text(),
                $activePanel = $boardTabPanel.eq(parentIndex),
                $list = $activePanel.find('.board_list');

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().find('button.tab_button').removeAttr('title');

            $boardContent.find('.skip').text(thisText + ' 목록');
            $boardTabPanel.removeClass('active').removeAttr('title');
            $activePanel.addClass('active').attr('title', '선택됨');

            if (!$list.hasClass('slick-initialized')) {
                $list.slick(getSlickOpt($activePanel));
            } else {
                $list.slick('setPosition');
            }
        });


        var $boardNews = $board.find('.board_news'),
            $boardNewsList = $boardNews.find('.board_news_list'),
            $boardNewsPrev = $boardNews.find('.board_news_button.prev'),
            $boardNewsAuto = $boardNews.find('.board_news_button.auto'),
            $boardNewsNext = $boardNews.find('.board_news_button.next');

        $boardNewsList.slick({
            infinite : true,
            autoplay : true,
            draggable : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            vertical : true,
            verticalSwiping : true,
            playText : '재생',
            pauseText : '정지',
            prevArrow : $boardNewsPrev,
            autoArrow : $boardNewsAuto,
            nextArrow : $boardNewsNext,
        });


        /* news */
        var $news = $container.find('.news'),
            $newsList = $news.find('.news_list'),
            $newsPrev =  $news.find('.news_button.prev'),
            $newsNext =  $news.find('.news_button.next');

        $newsList.slick({
            slidesToShow: 3,
            autoplay: false,
            infinite: true,
            prevArrow: $newsPrev,
            nextArrow: $newsNext,
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 3,
                        variableWidth: true,
                    }
                },
            ]
        });

        $(function(){
            var $window = $(window),
                $html = $('html');

            //검색 모바일
            $(".search_button").click(function(){
                $(".search_mob_wrap").slideToggle(300);
            });
            $(window).on('load resize', function () {
                if (window.innerWidth > 480) {
                    $(".search_mob_wrap").slideUp(300);
                }
            });

            //top 버튼
            var $up = $('#footer .footer_top, .gimpo_talk'),
                windowTop = $window.scrollTop(),
                windowArea = windowTop + $window.height();

            var $footerWrap = $('#footer > .wrap'),
                footerTop = $footerWrap.offset().top;
            $window.on('load resize', function(){
                footerTop = $footerWrap.offset().top;
            });

            if(footerTop < windowArea){
                $up.addClass('fixed');
            } else {
                $up.removeClass('fixed');
                $up.removeAttr('style')
            }
            $window.on('scroll', function(){
                windowTop = $window.scrollTop();
                windowArea = windowTop + $window.height() - $up.height();
                $up.removeAttr('style');
                if(footerTop < windowArea){
                    $up.attr('data-position','fixed');
                    $up.removeClass('remove');
                } else if(windowTop === 0){
                    $up.attr('data-position','remove');
                } else {
                    $up.removeAttr('data-position');
                }
            });
            $up.on('click', function(){
                $html.animate({scrollTop : 0}, 500)
            });
        });

    });
})(window.jQuery);
