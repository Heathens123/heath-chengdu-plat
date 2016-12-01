var PAGE = {

	tel: $("#tel"), //douc 手机号码
	pwd: $("#pwd"), //douc 密码
	close: $(".close"), //关闭按钮
	ver_but: $(".ver_but"), //验证码登录
	link_reg: $(".link_reg"), //新用户注册
	forgotpwd: $(".forgotpwd"), //忘记密码
	init: function() {
		this.addLogin(); //验证提交登录
		this.btnClick(); //页面跳转
	},
	addLogin: function() {
		var _this = this;
		//登录
		var log_but = $(".log_but");
		$$(log_but).myclickok(function() {
			if (!_this.verCode()) return; //验证
			JK.loading.show("数据加载中")
			JK.user.login(_this.tel.val(), _this.pwd.val(), function(data) {
				JK.loading.hide()
			}, function(error) {
				JK.loading.hide()
				JK.alert("提示", error.result.errMsg);
			});
		});
	},
	verCode: function() { //验证
		var _this = this;
		var tel = _this.tel.val().trim(),
			pwd = _this.pwd.val().trim();
		if (tel === "" || !(/^[1][3578][0-9]{9}$/.test(tel))) {
			_this.tel.addClass("error").focus(function() {
				$(this).removeClass("error");
			});
			JK.alert("提示", "输入手机号码错误!");
			return false;
		} else if (pwd === "") {
			_this.pwd.addClass("error").focus(function() {
				$(this).removeClass("error");
			});
			JK.alert("提示", "请输入密码!");
			return false;
		}
		return true;
	},
	btnClick: function() { //关闭当前页面
		if (!DEVICE.isAndroid) {
			$(".close").css("top", "0.84rem");
		}
		var _this = this;
		_this.close.click(function() { //Icon按钮
			JK.rollBack();
		});
		_this.ver_but.click(function() { //跳转到验证码登录
			JK.openUrl('login/ver_login.html');
		});
		_this.link_reg.click(function() { //新用户注册
			JK.openUrl('login/registered.html');
		});
		_this.forgotpwd.click(function() { //忘记密码
			JK.openUrl('login/forget_pwd.html');
		});
	}

};