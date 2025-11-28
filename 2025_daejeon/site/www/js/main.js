(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $wrapper = $('#wrapper'),
            $container = $('#container');


        //공간시설
        var $facility = $container.find('.facility'),
            $facilityTabItem = $facility.find('.facility_tab .tab_item'),
            $facilityPanel = $facility.find('.facility_panel'),
            $facilityPanelList = $facility.find('.facility_panel .facility_list'),
            $facilityPanelItem = $facility.find('.facility_panel .facility_item'),
            $facilityPanelTitle = $facility.find('.facility_panel h3'),
            $facilityPrev = $facility.find('.facility_button.prev'),
            $facilityNext = $facility.find('.facility_button.next'),
            facilitySlickOpt = {
                infinite: false,
                draggable: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                autoplay: false,
                prevArrow: $facilityPrev,
                nextArrow: $facilityNext,
                responsive: [
                    {
                        breakpoint: 1401,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 1201,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 801,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                ]
            };

        $facilityTabItem.on('click', function() {
            var $this = $(this),
                thisIdx = $this.index(),
                data = $this.data(),
                newPanelTitle = $this.find('button').text(),
                slickOptions = $.extend({}, facilitySlickOpt);

            $facilityTabItem.removeAttr('title');
            $this.attr('title', '선택됨');
            $this.addClass('active').siblings().removeClass('active');
            $facilityPanelTitle.text(newPanelTitle + ' 목록');
            $facilityPanel.attr('data-slick', thisIdx);

            //slick 초기화
            if ($facilityPanelList.hasClass('slick-initialized')) {
                $facilityPanelList.slick('unslick');
            }

            // 기존 아이템 정리 후 다시 넣기
            $facilityPanelList.empty();
            if (data.type === 'all') {
                //전체
                $facilityPanelList.append($facilityPanelItem);
            } else {
                //선택된 타입
                $facilityPanelList.append($facilityPanelItem.filter('[data-type="' + data.type + '"]'));
            }
            $facilityPanelList.slick(slickOptions);

            if (thisIdx === 0) {
                $facility.find('.facility_more').attr('href', '0');
            } else if (thisIdx === 1) {
                $facility.find('.facility_more').attr('href', '1');
            } else if (thisIdx === 2) {
                $facility.find('.facility_more').attr('href', '2');
            } else if (thisIdx === 3) {
                $facility.find('.facility_more').attr('href', '3');
            } else if (thisIdx === 4) {
                $facility.find('.facility_more').attr('href', '4');
            } else if (thisIdx === 5) {
                $facility.find('.facility_more').attr('href', '5');
            } else if (thisIdx === 6) {
                $facility.find('.facility_more').attr('href', '6');
            }

        }).filter('.active').triggerHandler('click');


        //예약 및 접수 현황
        var $reservation = $container.find('.reservation'),
            $reservationTabItem = $reservation.find('.reservation_tab .tab_item'),
            $reservationPanel = $reservation.find('.reservation_panel'),
            $reservationPanelList = $reservation.find('.reservation_panel .reservation_list'),
            $reservationPanelItem = $reservation.find('.reservation_panel .reservation_item'),
            $reservationPanelTitle = $reservation.find('.reservation_panel h3'),
            $reservationPrev = $reservation.find('.reservation_button.prev'),
            $reservationNext = $reservation.find('.reservation_button.next'),
            reservationSlickOpt = {
                infinite: false,
                draggable: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                autoplay: false,
                prevArrow: $reservationPrev,
                nextArrow: $reservationNext,
                responsive: [
                    {
                        breakpoint: 1401,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 641,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            };

        $reservationTabItem.on('click', function() {
            var $this = $(this),
                thisIdx = $this.index(),
                data = $this.data(),
                newPanelTitle = $this.find('button').text(),
                slickOptions = $.extend({}, reservationSlickOpt);

            $reservationTabItem.removeAttr('title');
            $this.attr('title', '선택됨');
            $this.addClass('active').siblings().removeClass('active');
            $reservationPanelTitle.text(newPanelTitle + ' 목록');
            $reservationPanel.attr('data-slick',thisIdx);
            $reservationPanelList.slick('unslick');
            $reservationPanelItem.detach();
            $reservationPanelList.empty().append($reservationPanelItem.filter('[data-type="' + data.type + '"]'));
            $reservationPanelList.slick(slickOptions);

            if(thisIdx === 0){
                $reservation.find('.reservation_more').attr('href','0');
            }else if(thisIdx === 1){
                $reservation.find('.reservation_more').attr('href','1');
            }else if(thisIdx === 2){
                $reservation.find('.reservation_more').attr('href','2');
            };

        }).filter('.active').triggerHandler('click');


        //팝업존
        var $popupzone = $container.find('.popupzone'),
            $popupzoneList = $popupzone.find('.popupzone_list'),
            $popupzoneCurrent = $popupzone.find('.popupzone_current'),
            $popupzoneTotal =  $popupzone.find('.popupzone_total'),
            $popupzoneAuto =  $popupzone.find('.popupzone_button.auto'),
            $popupzonePrev =  $popupzone.find('.popupzone_button.prev'),
            $popupzoneNext =  $popupzone.find('.popupzone_button.next');

        $popupzoneList.slick({
            slidesToShow: 1,
            autoplay: true,
            infinite: true,
            current : $popupzoneCurrent,
            total : $popupzoneTotal,
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
            }
        });

    });
})(window.jQuery);
