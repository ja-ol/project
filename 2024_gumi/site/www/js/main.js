(function($) {
	'use strict';

	$(function() {

		var $window = $(window),
			$container = $('#container');

		//예약
		var currentIsMobile = isMobile();
		var windowWidth = $(window).width();

		function isMobile() {
			return window.innerWidth <= 1000;
		}

		function checkScroll($element) {
			if ($element[0].scrollHeight > $element[0].clientHeight) {
				$element.addClass('scroll');
			} else {
				$element.removeClass('scroll');
			}
		}

		$('input[name="step1"]').on('change', function() {
			$('input[name="step1"]:checked').parent().addClass('active').siblings().removeClass('active');

			$('input[name="step2"]:checked').prop('checked', false);
			$('input[name="step2"]').closest('li').removeClass('active last');
			$('input[name="step3"]:checked').prop('checked', false);
			$('input[name="step3"]').closest('li').removeClass('active last');

			var selectedType = $(this).val();
			var $step2Items = $('.quick_item.n2 .step_item[data-type="' + selectedType + '"]');

			$step2Items.addClass('active');
			$step2Items.last().addClass('last');
			$('.quick_item.n3 .step_item').removeClass('active last');
			$('.quick_item.n3 .step_none').addClass('active');

			// Step Scroll의 스크롤 여부 체크
			var $stepScroll = $('.quick_item.n2 .step_scroll');
			checkScroll($stepScroll);

			if(!isMobile()){
				if ($step2Items.length > 0) {
					$step2Items.first().find('input[name="step2"]').prop('checked', true).trigger('change');
				}
			}
		});

		$('input[name="step2"]').on('change', function() {
			$('input[name="step3"]:checked').prop('checked', false);
			$('input[name="step3"]').closest('li').removeClass('active last');

			var selectedType2 = $(this).val();
			var $step3Items = $('.quick_item.n3 .step_item[data-type2="' + selectedType2 + '"]');
			$step3Items.addClass('active');

			if ($step3Items.length > 0) {
				$step3Items.last().addClass('last');
				$('.quick_item.n3 .step_none').removeClass('active');
			} else {
				$('.quick_item.n3 .step_none').addClass('active');
			}

			$(this).closest('li').addClass('active');
			$('.quick_item.n2 .step_item.active').last().addClass('last');

			var $stepScroll = $('.quick_item.n3 .step_scroll');
			checkScroll($stepScroll);
		});

		function stepPc(){
			$('input[name="step1"]:first').prop('checked', true).trigger('change');
		}

		function stepMobile(){
			$('input[name="step1"]').prop('checked', false);
			$('input[name="step2"]').prop('checked', false);
			$('.quick_item.n1').addClass('open').removeClass('active');
			$('.quick_item.n2, .quick_item.n3').removeClass('active open');
			$('.quick_item.n1 .step_item, .quick_item.n2 .step_item, .quick_item.n3 .step_item').removeClass('active last');
			$('.quick_item.n3 .step_none').addClass('active');

			$('input[name="step1"]').on('change', function() {
				$('.quick_item.n1').removeClass('open').addClass('active');
				$('.quick_item.n2').addClass('open').removeClass('active');
			});

			$('input[name="step2"]').on('change', function() {
				$('.quick_item.n2').removeClass('open').addClass('active');
				$('.quick_item.n3').addClass('open').removeClass('active');
			});

			$('input[name="step3"]').on('change', function() {
				$('.quick_item.n3').addClass('active');
			});

			$('.step_open').on('click', function() {
				var $parent = $(this).closest('.quick_item');

				if ($parent.hasClass('active')) {
					if ($parent.hasClass('open')) {
						$parent.removeClass('open');
					}else{
						$('.quick_item').removeClass('open');
						$parent.addClass('open');
					}
				}
			});
		}

		function mapPc() {
			const basePath = window.location.pathname.split('/').slice(0, 2).join('/'); // 첫 두 경로를 기준으로 설정
			const baseUrl = `${window.location.origin}${basePath}/site/www/images/main/`;

			$('.map_bg img:nth-child(1)').attr('src', baseUrl + 'map_img.png');
			$('.map_bg img:nth-child(2)').attr('src', baseUrl + 'map_img2.png');
			$('.map_bg img:nth-child(3)').attr('src', baseUrl + 'map_img3.png');
		}

		function mapMobile() {
			const basePath = window.location.pathname.split('/').slice(0, 2).join('/'); // 첫 두 경로를 기준으로 설정
			const baseUrl = `${window.location.origin}${basePath}/site/www/images/main/`;

			$('.map_bg img:nth-child(1)').attr('src', baseUrl + 'm_map_img.png');
			$('.map_bg img:nth-child(2)').attr('src', baseUrl + 'm_map_img2.png');
			$('.map_bg img:nth-child(3)').attr('src', baseUrl + 'm_map_img3.png');
		}

		if (!isMobile()) {
			stepPc();
			mapPc();
		}else{
			stepMobile();
			mapMobile();
		}

		$(window).resize(function() {
			var newWindowWidth = $(window).width();
			var newIsMobile = isMobile();

			if (newWindowWidth !== windowWidth && newIsMobile !== currentIsMobile) {
				windowWidth = newWindowWidth;
				currentIsMobile = newIsMobile;

				if (!currentIsMobile) {
					// 피씨 모드 실행
					stepPc();
					mapPc();
				} else {
					// 모바일 모드 실행
					stepMobile();
					mapMobile();
				}

				// scroll check 함수
				$('.quick_item .step_scroll').each(function() {
					checkScroll($(this));
				});
			}
		});


		$('.quick_reset').on('click', function() {
			if (isMobile()) {
				$('input[name="step1"], input[name="step2"], input[name="step3"]').prop('checked', false);
				$('.quick_item .step_item, .quick_item').removeClass('active last open');
				$('.quick_item.n1').addClass('open');
				$('.quick_item.n3 .step_none').addClass('active');
			} else {
				$('#step1_1').trigger('click');
				$('input[name="step2"][value="a1"]').prop('checked', true);
				$('.quick_item.n3 .step_item').removeClass('active last');
				$('.quick_item.n3 .step_item[data-type2="a1"]').addClass('active');
			}
		});



		// 탭 버튼 클릭 시 처리
		$('.map .tab_btn').on('click', function() {
			var thisIdx = $(this).parent().index() + 1;
			var $tabItem = $(this).closest('.tab_item');

			$('.map').attr('class','map type' + thisIdx);
			$('.map .tab_item').removeClass('active');
			$tabItem.addClass('active');
			$tabItem.find('.panel_item:first-child button').trigger('click');
		});

		// 패널 버튼 클릭 시 처리
		$('.map .panel_item button').on('click', function() {
			var value = $(this).val();
			var $panelItem = $(this).closest('.panel_item');
			var $tabItem = $(this).closest('.tab_item');

			$tabItem.find('.panel_item').removeClass('active');
			$panelItem.addClass('active');
			$('.map .map_mark .marker').removeClass('active');
			$('.map_mark .marker[data-type="' + value + '"]').addClass('active');
		});

		$('.map .tab_item.n1 .panel_item:first-child button').trigger('click');

		//예약 및 접수현황
		var $situation = $container.find('.situation'),
			$situationTabItem = $situation.find('.situation_tab .situation_item'),
			$situationPanel = $situation.find('.situation_panel'),
			$situationPanelList = $situation.find('.situation_panel .situation_list'),
			$situationPanelItem = $situation.find('.situation_panel .situation_item'),
			$situationPanelTitle = $situation.find('.situation_panel h3'),
			$situationPrev = $situation.find('.situation_prev'),
			$situationNext = $situation.find('.situation_next'),
			situationSlickOpt = {
				infinite: false,
				draggable: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: true,
				autoplay: false,
				prevArrow: $situationPrev,
				nextArrow: $situationNext,
				responsive: [
					{
						breakpoint: 1401,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 1001,
						settings: {
							infinite: true,
							draggable: true,
							variableWidth: true,
							slidesToShow: 1,
							slidesToScroll: 1,
						}
					}
				]
			};

		$situationTabItem.on('click', function() {
			var $this = $(this),
				thisIdx = $this.index(),
				data = $this.data(),
				newPanelTitle = $this.find('button').text(),
				slickOptions = $.extend({}, situationSlickOpt);

			if ($this.index() === 2) {
				slickOptions.slidesToShow = 2;
				slickOptions.responsive = [
					{
						breakpoint: 1401,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
					},
					{
						breakpoint: 1001,
						settings: {
							infinite: true,
							draggable: true,
							variableWidth: true,
						}
					}
				]
			}

			$situationTabItem.removeAttr('title');
			$this.attr('title', '선택됨');
			$this.addClass('active').siblings().removeClass('active');
			$situationPanelTitle.text(newPanelTitle);
			$situationPanel.attr('data-slick',thisIdx);
			$situationPanelList.slick('unslick');
			$situationPanelItem.detach();
			$situationPanelList.empty().append($situationPanelItem.filter('[data-type="' + data.type + '"]'));
			$situationPanelList.slick(slickOptions);

			if(thisIdx === 0){
				$situation.find('.situation_more').attr('href','/reservation/www/edu/program/search.do?key=208');
			}else if(thisIdx === 1){
				$situation.find('.situation_more').attr('href','/reservation/www/anm/master/list.do?key=132');
			}else if(thisIdx === 2){
				$situation.find('.situation_more').attr('href','/reservation/www/arts/concert/calendar.do?key=86&scCategory=0&all=Y');
			};

		}).filter('.active').triggerHandler('click');

		/* popup */
		var $popup = $container.find('.popup'),
			$popupList = $popup.find('.popup_list'),
			$popupCurrent = $popup.find('.popup_current'),
			$popupTotal =  $popup.find('.popup_total'),
			$popupPrev = $popup.find('.popup_prev'),
			$popupAuto = $popup.find('.popup_auto'),
			$popupNext = $popup.find('.popup_next');

		$popupList.slick({
			speed: 800,
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: true,
			infinite: true,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 4000,
			playText: '재생',
			pauseText: '정지',
			pauseOnFocus: false,
			pauseOnHover: false,
			prevArrow: $popupPrev,
			autoArrow: $popupAuto,
			nextArrow: $popupNext,
			dots: false,
			responsive: [
				{
					breakpoint: 1401,
					settings: {
						variableWidth: false,
					}
				},
			]
		});

		$popupList.on('init reInit afterChange', function (event, slick, currentSlide) {
			var current = (currentSlide !== undefined ? currentSlide : slick.currentSlide) + 1,
				total = slick.slideCount;

			$popupCurrent.text(current < 10 ? '0' + current : current);
			$popupTotal.text(total < 10 ? '0' + total : total);
		});

		$popupList.slick('slickGoTo', 0, true);








		//gsap
		$('.button--bubble').each(function() {
			var $circlesTopLeft = $(this).parent().find('.circle.top-left');
			var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');

			var tl = new TimelineLite();
			var tl2 = new TimelineLite();

			var btTl = new TimelineLite({ paused: true });

			tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
			tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
			tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
			tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
			tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
			tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
			tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

			var tlBt1 = new TimelineLite();
			var tlBt2 = new TimelineLite();

			tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
			tlBt1.add(tl);

			tl2.set($circlesBottomRight, { x: 0, y: 0 });
			tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
			tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
			tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
			tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
			tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
			tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
			tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');

			tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
			tlBt2.add(tl2);

			btTl.add(tlBt1);
			btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
			btTl.add(tlBt2, 0.2);
			btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

			btTl.timeScale(2.6);

			$(this).on('mouseover', function() {
				btTl.restart();
			});
		});

		/* fade */
		var $fade = $container.find('.fade, .fade_in');
		function fade() {
			$fade.each(function(i) {
				var top_of_object = $(this).offset().top;
				var bottom_of_window = $window.scrollTop() + $window.height();

				if (bottom_of_window > top_of_object) {
					$(this).addClass('show');
				} else {
					$(this).removeClass('show');
				}
			});
		}

		fade();
		$window.scroll(function(){
			fade();
		});

	});
})(window.jQuery);
