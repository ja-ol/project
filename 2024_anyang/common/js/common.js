/* (주)한신정보기술 송경배 - 2019.08.08 */

(function($) {
    'use strict';

    $(function() {
		var $footerPrev = $('.footer_banner .footer_banner_prev'),
			$footerAuto = $('.footer_banner .footer_banner_auto'),
			$footerNext = $('.footer_banner .footer_banner_next');

        $('.footer_banner_list').slick({
            slidesToShow : 8,
            variableWidth : true,
			playText : '재생',
			pauseText : '정지',
            autoArrow : $footerAuto,
            prevArrow : $footerPrev,
            nextArrow : $footerNext
        });

		var $newSitePrev = $('.site_banner .site_banner_prev'),
			$newSiteAuto = $('.site_banner .site_banner_auto'),
			$newSiteNext = $('.site_banner .site_banner_next');

        $('.site_banner_list').slick({
            slidesToShow : 6,
            variableWidth : true,
			playText : '재생',
			pauseText : '정지',
            autoArrow : $newSiteAuto,
            prevArrow : $newSitePrev,
            nextArrow : $newSiteNext
        });

        // site_link
        $('.footer_site_btn').on('click.main', function(event) {
            var $this = $(this),
                $footerSiteContent = $this.next('.footer_site_content');

            //애니메이션이 끝났을 때
            if(!$footerSiteContent.is(':animated')) {
                $footerSiteContent.slideToggle(250, 'easeInOutExpo').parent('li').toggleClass('active').siblings('li').removeClass('active').children('.footer_site_content').slideUp(250, 'easeInOutExpo');
            }
        });

        $('.footer_site_close').on('click.main', function(event) {
            var $this = $(this),
                $footerSiteContent = $this.parents('.footer_site_content');

            //애니메이션이 끝났을 때
            if(!$footerSiteContent.is(':animated')) {
                $footerSiteContent.slideUp(250, 'easeInOutExpo');
            }
        });

        var $window = $(window),
            $htmlAndBody = $('html, body'),
            $footerTop = $('.footer_top');

        $footerTop.find('a').on('click', function(event) {
            $htmlAndBody.stop().animate({
                scrollTop : 0
            }, 250);

            event.preventDefault();
        });

        $window.on("scroll.common", function(event) {
            var scrollTop = $window.scrollTop();

            if(scrollTop > 0) {
                $footerTop.fadeIn();
            }else{
                $footerTop.fadeOut();
            }
        }).triggerHandler('scroll.common');

        //탭메뉴
        var $window = $(window),
            $container = $('#container'),
            colgroup = $container.colgroup = {},
            $colgroup = colgroup.$element = $container.find('.colgroup'),
            tabMenu = colgroup.tabMenu = {},
            $tabMenu = tabMenu.$element = $colgroup.find('.tab_menu'),
            $tabNav = tabMenu.$contents = $tabMenu.find('.tab_nav'),
            $tabBtn = tabMenu.$btn = $tabMenu.find('.tab_btn'),
            $tabSelect = tabMenu.$select = $tabMenu.find('.tab_select');

        $window.on('screen:wide.layoutSub screen:web.layoutSub', function(event) {
            $tabSelect.removeClass('active');
            $tabNav.css('display', '');
        });

        $tabBtn.on('click.layoutSub', function(event) {
            var $this = $(this);

            $this.closest('.tab_menu').children('.tab_select').removeClass('active').text($this.text());

            //모바일일 때
            if(mode === 'mobile') {
                $this.closest('.tab_nav').slideUp(250, 'easeInOutExpo');
            }
        });

        $tabSelect.on('click.layoutSub', function(event) {
            var $this = $(this),
                $tabNav = $this.next('.tab_nav');

            //애니메이션이 끝났을 때
            if(!$tabNav.is(':animated')) {
                $tabNav.slideToggle(250, 'easeInOutExpo');
                $this.toggleClass('active');
            }
        });

		//컨텐츠 내 탭메뉴
		$('.tab_menu.scripttab').not($('.prettyprint').children()).each(function(){
			var $this = $(this),
				$tab_select = $this.find('.tab_select'),
				ActiveText = $this.find('.tab_item.active').text();
			$tab_select.text(ActiveText);
		});

        /* mobile > pc로 사이즈 변경시 class 삭제 */
        $window.on('screen:wide.layout screen:web.layout', function(event) {
            window.mode = 'pc';
            $('html').removeClass('lnb_show lnb_open');
        });
    });

})(jQuery);




