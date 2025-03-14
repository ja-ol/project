(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $header = $('#header'),
            $footer = $('#footer');

        /* 토글 */
        var $toggle = $('.toggle'),
            $toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

        $toggleSelector.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.toggle'),
                parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g,'').split(/\s+/).slice(-2)[0].replace(/_item/,'');

            if($this.is('[class*="_show"]')){
                if ($parent.siblings().hasClass('active')){
                    $parent.siblings().removeClass('active');
                    $html.removeClass(parentClass + '_open');
                }
                $html.toggleClass(parentClass + '_open');
                $parent.toggleClass('active');
            }

            if($this.is('[class*="_hide"]')){
                $html.removeClass(parentClass + '_open');
                $this.closest('.active').removeClass('active');
            }
        });

        /* 상단 한줄공지 */
        var $topBanner = $header.find('.top_banner'),
            $topBannerList = $topBanner.find('.top_banner_list'),
            $topBannerPrev = $topBanner.find('.top_banner_button.prev'),
            $topBannerNext = $topBanner.find('.top_banner_button.next');

        $topBannerList.slick({
            draggable : false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
            autoplay: false,
            playText : '재생',
            pauseText : '정지',
            prevArrow : $topBannerPrev,
            nextArrow : $topBannerNext,
            responsive: [
                {
                    breakpoint: 640,
                    settings: {
                        autoplay : true,
                    }
                }
            ]
        });

        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next');

        $bannerList.slick({
            draggable : false,
            infinite: true,
            variableWidth: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            playText : '재생',
            pauseText : '정지',
            autoArrow : $bannerAuto,
            prevArrow : $bannerPrev,
            nextArrow : $bannerNext,
        });

        /* 상단으로 */
        var $bodyHtml = $('body,html'),
            $upButton = $footer.find('.up_button');

        $upButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });

        /* 모바일 메인에서 lnb 오픈시 active */
        setFirstMenu();
        $window.on('resize', function(){
            setFirstMenu();
        });

        function setFirstMenu(){
            if($window.width() < 1001) {
                $html.addClass('lnb_open');
                $('.lnb .depth_list > .depth1_item:first-child').addClass('active');
            }
            else {
                $('.lnb .depth_list > .depth1_item:first-child').removeClass('active');
            }
        }

    });
})(window.jQuery);
