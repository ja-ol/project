(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;

		//cms 탭메뉴
		var $tab = $container.find('.tab'),
			$tabMenu = $tab.find('.tab_menu'),
			$tabSelect = $tabMenu.find('.tab_select');

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

		/* breadcrumbs */
		var $breadcrumbs = $container.find('.breadcrumbs_item'),
			$breadcrumbsSelect = $breadcrumbs.find('.breadcrumbs_select');

		$breadcrumbsSelect.click(function () {
			var $this = $(this),
				$ParentTabmenu = $this.parent('.breadcrumbs_item'),
				IsActive = $ParentTabmenu.is('.active');
			if(!IsActive){
				$ParentTabmenu.siblings().removeClass('active').find('.breadcrumb_panel').stop().slideUp();
				$ParentTabmenu.find('.breadcrumb_panel').stop().slideDown(250);
				$ParentTabmenu.addClass('active');
				$breadcrumbsSelect.attr('title','목록닫기');
			} else{
				$ParentTabmenu.find('.breadcrumb_panel').stop().slideUp(100);
				$ParentTabmenu.removeClass('active');
				$breadcrumbsSelect.attr('title','목록열기');
			}
		});


		/* 컨텐츠 탭메뉴 */
		$tab.each(function(index, element){
			var $tabMenu = $(element).find('.tab_menu'),
				$tabBtn = $(element).find('.tab_list.n1 > .tab_item > button.tab_button'),
				tabAllChk = $tabBtn.is('.tab_all'),
				$tabContent = $(element).find('.tab_content');

			var liLength = $tabMenu.find('.tab_list.n1 > .tab_item').length;
			$tabMenu.addClass('divide' + liLength);

			if(liLength < 5 && $tabMenu.find('.tab_list.n2').length){
				$tabMenu.addClass('noneBr')
			}

			$tabBtn.click(function () {
				var $this = $(this),
					index = $tabBtn.index(this),
					tabButtonText = $this.text(),
					IsTabAll = $this.is('.tab_all'),
					$tabPanel = $this.parents('.tab_panel'),
					$tabMenu = $this.parents('.tab_menu');

				$this.attr('title', '선택됨').closest('.tab_item').addClass('active').siblings('.tab_item').removeClass('active').find('.tab_button').removeAttr('title');
				$this.parents('.tab').find('.tab_select span').text(tabButtonText);
				$tabPanel.attr('class','tab_panel').addClass('active' + (index + 1));

				if (tabAllChk){
					if (IsTabAll) {
						$tabContent.addClass('active');
					} else {
						$tabContent.eq(index - 1).addClass('active').siblings('.tab_content').removeClass('active');
					}
				} else if (!tabAllChk){
					$tabContent.eq(index).addClass('active').siblings('.tab_content').removeClass('active');
				}
				if ($window.width() <= 800) {
					$tabMenu.removeClass('active');
					$tabPanel.slideUp('250');
				}
				if ($window.width() <= 800 && IsTabAll) {
					$tabMenu.removeClass('active');
					$tabPanel.slideUp('250');
				};
				
				
			});
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


		/* map marker 변경하기 */
		$(window).load(function(){

			var $marker = $('.map_box .roughmap_maker_label');
			$marker.parent('div').prev('div').find('img').attr('src', '/site/www/images/template/map_marker.png');
			$marker.parent('div').prev('div').find('img').css({'width':'20', 'height':'17', 'top':'35px', 'left':'8px','clip':'unset'});
			$marker.parent('div').prev('div').siblings('div').css({'z-index':'1'});
			$marker.parent('div').prev('div').siblings('div').find('.roughmap_maker_label').css({'top':'-11px', 'left':'5px'});
		});


	});
})(window.jQuery);
