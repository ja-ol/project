(function($) {
	'use strict';

	$(function() {
		var $window = $(window),
			$html = $('html'),
			$container = $('#container');

		/* 비주얼 */
		var $visual = $('.visual'),
			$visualList = $visual.find('.visual_list');

		$visualList.slick({
			slidesToShow: 1,
			slidesToScroll : 1,
			current : $visual.find('.current'),
			total : $visual.find('.total'),
			playText : '재생',
			pauseText : '정지',
			arrows : true,
			autoArrow: $visual.find('.auto'),
			prevArrow : $visual.find('.prev'),
			nextArrow : $visual.find('.next'),
			speed : 500,
			autoplay : true,
			autoplaySpeed: 4000,
			infinite : true,
			responsive: [
				{
					breakpoint: 1401,
					settings: {
					}
				},
			]
		});

		/* 추모의 글 */
		var $memories = $('.memories'),
			$memoriesList = $memories.find('.memories_list'),
			$memoriesItem = $memories.find('.memories_item'),
			memoriesSlickOpt = {	slidesToShow: 2,
				slidesToScroll : 1,
				arrows : true,
				prevArrow : $memories.find('.prev'),
				nextArrow : $memories.find('.next'),
				speed : 500,
				autoplay : false,
				infinite : true,
				variableWidth : false,
				responsive: [
					{
						breakpoint: 1401,
						settings: {
						}
					},
				]};

		$memoriesList.slick(memoriesSlickOpt).slick('setPosition').on('beforeChange', function(event, slick, current, next){
			var last = slick.slideCount - slick.options.slidesToShow;

			$memoriesItem.removeClass('prev_item next_item')

			if(current < next) {
				$memoriesItem.eq(1).addClass('next_item');
				$memoriesItem.eq(last).addClass('prev_item');
			}
		});


		/* 게시판 */
		var $board = $container.find('.board'),
			$boardTab = $board.find('.board_tab');

		$boardTab.each(function (){
			var $this = $(this),
				$boardTabButton = $this.find('.tab_button'),
				$boardPanel = $board.find('.board_panel');

			$boardTabButton.on('click', function (event) {
				var $this = $(this),
					$parent = $this.parents('.tab_item'),
					parentIndex = $parent.index();

				$parent.addClass('active').siblings().removeClass('active');
				$this.attr('title', '선택됨');
				$parent.siblings().children('.tab_button').removeAttr('title');
				$boardPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
			});
			$('.tab_item.active .tab_button').trigger('click');
		});

		/* 팝업존 */
		var $popup = $('.popup'),
			$popupList = $popup.find('.popup_list');

		$popupList.slick({
			slidesToShow: 1,
			slidesToScroll : 1,
			current : $popup.find('.current'),
			total : $popup.find('.total'),
			playText : '재생',
			pauseText : '정지',
			arrows : true,
			autoArrow: $popup.find('.auto'),
			prevArrow : $popup.find('.prev'),
			nextArrow : $popup.find('.next'),
			speed : 500,
			autoplay : true,
			autoplaySpeed: 4000,
			infinite : true,
			responsive: [
				{
					breakpoint: 1401,
					settings: {
					}
				},
			]
		});

		/* 현충원 SNS */
		var $social = $('.social'),
			$socialList = $social.find('.social_list'),
			$socialItem = $social.find('.social_item'),
			$socialBg = $social.find('.social_bg'),
			socialListSlickOpt = {
				slidesToShow: 1,
				slidesToScroll : 1,
				arrows : true,
				prevArrow : $social.find('.prev'),
				nextArrow : $social.find('.next'),
				speed : 500,
				autoplay : false,
				infinite : true,
				variableWidth : false,
				pauseOnHover : false,
				fade : true,
				asNavFor: $socialBg,
				responsive: [
					{
						breakpoint: 1401,
						settings: {
						}
					},
				]
			};

		$socialBg.slick({
			slidesToShow: 1,
			slidesToScroll : 1,
			arrows : false,
			speed : 500,
			autoplay : false,
			infinite : true,
			variableWidth : false,
			pauseOnHover : false,
			fade : true,
			asNavFor: $socialList,
			responsive: [
				{
					breakpoint: 1401,
					settings: {
					}
				},
			]
		});

		$html.addClass('attraction_active');
		$socialList.slick(socialListSlickOpt).slick('setPosition').on('init', function(event, slick, current, next){
			var last = slick.slideCount - slick.options.slidesToShow;

			$socialItem.eq(1).addClass('next_item');
			$socialItem.eq(last).addClass('prev_item');

		});
		$socialList.slick(socialListSlickOpt).slick('setPosition').on('beforeChange', function(event, slick, current, next){
			/*$html.removeClass('attraction_active');*/

			var last = slick.slideCount - slick.options.slidesToShow;
			$socialItem.removeClass('prev_item next_item');

			if(current < next){
				$socialItem.eq(current).addClass('prev_item');
				if(next != last - 1 && next != last){
					$socialItem.eq(current + 2).addClass('next_item');
				}
				if(next === last - 1){
					$socialItem.eq(current + 2).addClass('next_item');
				}
				if(next === last){
					$socialItem.eq(0).addClass('next_item');
				}
			}
			if(current === last && next === 0){
				$socialItem.eq(last).addClass('prev_item');
				$socialItem.eq(1).addClass('next_item');
			}
			if(current > next){
				if(next != 0){
					$socialItem.eq(next - 1).addClass('prev_item');
				}
				if(next != last - 2 && next != last - 1){
					$socialItem.eq(next + 1).addClass('next_item');
				}
				if(next === last - 2){
					$socialItem.eq(next + 1).addClass('next_item');
				}
				if(next === last - 1){
					$socialItem.eq(last).addClass('next_item');
				}
				if(next === 0){
					$socialItem.eq(last).addClass('prev_item');
				}
			}
			if(current === 0 && next === last){
				$socialItem.eq(last - 1).addClass('prev_item');
				$socialItem.eq(current).removeClass('prev_item');
				$socialItem.eq(0).removeClass('prev_item');
			}
		}).on('afterChange', function(){
			/*$html.addClass('attraction_active');*/
		});

	});
})(window.jQuery);
