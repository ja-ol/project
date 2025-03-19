(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');


        /* visual */
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualItem = $visual.find('.visual_item'),
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal =  $visual.find('.visual_total'),
            $visualAuto = $visual.find('.visual_auto'),
            $visualProgress =  $visual.find('.progress_bar'),
            visualSlickOpt = {
                autoplaySpeed : 4000,
                infinite : true,
                slidesToShow : 2,
                slidesToScroll : 1,
                variableWidth:true,
                autoplay : true,
                draggable : true,
                current : $visualCurrent,
                total : $visualTotal,
                prevArrow : false,
                nextArrow : false,
                autoArrow : $visualAuto,
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
            };

        $visualItem.eq(0).children().addClass('radius');
        $visualList.slick(visualSlickOpt);
        $visualList.on("beforeChange",function(event, slick, currentSlide, nextSlide) {
            $visualProgress.removeClass('on');
        }).on('afterChange', function(e, slick, current, next) {

            if (next < current) {
                $visualItem.eq(current + 2).children().addClass('radius').parent().siblings().children().removeClass('radius');
            } else {
                $visualItem.eq(current).children().addClass('radius').parent().siblings().children().removeClass('radius');
            }
            $visualProgress.addClass('on');
        });

        $visualList.on('beforeChange, afterChange',function(){
            $(".slick-cloned").removeClass('next_on');
            $(".slick-active").prev().prev().prev().removeClass('next_on');
            $(".slick-active").removeClass('next_on').next().addClass('next_on');
        });

        $window.on('load',function (){
            $visual.addClass('on');
            setTimeout(function(){
                $visual.removeClass('on');
            },600);

            $visualList.find(".slick-active").next().addClass('next_on');
        });

        $visualAuto.on('click', function(){
            if($(this).hasClass('slick-pause')){
                $visual.removeClass('pause');
            } else {
                $visual.addClass('pause');
            }
        });


        /* 프로그램 */
        var $program = $container.find('.program'),
            $programTabButton = $program.find('.tab_button'),
            $programTabPanel = $program.find('.program_panel'),
            $programSlickOpt = {
                slidesToShow : 4,
                slidesToScroll : 1,
                infinite : true,
                arrows : false,
                autoplay : false,
                draggable : true,
                responsive: [
                    {
                        breakpoint: 1401,
                        settings: {
                            slidesToShow : 3,
                            variableWidth : true,
                        }
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow : 1,
                            variableWidth : true,
                        }
                    },
                ]
            };
        $('.program .program_panel.active .program_list').slick($programSlickOpt);

        $programTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().children('.tab_button').removeAttr('title');
            $programTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');

            $programTabPanel.each(function () {
                $(this).find('.program_list').slick('unslick');
                $programTabPanel.eq(parentIndex).find('.program_list').slick($programSlickOpt).slick('setPosition');
            })
        });


        /* 소식을 전해요 */
        var $news = $container.find('.news'),
            $newsTabButton = $news.find('.tab_button'),
            $newsTabPanel = $news.find('.news_panel');

        $newsTabButton.on('click', function () {
            var $this = $(this),
                thisText = $(this).text(),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $('.news_content').find('.skip').text(thisText + ' 목록')
            $parent.siblings().children('.tab_button').removeAttr('title');
            $newsTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
        });


        /* 포토갤러리 */
        var $photo = $container.find('.photo'),
            $photoList = $photo.find('.photo_list');

        $photoList.slick({
            slidesToShow : 1,
            slidesToScroll : 1,
            draggable : true,
            variableWidth : true,
            dots : false,
            arrows : false,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                    }
                },
            ]
        }).on('beforeChange, afterChange',function(){
            $(".slick-cloned").removeClass('next_on');
            $(".slick-active").prev().removeClass('next_on');
            $(".slick-active").removeClass('next_on').next().addClass('next_on');
        });

        $window.on('load',function (){
            $photoList.find(".slick-active").next().addClass('next_on');
        });


    });
})(window.jQuery);
