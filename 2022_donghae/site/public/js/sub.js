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
			var $step = $container.find('.step.width');
            $step.find('.step_inner, .step_title, .step_text').removeAttr('style', 'height');

            $step.each(function () {
                var $stepInner = $(this).find('.step_inner'),
                    maxHeight = 0;
                $stepInner.css({'height':'auto'});
                $stepInner.each(function () {
                    var $div = $('<div></div>'),
                        $stepTitle = $(this).find('.step_title'),
                        $stepText = $(this).find('.step_text');
                    $div.addClass('step_wrap');
                    if (maxHeight < $(this).innerHeight()) {
                        maxHeight = $(this).innerHeight();
                    }
                    $(this).addClass('vertical')
                    if ($(this).find('.step_wrap').length===0) {
                        $(this).append($div);
                        $(this).find('.step_wrap').append($stepTitle, $stepText);
                    }
                })
                $stepInner.innerHeight(maxHeight);
            })

		}
		stepAutoHeight();

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
		linkAutoHeight();


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

			var $marker = $('.box.map .roughmap_maker_label');

			$marker.parent('div').prev('div').find('img').attr('src', '/site/public/images/template/donghae_map_marker.png');
			$marker.parent('div').prev('div').find('img').css({'width':'69', 'height':'71', 'left':'-11px','clip':'unset'});
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

		$(document).ready(function(){
			//ebook 리스트 버튼 박스 접근성 관련 포커스 수정
			var $pEbook = $('.p_ebooklist'),
				$EbookList = $pEbook.find('.ebook_list'),
				$EbookItem = $EbookList.find('.ebook_item');

			$EbookItem.on('mouseover focusin',  function(){
				$EbookItem.removeClass('active');
				$(this).addClass('active');
			});
			$EbookItem.on('mouseleave focusout',  function(){
				$EbookItem.removeClass('active');
			});

		});

	});
})(window.jQuery);
