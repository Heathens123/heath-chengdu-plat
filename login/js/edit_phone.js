var pageUrl = "http://172.16.12.19:8080/"; //测试

var PAGE = {
    init: function() {
        this.addLogin(); //修改手机号码
    },
    addLogin: function() {
        //提交修改手机号码
        var log_but = $(".log_but");
        $$(log_but).myclickok(function() {
        	
            var valtel = $("#valtel").val().trim(), //手机号码
                newtel = $("#newtel").val().trim(), //新手机号码
                validation = $("#validation").val().trim(); //验证码
            if (valtel === "" || !(/^[1][3578][0-9]{9}$/.test(valtel))) {
                $("#iphone").addClass("error");
                JK.alert("提示", "输入旧手机号码错误!");
                return;
            } else if (newtel === "" || !(/^[1][3578][0-9]{9}$/.test(newtel))) {
                $("#iphone").addClass("error");
                JK.alert("提示", "输入新手机号码错误!");
                return;
            } else if (validation === "" || !(/^\d{5}$/.test(validation))||!valcode) {
                $("#validation").addClass("error");
                JK.alert("提示", "验证码输入错误!");
                return;
            }
            
            //修改手机号码ajax
            valcode.code = validation; //验证码赋值到对象的code
            JK.user.getInfo(function(res) {
            	if(!res.token){JK.reLogin(); return};
                var data = {
                    "token": res.token,
                    "appType": 2,
                    "jsonver": JSON.stringify(valcode)
                };
                JK.loading.show("急速加载中");
                $.ajax({
                    url: SYS.serverUrl + "user_updatePhone.do",
                    data: data,
                    timeout: 40000,
                    type: "POST",
                    dataType: "JSON",
                    success: function(data) {
                        JK.loading.hide();
                        if (data.stateCode == "success") {
                            JK.alert("提示","修改手机号码成功!",function(){
                                JK.goBack();
                            });
                        } else {
                        	JK.info.showError(ErrorMsg[data.stateCode]);
                        }
                    }
                });
            });

        });
        $("#valtel").focus(function() {
            $("#valtel").removeClass("error");
        });
        $("#newtel").focus(function() {
            $("#newtel").removeClass("error");
        });
        $("#validation").focus(function() {
            $("#validation").removeClass("error");
        });
    }
};
