(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');


        /* 비주얼 */
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
            autoplaySpeed: 4000,
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
        }).on('beforeChange', function(event, slick, current, next){
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


        /* 소식을 알려드립니다 */
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


        /* 보은군 sns */
        var $sns = $container.find('.sns'),
            $snsTabButton = $sns.find('.tab_button'),
            $snsTabPanel = $sns.find('.sns_panel'),
            $snsSlickOpt = {
                slidesToShow : 4,
                slidesToScroll : 1,
                infinite : false,
                arrows : false,
                autoplay : false,
                draggable : true,
                variableWidth : true,
                responsive: [
                    {
                        breakpoint: 1401,
                        settings: {
                            slidesToShow : 3,
                            variableWidth : false,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow : 1,
                            variableWidth : true,
                        }
                    },
                ]

            };
        $('.sns .sns_panel.active .sns_list').slick($snsSlickOpt);

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


    });
})(window.jQuery);
