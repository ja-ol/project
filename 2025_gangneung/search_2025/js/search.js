var topSearchForm
var historyForm

(function ($) {
    'use strict';

    $(function () {

        /* 상세검색 열림, 닫힘 */
        $('.detail_search').on('click', function (){
            $('.search_box .detail_box').addClass('active').attr('title', '상세검색 열림');
        });
        $('.detail_close').click(function () {
            $('.search_box .detail_box').removeClass('active').attr('title', '상세검색 닫힘');
        });


        /* 인기 검색어 */
        $('.search_box .keyword').each(function () {
            var $keyword = $(this),
                $keywordList = $keyword.find('.keyword_list'),
                $keywordPrev = $keyword.find('.keyword_button.prev'),
                $keywordAuto = $keyword.find('.keyword_button.auto'),
                $keywordNext = $keyword.find('.keyword_button.next');

            $keywordList.slick({
                autoplay: true,
                dots: false,
                draggable: true,
                swipe: true,
                swipeToSlide: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                variableWidth: true,
                infinite: true,
                arrows: true,
                prevArrow: $keywordPrev,
                autoArrow : $keywordAuto,
                nextArrow: $keywordNext,
                playText: '재생',
                pauseText: '정지'
            });
        });


        $('.search_nav .depth1 .depth1_list').on('scroll', function () {
            var $this = $(this),
                scrollLeft = $this.scrollLeft(),
                scrollWidth = $this[0].scrollWidth,
                outerWidth = $this.outerWidth();

            if (scrollLeft + outerWidth >= scrollWidth - 1) {
                $this.closest('.depth1_list').addClass('end');
            } else {
                $this.closest('.depth1_list').removeClass('end');
            }
        });


        /* 인기검색어 주간/일간 */
        $('.side .rank .tab_nav button').on('click', function () {
            var $this = $(this),
                $otherButton = $this.siblings('button'),
                thisIndex = $this.index(),
                isActive = $this.is('.active'),
                $Content = $('.rank .tab_content'),
                $thisContent = $Content.eq(thisIndex),
                $otherContent = $thisContent.siblings('.tab_content');
            if (!isActive) {
                $this.addClass('active').attr('title', '선택됨');
                $otherButton.removeClass('active').attr('title', '');
                $thisContent.addClass('active').attr('title', '선택됨');
                $otherContent.removeClass('active').attr('title', '');
            }
        });

        /* 파일목록 더보기 */
        var $resultGroup = $('.board .result_list .result_group'),
            $resultFileMore = $resultGroup.find('.result_file.add button'),
            $resultFileWrap = $resultGroup.find('.result_file_wrap');

        $resultFileMore.on('click', function (){

            if ($resultGroup.hasClass('active')){
                $resultFileMore.attr('title', '파일목록 더보기 열기');
                $resultGroup.removeClass('active');
                $resultFileWrap.slideUp().attr('title', '파일목록 닫힘');
            }
            else {
                $resultFileMore.attr('title', '파일목록 더보기 닫기');
                $resultGroup.addClass('active');
                $resultFileWrap.slideDown().attr('title', '파일목록 열림');
            }
        });


        /* 반응형 테이블 */
        var $tableResponsive = $('.table.responsive');

        $tableResponsive.each(function(index, element) {
            var $element = $(element),
                rowdivIs = $element.find('td, th').is('[rowdiv]'),
                theadLength = $element.find('thead').length;

            if(rowdivIs == false && !theadLength == 0){
                $element.find('tbody th, tbody td').each(function(index, element) {
                    var $this = $(element),
                        thisIndex = $this.index(),
                        theadText = $this.parents('tbody').siblings('thead').find('th').eq(thisIndex).text();

                    $this.attr('data-content', theadText);
                });

                $element.find('tfoot th, tfoot td').each(function(index, element) {
                    var $this = $(element),
                        thisIndex = $this.index(),
                        theadText = $this.parents('tfoot').siblings('thead').find('th').eq(thisIndex).text();

                    $this.attr('data-content', theadText);
                });
            }
        });

    });
})(window.jQuery);
