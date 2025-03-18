(function($) {
    'use strict';

    $(function() {

        var zoom = 100;
        var max = 200;
        var min = 80;

        $('#zoom_plus').on('click', function(){
            if(zoom>=max){
                alert('최대 확대입니다.');
            }else{
                $('body').css('zoom', (zoom+=10)+"%");
                $('.zoom_text').text((zoom)+"%");
            }
        });
        $('#zoom_minus').on('click', function(){
            if(min>=zoom){
                alert('최소 확대입니다.');
            }else{
                $('body').css('zoom', (zoom-=10)+"%");
                $('.zoom_text').text((zoom)+"%");
            }
        });

    });

})(window.jQuery);
