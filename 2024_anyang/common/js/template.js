
(function($) {
    'use strict';

    $(function() {
        $('table.table.type3').not($('.prettyprint').children()).each(function() {
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

function tabOrg(tabid,a,img) {
    var $tab, $tab_btn,$obj,$obj_view;
    var tabid = tabid, num = a, btn_img = img;

    $tab = $(tabid+' .tab_item  > li');
    $tab_btn = $(tabid+' .tab_item > li > a');
    $obj = $(tabid+' .tab_obj');
    $obj_view = $(tabid+' .tab_obj.n'+num);

    $tab.eq(num-1).addClass('active');
    $obj_view.show();

    if(btn_img =='img'){
        var btn = $tab.eq(num-1).children('a').find("img");
        btn.attr("src",btn.attr("src").replace("_off","_on"));
    }

    $tab.bind("click",function(event){
        if(btn_img =='img'){
            for(var i=0;i<$tab.size();i++){
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src",btn.attr("src").replace("_on","_off"));
            }
            var active = $(this).parent().attr('class');
            if(active != 'active'){
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src =  btn_img_off.src.replace('_off','_on');
            }
        }

        var this_eq = $tab.index( $(this) );
        $tab.removeClass('active');
        $tab.eq(this_eq).addClass('active');

        $obj.hide();
        $(tabid+' .tab_obj.n'+(this_eq+1)).show();

        event.preventDefault ();
    });
}

function tabMenuOrg(tabid,a,img) {
    var $tab, $tab_btn,$obj,$obj_view;
    var tabid = tabid, num = a, btn_img = img;

    $tab = $(tabid+' .tab_list  > li');
    $tab_btn = $(tabid+' .tab_list > li > a');
    $obj = $(tabid+' .tab_obj');
    $obj_view = $(tabid+' .tab_obj.n'+num);

    $tab.eq(num-1).addClass('active');
    $obj_view.show();

    if(btn_img =='img'){
        var btn = $tab.eq(num-1).children('a').find("img");
        btn.attr("src",btn.attr("src").replace("_off","_on"));
    }

    $tab.bind("click",function(event){
        if(btn_img =='img'){
            for(var i=0;i<$tab.size();i++){
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src",btn.attr("src").replace("_on","_off"));
            }
            var active = $(this).parent().attr('class');
            if(active != 'active'){
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src =  btn_img_off.src.replace('_off','_on');
            }
        }

        var this_eq = $tab.index( $(this) );
        $tab.removeClass('active');
        $tab.eq(this_eq).addClass('active');

        $obj.hide();
        $(tabid+' .tab_obj.n'+(this_eq+1)).show();

        event.preventDefault ();
    });
}

function tabMenuOrg2(tabid,a,img) {
    var $tab, $tab_btn,$obj,$obj_view;
    var tabid = tabid, num = a, btn_img = img;

    $tab = $(tabid+' .tab_list  > .tab_item.inner');
    $tab_btn = $(tabid+' .tab_list > .tab_item.inner > a');
    $obj = $(tabid+' .tab_content');
    $obj_view = $(tabid+' .tab_content.n'+num);

    $tab.eq(num-1).addClass('active');
    $obj_view.show();

    if(btn_img =='img'){
        var btn = $tab.eq(num-1).children('a').find("img");
        btn.attr("src",btn.attr("src").replace("_off","_on"));
    }

    $tab.bind("click",function(event){
        if(btn_img =='img'){
            for(var i=0;i<$tab.size();i++){
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src",btn.attr("src").replace("_on","_off"));
            }
            var active = $(this).parent().attr('class');
            if(active != 'active'){
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src =  btn_img_off.src.replace('_off','_on');
            }
        }

        var this_eq = $tab.index( $(this) );
        $tab.removeClass('active');
        $tab.eq(this_eq).addClass('active');

        $obj.hide();
        $(tabid+' .tab_content.n'+(this_eq+1)).show();

        event.preventDefault ();
    });
}


/**
 * 2021-08-09 추가
 * <span class="ageToBirthday">만 18세 이상</span> 에
 * 생년월일 말풍선 보여주기
 */
$(document).ready(function() {
	var clasLis = document.getElementsByClassName("ageToBirthday");
	var result = "";
	for(var i=0; i<clasLis.length; i++){
		var ms = " 출생 기준";
		var spanText = $(clasLis[i]).text();
		var age = spanText.replace(/[^0-9]/g,'');
		var atbDate = getAgeToBirthday(age);
		if(spanText.indexOf('이상') !== -1){
			ms = " 이전 출생";
		} else if(spanText.indexOf('이하') !== -1){
			ms = " 이후 출생";
		}
		result = atbDate + ms;
		$(clasLis[i]).attr('title', result);
	}
	//$('.ageToBirthday').click(function(){ alert(result); });
});
//나이를 입력하면 출생년월일을 계산하여 리턴
function getAgeToBirthday(age) {
	//오늘 날짜 설정
	var ndat = new Date();
	var yy = ndat.getFullYear();    //yyyy
    var mn = (1 + ndat.getMonth()); //M
    mn = mn >= 10 ? mn : '0' + mn;  //month 두자리로 저장
    var dy = ndat.getDate();        //d
    dy = dy >= 10 ? dy : '0' + dy;  //dy 두자리로 저장
    var today = yy + mn + dy;

    //출생년월일 계산
	var td = new Date();
	var cdat = new Date(td);
	//cdat.setDate(td.getDate() - (age*365));	//일수 빼기
	cdat.setFullYear(td.getFullYear() - age);	//년수 빼기

	//출력 날짜 설정
	var year = cdat.getFullYear();              //yyyy
    var month = (1 + cdat.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = cdat.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;     //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}