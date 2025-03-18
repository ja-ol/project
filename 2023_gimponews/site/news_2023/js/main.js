(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$html = $('html'),
			$header = $('#header'),
			$container = $('#container'),
			$footer = $('#footer');


		/* 비주얼 */
		$('.visual').addClass('load');
		$window.on('load', function(event) {
			$('.visual').addClass('active');
			setTimeout(function () {
				$('.visual').removeClass('load');
			}, 550);
		});

		var $visual = $container.find('.visual'),
			$visualList = $visual.find('.visual_list'),
			$visualPrev = $visual.find('.visual_prev'),
			$visualNext = $visual.find('.visual_next'),
			$visualCurrent = $visual.find(".visual_current"),
			$visualTotal = $visual.find(".visual_total"),
			$visualAuto = $visual.find(".visual_auto"),
			$visualProgress =  $visual.find('.progress_bar');


		$visualList.slick({
			autoplay: true,
			draggable: false,
			slidesToShow:1,
			slidesToScroll: 1,
			infinite: true,
			arrows: true,
			dots: false,
			fade:true,
			pauseOnFocus: false,
			pauseOnHover: false,
			autoplaySpeed: 4000,
			initialSlide: -1,
			//asNavFor: $visualList,
			prevArrow: $visualPrev,
			nextArrow: $visualNext,
			autoArrow: $visualAuto,
			pauseText: '정지',
			playText: '재생',
			current: $visualCurrent,
			total: $visualTotal,
			customState : function(state) {
				var slidesToShow = $visualList.slick('getSlick').options.slidesToShow,
					current = Math.ceil(state.current / slidesToShow),
					total = Math.ceil(state.total / slidesToShow);
				if (current < 10) {
					state.current = '0' + current;
				}
				if (total < 10) {
					state.total = '0' + total;
				}
				return state;
			}
		}).on('beforeChange', function(event, slick, current, next){
			$visualProgress.removeClass('on');

			var last = slick.slideCount - slick.options.slidesToShow,
				$visualItem = $visualList.find('.slick-slide');

			$visualItem.removeClass('prev_prev_item prev_item next_item next_next_item');

			if(current < next){
				$visual.addClass('change_next');
				$visualItem.eq(current - 1).addClass('prev_prev_item');
				$visualItem.eq(current).addClass('prev_item');
				if(next != last - 1 && next != last){
					$visualItem.eq(current + 2).addClass('next_item');
					$visualItem.eq(current + 3).addClass('next_next_item');
				}
				if(next === last - 1){
					$visualItem.eq(current + 2).addClass('next_item');
					$visualItem.eq(0).addClass('next_next_item');
				}
				if(next === last){
					$visualItem.eq(0).addClass('next_item');
					$visualItem.eq(1).addClass('next_next_item');
				}
			}
			if(current === last && next === 0){
				$visual.addClass('change_next').removeClass('change_prev');
				$visualItem.eq(last - 1).addClass('prev_prev_item');
				$visualItem.eq(last).addClass('prev_item');
				$visualItem.eq(1).addClass('next_item');
				$visualItem.eq(2).addClass('next_next_item');
			}
			if(current > next){
				$visual.addClass('change_prev');
				if(next != 0){
					$visualItem.eq(next - 2).addClass('prev_prev_item');
					$visualItem.eq(next - 1).addClass('prev_item');
				}
				if(next != last - 2 && next != last - 1){
					$visualItem.eq(next + 1).addClass('next_item');
					$visualItem.eq(next + 2).addClass('next_next_item');
				}
				if(next === last - 2){
					$visualItem.eq(next + 1).addClass('next_item');
					$visualItem.eq(next + 2).addClass('next_next_item');
				}
				if(next === last - 1){
					$visualItem.eq(last).addClass('next_item');
					$visualItem.eq(0).addClass('next_next_item');
				}
				if(next === 1){
					$visualItem.eq(last).addClass('prev_prev_item');
				}
				if(next === 0){
					$visualItem.eq(last - 1).addClass('prev_prev_item');
					$visualItem.eq(last).addClass('prev_item');
				}
			}
			if(current === 0 && next === last){
				$visual.addClass('change_prev').removeClass('change_next');
				$visualItem.eq(last - 2).addClass('prev_prev_item');
				$visualItem.eq(last - 1).addClass('prev_item');
				$visualItem.eq(last).removeClass('prev_prev_item');
				$visualItem.eq(current).removeClass('prev_item');
				$visualItem.eq(0).removeClass('prev_item');
			}

		}).on('afterChange', function(event, slick, current){
			$visual.removeClass('change_prev change_next');
			$visualProgress.addClass('on');
		});

		$visualNext.click();
		$visualAuto.on('click', function(){
			if($(this).hasClass('slick-pause')){
				$visual.removeClass('pause');
			} else {
				$visual.addClass('pause');
			}
		});


		/* 보도자료 */
		var $report = $container.find('.report'),
			$reportList = $report.find('.report_list'),
			$reportPrev = $report.find('.report_prev'),
			$reportNext = $report.find('.report_next');

		$reportList.slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true,
			autoplay: false,
			prevArrow: $reportPrev,
			nextArrow: $reportNext,
			responsive: [
				{
					breakpoint: 1401,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 1001,
					settings: {
						variableWidth: true,
					}
				}
			]
		}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

			$(this)[$(this).hasClass('active') ? 'removeClass' : 'addClass']('active');

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


		/* 시정소식 */
		var $news = $container.find('.news'),
			$newsList = $news.find('.news_list');

		$newsList.slick({
			autoplay: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrow: false,
			dots: true,
			appendDots: $news.find('.news_dots'),
			responsive: [
				{
					breakpoint: 1001,
					settings: {
						variableWidth: true,
					}
				},
				{
					breakpoint: 481,
					settings: {
						variableWidth : false,
					}
				},
			]
		});


		/* 포토뉴스 */
		var $photo = $container.find('.photo'),
			$photoList = $photo.find('.photo_list');

		$photoList.slick({
			speed: 1200,
			autoplay: false,
			slidesToShow: 4,
			slidesToScroll: 2,
			arrow: false,
			dots: true,
			appendDots: $photo.find('.photo_dots'),
			responsive: [
				{
					breakpoint: 1401,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 1001,
					settings: {
						variableWidth: true,
					}
				}
			]
		});


		/* 스크롤 */
		$window.on('load scroll', function (){
			var $rowgroup = $("[class^=\'rowgroup\']"),
				scrollTop = $(window).scrollTop();

			$rowgroup.each(function (index){
				var rowgroupOffset = $(this).offset().top;

				if(rowgroupOffset < scrollTop + 700) {
					$rowgroup.eq(index).addClass('active');
				} else {
					$rowgroup.eq(index).removeClass('active');
				}
			})
		})


	});
})(window.jQuery);
