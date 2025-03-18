(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;

		$window.on('responsive.main', function(event) {

			if(event.state == 'wide' || event.state == 'web') {
				mode = 'pc';


			}else if(event.state == 'tablet') {
				mode = 'tablet';
			}else if(event.state == 'phone') {
				mode = 'mobile';
			};

			if(event.state == 'wide' || event.state == 'web' || event.state == 'tablet') {


			};

		});

		$('.path li.list button').on('click', function() {
			var $this = $(this),
				$MyParent = $this.parent('li.list'),
				$OtherParents = $MyParent.siblings('li.list'),
				$MyLayer = $this.siblings('.layer'),
				$OtherBtn = $OtherParents.find('button'),
				$OtherLayer = $OtherParents.find('.layer'),
				IsActive = $MyParent.is('.active');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherBtn.attr('title', '목록열기');
				$OtherLayer.slideUp();
				$MyParent.addClass('active');
				$this.attr('title', '목록닫기');
				$MyLayer.slideDown();
			} else{
				$MyParent.removeClass('active');
				$this.attr('title', '목록열기');
				$MyLayer.slideUp();
			};
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

		/* 스텝 자동 높이 */
		function stepAutoHeight(){
			var $step = $container.find('.step'),
				$stepList = $step.find('.step_list'),
				$stepItem = $stepList.find('.step_item');

			$stepList.each(function (index, element) {
				var $element = $(element),
					$elementStepItem = $element.find('.step_item'),
					$elementItemLevel = $elementStepItem.find('.level'),
					height = 0,
					width = 0,
					count;
				if($element.parents('.step')){
					$($elementStepItem, element).each(function (index){
						var $this = $(this),
							thisWidth = $this.find('.step_content').width(),
							thisHeight = $this.find('.step_content').height();

						if (thisWidth > width){
							width = thisWidth;
						}
						if (thisHeight > height){
							height = thisHeight;
						}

						count = index + 1;
					}).height(height);
				}
				//$element.closest('.step').addClass('length' + count);
			});
		}
		stepAutoHeight();

		/* 아코디언 열고 닫기*/
		$('.accordion_item .title_wrap .accordion_btn').on('click', function() {
			var $this = $(this),
				$Title = $this.parent('.title_wrap'),
				$Item = $Title.parent('.accordion_item'),
				$Layer = $Title.siblings('.text_wrap'),
				IsActive = $Item.is('.active');
			if(!$Item.closest('.accordion').hasClass('open')){
				if(!IsActive){
					if($('body#eng').length){
						$this.addClass('active').attr("title","close");
					}else{
						$this.addClass('active').attr("title","닫기");
					}
					$Item.addClass('active');
					$Layer.stop().slideDown();
				} else {
					if($('body#eng').length){
						$this.removeClass('actvie').attr("title","open");
					}else{
						$this.removeClass('actvie').attr("title","열기");
					}
					$Item.removeClass('active');
					$Layer.stop().slideUp();
				}
			}
		}).eq(0).trigger('click');

	});
})(window.jQuery);
