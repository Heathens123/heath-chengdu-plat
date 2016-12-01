/**
 * Created by Administrator on 2016/10/20.
 */


var topRightBtnClick = function() {
    PAGE.delMsg();
};



var PAGE = {
    id:null,
    token:null,
    init:function(){

        this.infoInitial(); //跳转链接
    }
    ,
    infoInitial : function(){
        JK.user.getInfo(function(rsInfo){
            if(!rsInfo.token){
                JK.reLogin();
                return;
            }
            var Info = PMZ_all.getUrl();
            PAGE.id = Info.id;
            PAGE.token = rsInfo.token;
            var data = {
                sid : Info.id,
                token:rsInfo.token
            };
            AJAX.go1("servicePort/messageStatus.do",data,function(rs){

                PAGE.addData(rs.data);

            })

        })

    },
    addData : function(data){
        var dom ='<p class="news_div_title">'+data[0].title+'</p>'+
        '<div class="news_time">'+
        '<span>发布时间：'+data[0].sendTime+'</span>'+
        '</div>'+
        '<div class="news_content">'+
        data[0].context
        +'</div><div class="_link_" style="color: #5856D6;padding-bottom:0.5rem; display: none;">'+data[0].link+'</div>';
        $('.news_div').append(dom);

        if(data[0].link){
            $("._link_").css({display:"block"});
            $$("._link_").myclickok(function(){
                JK.openUrl(data[0].link);
            });
        }

    },
    delMsg:function(){
        var id = this.id,
            token = this.token;

        if(!token){
            JK.reLogin();
            return;
        }

        AJAX.delMessage({
            data:{
                token:token,
                sid:id
            },
            success:function(){
                JK.info.showSuccess("删除成功！");
                setTimeout(function(){
                    JK.goBack();
                },1000);
            }
        })

    }

};