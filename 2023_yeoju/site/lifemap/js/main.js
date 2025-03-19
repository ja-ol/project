
/**
 * @author (주)한신정보기술 퍼블리셔팀
 * @since 2019-03-18
 * @version 1.0.0
 */
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    //브라우저
    var _browser = navigator.userAgent.toLowerCase();

    //ie7일 때
    if(_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie ie7';

        //ie8일 때
    }else if(_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie ie8';

        //ie9일 때
    }else if(_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie ie9';

        //ie10일 때
    }else if(_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie ie10';

        //ie11일 때
    }else if(_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie ie11';

        //edge일 때
    }else if(_browser.indexOf('edge') > -1) {
        _browser = 'edge';

        //opera일 때
    }else if(_browser.indexOf('opr') > -1) {
        _browser = 'opera';

        //chrome일 때
    }else if(_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';

        //firefox일 때
    }else if(_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';

        //safari일 때
    }else if(_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    }else{
        _browser = 'unknown';
    }

    /**
     * @name 브라우저 얻기
     * @since 2017-12-06
     * @return {string}
     */
    window.getBrowser = function() {
        return _browser;
    };

    //브라우저 클래스 추가
    $html.addClass(_browser);

    $(function() {
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');


        $window.on('screen:wide screen:web', function(event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';
        });

        $window.on('screen:maxheight', function(event) {
            window.Hmode = 'MaxHeight';
            $body.attr('data-hmode', 'maxheight');
        });

        $window.on('screen:minheight', function(event) {
            window.Hmode = 'MinHeight';
            $body.attr('data-hmode', 'minheight');
        });

        setTimeout(function(){
            //console.log(mode);
        }, 1);

        // $('.resultbox .databox.scrollbar-inner').scrollbar();

        //resultbox
        $('.resultbox .result_btn').on('click',function(event){
            var $this = $(this),
                $Layer = $this.siblings('.layer'),
                $ResultBox = $this.parent('.resultbox'),
                IsActive = $ResultBox.is('.active'),
                NowState = $.screen.settings.state[0];
            if(IsActive){
                $Layer.slideUp(function() {
                    $ResultBox.removeClass('active').attr('data-open', 'no');
                    $this.attr('title', '목록열기');
                });
            } else{
                $ResultBox.addClass('active').attr('data-open', 'yes');
                $this.attr('title', '목록닫기');
                if(NowState=='phone'){
                    $Layer.slideDown();
                } else{
                    setTimeout(function() {
                        $Layer.slideDown();
                    }, 300);
                }
            };
        });



        $window.on('screen:wide screen:web', function(event) {

        });

        $window.on('screen:tablet screen:phone', function(event) {

        });
    });

    $document.on('ready', function(event) {
        /**
         * @link {https://github.com/JungHyunKwon/screen}
         */
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1401
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1400,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }, {
                name : 'maxheight',
                vertical : {
                    from : 9999,
                    to : 801
                }
            }, {
                name : 'minheight',
                vertical : {
                    from : 800,
                    to : 0
                }
            }]
        });
    });

    $window.on('load', function(event) {
        $window.on('screen:resize', function(event) {

        }).triggerHandler('screen:resize');
    });
});
