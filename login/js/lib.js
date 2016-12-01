/*
animate_css
animate_class
animate_js
get_new_image_size
local_data
touch_event
slide_event
banner_scroll
show_big_picture
online
prefetch
*/
/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-5
 * Time: 上午11:49
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



var DEVICE = {};



//*****************************************************
//获取浏览器或设备名称  以及版本号
//*****************************************************
//输出结果:
//---------------------------------------------------------
//DEVICE.isIpad             @param:bloom    是否是：ipad
//DEVICE.isIphone           @param:bloom    是否是：ipbone
//DEVICE.isAndroid          @param:bloom    是否是：android
//DEVICE.isIe               @param:bloom    是否是：ie
//DEVICE.isFirefox          @param:bloom    是否是：firefox
//DEVICE.isChrome           @param:bloom    是否是：chrome
//DEVICE.isOpera            @param:bloom    是否是：opera
//DEVICE.isSafari           @param:bloom    是否是：safari
//DEVICE.isPc				@param:bloom	是否是：pc
//DEVICE.isPhone			@param:bloom	是否是：移动设备，非pc

//DEVICE.ver                @param:number   浏览器版本或  ipad/iphone/android系统版本
//---------------------------------------------------------
(function () {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/ipad; cpu os ([\d_]+)/)) ? Sys.ipad = s[1].replace(/_/g, ".") :
		(s = ua.match(/iphone os ([\d_]+)/)) ? Sys.iphone = s[1].replace(/_/g, ".") :
			(s = ua.match(/android[ \/]([\d.]+)/)) ? Sys.android = s[1] :
				(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
					(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
						(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
							(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
								(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
									(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : Sys._ = 0;


	DEVICE.isIpad = (Sys.hasOwnProperty("ipad"));
	DEVICE.isIphone = (Sys.hasOwnProperty("iphone"));
	DEVICE.isAndroid = (Sys.hasOwnProperty("android"));
	DEVICE.isIe = (Sys.hasOwnProperty("ie"));
	DEVICE.isFirefox = (Sys.hasOwnProperty("firefox"));
	DEVICE.isChrome = (Sys.hasOwnProperty("chrome"));
	DEVICE.isOpera = (Sys.hasOwnProperty("opera"));
	DEVICE.isSafari = (Sys.hasOwnProperty("safari"));


	DEVICE.ver = 0;
	var ver;
	for (var key in Sys) {
		if (Sys.hasOwnProperty(key)) {
			ver = Sys[key];
		}
	}
	ver = ver.split(".");
	var _ver = [];
	for (var i = 0, l = ver.length; i < l; i++) {
		if (i >= 2) {
			break;
		}
		_ver.push(ver[i]);
	}
	_ver = _ver.join(".");
	DEVICE.ver = _ver;

	DEVICE.isPhone = (DEVICE.isAndroid || DEVICE.isIpad || DEVICE.isIphone);
})();


(function(){
	var p = navigator.platform;
	var win = p.indexOf("Win") == 0;
	var mac = p.indexOf("Mac") == 0;
	var x11 = (p == "X11") || (p.indexOf("Linux") == 0);

	DEVICE.isPc = (win || mac || x11);
	DEVICE.isPhone = !DEVICE.isPc;
	DEVICE.isMac = mac;
	DEVICE.isWin = win;
	DEVICE.isLinux = x11;

})();





//*****************************************************
//处理浏览器css前缀问题 以及其它一些属性
//*****************************************************
//输出结果：
//属性：------------------------------------------------
//DEVICE.has3d              @param:bloom    是否支持3d
//DEVICE.hasTouch           @param:bloom    是否是触摸屏
//DEVICE.hasTransform       @param:bloom    是否支持变形
//DEVICE.language           @param:str      语言版本  zh-cn

//事件：------------------------------------------------
//DEVICE.RESIZE_EV          @param:str      窗口变化
//DEVICE.START_EV           @param:str      点击
//DEVICE.MOVE_EV            @param:str      移动
//DEVICE.END_EV             @param:str      释放
//DEVICE.CANCEL_EV          @param:str      点击结束
//DEVICE.TRNEND_EV          @param:str      变形结束 ｅｇ:webkitTransitionEnd

//函数：------------------------------------------------
//DEVICE.nextFrame          fn              执行动画函数　１秒６０帧
//DEVICE.cancelFrame        fn              停止动画
//DEVICE.counter            fn              计数器 返回页面全局唯一ｉｄ数字，从１开始。
//DEVICE.fixObjCss          fn              ｊｑ调用，免ｃｓｓ前缀（部分）
//DEVICE.fixCss             fn              免ｃｓｓ前缀（部分）
//-----------------------------------------------------
(function () {
	var dummyStyle = document.createElement("div").style,
		vendor = (function () {
			if (window.navigator.msPointerEnabled) {
				return "";
			}
			if ("MozTransform" in dummyStyle) {
				return "";
			}
			var vendors = 'webkitT,MozT,msT,OT,t'.split(','),
				t,
				i = 0,
				l = vendors.length;

			for (; i < l; i++) {
				t = vendors[i] + 'ransform';
				if (t in dummyStyle) {
					return vendors[i].substr(0, vendors[i].length - 1);
				}
			}

			return false;
		})(),
		prefixStyle = function (style) {
			if (!vendor) return style;

			style = style.charAt(0).toUpperCase() + style.substr(1);
			return vendor + style;
		},
		has3d = prefixStyle('perspective') in dummyStyle,


		windowTouch = (window.navigator.msMaxTouchPoints && window.navigator.msMaxTouchPoints > 0) ? true : false,
		webkitTouch = 'ontouchstart' in window,
		hasTouch = (webkitTouch || windowTouch),
		hasTransform = vendor !== false,

		_transform = prefixStyle('transform'),
		_transitionProperty = prefixStyle('transitionProperty'),
		_transitionDuration = prefixStyle('transitionDuration'),
		_transformOrigin = prefixStyle('transformOrigin'),
		_transitionTimingFunction = prefixStyle('transitionTimingFunction'),
		_transitionDelay = prefixStyle('transitionDelay'),

		FULLSCREEN_EV = (function(){
			if (vendor === false) return "fullscreenchange";

			var fullscreenchange = {
				'': 'fullscreenchange',
				'webkit': 'webkitfullscreenchange',
				'Moz': 'mozfullscreenchange',
				'O': 'ofullscreenchange',
				'ms': 'msfullscreenchange'
			};

			return fullscreenchange[vendor];
		})(),
		//鼠标锁定状态变化事件
		LOCKPOINTER_EV = (function(){
			if (vendor === false) return "pointerlockchange";

			var pointerlockchange = {
				'': 'pointerlockchange',
				'webkit': 'webkitpointerlockchange',
				'Moz': 'mozpointerlockchange',
				'O': 'opointerlockchange',		//无
				'ms': 'mspointerlockchange'		//无
			};

			return pointerlockchange[vendor];
		})(),

		RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
		START_EV = webkitTouch ? 'touchstart' : windowTouch ? 'MSPointerDown' : 'mousedown',
		MOVE_EV = webkitTouch ? 'touchmove' : windowTouch ? 'MSPointerMove' : 'mousemove',
		END_EV = webkitTouch ? 'touchend' : windowTouch ? 'MSPointerUp' : 'mouseup',
		CANCEL_EV = webkitTouch ? 'touchcancel' : windowTouch ? 'MSPointerUp' : 'mouseup',
		TRNEND_EV = (function () {
			if (vendor === false) return "transitionend";

			var transitionEnd = {
				'': 'transitionend',
				'webkit': 'webkitTransitionEnd',
				'Moz': 'transitionend',
				'O': 'otransitionend',
				'ms': 'MSTransitionEnd'
			};

			return transitionEnd[vendor];
		})(),
		ANIEND_EV = (function(){
			if (vendor === false) return "animationEnd";

			var transitionEnd = {
				'': 'animationEnd',
				'webkit': 'webkitAnimationEnd',
				'Moz': 'mozAnimationEnd',
				'O': 'oanimationend',
				'ms': 'MSAnimationEnd'
			};

			return transitionEnd[vendor];
		})(),
		nextFrame = (function () {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return setTimeout(callback, 1);
				};
		})(),
		cancelFrame = (function () {
			return window.cancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.webkitCancelRequestAnimationFrame ||
				window.mozCancelRequestAnimationFrame ||
				window.oCancelRequestAnimationFrame ||
				window.msCancelRequestAnimationFrame ||
				clearTimeout;
		})(),
		checkDomHasPosition = function(dom){
			var position = dom.css("position");
			return (
				position == "fixed" ||
				position == "absolute" ||
				position == "relative"
			)
		},
		counter = (function () {
			var a = 0;
			return function () {
				a += 1;
				return a;
			}
		})(),
		language = (navigator.browserLanguage || navigator.language).toLowerCase(),


		t_v = (function () {
			var _vendors = 'webkitT,MozT,msT,OT'.split(','),
				t,
				i = 0,
				l = _vendors.length;

			for (; i < l; i++) {
				t = _vendors[i] + 'ransform';
				if (t in dummyStyle) {
					return ("-" + _vendors[i].substr(0, _vendors[i].length - 1) + "-");
				}
			}
			return "";
		})(),
		getCssName = function (style) {
			return (style in dummyStyle) ? style :
				   (t_v + style in dummyStyle) ? t_v + style : style;
		},
	//判断盒子模型的版本 2009版 2011版  2013版
		boxVendors = "",
		boxType = (function () {
			if ("boxPack" in dummyStyle) {
				return 2009;
			}
			if (t_v + "box-pack" in dummyStyle) {
				boxVendors = t_v;
				return 2009;
			}


			if ("flexPack" in dummyStyle) {
				return 2011;
			}
			if (t_v + "flex-pack" in dummyStyle) {
				boxVendors = t_v;
				return 2011;
			}


			if ("flexBasis" in dummyStyle) {
				return 2013;
			}
			if (t_v + "flex-basis" in dummyStyle) {
				boxVendors = t_v;
				return 2013;
			}
		})(),

	//（值）定义盒子模型 display:flex
		box = (boxType == 2013) ? boxVendors + "flex" :
			(boxType == 2011) ? boxVendors + "flexbox" :
				(boxType == 2009) ? boxVendors + "box" : "flex",
	//与盒子内布局方向相同，  start  end 。。。
		align_items = (boxType == 2013) ? boxVendors + "align-items" :
			(boxType == 2011) ? boxVendors + "flex-pack" :
				(boxType == 2009) ? boxVendors + "box-pack" : "align-items",
	//与盒子内布局方向相反，  start  end 。。。
		justify_content = (boxType == 2013) ? boxVendors + "justify-content" :
			(boxType == 2011) ? boxVendors + "flex-align" :
				(boxType == 2009) ? boxVendors + "box-align" : "justify-content",

	//盒子子元素所占比例
		flex = (boxType == 2013) ? boxVendors + "flex" :
			(boxType == 2011) ? boxVendors + "flex" :
				(boxType == 2009) ? boxVendors + "box-flex" : "flex",

	//盒子方向
		flex_direction = (boxType == 2013) ? boxVendors + "flex-direction" :
			(boxType == 2011) ? boxVendors + "flex-direction" :
				(boxType == 2009) ? boxVendors + "box-orient" : "flex-direction",

	//（值）横向排列
		flex_direction_row = (boxType == 2013) ? "row" :
			(boxType == 2011) ? "row" :
				(boxType == 2009) ? "horizontal" : "row",

	//（值）纵向排列
		flex_direction_column = (boxType == 2013) ? "column" :
			(boxType == 2011) ? "column" :
				(boxType == 2009) ? "vertical" : "column",


		animation = getCssName("animation"),
		box_shadow = getCssName("box-shadow"),
		backgroundSize = getCssName("background-size"),
		transform = getCssName("transform"),
		transformOrigin = getCssName("transform-origin"),
		transformStyle = getCssName("transform-style"),
		perspective = getCssName("perspective"),
		perspectiveOrigin = getCssName("perspective-origin"),
		border_radius = getCssName("border-radius"),
		box_sizing = getCssName("box-sizing"),
		background_clip = getCssName("background-clip"),
		border_bottom_left_radius = getCssName("border-bottom-left-radius"),
		border_bottom_right_radius = getCssName("border-bottom-right-radius"),
		border_top_left_radius = getCssName("border-top-left-radius"),
		border_top_right_radius = getCssName("border-top-right-radius"),
		backface_visibility = getCssName("backface-visibility"),
		transition = getCssName("transition"),
		transition_property = getCssName("transition-property"),
		transition_duration = getCssName("transition-duration"),
		transition_timing_function = getCssName("transition-timing-function");


	var css = {
			"box": box,
			"justify-content": justify_content,
			"align-items": align_items,
			"background-size": backgroundSize,
			"background-clip": background_clip,
			"flex": flex,
			"flex-direction": flex_direction,
			"row": flex_direction_row,
			"column": flex_direction_column,
			"transform": transform,
			"transform-origin":transformOrigin,
			"transform-style":transformStyle,
			"perspective":perspective,
			"perspective-origin":perspectiveOrigin,
			"border-radius": border_radius,
			"border-bottom-left-radius": border_bottom_left_radius,
			"border-bottom-right-radius": border_bottom_right_radius,
			"border-top-left-radius": border_top_left_radius,
			"border-top-right-radius": border_top_right_radius,
			"box-sizing": box_sizing,
			"box-shadow": box_shadow,
			"backface-visibility": backface_visibility,
			"transition": transition,
			"transition-property": transition_property,
			"transition-duration": transition_duration,
			"transition-timing-function": transition_timing_function,
			"animation":animation
		},
		gz = (function () {
			var reg, a = [];
			for (var key in css) {
				if (css.hasOwnProperty(key)) {
					if (key == "box" || key == "transition" || key == "flex") {
						a.push("([^-]" + key + "[^-])");
					} else if (key == "row" || key == "column") {
						a.push(key);
					} else {
						a.push("([^-]" + key + ")");
					}
				}
			}
			reg = a.join("|");
			return new RegExp(reg, "ig");
		})(),
		css_prefix = function (data) {
			var text = JSON.stringify(data),
				newtext = cssfile_prefix(text);
			return JSON.parse(newtext);
		},
		cssfile_prefix = function (data) {
			return  data.replace(gz, function (a) {
				var str = a.substr(1, a.length - 2);
				if (str == "box" || str == "transition" || str == "flex") {
					var newstr = css[str];
					return a.substr(0, 1) + newstr + a.substr(a.length - 1);
				} else if (a == "row" || a == "column") {
					return css[a];
				} else {
					return a.substr(0, 1) + css[a.substr(1)];
				}
			});
		},
		fix_css = function (css) {
			css = css.replace(/;/ig, " ; ");
			return cssfile_prefix(" "+css);
		};

	dummyStyle = null;


	DEVICE.has3d = has3d;         //是否支持3d
	DEVICE.hasTouch = hasTouch;  //是否是触摸屏
	DEVICE.hasTransform = hasTransform;  //是否支持变形


	DEVICE._transform = transform;        //自动添加前缀
	DEVICE._transitionProperty = _transitionProperty;
	DEVICE._transitionDuration = _transitionDuration;
	DEVICE._transformOrigin = _transformOrigin;
	DEVICE._transitionTimingFunction = _transitionTimingFunction;
	DEVICE._transitionDelay = _transitionDelay;


	DEVICE.RESIZE_EV = RESIZE_EV;    //窗口变化
	DEVICE.START_EV = START_EV;  //点击
	DEVICE.MOVE_EV = MOVE_EV;   //移动
	DEVICE.END_EV = END_EV;     //释放
	DEVICE.CANCEL_EV = CANCEL_EV;      //结束
	DEVICE.TRNEND_EV = TRNEND_EV;       //变形结束 webkitTransitionEnd
	DEVICE.ANIEND_EV = ANIEND_EV;       //webkitAnimationEnd
	DEVICE.FULLSCREEN_EV = FULLSCREEN_EV;  //全屏事件监听
	DEVICE.LOCKPOINTER_EV = LOCKPOINTER_EV;	//锁定鼠标

	DEVICE.nextFrame = nextFrame;
	DEVICE.cancelFrame = cancelFrame;

	DEVICE.language = language;   //语言版本  zh-cn
	DEVICE.counter = counter;        //计数器  fn

	DEVICE.fixObjCss = css_prefix;
	DEVICE.fixCss = fix_css;


	DEVICE.css = css;
	DEVICE.boxType = boxType;
	DEVICE.boxVendors = boxVendors;

	DEVICE.checkDomHasPosition = checkDomHasPosition;

	DEVICE.trim = function(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};
	DEVICE.getBetweenNumber = function(val,min,max){
		val = (val>max)? max : val;
		val = (val<min)? min : val;
		return val;
	};

})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-5
 * Time: 上午11:48
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */





//判断是否是数字
$.isNumber = function(val){
	return typeof val === 'number';
};
//判断是否是字符串
$.isString = function(val){
	return typeof val === 'string';
};
//判断是否是布尔
$.isBoolean = function(val){
	return typeof val === 'boolean';
};
//判断是否是对象   jqmobi有
$.isObject = function(str){
	if(str === null || typeof str === 'undefined' || $.isArray(str))
	{
		return false;
	}
	return typeof str === 'object';
};
//判断是否是数组   jqmobi有
$.isArray = function (arr){
	return arr.constructor === Array;
};
//判断是函数    jqmobi有
$.isFunction = function(fn){
	return typeof fn === 'function'
};
//判断定义值没
$.isUndefined = function(val){
	return typeof val === 'undefined'
};
//判断是否是网址
$.isUrl = function(url){
	var strRegex = "[a-zA-z]+://[^s]*";
	var re=new RegExp(strRegex);
	return re.test(url);
};


$.getDom = function(obj){
	var returnobj;

	if(!obj){return returnobj;}

	if($.isString(obj)){
		returnobj = document.getElementById(obj);
	}else if($.isObject(obj)){
		if(obj.length == 1){
			returnobj = obj.get(0);
		}
		if(obj.nodeType == 1){
			returnobj = obj;
		}
	}

	return returnobj;
};
$.getArray = function(str){
	return ($.isArray(str))? str : [];
};
$.getFunction = function(fn){
	return ($.isFunction(fn))? fn : function(){};
};
$.getBloom = function(str){
	return ($.isBoolean(str))? str : false;
};
$.getObj = function(obj){
	return ($.isObject(obj))? obj : {};
};
$.getNumber = function(str){
	str = parseInt(str);
	str = str || 0;
	return str;
};


//设置css样式
$.fn.css3 = function(css){
	$(this).css(DEVICE.fixObjCss(css));
	return $(this);
};
//返回style的css变换
$.css3 = function(css){
	return DEVICE.fixCss(css);
};/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午10:11
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//css动画
$.fn.cssAnimate=(function(){

	var cssanimagefn = {},
		counter = (function(){
			var a = 0;
			return function(){
				a += 1;
				return a;
			}
		})(),
		device = DEVICE,
		clearfn = function(obj,keyname){
			obj.removeEventListener(device.TRNEND_EV,cssanimagefn[keyname],false);
			delete cssanimagefn[keyname];
			delete obj.__bens_cssfn_id__;
		};

	return function(data,time,callback,is_3d,type){
		var _this=$(this),
			_that = _this.get(0),
			_thatstyle = _that.style;

		type = type || "ease";
		data = JSON.parse(DEVICE.fixObjCss(JSON.stringify(data)));
		time = time || 1000;
		callback = $.getFunction(callback);
		is_3d = ($.isBoolean(is_3d))?  is_3d : false;

		if(_that.__bens_cssfn_id__){
			var temp_key = _that.__bens_cssfn_id__;
			clearfn(_that,temp_key);
		}

		var thiskey = counter();
		_that.__bens_cssfn_id__ = thiskey;


		cssanimagefn[thiskey]=function(e){
			var p_name = e.propertyName;
			if(e.target == _that && data.hasOwnProperty(p_name)){

				//_this.get(0).style["webkitTransition"]="all 0 ease";
				_thatstyle[device._transitionProperty] = "";
				_thatstyle[device._transitionDuration] = "";
				_thatstyle[device._transitionTimingFunction] = "";
				_thatstyle["webkitTransformStyle"]="";
				_thatstyle["webkitBackfaceVisibility"]="";
				_thatstyle.willChange = "auto";

				callback();
				clearfn(_that,thiskey);
			}
		};

		_thatstyle[device._transitionProperty] = "all";
		_thatstyle[device._transitionDuration] = time+"ms";
		_thatstyle[device._transitionTimingFunction] = type;
		_thatstyle.willChange = "all";

		_thatstyle["webkitTransformStyle"]="preserve-3d";   //webkit私有
		if(!is_3d){
			_thatstyle["webkitBackfaceVisibility"]="hidden";    //webkit私有
		}else{
			_thatstyle["webkitBackfaceVisibility"]="visible";    //webkit私有
		}


		setTimeout(function(){
			_that.addEventListener(device.TRNEND_EV,cssanimagefn[thiskey],false);
			_this.css(data);
		},1);

	}
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午10:12
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//css3 class动画
//$.fn.classAnimate(params)
//@param obj     {"0%":"transform:scale(1);background:#000;","100%":"transform:scale(2);background:#fff;"}
//@param time    时间毫秒:2000
//@param type    动画方式:linear
//@param infinite  动画是否循环: true/false
//@param alternate 动画是否反向:  true/false
//@param callback  动画完成回调:fn    循环时无效


//停止循环的动画
//$.fn.removeClassAnimate();


$.fn.classAnimate = (function(){
	var fns = {},
		clearFn = function(obj,_id){
			obj.get(0).removeEventListener(DEVICE.ANIEND_EV,fns[_id],false);
			obj.removeCss3Animate();
			delete fns[_id];
		},
		addFn = function(id,obj,callback){
			var _id = "__temp_"+DEVICE.counter()+"__";
			obj.get(0).addEventListener(DEVICE.ANIEND_EV,fns[_id] = function(e){
				if(id == e.animationName){
					callback.call(this);
					clearFn(obj,_id);
				}
			},false);
		};

	return function(obj,time,type,infinite,alternate,callback){
		var id = "__keyframes_"+DEVICE.counter()+"__";
		time = parseInt(time) || 1000;
		type = type || "linear";
		infinite = $.getBloom(infinite);
		//callback = $.getFunction(callback);
		alternate = $.getBloom(alternate);

		time = time+"ms";
		infinite = (infinite)? "infinite" :"";
		alternate = (alternate)? "alternate" : "";
		var class_name = id+"class__";

		if(!$.isObject(obj)){
			throw("css3Animate 参数样式结构错误");
		}



		//生成style
		var last_style = "";
		var style = $("<style id='"+class_name+"'></style>");

		var css = " animation: " + id + " " + time + " " + type + " " + infinite + " " + alternate +";";
		css = $.css3(css);
		css = "."+class_name+"{"+css+"} @keyframes "+id+"{";

		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				var this_val = $.css3(obj[key]);
				css += key + " {" + this_val + "}";
				last_style = this_val;
			}
		}

		css +=  "}";


		style.text(css);
		$("head").append(style);



		//生成最终的css
		var last_css = {};
		last_style = last_style.split(";");
		for(var z=0,zl=last_style.length;z<zl;z++){
			var this_style = last_style[z].split(":");
			if(this_style.length == 2){
				var _key = $.trim(this_style[0]),
					_val = $.trim(this_style[1]);
				last_css[_key] = _val;
			}
		}




		$(this).each(function(){
			if($(this).css("display") == "none" || $(this).css("visibility") == "hidden"){

			}else{
				$(this).addClass(class_name);
				$(this).css(last_css);
				$(this).get(0).__animate_css3_class__ = class_name;
			}
		});


		if(!$.isFunction(callback)){return $(this);}
		if(infinite){return $(this);}


		$(this).each(function(){
			if($(this).css("display") == "none" || $(this).css("visibility") == "hidden"){

			}else{
				addFn(id,$(this),callback);
			}
		});

		return $(this);
	}
})();



$.fn.removeClassAnimate = function(){
	var temp = {};


	$(this).each(function(){
		var class_name = $(this).get(0).__animate_css3_class__;
		temp[class_name] = true;
		$(this).removeClass(class_name);
	});

	for(var key in temp){
		if(temp.hasOwnProperty(key)){
			var style = $("#"+key);
			if(style.length != 0){
				style.remove();
			}
		}
	}
};/**
 * Created by beens on 15/11/7.
 */







//h5动画函数
//var a = new DEVICE.jsAnimate({
//    start:0,                  //@param:number   初始位置
//    end:1,                    //@param:number   结束位置
//    time:800,                 //@param:number   动画执行时间  ms
//    type:"Cubic",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
//    class:"easeIn",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
//    stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
//        $("#aaa").css({opacity:val})
//    },
//    endFn:function(){         //@param:fn       动画结束执行
//
//    },
//    alternate:false,          //@param:boolean  动画结束时是否反向运行，默认：false
//    infinite:false            //@param:boolean  动画是否循环执行，默认：false
//                                                设置该参数endFn将失效
//})

//a.play();
//a.stop();



DEVICE.jsAnimate = (function(){
    var nextFrame = DEVICE.nextFrame,
        cancelFrame = DEVICE.cancelFrame;

    //缓动算法
    //t:当前时间
    //b:初始值
    //c:变化量
    //d:持续时间
    var tween = {
        //线性
        Linear: function(t,b,c,d){
            return c*t/d + b;
        },
        //2次方缓动
        Quad: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            }
        },
        //3次方缓动
        Cubic: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            }
        },
        //4次方缓动
        Quart: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            }
        },
        //5次方缓动
        Quint: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            }
        },
        //正选曲线缓动
        Sine: {
            easeIn: function(t,b,c,d){
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOut: function(t,b,c,d){
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            }
        },
        //指数曲线的缓动
        Expo: {
            easeIn: function(t,b,c,d){
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOut: function(t,b,c,d){
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        //圆形曲线的缓动
        Circ: {
            easeIn: function(t,b,c,d){
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            }
        },
        //指数衰减的正弦曲线缓动
        Elastic: {
            easeIn: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
            },
            easeInOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            }
        },
        //超过范围的三次方缓动
        Back: {
            easeIn: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            }
        },
        //指数衰减的反弹缓动
        Bounce: {
            easeIn: function(t,b,c,d){
                return c - tween.Bounce.easeOut(d-t, 0, c, d) + b;
            },
            easeOut: function(t,b,c,d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            easeInOut: function(t,b,c,d){
                if (t < d/2) return tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
                else return tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        }
    };

    var animate = function(opt){
        this.runTime = opt.time;     //动画持续时间
        this.stepFn = opt.stepFn || function(){};   //每步执行的函数，参数：自动返回当前动画执行的百分比
        this.endFn = opt.endFn || function(){};     //动画执行完毕回调
        this.start = opt.start;
        this.end = opt.end;
        this.type = opt.type || "Linear";
        this.class = opt.class || "easeIn";
        this.alternate = ($.isBoolean(opt.alternate))? opt.alternate : false;
        this.infinite = ($.isBoolean(opt.infinite))? opt.infinite : false;


        this._checkParam();


        this.startTime = 0;         //动画开始时间
        this.endTime = 0;           //动画结束时间
        this.nowTime = 0;           //当前动画执行到的时间
        this._useedTime = 0;        //停止后在开始动画时的之前动画时间总和
        this._fn = null;            //nextFrame 临时赋值变量
        this.isRuning = false;      //动画是否在运行
        this.autoStop = false;      //动画是否由最小化窗口暂停

        this.addEvent();
    };

    animate.prototype = {
        //检查tween动画参数是否正确
        _checkParam:function(){
            if(this.type != "Linear"){
                if(tween[this.type] && tween[this.type][this.class]){

                }else{
                    this.type = "Cubic";
                    this.class = "easeIn";
                    console.log("参数不正确已使用Cubic easeIn");
                }
            }
        },
        //动画完成执行
        _complete:function(){
            //如果无限循环执行
            if(this.infinite){
                //是否反向执行
                if(this.alternate){
                    var a = this.start,
                        b = this.end;
                    this.end = a;
                    this.start = b;
                    this._useedTime = 0;
                    this.play();
                }else{
                    this._useedTime = 0;
                    this.play();
                }
            }else{
                //是否反向执行
                if(this.alternate){
                    var a = this.start,
                        b = this.end;
                    this.end = a;
                    this.start = b;
                    this._useedTime = 0;
                    this.alternate = false;
                    this.play();
                }else{
                    this.endFn();
                }
            }
        },
        //浏览器最小化时停止动画，恢复时执行
        addEvent:function(){
            var _this =this;
            document.addEventListener('visibilitychange', function() {
                if(document.hidden){
                    //最小化
                    if(_this.isRuning){
                        _this.autoStop = true;
                        _this.stop();
                    }
                }else{
                    //恢复窗口
                    if(_this.autoStop){
                        _this.autoStop = false;
                        _this.play();
                    }
                }
            },false)
        },
        //执行
        _go:function(){
            var _this = this;

            var __step__ = function(){
                var now_time = new Date().getTime() + _this._useedTime,
                    use_time = now_time  - _this.startTime,
                    pre = use_time/_this.runTime;

                _this.nowTime = now_time;

                if(now_time>=_this.endTime){
                    _this.stepFn(_this.end);
                    _this.stop();
                    _this._complete();
                    return;
                }


                var _tween = (_this.type == "Linear")? tween.Linear : tween[_this.type][_this.class],
                    val = _tween(pre,_this.start,_this.end-_this.start,1);

                _this.stepFn(val);
                _this._fn = nextFrame(__step__);
            };

            __step__();
        },
        //开始动画
        play:function(){
            this.startTime = new Date().getTime();
            this.endTime = this.startTime + this.runTime;
            this.isRuning = true;
            this._go();
        },
        //暂停动画
        stop:function(){
            cancelFrame(this._fn);
            this._fn = null;
            this.isRuning = false;
            //重置运行时间
            this._useedTime = this.nowTime - this.startTime;
        },
        //从头开始动画
        restart:function(){
            this._useedTime = 0;
            this.play();
        }

    };

    return animate;
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:23
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//获取适合容器的图片大小
DEVICE.getNewImageSize = function(imgwidth,imgheight,objwidth,objheight){
	var newimgwidth,newimgheight;

	if(!imgwidth || !imgheight){
		return {
			width:objwidth,
			height:objheight
		}
	}


	if(imgwidth>0 && imgheight>0){
		if(imgwidth/imgheight>=objwidth/objheight){
			if(imgwidth>objwidth){
				newimgwidth = objwidth;
				newimgheight = imgheight*objwidth/imgwidth;
			}else{
				newimgwidth = imgwidth;
				newimgheight = imgheight;
			}
		}else{
			if(imgheight>objheight){
				newimgheight = objheight;
				newimgwidth = imgwidth*objheight/imgheight;
			}else{
				newimgwidth = imgwidth;
				newimgheight = imgheight;
			}
		}
	}else{
		newimgwidth = objwidth;
		newimgheight = objheight;
	}


	return {
		width:newimgwidth,
		height:newimgheight
	}
};
/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:31
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//本地缓存
//DEVICE.localData.setItem(key,val);
//DEVICE.localData.getItem(key);
//DEVICE.localData.removeItem(key);
DEVICE.localData = {
	userData: null,
	name: location.hostname,
	init: function () {
		if (!this.userData) {
			try {
				this.userData = document.createElement('INPUT');
				this.userData.type = "hidden";
				this.userData.style.display = "none";
				this.userData.addBehavior("#default#userData");
				document.body.appendChild(this.userData);
				var expires = new Date();
				expires.setDate(expires.getDate() + 365);
				this.userData.expires = expires.toUTCString();
			} catch (e) {
				return false;
			}
		}
		return true;

	},
	setItem: function (key, value) {
		if (window.localStorage) {
			window.localStorage[key] = value;
		} else {
			if (this.init()) {
				this.userData.load(this.name);
				this.userData.setAttribute(key, value);
				this.userData.save(this.name);
			}
		}

	},
	getItem: function (key) {
		if (window.localStorage) {
			return window.localStorage[key];
		} else {
			if (this.init()) {
				this.userData.load(this.name);
				return this.userData.getAttribute(key)
			}
		}

	},
	removeItem: function (key) {
		if (window.localStorage) {
			window.localStorage.removeItem(key);
		} else {
			if (this.init()) {
				this.userData.load(this.name);
				this.userData.removeAttribute(key);
				this.userData.save(this.name);
			}
		}
	}
};/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:39
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//事件 $$
(function(){
	var device = DEVICE,
		createMyTouchEven = function(obj){
			this.obj=obj;
			this.mytarget=null;

			if(this.obj==null){return;}

			this.clickLongTimeFn=null;
			this.clickTimeFn=null;
			this.points=[];

			this.isTouchOk=true;
			this.isTouchStarted=false;
			this.isTouchMoved=false;
			this.isLongClicked=false;
			this.isTouchEnded=false;


			this.clickDownEven=null;
			this.clickOkEven=null;
			this.clickUpEven=null;
			this.longClickEven=null;
			//this.slideUpEven=null;
			//this.slideDownEven=null;
			//this.slideRightEven=null;
			//this.slideLeftEven=null;

			this.touchSTime=null;
			this.touchJQ=400;
			//this.touchDelay=10;
			this.longClickDelay=100000;
			this.allowMove=10;
			this.hasTouch=device.hasTouch;

			this.eventBind();
		};

	createMyTouchEven.prototype = {
		eventBind:function(){
			var _this=this;
			this.obj.addEventListener(device.START_EV,this.touchStart=function(e){_this.touchStartHandler(e);},false);
			this.obj.addEventListener(device.MOVE_EV,this.touchMove=function(e){_this.touchMoveHandler(e);},false);
			this.obj.addEventListener(device.END_EV,this.touchEnd=function(){_this.touchEndHandler();},false);

			this.clickDownEven=document.createEvent('Event');
			this.clickDownEven.initEvent("myclickdown", true, true);

			this.clickOkEven=document.createEvent('Event');
			this.clickOkEven.initEvent("myclickok", true, true);

			this.clickUpEven=document.createEvent('Event');
			this.clickUpEven.initEvent("myclickup", true, true);

			this.longClickEven=document.createEvent('Event');
			this.longClickEven.initEvent("mylongclick", true, true);

			/*
			 this.slideUpEven=document.createEvent('Event');
			 this.slideUpEven.initEvent("myslideup", true, true);

			 this.slideDownEven=document.createEvent('Event');
			 this.slideDownEven.initEvent("myslidedown", true, true);

			 this.slideRightEven=document.createEvent('Event');
			 this.slideRightEven.initEvent("myslideright", true, true);

			 this.slideLeftEven=document.createEvent('Event');
			 this.slideLeftEven.initEvent("myslideleft", true, true);
			 */
		},
		f5:function(){
			this.points=[];
			this.isTouchStarted=false;
			this.isTouchMoved=false;
			this.isLongClicked=false;
			this.isTouchEnded=false;
		},
		isTouchOkFn:function(){
			//判断是否是有效点击
			var nowdatatime=new Date().getTime();

			//点击时间间隔控制
			if(this.touchSTime){
				/*
				 if(nowdatatime-this.touchSTime>this.touchJQ){
				 //有效
				 this.isTouchOk=true;
				 }else{
				 //无效
				 this.isTouchOk=false;
				 }
				 */
				this.isTouchOk = (nowdatatime-this.touchSTime>this.touchJQ);
				if(this.isTouchOk){
					this.touchSTime=nowdatatime;
				}
			}else{
				this.isTouchOk = true;
				this.touchSTime=nowdatatime;
			}

		},
		//长按事件监听
		clickLongListenerFn:function(){
			var _this=this;
			this.clickLongTimeFn=setTimeout(function(){
				_this.isLongClicked=true;
				_this.isTouchEnded=true;
				//长按。。。。。
				//触发事件
				_this.clickUpEven.mytarget=_this.mytarget;
				_this.longClickEven.mytarget=_this.mytarget;
				_this.obj.dispatchEvent(_this.clickUpEven);
				_this.obj.dispatchEvent(_this.longClickEven);
				//_this.clickUpHandler(e);
				//_this.clickLongHandler(e);
			},this.longClickDelay);
		},
		//点击时
		touchStartHandler:function(e){
			//e.preventDefault();

			this.isTouchOkFn(); //判断是否是有效点击
			if(!this.isTouchOk){return;}

			this.mytarget=e.target;
			this.mytarget.clickX = (e.touches)? e.touches[0].clientX : e.clientX;
			this.mytarget.clickY = (e.touches)? e.touches[0].clientY : e.clientY;

			this.f5();			//刷新参数
			this.savePoint(e);	//记录当前点

			//点击延时执行
			var _this=this;
			//this.clickTimeFn=setTimeout(function(){
				_this.touchStartHandlerGo();
			//},this.touchDelay);
		},
		//点击后延迟执行
		touchStartHandlerGo:function(){
			this.isTouchStarted=true;

			//注册长按事件
			this.clickLongListenerFn();

			//执行按下动作
			//
			this.clickDownEven.mytarget=this.mytarget;
			this.obj.dispatchEvent(this.clickDownEven);
			//this.clickDownHandler(e);
		},
		//移动时判断 未动 长滑
		touchMoveCondition:function(){
			var poinglength=this.points.length;
			//当前点
			var thispointx=this.points[poinglength-1].x;
			var thispointy=this.points[poinglength-1].y;
			//初始点击时的点
			var yuanpointx=this.points[0].x;
			var yuanpointy=this.points[0].y;



			if(!this.isTouchMoved){
				//规定的移动范围内算作未移动处理
				if(thispointx>=yuanpointx-this.allowMove && thispointx<=yuanpointx+this.allowMove && thispointy>=yuanpointy-this.allowMove && thispointy<=yuanpointy+this.allowMove){
					this.isTouchMoved=false;
				}else{
					this.isTouchMoved=true;
				}
			}
		},
		//移动时的处理
		touchMoveHandler:function(e){
//            e.preventDefault();
			if(!this.isTouchOk){return;}
			if(this.isTouchEnded){return;}
			if(this.isLongClicked){
				return;
			}



			//记录当前点
			this.savePoint(e);


			//判断移动超出
			this.touchMoveCondition();

			if(this.isTouchMoved){		//判断移动类型
				clearTimeout(this.clickTimeFn);
				clearTimeout(this.clickLongTimeFn);
				if(this.isTouchStarted){
					this.isTouchEnded=true;
					this.clickUpEven.mytarget=this.mytarget;
					this.obj.dispatchEvent(this.clickUpEven);
					//this.clickUpHandler(e);
				}

			}

		},
		//点击结束的处理
		touchEndHandler:function(){
			if(!this.isTouchOk){return;}
			clearTimeout(this.clickTimeFn);
			clearTimeout(this.clickLongTimeFn);
			//if(this.isTouchEnded){return;}   //move超出  没有进入滑动  结束
			if(this.isLongClicked){return;}  //长按了  结束


			this.isTouchEnded=true;


			if(this.isTouchStarted){
				var _this=this;
				if(!this.isTouchMoved){
					//延时执行
					setTimeout(function(){
						_this.clickUpEven.mytarget=_this.mytarget;
						_this.clickOkEven.mytarget=_this.mytarget;
						_this.obj.dispatchEvent(_this.clickUpEven);
						_this.obj.dispatchEvent(_this.clickOkEven);

					},200)
				}else{
					//判断是否触发移动   和   判断移动类型  this.touchSTime
					/*
					 var thistime = new Date().getTime();
					 if(thistime-this.touchSTime <= device.slideTriggerMaxTime ){
					 //执行滑动事件
					 _this.chooseSlideType();

					 }
					 */
				}
			}
		},
		//判断滑动类型
		chooseSlideType:function(){
			var thisstartpoint = this.points[0],
				pointlength = this.points.length,
				thisendpoint = this.points[pointlength-1],
				hlength = Math.abs(thisstartpoint.x - thisendpoint.x),
				vlength = Math.abs(thisstartpoint.y - thisendpoint.y),
				_this = this;

			if(hlength>vlength){
				//横向移动
				if(thisstartpoint.x > thisendpoint.x){
					//左滑
					_this.slideLeftEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideLeftEven);
				}else{
					//右滑
					_this.slideRightEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideRightEven);
				}
			}else{
				//纵向移动
				if(thisstartpoint.y > thisendpoint.y){
					//上滑
					_this.slideUpEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideUpEven);
				}else{
					//下滑
					_this.slideDownEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideDownEven);
				}
			}


		},
		savePoint:function(e){
			var touch;
			if(this.hasTouch){
				touch=e.touches[0];
			}else{
				touch=e;
			}
			this.points.push({x:touch.clientX,y:touch.clientY});
		}
	};

	var events = {
		addClickListener:function(){
			var _this=this;
			new createMyTouchEven(document);
			//clickok
			document.addEventListener("myclickok",function(e){
//                e.preventDefault();
				_this.dothis("myclickok",e);
			},false);
			//clickdown
			document.addEventListener("myclickdown",function(e){
//                e.preventDefault();
				_this.dothis("myclickdown",e);
			},false);
			//clickup
			document.addEventListener("myclickup",function(e){
//                e.preventDefault();
				_this.dothis("myclickup",e);
			},false);
			//longclick
			document.addEventListener("mylongclick",function(e){
//                e.preventDefault();
				_this.dothis("mylongclick",e);
			},false);

			/*
			 //slideup
			 document.addEventListener("myslideup",function(e){
			 e.preventDefault();
			 _this.dothis("myslideup",e);
			 },false);
			 //slidedown
			 document.addEventListener("myslidedown",function(e){
			 e.preventDefault();
			 _this.dothis("myslidedown",e);
			 },false);
			 //slideleft
			 document.addEventListener("myslideleft",function(e){
			 e.preventDefault();
			 _this.dothis("myslideleft",e);
			 },false);
			 //slideright
			 document.addEventListener("myslideright",function(e){
			 e.preventDefault();
			 _this.dothis("myslideright",e);
			 },false);
			 */

		},
		dothis:function(type,e){
			var _this=this,
				that=e.mytarget,
				isfind = false;

			var gonext = function(obj){
				var p_obj = obj.parentNode;
				handlerthis(p_obj);
			};

			var handlerthis = function(obj){
				if(!obj){ return;}
				if(obj.nodeName.toLowerCase() == "html"){ return;}

				var _eventid = obj.__bens_eventid__;

				if(_this.savefn[_eventid]){
					isfind = true;
					if(_this.savefn[_eventid][type]){
						_this.savefn[_eventid][type].call(obj,e);
					}
				}


				if(!isfind){
					gonext(obj);
				}

			};

			handlerthis(that);
		},
		savefn:{}
	};
	events.addClickListener();

	var eventBind = function(a){
		this.objs = null;               //传入的obj
		if(typeof(a) === "object"){
			if(a.length && a.length >0){
				this.objs = a;
			}else{
				this.objs = $(a);
			}
		}else{
			this.objs = $(a);
		}
		this.idArray = [];
		this.saveobj = events.savefn;
		this.init();
	};
	eventBind.prototype = {
		init:function(){
			if(this.objs.length == 0){console.log("有事件绑定失败");return;}

			var _this = this;

			//遍历对象 写入事件id
			this.objs.each(function(){
				var thisobj = this;

				if(thisobj.__bens_eventid__){
					_this.idArray.push(thisobj.__bens_eventid__);
				}else{
					var eventname = "e" + device.counter();
					thisobj.__bens_eventid__ = eventname;
					_this.idArray.push(eventname);
					_this.saveobj[eventname] = {};
				}

			});

		},
		savefn:function(fn,type){
			var data = this.idArray;

			for(var i= 0,l=data.length;i<l;i++){
				var id = data[i];
				this.saveobj[id][type] = fn;
			}
		},
		trigger:function(type){
			for(var i= 0,l=this.idArray.length;i<l;i++){
				var id = this.idArray[i];
				if( this.saveobj[id] && this.saveobj[id][type]){
					this.saveobj[id][type]();
				}
			}
			return this;
		},
		myclickok:function(callback){
			this.savefn(callback,"myclickok");
			return this;
		},
		myclickdown:function(callback){
			this.savefn(callback,"myclickdown");
			return this;
		},
		myclickup:function(callback){
			this.savefn(callback,"myclickup");
			return this;
		},
		mylongclick:function(callback){
			this.savefn(callback,"mylongclick");
			return this;
		},
		unbind:function(type){
			var data = this.idArray,
				delall = false,
				_this = this;

			if(type && typeof(type) == "boolean"){
				delall = true;
			}

			var clearAll = function(this_obj){
				var id = this_obj.__bens_eventid__;
				delete this_obj.__bens_eventid__;
				delete _this.saveobj[id];
			};


			this.objs.each(function(){
				var this_obj = this;
				if(delall){
					clearAll(this_obj);
				}else{
					delete _this.saveobj[id][type];

					//检查是否所有事件都为空
					var this_data = _this.saveobj[id],
						isnull = true;

					for(var key in this_data){
						if(this_data[key]){
							isnull = false;
							break;
						}
					}
					if(isnull){
						clearAll(this_obj);
					}
				}
			});


			return this;
		}
		/*
		 myslideup:function(callback){
		 if(callback){
		 this.events[this.name].myslideup=callback;
		 return this;
		 }
		 },
		 myslidedown:function(callback){
		 if(callback){
		 this.events[this.name].myslidedown=callback;
		 return this;
		 }
		 },
		 myslideright:function(callback){
		 if(callback){
		 this.events[this.name].myslideright=callback;
		 return this;
		 }
		 },
		 myslideleft:function(callback){
		 if(callback){
		 this.events[this.name].myslideleft=callback;
		 return this;
		 }
		 }
		 */

	};

	window.temp_event = events.savefn;
	window.$$ = function(a){
		var obj = new eventBind(a);
		obj.myclickdown(function(){
			$(this).css({opacity:"0.5"});
		}).myclickup(function(){
			$(this).css({opacity:"1"});
		});

		return obj;
		//return new eventBind(a);
	};


})();

/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:44
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */




/**
 *
 * 滑动事件  $$$
 * bens jq.mobi jq.extend device
 *
 * 返回对象
 * var a=require("slideevent");
 *
 *
 * 以下 obj为dom对象  jq或原生对象   注意：只能绑定单个对象，不能一次绑定多个对象
 * e为点击开始时的事件,滑动中为时时事件
 * 上下左右滑动触发时间为500毫秒内，从点击开始时计算，500参数可以调整
 * 函数可以连写。
 *
 *  obj = id/obj/jqobj  单个对象
 *
 * @fn a(obj).myslidedown(function(e){})            向下滑动
 * @fn a(obj).myslideup(fn)                         向上滑动
 * @fn a(obj).myslideleft(fn)                       向左滑动
 * @fn a(obj).myslideright(fn)                      向右滑动
 * @fn a(obj).mystart(fn)                           按下执行
 * @fn a(obj).mymoving(fn)                          滑动中触发，释放结束，不受500ms的限制
 * @fn a(obj).myend(fn)                             释放事件，如触发滑动则不会触发该事件
 * @fn a(obj).unbind(str)          str = myslidedown/myslideup/myslideleft/myslideright/mymoving/myend
 *                                       true:全部
 */
(function(){
	var device = DEVICE;

	var createMySlideEven=function(datas){
		var obj = datas.obj;

		this.events = datas.saveAddress;


		if(!$.isObject(obj)){console.log("滑动参数错误");return;}
		if(obj.length > 0){
			obj = obj.get(0);
		}

		this.obj=obj;

		this.slideEventJG = 500;    //释放后300秒触发一次
		this.eventobj = null;
		this.startTime=null;
		this.allowTrigerTime = 500;   //500秒内释放有效
		this.moveStartTime = 0;
		this.movefnTrigerTime = 10;     //移动事件回调10毫秒触发一次
		this.points=[];

		//this.leftSlideEven=null;
		//this.rightSlideEven=null;
		//this.upSlideEven=null;
		//this.downSlideEven=null;

		this.touchStart=null;
		this.touchMove=null;
		this.touchEnd=null;

		this.minLength=10;
		this.hasTouch=device.hasTouch;
		this.state=false;

		this.eventBind();
	};
	createMySlideEven.prototype={
		eventBind:function(){
			var _this=this;
			this.obj.addEventListener(device.START_EV,this.touchStart=function(e){_this.touchStartHandler(e);},false);
			this.obj.addEventListener(device.MOVE_EV,this.touchMove=function(e){_this.touchMoveHandler(e);},false);
			this.obj.addEventListener(device.END_EV,this.touchEnd=function(e){_this.touchEndHandler(e);},false);

			//this.leftSlideEven=document.createEvent('Event');
			//this.leftSlideEven.initEvent("myslideleft", true, true);

			//this.rightSlideEven=document.createEvent('Event');
			//this.rightSlideEven.initEvent("myslideright", true, true);

			//this.upSlideEven=document.createEvent('Event');
			//this.upSlideEven.initEvent("myslideup", true, true);

			//this.downSlideEven=document.createEvent('Event');
			//this.downSlideEven.initEvent("myslidedown", true, true);
		},
		removeEven:function(){
			this.obj.removeEventListener(device.START_EV,this.touchStart,false);
			this.obj.removeEventListener(device.MOVE_EV,this.touchMove,false);
			this.obj.removeEventListener(device.END_EV,this.touchEnd,false);
		},
		f5:function(){
			this.points=[];
		},
		touchStartHandler:function(e){
			var starttime = new Date().getTime(),
				savetime = this.startTime || 0;
			if(starttime - savetime < this.slideEventJG){
				this.startTime = starttime;
				this.state=false;
				return;
			}
			this.f5();			//刷新参数
			this.savePoint(e);	//记录当前点
			this.state=true;
			this.startTime = new Date().getTime();
			this.eventobj = e;
			if(typeof(this.events.start) === "function"){
				this.events.start.call(this.obj,e);
			}
		},
		touchMoveHandler:function(e){
			e.preventDefault();
			if(!this.state){return;}
			this.savePoint(e);

			var nowtime = new Date().getTime();
			if(typeof(this.events.move) === "function" && nowtime - this.moveStartTime > this.movefnTrigerTime){
				this.moveStartTime = nowtime;
				this.events.move.call(this.obj,e);
			}
		},
		touchEndHandler:function(e){
			var thistime = new Date().getTime();

			if(!this.state){ this.state=false; return;}
			this.state=false;
			if(this.points.length<2){ return;}


			if(!(this.startTime && thistime - this.startTime <= this.allowTrigerTime) ){

				this.triggerEndFn(e);
				return;
			}


			var lastpoint=this.points[this.points.length-1];
			var lastpointx=lastpoint.x;
			var lastpointy=lastpoint.y;

//            var startpoint=this.points[this.points.length-2];
			var startpoint=this.points[0];
			var startpointx=startpoint.x;
			var startpointy=startpoint.y;


			var pointsx=Math.abs(startpointx-lastpointx);
			var pointsy=Math.abs(startpointy-lastpointy);

			//未超过最小滑动距离
			if(pointsx<this.minLength && pointsy<this.minLength){this.triggerEndFn(e);return;}

			this.startTime = thistime;
			//判断方向
			if(pointsx>=pointsy){
				//横向滑动
				if(startpointx>lastpointx){
					//左滑
					//this.obj.dispatchEvent(this.leftSlideEven);
					if(typeof(this.events.left) === "function"){
						this.events.left.call(this.obj,this.eventobj);
					}
				}else{
					//右滑
					//this.obj.dispatchEvent(this.rightSlideEven);
					if(typeof(this.events.right) === "function"){
						this.events.right.call(this.obj,this.eventobj);
					}
				}
			}else{
				//纵向滑动
				if(startpointy>lastpointy){
					//上滑
					//this.obj.dispatchEvent(this.upSlideEven);
					if(typeof(this.events.up) === "function"){
						this.events.up.call(this.obj,this.eventobj);
					}
				}else{
					//下滑
					//this.obj.dispatchEvent(this.downSlideEven);
					if(typeof(this.events.down) === "function"){
						this.events.down.call(this.obj,this.eventobj);
					}
				}
			}
		},
		triggerEndFn:function(e){
			if(typeof(this.events.end) === "function"){
				this.events.end.call(this.obj,e);
			}
		},
		savePoint:function(e){
			var touch;
			if(this.hasTouch){
				touch=e.touches[0];
			}else{
				touch=e;
			}
			this.points.push({x:touch.screenX,y:touch.screenY});
		}
	};

	var savefn = {},
		saveobj = {};

	var eventbind = function(obj){
		obj = $.getDom(obj);

		if(!$.isObject(obj)){console.log("slide bind error");return;}

		var id;
		if(obj.__bens_slide_event_id__){
			//帮定过事件
			id = obj.__bens_slide_event_id__;
		}else{
			//没有注册监听事件
			id = device.counter();
			obj.__bens_slide_event_id__ = id;
			savefn[id] = {
				up:null,
				left:null,
				down:null,
				right:null,
				end:null,
				start:null,
				move:null
			};
			saveobj[id] = new createMySlideEven({
				obj:obj,
				saveAddress:savefn[id]
			});
		}

		this.obj = obj;
		this.id = id;
		this.saveFn = savefn[id];
	};
	eventbind.prototype = {
		myslidedown:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.down = fn;
			}
			return this;
		},
		myslideup:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.up = fn;
			}
			return this;
		},
		myslideleft:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.left = fn;
			}
			return this;
		},
		myslideright:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.right = fn;
			}
			return this;
		},
		myend:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.end = fn;
			}
			return this;
		},
		mystart:function(){
			if(typeof(fn) === "function"){
				this.saveFn.start = fn;
			}
			return this;
		},
		mymoving:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.move = fn;
			}
			return this;
		},
		unbind:function(type){
			if(type && $.isBoolean(type)){
				this._removeObj();
				return;
			}


			var new_type = null;
			switch (type){
				case "mymoving":
					new_type = "move";
					break;
				case "myend":
					new_type = "end";
					break;
				case "mystart":
					new_type = "start";
					break;
				default :
					new_type = type.replace("myslide","");
					break;
			}

			type = new_type;


			if(this.saveFn[type]){
				delete this.saveFn[type];
			}

			this._checkHasFn();
			return this;
		},
		//检查是否还有事件绑定
		_checkHasFn:function(){
			var isfind = false;
			for(var key in this.saveFn){
				if(this.saveFn[key]){
					isfind = true;
					break;
				}
			}
			if(!isfind){
				this._removeObj();
			}
		},
		//解除事件绑定
		_removeObj:function(){
			var id = this.id;
			delete savefn[id];
			saveobj[id].removeEven();
			delete saveobj[id];
			delete this.obj.__bens_slide_event_id__;
		}
	};



	window.$$$ =  function(obj){
		return new eventbind(obj);
	};
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-14
 * Time: 上午10:41
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */


//banner横向滚动动画,依赖$$点击事件



//new DEVICE.bannerAnimate({
//	win: body,                      @param:jqobj    外层窗口
//	body: $("#story_mains"),        @param:jqobj    滑动层
//	time: 2000,                     @param:number   滑动间隔时间
//	animateTime: win_width,         @param:number   滑动动画时间
//	showPoint:false,                @param:number   是否显示下面的小点
//	leftBtn:$("#story_right_btn"),  @param:jqobj    左滑动按钮
//	rightBtn:$("#story_left_btn"),  @param:jqobj    右滑动按钮
//  changeStartFn:function(page){}, @param:fn       滑动开始时执行函数，传递当前要滑动到的页面number
//  changeEndFn:function(page){}    @param:fn       滑动结束时执行函数，传递当前要滑动到的页面number
//});




DEVICE.bannerAnimate = (function () {
	var device = DEVICE;
	var scrollBanner = function (data) {
		this.win = data.win;            //包裹层
		this.body = data.body;          //移动层
		this.imgLength = this.body.find("a").length;
		this.time = data.time || 5000;      //动画间隔时间
		this.animateTime = data.animateTime || 1000;    //动画时间
		this.showPoint = $.isBoolean(data.showPoint)? data.showPoint : true;
		this.leftBtn = data.rightBtn;
		this.rightBtn = data.leftBtn;
		this.pointBg = "#999";
		this.pointSelectBg = "#fff";
		this.changeStartFn = data.changeStartFn || function(){};
		this.changeEndFn = data.changeEndFn || function(){};

		this.winWidth = parseInt(this.win.width());
		this.winHeight = parseInt(this.win.height());

		this.page = 0;
		this.maxPage = this.imgLength - 1;

		this.intervalFn = null;
		this.points = [];
		this.pointBody = null;

		this.touchStartTime = 0;
		this.touchPoints = [];
		this.leftPx = 0;
		this.init();
	};
	scrollBanner.prototype = {
		init: function () {
			this.styleSet();
			this.addPoint();
			this.setDiv();
			this.addEvent();


		},
		//设置样式
		styleSet: function () {
			this.win.css({
				position: "relative",
				overflow: "hidden"
			});

			this.body.css({
				position: "absolute",
				left: 0,
				top: 0
			});

			this.body.find("a").css({
				display: "block",
				width: this.winWidth + "px",
				height: this.winHeight + "px",
				border: "none",
				overflow: "hidden",
				"position": "relative"
			});

			this.body.find("a").css({
				float: "left",
				display: "block"
			});
		},
		//添加指示的点点
		addPoint: function () {
			var _this = this;

			var div = $("<div></div>"),
				width = _this.imgLength * 0.32,
				display = (this.showPoint)? "block" : "none";
			div.css({
				width: width + "rem",
				height: "0.16rem",
				position: "absolute",
				bottom: "0.16rem",
				left: "50%",
				"margin-left": -width / 2 + "rem",
				display:display,
				"z-index":9999
			});


			var span = $("<div></div>");
			span.css({
				width: "0.16rem",
				height: "0.16rem",
				margin: "0 0.08rem",
				background: this.pointBg,
				"border-radius": "0.16rem",
				float: "left"
				//border:"0.01rem solid transparent"
			}).addClass("border_box");

			for (var i = 0, l = this.imgLength; i < l; i++) {
				var this_item = span.clone().attr({ n: i });
				if (i == 0) {
					this_item.css({ background: this.pointSelectBg,"border-color":"#fff" })
				}
				div.append(this_item);
			}
			this.points = div.find("div");
			this.pointBody = div;

			this.win.append(div)
		},
		//设置窗口参数等
		setDiv: function () {

			this.body.stop(true, true);

			this.winWidth = parseInt(this.win.width());
			this.winHeight = parseInt(this.win.height());

			var width = this.winWidth * this.imgLength;

			this.body.css({
				width: width + "px",
				height: "100%"
			});
			this.body.find("a").css({
				width: this.winWidth + "px",
				height: "100%"
			})





		},
		//添加事件
		addEvent: function () {
			var _this = this;
			window.addEventListener("resize",_this.resizeFn = function(){
				_this.setDiv();
			},false);

			var temp_fn = function () {
				if (_this.imgLength <= 1) {
					return;
				}
				_this.intervalFn = setInterval(function () {
					_this.page++;
					_this.animate();
				}, _this.time);

				_this.animate();

			};


			if (!device.hasTouch) {
				this.win.hover(function () {
					_this.body.stop(true);
					clearInterval(_this.intervalFn);
					_this.intervalFn = null;
				}, function () {
					if (!_this.intervalFn) {
						temp_fn();
					}
				});


				this.points.mouseover(function () {
					_this.page = $(this).attr("n");
					_this.animate();
				});


				temp_fn();
			} else {
				var win_obj = this.win.get(0);
				win_obj.addEventListener(device.START_EV, _this.startEventFn = function (e) {

					_this.body.stop(true);
					clearInterval(_this.intervalFn);
					_this.leftPx = parseInt(_this.body.css("left"));
					_this.intervalFn = null;
					_this.startEvent(e);
				}, false);
				win_obj.addEventListener(device.MOVE_EV, _this.moveEventFn = function (e) {
					_this.savePoint(e);

					var lastpoint = _this.touchPoints[_this.touchPoints.length - 1];
					var lastpointx = lastpoint.x;
					var lastpointy = lastpoint.y;

					var startpoint = _this.touchPoints[0];
					var startpointx = startpoint.x;
					var startpointy = startpoint.y;

					var pointsx = lastpointx - startpointx;
					var pointsy = lastpointy - startpointy;

					if (Math.abs(pointsx) > Math.abs(pointsy)) {
						e.preventDefault();
						_this.moveEvent(e, pointsx);
					}

				}, false);
				win_obj.addEventListener(device.END_EV, _this.endEventFn = function (e) {
					_this.endEvent(e);
					if (!_this.intervalFn) {
						temp_fn();
					}
				}, false);
				temp_fn();
			}


			if(this.leftBtn){
				$$(this.leftBtn).myclickok(function(){
					_this.page++;
					_this.animate();
				});
			}

			if(this.rightBtn){
				$$(this.rightBtn).myclickok(function(){
					_this.page--;
					_this.animate();
				});
			}



		},
		//动画
		animate: function () {
			this.page = (this.page > this.maxPage) ? 0 : this.page;
			this.page = (this.page < 0)? this.maxPage : this.page;

			this.points.css({ background: this.pointBg });
			this.points.eq(this.page).css({ background: this.pointSelectBg,"border-color":"#fff"  });

			this.body.get(0).style[device._transitionDuration] = "";

			this.changeStartFn(this.page);
			var _this = this;
			this.body.cssAnimate({
				left: -this.page * this.winWidth + "px"
			}, this.animateTime,function(){
				_this.changeEndFn(_this.page);
			});

		},
		startEvent: function (e) {
			this.touchPoints = [];
			this.touchStartTime = new Date().getTime();
			this.savePoint(e);
		},
		moveEvent: function (e, pointsx) {
			if (this.touchStartTime == 0) {
				return;
			}

			var t_left = this.leftPx + pointsx;
			this.body.css({
				left: t_left + "px"
			});
		},
		endEvent: function () {
			if (this.touchStartTime == 0) {
				this.scrollBack();
				return;
			}
			if (this.touchPoints.length < 2) {
				this.scrollBack();
				return;
			}

			var end_time = new Date().getTime(),
				use_time = end_time - this.touchStartTime,
				_this = this;

			this.touchStartTime = 0;


			var lastpoint = this.touchPoints[this.touchPoints.length - 1];
			var lastpointx = lastpoint.x;
			var lastpointy = lastpoint.y;

			var startpoint = this.touchPoints[0];
			var startpointx = startpoint.x;
			var startpointy = startpoint.y;

			var pointsx = Math.abs(startpointx - lastpointx);
			var pointsy = Math.abs(startpointy - lastpointy);
			if (use_time < 500 && pointsx > 30 && pointsx > pointsy) {
				if (startpointx > lastpointx) {
					_this.page++;
					_this.page = (_this.page > _this.maxPage) ? _this.maxPage : _this.page;
					_this.animate();
				} else {
					_this.page--;
					_this.page = (_this.page >= 0) ? _this.page : 0;
					_this.animate();
				}
			} else {
				//back roll
				_this.scrollBack();
			}


		},
		savePoint: function (e) {
			var touch;
			if (device.hasTouch) {
				touch = e.touches[0];
			} else {
				touch = e;
			}
			this.touchPoints.push({ x: touch.pageX, y: touch.pageY });
		},
		scrollBack: function () {
			this.animate();
		},
		destroy:function(){





			if(this.intervalFn){
				clearInterval(this.intervalFn);
			}


			window.removeEventListener("resize",this.resizeFn,false);
			if (!device.hasTouch){
				this.win.unbind("hover");
				this.points.unbind("mouseover");
			}else{
				this.win.get(0).removeEventListener(device.START_EV,this.startEventFn,false);
				this.win.get(0).removeEventListener(device.MOVE_EV,this.moveEventFn,false);
				this.win.get(0).removeEventListener(device.END_EV,this.endEventFn,false);
			}

			if(this.leftBtn){
				$$(this.leftBtn).unbind(true);
			}

			if(this.rightBtn){
				$$(this.rightBtn).unbind(true);
			}

			this.body.get(0).style[device._transitionDuration] = "";
			this.body.css({left:0});



			this.pointBody.remove();
		}


	};
	return scrollBanner;
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-9-11
 * Time: 下午1:49
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//点击小图显示全屏图
//var a = new DEVICE.showBigPicture({
//	type:"pc",       //@param:str  写死pc,不写默认为手机使用滑动切换
//	imgs:[
//		"http://file.ynet.com/2/1509/11/10370925-500.jpg",
//		"http://file.ynet.com/2/1509/11/10370926-500.jpg"
//	]
//});

//a.showImg(0);   //0为初始显示第几张，需要自己算是点的第几张图片




DEVICE.showBigPicture = (function(){
	var showPicture = function(data){
		this.imgs = data.imgs || [];
		this.isPc = (data.type == "pc");
		this.arrowImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG+SURBVFiFvdbNi05hGMfxy3grRihjYZKEksZKsrAhWWGhlCzEhthYYM0fYCn/gJSUrbzEbmYhxcLCWI0USjE1UzN5eeZjMTaernPmOed53L+6F/fr99t9d7pOICrabjzGJK5iWc3a1q1u8oV/cxfLBy0wFNUZ7eqfjYiHEbG6Zk/z1Nidl+cZ1pZ4gsC1CokJbCghELiATiLxBptLCARO42ciMYmtJQQCxzCfSHzAzhICgUOYSSS+YG8JgcB+fEskvuNACYHAGD4nErM4XEIgsANTicQ8TpQQCIziXSLxC2dKCARG8DqR6OBiCYHAeownEnClhEBgDZ4kArNYV7Wvrho2zVxE3EvGhyNie5tq2LRdlteMiRJPcDMBw0ts+p8CQ7hTAX+qh/+GfuCr8KACfh8rezmnLXwYzyvgt//eTE9ntYGP4FUF/EbT85rCt+F9Au7gUpvbbLJ4DJ8S+A+cagNvInAQ0wl8BkfawnsVOI65BP4V+/qB9yJwzmJp7c4UdvULX0rgJBYS+FtsGQR8KYHsUxvHxkHBqa+GH7v6jyLiaERMNy2TdVlRM3c9IhYiYk8sltlbEfF7kPCIiD92sihgXGAdaAAAAABJRU5ErkJggg==";
		this.closeImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEPSURBVFiF7ZexjQIxEEW/4bQJFEALJJccHdADVVAB0bZBQBmIJg4CaICYEpDQI2CCPZ+Fh9PuWUj7JQe2v2feanfG2gCopAZFs/cAPcA7AVSSZpKCwxvMW7kiA7kxAS48dLL5M+/JvJeMV4ALYMlPfQOjhG9ke00t2wCY8ltbYNjwDG0t1rQNAAF1Ivi6sb9O7Nee2F4AAZtEkpWNWBtv3FcAPoBdIlmsnXlbBxAwBg5Pkh/M4475KoB4lNY5kfyMo+ziUbwTvtUrKP4RFi3DOpHk3xpRp63YUwXzaL6XtJB0a6zdbG2fOfunKuj0Og7g+i+oJH3aE+YOBElfko6SrrnAXoDOVLwT9gA9QHGAOyELxcimF9NPAAAAAElFTkSuQmCC";

		this.main = null;
		this.leftBtn = null;
		this.rightBtn = null;
		this.closeBtn = null;
		this.loadDom = null;
		this.imgDiv = null;

		this.nowShowDom = null;
		this.nowShowNumber = -1;
		this.canClick = true;

		this.init();
	};

	showPicture.prototype = {
		init:function(){
			this.createMain();
			this.createButton();
			this.createLoading();
			this.createImgDiv();

			if(this.isPc){
				this.eventBind();
			}else{
				this.eventBindPhone();
			}



			$("body").append(this.main);
		},
		createMain:function(){
			var div = $("<div></div>");
			div.css({
				width:"100%",
				height:"100%",
				position:"fixed",
				left:0,
				top:0,
				"z-index":"9999999",
				background:"rgba(0,0,0,0.0)",
				display:"none"
			});
			this.main = div;
		},
		createButton:function(){
			var leftBtn = null,
				rightBtn = $("<div></div>"),
				closeBtn = $("<div></div>");

			rightBtn.css3({
				position:"absolute",
				right:"10px",
				top:"50%",
				"margin-top":"-16px",
				width:"32px",height:"32px",
				background:"url('"+this.arrowImg+"') no-repeat center center",
				"background-size":"100% 100%",
				cursor:"pointer",
				transition:"all 0.2s linear",
				"z-index":10
			});
			leftBtn = rightBtn.clone().css3({
				left:"10px",right:"",
				transform:"rotate(180deg)"
			});
			closeBtn.css({
				position:"absolute",
				right:"10px",
				top:"10px",
				width:"32px",height:"32px",
				background:"url('"+this.closeImg+"') no-repeat center center",
				"background-size":"100% 100%",
				cursor:"pointer",
				transition:"all 0.2s linear",
				"z-index":10
			});


			if(this.isPc){
				this.leftBtn = leftBtn;
				this.rightBtn = rightBtn;
				this.main.append(rightBtn);
				this.main.append(leftBtn);
			}

			this.closeBtn = closeBtn;
			this.main.append(closeBtn);
		},
		createLoading:function(){
			var div = $("<div></div>");
			div.css3({
				width:"20px",height:"20px",
				"border-radius":"32px",
				border:"2px solid #fff",
				"border-top":"none",
				"border-left":"none",
				position:"absolute",
				left:"50%",
				top:"50%",
				"margin-top":"-16px",
				"margin-left":"-16px"
			});

			div.cssAnimate({
				"0%":"transform:rotate(0deg)",
				"100%":"transform:rotate(360deg)"
			},800,"ease-in",true,false);


			this.loadDom = div;
		},
		createImgDiv:function(){
			var div = $("<div class='___img_main___'></div>");
			if(this.isPc){
				div.css({
					width:"95%",height:"95%",
					position:"absolute",
					left:"2.5%",
					top:"2.5%"
				});
			}else{
				div.css({
					width:"100%",
					height:"100%",
					position:"absolute",
					left:0,top:0
				});
			}

			div.append(this.loadDom);
			this.imgDiv = div;
		},
		showImg:function(n){
			this.canClick = false;

			var show_left = (n>this.nowShowNumber)? "100%" : "-100%",
				hide_left = (n<this.nowShowNumber)? "100%" : "-100%",
				div = this.imgDiv.clone().css({left:show_left}),
				img = new Image(),
				_this = this;
			this.main.append(div);

			n = (n<0)? _this.imgs.length-1 : n;
			n = (n>= _this.imgs.length)? 0 : n;
			var src = this.imgs[n];


			//动画移除img
			this.hideImg(hide_left);

			img.onload = function(){
				//设置图片大小，位置
				_this.setImgSize(this,div);
				//清除loading
				div.find("div").remove();
				//添加图片
				div.append(this);
			};
			img.src = src;


			//第一次点开
			if(!this.nowShowDom){
				this.main.css({display:"block"});
				this.main.cssAnimate({
					"background-color":"rgba(0,0,0,0.5)"
				},500,function(){

				});
				div.css({left:0});
				if(_this.nowShowDom){
					_this.nowShowDom.remove();
				}
				_this.nowShowDom = div;
				_this.nowShowNumber = n;
				_this.canClick = true;
			}else{
				div.cssAnimate({
					left:0
				},500,function(){
					if(_this.nowShowDom){
						_this.nowShowDom.remove();
					}
					_this.nowShowDom = div;
					_this.nowShowNumber = n;
					_this.canClick = true;
				});
			}



		},
		hideImg:function(hide_left){
			if(!this.nowShowDom){return;}

			this.nowShowDom.cssAnimate({
				left:hide_left
			},500)
		},
		setImgSize:function(img,div){
			var win_width = parseInt(div.width()),
				win_height = parseInt(div.height()),
				img_width = img.width,
				img_height = img.height,
				new_size = DEVICE.getNewImageSize(img_width,img_height,win_width,win_height);

			$(img).css({
				width:new_size.width+"px",
				height:new_size.height+"px",
				position:"absolute",left:"50%",top:"50%",
				"margin-left":-new_size.width/2+"px",
				"margin-top":-new_size.height/2+"px"
			})
		},
		eventBind:function(){
			var _this = this;
			this.leftBtn.click(function(){
				if(!_this.canClick){return;}
				var n = _this.nowShowNumber - 1;
				_this.showImg(n);
			});
			this.rightBtn.click(function(){
				if(!_this.canClick){return;}
				var n = _this.nowShowNumber + 1;
				_this.showImg(n);
			});
			this.closeBtn.click(function(){
				_this.destroy();
			});
		},
		eventBindPhone:function(){
			var _this = this;

			$$$(this.main).myslideleft(function(){
				if(!_this.canClick){return;}
				var n = _this.nowShowNumber + 1;
				_this.showImg(n);
			});
			$$$(this.main).myslideright(function(){
				if(!_this.canClick){return;}
				var n = _this.nowShowNumber - 1;
				_this.showImg(n);

			});

			this.closeBtn.click(function(){
				_this.destroy();
			});
		},
		destroy:function(){
			if(this.isPc){
				this.leftBtn.unbind("click");
				this.rightBtn.unbind("click");
			}else{
				$$$(this.main).unbind(true);
			}
			this.closeBtn.unbind("click");
			this.main.remove();
		}
	};

	return showPicture;
})();/**
 * Created by beens on 15/11/16.
 */



//查看是否联网

//获取当前联网状态
//DEVICE.isOnline.state();  //返回true/false

//事件监听触发
//DEVICE.isOnline.onLineFn = function(){console.log("on")};
//DEVICE.isOnline.offLineFn = function(){console.log("off")};



DEVICE.isOnline = (function(){
    window.addEventListener("online",function(){
        a.onLineFn();
    },false);
    window.addEventListener("offline",function(){
        a.offLineFn();
    },false);

    var a = {
        state:function(){
            return window.navigator.onLine;
        },
        onLineFn:function(){},
        offLineFn:function(){}
    };

    return a;

})();/**
 * Created by beens on 15/11/23.
 */







//浏览器空闲时预加载页面、图片等 (目前chrome，firefox支持，不支持的使用无副作用)

//DEVICE.API.prefetch([
//    "http://www.baidu.com",
//    "http://www.qq.com",
//    "http://www.qq.com/123.jpg"
//]);



if(!DEVICE.API){DEVICE.API={}}
DEVICE.API.prefetch = function(urls){
    urls = urls || [];
    for(var i= 0,l=urls.length;i<l;i++){
        var this_url = urls[i];
        $("head").append("<link rel='prefetch' href='"+this_url+"' />");
    }


};



"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//ios的checkbox的  开关按钮

//new DEVICE.iosCheckBox({
//    dom:$("body"),                    //要放置的容器
//    isCheck:false,                    //默认状态是否选中
//    selectBg:"green",                 //选中后的边框颜色
//    bg:"#ccc",                        //未选中的边框颜色
//    btnBg:"#fff",                     //圆形按钮的颜色
//    btnBodyBg:"#eee",                 //关闭时圆形按钮外的背景色
//    borderWidth:3,                    //边框厚度  px
//    spd:400,                          //动画速度
//    callback:function(state){         //点击执行
//        console.log(state);           //输出选中状态 true /false
//    }
//});

DEVICE.iosCheckBox = function () {
	function checkBox(opt) {
		_classCallCheck(this, checkBox);

		this.dom = opt.dom; //要放置的容器
		this.isCheck = opt.isCheck || false; //默认状态是否选中
		this.selectBg = opt.selectBg || "green"; //选中后的边框颜色
		this.bg = opt.bg || "#ccc"; //未选中的边框颜色
		this.btnBg = opt.btnBg || "#fff"; //圆形按钮的颜色
		this.btnBodyBg = opt.btnBodyBg || "#eee"; //关闭时圆形按钮外的背景色
		this.borderWidth = opt.borderWidth || "3"; //边框宽度  px
		this.spd = opt.spd || 400; //动画速度
		this.callback = opt.callback || function () {}; //按钮点击后的回调

		this.width = parseInt(this.dom.width());
		this.height = parseInt(this.dom.height());
		this.body = null;
		this.btnBody = null;
		this.btn = null;
		this.btnBgDom = null;

		if (this.height > this.width) {
			console.log("容器非长方形，切宽必须大于高");
			return;
		}

		this.state = false;
		this.isAnimate = false;

		this._init();
	}

	_createClass(checkBox, [{
		key: "_init",
		value: function _init() {
			this._createDom();
			this._createBtn();
			this._addEvent();

			if (this.isCheck) {
				this._animate();
			}
		}
	}, {
		key: "_createDom",
		value: function _createDom() {

			if (!DEVICE.checkDomHasPosition(this.dom)) {
				this.dom.css({
					position: "relative"
				});
			}

			var div = $("<div></div>");
			div.css3({
				width: "100%",
				height: "100%",
				position: "absolute",
				top: 0, left: 0,
				"box-sizing": "border-box",
				border: this.borderWidth + "px solid " + this.bg,
				"border-radius": this.height + this.borderWidth * 2 + "px",
				"overflow": "hidden",
				background: this.selectBg
			});

			this.body = div;

			this.dom.append(div);
		}
	}, {
		key: "_createBtn",
		value: function _createBtn() {
			var body = $("<div></div>");
			body.css3({
				width: this.width + "px",
				height: this.height + "px",
				position: "absolute",
				left: 0,
				top: 0
			});

			var div = $("<div></div>");
			div.css3({
				width: this.height - this.borderWidth * 2 + "px",
				height: this.height - this.borderWidth * 2 + "px",
				background: this.btnBg,
				"box-sizing": "border-box",
				"border-radius": this.height + "px",
				//border:this.borderWidth+"px solid "+this.bg,
				position: "absolute",
				"box-shadow": this.borderWidth * 2 + "px " + this.borderWidth + "px " + this.borderWidth + "px " + this.bg,
				left: 0,
				top: 0,
				"z-index": 100
			});

			var div1 = $("<div></div>");
			div1.css3({
				width: this.width + "px",
				height: this.height + "px",
				"font-size": "0",
				position: "absolute",
				left: 0,
				top: "50%",
				"margin-top": -this.height / 2 + "px",
				background: this.btnBodyBg,
				"z-index": 80,
				"border-radius": this.height + "px"
			});

			body.append(div).append(div1);

			this.btnBody = body;
			this.btn = div;
			this.btnBgDom = div1;

			this.body.append(body);
		}
	}, {
		key: "_addEvent",
		value: function _addEvent() {
			var _this = this;
			this.dom.get(0).addEventListener(DEVICE.START_EV, function () {
				_this._animate();
			}, false);
		}
	}, {
		key: "_animate",
		value: function _animate() {
			var _this = this;

			if (this.isAnimate) {
				return;
			}

			this.isAnimate = true;
			var l = this.width - this.height;

			if (!this.state) {
				this.body.css({
					border: this.borderWidth + "px solid " + this.selectBg
				});
				this.btnBgDom.cssAnimate({
					width: this.height + "px",
					height: 0,
					"margin-top": 0,
					opacity: 0
				}, this.spd, function () {}, false, "easein", "transform");
				this.btnBody.cssAnimate({
					transform: "translateX(" + l + "px" + ")"
				}, this.spd, function () {
					_this.state = true;
					_this.isAnimate = false;
					_this.callback(true);
				}, false, "easein", "transform");
			} else {
				this.body.css({
					border: this.borderWidth + "px solid " + this.bg
				});
				this.btnBgDom.cssAnimate({
					width: this.width + "px",
					height: this.height + "px",
					"margin-top": -this.height / 2 + "px",
					opacity: 1
				}, this.spd, function () {}, false, "easein", "transform");
				this.btnBody.cssAnimate({
					transform: "translateX(0)"
				}, this.spd, function () {
					_this.state = false;
					_this.isAnimate = false;
					_this.callback(false);
				}, false, "easein", "transform");
			}
		}
	}]);

	return checkBox;
}();

//# sourceMappingURL=ios_check_box-compiled.js.map




/**
 * Created by beens on 15/12/23.
 */


//touch滑动事件封装（简单版）
//var a = new DEVICE.touchSlideEvent({
//    dom:$("#div"),          //@param:jqobj   要监听的dom
//    startFn:function(){},   //@param:fn      手指按下时执行
//    moveFn:function(opt){   //@param:fn      手指滑动时执行
//        //opt.start.x   初始点 x，y
//        //opt.start.y
//        //opt.end.x     当前点 x ，y
//        //opt.end.y
//        //opt.move.x    当前点到初始点的距离  x ，y
//        //opt.move.y
//    },
//    endFn:function(opt,isSlide){    //@param：fn  手指释放的时候执行
//        //opt同上
//        //isSlide   布尔，是否触发快速滑动
//    },
//    slideLeftFn:function(){},     //@param:fn   快速左滑促发
//    slideRightFn:function(){},    //@param:fn   快速右滑促发
//    slideUpFn:function(){},       //@param:fn   快速上滑促发
//    slideDownFn:function(){},     //@param:fn   快速下滑促发
//    slideMaxTime:500,       //@param：number  触发快速滑动的最大时间 默认：500 ms
//    useDirection:"x"        //@param:str    "x","y","xy"
//                            //使用哪个方向的滑动   默认：x
//});

//销毁
//a.destroy();



DEVICE.touchSlideEvent = (function(){
	var touch = function(opt){
		opt = opt || {};
		this.dom = opt.dom || $("body");

		this.startFn = opt.startFn || function(){};
		this.moveFn = opt.moveFn || function(){};
		this.endFn = opt.endFn || function(){};
		this.slideLeftFn = opt.slideLeftFn || function(){};
		this.slideRightFn = opt.slideRightFn || function(){};
		this.slideUpFn = opt.slideUpFn || function(){};
		this.slideDownFn = opt.slideDownFn || function(){};

		this.slideMaxTime = opt.slideMaxTime || 500;
		this.useDirection = opt.useDirection || "x";   // x,y,xy


		this.touchStartFn = null;
		this.touchMoveFn = null;
		this.touchEndFn = null;
		this.points = [];
		this.isTouched = false;
		this.touchTime = 0;

		this.init();
	};
	touch.prototype = {
		init:function(){
			this.addEvent();
		},
		addEvent:function(){
			var obj = this.dom.get(0),
				_this = this;

			obj.addEventListener(DEVICE.START_EV,this.touchStartFn = function(e){
				_this.start(e);
			},false);
			document.addEventListener(DEVICE.MOVE_EV,this.touchMoveFn = function(e){
				_this.move(e);
			},false);
			document.addEventListener(DEVICE.END_EV,this.touchEndFn = function(e){
				_this.end(e)
			},false);
		},
		start:function(e){
			this.isTouched = true;
			this.clearPoint();
			this.savePoint(e);
			this.touchTime = new Date().getTime();
			this.startFn();
		},
		move:function(e){
			if(!this.isTouched){return;}
			//e.preventDefault();
			//e.stopPropagation();

			this.savePoint(e);

			if(this.points.length<2){return;}

			var points = this.getStartAndEndPoint(),
				move_x = Math.abs(points.move.x),
				move_y = Math.abs(points.move.y);

			if(this.useDirection == "x"){
				if(move_x > move_y){
					e.preventDefault();
					this.moveFn(points);
				}
			}else if(this.useDirection == "y"){
				if(move_y > move_x){
					e.preventDefault();
					this.moveFn(points);
				}
			}else{
				e.preventDefault();
				this.moveFn(points);
			}
		},
		end:function(){
			if(!this.isTouched){return;}
			this.isTouched = false;
			var time = new Date().getTime(),
				points = this.getStartAndEndPoint(),
				notSlide = (time - this.touchTime > this.slideMaxTime);
			this.endFn(points,!notSlide);

			//超时不触发滑动
			if(notSlide){return;}

			var m_x = points.move.x,
				m_y = points.move.y,
				is_x_long = (Math.abs(m_x) >= Math.abs(m_y));

			//右滑
			if(m_x>0 && is_x_long){
				if(this.useDirection != "y"){
					this.slideRightFn();
				}
			}
			//左滑
			if(m_x<0 && is_x_long){
				if(this.useDirection != "y") {
					this.slideLeftFn();
				}
			}
			//上滑
			if(m_y<0 && !is_x_long){
				if(this.useDirection != "x") {
					this.slideUpFn();
				}
			}
			//下滑
			if(m_y>0 && !is_x_long){
				if(this.useDirection != "x") {
					this.slideDownFn();
				}
			}


		},
		savePoint:function(e){
			var touch = (e.touches)? e.touches[0] : e;
			this.points.push({x:touch.clientX,y:touch.clientY});
		},
		clearPoint:function(){
			this.points = [];
		},
		getStartAndEndPoint:function(){
			var sPoint = this.points[0],
				len = this.points.length,
				ePoint = this.points[len-1],
				moveX = ePoint.x - sPoint.x,
				moveY = ePoint.y - sPoint.y;

			return {
				start:sPoint,
				end:ePoint,
				move:{
					x:moveX,
					y:moveY
				}
			}
		},
		destroy:function(){
			this.dom.get(0).removeEventListener(DEVICE.START_EV,this.touchStartFn,false);
			document.removeEventListener(DEVICE.MOVE_EV,this.touchMoveFn,false);
			document.removeEventListener(DEVICE.END_EV,this.touchEndFn,false);
		}
	};
	return touch;
})();



/*
 * Filename :
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:16
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//获取地址栏参数
DEVICE.getParamFromUrl = function(param){
	var find_val = "";

	var search = window.location.search;
	search = search.substr(1);
	var searchs = search.split("&");

	for( var i= 0,l=searchs.length;i<l;i++){
		var this_val =  searchs[i],
			this_keys = this_val.split("="),
			this_key = this_keys[0];

		if(this_key == param){
			find_val = this_keys[1];
			break;
		}
	}
	return decodeURI(find_val);

};


DEVICE.stamp2date = function (b) {
	b = b || new Date().getTime();
	var a = new Date(parseInt(b));
	var year = a.getFullYear();
	var month = parseInt(a.getMonth()) + 1;
	month = (month < 10) ? "0" + month : month;
	var date = a.getDate();
	date = (date < 10) ? "0" + date : date;
	return year + "-" + month + "-" + date;
};




//窗口隐藏后显示时执行
//DEVICE.windowShowRun(function(){
//    console.log(123)
//});

(function(){
	var isHiddened = false,
		fn = [];

	if(DEVICE.isAndroid){
		//原生提供
		window.addEventListener('view_visibilitychange', function(e) {
			for(var i= 0,l=fn.length;i<l;i++){
				fn[i]();
			}
		}, false);
	}else{
		document.addEventListener('visibilitychange', function(e) {
			if(document.hidden){
				isHiddened = true;
			}else{
				if(isHiddened){
					for(var i= 0,l=fn.length;i<l;i++){
						fn[i]();
					}
				}
			}
		}, false);
	}



	DEVICE.windowShowRun = function(callback){
		callback = callback || function(){};
		fn.push(callback);
	};
})();