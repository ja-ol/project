(function($) {
    'use strict';

    $(function() {

        /* 패밀리사이트 */
        var $family = $('#header').find('.family'),
            $familyOpen = $('#header').find('.family_open'),
            $familyhide = $('#header').find('.family_hide');

        $familyOpen.on('click', function(event) {
            $family.addClass('active').find('.family_item.first .basic_item:first-child a').focus();
            $('html').removeClass('lnb_show lnb_open');
        });
        $familyhide.on('click', function(event) {
            $family.removeClass('active');
			$familyOpen.focus();
        });


        /* 검색 */
        var $search = $('#header').find('.search'),
            $searchShow = $search.find('.search_show'),
            $searchHide = $search.find('.search_hide');

        $searchShow.on('click', function(event) {
            $search.toggleClass('active');
        });
        $searchHide.on('click', function(event) {
            $search.removeClass('active');
        });


        /* 탑버튼 */
        var $bodyHtml = $('body,html'),
            $TopButton = $('#footer').find('.top_button');

        $TopButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });


		$('.addons_button.url').on('click', function (e) {
			e.preventDefault(); // 혹시 href="#" 같은 게 있을 경우 대비

			const $button = $(this); // 📌 현재 클릭된 버튼 저장

			// 복사 동작 수행
			const dummy = document.createElement('input');
			document.body.appendChild(dummy);
			dummy.value = window.location.href;
			dummy.select();
			document.execCommand('copy');
			document.body.removeChild(dummy);

			// 알림
			alert('주소가 복사되었습니다.');

			// ✅ alert 이후 focus 복원
			$button.focus();
		});


        /* 공유 */
        var $share = $('.addons').find('.share'),
            $shareOpen = $share.find('.addons_button'),
            $shareClose = $share.find('.share_close'),
            url = document.url;

        $shareOpen.on('click', function(event) {
            $share.addClass('active');
        });
        $shareClose.on('click', function(event) {
            $share.removeClass('active');
        });


    
        /* 패밀리 사이트 */ 
		var $home = $('#header').find('.home'),
			$familyContent = $home.find('.family_content'),
			$familyList = $familyContent.find('.family_list');

		// 👉 Slick 초기화
		$familyList.slick({
			autoplay : false,
			dots : true,
			slidesToShow : 3,
			slidesToScroll: 3,
			draggable : true,
			infinite : false,
			rows: 1,
			accessibility: false, // ✅ slick이 자동으로 tabindex 제어하지 않도록 설정
			prevArrow : $familyContent.find('.family_prev'),
			nextArrow : $familyContent.find('.family_next'),
			appendDots: $familyContent.find('.family_dots'),
			responsive: [
				{
					breakpoint: 641,
					settings: {
						slidesToShow : 1,
						slidesToScroll : 1,
						rows: 2,
					}
				},
			]
		});

		// 👉 afterChange 시 접근성 tabindex 수동 제어
		$familyList.on('afterChange', function(event, slick, currentSlide) {
			const $slides = $(slick.$slides);

			// 전체 초기화
			$slides.attr('tabindex', '-1');

			// 보이는 슬라이드만 tabindex="0" 부여
			$slides.filter('.slick-active').attr('tabindex', '0');
		});





        /* 푸터 active 추가 */
        var $footer = $('#footer'),
        $footerSiteButton = $footer.find('.site_button');

        $footerSiteButton.on('click.layout', function(event){
            var $this = $(this),
                $parent = $this.parents('site_item');

            if($this.hasClass('active')){
                $parent.children('.site_button').removeClass('active');
                $this.removeClass('active');
            } else {
                $footerSiteButton.removeClass('active');
                $this.addClass('active');
            }
        });

		/* 메뉴 */
		if($(window).width() < 1001){
			if($('.sub11').length || $('.sub12').length || $('.sub13').length || $('.sub14').length || $('.sub15').length || $('.sub16').length || $('.sub17').length){
				$('.lnb .depth1_item:nth-child(6)').addClass('active');
			}
			if($('.sub11').length){
				$('.lnb .depth1_item:nth-child(6) .depth2_item:nth-child(1)').addClass('active');
			}
			if($('.sub12').length){
				$('.lnb .depth1_item:nth-child(6) .depth2_item:nth-child(2)').addClass('active');
			}
			if($('.sub13').length){
				$('.lnb .depth1_item:nth-child(6) .depth2_item:nth-child(3)').addClass('active');
			}
			if($('.sub14').length){
				$('.lnb .depth1_item:nth-child(6) .depth2_item:nth-child(4)').addClass('active');
			}
			if($('.sub15').length){
				$('.lnb .depth1_item:nth-child(6) .depth2_item:nth-child(5)').addClass('active');
			}
			if($('.sub16').length){
				$('.lnb .depth1_item:nth-child(6) .depth2_item:nth-child(6)').addClass('active');
			}
			if($('.sub17').length){
				$('.lnb .depth1_item:nth-child(6) .depth2_item:nth-child(7)').addClass('active');
			}
		}


		/* 메뉴 - 한눈에 김포 */
		$('#header .lnb .depth1_text').filter(function() {
			return $(this).text().trim() === '한눈에 김포';
		}).closest('.depth1_item').addClass('glance');


    });


})(window.jQuery);