(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$html = $('html'),
			$header = $('#header'),
			$container = $('#container'),
			$footer = $('#footer');

		/* fullpage */
		var footerHtml = $footer[0].outerHTML.replace('id="footer" class="','id="footer" class="section fp-auto-height ');

		$footer.remove();
		$('#fullpage_wrap').append(footerHtml).fullpage({
			navigation          : true,
			navigationPosition  : 'right',
			easing              : 'easeInOutCubic',
			easingcss3          : 'ease',
			css3                : true,
			responsiveWidth     : 1001,
		});


		/* visual */
		$window.on('load',function (){
			$visual.addClass('on');
		});

		var $visual = $container.find('.visual'),
			$ProgramList = $visual.find('.program_list'),
			$ProgramPrev = $visual.find('.program_prev'),
			$ProgramNext = $visual.find('.program_next');

		$ProgramList.slick({
			autoplay : false,
			draggable : true,
			infinite : true,
			slidesToShow : 1,
			vertical : true,
			prevArrow : $ProgramPrev,
			nextArrow : $ProgramNext,
			responsive : [
				{
					breakpoint: 641,
					settings: {
						vertical : false,
						slidesToShow : 2,
						variableWidth:true,
						autoplay : false,
					}
				},
				{
					breakpoint: 481,
					settings: {
						vertical : false,
						slidesToShow : 1,
					}
				},
			]
		});


		/* tour */
		var $tour = $container.find('.tour'),
			$tourList = $tour.find('.tour_list'),
			$progressBar = $tour.find('.progressbar'),
			$tourSlickOpt = {
				autoplay : false,
				draggable : true,
				infinite : false,
				slidesToShow : 2,
				slidesToScroll : 1,
				variableWidth : true,
				rows : 1,
				dots : true,
				responsive : [
					{
						breakpoint: 1401,
						settings: {
							slidesToShow : 1,
						}
					},
					{
						breakpoint: 481,
						settings: {
							variableWidth : false,
							slidesToShow : 1,
							slidesToScroll : 1,
							rows: 2,
						}
					},
				]
			}
		$('.tour .tour_list').slick($tourSlickOpt);

		var tourPercent = Math.floor(($('.slick-slide.slick-active').length) * (100 /  $('.slick-slide').length));
		$progressBar.css('width',  tourPercent + '%').text(tourPercent + '퍼센트');

		$tourList.on('beforeChange', function(event, slick, current, next){
			tourPercent = Math.floor((slick.options.slidesToShow + next) * (100 /  slick.slideCount));
			$progressBar.css('width',  tourPercent + '%').text(tourPercent + '퍼센트');
		});



		/* academy */
		var $academy = $container.find('.academy'),
			$academyItemOdd = $academy.find('.academy_item:nth-child(odd)'),
			$academyItemEven = $academy.find('.academy_item:nth-child(even)');

		$academyItemOdd.mouseover(function (){
			$('.academy_list').addClass('odd');
		})
		$academyItemOdd.mouseleave(function (){
			$('.academy_list').removeClass('odd');
		})
		$academyItemEven.mouseover(function (){
			$('.academy_list').addClass('even');
		})
		$academyItemEven.mouseleave(function (){
			$('.academy_list').removeClass('even');
		})

		/*$academyItemEven.mouseenter(function (){
			$academyItemEven.css('transform', 'translateY(0)');
			$academyItemOdd.css('transform', 'translateY(110px)');
		});
		$academyItemEven.mouseleave(function (){
			$academyItemEven.css('transform', 'translateY(110px)');
			$academyItemOdd.css('transform', 'translateY(0)');
		});*/


		/* medical */
		var $medical = $container.find('.medical'),
			$medicalList = $medical.find('.medical_list'),
			$medicalPrev = $medical.find('.medical_prev'),
			$medicalNext = $medical.find('.medical_next');

		$medicalList.slick({
			autoplay : false,
			draggable : true,
			infinite : true,
			slidesToShow : 4,
			slidesToScroll : 1,
			rows : 1,
			prevArrow : $medicalPrev,
			nextArrow : $medicalNext,
			responsive : [
				{
					breakpoint: 1401,
					settings: {
						slidesToShow : 3,
					}
				},
				{
					breakpoint: 1001,
					settings: {
						variableWidth : false,
						slidesToShow : 3,
						slidesToScroll : 3,
						rows: 2,
					}
				},
				{
					breakpoint: 641,
					settings: {
						variableWidth : false,
						slidesToShow : 2,
						slidesToScroll : 2,
						rows: 2,
					}
				},
			]
		});

		/* notice */
		var $notice = $container.find('.notice'),
			$noticeTabButton = $notice.find('.tab_button'),
			$noticeTabPanel = $notice.find('.notice_panel');

		$noticeTabButton.on('click', function () {
			var $this = $(this),
				thisText = $(this).text(),
				$parent = $this.parents('.tab_item'),
				parentIndex = $parent.index();

			$parent.addClass('active').siblings().removeClass('active');
			$this.attr('title', '선택됨');
			$('.notice_content').find('.skip').text(thisText + ' 목록')
			$parent.siblings().children('.tab_button').removeAttr('title');
			$noticeTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');

			if ($('.tab_item.n1').hasClass('active') === true){
				$notice.addClass('n1').removeClass('n2 n3');
			} else if($('.tab_item.n2').hasClass('active') === true){
				$notice.addClass('n2').removeClass('n1 n3');
			} else if($('.tab_item.n3').hasClass('active') === true){
				$notice.addClass('n3').removeClass('n1 n2');
			}

		});

	});
})(window.jQuery);
