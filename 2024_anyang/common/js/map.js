window.kakao=window.kakao||{},window.kakao.maps=window.kakao.maps||{},window.daum&&window.daum.maps?window.kakao.maps=window.daum.maps:(window.daum=window.daum||{},window.daum.maps=window.kakao.maps),function(){function a(a){var t={};return a.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(a,e,o){t[e]=o}),t}function t(a){a&&document.write('<script charset="UTF-8" src="'+a+'"></script>')}function e(){if(S.length){var a=o(R[S.shift()],e);a.start()}else n()}function o(a,t){var e=document.createElement("script");
    return e.charset="utf-8",e.onload=t,e.onreadystatechange=function(){/loaded|complete/.test(this.readyState)&&t()},{start:function(){e.src=a||"",document.getElementsByTagName("head")[0].appendChild(e),e=null}}}function n(){for(;I[0];)I.shift()();r.readyState=2}var r=kakao.maps=kakao.maps||{};if(void 0===r.readyState)r.onloadcallbacks=[],r.readyState=0;else if(2===r.readyState)return;r.VERSION={ROADMAP:"1906plw",ROADMAP_SUFFIX:"",HYBRID:"1906plw",SR:"3.00",ROADVIEW:"7.00",
    ROADVIEW_FLASH:"181207",BICYCLE:"6.00",USE_DISTRICT:"1906plw",SKYVIEW_VERSION:"160114",SKYVIEW_HD_VERSION:"160107"},r.RESOURCE_PATH={ROADVIEW_AJAX:"//s1.daumcdn.net/svc/attach/U03/cssjs/mapapi/ajax/180618/1529304089079/roadview.js"};for(var s,i="https:"==location.protocol?"https:":"http:",d="",c=document.getElementsByTagName("script"),E=c.length;s=c[--E];)if(/\/(beta-)?dapi\.kakao\.com\/v2\/maps\/sdk\.js\b/.test(s.src)){d=s.src;break}c=null;var I=r.onloadcallbacks,S=["v3"],_="",R={v3:i+"//t1.daumcdn.net/mapjsapi/js/main/4.4.9/kakao.js",
    services:i+"//s1.daumcdn.net/svc/attach/U03/cssjs/mapapi/libs/1.0.1/1515130215283/services.js",drawing:i+"//t1.daumcdn.net/mapjsapi/js/libs/drawing/1.2.5/drawing.js",clusterer:i+"//s1.daumcdn.net/svc/attach/U03/cssjs/mapapi/libs/1.0.6/1460434272434/clusterer.js"},l=a(d);_=l.appkey,_&&(r.apikey=_),r.version="4.1.5";var u=l.libraries;if(u&&(S=S.concat(u.split(","))),"false"!==l.autoload){for(var E=0,p=S.length;E<p;E++)t(R[S[E]]);r.readyState=2}r.load=function(a){switch(I.push(a),r.readyState){case 0:r.readyState=1,e();break;case 2:n()}}}();


