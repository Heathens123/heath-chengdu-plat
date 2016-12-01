/**
 * Created by Administrator on 2016/10/17.
 */
var PAGE = {
	data: [],
	init: function() {
		this.infoInitial.getUserInfo(); //初始化关系
		this.infoInitial.clickFunc(); //点击选择关系
		this.submitUserInfo(); //验证用户并保存关系
	},
	UserInfo: "",
	submitUserInfo: function() {

		var submit_btn = $("#submit_btn");
		$$(submit_btn).myclickok(function() {
			if($("#select_gx .info").html() == "请选择") {
				JK.alert("提示", "请选择关系!");
				return;
			}
			JK.user.getInfo(function(res) {
				if(!res.token) {
					JK.openUrl("login/index.html");
					return;
				};
				var data = PMZ_all.getUrl();
				var data = {
					relation: $("#select_gx .info").attr("data-id"), //关系
					token: res.token, //用户token
					memberId: data.Member_userId //验证用户的ID
				}
				AJAX.go1("family_saveRelation.do", data, function(data) {
					if(data.stateCode == "success") {
						JK.alert("提示", "保存成功!", function() {
							JK.openUrl(SYS.localUrl+"personal_center/myFamily.html")
						})
					}
				})
			})
		})
	},
	//初始化
	infoInitial: {
		getUserInfo: function() {

			var data = PMZ_all.getUrl();
			PAGE.addData(data);

		},
		clickFunc: function() {

			//选择关系按钮
			var objData, datapush = [];
			AJAX.go1("family_getFamilyRelation.do", "", function(res) {
				objData = res.data;
				for(i = 0; i < res.data.length; i++) {
					var data = {};
					data["key"] = res.data[i].id;
					data["val"] = res.data[i].cnName;
					datapush.push(data)
				};
			});

			$('#select_gx').click(function() {
				var _this = $(this);
				JK.select("与我的关系", "", datapush, function(key) {
					if(key) {
						for(i = 0; i < objData.length; i++) {
							if(objData[i].id == key) {
								_this.find(".info").attr("data-id",objData[i].subCode).text(objData[i].cnName);
								continue;
							}
						}
					}
				})

			})

			//添加家庭成员

		}
	},
	addData: function(data) {

		$('#account').find('.info').text(data.Member_account);
		$('#Name').find('.info').text(data.Member_name);
		$('#sex').find('.info').text(data.Member_sex);
		$('#PhoneNum').find('.info').text(data.Member_phoneNumber);
		$('#idCard').find('.info').text(data.Member_sex);
		$('#bornDate').find('.info').text(data.Member_bornDate);

	}

};