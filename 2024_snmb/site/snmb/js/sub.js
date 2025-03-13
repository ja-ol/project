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


		/* sub_head 탭메뉴 */
		function setTabHeight(){
			var $subTab = $container.find('.sub_head_tab .tab');

			if($subTab.length){
				var contentsWidth = $contents.width(),
					contentsLeft = $contents.offset().left;

				$subTab.each(function(){
					var $thisTab = $(this),
						$tabItem= $thisTab.find('.tab_item');

					$tabItem.each(function(){
						var $this = $(this),
							$thisDepth3 = $this.find('.tab3_list'),
							thisWidth = $this.width() - 1.5,
							thisLeft = $this.offset().left,
							marginLeft = thisLeft - contentsLeft;

						$thisDepth3.width(contentsWidth).css('margin-left', '-' + marginLeft + 'px');
					});
				});
			}
		}
		setTabHeight();

		$(window).on('resize', function(){
			setTabHeight();
		});


		/* path */
		var $path = $container.find('.path'),
			$pathItem = $path.find('.path_item'),
			$pathAnchor = $path.find('.path_anchor'),
			$pathLayer = $path.find('.path_layer');

		$pathAnchor.on('click', function (event) {
			var $this = $(this);

			event.stopPropagation();
			// event.preventDefault();
			if ($this.parent().hasClass('active') === true) {
				$this.parent().removeClass('active');
				$this.parent($pathItem).find('.path_layer').slideUp('250');
			} else {
				$this.parent($pathItem).addClass('active').siblings().removeClass('active');

				$pathLayer.slideUp('250');
				$this.parent($pathItem).find('.path_layer').slideDown('250');

				if ($this.parent($pathItem).hasClass('home') === true) {
					$this.unbind(event);
					$this.parent($pathItem).removeClass('active');
				}
			}
		})


		/* cms 탭메뉴  */
		var $cmsTab = $container.find('.cms_tab'),
			$tabMenu = $cmsTab.find('.tab_menu'),
			$tabSelect = $tabMenu.find('.tab_select');

		$cmsTab.each(function(index, element){
			var tabLength = $tabMenu.find('.tab_list .tab_item').length;
			$tabMenu.addClass('length' + tabLength);
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

	});
})(window.jQuery);
