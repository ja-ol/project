(function($) {
    'use strict';

    var $html = $('html');

    $(function() {
        var $window = $(window),
            $html = $('html'),
            $container = $('#container'),
            $footer = $('#footer');


        /* 팝업존 */
        var $popupzone = $container.find('.popupzone'),
            $popupzoneItem = $popupzone.find('.popupzone_item'),
            $popupzoneControl = $popupzone.find('.popupzone_control'),
            $popupzoneCurrent = $popupzone.find('.popupzone_current'),
            $popupzoneTotal =  $popupzone.find('.popupzone_total'),
            $popupzoneAuto =  $popupzone.find('.popupzone_auto'),
            $popupzonePrev =  $popupzone.find('.popupzone_prev'),
            $popupzoneNext =  $popupzone.find('.popupzone_next'),
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
                customState: function(state) {
                    var current = state.current,
                        total = state.total;
                    if(current < 10) {
                        state.current = '0' + current;
                    }
                    if(total < 10) {
                        state.total = '0' + total;
                    }
                    return state;
                }
            }
        $('.popupzone .popupzone_list').slick($popupzoneSlickOpt);


        /* 교육강좌 안내 */
        var $education = $container.find('.education'),
            $educationdList = $education.find('.education_list'),
            $progressBar = $education.find('.progress'),
            $progressBarLabel = $education.find('.progress_label'),
            $educationSlickOpt = {
                draggable: false,
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: $education.find('.education_prev'),
                nextArrow: $education.find('.education_next'),
                responsive: [
                    {
                        breakpoint: 1481,
                        settings: {
                            slidesToShow  : 3,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow  : 2,
                            variableWidth: true,
                        }
                    },
                    {
                        breakpoint: 551,
                        settings: {
                            slidesToShow  : 1,
                            variableWidth: true,
                        }
                    }
                ]
            }
        $('.education .education_list').slick($educationSlickOpt);

        $educationdList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            if ($(window).width() > 1480){
                var calc = ( (nextSlide) / (slick.slideCount - 4) ) * 100;
                $progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc );
                $progressBarLabel.text( calc + '%' );
            }
            if  ($(window).width() < 1481){
                var calc = ( (nextSlide) / (slick.slideCount - 3) ) * 100;
                $progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc );
                $progressBarLabel.text( calc + '%' );
            }
            if  ($(window).width() < 1001){
                var calc = ( (nextSlide) / (slick.slideCount - 2) ) * 100;
                $progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc );
                $progressBarLabel.text( calc + '%' );
            }
            if  ($(window).width() < 551){
                var calc = ( (nextSlide) / (slick.slideCount - 1) ) * 100;
                $progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc );
                $progressBarLabel.text( calc + '%' );
            }
        });


        /* 찾아오시는 길 지도 마커 변경 */
        $(window).load(function(){

            var $mapMain = $('.direction_map .root_daum.rounghmap'),
                $marker = $('.direction_map .roughmap_maker_label');

            $marker.parent('div').prev('div').find('img').attr('src', './images/main/direction_map_marker.png');
            $marker.parent('div').prev('div').find('img').css({'width':'75', 'height':'74', 'top':'-31px','left':'-13px','clip':'unset'});
            $marker.parent('div').prev('div').parent('div').css({'z-index':'2'})

        });


    });

})(jQuery);
