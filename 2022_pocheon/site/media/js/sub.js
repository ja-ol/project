(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;

		//탭 높이값
		function setTabHeight(){
			var $tab = $('.tab');
			$tab.each(function(){
				var $thisTab = $(this),
					$tab2List = $thisTab.find('.tab2_list'),
					$tab3List = $thisTab.find('.tab3_wrap'),
					$tab2Item = $thisTab.find('.tab_item'),
					tabHeight = $tab2List.height();

				$tab.removeAttr('style');
				tabHeight = $tab2List.height();
				$tab2Item.each(function(){
					var $this = $(this);
					if($this.hasClass('active')){
						var $tab3 = $this.find('.tab3_wrap'),
							$tab3Item = $tab3.find('.tab3_item');
						$tab3.css('top', $tab2List.height());
						tabHeight += $tab3.outerHeight();
					}
					$tab.height(tabHeight);
				});
			});
		}
		setTabHeight();
		$(window).on('resize', function(){
			setTabHeight();
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

		/*/!* 공유 *!/
		var $share = $('.addons').find('.share'),
			$shareButton = $share.find('.addons_button'),
			$sharePanel = $share.find('.share_panel'),
			OnOff = $share.is('.active'),
			url = document.url;

		$shareButton.on('click', function(event) {
			$share.addClass('active');
			$shareButton.attr('title', 'sns 공유 닫기').text('sns 공유 닫기');
			$sharePanel.animate({
				width: "show"
			}, 250);
		});
		$shareButton.on('click', function(event) {
			$share.removeClass('active');
			$shareButton.attr('title', 'sns 공유 열기').text('sns 공유 열기');
			$sharePanel.animate({
				width: "hide"
			}, 250);
		});*/


		//공유하기
		$('.addons .addons_item .addons_button').on('click', function(){
			var $this = $(this),
				$share = $this.parent('.share'),
				$layer = $this.siblings('.share_panel'),
				OnOff = $share.is('.active');

			if(!OnOff){
				$share.addClass('active');
				$this.attr('title', 'sns 공유 닫기').text('sns 공유 닫기');
				$layer.animate({
					width: "show"
				}, 250);
			} else{
				$share.removeClass('active');
				$this.attr('title', 'sns 공유 열기').text('sns 공유 열기');
				$layer.animate({
					width: "hide"
				}, 250);
			};
		});


		/* 인쇄 */
		$('li.addons_item.print button.addons_button').on('click', function(){window.print();});



		/* faq 게시판 */
		function faqList(list) {
			var faqList = $(list).find(".list > dt");
			var faqBtn_Qpen = faqList.find("button");

			faqBtn_Qpen.on("click", function () {

				var item = $(this).parent('dt');

				if (item.hasClass('active')) {
					item.removeClass("active");
					item.next("dd").slideUp('100');
				}
				else {
					faqList.not(item).each(function () {
						$(this).removeClass("active");
						$(this).next("dd").slideUp('100');
					});
					item.addClass("active");
					item.next("dd").slideDown('100');
				}
			});
		}

		$(function () {
			var faq   = $("[data-list='faq']");

			if(faq.length > 0) {
				var list = faq.attr('class').replace(/ /g, '.');
				$(window).on({
					load: function () {
						faqList('.'+ list)
					}
				});
			}
		});

	});
})(window.jQuery);