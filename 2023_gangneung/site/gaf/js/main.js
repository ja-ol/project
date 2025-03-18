(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');

        $window.on('load',function (){
            $visual.addClass('on');
        });


        /* 비주얼 */
        var $visual = $('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualDots = $visual.find('.visual_dots');

        $visualList.slick({
            autoplay : true,
            fade : true,
            speed : 1500,
            autoplaySpeed : 4500,
            swipe : true,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite : true,
            pauseOnHover: true,
            prevArrow : false,
            nextArrow : false,
            dots: true,
            appendDots : $visualDots,
            customPaging: function (slider, i) {
                var title = $(slider.$slides[i]).data('title');
                return '<button type="button" class="dots_title">' + title + ' </button>';
            },
        });


        /* 일정안내 */
        var $schedule = $container.find('.schedule'),
            $scheduleButton = $schedule.find('.calendar_table td .day');

        $scheduleButton.on('click', function () {
            var $this = $(this);
            $this.parent().addClass('active').attr('title','선택됨');
            $this.parent().siblings().removeClass('active').removeAttr('title');
            $this.parent().parents().siblings().children().removeClass('active').removeAttr('title');
        });


        /* 팝업존 */
        var $popupzone = $container.find('.popupzone'),
            $popupzoneCurrent = $popupzone.find('.popupzone_current'),
            $popupzoneTotal = $popupzone.find('.popupzone_total'),
            $popupzoneAuto = $popupzone.find('.popupzone_auto'),
            $popupzonePrev = $popupzone.find('.popupzone_prev'),
            $popupzoneNext = $popupzone.find('.popupzone_next'),
            $popupzoneSlickOpt = {
                slidesToShow: 1,
                autoplay: true,
                current: $popupzoneCurrent,
                total: $popupzoneTotal,
                playText: '재생',
                pauseText: '정지',
                autoArrow: $popupzoneAuto,
                prevArrow: $popupzonePrev,
                nextArrow: $popupzoneNext,
                customState : function(state) {
                    if (state.current < 10) {
                        state.current = '0' + state.current;
                    }
                    if (state.total < 10) {
                        state.total = '0' + state.total;
                    }
                    return state;
                },
            }
        $('.popupzone .popupzone_list').slick($popupzoneSlickOpt);


    });
})(window.jQuery);
