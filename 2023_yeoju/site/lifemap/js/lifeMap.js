var markers,
    selectMarkers,
    customOverlay,
    local,
    category,
    subCategory,
    localSeletor = $('.local_list'),
    menuSeletor = $('.menu'),
    mapContainer = document.getElementById('map'), //지도를 표시할 div
    mapOption = {},
    markerImg = '/site/lifemap/images/map_marker.png',
    markerSize = new daum.maps.Size(31, 34),
    markerOption= {offset: new daum.maps.Point(15, 34)},
    /*markerSelectImg = '/site/lifemap/images/marker_selected.png',
    markerSelectSize = new daum.maps.Size(18, 25),
    markerSelectOption =  {offset: new daum.maps.Point(18, 25)},*/
    map,
    localPosition = [
        {
            "local": "읍면동",
            "lat": 37.29841974525637,
            "lng": 127.63706326829713
        },
        {
            "local": "북내면",
            "lat": 37.355093006843276,
            "lng": 127.68942255879489
        },
        {
            "local": "대신면",
            "lat": 37.37731172249545,
            "lng": 127.60287668336866
        },
        {
            "local": "강천면",
            "lat": 37.27075189290676,
            "lng": 127.72288733868446
        },
        {
            "local": "가남읍",
            "lat": 37.218751662927296,
            "lng": 127.58448712294073
        },
        {
            "local": "금사면",
            "lat": 37.3969007604636,
            "lng": 127.49814125479023
        },
        {
            "local": "여흥동",
            "lat": 37.29516057700783,
            "lng": 127.63993423778767
        },
        {
            "local": "중앙동",
            "lat": 37.298695453135394,
            "lng": 127.62931721693796
        },
        {
            "local": "점동면",
            "lat": 37.19111403676084,
            "lng": 127.68428542057941
        },
        {
            "local": "오학동",
            "lat": 37.30984020286713,
            "lng": 127.64454816793892
        },
        {
            "local": "산북면",
            "lat": 37.409232492004456,
            "lng": 127.44228905145191
        },
        {
            "local": "세종대왕면",
            "lat": 37.29446683915472,
            "lng": 127.57866653183052
        },
        {
            "local": "흥천면",
            "lat": 37.34528067866028,
            "lng": 127.53346252647447
        },
    ];

var searchItem = [];
//마커를 생성
function mapDataMarkers(data, localValue){
    var selectLocalPosition = [];
    if(localValue){
        $.each(localPosition, function(i, item){
            if( item.local === localValue){
                selectLocalPosition.push(item);
            }
        });
        centerLat =  selectLocalPosition[0].lat;
        centerLng   = selectLocalPosition[0].lng;
        level = 6;
    }else{
        centerLat =  localPosition[0].lat;
        centerLng   = localPosition[0].lng;
        level = 8;
    }

    mapOption.center = new daum.maps.LatLng(centerLat, centerLng); //지도의 중심좌표
    mapOption.level = level;
    map = new daum.maps.Map(mapContainer, mapOption); //지도를 생성합니다
    map.setZoomable(true); //마우스휠

    markers = [];
    if(!data){
        data = loadData;
    }
    searchItem = [];
    if(data){
        //console.log(data)
        if(data.length > 0){
            $('.depth2_list').empty();

            $.each(data, function(i, item){
                var markerImage = new daum.maps.MarkerImage(markerImg, markerSize, markerOption);

                var latlng = new daum.maps.LatLng(item.lat, item.lng);
                var marker = new daum.maps.Marker({
                    map: map, //
                    position: latlng,
                    image : markerImage ,
                });

                //마커 클릭 이벤트
                kakao.maps.event.addListener(marker, 'click', function(){
                    if(selectMarkers) {
                        selectMarkers.setMap(null);
                    }

                    /*selectMarkers = new daum.maps.Marker({
                        map: map, //마커를 표시할 지도
                        position: new daum.maps.LatLng(item.lat, item.lng), //마커를 표시할 위치
                        image : new daum.maps.MarkerImage(markerSelectImg, markerSelectSize, markerSelectOption) ,//마커 이미지
                    });*/
                    map.panTo(latlng);
                    addCustomOverlay(latlng, item);
                });

                //마커 오버시 z-index 변경
                kakao.maps.event.addListener(marker, 'mouseover', function(){
                    highlightMarker(this);
                });
                kakao.maps.event.addListener(marker, 'mouseout', function(){
                    unhighlightMarker(this);
                });

                searchItem.push(item);

                $('.depth1_item').each(function () {
                    var $depthItem = $(this),
                        $depthList = $depthItem.find('.depth2_list'),
                        depthCategory = $depthItem.find('.text').text().trim(),
                        $depthNum = $depthItem.find('.num');

                    if (item.category === depthCategory) {
                        var $depthItem = $('<li class="depth_item depth2_item"><button type="button" class="depth_text depth2_text" onclick="panTo(' + item.uid + ')"><span>' + item.title + '</span></button></li>');

                        $depthList.append($depthItem);
                    }else{
                        $depthList.html('<li class="depth_item depth2_item none">등록된 정보가 없습니다.</li>');
                    }

                    var depth2length = $(this).find('.depth2_item:not(.none)').length;

                    $depthNum.text('(' + depth2length + ')');
                });

                markers[i] = marker;
            });
        }
    }
}

function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}

//지역 및 분류항목 Filter
function mapData(localValue, categoryValue, type){
    if(localValue || categoryValue){
        //지역
        var resultlocal = [];
        if(localValue){
            $.each(loadData, function(i, item){
                if( item.local === localValue){
                    resultlocal.push(item);
                }
            });
        }else{
            resultlocal = loadData;
        }

        //분류
        var resultCategory = [];
        if(categoryValue){
            $.each(resultlocal, function(i, item){
                if( item.category === categoryValue){
                    resultCategory.push(item);
                }
            });
        }else{
            resultCategory = resultlocal;
        }

        if(markers){
            markerHide();
        }
        mapDataMarkers(resultCategory, localValue, type);

    }else{
        mapDataMarkers();
    }

}

//마커 지우기
function markerHide() {
    setMarkers(null)
}
function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function checkedMenu(type){
    localValue = localSeletor.find('.active button').val();
    category = menuSeletor.find('.depth1_item.active .depth1_text .text').text();

    mapData(localValue, category, type)
}

function addCustomOverlay(moveLatLon, item){
    var detailOverlay = document.createElement('div');
    detailOverlay.className = 'detailOverlay';

    var overlayBox = document.createElement('div');
    overlayBox.className ='overlayBox';
    detailOverlay.appendChild(overlayBox);

    var titleBox = document.createElement('div');
    titleBox.className ='titleBox';
    overlayBox.appendChild(titleBox);

    var title = document.createElement('div');
    title.className ='title';
    title.appendChild(document.createTextNode(item.title));
    titleBox.appendChild(title);

    var listBox = document.createElement('ul');
    listBox.className ='listBox';
    overlayBox.appendChild(listBox);

    if(item.address){
        var address = document.createElement('li');
        var addressTitle = document.createElement('span');
        var addressText = document.createElement('span');
        address.className ='listItem clearfix address';
        addressTitle.className ='title';
        addressText.className ='text';
        addressTitle.appendChild(document.createTextNode('주소'));
        address.appendChild(addressTitle);
        address.appendChild(addressText);
        addressText.appendChild(document.createTextNode(item.address));
        listBox.appendChild(address);
    }
    if(item.tel){
        var tel = document.createElement('li');
        var telTitle = document.createElement('span');
        var telText = document.createElement('span');
        tel.className ='listItem clearfix tel';
        telTitle.className ='title';
        telText.className ='text';
        telTitle.appendChild(document.createTextNode('전화'));
        tel.appendChild(telTitle);
        tel.appendChild(telText);
        telText.appendChild(document.createTextNode(item.tel));
        listBox.appendChild(tel);
    }
    if(item.local){
        var localName = document.createElement('li');
        var localTitle = document.createElement('span');
        var localText = document.createElement('span');
        localName.className ='listItem clearfix dong';
        localTitle.className ='title';
        localText.className ='text';
        localTitle.appendChild(document.createTextNode('읍·면'));
        localName.appendChild(localTitle);
        localName.appendChild(localText);
        localText.appendChild(document.createTextNode(item.local));
        listBox.appendChild(localName);
    }
    if(item.homepage){
        var homepage = document.createElement('li');
        var homepageTitle = document.createElement('span');
        var homepageText = document.createElement('span');
        var homepageLink = document.createElement('a');
        homepage.className ='listItem clearfix homepage';
        homepageTitle.className ='title';
        homepageText.className ='text';
        homepageTitle.appendChild(document.createTextNode('홈페이지'));
        homepageLink.appendChild(document.createTextNode(item.homepage));
        homepageLink.setAttribute('href', item.homepage);
        homepageLink.setAttribute('target', '_blank');
        homepage.appendChild(homepageTitle);
        homepage.appendChild(homepageText);
        homepageText.appendChild(homepageLink);
        listBox.appendChild(homepage);
    }
    if(item.detail){
        var detail = document.createElement('li');
        var detailTitle = document.createElement('span');
        var detailText = document.createElement('span');
        detail.className ='listItem clearfix detail';
        detailTitle.className ='title';
        detailText.className ='text';
        detailTitle.appendChild(document.createTextNode('상세내용'));
        detail.appendChild(detailTitle);
        detail.appendChild(detailText);
        detailText.appendChild(document.createTextNode(item.detail));
        listBox.appendChild(detail);
    }

    var closeBtn = document.createElement('button');
    closeBtn.className ='close_overlay';
    closeBtn.appendChild(document.createTextNode('닫기'));
    closeBtn.onclick = function(){
        customOverlay.setMap(null);

        if(selectMarkers){
            selectMarkers.setMap(null);
        }
    };

    detailOverlay.appendChild(closeBtn);
    if(customOverlay) {
        customOverlay.setMap(null);
    }

    //customOverlay
    customOverlay = new daum.maps.CustomOverlay({
        map: map,
        position: moveLatLon,
        content: detailOverlay,
        yAnchor: 1.23,
        zIndex: 2
    });

}

//선택시 마커 변경 및 customOverlay
function panTo(uid) {
    var item;
    $.each(loadData, function(i, data){
        if( data.uid === uid){
            item = data
        }
    });

    var moveLatLon = new daum.maps.LatLng(item.lat, item.lng);

    moveLatLon.level= 2;
    map.panTo(moveLatLon);
    addCustomOverlay(moveLatLon, item);
}

//마커 오버시 z-index 변경
function highlightMarker(marker){
    marker.setZIndex(2);
}
function unhighlightMarker(marker){
    marker.setZIndex(1);
}

//마우스 드래그
function setDraggable(draggable) {
    //마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);
}
function setZoomable(zoomable) {
    //마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);
}

//검색어 필터
var searchItemTemp = [];
function filter(){
    searchItemTemp = [];
    var value, name, itemVal, i;
    value = document.getElementById('search').value.toUpperCase();
    itemVal = document.getElementsByClassName('depth2_item');
    for(i=0;i<itemVal.length;i++){
        name = itemVal[i].getElementsByClassName('depth2_text');
        if(name[0] && name[0].innerHTML.toUpperCase().indexOf(value) > -1){
            itemVal[i].style.display = '';
        }else{
            itemVal[i].style.display = 'none';
        }
    }

    if (value && value.trim() !== "") {

        $.each(searchItem, function(i, item2){
            var title = item2.title;
            if(title.toUpperCase().indexOf(value) > -1) {
                searchItemTemp.push(item2);
            }
        });
    }
}

//현위치
function locationLoadSuccess(pos){
    //현재 위치 받아오기
    var currentPos = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

    //지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    map.panTo(currentPos);
}

function locationLoadError(pos){
    alert('error : https에서는 동작하는걸로 알고 있음');
}

//위치 가져오기 버튼 클릭시
function getCurrentPosBtn(){
    navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
}

$(function(){
    //지도 드래그 이동
    $('.mouseControl').on('click', function(){
        var $this = $(this),
            IsActive = $this.is('.active');
        if(!IsActive){
            $this.addClass('active').attr('title', '지도 드래그이동 끄기').text('지도 드래그이동 끄기');
            setDraggable(true);
            setZoomable(true);
        }else{
            $this.removeClass('active').attr('title', '지도 드래그이동 켜기').text('지도 드래그이동 켜기');
            setDraggable(false);
            setZoomable(false);
        }
    });

    //1depth 읍면선택
    $('.header_top .local .local_select').on('click', function(){
        var $this = $(this),
            $Parent = $this.parent('.local'),
            IsActive = $Parent.is('.active'),
            $Layer = $this.siblings('.local_layer');
        if(!IsActive){
            $Parent.addClass('active');
            $this.attr('title', '목록닫기');
            $Layer.slideDown();
        }else{
            $Parent.removeClass('active');
            $this.attr('title', '목록열기');
            $Layer.slideUp();
        }
    });
    $('.header_top .local .local_close').on('click', function(){
        $('.local_close').parents('.local').removeClass('active');
        $('.local_close').parent('.local_layer').slideUp();
    });

    $('.local_btn').on('click', function(){
        localSeletor.find('.local_item').removeClass('active');

        var parentItem = $(this).closest('.local_item');

        parentItem.addClass('active');
        localValue = localSeletor.find('.active button').val();
        localMenuTitle =  $('.local_select span');
        if(localValue){
            localMenuTitle.html(localValue);
        }else{
            localMenuTitle.html('읍면동');
        }
        $('.local').removeClass('active');
        $('.local .local_layer').attr('title', '목록열기');
        $('.local .local_layer').slideUp();
        checkedMenu();

        $('#search').val('');
        filter();

        menuSeletor.find('.depth1_list, .depth1_item, .depth2_item').removeClass('active');
    });

    //2depth 분류 선택
    $('.menu .depth1_text').on('click', function(){
        var $this = $(this),
            $MyParent = $this.parent('.depth1_item'),
            $MyParent2 = $MyParent.parent('.depth1_list'),
            $MyLayer = $this.siblings('.depth2'),
            IsActive = $MyParent.is('.active'),
            targetMenu = $(this).closest('.depth1_item');

        if(!IsActive){
            menuSeletor.find('.depth1_list, .depth1_item, .depth2_item').removeClass('active');
            $MyLayer.stop().slideUp();
            targetMenu.find('.depth2').stop().slideDown();
            $MyParent.addClass('active');
            $MyParent2.addClass('active');
            $('#header').addClass('active');
            $('#header').addClass('list'+($MyParent2.index() + 1));
            $this.attr('title', '목록닫기');
        } else{
            $MyParent.removeClass('active');
            $MyParent2.removeClass('active');
            $this.attr('title', '목록열기');
            $('#header').removeClass('active');
            $('#header').removeClass('list'+($MyParent2.index() + 1));
        }

        checkedMenu();

        $('#search').val('');
        filter();
    });

    //3depth 항목 선택
    $(document).on('click', '.depth2_text', function(){
        menuSeletor.find('.depth2_item').removeClass('active');
        $(this).parent('.depth2_item').addClass('active');

        //반응형 메뉴
        $('.menu_btn').removeClass('active');
        $('html').removeClass('lnb_show');
        $('.menu_btn span').text('메뉴 열기');
    });

    //항목 닫기
    $('.depth2_close').on('click', function(){
        var $MyParent2 = $(this).parents('.depth1_list');

        $('.depth2_close').parents('.depth1_item').removeClass('active');
        $('.depth2_close').parents('.depth1_list').removeClass('active');
        $('.depth2_close').parents('.depth2').slideUp();
        $('#header').removeClass('active');
        $('#header').removeClass('list'+($MyParent2.index() + 1));

        checkedMenu();

        $('#search').val('');
        filter();
    });

    //분류항목 열기, 닫기
    $('.result_open .open_button').on('click', function(){
        $('.resultBox').addClass('active');
        $('.result_open').addClass('active');
    });
    $('.resultBox .close_button').on('click', function(){
        $('.result_open').removeClass('active');
        $('.resultBox').removeClass('active');
    });

    $(document).on('click','.close_overlay',function(){
        $('.depth2_item').removeClass('active');
    });

    //검색
    $('#search').on('keyup keydown search', function(e) {
        filter();
        if(e.keyCode == 13){
            $('.resultBox').addClass('active');
            $('.result_open').addClass('active');
        }
    })

    //검색 초기화
    $('.reload').on('click',function(){
        $('#search').val('');
        filter();
    });

    //스카이뷰 버튼
    $('.map_control .type_btn').on('click', function(){
        var $this = $(this),
            IsActive = $this.is('.active'),
            Type = $this.attr('data-type'),
            $OtherBtn = $this.siblings('.type_btn');
        if (!IsActive) {
            if (Type === 'roadmap') {
                map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
            }else{
                map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
            }
            $OtherBtn.removeClass('active').removeAttr('title');
            $this.addClass('active').attr('title', '선택됨');
        }
    });

    //스크롤
    $('.header_wrap .lnb').on('scroll',function(){
        var listTop = $('.depth1_list').first().offset().top,
            lnbTop = $(this).offset().top,
            scrollTop = $(this).scrollTop(),
            innerHeight = $(this).innerHeight(),
            scrollHeight = $(this).prop('scrollHeight');

        if (listTop === lnbTop){
            $('#header').removeClass('scroll_on');
        }
        else if (scrollTop + innerHeight >= scrollHeight) {
            $("#header").addClass('end');
        }
        else{
            $('#header').addClass('scroll_on');
            $("#header").removeClass('end');
        }
    });

    //반응형 메뉴
    $('.menu_btn').on('click',function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('html').removeClass('lnb_show');
            $('.menu_btn span').text('메뉴 열기');
        }else{
            $(this).addClass('active');
            $('html').addClass('lnb_show');
            $('.menu_btn span').text('메뉴 닫기');
        }
    });

    //인트로
    $('.intro .map_item button').on('click',function(){
        var thisIdx = $(this).parent().index();

        $('.intro_wrap').fadeOut();
        $('.depth1_item').eq(thisIdx).find('.depth1_text').click();
    });

});
