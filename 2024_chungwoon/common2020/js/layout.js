
(function($) {
    'use strict';

    window.element = {};

    var $window = element.$window = $(window),
        $document = element.$document = $(document),
        $html = element.$html = $('html'),
        $screen = $.screen;
    
    //사이트
    var site = window.site,
        id = site.id,
        key = site.key,
        href = location.href;

     //screen
    $document.on('ready.layout', function(event) {
        //대표일때 태플릿사이즈 조정
        var tabletFromWidth;
        if(site.id === 'home'){
            tabletFromWidth = 1300;
        }else{
            tabletFromWidth = 1000;
        }

        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1300
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1300,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : tabletFromWidth,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }]
        });
    });

    $(function() {
        var $footer = element.$footer = $('#footer'),
            $container = element.$container = $('#container');

        /* 하단 관련사이트 */
        var $site = $footer.find('.site'),
            $siteItem = $site.find('.site_item'),
            $sitePanel = $site.find('.site_panel'),
            $siteElement = $site.find('.site_element'),
            $siteAnchor = $site.find('.site_anchor'),
            $siteButton = $site.find('.site_open');

        $siteButton.on('click', function(event) {
            var $this = $(this);
            $this.toggleClass('active');
            $this.next('.site_panel').slideToggle('250', 'easeOutExpo');
        });

        $siteButton.on('focusin', function() {
            var $this = $(this);

            if(!$this.hasClass('active')){
                $this.parent().siblings().find($siteButton).removeClass('active');
                $this.parent().siblings().find($sitePanel).slideUp('250', 'easeOutExpo');
            }
        });

        $siteElement.last().on('focusout', function() {
            $siteButton.removeClass('active');
            $sitePanel.slideUp('250', 'easeOutExpo');
        });

        /*스텝박스 자동높이

        @name autoHeight
         * @author Kwon Oh Hwan
         * @since 2020-10-16
        */

        function setHeight(parent ,object) {
            parent = $(parent);
            object = $(object);
            object.css('height', 'auto');
            parent.each(function (){
                var objectArray = [];

                $(this).find(object).each(function (){
                    var objectHeight = $(this).innerHeight();
                    objectArray.push(objectHeight);
                });
                var maxHeight = Math.max.apply(null, objectArray);
                $(this).find(object).height(maxHeight);
            });
        };

        //parent = 높이를 맞추고 싶은 객체들을 묶고 있는 부모
        //object = 높이를 맞추고 싶은 객체
        $(document).ready(function() {
            setHeight('.step .step_list','.step .step_item');
        });

        $(window).resize(function() {
            setHeight('.step .step_list','.step .step_item');
        });

        //팝업창 열기
        $('.cw_popup_open').on('click', function(){
            $(this).next('.cw_popup').show();
            $('#container, #contents').css('z-index', '30');
        });

        $('.cw_popup .popup_close').on('click', function(){
            $(this).closest('.cw_popup').hide();
            $('#container, #contents').css('z-index', '10');
        });
    });
})(window.jQuery);



