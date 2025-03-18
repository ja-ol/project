var Prototype = {

  Version: '1.7',

  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,

    SelectorsAPI: !!document.querySelector,

    ElementExtensions: (function() {
      var constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== 'undefined')
        return true;

      var div = document.createElement('div'),
          form = document.createElement('form'),
          isSupported = false;

      if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },

  K: function(x) { return x }
};

var Zoom = {
	size : 1.0,
	
	exec : function (v) {
		var currentSize = this.size;
		if (v == 0) {
			currentSize = 1.0;
		} else {
			currentSize += v * 0.1;
		}
		
		if (currentSize < 0.8 || currentSize > 3.0) {
			console.log(currentSize);
			return;
		} else {
			this.size = currentSize;
			console.log(currentSize);
		}
		
		if (!Prototype.Browser.IE) {
			$('body').css('-webkit-transform','scale(' + this.size + ')');
			$('body').css('-moz-transform','scale(' + this.size + ')');
			$('body').css('-o-transform','scale(' + this.size + ')');
			
			$('body').css('-webkit-transform-origin', '50% 0%');
			$('body').css('-moz-transform-origin', '50% 0%');
			$('body').css('-o-transform-origin', '50% 0%');
		} else {
			$('body').css('zoom', (this.size * 100) + '%');
			$('body').css('-ms-transform','scale(' + this.size + ')');
			$('body').css('-ms-transform-origin', '50% 0%');
			
			$('body')[0].filters.item(0).M11 *= 1.5;
			$('body')[0].filters.item(0).M12 *= 1.5;
			$('body')[0].filters.item(0).M21 *= 1.5;
			$('body')[0].filters.item(0).M22 *= 1.5;
		}
		$('body').css('transform','scale(' + this.size + ')');
		$('body').css('transform-origin', '50% 0%');
		$('body').css('zoom','scale(' + this.size + ') + %');
	},
	
	load : function (){
		
		if (this.size < 0.8 || this.size > 3.0) {
			return;
		}
		
		if (!Prototype.Browser.IE) {
			$('body').css('-webkit-transform','scale(' + this.size + ')');
			$('body').css('-moz-transform','scale(' + this.size + ')');
			$('body').css('-o-transform','scale(' + this.size + ')');
			
			$('body').css('-webkit-transform-origin', '50% 0%');
			$('body').css('-moz-transform-origin', '50% 0%');
			$('body').css('-o-transform-origin', '50% 0%');
		} else {
			$('body').css('zoom', (this.size * 100) + '%');
			$('body').css('-ms-transform','scale(' + this.size + ')');
			$('body').css('-ms-transform-origin', '50% 0%');
			
			$('body')[0].filters.item(0).M11 = this.size;
			$('body')[0].filters.item(0).M12 = this.size;
			$('body')[0].filters.item(0).M21 = this.size;
			$('body')[0].filters.item(0).M22 = this.size;
		}
		$('body').css('transform','scale(' + this.size + ')');
		$('body').css('transform-origin', '50% 0%');
	}
	
};
