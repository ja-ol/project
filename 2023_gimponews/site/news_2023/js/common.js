(function($) {
	'use strict';

	$(function() {

        var $window = $(window),
            $html = $('html'),
            $header = $('#header'),
            $footer = $('#footer');


        /* 헤더 */
        $window.on('load scroll', function(){
            if($(this).scrollTop() > 0){
                $html.addClass('fixed');
            } else {
                $html.removeClass('fixed');
            }
        });

        /* 패밀리사이트 */
        var $family = $header.find('.family'),
            $familyOpen = $header.find('.family_open'),
            $familyHide = $header.find('.family_hide');

        $familyOpen.on('click', function(event) {
            $family.addClass('active').attr('tabindex', '0').focus();
            $html.addClass('family_open').removeClass('lnb_show lnb_open');
        });
        $familyHide.on('click', function(event) {
            $family.removeClass('active');
            $html.removeClass('family_open');
            $familyOpen.focus();
        });

        /* 패밀리 사이트 슬릭 */
        var $familyContent = $header.find('.family_content'),
            $familyList = $familyContent.find('.family_list'),

        familySlickOption = {
            autoplay : false,
            slidesToShow : 3,
            slidesToScroll: 3,
            draggable : true,
            infinite : false,
            dots : true,
            arrow: true,
            rows: 1,
            arrows: true,
            prevArrow : $familyContent.find('.family_prev'),
            nextArrow : $familyContent.find('.family_next'),
            appendDots: $familyContent.find('.family_dots'),
            responsive: [
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow : 1,
                        slidesToScroll : 1,
                        rows: 2,
                    }
                },
            ],
        };

        function familySlickResize(){
            if( $(window).width() > 1000){
                $familyList.slick('unslick');
            } else {
                $familyList.not('.slick-initialized').slick(familySlickOption);
            }
        }
        familySlickResize();

        $(window).on('resize',function (){
            familySlickResize();
        })


        /* 푸터 */
        var $footerSiteButton = $footer.find('.site_button');

        $footerSiteButton.on('click.layout', function(event){
            var $this = $(this),
                $parent = $this.parents('site_item');

            if($this.hasClass('active')){
                $parent.children('.site_button').removeClass('active');
                $this.removeClass('active');
            } else {
                $footerSiteButton.removeClass('active');
                $this.addClass('active');
            }
        });


        /* 탑버튼 */
        var $bodyHtml = $('body,html'),
            $TopButton = $footer.find('.top_button');

        $TopButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });


        /* 모바일 메인에서 lnb 오픈시 active */
        setFirstMenu();
        $(window).on('resize', function(){
            setFirstMenu();
        });
        function setFirstMenu(){
            if($(window).width() < 1001) {
                $('.lnb .depth_list.clearfix > .depth_item:first-child').addClass('active')
            }
        }


    });
})(window.jQuery);
