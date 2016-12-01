/**
 * Created by Administrator on 2016/10/20.
 */
/**
 * Created by Administrator on 2016/10/17.
 */
/**
 * Created by Administrator on 2016/10/17.
 */
var PAGE = {

    init:function(){

        this.infoInitial(); //数据初始化
        this.clickFunc(); //点击事件

    },
    infoInitial : function(){

       JK.user.getInfo(function (res) {
           if(!res.token){
               JK.reLogin();
               return;
           }
           var data = {
               token:res.token
           };
           AJAX.go1("commodity/getOrderByUser.do",data,function(res){
                if(res.data.length == 0){
                    JK.noListShow.order();
                }else {
                    PAGE.addData(res.data);
                }

           })
       })


    },
    clickFunc: function(){
        $('#list_div').on("click",".commodity_list",function(){
            JK.openUrl("mall/"+"detail.html?id="+$(this).attr('proid'));
        })

    },
    addData : function(res){


        var domClone = $('#commodity_list');
        for(var i = 0 ; i<res.length ; i++){
            var clone = domClone.clone();
            clone.css('display','block');
            clone.removeAttr('id');
            clone.attr({proId:res[i].photo.id}); //id
            clone.find('.startTime').text(res[i].createTimeStr);   //下单时间
            var __src = JK.getNewImageUrl(res[i].photo.photoPath2);
            clone.find('.pro_Img').attr('src',__src); //图片
            clone.find('.pro_name').text(res[i].photo.name); //标题
            clone.find('.commodity_price_price').text("价格:"+res[i].photo.price); //价格
            clone.find('.c_num').text("数量:"+res[i].photo.salesNum); //价格
            clone.find('.total_pri').text("共计支付:"+res[i].totalFee); //价格
            //var dom = '<div class="commodity_list" proId="'+res[i].photo.id+'">'+
            //    '<div class="commodity_list_top">'+
            //    '<span>下单时间:</span>'+
            //    '<span>'+res[i].createTimeStr+'</span>'+  //下单时间
            //    '</div>'+
            //    '<div class="commodity_pro box_h center_s">'+
            //    '<div class="commodity_pro_img ">'+
            //    '<img src="'+PMZ_all.ImgServerImg+res[i].photo.photoPath3+'" alt="">'+ //图片
            //    '</div>'+
            //    '<div class="commodity_pro_text boxflex1">'+
            //    '<span class="diandian">'+res[i].photo.name+'</span>'+ //姓名
            //    '<div class="commodity_price">'+
            //    '<span class="commodity_price_price">价格：￥'+res[i].photo.price+'</span>'+
            //    '<span class="c_num">数量：'+res[i].photo.salesNum+'</span>'+ //数量
            //    '</div>'+
            //    '</div>'+
            //    '</div>'+
            //    '<div class="bottom_button">'+
            //    '<span>共计支付：￥'+res[i].totalFee+'</span>'+  //共计价格
            //    '<button>'+
            //    '购买'+
            //    '</button>'+
            //    '</div>'+
            //    '<div class="tiao"></div>'+
            //    '</div>';
            $('#list_div').append(clone)
        }

    }
};