var topRightBtnClick = function() {
	JK.openUrl("login/forget_pwd.html");
};
var PAGE = {
	init: function() {
		this.addLogin(); //修改密码
	},
	addLogin: function() {
		//修改密码
		var log_but = $(".log_but");
		$$(log_but).myclickok(function() {
			
			var valpwd = $("#valpwd").val().trim(), //旧密码
				newpwd = $("#newpwd").val().trim(), //新密码
				okpwd = $("#okpwd").val().trim(), //确认密码
				validation = $("#validation").val().trim(); //验证码

			if (!PAGE.verCode()) return; //验证输入信息
			valcode.code=validation;
			JK.user.getInfo(function(res) {
				if(!res.token){ JK.reLogin();return};//判断用户登录状态
				var data = {
					"password": newpwd,
					"oldpass":valpwd,
					"jsonver": JSON.stringify(valcode),					
					"token": res.token,
					"encryption":1
				};
				AJAX.go1("modpass.do", data, function(data) {
					//if (data.stateCode == "success" && data.code === undefined && data.code != 307) {
					if(data.stateCode=="success"){
						JK.alert("提示", "修改密码成功!", function() {
							JK.goBack();
						});
					} else {
						JK.alert("提示", data.codeMsg);
					}
				});

			});
		});
	},
	verCode: function() { //验证
		var _this = this;
		var valpwd = $("#valpwd").val().trim(), //旧密码
			newpwd = $("#newpwd").val().trim(), //新密码
			okpwd = $("#okpwd").val().trim(), //确认密码
			validation = $("#validation").val().trim(); //验证码
		if (valpwd === "") {
			$("#valpwd").addClass("error").focus(function() {
				$(this).removeClass("error");
			});
			JK.alert("提示", "输入密码错误!");
			return false;
		 } else if (newpwd === ""||newpwd.length<6||newpwd.length>18) {
            $("#newpwd").addClass("error").focus(function() {
                $(this).removeClass("error");
            });
            JK.alert("提示", "密码长度6到18个字符");
            return false;
		} else if (newpwd != okpwd) {
			$("#okpwd").addClass("error").focus(function() {
				$(this).removeClass("error");
			});
			JK.alert("提示", "两次输入的密码不一致!");
			return false;
		} else if (validation === "" || !(/^\d{5}$/.test(validation))||!valcode) {
			$("#validation").addClass("error").focus(function() {
				$(this).removeClass("error");
			});
			JK.alert("提示", "验证码输入错误!");
			return false;
		}
		return true;
	}
};