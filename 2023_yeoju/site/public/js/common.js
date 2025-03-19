//게시판 추가필드
document.addEventListener('DOMContentLoaded', function() {
    var aditFieldElements = document.querySelectorAll('.aditfield');

    if (aditFieldElements.length > 0) {
        for (var i = 0; i < aditFieldElements.length; i++) {
            var aditField = aditFieldElements[i];
            var fieldValue = aditField.textContent.trim();
            var fieldName = aditField.previousElementSibling.textContent.trim();
            var newMarkup = '<span class="p-split"><em>' + fieldName + '</em> ' + fieldValue + '</span>';
            var parentAuthorInfo = aditField.closest('.p-table--th-left');

            if (parentAuthorInfo) {
                var infoContainer = parentAuthorInfo.querySelector('.p-author__info');
                if (infoContainer) {
                    infoContainer.insertAdjacentHTML('beforeend', newMarkup);
                }
            }

            var parentRow = aditField.closest('tr');
            if (parentRow) {
                parentRow.remove();
            }
        }
    }
});

(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $html = $('html'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');

        /* 토글 */
        var $toggle = $('.toggle'),
            $toggleSelector = $toggle.find('[class*="_show"], [class*="_hide"]');

        $toggleSelector.on('click', function (event) {
            var $this = $(this),
                $parent = $this.parents('.toggle'),
                parentClass = $this.closest('.toggle').attr('class').replace(/\s+\active/g,'').split(/\s+/).slice(-2)[0].replace(/_item/,'');

            if($this.is('[class*="_show"]')){
                if ($parent.siblings().hasClass('active')){
                    $parent.siblings().removeClass('active');
                    $html.removeClass(parentClass + '_open');
                }
                $html.toggleClass(parentClass + '_open');
                $parent.toggleClass('active');
            }

            if($this.is('[class*="_hide"]')){
                $html.removeClass(parentClass + '_open');
                $this.closest('.active').removeClass('active');
            }
        });

        //행정복지센터
        $('.site_link ul .link_item.dongbox .link_anchor').on('click', function() {
            var $this = $(this),
                $Parent = $this.parent('.link_item'),
                IsActive = $Parent.is('.active'),
                $Layer = $this.siblings('.layer');
            if(!IsActive){
                $Parent.addClass('active');
                $this.attr('title', '행정복지센터 닫기');
                $Layer.slideDown();
            } else{
                $Parent.removeClass('active');
                $this.attr('title', '행정복지센터 열기');
                $Layer.slideUp();
            };
        });
        $('.site_link ul .link_item.dongbox .close').on('click', function() {
            var $this = $(this),
                $Parent = $this.parents('.link_item'),
                $Layer = $this.parent('.layer'),
                $dong_btn = $Layer.siblings('.link_anchor');
            $Parent.removeClass('active');
            $dong_btn.attr('title', '행정복지센터 열기');
            $Layer.slideUp();
        });
        


        //search박스
        $('.search_btn').on('click', function() {
            var $this = $(this),
                $searchbox = $('.search_box'),
                IsActive = $searchbox.is('.active');
            $html.addClass('search_open');
            $('.search_box_curtain').fadeIn();
            $searchbox.addClass('active').fadeIn();
            $('.search_box .total_search').focus();
        });

        $('.search_box_curtain').on('click', function() {
            var $this = $(this),
                $search_btn = $('.search_btn'),
                $searchbox = $('.search_box');
            $html.removeClass('search_open');
            $this.fadeOut();
            $searchbox.removeClass('active').fadeOut();
            $search_btn.focus();
        });
        $('.search_box .search_close').on('click', function() {
            var $this = $(this),
                $search_btn = $('.search_btn'),
                $searchbox = $('.search_box');
            $html.removeClass('search_open');
            $('.search_box_curtain').fadeOut();
            $searchbox.removeClass('active').fadeOut();
            $search_btn.focus();
        });


        //sns공유
        $('.addons .share_show').on('click', function(){
            var $this = $(this),
                $share = $this.parent('.share'),
                $panel = $this.siblings('.share_panel'),
                OnOff = $share.is('.active');

            $panel.slideDown();
            $share.addClass('active');
        });

        $('.share_panel .share_hide').on('click', function(){
            $('.share_panel .share_hide').parent('.share_panel').slideUp();
            $('.share_panel .share_hide').parents('.share').removeClass('active');
        });

        //qr
        $('.addons .qr_show').on('click', function(){
            var $this = $(this),
                $qr = $this.parent('.qr'),
                $qr_panel = $this.siblings('.qr_panel'),
                OnOff = $qr.is('.active');

            $qr_panel.slideDown();
            $qr.addClass('active');
        });

        $('.qr_panel .qr_hide').on('click', function(){
            $('.qr_panel .qr_hide').parents('.qr_panel').slideUp();
            $('.qr_panel .qr_hide').parents('.qr').removeClass('active');
        });


        //Language
        $('.language_show').on('click', function(){
            var $this = $(this),
                $language = $this.parent('.language'),
                $languagePanel = $this.siblings('.language_panel'),
                OnOff = $language.is('.active');

            if(!OnOff){
                $languagePanel.slideDown();
                $language.addClass('active');
            } else{
                $language.removeClass('active');
                $languagePanel.slideUp();
            };
        });
        $('.language_panel .language_hide').on('click', function(){
            $('.language_hide').parents('.language').removeClass('active');
            $('.language_hide').parent('.language_panel').slideUp();
            $('.language_show').attr('title', '언어선택 열기');
        });


        //클립보드복사
        var $urlCopy = $container.find('#url_copy');

        $urlCopy.on('click', function(event) {
            $('#url_copy div').remove();
            var html = "<div><label for='clip_target'>복사된 URL</label><input id='clip_target' type='text' value='' /></div>";
            $(this).append().html(html);

            var input_clip = document.getElementById("clip_target");
            var _url = $(location).attr('href');
            $('#clip_target').val(_url);

            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                var editable = input_clip.contentEditable;
                var readOnly = input_clip.readOnly;

                input_clip.contentEditable = true;
                input_clip.readOnly = false;

                var range = document.createRange();
                range.selectNodeContents(input_clip);

                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                input_clip.setSelectionRange(0, 999999);

                input_clip.contentEditable = editable;
                input_clip.readOnly = readOnly;
            } else {
                input_clip.select();
            }
            try {
                var successful = document.execCommand('copy');
                input_clip.blur();
                if (successful) {
                    alert("URL이 복사 되었습니다");
                } else {
                    alert('이 브라우저는 지원하지 않습니다.');
                }
            } catch (err) {
                alert('이 브라우저는 지원하지 않습니다.');
            }
        });

        //바로가기
        $('.footer .site .site_list .site_item .site_show').on('click', function() {
            var $this = $(this),
                $MyParent = $this.parent('li.site_item'),
                MyParentIsActive = $MyParent.is('.active'),
                $MyLayer = $this.siblings('.site_panel'),
                $OtherParents = $MyParent.siblings('li.site_item'),
                $OtherLayer = $OtherParents.find('.site_panel'),
                $OtherBtn = $OtherParents.find('.site_show');
            if (!MyParentIsActive) {
                $OtherParents.removeClass('active');
                $OtherLayer.slideUp();
                $OtherBtn.attr('title', '목록열기');
                $MyParent.addClass('active');
                $this.attr('title', '목록닫기');
                $MyLayer.slideDown();
            } else {
                $MyParent.removeClass('active');
                $this.attr('title', '목록열기');
                $MyLayer.slideUp();
            };
        });

        //패밀리사이트
        var $nuriBtn = $('.nuri_open'),
            $nuriLayer = $('.nuri_layer'),
            $nuriClose = $nuriLayer.find('.close'),
            $nuriItem = $nuriLayer.find('.item_btn');

        $nuriBtn.on('click', function () {
            $nuriLayer.addClass('active');
            $nuriLayer.fadeIn();
        });
        $nuriClose.on('click', function () {
            $nuriLayer.removeClass('active');
            $nuriLayer.fadeOut();
        })

        $nuriItem.on('click', function() {
            var $this = $(this),
                $MyParent = $this.parent('li.item'),
                IsActive = $MyParent.is('.active'),
                $MyLayer = $this.siblings('.layer'),
                $OtherParents = $MyParent.siblings('li.item'),
                $OtherLayer = $OtherParents.find('.layer'),
                $OtherBtn = $OtherParents.find('.item_btn');
            if(!IsActive){
                $OtherParents.removeClass('active');
                $OtherLayer.slideUp();
                $OtherBtn.attr('title', '목록열기');
                $MyParent.addClass('active');
                $this.attr('title', '목록닫기');
                $MyLayer.slideDown();
            } else{
                $MyParent.removeClass('active');
                $this.attr('title', '목록열기');
                $MyLayer.slideUp();
            };
        });


        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next');

        $bannerList.slick({
            draggable : false,
            infinite: true,
            variableWidth: true,
            slidesToShow: 8,
            slidesToScroll: 1,
            autoplay: true,
            playText : '재생',
            pauseText : '정지',
            autoArrow : $bannerAuto,
            prevArrow : $bannerPrev,
            nextArrow : $bannerNext,
        });

        //배너 없을 경우
        if(!$bannerList.find('.banner_item').length){
            $('.footer_banner').remove();
        }

        /* 상단으로 */
        var $bodyHtml = $('body,html'),
            $upButton = $footer.find('.up_button');

        $upButton.click(function(){
            $bodyHtml.stop().animate({
                scrollTop: 0
            }, 250);
        });

        //팝업 시작
        var $Popup = $('.popup .popup_list'),
            $popuptotal = $('.popup .total'),
            $popupcurrent = $('.popup .current');

        $Popup.slick({
            //기본
            autoplay: true,
            dots: false,
            swipe: true,
            draggable: true,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            prevArrow: $('.popup .popup_control .prev'),
            nextArrow: $('.popup .popup_control .next'),

            //추가 기능
            autoArrow: $('.popup .popup_control .auto'),
            isRunOnLowIE: false,
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseText: '정지',
            playText: '재생',
            total: $popuptotal,
            current: $popupcurrent,
            responsive: [
                {
                    breakpoint: 1001,
                    settings: {
                        autoplay: false,
                        arrows: false,
                        variableWidth: false,
                        slidesToShow: 1,
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        autoplay: false,
                        variableWidth: false,
                        infinite: true,
                        slidesToShow: 1,
                    }
                },
            ],
        });
        //팝업 끝

        //아코디언
        $('.qna_item .question .qna_btn').on('click', function() {
            var $this = $(this),
                $Title = $this.parent('.question'),
                $Item = $Title.parent('.qna_item'),
                $Layer = $Title.siblings('.answer'),
                IsActive = $Item.is('.active');
            if(!IsActive){
                $this.addClass('active').attr("title","답변 닫기");
                $Item.addClass('active');
                $Layer.slideDown();
            } else {
                $this.removeClass('actvie').attr("title","답변 열기");
                $Item.removeClass('active');
                $Layer.slideUp();
            }
        });

        /* 게시판 상세 */
        if($('.bbs .p-table .p-table--attach .p-attach').length === 0){
            $('.bbs__view').addClass('none_attach');
        }

        //하위메뉴 있어도(has) 해당 컨텐츠로 링크 필요시
        var menuKeys = ['1678']; //키값, 추가시 ''안에 추가 1,2,3...

        $('.depth_text').each(function() {
            var href = $(this).attr('href'),
                key = href.match(/[\?&]key=(\d+)/),
                currentKey = window.location.href.match(/[\?&]key=(\d+)/);

            if (
                key &&
                $.inArray(key[1], menuKeys) !== -1 &&
                currentKey &&
                currentKey[1] !== key[1]
            ) {
                $(this).on('click', function(e) {
                    e.preventDefault();
                    window.location.href = $(this).attr('href');
                });
            }
        });


    });
})(window.jQuery);
