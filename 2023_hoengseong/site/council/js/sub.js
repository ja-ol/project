(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        //여기서부터 코드 작성해주세요

        /* gng 의원홈페이지 */
        $('.site_link_list .site_link_item.member .site_link').on('click', function() {
            var $this = $(this),
                $Parent = $this.parent('.site_link_item'),
                IsActive = $Parent.is('.on'),
                $Layer = $this.siblings('.layer');
            if(!IsActive){
                $Parent.addClass('on');
                $this.attr('title', '의원홈페이지 닫기');
                $Layer.slideDown();
            } else{
                $Parent.removeClass('on');
                $this.attr('title', '의원홈페이지 열기');
                $Layer.slideUp();
            }
        });

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);