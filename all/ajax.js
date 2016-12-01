var AJAX = {
	go: function(url, data, success, error) {
		url = SYS.serverUrl + url;

		var notShowLoad = data.notShowLoad || false;
		if(!notShowLoad){
			JK.loading.show("急速加载中");
		}


		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 60000,
			success: function(rs) {
				if(!notShowLoad){
					JK.loading.hide();
				}


				var state = rs.status;
				if(state == 1) {

					var data = rs.data;

					success(data);
				} else {
					var errCode = rs.code;
					//token过期  或  未登陆
					if(errCode == "032") {
						if(error) {
							error();
							return;
						}
						JK.reLogin();
					} else {
						var msg = rs.codeMsg;

						JK.info.showError(msg);
					}
				}
			},
			error: function() {
				if(!notShowLoad){
					JK.loading.hide();
					JK.noListShow.netWorkErr();
				}

				//JK.info.showError("请检查网络");
			}
		});
	},
	errorBack: function(rs) {
		if(rs.stateCode) {
			return true;
		}
		return false;
	},
	go1: function(url, data, success) {
		url = SYS.serverUrl + url;
		JK.loading.show("急速加载中");
		var _this = this;
		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 60000,
			success: function(rs) {
				JK.loading.hide();
				var state = rs.stateCode;
				if(state == "success") {
					var data = rs;
					success(data);
				} else {
					if(state && !(state.indexOf("032")>-1)){
						JK.info.showError(ErrorMsg[state]?ErrorMsg[state]:"未知错误");
						return;
					}
					//JK.info.showError(ErrorMsg[rs.stateCode]);
					var errCode = rs.code;
					//token过期  或  未登陆
					if(errCode == "032"||state=="error-032") {
						JK.reLogin();
					} else {
						var msg = rs.codeMsg ||rs.msg||rs.stateCode|| "网络错误";
						JK.info.showError(msg);
					}
				}
			},
			error: function() {
				JK.loading.hide();
				JK.noListShow.netWorkErr();
				//JK.info.showError("请检查网络");
			}
		});
	},
	go2: function(url, data, success) {
		//url = "" + url;
		JK.loading.show("急速加载中");
		var _this = this;
		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 60000,
			success: function(rs) {
				JK.loading.hide();
				var state = rs.stateCode;
				success(rs);
			},
			error: function() {
				JK.loading.hide();
				JK.noListShow.netWorkErr();
				//JK.info.showError("请检查网络");
			}
		});
	},
	//商品详情  opt={}
	mallList: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("commodity/getCommodity.do", data, success);
	},
	//具体商品信息  opt={id:1}
	mallInfo: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("commodity/getCommodity.do", data, success);
	},
	//获取设定的默认地址  opt={token:""}
	getDefaultAddress: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("buyring/getCurrAddrdd.do", data, success);
	},
	//获取地址列表 opt={token:""}
	getAddress: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("buyring/getAddressByUserId.do", data, success);
	},
	//根据id获取地址  opt={addressId:id}
	getAddressById: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("buyring/getAddressById.do", data, success);
	},
	//删除地址   opt={addressId:""}
	delAddress: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("buyring/delAddressById.do", data, success);
	},
	//保存地址  id为空新增
	//data:{
	//    token:SYS.userToken,
	//    id:id,
	//    userName:name,
	//    phoneNum:phone,
	//    zipCode:"610000",
	//    streetAddress:address,
	//    isdefault:(select)? 1: 0
	//}
	saveAddress: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("buyring/saveAddress.do", data, success);
	},
	//获取新信息数量   opt={token:""}
	getNewMsgNumber: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		data.notShowLoad = true;

		this.go("servicePort/messageCount.do", data, success);
	},
	//检查token  opt={token:""}
	checkToken: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {},
			error = opt.error || function() {};

		data.notShowLoad = true;

		this.go("login/checkToke.do", data, success, error);
	},
	//获取商城banner
	getMallBanner:function(opt){
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("commodity/getCommodityBanner.do", data, success);
	},
	//删除信息
	delMessage:function(opt){
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("servicePort/Delmessage.do", data, success);
	}


};
