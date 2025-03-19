(function($) {
	'use strict';

	var $html = $('html');

	$(function() {
		var $window = $(window),
			$html = $('html'),
			$container = $('#container'),
			$contents = $('#contents'),
			$footer = $('#footer');

		//여기서부터 코드 작성해주세요

		/* breadcrumbs */
		var $tabMenu = $container.find('.breadcrumbs_item'),
			$tabSelect = $tabMenu.find('.breadcrumbs_anchor.pc');

		$tabSelect.click(function () {
			var $this = $(this),
				$ParentTabmenu = $this.parent('.breadcrumbs_item'),
				IsActive = $ParentTabmenu.is('.active');
			if(!IsActive){
				$ParentTabmenu.siblings().removeClass('active').find('.tab_panel').stop().slideUp();
				$ParentTabmenu.find('.tab_panel').stop().slideDown();
				$ParentTabmenu.addClass('active');
				$tabSelect.attr('title','메뉴 닫기');
			} else{
				$ParentTabmenu.find('.tab_panel').stop().slideUp();
				$ParentTabmenu.removeClass('active');
				$tabSelect.attr('title','메뉴 열기');
			}
		});

		/*비주얼 온*/
		$('.top_sub_visual').addClass('on');


		$window.on('screen:tablet screen:phone', function(event) {

		});

		/* 컨텐츠 탭메뉴 */
		var $tab = $contents.find('.tab');

		$window.on('load resize', function (){
			$('.cms_tab .tab_select').on('click', function () {
				$(this).parent('.tab').toggleClass('active');
			});
		})

		$tab.each(function(){
			var $this = $(this),
				$tabButton = $this.find('button.tab_button'),
				$tabContent = $this.find('.tab_content');

			$tabButton.on('click', function () {
				var $this = $(this),
					$parent = $this.parent('.tab_item'),
					tabButtonText = $this.text(),
					index = $parent.index();

				$this.parent().addClass('active').siblings().removeClass('active');
				$this.parents('.tab').find('.tab_select span').text(tabButtonText);
				$tabContent.eq(index).addClass('active').siblings().removeClass('active');
			});
		});

		function setTabHeight(){
			var $tabType2 = $container.find('.tab.type2');
			
			if($tabType2.length){
				var contentsWidth = $contents.width(),
				contentsLeft = $contents.offset().left;

				$tabType2.each(function(){
					var $thisTab = $(this),
						$tabItem= $thisTab.find('.tab_item');

					$tabItem.each(function(){
						var $this = $(this),
							$thisDepth6 = $this.find('.tab_depth6'),
							thisWidth = $this.width() - 1.5,
							thisLeft = $this.offset().left,
							marginLeft = thisLeft - contentsLeft;

						$this.width(thisWidth + 2);
						$thisDepth6.width(contentsWidth).css('margin-left', '-' + marginLeft + 'px');
					});
				});
			}
		}

		setTabHeight();
		
		$(window).on('resize', function(){
			setTabHeight();
		});


		/* 스텝(가로) */
		function stepAutoHeight(){
			var $step = $container.find('.step'),
				$stepList = $step.find('.step_list'),
				$stepTitle = $step.find('.step_title'),
				$stepText = $step.find('.step_text');

			//초기화
			$stepTitle.removeAttr('style', 'height');
			$stepText.removeAttr('style', 'height');

			$stepList.each(function (index, element) {
				var $this = $(this),
					$parent = $this.parent('.step'),
					$element = $(element),
					titleMinHeight = 25, //기본 제목 높이
					textMinHeight = 55; //기본 텍스트 높이

				if( $parent.hasClass('single') ) {
					textMinHeight = 33;
				} if ( $window.width() < 800 ){
					titleMinHeight = 15;
					textMinHeight = 30;
				} if ( $parent.hasClass('single') && $window.width() < 800 ){
					textMinHeight = 35;
				} if ( $window.width() < 640 ){
					titleMinHeight = 10;
					textMinHeight = 18;
				} if ( $parent.hasClass('single') && $window.width() < 640 ){
					textMinHeight = 10;
				}

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

				if( $parent.hasClass('height') ) {
					var $stepDd = $('.step.height .step_dd');

					$stepDd.find('.step_text').removeAttr('style', 'height');
				}
			});

		}

		/* 사이트 링크 */
		function linkAutoHeight(){
			var $linkBox = $container.find('.link_box.type2'),
				$linkList = $linkBox.find('.link_list'),
				$linkInner = $linkBox.find('.inner');

			//초기화
			$linkInner.removeAttr('style', 'height');

			$linkList.each(function (index, element) {
				var $element = $(element),
					linkInnerMinHeight = 0; //기본 높이

				$element.find('.link_item').each(function (index, element) {
					var $element = $(element),
						linkInnerHeight = $element.find('.inner').height();

					//최고높이
					if (linkInnerHeight > linkInnerMinHeight) {
						linkInnerMinHeight = linkInnerHeight;
					}
				});

				$element.find('.inner').height(linkInnerMinHeight);
			});

		}

		$window.on('load resize', function(){
			stepAutoHeight();
			linkAutoHeight();
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

		/* 아코디언 */
		var $accordion = $contents.find('.accordion');

		$accordion.each(function(){
			var $this = $(this),
				$accordionButton = $this.find('.accordion_button'),
				$accordionBody = $this.find('.accordion_body');

			$accordionButton.on('click', function () {
				var $this = $(this),
					$parents = $this.parents('.accordion_item'),
					$thisBody = $parents.find('.accordion_body');

				if ( $parents.hasClass('active') ){
					$this.parents('.accordion_item').removeClass('active')
					$this.parents('.accordion_item').find('.accordion_body').attr('title', '답변 숨김');
					$this.parents('.accordion_item').find('.accordion_header').removeAttr('title');
					$accordionBody.stop().slideUp(300);

				} else {
					$this.parents('.accordion_item').addClass('active').siblings().removeClass('active');
					$this.parents('.accordion_item').find('.accordion_body').attr('title', '답변 보임');
					$this.parents('.accordion_item').siblings().find('.accordion_body').attr('title', '답변 숨김');
					$this.parents('.accordion_header').attr('title', '질문 선택');
					$this.parents('.accordion_item').siblings().find('.accordion_header').removeAttr('title');
					$accordionBody.stop().slideUp(0);
					$thisBody.stop().slideDown(600);
				}
			});
		});
		
		/* map marker 변경하기 */
		$(window).load(function(){

			var $marker = $('.box.map .roughmap_maker_label');

			$marker.parent('div').prev('div').find('img').attr('src', '/site/public/images/template/map_marker.png');
			$marker.parent('div').prev('div').find('img').css({'width':'69', 'height':'71', 'top':'8px', 'left':'-11px','clip':'unset'});
			$marker.parent('div').prev('div').siblings('div').css({'z-index':'1'});
			$marker.parent('div').prev('div').siblings('div').find('.roughmap_maker_label').css({'top':'-22px', 'left':'-0.75px'});
		});


		// popup
		var $body = $('body'),
			$popupBg = $('.popup_bg'),
			$pupupBtn = $('.popup_btn'),
			$popupClose = $popupBg.find('.popup_close');
		$pupupBtn.on('click', function () {
			$popupBg.addClass('active');
			if ($popupBg.hasClass('active')) {
				$body.addClass('popup_show');
			}
			return false;
		})
		$popupClose.on('click', function () {
			$popupBg.removeClass('active');
			$body.removeClass('popup_show');
		})

		
		/* 웹진 */
		if($('.tour .webzine').length){
			$('body').addClass('webzine_wrap');
		};



		/* 전시 */
		if($('.p-exhibit .slide_wrap .slide_item').length === 0){
			$('.slide_wrap').addClass('slide_none');
		};

	});

})(jQuery);
