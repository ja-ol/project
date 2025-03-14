(function($) {
	'use strict';


	$(function() {
		var $window = $(window),
			$container = $('#container');


		/* visual */
		var $visual = $container.find('.visual'),
			$visualList = $visual.find('.visual_list'),
			$visualPrev = $visual.find('.visual_button.prev'),
			$visualNext = $visual.find('.visual_button.next'),
			$visualAuto = $visual.find('.visual_button.auto'),
			$visualCurrent = $visual.find('.visual_current'),
			$visualTotal = $visual.find('.visual_total');

		$visualList.slick({
			draggable : false,
			infinite : true,
			variableWidth : false,
			slidesToShow : 1,
			slidesToScroll : 1,
			autoplay : true,
			autoplaySpeed : 3000,
			prevArrow : $visualPrev,
			nextArrow : $visualNext,
			autoArrow : $visualAuto,
			pauseText : '정지',
			playText : '재생',
			current : $visualCurrent,
			total : $visualTotal
		});

		$('.visual_more').on('click',function(){
			$('html').addClass('visual_open');
		});
		$('.visual_close').on('click',function(){
			$('html').removeClass('visual_open');
		});


		/* business */
		var $business = $container.find('.business'),
			$businessList = $business.find('.business_list');

		$businessList.slick({
			slidesToShow: 9,
			slidesToScroll : 1,
			infinite : false,
			autoPlay : false,
			dots : true,
			appendDots: $business.find('.business_dots'),
			responsive: [
				{
					breakpoint: 1201,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6,
					}
				},{
					breakpoint: 1001,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 5,
					}
				},{
					breakpoint: 641,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
					}
				},{
					breakpoint: 481,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
			]
		});


		/* board */
		var $board = $container.find('.board'),
			$boardTabList = $board.find('.tab_list'),
			$boardTabButton = $board.find('.tab_button'),
			$boardTabPanel = $board.find('.board_panel'),

			boardTabListSlickOpt = {
				slidesToShow : 2,
				slidesToScroll : 1,
				infinite : false,
				autoPlay : false,
				draggable : true,
				variableWidth : true,
				prevArrow : $board.find('.tab_prev'),
				nextArrow : $board.find('.tab_next'),
			};

		$boardTabButton.on('click', function (event) {
			var $this = $(this),
				$parent = $this.parents('.tab_item'),
				parentIndex = $parent.index();

			$parent.addClass('active').siblings().removeClass('active');
			$this.attr('title', '선택됨');
			$parent.siblings().children('.tab_button').removeAttr('title');
			$boardTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
		});

		$(window).on('load resize', function() {
			if($(window).width() > 640) {
				$boardTabList.slick('unslick');
			}
			else {
				$boardTabList.not('.slick-initialized').slick(boardTabListSlickOpt);
			}
		});


		/* fade */
		var $fade = $('.fade');

		function fade() {
			$fade.each(function () {
				var bottom_of_object = $(this).offset().top + $(this).outerHeight();
				var bottom_of_window = $window.scrollTop() + $window.height();

				if($(this).hasClass('rowgroup4')){
					if (bottom_of_window > bottom_of_object / 1.1) {
						$(this).addClass('show');
					} else {
						$(this).removeClass('show');
					}
				}
				else{
					if (bottom_of_window > bottom_of_object / 1.25) {
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
