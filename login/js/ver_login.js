var valcode;
var PAGE = {
    init: function() {
        this.addLogin(); //验证提交登录
        this.colse();//关闭当前页面
    },
    addLogin: function() {
        //提交验证
        var log_but=$(".log_but");
        $$(log_but).myclickok(function() {
            var iphone = $("#tel").val().trim(),
                validation = $("#validation").val().trim();
            if (iphone === "" || !(/^[1][3578][0-9]{9}$/.test(iphone))) {
                $("#iphone").addClass("error");
                JK.alert("提示", "输入手机号码错误!");
                return;
            } else if (validation === ""||!(/^\d{5}$/.test(validation))||!valcode) {
                $("#validation").addClass("error");
                JK.alert("提示", "验证码错误!");
                return;
            }
            valcode.code=validation;
            JK.loading.show("数据加载中")
            JK.user.smsLogin(iphone,validation,valcode, function(data) {
            	JK.loading.hide()
            }, function(error) {
            	JK.loading.hide()
              	JK.alert("提示",error.result.errMsg);
            });
        });
        $("#tel").focus(function() {
            $("#tel").removeClass("error");
        });
        $("#validation").focus(function() {
            $("#validation").removeClass("error");
        });
    },
    colse:function(){
    	if(!DEVICE.isAndroid){
    		$(".close").css("top","0.84rem");
    	}
    	$(".close").click(function(){
    		JK.rollBack();
    	});
        $(".rl_back_login a").click(function(){
            JK.goBack();
        });
    }
};
