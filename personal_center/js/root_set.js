/**
 * Created by Administrator on 2016/10/17.
 */
var topRightBtnClick = function() {
	PAGE.btnSave();
};
var PAGE = {
	init: function() {
		this.getUserInfo(); //信息初始化
	},
	UserInfo: "",
	//初始化
	getUserInfo: function() {
		var _this = this;
		var res = PMZ_all.getUrl(); 
		//var id = DEVICE.getParamFromUrl("id");
		$(".commodity_pro_img>img").attr("src", (res.headImg ? (SYS.serverUrl+res.headImg) : "")); //户主头像
		$(".jz_name").html(res.name); //户主姓名
		$(".commodity_price>span").html(res.idCard); //户主身份证
		$(".commodity_list .jz_phoneNum").html(res.phoneNumber); //户主手机号
		JK.user.getInfo(function(rs) {
			if(!rs.token) {
				JK.reLogin();
			}
			var data = {
				token: rs.token,
				userId: res.id
			};
			AJAX.go1("familyRight_getUserRightList.do", data, function(resT) {
				PAGE.dataInfoBind(resT);
			});
		});
	},
	dataInfoBind:function(resT) {
		var root_set_ul = $(".root_set_ul");
		var select_left_right0=root_set_ul.find(".select_left_right:eq(0)");
		var select_left_right1=root_set_ul.find(".select_left_right:eq(1)");
		var select_left_right2=root_set_ul.find(".select_left_right:eq(2)");
		var select_left_right3=root_set_ul.find(".select_left_right:eq(3)");
		var select_left_right4=root_set_ul.find(".select_left_right:eq(4)");
		for(var i = 0; i < resT.dicDatalist.length; i++) {
			var data = resT.dicDatalist[i];
			
			if(data.cnName == "个人档案") {
				select_left_right0.attr({
					"set_id": data.id,
					"state": data.state,
					"subCode": data.subCode
				});
//				root_set_ul.find("li:eq(0)").click(function(){
//					PAGE.btnSave();
//				});
				PAGE.CheckBox(select_left_right0, data.state);

			} else if(data.cnName == "就诊记录") {
				select_left_right1.attr({
					"set_id": data.id,
					"state": data.state,
					"subCode": data.subCode
				});
				PAGE.CheckBox(select_left_right1, data.state);
			} else if(data.cnName == "预约挂号") {
				select_left_right2.attr({
					"set_id": data.id,
					"state": data.state,
					"subCode": data.subCode
				});
				PAGE.CheckBox(select_left_right2, data.state);
			} else if(data.cnName == "图文咨询") {
				select_left_right3.attr({
					"set_id": data.id,
					"state": data.state,
					"subCode": data.subCode
				});
				PAGE.CheckBox(select_left_right3, data.state);
				
			} else if(data.cnName == "计免记录") {
				select_left_right4.attr({
					"set_id": data.id,
					"state": data.state,
					"subCode": data.subCode
				});
				PAGE.CheckBox(select_left_right4, data.state);
			}
			//root_set_ul.append(ul_list);
		}
	},
	CheckBox: function(obj, state) {
		new DEVICE.iosCheckBox({
			dom: obj, //要放置的容器
			isCheck: state, //默认状态是否选中
			selectBg: "#5856d6", //选中后的边框颜色
			bg: "#e5e5e5", //未选中的边框颜色
			btnBg: "#fff", //圆形按钮的颜色
			btnBodyBg: "#fff", //关闭时圆形按钮外的背景色
			borderWidth: 3, //边框厚度  px
			spd: 400, //动画速度
			callback: function(state) { //点击执行
				obj.attr("state", state);
			}
		});
	},
	btnSave: function() {
		var idNum = PAGE.getId();
		JK.user.getInfo(function(res) {
			if(!res.token) {
				JK.reLogin();
			}
			var data = {
				userId: DEVICE.getParamFromUrl("id"),
				token: res.token,
				rightList:JSON.stringify(idNum.array)
			};
			AJAX.go1("familyRight_setUserIdRight.do", data, function(res) {
				if(res.stateCode == "success") {
					JK.alert("提示","保存成功!",function(){
						JK.openUrl("personal_center/myFamily.html");
					})
				}else{
					JK.alert("提示","设置权限失败!");
				}
			});
		});
	},
	getId: function() {
		var string = "";
		var array = [];
		$('.root_set_ul .select_left_right').each(function(e) {
			if($(this).attr("state")=="true") {
				string += $(this).attr("subCode") + ",";
				array.push({"subCode":$(this).attr("subCode")});
			}
		});
		var stringS = string.substring(0, string.length - 1);
		var data = {
			string: stringS,
			array: array
		};
		return data;
	}

};