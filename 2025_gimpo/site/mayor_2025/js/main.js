(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');

        var $visual = $('.visual'),
            $visualList = $visual.find('.visual_list'),
            $visualPrev = $visual.find('.visual_prev'),
            $visualNext = $visual.find('.visual_next'),
            $visualAuto = $visual.find('.visual_auto'),
            $visualProgress = $visual.find('.progress_bar');

        $window.on('load', function () {
            $visual.addClass('on');
        });

        // Slick 슬라이더 초기화
        $visualList.slick({
            autoplay: true,
            fade: true,
            speed: 1500,
            autoplaySpeed: autoplaySpeed,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            pauseOnHover: true,
            prevArrow: $visualPrev,
            nextArrow: $visualNext,
            autoArrow: $visualAuto,
            pauseText: '정지',
            playText: '재생',
            dots: true,
            appendDots: $('.visual .visual_dots'),
        });

        var autoplaySpeed = 4000; // 슬라이드 전환 시간
        var interval; // 프로그레스 바 업데이트용
        var progress = 0; // 현재 진행률 저장
        var remainingTime = autoplaySpeed; // 남은 시간 저장
        var isPaused = false; // 슬라이더가 정지 상태인지 확인

        // 프로그레스 바 업데이트 함수 (멈춘 위치에서 시작)
        function startProgressBar() {
            clearInterval(interval); // 기존 인터벌 제거

            var startTime = Date.now(); // 시작 시간 기록
            var endTime = startTime + remainingTime; // 목표 종료 시간 계산
            var initialProgress = progress; // 현재 진행률 저장

            interval = setInterval(function () {
                var now = Date.now();
                progress = initialProgress + ((now - startTime) / remainingTime) * (100 - initialProgress); // 기존 진행률에 추가

                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                $visualProgress.css("width", progress + "%");
            }, 20);
        }

        // 프로그레스 바 정지 함수
        function stopProgressBar() {
            clearInterval(interval);
            isPaused = true;
            // 남은 시간 계산
            remainingTime = autoplaySpeed * (1 - progress / 100);
        }

        // 슬라이드 변경 시 프로그레스 바 다시 시작
        $visualList.on("beforeChange", function () {
            progress = 0; // 새 슬라이드로 변경 시 초기화
            remainingTime = autoplaySpeed; // 다시 4초로 설정
            stopProgressBar();
            startProgressBar();
        });

        // 초기 프로그레스 바 시작
        startProgressBar();

        // 재생/정지 버튼 클릭 이벤트
        $visualAuto.on('click', function () {
            if ($(this).hasClass('slick-pause')) {
                $visual.removeClass('pause');
                $visualList.slick("slickPlay"); // 슬라이더 재생
                isPaused = false;
                startProgressBar(); // 저장된 progress에서 다시 시작
            } else {
                $visual.addClass('pause');
                $visualList.slick("slickPause"); // 슬라이더 정지
                stopProgressBar(); // 진행률 저장 후 정지
            }
        });


        /* 시정소식 */
        var $news = $container.find('.news'),
            $newsList = $news.find('.news_list'),
            $newsPrev = $news.find('.news_prev'),
            $newsNext = $news.find('.news_next');

        $newsList.slick({
            infinite: true,
            autoplay: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 1,
            prevArrow: $newsPrev,
            nextArrow: $newsNext,
            centerMode: true,
            centerPadding: 0,
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true,
                    }
                }
            ]
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            if (currentSlide !== nextSlide) {
                $('.slick-active + .slick-cloned').each(function (index, node) {
                    var $node = $(node);
                    setTimeout(function () {
                        $node.addClass('slick-current');
                        $node.addClass('slick-active');
                    });
                });
            }
        }); // 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때도 트랜지션이 적용되기 위한 코드입니다.


        /* 열린행정 */
        var $photo = $container.find('.photo'),
            $photoList = $photo.find('.photo_list'),
            $photoPrev = $photo.find('.photo_prev'),
            $photoNext = $photo.find('.photo_next');

        $photoList.slick({
            infinite: true,
            autoplay: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            adaptiveHeight: false,
            prevArrow: $photoPrev,
            nextArrow: $photoNext,
            responsive: [
                {
                    breakpoint: 1401,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1201,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1001,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true,
                    }
                }
            ]
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
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


        /* fade */
        var $fade = $('.fade');

        function fade() {
            $fade.each(function () {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $window.scrollTop() + $window.height();

                if (bottom_of_window > bottom_of_object / 1.3) {
                    $(this).addClass('show');
                } else {
                    $(this).removeClass('show');
                }
            });
        }

        fade();
        $window.scroll(function () {
            fade();
        });

    });
})(window.jQuery);
