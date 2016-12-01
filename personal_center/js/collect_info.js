/**
 * Created by Administrator on 2016/10/17.
 */
/**
 * Created by Administrator on 2016/10/17.
 */


var topRightBtnClick = function(){
    JK.editChangeToCancelBtn(function(){
        PAGE.clickRight.clickDel();
    },function(){
        PAGE.clickRight.left();
    });
};

var PAGE = {

    init:function(){
        JK.editChangeToCancelBtnInit();
        this.localHrefs(); //跳转链接
        this.clickFunc(); //点击事件
        this.infoInitial(); //初始化
        JK.backRefreshPage(function() {
			PAGE.localStorage();
		});
        //setTimeout(function(){
        //    PAGE.clickRight.clickDel();
        //},5000)
    },
    localStorage:function(){
    	var state = JSON.parse(localStorage.obj);
		var newId = state.newId.split(',');
		if (state.state == "0") {//取消收藏
			$(".delete_div[proId=" + newId[0] + "]").remove();
		}
    },
    localHrefs : function(){

        //资料填写跳转
        $('#colect_list_div').on("click",'.herf_news',function(){

            if(!$(this).hasClass('DE_div')){
                var id = $(this).attr("proid");
                JK.openUrl("news/news_detail.html?id="+id);
            }
        });

    },
    //右上角点击
    clickRight : {
        clickDel : function(){
            $('#DelBtn').css("display","block");
            $('.allDiv').addClass("DE_div").eq(0).addClass('left_delete');
            $('.delete_icon').append('<img src="images/select_icon.png" alt="">')
        },
        left : function(){
            $('#DelBtn').css("display","none");
            $('.allDiv').removeClass("DE_div left_delete");
            $('.delete_icon>img').remove();
        }
    }
    ,
    clickFunc : function (){

        $('#colect_list_div').on('click','.allDiv',function(){
            if($(this).hasClass('DE_div')){
                if($(this).hasClass('left_delete')){
                    $(this).removeClass('left_delete');
                }else {
                    $(this).addClass('left_delete');
                }
            }

        });
        //批量删除
        $('#DelBtn').click(function(){
            JK.confirm("系统提示","您是否确定删除？",function(){
                PAGE.delList();
            });

        })

    },
    //初始化信息
    infoInitial : function(){

        JK.user.getInfo(function(rsInfo){
            if(!rsInfo.token){
                JK.reLogin();
                return
            }
            var data = {
                personid : rsInfo.userId
                //personid : 5496
            };
            AJAX.go1("collects/findAllCollect.do",data,function(res){

                if(res.data.length == 0){
                    JK.noListShow.collection();
                }else {
                    PAGE.addData(res.data)
                }

            })
        })

    },
    addData : function (res){
        for(var i = 0 ;i<res.length ; i++){

            var data = res[i] || {},
                id = data.hotSpot || {};
            id = id.id;

            var dom = '<div class="delete_div"  proId="'+id+'" >'+
                '<div class="herf_news allDiv" collectid="'+data.id+'" proId="'+id+'">'+
                '<div class="delete_icon">'+
                //'<img src="../images/select_icon.png" alt="">'+
                '</div>'+
                '<div class="content_div">'+
                ' <div class="box_h collect_list_li center_s">'+
                '<div class="boxflex1 collect_title">'+
                '<p class="diandian3 collect_title_2">'+res[i].hotSpot.title+'</p>'+
                '<p class="collect_title_time">发布时间：'+res[i].createDate+'</p>'+
                '</div>'+
                '<div class="collect_img">'+
                '<img src="'+SYS.imgUrl+res[i].hotSpot.img+'" alt="">'+
                '</div>'+
                '</div>'+
                '<div class="line_b"></div>'+
                '</div>'+
                '</div>'+
                '</div>';
            $('#colect_list_div').append(dom)


        }


    },
    delList : function() {

        var idNum = PAGE.getId("collectid");
        var data = {
            ids:idNum.string
        };
        AJAX.go1("collects/delBatchCollect.do", data, function (res) {
            var proId = PAGE.getId("proId");
            JK.alert("提示","删除成功!",function(){
                var a={"state":"0","newId":proId.string}
                localStorage.obj=JSON.stringify(a);
                 window.location.reload();
            })
        })
        
    },
    getId : function(seting){
        var string="";
        var array = [];
        $('.herf_news').each(function(e){
            if($(this).hasClass('left_delete')){
                string += $(this).attr(seting)+",";
                array.push(e);
            }
        });
        var stringS =  string.substring(0,string.length-1);
        var data = {
            string : stringS,
            array : array
        };
        return data;
    }

};