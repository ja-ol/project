(function ($) {
    'use strict';

    $(function () {
        //헤더 검색기능
        var $html = tag.$html = $('html'),
            $header = $('#header'),
            $search = $header.find('.search'),
            $searchOpenButton = $search.find('.search_open'),
            $searchCloseButton = $search.find('.search_close');

        $searchOpenButton.on('click.layout', function (event) {
            $search.addClass('active');
            $html.toggleClass('search_show');
        });
        $searchCloseButton.on('click.layout', function (event) {
            $html.removeClass('search_show');
            $search.removeClass('active');
        });

        //푸터 맨위로 버튼 시작
        $('.top_go .up_button').on('click', function () {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 400);
        });
    });
})(jQuery);