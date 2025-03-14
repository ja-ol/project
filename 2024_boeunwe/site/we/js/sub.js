(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;

		$window.load(function(){
			$('.sub_visual').addClass('active');
		});

		/* url */
		var $urlCopy = $container.find('#url_copy');

		$urlCopy.on('click', function(event) {
			$('#url_copy div').remove();
			var html = "<div><label for='clip_target'>복사된 URL</label><input id='clip_target' type='text' value='' /></div>";
			$(this).append().html(html);

			var input_clip = document.getElementById("clip_target");
			var _url = $(location).attr('href');
			$('#clip_target').val(_url);

			if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
				var editable = input_clip.contentEditable;
				var readOnly = input_clip.readOnly;

				input_clip.contentEditable = true;
				input_clip.readOnly = false;

				var range = document.createRange();
				range.selectNodeContents(input_clip);

				var selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				input_clip.setSelectionRange(0, 999999);

				input_clip.contentEditable = editable;
				input_clip.readOnly = readOnly;
			} else {
				input_clip.select();
			}
			try {
				var successful = document.execCommand('copy');
				input_clip.blur();
				if (successful) {
					alert("URL이 복사 되었습니다");
				} else {
					alert('이 브라우저는 지원하지 않습니다.');
				}
			} catch (err) {
				alert('이 브라우저는 지원하지 않습니다.');
			}
		});


		/* cms 탭메뉴 */
		var $cmsTab = $container.find('.cms_tab'),
			$tabMenu = $cmsTab.find('.tab_menu'),
			$tabSelect = $tabMenu.find('.tab_select');

		$cmsTab.each(function(index, element){
			var tabLength = $tabMenu.find('.tab_list .tab3_item').length;
			$tabMenu.addClass('length' + tabLength);

			var tabLength2 = $tabMenu.find('.tab_list .tab4_item').length;
			$tabMenu.addClass('divide' + tabLength2);
		});

		$tabSelect.on('click', function(){
			var $this = $(this);

			if(!$this.parent().is('.active')){
				$this.attr('title','목록닫기')
					.parent().addClass('active')
					.end().next().slideDown('250');
			} else{
				$this.attr('title','목록열기')
					.parent().removeClass('active')
					.end().next().slideUp('250');
			}
		});


		/* 컨텐츠 탭메뉴 */
		var $tab = $contents.find('.tab'),
			$tabButton = $tab.find('button.tab_button'),
			$tabContent = $tab.find('.tab_content');

		$('.tab_select').click(function () {
			$(this).parent('.tab').toggleClass('active');
		});

		$tabButton.click(function (event) {
			var $this = $(this),
				tabButtonText = $this.text(),
				index = $tabButton.index(this);

			$this.parent().addClass('active').siblings().removeClass('active');
			$this.parents('.tab').find('.tab_select span').text(tabButtonText);
			$tabContent.eq(index).addClass('active').siblings().removeClass('active');
		});

		/* 스텝(가로) */
		function stepAutoHeight(){
			var $step = $container.find('.step.width'),
				$stepList = $step.find('.step_list'),
				$stepTitle = $step.find('.step_title'),
				$stepText = $step.find('.step_text');

			//초기화
			$stepTitle.removeAttr('style', 'height');
			$stepText.removeAttr('style', 'height');

			$stepList.each(function (index, element) {
				var $element = $(element),
					titleMinHeight = 52, //기본 제목 높이
					textMinHeight = 95; //기본 텍스트 높이

				$element.find('li').each(function (index, element) {
					var $element = $(element),
						titleHeight = $element.find('.step_title').height(),
						textHeight = $element.find('.step_text').height();

					//제목 최고높이
					if (titleHeight > titleMinHeight) {
						titleMinHeight = titleHeight;
					}

					//텍스트 최고높이
					if (textHeight > textMinHeight) {
						textMinHeight = textHeight;
					}
				});

				$element.find('.step_title').height(titleMinHeight);
				$element.find('.step_text').height(textMinHeight);
			});

		}
		stepAutoHeight();

		function boxinfoHeightCheck(){

			var $boxinfo = $container.find('.box.info');

			//초기화
			$boxinfo.removeClass('over');

			$boxinfo.each(function (index, element) {
				var $element = $(element),
					minHeight = 64,
					outerHeight = $element.outerHeight();

				$element[(minHeight < outerHeight) ? 'addClass' : 'removeClass']('over');
				/*
				if(minHeight < outerHeight){
					$element.addClass('over');
				}else{
					$element.removeClass('over');
				}
				*/
			});

		}
		boxinfoHeightCheck();

		$window.on('resize', function () {
			clearTimeout(debounce);
			debounce = setTimeout(function (){
				stepAutoHeight();
				boxinfoHeightCheck();
			}, 50);
		});


		/* 반응형 테이블 */
		var $tableResponsive = $container.find('.table.responsive');

		$tableResponsive.each(function(index, element) {
			var $element = $(element),
				rowdivIs = $element.find('td, th').is('[rowdiv]'),
				theadLength = $element.find('thead').length;

			if(rowdivIs == false && !theadLength == 0){
				$element.find('tbody th, tbody td').each(function(index, element) {
					var $this = $(element),
						thisIndex = $this.index(),
						theadText = $this.parents('tbody').siblings('thead').find('th').eq(thisIndex).text();

					$this.attr('data-content', theadText);
				});

				$element.find('tfoot th, tfoot td').each(function(index, element) {
					var $this = $(element),
						thisIndex = $this.index(),
						theadText = $this.parents('tfoot').siblings('thead').find('th').eq(thisIndex).text();

					$this.attr('data-content', theadText);
				});
			}
		});

		/* map marker 변경 */
		$(window).load(function(){
			var $marker = $('.map_box .roughmap_maker_label');
			$marker.parent('div').prev('div').find('img').attr('src', '../../site/we/images/template/map_marker.png');
			$marker.parent('div').prev('div').find('img').css({'width':'62', 'height':'66', 'top':'8px', 'left':'-13px','clip':'unset'});
			$marker.parent('div').prev('div').siblings('div').css({'z-index':'1'});
			$marker.parent('div').prev('div').siblings('div').find('.roughmap_maker_label').css({'top':'-50px', 'left':'-0.75px'});
		});

		/* 대관 상세 */
		var $rental = $container.find('.rental_slide'),
			$rentalList = $rental.find('.rental_slide_list'),
			$rentalCurrent = $rental.find('.rental_current'),
			$rentalTotal =  $rental.find('.rental_total'),
			$rentalPrev =  $rental.find('.rental_button.prev'),
			$rentalNext =  $rental.find('.rental_button.next');

		$rentalList.slick({
			slidesToShow: 1,
			autoplay: false,
			infinite: true,
			current : $rentalCurrent,
			total : $rentalTotal,
			prevArrow: $rentalPrev,
			nextArrow: $rentalNext,
		});


	});
})(window.jQuery);
