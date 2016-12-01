var PAGE = {
    init: function() {
        this.forgotpwd(); //找回密码
        //this.btnDown();
    },
    forgotpwd: function() {
        var _this = this;

        //提交验证
        var log_but = $(".log_but");
        $$(log_but).myclickok(function() {
            var tel = $("#tel").val().trim(), //手机号码
                validation = $("#validation").val().trim(), //验证码
                pwd = $("#pwd").val().trim(), //原密码
                newpwd = $("#newpwd").val().trim(); //新密码

            if(!_this.verCode()){
                return;
            }


            //找回密码ajax
            valcode.code = validation; //验证码赋值到对象的code
            var data = {
                jsonver: JSON.stringify(valcode),
                password: newpwd,
                account: tel,
                appType: "2",
                encryption:1

            };
            AJAX.go1("forget.do", data, function(data) {
                if (data.stateCode == "success") {
                    JK.alert("提示", "找回密码成功!", function() {
                        JK.reLogin();
                    });

                } else {
                    JK.info.showError(ErrorMsg[msg]);
                }
            });
        });

    },
    verCode: function() { //验证
        var _this = this;
        var tel = $("#tel").val().trim(), //手机号码
            validation = $("#validation").val().trim(), //验证码
            pwd = $("#pwd").val().trim(), //原密码
            newpwd = $("#newpwd").val().trim(); //新密码
        if (tel === "" || !(/^[1][3578][0-9]{9}$/.test(tel))) {
            $("#tel").addClass("error").focus(function() {
                $(this).removeClass("error");
            });
            JK.alert("提示", "输入手机号码错误!");
            return false;
        } else if (pwd === ""||pwd.length<6||pwd.length>18) {
            $("#pwd").addClass("error").focus(function() {
                $(this).removeClass("error");
            });
            JK.alert("提示", "密码长度6到18个字符");
            return false;
        } else if (pwd != newpwd) {
            $("#newpwd").addClass("error").focus(function() {
                $(this).removeClass("error");
            });
            JK.alert("提示", "两次输入的密码不一致!");
            return false;
        } else if (validation === "" || !(/^\d{5}$/.test(validation))) {
            $("#validation").addClass("error").focus(function() {
                $(this).removeClass("error");
            });
            JK.alert("提示", "验证码输入错误!");
            return false;
        } else if (valcode === undefined) {
            JK.alert("提示", "未获取验证码!");
            return false;
        }
        return true;
    }
};
