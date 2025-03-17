(function($) {
    'use strict';

    $(function() {
        var $container = element.$container = $('#container');

        //학사일정 레이어팝업
        var $calender =  $container.find('.calendar'),
            $calenderOpen = $calender.find('.calendar_text'),
            $calenderPopup = $calender.find('.calendar_popup'),
            $calenderClose = $calenderPopup.find('.popup_close');

        $calenderOpen.on('click', function(){
            $container.css('z-index', '30');
            $calenderPopup.show();
        })
        $calenderClose.on('click', function(){
            $container.css('z-index', '10');
            $calenderPopup.hide();
        })
    });
})(window.jQuery);