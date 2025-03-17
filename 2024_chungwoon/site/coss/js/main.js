/**
 * @author (주)한신정보기술 퍼블리셔팀 XXX
 * @since XXXX-XX-XX
 * @version 1.0.0
 */

(function($) {
	'use strict';
	
	$(function() {
		$('#tab_board .tab_btn').on('click',function(){
			var $this = $(this),
				$MyParent = $this.parent('li'),
				ParentIndex = $MyParent.index(),
				$OtherParents = $MyParent.siblings('li'),
				IsActive = $MyParent.is('.active'),
				$tabbox = $this.parents('ul.list').siblings('.tabbox'),
				$MyTab = $tabbox.find('li').eq(ParentIndex),
				$OtherTab = $MyTab.siblings('li');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$MyParent.addClass('active');
				$OtherTab.removeClass('active');
				$MyTab.addClass('active');
			};
		});

		$('#tab_board .tabbox ul li button').on('click',function(){
			var $this = $(this),
				$MyParent = $this.parent('li'),
				ParentIndex = $MyParent.index(),
				$OtherParents = $MyParent.siblings('li'),
				IsActive = $MyParent.is('.active'),
				$listbox = $this.parents('.tabbox').siblings('ul.list'),
				$MyList = $listbox.find('>li').eq(ParentIndex),
				$OtherList = $MyList.siblings('li');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$MyParent.addClass('active');
				$OtherList.removeClass('active');
				$MyList.addClass('active');
			};
		});

		var $visual = $('#visual .slidebox');
      
		$visual.each(function(){

			var $visualSlide = $(this).find('.slide_list'),
				$visualItems = $visualSlide.find('.slide_item'),
				$ControlBox = $(this).find('.controlbox'),
				$CountBox = $(this).find('.count'),
				$total = $CountBox.find('.total'),
				visualSlideEachLength = $visualItems.length;
				$visualSlide.on('init', function(event, slick, currentSlide){
				$total.text(visualSlideEachLength);
		

				if(visualSlideEachLength>1){
					$('.slidebox').addClass('');
				} else{
					$('.slidebox').addClass('one_slide');
				}
			});

			$visualSlide.slick({
				fade: true,
				autoplay : true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows:true,

				prevArrow : $ControlBox.find('.prev'),
				nextArrow : $ControlBox.find('.next'),
				pauseOnHover: false,
				swipe:false,
				draggable:false,
				dots:false,
				autoplaySpeed: 5000,
				//추가 기능
				autoArrow : $ControlBox.find('.auto'),
				isRunOnLowIE : false,
				pauseOnArrowClick : true,
				pauseOnDirectionKeyPush : true,
				pauseOnSwipe : true,
				pauseOnDotsClick : true,
				pauseText : '정지',
				playText : '재생',
				total : $CountBox.find('.total'),
				current : $CountBox.find('.current'),
				customState : function(state) {
					//현재 슬라이드 위치가 10보다 작을 때
					if(state.current < 10) {
						state.current = '0' + state.current;
					}

					//슬라이드 갯수가 10보다 작을 때
					if(state.total < 10) {
						state.total = '0' + state.total;
					}

					return state;
				},
				responsive: [
				{
				  breakpoint: 1001,
				  settings: {
					swipe:true,
					draggable:true,
					autoplay : false
				  }
				}]
			});
		});

		var dataSlick = $('.iljung_box .iljung_box_list');

		dataSlick.slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			variableWidth: true,
			infinite: true,
			autoplay: false,
			swipe: false,
			draggable: false,
			arrows: false,
			responsive : [{
				breakpoint : 1280,
					settings : {
						slidesToShow: 3,
						variableWidth: true,
						draggable: true
						}
				},{
				breakpoint : 800,
					settings : {
						variableWidth: true,
						swipe: true,
						slidesToShow: 2
					}
				}]
		});


		var dataSlick2 = $('#gallery_box .gallery_list');

		dataSlick2.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			variableWidth: true,
			infinite: true,
			autoplay: false,
			swipe: true,
			draggable: false,
			prevArrow: $('.prev_gallery'),
			nextArrow: $('.next_gallery'),
			responsive : [{
				breakpoint : 1200,
					settings : {
						draggable: true
						}
				}]
		});
		
		$("body").addClass("active");

		$("#council_pop_btn").click(function(e){
			$("#council_pop_box").addClass("modal_on");
		});

		$("#council_pop_close").click(function(e){
			$("#council_pop_box").removeClass("modal_on");
		});
	});
})(jQuery);



$(window).scroll(function() {
   var scroll = $(window).scrollTop();
	//console.log(scroll);
	if (scroll >= 1) {
		//console.log('a');
		$("#container").addClass("fixed");
	} else {
		//console.log('a');
		$("#container").removeClass("fixed");
	}


});