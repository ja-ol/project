// ES5
// 주요소식 탭-슬라이더
function boardTab(){
    function activateTab(tabId) {
        // 초기화
        $(".board-tab-wrap .tit_list > li").removeClass("active").children().attr("title","");
        $(".board-tab-wrap .tab_list").css({"display": "none"});
        // 실행
        $('.board-tab-wrap .tit_list > li a[href*="' + tabId + '"]').parent().addClass("active").children().attr("title","선택됨");
        $(tabId).css({"display": "block"});
    }

    $(".board-tab-wrap .tit_list > li a").on("click", function(e) {
        e.preventDefault();
        var tabId = $(this).attr("href");
        activateTab(tabId, true);
        // // 탭이 활성화된 후 슬라이더 위치 재설정
        if ($(tabId).find('.borad-slide').length) {
            $(tabId).find('.borad-slide').slick('setPosition');
        }
    });
    
    // 페이지 로드 했을 때 탭메뉴 선택
    var firstTabId = $('.board-tab-wrap .tit_list > li:first-child a').attr('href');
    activateTab(firstTabId);
}

var helpers = {
    addZeros: function (n) {
        return (n < 10) ? '0' + n : n;
    }
};

function boardSlider() {
    $('.borad-slide').each(function () {
        var $slider = $(this);
        var $parent = $slider.closest('.tab_list'); // 부모 요소를 기준으로 찾기

        $slider.slick({
            // slide: 'a',
            draggable: true,
            infinite: true,
            arrows: true,
            dots: false,
            appendArrows: $parent.find('.arrows'),
            prevArrow: $parent.find('.prevArrow'),
            nextArrow: $parent.find('.nextArrow'),
            autoplay: true,
            autoplaySpeed: 4000,
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var $progressBar = $parent.find('.page_num_bar .progress');
            var $progressBarLabel = $parent.find('.slider__label');

            // progressBar
            var calc = ((nextSlide) / (slick.slideCount - 1)) * 100;
            $progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc);
            $progressBarLabel.text(calc + '% completed');
        }).on('afterChange', function (event, slick, currentSlide) {
            var $current = $parent.find('.currentPage');
            var i = (currentSlide ? currentSlide : 0) + 1;
            $current.text(helpers.addZeros(i));
        });

        // slide Page Count
        var sliderItemsNum = $slider.find('.slick-slide').not('.slick-cloned').length;
        var $totalPage = $parent.find('.totalPage');
        $totalPage.text(helpers.addZeros(sliderItemsNum));

        $parent.find('.boardStop').click(function () {
            if (!$(this).hasClass('pause')) {
                $(this).addClass('pause').attr("title",'재생').css("background-image","url(/site/portal2022/images/main/board_play.png)").children().text("재생");
                $slider.slick('slickPause');
            } else {
                $(this).removeClass('pause').attr("title",'정지').css("background-image","url(/site/portal2022/images/main/board_stop.png)").children().text("정지");
                $slider.slick('slickPlay');
            }
        });
    });
}

// New김포소식
/* 김포소식 - 탭메뉴 */
function newBoardTab(){
    var $board = $('.new-board'),
    $boardTabButton = $board.find('.tab_button'),
    $boardTabPanel = $board.find('.new_board_list');

    $boardTabButton.on('click', function () {
        var $this = $(this),
            $parent = $this.parents('.tab_item'),
            parentIndex = $parent.index();

        $parent.addClass('active').siblings().removeClass('active');
        $this.attr('title', '선택됨');
        $parent.siblings().children('.tab_button').removeAttr('title');
        $boardTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
    });
}

function boardRoll(){
    $(".board-roll-slide").slick({
        draggable: true,
        infinite: true,
        arrows: true,
        dots: false,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 4000,
        appendArrows: $('.roll-arrows'),
        prevArrow: $('.roll-prevArrow'),
        nextArrow: $('.roll-nextArrow'),
    });
    $('.roll-play-btn').click(function () {
        if (!$(this).hasClass('pause')) {
            $(this).addClass('pause').attr("title",'재생').css("background-image","url(/site/portal2022/images/main/board_play.png)").children().text("재생");
            $(".board-roll-slide").slick('slickPause');
        } else {
            $(this).removeClass('pause').attr("title",'정지').css("background-image","url(/site/portal2022/images/main/board_stop.png)").children().text("정지");
            $(".board-roll-slide").slick('slickPlay');
        }
    });
}


/* 김포 맞춤형 서비스 */
function serviceTab(){
    var $service = $('.newService'),
    $serviceTabButton = $service.find('.tab_button'),
    $serviceTabPanel = $service.find('.service_panel');

    $serviceTabButton.on('click', function () {
        var $this = $(this),
        $parent = $this.parents('.tab_item'),
        parentIndex = $parent.index();

        $parent.addClass('active').siblings().removeClass('active');
        $this.attr('title', '선택됨');
        $parent.siblings().children('.tab_button').removeAttr('title');
        $serviceTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
    });
}
// scroll event
var mainScroll;
var mainScrollGap;
window.addEventListener('load', function() {
    mainScroll = window.scrollY || document.documentElement.scrollTop;
    mainScrollGap = window.innerHeight;

    window.addEventListener('scroll', function () {
        mainScroll = window.scrollY || document.documentElement.scrollTop;
        mainScrollGap = window.innerHeight;
        var sections = ['sec3', 'sec4', 'sec5', 'sec7'];
    
        // 20240709 s
        sections.forEach(function(sectionClass) {
            var section = document.querySelector('.' + sectionClass);
            if (section !== null) {
                var mainSection = section.offsetTop - mainScrollGap;

                if (mainScroll > mainSection + 300) {
                    section.classList.add('active');
                } else if (mainScroll < mainSection - 500) {
                    section.classList.remove('active');
                }
            }
        });
        // 20240709 e
    });
});
window.onload = function(){
    boardTab();
    boardSlider();
    newBoardTab();
    boardRoll();
    serviceTab();
    // header
    $(".depth_language button").click(function(){
        $(".depth_language").toggleClass('active');
        $(".depth_language ul").slideToggle(300);
    });
    // 20240701
    $(".search_button").click(function(){
        $(".search_mob_wrap").slideToggle(300);
    });
    $(window).on('load resize', function () {
        if (window.innerWidth > 480) {
            $(".search_mob_wrap").slideUp(300);
        }
    });
}
