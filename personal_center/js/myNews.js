/**
 * Created by Administrator on 2016/10/18.
 */
var PAGE = {

    init:function(){

        this.localHrefs(); //跳转链接
        this.infoInitial(); //初始化数据
        //alert(123);
        //setTimeout(function(){
        //    topRightBtnClick();
        //},3000)

    }
    ,
    localHrefs : function(){

        ////资料填写跳转
        $('#myNews').on('click','.myNews-list',function(){
            var id = $(this).attr("proId");
            JK.backRefreshPage();
            JK.openUrl(basePath+"news_detail_info.html?id="+id);
        });

    },
    //获取未读消息id
    getID : function(){
        var JSON = {};
        var string = "";
        var id = [];
        $('.myNews-list').each(function(index){
            if($(this).attr("nosea") == "true"){
                string += $(this).attr('proId')+',';
                id.push(index);
            }
        });
        string = string.substring(0,string.length-1);
        JSON.string = string;
        JSON.arrayID = id;
        return JSON;
    }
    ,
    infoInitial : function (){

        JK.user.getInfo(function(res){
            var token = res.token;
            var data = {
                token : token
            };
            AJAX.go1("servicePort/messageStatus.do",data,function(rs){
                if(rs.data.length == 0){
                    JK.noListShow.message();
                }else {
                    PAGE.addData(rs.data);
                    JK.messageBtnInit(PAGE.getID().arrayID.length,function(){
                        topRightBtnClick()
                    })
                }
            })
        })


    },
    addData : function(res){

            var dom = $('#clone_news');
            //colnes.css("display",'block');

            for(var i =0 ; i< res.length ;i++){
                var clone = $('#clone_news').clone();
                clone.css('display','block').removeAttr('id');
                clone.find('.myNews-text').text(res[i].title);
                if(res[i].status != 0){
                    clone.find('.myNews-yuanquan').css('background-color',"#fff");
                }else {
                    clone.attr('noSea',"true")
                }
                clone.attr({"proId":res[i].id});
                clone.find("#sendTime").text("发布时间:"+res[i].sendTime);

                $('#myNews').append(clone);

            }
        //topRightBtnClick()

    }


};
var topRightBtnClick = function(){
    JK.user.getInfo(function(res){
        if(!res.token){
            JK.reLogin();
            return;
        }
        var token = res.token;
        var data = {
            token : token,
            sid : PAGE.getID().string
        };
        if(PAGE.getID().arrayID.length != 0){
            AJAX.go("servicePort/UpdmessageStatus.do",data,function(){
                for(var i = 0 ; i<PAGE.getID().arrayID.length ;i++){
                    $('.myNews-list').eq(PAGE.getID().arrayID[i]).find('.myNews-yuanquan').css("background-color","#fff")
                }

                JK.messageBtnCanNotClick();
            });

        }

    });


};