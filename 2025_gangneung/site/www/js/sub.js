function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
(function($) {
    'use strict';

    $(function() {

        var $container = element.$container = $('#container');


        /* 컨텐츠 탭메뉴 */
        var $tab = $container.find('.tab'),
            $tabItem = $tab.find('.tab_item'),
            $tabContent = $tab.find('.tab_panel');

        $tabItem.click(function (event) {
            var $this = $(this);
            var index = $(this).index();
            event.preventDefault();
            $this.find('button').addClass('active').closest('.tab_item').siblings().find('button').removeClass('active');
            $tabContent.eq(index).addClass('active').siblings().removeClass('active');
        });

        $('.type_accordion .tab_btn').click(function(){
           $(this).next().slideToggle();
        });

        /* 모바일 검색버튼 */
        $('.lnb .search_show .search_btn, .search_close').click(function(){
            $('html').toggleClass('search_opened');
        });

        /* cms 탭메뉴 */
        var $tabMenu = $container.find('.tab_menu'),
            $tabPanel =  $tabMenu.find('.tab_depth5'),
            $tabItem =  $tabMenu.find('li'),
            $tabSelect = $tabMenu.find('.mobile-tab-button'),
            $onItem = $tabMenu.find('li.on');

        $tabSelect.click(function () {
            var $this = $(this),
                $ParentTabmenu = $this.parent('.tab_menu'),
                IsActive = $ParentTabmenu.is('.active');
            if(!IsActive){
                $this.siblings('ul').slideDown('250', 'easeOutExpo');
                $ParentTabmenu.addClass('active');
            } else{
                $this.siblings('ul').slideUp('250', 'easeOutExpo');
                $ParentTabmenu.removeClass('active');
            }
        });

        $tabSelect.each(function(){
            var $onText = $(this).siblings('ul').find('li.on').text();
            $(this).text($onText);
        })

        //공유하기
        $('.share_open').click(function(){
			var $this = $(this),
				$Parent = $this.parent('.addons_item.share'),
                $sharePanel = $this.siblings('.share_panel'),
				IsActive = $Parent.is('.active');
            if(!IsActive){
                $sharePanel.slideDown();
                $Parent.addClass('active');
            } else{
                $Parent.removeClass('active');
                $sharePanel.slideUp();
            }
        });
        $('.share_hide').on('click', function(){
            $('.share_hide').parents('.addons_item.share').removeClass('active');
            $('.share_hide').parent('.share_panel').slideUp();
        });


        //기존 아코디언
        $('.part_title.type3 .tab_btn').attr('title', '목록 열기');
        
        $('.part_title.type3 .tab_btn').click(function(){
            $(this).toggleClass('active');

            if($(this).hasClass('active')){
                $(this).attr('title', '목록 닫기');
            }else{
                $(this).attr('title', '목록 열기');
            }
        })

		// 정보공개 > 재정정보 > 기금운용계획서 211202 추가
        $('.cts113 .part_title.type3 .tab_btn').attr('title', '년도별 기금운용 목록 열기');
        
        $('.cts113 .part_title.type3 .tab_btn').click(function(){
            $(this).toggleClass('active');

            if($(this).hasClass('active')){
                $(this).attr('title', '년도별 기금운용 목록 닫기');
            }else{
                $(this).attr('title', '년도별 기금운용 목록 열기');
            }
        });

		//게시판 대체텍스트 넣기 2022-10-27 서정한
		var nttNo = getParameterByName('nttNo'),
			$PhotoView = $('.bbs_content .photo_view'),
			PhotoViewLength = $PhotoView.length;
		if(nttNo){
			if(PhotoViewLength){
				$.ajax({
					url : '/site/www/bbsalt/'+nttNo+'.html',
					success : function (data) {
						var Iserror = $(data).find('.item').length;
						if(Iserror>0){
							$('.bbs_content').find('.bbsalt').append('<div class="headtitle">다음은 본문삽입이미지 대체텍스트입니다.</div>').append(data);
						}
					}
				});
			}
		}
		
    });
})(window.jQuery);