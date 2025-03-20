(function($) {
    'use strict';

    $(function() {

        var $window = $(window),
            $container = $('#container');

        $window.load(function(){
            $('body').addClass('active');
        });


        /* 공유하기 */
        $('#header .share .share_open').on('click', function(){
            var $this = $(this),
                $share = $this.parent('.share'),
                $panel = $this.siblings('.share_panel'),
                OnOff = $share.is('.active');
            $share.addClass('active');
        });

        $('#header .share_panel .share_close').on('click', function(){
            $('#header .share_panel .share_close').parents('.share').removeClass('active');
        });


        /* url */
        var $urlCopy = $('#header .share').find('#url_copy');

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


        /* glance tab */
        var $glance = $container.find('.glance'),
            $glanceTab = $container.find('.glance_tab'),
            $glanceButton = $glanceTab.find('button.glance_button'),
            $glancePanelItem = $glance.find('.glance_panel .glance_item');

        $glanceButton.click(function (event) {
            var $this = $(this),
                glanceButtonText = $this.text(),
                index = $glanceButton.index(this);

            $this.parent().addClass('active').siblings().removeClass('active');
            $this.parents('.glance').find('.skip').text(glanceButtonText + ' 목록');
            $glancePanelItem.eq(index).addClass('active').siblings().removeClass('active');
        });


        /* up */
        var $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            $upButton = $('#footer').find('.up_button'),
            windowTop = 0,
            windowArea = 0;

        if($upButton.length){
            $upButton.on('click', function(e) {
                $htmlBody.animate({
                    scrollTop : $wrapper.offset().top
                },250);
                e.preventDefault();
            });
        }

    });
})(window.jQuery);
