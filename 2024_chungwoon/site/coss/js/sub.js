"use strict";

try {

    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            $(function() {
				//side메뉴
				$('.side_menu').menu({
					cut : {},
					event : 'click',
					namespace : 'side'
				});

                $('.tab_menu').not($('.prettyprint').children()).each(function() {
                    var li_length = $(this).children('ul').find('li').length;
                    $(this).addClass('divide'+li_length);
					if(li_length<=5){
						$(this).addClass('tabline');
					} else if(li_length>5){
						$(this).addClass('many');
					};
                });

                $.tag.wdw.on("responsive.sub", function(event) {
                    if(event.state == 'wide' || event.state == 'web') {

                    }
                    if(event.state == 'tablet' || event.state == 'phone') {

                    };
                });

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
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}


/* 학과소개 - 교수소개 상세보기 공통 */
$(function(){
    $('.btn_detail').on('click', function() {
        var $this = $(this),
			IsOn = $this.is('.on');
		if(!IsOn){
			$this.text('상세내용 닫기').addClass('on');
			$this.parents('.professor_box').find('.table_detail').slideDown(300);
		} else{
			$this.text('상세내용 열기').removeClass('on');
			$this.parents('.professor_box').find('.table_detail').slideUp(300);
		};
    });
});
