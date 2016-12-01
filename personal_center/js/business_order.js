/**
 * Created by Administrator on 2016/10/19.
 */
/**
 * Created by Administrator on 2016/10/17.
 */

var PAGE = {

	init: function() {

		this.clickElement(); //跳转链接
		this.isHerf(); //是否跳转
		this.infoInitial(); //初始化数据
	},
	clickElement: function() {

		$('.bar_header .tabs').click(function() {
			$('.bar_header .tabs').removeClass('hover');
			$(this).addClass("hover");
			//window.location.hash = $(this).index();
			JK.urlHash($(this).index());
			PAGE.HandleFunc.bar_header_click($(this))
			JK.setTitle("业务订单");
		});
		//订单点击
		$('#wait_pay').on('click', '.commodity_list', function() {
			JK.backRefreshPage();
			var string = PAGE.getInfoToPay($(this));
			JK.openUrl(basePath + "business_Info.html?" + string)
		})

	},
	//获取订单详情
	getInfoToPay: function(_this) {

		var outTrade_no = _this.attr("proID"); //订单号
		var subject = _this.attr("proName"); //名字
		var chargeUnitType = _this.attr("proType"); //名字
		var timeStart = _this.attr("proTime"); //下单时间
		var totalFee = _this.attr("proPrice"); //总价
		var howMany = _this.attr("proHowMany"); //次数
		var expirationTime = _this.attr("proExPirationTime"); //包月到期时间

		return "outTrade_no=" + outTrade_no + "&subject=" + subject + "&chargeUnitType=" + chargeUnitType +
			"&timeStart=" + timeStart + "&totalFee=" + totalFee + "&howMany=" + howMany + "&expirationTime=" + expirationTime
	}

	,
	//处理事件
	HandleFunc: {

		//顶部点击事件
		bar_header_click: function(_this) {			
			if(_this.hasClass('wait_pay')) {
				PAGE.HandleFunc.showWait();
			} else {
				PAGE.HandleFunc.showAlredy();
			}

		},
		showWait: function() {
			$('.bar_header>.tabs').removeClass('hover');
			$('.pending_pay_group').css("display", "none");
			$('#wait_pay').css("display", "block");
			PAGE.HandleFunc.waitAddClass()
		},
		showAlredy: function() {
			$('.bar_header>.tabs').removeClass('hover');
			$('.pending_pay_group').css("display", "none");
			$('#Already_pay').css("display", "block");
			PAGE.HandleFunc.AlreadyPayAddClass()
		},
		waitAddClass: function() {
			$('.wait_pay').addClass('hover')
		},
		AlreadyPayAddClass: function() {
			$('.Already_pay').addClass('hover')
		}

	},
	isHerf: function() {

		var urlJSON = PAGE.getUrl();
		for(var key in urlJSON) {
			if(key == "businessList") {
				if(urlJSON[key] == "1") {
					PAGE.HandleFunc.showWait();
				} else {
					PAGE.HandleFunc.showAlredy();
				}
			} else {
				PAGE.HandleFunc.showWait();
			}
		}

	},
	getUrl: function() {
		var find_val = "";
		var paramJson = {};

		var search = window.location.search;
		search = search.substr(1);
		var searchs = search.split("&");

		for(var i = 0, l = searchs.length; i < l; i++) {
			var this_val = searchs[i],
				this_num = this_val.indexOf('='),
				this_key = this_val.substr(0, this_num),
				this_vals = this_val.substr(this_num + 1, this_val.length - 1);
			paramJson[this_key] = decodeURI(this_vals);
		}
		return paramJson;
	},
	tabsFunction: function(url_hash) { //初始切换tabs
		$('.bar_header .tabs').removeClass("hover")
		if(url_hash == "") {
			$(".bar_header .tabs:eq(0)").addClass("hover");
		} else {
			$(".bar_header .tabs:eq(" + window.location.hash.substr(1) + ")").addClass("hover");
		}
	},
	infoInitial: function() {
		var url_hash = window.location.hash.substr(1);
		PAGE.tabsFunction(url_hash)
		JK.user.getInfo(function(res) {
			if(!res.token) {
				JK.reLogin();
				return;
			}
			var data = {
				token: res.token
			};
			AJAX.go1("servicePort/orderDetail.do", data, function(res) {
				PAGE.addData(res.data);
			})

		})

	},
	addData: function(res) {

		var arrary1 = []; //已经支付
		var arrary2 = []; //待支付
		for(var i = 0; i < res.length; i++) {
			if(res[i].tradeStatus == 1) {
				arrary1.push(res[i])
			} else {
				arrary2.push(res[i])
			}
		}
		//获取URL参数判断是待支付还是已支付 1.已支付
		var id = window.location.hash.substr(1);
		$(".pending_pay_group").hide();
		if(id==1){
			$(".pending_pay_group:eq(1)").show();
		}else{
			$(".pending_pay_group:eq(0)").show();
		}
		PAGE.addDom.addPayd(arrary1); //已经支付
		PAGE.addDom.addWait(arrary2); //待支付

	},
	hasString: function(string, init) {
		var i = string.indexOf(init);
		if(i == 0) {
			return false;
		} else {
			return true;
		}
	},
	addDom: {
		addWait: function(res) {
			if(res.length == 0) {
				JK.noListShow.business($('#wait_pay'));
				return;
			}
			var dom_div = $('#wait_pay_list');
			for(var i = 0; i < res.length; i++) {
				var type = {
					"1": "计次",
					"2": "计时",
					"3": "代收"
				};
				var domClone = dom_div.clone();
				domClone.removeAttr('id');
				domClone.css('display', "block");
				domClone.attr('proID', res[i].outTrade_no); //订单号
				domClone.attr('proName', res[i].subject); //名字
				domClone.attr('proType', res[i].chargeUnitType); //类型
				domClone.attr('proTime', res[i].timeStart); //下单时间
				domClone.attr('proPrice', res[i].totalFee); //总价
				domClone.attr('proHowMany', res[i].howMany); //次数
				domClone.attr('proExPirationTime', res[i].expirationTime); //包月到期时间

				domClone.find('.startTime').text(res[i].timeStart); //下单时间
				domClone.find('.pro_title').text(res[i].subject); //标题
				domClone.find('.commodity_price_price').text(res[i].extraServiesDesc); //业务简介
				domClone.find('.getType').text('收费类型 ：' + type[res[i].chargeUnitType]); //业务简介

				$('#wait_pay').append(domClone);
			}
		},
		addPayd: function(res) {
			if(res.length == 0) {
				JK.noListShow.business($('#Already_pay'));
				return;
			}
			var domDiv = $('#Already_pay_list');
			for(var i = 0; i < res.length; i++) {
				var type = {
					"1": "计次",
					"2": "计时",
					"3": "代收"
				};
				var domClone = domDiv.clone();
				domClone.removeAttr('id');
				domClone.css('display', "block");
				domClone.find('.startTime').text(res[i].timeStart); //下单时间
				domClone.find('.pro_title').text(res[i].subject); //标题
				domClone.find('.commodity_price_price').text(res[i].extraServiesDesc); //业务简介
				domClone.find('.getType').text('收费类型 ：' + type[res[i].chargeUnitType]); //业务简介

				//var dom = '<div class="commodity_list">'+
				//'<div class="commodity_list_top">'+
				//'<span>下单时间:</span>'+
				//'<span>'+res[i].timeStart+'</span>'+
				//'</div>'+
				//'<div class="commodity_pro box_h center_s">'+
				//'<div class="commodity_pro_text boxflex1">'+
				//'<span class="diandian">'+res[i].subject+'</span>'+
				//'<div class="commodity_price">'+
				//'<span class="ywjianj">业务简介 ：</span>'+
				//'<p class="commodity_price_price diandian23">'+res[i].extraServiesDesc+'</p>'+
				//'</div>'+
				//'</div>'+
				//'</div>'+
				//'<div class="bottom_button">'+
				//'<span>收费类型：'+type[res[i].chargeUnitType]+'</span>'+
				//'</div>'+
				//'<div class="tiao"></div>'+
				//'</div>';

				$('#Already_pay').append(domClone);
			}
		}
	}

};