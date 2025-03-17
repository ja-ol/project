(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $footer = $('#footer');


        var $lnbDepthItem = $('#header .lnb').find('.depth_item');

        $lnbDepthItem.on('mouseover focusin', function(event) {
            if ($(this).hasClass('has')){
                $html.addClass('length');
            }
            else {
                $html.removeClass('length');
            }
        })
        $lnbDepthItem.on('mouseleave focusout', function(event) {
            $html.removeClass('length');
        })


        /* 토글 */
        var $toggle = $('.toggle'),
            $toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

        $toggleSelector.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.toggle'),
                parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g,'').split(/\s+/).slice(-2)[0].replace(/_item/,'');

            if($this.is('[class*="_show"]')){
                if ($parent.siblings().hasClass('active')){
                    $parent.siblings().removeClass('active');
                    $html.removeClass(parentClass + '_open');
                }
                $html.toggleClass(parentClass + '_open');
                $parent.toggleClass('active');
            }

            if($this.is('[class*="_hide"]')){
                $html.removeClass(parentClass + '_open');
                $this.closest('.active').removeClass('active');
            }
        });


        /* up */
        var $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            $upButton = $footer.find('.up_button'),
            windowTop = 0,
            windowArea = 0;

        if($upButton.length){
            $upButton.on('click', function(e) {
                $htmlBody.animate({
                    scrollTop : $wrapper.offset().top
                },250);
                e.preventDefault();
            });
        }

        $window.scroll(function(){
            if($window.scrollTop() > 50){
                $upButton.addClass('active');
            }else{
                $upButton.removeClass('active');
            }

            var footerTop = $('#footer').offset().top;
            windowTop = $window.scrollTop();
            windowArea = windowTop + $window.height() - $upButton.height();
            if(footerTop <= windowArea){
                $upButton.removeClass('active');
            }
        });


    });
})(window.jQuery);
