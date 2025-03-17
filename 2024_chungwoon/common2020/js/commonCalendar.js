/*
 * 학과 메인 일정달력 공통
 * */

$(document).ready(function () {
	    var today = null;
	    var year = null;
	    var month = null;
	    var firstDay = null;
	    var lastDay = null;
	 
	    $(document).ready(function() {
	        drawCalendar();
	        initDate();
	        drawDays();
	    });
	    
	    //calendar 그리기
	    function drawCalendar(){
	        var setTableHTML = "";
	        for(var i=0;i<6;i++){
	            setTableHTML+='<tr>';
	            for(var j=0;j<7;j++){
	                setTableHTML+='<td>';
	                setTableHTML+='</td>';
	            }
	            setTableHTML+='</tr>';
	        }
	        $("#cal").html(setTableHTML);
	    }
	 
	    //날짜 초기화
	    function initDate(){
	    	$tdDay = $("td")
	        dayCount = 0;
	        today = new Date();
	        year = today.getFullYear();
	        month = today.getMonth()+1;
	        firstDay = new Date(year,month-1,1);
	        lastDay = new Date(year,month,0);
	    }
	    
	    //calendar 날짜표시
	    function drawDays(){
	        for(var i=firstDay.getDay();i<firstDay.getDay()+lastDay.getDate();i++){
	            $tdDay.eq(i).html(++dayCount);
	        }
	    }
    })