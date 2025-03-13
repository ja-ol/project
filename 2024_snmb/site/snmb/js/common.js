(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $footer = $('#footer');

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


        /* 푸터 */
        var $site = $footer.find('.site'),
            $siteShow = $site.find('.site_show');

        $siteShow.on('click', function () {
            var $this = $(this);

            $this.toggleClass('on');
            $site.find('.site_panel').slideToggle(300);
        });

        var $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            $upBtn = $footer.find('.up_btn');

        if ($upBtn.length){
            $upBtn.on('click', function(e) {
                $htmlBody.animate({
                    scrollTop : $wrapper.offset().top
                },250);
                e.preventDefault();
            });
        }


        /* 모바일 lnb 오픈시 active */
        setFirstMenu();
        $(window).on('resize', function(){
            setFirstMenu();
        });
        function setFirstMenu(){
            if($(window).width() < 1001) {
                $('#header .menu_show .menu_btn').on('click',function (){
                    $('.lnb .depth_list > .depth1_item:first-child').addClass('active')
                })
            }else {
                $('.lnb .depth_list > .depth1_item:first-child').removeClass('active')
            }
        }

    });
})(window.jQuery);
