var pageUrl = "";
var valcode;
var PAGE = {
	init: function() {
		this.forgotpwd(); //注册
		this.closeB(); //关闭当前页面
	},
	forgotpwd: function() {

		//注册
		var log_but = $(".log_but");
		$$(log_but).myclickok(function() {
			var tel = $("#tel").val().trim(), //手机号码
				validation = $("#validation").val().trim(), //验证码
				pwd = $("#pwd").val().trim(); //密码
			if(!PAGE.verCode()) return; //验证输入信息
			//注册ajax
			JK.getVer(function(res) {
				valcode.code = validation; //验证码赋值到对象的code
				var data = {
					"password": pwd,
					"apptype": "2",
					"phone": tel,
					"code": validation,
					"codeToken": valcode.token
				};
				AJAX.go1("user/register.do", data, function(data) {
					if(data.stateCode == "success") {//注册成功
						JK.user.login(tel, pwd, function(data) {//注册成功登陆账号
						}, function(error) {
							JK.alert("提示", error.result.errMsg);
						});
					} else {
						JK.info.showError(ErrorMsg[data.stateCode]);
					}
				});

			});
		});
	},
	verCode: function() { //验证
		var _this = this;
		var tel = $("#tel").val().trim(), //手机号码
			validation = $("#validation").val().trim(), //验证码
			pwd = $("#pwd").val().trim(); //密码
		if(tel === "" || !(/^[1][3578][0-9]{9}$/.test(tel))) {
			$("#tel").addClass("error").focus(function() {
				$(this).removeClass("error");
			});
			JK.alert("提示", "输入手机号码错误!");
			return false;
		} else if(pwd === "" || pwd.length<6||pwd.length>18) {
			$("#pwd").addClass("error").focus(function() {
				$(this).removeClass("error");
			});
			JK.alert("提示", "密码长度6到18个字符");
			return false;
		} else if(validation === "" || !(/^\d{5}$/.test(validation))) {
			$("#validation").addClass("error").focus(function() {
				$(this).removeClass("error");
			});
			JK.alert("提示", "验证码输入错误!");
			return false;
		} else if(!valcode) {
			JK.alert("提示", "未获取验证码!");
			return false;
		}
		return true;
	},
	closeB: function() {
		if(!DEVICE.isAndroid) {
			$(".close").css("top", "0.84rem");
		}
		$(".close").click(function() {
			JK.rollBack();
		});
		$(".rl_back_login a").click(function() {
			JK.goBack();
		});
		//隐私条约
		$(".agreement").click(function() {
			JK.openUrl('login/agreement.html');
		});
	}
}