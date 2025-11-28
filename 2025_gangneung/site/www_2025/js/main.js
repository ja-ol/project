(function ($) {
    'use strict';

    $(function () {

        var $window = $(window),
            $html = $('html'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        // 즐겨찾기 더보기
        var $favorite = $('.favorite'),
            $favoriteLayer = $('.favorite_layer'),
            $favoriteMoreButton = $favorite.find('.favorite_button.more'),
            $favoriteMorePopup = $favoriteLayer.find('.favorite_popup.more'),
            $favoriteMoreClose = $favoriteMorePopup.find('.favorite_close'),
            $favoriteSettingButton = $favorite.find('.favorite_button.setting'),
            $favoriteSettingPopup = $favoriteLayer.find('.favorite_popup.setting'),
            $favoriteSettingClose = $favoriteSettingPopup.find('.favorite_close');

        // 더보기 팝업 열기
        $favoriteMoreButton.on('click', function () {
            $('html').addClass('favorite_more_open');
            $favoriteMorePopup.attr('tabindex', '-1').focus();
            trapFocus($favoriteMorePopup);
        });

        // 더보기 팝업 닫기
        $favoriteMoreClose.on('click', function () {
            $('html').removeClass('favorite_more_open');
            $favoriteMoreButton.focus();
            releaseFocusTrap();
        });

        // 설정 팝업 열기
        $favoriteSettingButton.on('click', function () {
            $('html').addClass('favorite_setting_open');
            $favoriteSettingPopup.attr('tabindex', '-1').focus();
            trapFocus($favoriteSettingPopup);
        });

        // 설정 팝업 닫기
        $favoriteSettingClose.on('click', function () {
            $('html').removeClass('favorite_setting_open');
            $favoriteSettingButton.focus();
            releaseFocusTrap();
        });

        // 포커스 트랩 함수
        function trapFocus($popup) {
            setTimeout(function () {
                var focusableElements = $popup.find('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                var firstElement = focusableElements.first();
                var lastElement = focusableElements.last();

                function handleKeydown(e) {
                    if (e.key === 'Tab') {
                        if (e.shiftKey) {
                            if ($(document.activeElement).is(firstElement)) {
                                e.preventDefault();
                                lastElement.focus();
                            }
                        } else {
                            if ($(document.activeElement).is(lastElement)) {
                                e.preventDefault();
                                firstElement.focus();
                            }
                        }
                    }
                }

                $popup.data('trapHandler', handleKeydown);
                $popup.on('keydown', handleKeydown);

                // 포커스를 첫 요소로 이동
                setTimeout(function () {
                    if (firstElement.length) {
                        firstElement.focus();
                    } else {
                        $popup.attr('tabindex', '-1').focus();
                    }
                }, 10);
            }, 50); // 팝업 표시 후 약간의 딜레이 확보
        }
        function releaseFocusTrap() {
            $('.favorite_popup').off('keydown._trap');
        }


        /* visual */
        var $visual = $container.find('.visual'),
            $visualList = $visual.find('.visual_list'),
            visualListHtml = $visualList.html(),
            $visualItem = $visualList.find('.visual_item'),
            ItemLength = $visualItem.length,
            $visualCurrent = $visual.find('.visual_current'),
            $visualTotal =  $visual.find('.visual_total'),
            $visualAuto = $visual.find('.visual_button.auto'),
            $visualPrev = $visual.find('.visual_button.prev'),
            $visualNext = $visual.find('.visual_button.next'),
            $focuspoint;

        $visualList.slick({
            infinite : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            autoplay : true,
            draggable : true,
            current : $visualCurrent,
            total : $visualTotal,
            autoArrow : $visualAuto,
            prevArrow : $visualPrev,
            nextArrow : $visualNext,
            playText : '재생',
            pauseText : '정지',
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

        /* 모아보기 */
        var $visualAll = $wrapper.find('.visual_all'),
            $visualAllCount = $visualAll.find('.visual_all_title em'),
            $visualAllList = $visualAll.find('.visual_all_list'),
            $visualAllPrev = $visualAll.find('.visual_all_button.prev'),
            $visualAllNext = $visualAll.find('.visual_all_button.next'),
            $visualAllCurrent = $visualAll.find('.visual_current'),
            $visualAllTotal =  $visualAll.find('.visual_total');

        $visualAllList.append(visualListHtml);
        $visualAllCount.text(ItemLength);
        $visualAllList.slick({
            autoplay : false,
            infinite : true,
            dots : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            rows : 2,
            slidesPerRow : 2,
            prevArrow : $visualAllPrev,
            nextArrow : $visualAllNext,
            current : $visualAllCurrent,
            total : $visualAllTotal,
            customState : function(state) {
                if (state.current < 10) {
                    state.current = '0' + state.current;
                }
                if (state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            responsive : [
                {
                    breakpoint: 641,
                    settings: {
                        rows: 2,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        slidesPerRow : 1,
                    }
                }
            ]
        });

        var savedScrollTop = 0;

        $('.visual .visual_more').on('click',function(){

            savedScrollTop = $(window).scrollTop();
            $focuspoint = $(this);

            $('html').addClass('visual_open');
            $('html, body').scrollTop(0);

            setTimeout(function () {
                $('.visual_all').focus();

                setTimeout(function () {
                    $('.visual_all_list .slick-slide:first-child div a').focus();
                }, 10);

            }, 10);

            $focuspoint = $('.visual .visual_more');
        });

        $('.visual_all .visual_close').on('click',function(){
            $('html').removeClass('visual_open');
            $('html, body').scrollTop(savedScrollTop);

            if ($focuspoint && $focuspoint.length) {
                $focuspoint.focus();
            }
        });


        /* board */
        var $board = $container.find('.board'),
            $boardTabButton = $board.find('button.tab_button'),
            $boardContent = $board.find('.board_content'),
            $boardTabPanel = $board.find('.board_panel');

        function getSlickOpt($panel) {
            return {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                draggable: true,
                arrows: true,
                prevArrow: $panel.find('.board_button.prev'),
                nextArrow: $panel.find('.board_button.next'),
                responsive: [
                    {
                        breakpoint: 1301,
                        settings: {
                            slidesToShow: 2,
                        }
                    }
                ]
            };
        }

        // 초기 슬릭 적용 함수
        function initBoardSlick() {
            $boardTabPanel.each(function () {
                var $panel = $(this);
                var $list = $panel.find('.board_list');

                if ($(window).width() <= 800) {
                    if ($list.hasClass('slick-initialized')) {
                        $list.slick('unslick');
                    }
                } else {
                    if (!$list.hasClass('slick-initialized')) {
                        $list.slick(getSlickOpt($panel));
                    }
                }
            });
        }
        initBoardSlick();

        $(window).on('load resize', function () {
            initBoardSlick();
        });

        $boardTabButton.on('click', function () {
            var $this = $(this),
                $parent = $this.closest('.tab_item'),
                parentIndex = $parent.index(),
                thisText = $this.text(),
                $activePanel = $boardTabPanel.eq(parentIndex),
                $list = $activePanel.find('.board_list');

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().find('button.tab_button').removeAttr('title');

            $boardContent.find('.skip').text(thisText + ' 목록');
            $boardTabPanel.removeClass('active').removeAttr('title');
            $activePanel.addClass('active').attr('title', '선택됨');

            // 슬릭 재초기화 (현재 탭만)
            if ($list.hasClass('slick-initialized')) {
                $list.slick('unslick');
            }

            if ($(window).width() > 800) {
                $list.slick(getSlickOpt($activePanel)).slick('setPosition');
            }
        });

        $('.board .board_tab .tab_list').on('scroll', function () {
            var $this = $(this),
                scrollLeft = $this.scrollLeft(),
                scrollWidth = $this[0].scrollWidth,
                outerWidth = $this.outerWidth();

            if (scrollLeft + outerWidth >= scrollWidth - 1) {
                $this.closest('.board_tab').addClass('end');
            } else {
                $this.closest('.board_tab').removeClass('end');
            }
        });


        /* magazine */
        var $magazine = $container.find('.magazine'),
            $magazineTabButton = $magazine.find('.tab_button'),
            $magazineTabPanel = $magazine.find('.magazine_panel');

        $magazineTabButton.on('click', function () {
            var $this = $(this),
                thisText = $(this).text(),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $('.magazine_content').find('.skip').text(thisText + ' 목록')
            $parent.siblings().children('.tab_button').removeAttr('title');
            $magazineTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
        });


        /* service */
        var $service = $container.find('.service'),
            $serviceItem = $service.find('.service_item'),
            $serviceItem1 = $service.find('.service_item.n1'),
            $serviceItem2 = $service.find('.service_item.n2'),
            $serviceItem3 = $service.find('.service_item.n3'),
            $serviceButton = $serviceItem.find('.service_button');

        /* service - 민원/행정 */
        var $serviceSlick1 = $serviceItem1.find('.service_slick'),
            $servicePrev = $serviceItem1.find('.service_prev'),
            $serviceNext = $serviceItem1.find('.service_next');

        $serviceSlick1.slick({
            autoplay : false,
            infinite : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            arrows : true,
            prevArrow: $servicePrev,
            nextArrow: $serviceNext,
            dots : true,
            appendDots : $serviceItem1.find('.service_dots'),
            customPaging : function(slider, i) {
                return '<button type="button"><span>'+(i + 1)+'번째 보기</span></button>';
            }
        });

        /* service - 민원/행정 */
        var $serviceSlick2 = $serviceItem2.find('.service_slick'),
            $servicePrev = $serviceItem2.find('.service_prev'),
            $serviceNext = $serviceItem2.find('.service_next');

        $serviceSlick2.slick({
            autoplay : false,
            infinite : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            arrows : true,
            prevArrow: $servicePrev,
            nextArrow: $serviceNext,
            dots : true,
            appendDots : $serviceItem2.find('.service_dots'),
            customPaging : function(slider, i) {
                return '<button type="button"><span>'+(i + 1)+'번째 보기</span></button>';
            }
        });

        /* service - 분야별정보 */
        var $serviceSlick3 = $serviceItem3.find('.service_slick'),
            $servicePrev = $serviceItem3.find('.service_prev'),
            $serviceNext = $serviceItem3.find('.service_next');

        $serviceSlick3.slick({
            autoplay : false,
            infinite : false,
            slidesToShow : 5,
            slidesToScroll : 5,
            arrows : true,
            prevArrow: $servicePrev,
            nextArrow: $serviceNext,
            dots : true,
            appendDots : $serviceItem3.find('.service_dots'),
            customPaging : function(slider, i) {
                return '<button type="button"><span>'+(i + 1)+'번째 보기</span></button>';
            },
            responsive: [
                {
                    breakpoint: 1301,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll : 3,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll : 5,
                    }
                },
                {
                    breakpoint: 801,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll : 4,
                    }
                },
                {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll : 5,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll : 4,
                    }
                },
            ]
        });

        $serviceButton.on('click', function () {
            var $this = $(this),
                $parent = $this.closest('.service_item');

            $parent.addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');

            if ($parent.hasClass('n1')) {
                $serviceSlick1.slick('slickGoTo', 0, true);
                setTimeout(function () {
                    $serviceSlick1.slick('setPosition');
                }, 10);
            }
            if ($parent.hasClass('n2')) {
                $serviceSlick2.slick('slickGoTo', 0, true);
                setTimeout(function () {
                    $serviceSlick2.slick('setPosition');
                }, 10);
            }
            if ($parent.hasClass('n3')) {
                $serviceSlick3.slick('slickGoTo', 0, true);
                setTimeout(function () {
                    $serviceSlick3.slick('setPosition');
                }, 10);
            }
        });


        /* sns */
        var $sns = $container.find('.sns'),
            $snsTabButton = $sns.find('button.tab_button'),
            $snsTabPanel = $sns.find('.sns_panel'),
            $snsPrev = $sns.find('.sns_button.prev'),
            $snsNext = $sns.find('.sns_button.next'),
            $snsSlickOpt = {
                slidesToShow : 2,
                slidesToScroll : 1,
                infinite : false,
                autoplay : false,
                draggable : true,
                arrows : true,
                prevArrow : $snsPrev,
                nextArrow : $snsNext,
                responsive: [
                    {
                        breakpoint: 1301,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow: 3,
                            variableWidth : true,
                            infinite : true,
                        }
                    },
                ]
            }
        $('.sns .sns_panel.active .sns_list').slick($snsSlickOpt).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            if (currentSlide !== nextSlide) {
                $('.slick-active + .slick-cloned').each(function (index, node) {
                    var $node = $(node);
                    setTimeout(function () {
                        $node.addClass('slick-current');
                        $node.addClass('slick-active');
                    });
                });
            }
        });

        $snsTabButton.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.tab_item'),
                parentIndex = $parent.index();

            $parent.addClass('active').siblings().removeClass('active');
            $this.attr('title', '선택됨');
            $parent.siblings().children('button.tab_button').removeAttr('title');
            $snsTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');

            $snsTabPanel.each(function () {
                $snsTabPanel.eq(parentIndex).find('.sns_list').slick($snsSlickOpt).slick('setPosition');
            })
        });


        /* popupzone */
        var $popupzone = $container.find('.popupzone'),
            $popupzoneList = $popupzone.find('.popupzone_list'),
            popupzoneListHtml = $popupzoneList.html(),
            $popupzoneItem = $popupzoneList.find('.popupzone_item'),
            ItemLength = $popupzoneItem.length,
            $popupzoneCurrent = $popupzone.find('.popupzone_current'),
            $popupzoneTotal =  $popupzone.find('.popupzone_total'),
            $popupzoneAuto =  $popupzone.find('.popupzone_button.auto'),
            $popupzonePrev =  $popupzone.find('.popupzone_button.prev'),
            $popupzoneNext =  $popupzone.find('.popupzone_button.next'),
            $focuspoint;

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

        /* 모아보기 */
        var $popupzoneAll = $wrapper.find('.popupzone_all'),
            $popupzoneAllCount = $popupzoneAll.find('.popupzone_all_title em'),
            $popupzoneAllList = $popupzoneAll.find('.popupzone_all_list'),
            $popupzoneAllPrev = $popupzoneAll.find('.popupzone_all_button.prev'),
            $popupzoneAllNext = $popupzoneAll.find('.popupzone_all_button.next'),
            $popupzoneAllCurrent = $popupzoneAll.find('.popupzone_current'),
            $popupzoneAllTotal =  $popupzoneAll.find('.popupzone_total');

        $popupzoneAllList.append(popupzoneListHtml);
        $popupzoneAllCount.text(ItemLength);
        $popupzoneAllList.slick({
            autoplay : false,
            infinite : true,
            dots : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            rows : 2,
            slidesPerRow : 3,
            prevArrow : $popupzoneAllPrev,
            nextArrow : $popupzoneAllNext,
            current : $popupzoneAllCurrent,
            total : $popupzoneAllTotal,
            customState : function(state) {
                if (state.current < 10) {
                    state.current = '0' + state.current;
                }
                if (state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            responsive : [
                {
                    breakpoint: 641,
                    settings: {
                        slidesPerRow : 2,
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        rows: 2,
                        slidesPerRow : 1,
                    }
                }
            ]
        });

        var savedScrollTop = 0;

        $('.popupzone .popupzone_more').on('click',function(){

            savedScrollTop = $(window).scrollTop(); // 현재 스크롤 위치 저장
            $focuspoint = $(this); // 클릭한 버튼 저장

            $('html').addClass('popupzone_open');
            $('html, body').scrollTop(0);

            setTimeout(function () {
                $('.popupzone_all').focus();

                setTimeout(function () {
                    $('.popupzone_all_list .slick-slide:first-child div a').focus();
                }, 10);

            }, 10);

            $focuspoint = $('.popupzone .popupzone_more');
        });

        $('.popupzone_all .popupzone_close').on('click',function(){
            $('html').removeClass('popupzone_open');
            $('html, body').scrollTop(savedScrollTop);

            if ($focuspoint && $focuspoint.length) {
                $focuspoint.focus();
            }
        });


    });
})(window.jQuery);


document.addEventListener('DOMContentLoaded', function() {
    const favoriteList = document.querySelector('.favorite .favorite_wrap .favorite_list');
    const settingButton = document.querySelector('.favorite .favorite_button.setting');
    const closeSettingButton = document.querySelector('.favorite_popup.setting .favorite_close');
    const saveButton = document.querySelector('.favorite_button.save');
    const resetButton = document.querySelector('.favorite_button.reset');
    const favoriteSettingPopup = document.querySelector('.favorite_popup.setting');

    if (!localStorage.getItem('favoriteItems')) {
        const initialFavorites = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8'];
        localStorage.setItem('favoriteItems', JSON.stringify(initialFavorites));
    }

    settingButton.addEventListener('click', function() {
        favoriteSettingPopup.style.display = 'block';
        loadCheckedItems();
    });

    closeSettingButton.addEventListener('click', function() {
        favoriteSettingPopup.style.display = 'none';
    });

    saveButton.addEventListener('click', function() {
        const selectedItems = [];
        document.querySelectorAll('.favorite_menu input[type="checkbox"]:checked').forEach(function(checkbox) {
            const itemId = checkbox.getAttribute('data-id');
            selectedItems.push(itemId);
        });

        if (selectedItems.length > 8) {
            alert('즐겨찾기는 최대 8개까지 선택할 수 있습니다.');
            return;
        }

        localStorage.setItem('favoriteItems', JSON.stringify(selectedItems));
        favoriteSettingPopup.style.display = 'none';

        loadPage();
    });

    resetButton.addEventListener('click', function() {
        document.querySelectorAll('.favorite_menu input[type="checkbox"]').forEach(function(checkbox) {
            checkbox.checked = false;
        });
    });

    function loadCheckedItems() {
        const favorites = JSON.parse(localStorage.getItem('favoriteItems')) || [];
        document.querySelectorAll('.favorite_menu input[type="checkbox"]').forEach(function(checkbox) {
            checkbox.checked = favorites.includes(checkbox.getAttribute('data-id'));
        });
    }

    function loadPage() {
        const favorites = JSON.parse(localStorage.getItem('favoriteItems')) || [];
        favoriteList.innerHTML = '';

        favorites.slice(0, 8).forEach(function(itemId) {
            const matchingLabel = document.querySelector(`.favorite_popup.setting label[for="${itemId}"]`);
            if (matchingLabel) {
                const labelText = matchingLabel.querySelector('.favorite_label')?.textContent;
                const icon = matchingLabel.querySelector('i');
                const iconClass = icon?.className || '';
                const numberClass = Array.from(icon.classList).find(cls => /^n\d+$/.test(cls)) || '';
                const listItem = document.createElement('li');
                listItem.className = `favorite_item ${numberClass}`;
                listItem.innerHTML = `
                    <a href="#" class="favorite_anchor" data-id="${itemId}">
                        <i class="${iconClass}"></i>
                        <span>${labelText}</span>
                    </a>
                `;
                favoriteList.appendChild(listItem);
            }
        });
    }

    loadPage();
});