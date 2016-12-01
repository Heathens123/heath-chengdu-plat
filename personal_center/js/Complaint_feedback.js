/**
 * Created by Administrator on 2016/10/18.
 */
var PAGE = {

    init:function(){
        this.infoInitial(); //初始化数据
        this.clickFunc(); //点击
    },
    Info : ""
    ,
    infoInitial : function (){

        PAGE.getData();

    },
    clickFunc : function(){

        var btn = $('.bottom_submit').find("button");

        btn.click(function(){
            PAGE.uploadFunc();
        })

    },
    uploadFunc : function(){
        //alert("123");
        var data = {};
        var content;
        content = $('#Content').val().trim();
        data.personid = PAGE.Info.userId;
        data.userid = 1;
        data.content = content;
        //data.createDate = new Date();
        data.userType = 1;
        if(content){
            AJAX.go1("feedback/saveFeedback.do",data,function(res){
                 PAGE.addData.admin(res.data);
                 $('#Content').val("");
                 window.document.body.scrollTop=window.document.body.scrollHeight;
            });

        }
    }
    ,
    getData : function(){
        JK.user.getInfo(function(rsInfo){
            if(!rsInfo.token){
                JK.reLogin();
                return;
            }
            PAGE.Info = rsInfo;
            var data = {};

            data.personid = rsInfo.userId;
            data.userid = 1 ;
            data.desc ="asc";

            AJAX.go1("feedback/findFeedbackBySerach.do",data,function(res){
                PAGE.addData.eachFunc(res.data);
            });

        })

    },
    addData : {

        eachFunc : function(data){
            PAGE.addData.my({CREATEDATE:PAGE.getNowFormatDate(),CONTENT:SYS.chatWelcomeText});
            for (var i = 0 ; i < data.length ; i++){

                if(data[i].USERTYPE == 0){
                    PAGE.addData.my(data[i])
                }else {
                    PAGE.addData.admin(data[i])
                }

            }
            window.document.body.scrollTop=window.document.body.scrollHeight;
        }
        ,
        my : function(data){

            var clone = PAGE.addData.clone_my().clone();
            clone.css("display",'block');
            clone.find(".cust_time").text(data.CREATEDATE);
            clone.find(".content_text").text(data.CONTENT);
            $('.content_div').append(clone)

        },
        admin : function(data,clone){

            var clone = PAGE.addData.clone_admin().clone();
            clone.css("display",'block');

            clone.find(".cust_time").text(data.CREATEDATE);
            clone.find(".content_text_right").text(data.CONTENT);
            clone.find(".userImg").attr({src:PAGE.Info.headImg});

            $('.content_div').append(clone);

        },
        clone_my : function (){
            return $('#clone_dd');
        },
        clone_admin : function(){
            return $('#clone_cc');
        }
    },
    getNowFormatDate : function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
};