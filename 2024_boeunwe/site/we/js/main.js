(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $("#container");


		$window.load(function(){
			$('.we_layer').addClass('layer_on');
			$('.rowgroup').addClass('show');
		});


		/* 청년정책 검색 */
		var $search = $container.find('.search'),
			$searchSelect = $search.find('.search_select');

		$searchSelect.each(function(){
			var thisIdx = $(this).index(),
				thisTitle = $(this).find('select').attr('title'),
				thisTag = $(this).find('select').html().replaceAll('    ',''),
				thisOpt = thisTag.replaceAll('<option','    <li class="select_item"><button type="button" class="select_button"').replaceAll('</option>','</button></li>'),
				thisHtml = '<button type="button" class="search_select_button" data-index="' + thisIdx + '">' + thisTitle + '</button>\n' + '<ul class="select_list">' + thisOpt  + '</ul>'

			$(this).append(thisHtml);
		});

		$(document).on('click', '.search .search_select_button', function(){
			var $thisParent = $(this).parent(),
				$thisParent2 = $(this).parent().siblings(),
				$thisList = $thisParent.find('.select_list'),
				$thisParent2List = $thisParent2.find('.select_list');

			if($thisParent.hasClass('active')){
				$thisParent.removeClass('active');
			} else {
				$searchSelect.removeClass('active');
				$thisParent.toggleClass('active');
				$thisParent2List.slideUp();
			}

			$thisList.slideToggle();
		});

		$(document).on('click', '.search .select_item', function(){
			var thisIdx = $(this).index(),
				$thisParent = $(this).parents('.search_select'),
				$thisOpt = $thisParent.find('select option'),
				$selectBtn = $thisParent.find('.search_select_button'),
				$thisBtn = $(this).find('button'),
				thisVal = $thisBtn.text();

			$selectBtn.text(thisVal);
			$thisOpt.eq(thisIdx).prop('selected',true);
			$searchSelect.removeClass('active');
			$searchSelect.find('.select_list').slideUp();
		});


		/* 지원사업 */
		var $business = $container.find('.business'),
			$businessTab = $container.find('.business_tab'),
			$businessTabItem = $business.find('.business_tab .tab_item'),
			$businessPanel = $business.find('.business_panel'),
			$businessPanelList = $business.find('.business_panel .business_list'),
			$businessPanelItem = $business.find('.business_panel .business_item'),
			$businessPanelTitle = $business.find('.business_panel h3'),
			$businessPrev = $business.find('.business_button.prev'),
			$businessNext = $business.find('.business_button.next'),
			businessSlickOpt = {
				infinite: true,
				draggable: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: true,
				autoplay: false,
				prevArrow: $businessPrev,
				nextArrow: $businessNext,
				responsive: [
					{
						breakpoint: 1601,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 1201,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 1001,
						settings: {
							slidesToShow: 4,
							variableWidth : true,
							slidesToScroll: 1,
							draggable: true,
						}
					},

				]
			};

		$businessTabItem.on('click', function() {
			var $this = $(this),
				thisType = $(this).attr('data-type'),
				thisIdx = $this.index(),
				data = $this.data(),
				newPanelTitle = $this.find('button').text(),
				slickOptions = $.extend({}, businessSlickOpt);

			$businessTabItem.removeAttr('title');
			$this.attr('title', '선택됨');
			$this.addClass('active').siblings().removeClass('active');
			$businessPanelTitle.text(newPanelTitle + ' 목록');
			$businessPanel.attr('data-slick', thisIdx);
			$business.attr('data-type', 'business' + thisIdx);

			$businessPanelList.slick('unslick');
			$businessPanelItem.detach();
			var filteredItems = $businessPanelItem.filter('[data-type="' + data.type + '"]');

			if (thisType === 'all') {
				filteredItems = $businessPanelItem;
			}

			// 'none' 클래스 추가/제거 및 div 추가
			if (filteredItems.length === 0) {
				$businessPanelList.addClass('none').empty().append('<div class="business_none"><span>진행중인 지원사업이 없습니다.</span></div>');
			} else {
				$businessPanelList.removeClass('none').empty().append(filteredItems);
				$businessPanelList.slick(slickOptions);
			}
		}).filter('.active').triggerHandler('click');

		if ($businessTabItem.length === 0) {
			$businessPanelList.addClass('none').empty().append('<div class="business_none"><span>진행중인 지원사업이 없습니다.</span></div>');
		}

		$businessTab.on('scroll',function(){
			var $this = $(this);

			if( $this[0].scrollWidth - $this.scrollLeft() - '20' <= $this.outerWidth()) {
				$businessTab.addClass('end');
			}else{
				$businessTab.removeClass('end');
			}
		});

		/* 공지사항 */
		var $board = $container.find('.board'),
			$boardTabButton = $board.find('.tab_button'),
			$boardTabPanel = $board.find('.board_panel');

		$boardTabButton.on('click', function () {
			var $this = $(this),
				thisText = $(this).text(),
				$parent = $this.parents('.tab_item'),
				parentIndex = $parent.index();

			$parent.addClass('active').siblings().removeClass('active');
			$this.attr('title', '선택됨');
			$('.board_content').find('.skip').text(thisText + ' 목록')
			$parent.siblings().children('.tab_button').removeAttr('title');
			$boardTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
		});


		/* 팝업존 */
		var $popupzone = $container.find('.popupzone'),
			$popupzoneList = $popupzone.find('.popupzone_list'),
			$popupzoneCurrent = $popupzone.find('.popupzone_current'),
			$popupzoneTotal =  $popupzone.find('.popupzone_total'),
			$popupzoneAuto =  $popupzone.find('.popupzone_button.auto'),
			$popupzonePrev =  $popupzone.find('.popupzone_button.prev'),
			$popupzoneNext =  $popupzone.find('.popupzone_button.next');

		$popupzoneList.slick({
			slidesToShow: 1,
			autoplay: true,
			infinite: true,
			current : $popupzoneCurrent,
			total : $popupzoneTotal,
			playText: '재생',
			pauseText: '정지',
			autoArrow: $popupzoneAuto,
			prevArrow: $popupzonePrev,
			nextArrow: $popupzoneNext,
		});


		/* 일자리 안내 */
		var $notice = $container.find('.notice'),
			$noticeList = $notice.find('.notice_list'),

			noticeListSlickOpt = {
				slidesToShow: 3,
				slidesToScroll : 1,
				infinite : true,
				autoPlay : false,
				draggable : true,
				variableWidth : true,
			};

		$(window).on('load resize', function() {
			if($(window).width() > 1000) {
				$noticeList.slick('unslick');
			}
			else {
				$noticeList.not('.slick-initialized').slick(noticeListSlickOpt);
			}
		});


		/* 레이어 팝업 */
		var $weLayer = $('body').find('.we_layer'),
			$weLayerList = $weLayer.find('.layer_list'),
			$weLayerPrev = $weLayer.find('.layer_button.prev'),
			$weLayerNext = $weLayer.find('.layer_button.next');

		$weLayerList.slick({
			draggable: true,
			swipe: true,
			swipeToSlide: true,
			slidesToShow: 4,
			autoplay: false,
			infinite: true,
			prevArrow: $weLayerPrev,
			nextArrow: $weLayerNext,
			responsive: [
				{
					breakpoint: 1001,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 641,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 481,
					settings: {
						slidesToShow: 1,
					}
				},
			]

		});


		/* fade */
		var $fade = $('.fade');

		function fade() {
			$fade.each(function () {
				var bottom_of_object = $(this).offset().top + $(this).outerHeight();
				var bottom_of_window = $window.scrollTop() + $window.height();

				if($(this).hasClass('rowgroup4')){
					if (bottom_of_window > bottom_of_object / 1.1) {
						$(this).addClass('show');
					} else {
						$(this).removeClass('show');
					}
				}
				else{
					if (bottom_of_window > bottom_of_object / 1.4) {
						$(this).addClass('show');
					} else {
						$(this).removeClass('show');
					}
				}
			});
		}

		fade();
		$window.scroll(function () {
			fade();
		});


	});
})(window.jQuery);
