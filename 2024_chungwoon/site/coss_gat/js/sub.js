(function($) {
	'use strict';

	$(function() {
		var $window = element.$window = $(window),
			$html = element.$html = $('html'),
			$container = element.$container = $('#container'),
			$footer = element.$footer = $('#footer');

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

		//공유하기
        var $addons = $container.find('.addons'),
            $share = $addons.find('.share'),
            $shareOpen = $share.find('.addons_button'),
            $shareClose = $share.find('.share_close');
        $shareOpen.click(function () {
            $(this).closest('.share').addClass('active');
        });

        $shareClose.click(function () {
            $(this).closest('.share').removeClass('active');
        });

		/* cms 탭메뉴 */
		var $tabMenu = $container.find('.tab_menu.type2'),
			$tabSelect = $tabMenu.find('.tab_select');

		$tabSelect.click(function () {
			$(this).next('.tab_panel').slideToggle('250', 'easeOutExpo');
			$tabMenu.toggleClass('active');
		});

		/* 컨텐츠 탭메뉴 */
		var $tab = $container.find('.tab'),
			$tabButton = $tab.find('.tab_button'),
			$tabContent = $tab.find('.tab_content'),
			tabActiveText = $tab.find('.tab_menu.type2 .tab_item.active').text();

		$tab.find('.tab_select span').text(tabActiveText);

		$tabButton.click(function () {
			var $this = $(this),
				index = $tabButton.index(this),
				tabButtonText = $this.text();

			$this.closest('.tab_item').addClass('active').siblings().removeClass('active');
			$this.parents('.tab').find('.tab_select span').text(tabButtonText);
			$tabContent.eq(index).addClass('active').siblings().removeClass('active');
		});


        /* 반응형 테이블 */
        $('table.table.responsive').not($('.prettyprint').children()).each(function() {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });


	});
})(window.jQuery);