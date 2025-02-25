(function($) {
	'use strict';

	$(function() {

		/* 비주얼 */
		var $window = $(window),
			$container = $('#container');

			$window.on('load', function(event) {
				$('.visual').addClass('active');
			});


		/* 공지사항 */
		var $board = $container.find('.board'),
			$boardList = $board.find('.board_list')

		$boardList.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrow: true,
			prevArrow : $board.find('.board_prev'),
			nextArrow : $board.find('.board_next'),
			playText : '재생',
			pauseText : '정지',
			responsive: [{
				breakpoint: 1001,
				settings: {
					slidesToShow: 2
				},
			},{
				breakpoint: 641,
				settings: {
					variableWidth: true,
					slidesToScroll: 1,
				},
			}]
		});

		/* 종자소식 */
		var $news = $container.find('.news'),
			$newsListText = $news.find('.news_list.text'),
			$newsListImg = $news.find('.news_list.img')

		$newsListText.slick({
			slidesToShow: 1,
			arrows: true,
			fade: true,
			playText: '재생',
			pauseText: '정지',
			prevArrow: $news.find('.news_prev'),
			nextArrow: $news.find('.news_next'),
			asNavFor: $newsListImg
		});
		$newsListImg.slick({
			slidesToShow: 1,
			arrows: false,
			fade: true,
			asNavFor: $newsListText,
			responsive: [
				{
					breakpoint: 641,
					settings: {
						fade: true
					}
				}
			]
		});

	});
})(window.jQuery);