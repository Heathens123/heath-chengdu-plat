var PAGE = {

    init:function(){

        this.infoInitial(); //跳转链接
        this.click(); //点击设置
    },
    click : function(){
        $('#passWordSet').click(function(){
            JK.openUrl("login/"+"edit_pwd.html");
        });
        $('#phoneSet').click(function(){
            JK.openUrl("login/"+"edit_phone.html");
        });
        $('#about').click(function(){
            JK.openUrl("login/"+"about_app.html");
        });
    },
    infoInitial : function(){

        $('#login_out').click(function(){
            //退出登录
            JK.confirm("系统提示","您是否要退出？",function(){
                JK.user.loginOut(function(){
                    JK.rollBack();
                });
            },function(){});
        });

    }
};