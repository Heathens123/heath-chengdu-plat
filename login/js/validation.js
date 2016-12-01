var valcode = {},
	fool;
$(document).ready(function() {
	$(".log_but:eq(0)").css({
		background: "#ccc"
	}).get(0).addEventListener("touchstart", fool = function(e) {
		e.stopPropagation();
		e.preventDefault();
	}, false);
})

function validation(o, tel, type, userinfo) {
	var tel;
	if(userinfo) { //getInfo
		JK.user.getInfo(function(res) {
			if(!res.token) JK.reLogin();
			tel = res.phoneNumber;
			goajax();
		});
	} else {
		tel = $("#" + tel).val().trim();
		if(tel == "" || !(/^[1][3578][0-9]{9}$/.test(tel))) {
			$("#" + tel).addClass("error")
			JK.alert("提示", "输入手机号码错误!");
			return;
		}
		goajax();
	}

	function goajax() {
		var data = {
			number: tel,
			type: type,
			appType: "2"
		}
		$("#" + o).attr("disabled", true);
		JK.loading.show("急速加载中");
		$.ajax({
			type: "post",
			cache: false,
			url: SYS.serverUrl + "vercode.do",
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 60000,
			success: function(rs) {
				JK.loading.hide();
				if(rs.stateCode == "success") {
					$(".log_but:eq(0)").css({
						background: "#5856d6"
					}).get(0).removeEventListener("touchstart", fool, false);

					JK.alert("提示", "验证码发送成功!");
					$(".log_but").attr("disabled", false);
					valcode = rs.data;
					time(o);
				} else {
					$("#" + o).attr("disabled", false);
					JK.alert("提示", rs.msg);

				}
			}
		});
		//获取验证码
	}

	var wait = 60;

	function time(o) {
		if(wait == 0) {
			$("#" + o).attr("disabled", false);
			$("#" + o).val("发送验证码");
			wait = 60;
		} else {
			$("#" + o).val(wait + "秒");
			wait--;
			setTimeout(function() {
					time(o)
				},
				1000)
		}
	}
}