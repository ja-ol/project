
(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container'),
			$contents = $('#contents'),
			debounce = null;

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
		});


		/* 공유하기 */
		var $share = $('.addons').find('.share'),
			$shareOpen = $share.find('.addons_button'),
			$shareClose = $share.find('.share_close'),
			url = document.url;

		$shareOpen.on('click', function(event) {
			$share.addClass('active');
		});
		$shareClose.on('click', function(event) {
			$share.removeClass('active');
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

		/* 서브메인 */
		/* 이달의 김포 */
		if($('.subMain1').length){
			/* 많이 본 뉴스 news */

			var $news = $container.find('.subMain1 .news .news_wrap');
			$news.slick({
				autoplay : false,
				dots : true,
				slidesToShow : 2,
				slidesToScroll : 1,
				infinite : false,
				swipe : false,
				swipeToSlide : false,
				draggable : false,
				responsive: [
					{
						breakpoint : 1001,
						settings : {
							slidesToShow : 1,
							slidesPerRow : 1,
							rows : 1,
							swipe : true,
							swipeToSlide : true,
							draggable : true,
							infinite: true
						}
					},
				]
			});

			var $rankingtabList = $container.find(".subMain1 .rankingtab_list"),
				$rankingtabBtn = $rankingtabList.find(".rankingtab_item .rankingbtn"),
				$interestList = $(".subMain1 .interest_list");

			/* 모바일용 탭메뉴버튼 */
			$rankingtabBtn.on("click", function () {
				var thisIdx = $(this).closest('.rankingtab_item').index();

				$rankingtabBtn.removeAttr('title').parent().removeClass('active');
				$(this).attr("title", "선택됨").parent().addClass('active');
				// $(this);
				$interestList.removeClass('active').eq(thisIdx).addClass('active')
				// console.log($rankingList)
				// $rankingList.removeClass("active").eq(thisIdx).addClass("active");
			});
		}

		/* 김포기록보관소 */
		if($('.subMain3').length){

			console.log('a')
			/* 비주얼 */
			$('.subMain3 .visual').addClass('active');


			/* 주제별 사진 */
			var $photo = $container.find('.subMain3 .photo'),
				$photoTabButton = $photo.find('.tab_button'),
				$photoTabPanel = $container.find('.subMain3 .photo_panel');

			$photoTabButton.on('click', function () {
				var $this = $(this),
					$parent = $this.parents('.tab_item'),
					parentIndex = $parent.index();

				$parent.addClass('active').siblings().removeClass('active');
				$this.attr('title', '선택됨');
				$parent.siblings().children('.tab_button').removeAttr('title');
				$photoTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
			});

			$(window).on('resize', function(){
				if($(window).width() < 1001) {
					$('.subMain3 .photo_panel .photo_item').on('click', function(){
						$(document).on('click','.photo_panel:not(".noselect") .photo_item', function() {
							$('.subMain3 .photo_panel .photo_item').removeClass('active');
							$(this).addClass('active');
						});

						$('.subMain3 .photo_item.active .photo_view').on('click', function (e){
							e.trigger();
						});
					});
				}
			});




			/* 영상으로 전하는 시정소식 */
			var $news = $container.find('.subMain3 .news'),
				$newsList = $news.find('.news_list');

			$newsList.slick({
				slidesToShow : 1,
				slidesToScroll: 1,
				dots: true,
				appendDots: $news.find('.news_dots'),
				responsive: [
					{
						breakpoint: 1001,
						settings: {
							variableWidth : true,
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
		}

		/* 보도자료 게시판 상세 */
		if($('.bbs__news.bbs__view.bbs_new_skin').length){
			$('html').addClass('news_view');

			if($('.view_top .view_author .author_item.part').find('.part_call').length === 0){
				$('.author_item.part').addClass('none_part');
			}

			$window.on('load scroll', function(){
				if($(this).scrollTop() > 0){
					$('html').addClass('news_view_fixed');
				} else {
					$('html').removeClass('news_view_fixed');
				}
			});

			fontScale();
			function fontScale(){
				var fontScaleWrap = $("#fontScaleWrap"),
					zoomPlus = $(".addons_item.zoom .zoom_plus"),
					zoomMinus = $(".addons_item.zoom .zoom_minus"),
					cnt = 1,
					max = 4;

				zoomPlus.on('click', function() {
					if(cnt >= max){
						alert("최대 글자 크기입니다.");
						return false;
					}
					cnt++;
					fontScaleWrap.attr("class", ("size0" + cnt));
					return false;
				});

				zoomMinus.on('click', function() {
					if(cnt <= 1){
						alert("최소 글자 크기입니다.");
						return false;
					}
					cnt--;
					fontScaleWrap.attr("class", ("size0" + cnt));
					return false;
				});
			}

			function progressBarScroll() {
				let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
					height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
					scrolled = (winScroll / height) * 100;
				document.getElementById("progressBar").style.width = scrolled + "%";
			}

			window.onscroll = function () {
				progressBarScroll();
			};

		}

		/* 상세검색 */
		if($('.detail_search_view').length){

			$(function () {
				var photoGalleryList = !document.querySelector('.bbs__gallery.bbs__list').classList.contains('bbs__card') ? document.querySelector('.bbs__gallery.bbs__list') : false;
				if (photoGalleryList) {
					window.addEventListener('load', photoRatio);
					window.addEventListener('resize', photoRatio);
				};
				function photoRatio() {
					var photo = photoGalleryList.querySelectorAll('.p-media .photo');
					photo.forEach((ele, index) => {
						var height = ele.getBoundingClientRect().width * 0.67741;
						ele.style.height = height + 'px';
					})
				}
			});


		}


	});
})(window.jQuery);
