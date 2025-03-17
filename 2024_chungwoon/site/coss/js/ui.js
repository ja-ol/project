$(document).ready(function() {
	
	$(".mList3 .dep1").on("click", function(){
		if ( $(this).parent().hasClass("open") )
		{
			$(this).parent().removeClass("open");
		}
		else
		{
			$(this).parent().addClass("open");
		}
	});
	
	$(".mView1 .detail .rolling .thumb a").on("click", function(){
		$(this).parent().children().removeClass("selected");
		$(this).addClass("selected");
	});


	$(".iTop").on("click", function(){
		$('html, body').animate({scrollTop : 0}, 400);
	});

	$(window).on("scroll load",function () {
		var iCurScrollPos = $(this).scrollTop();
		if ( iCurScrollPos > 120 ) {
			$("#wrap").addClass("fixed");
		} else  {
			$("#wrap").removeClass("fixed");
		}
	});

});

