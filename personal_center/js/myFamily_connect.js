var PAGE = {
	init: function() {
		this.getUserInfo(); //信息初始化
		this.clickExit(); //退出家庭
	},
	//初始化
	getUserInfo: function() {
		//户主信息
		var _this = this;
		var res = PMZ_all.getUrl();
		//var id = DEVICE.getParamFromUrl("id");
		$(".commodity_pro_img").attr("src", (res.headImg ? res.headImg : "")); //户主头像
		$(".jz_name").html(res.areaName); //户主姓名
		$(".commodity_price>span").html(res.idCard); //户主身份证
		$(".commodity_list .jz_phoneNum").html(res.phoneNumber); //户主手机号
		JK.user.getInfo(function(rs) {
			if(!rs.token) {
				JK.reLogin();
			}
			var data = {
				token: rs.token,
				memberId: res.userId
			}
			AJAX.go1("family_getMemberInfo.do", data, function(resT) {
				PAGE.dataInfoBind(resT.data);
			})
		});
	},
	dataInfoBind: function(resT) {
		var root_set_ul = $("#list_pro");
		var select_left_right0 = root_set_ul.find("li:eq(0)");
		var select_left_right1 = root_set_ul.find("li:eq(1)");
		var select_left_right2 = root_set_ul.find("li:eq(2)");
		var select_left_right3 = root_set_ul.find("li:eq(3)");
		var select_left_right4 = root_set_ul.find("li:eq(4)");
		for(var i = 0; i < resT.rightList.length; i++) {
			var data = resT.rightList[i];
			if(data.cnName == "个人档案" && data.state) {
				select_left_right0.show().click(function() {
					//JK.openUrl("");
				});
			} else if(data.cnName == "就诊记录" && data.state) {
				select_left_right1.show().click(function() {
					//JK.openUrl("");
				});
			} else if(data.cnName == "预约挂号" && data.state) {
				select_left_right2.show().click(function() {
					//JK.openUrl("");
				});
			} else if(data.cnName == "图文咨询" && data.state) {
				select_left_right3.show().click(function() {
					//JK.openUrl("");
				});
			} else if(data.cnName == "计免记录" && data.state) {
				select_left_right4.show().click(function() {
					//JK.openUrl("");
				});
			}
		}
	},
	clickExit: function() {
		var add_peo = $("#add_peo");
		$$(add_peo).myclickok(function() {
			JK.user.getInfo(function(rs) {
				if(!rs.token) {
					JK.reLogin();
				}
				var userId = DEVICE.getParamFromUrl("userId");
				var data = {
					token: rs.token,
					memberId: userId
				};
				AJAX.go1("family_delMemberByMemberId.do", data, function(resT) {
					if(resT.stateCode == "success") {
						JK.openUrl(SYS.localUrl + "personal_center/myFamily.html");
					} else {
						JK.alert("退出家庭成员失败!");
					}
				});
			});
		});
	}
};