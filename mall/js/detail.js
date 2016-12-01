var PAGE = {
    init:function(){
        this.getData();
    },
    //获取数据
    getData:function(){
        var id = DEVICE.getParamFromUrl("id"),
            _this = this;

        AJAX.mallInfo({
            data:{id:id},
            success:function(rs){
                rs = rs || [];
                rs = rs[0] || {};

                _this.bindBanner(rs);
                _this.bindData(rs);
                _this.bindBtnEvent();
            }
        });
    },
    //绑定banner
    bindBanner:function(rs){
        var data = rs.photoPath1,
            body = $("#banner_main");

        data = data.split(",");

        for(var i= 0,l=data.length;i<l;i++){
            var this_data = data[i],
                this_item = $("<a></a>"),
                img_src = JK.getNewImageUrl(this_data);

            if(this_data){
                JK.imageSaveAndShow.bg(this_item,img_src);
            }

            body.append(this_item);
        }

        this.setBanner();
    },
    //数据绑定
    bindData:function(rs){

        //商品名
        $("#detail_name").text(rs.name);
        //应用图标
        var __app = rs.app || {},
            icon = SYS.serverUrl + __app.appIcon,
            imgObj = $("#detail_app_icon");

        if(__app.appIcon){
            imgObj.css({display:"block"});
            JK.imageSaveAndShow.img(imgObj,icon)
        }else{
            imgObj.css({display:"none"});
        }
        //现在售价
        $("#detail_price").text(rs.realPrice);
        //以前售价
        $("#detail_old_price").text(rs.price);
        //销售量
        $("#detail_sale_number").text(rs.salesNum);
        //商品详情
        var _text = rs.remark,
            _body = $("#detail_trait_list");

        _text = _text.split("###");

        for(var j= 0,jl=_text.length;j<jl;j++){
            _body.append("<div class='detail_trait_list'>"+_text[j]+"</div>");
        }
        //$("#detail_trait_list").text(rs.remark);
        //图文详情
        var img = JK.getNewImageUrl(rs.photoPath3);
        if(rs.photoPath3){
            JK.imageSaveAndShow.img($("#detail_info_img"),img);
        }
        //现在单价
        $("#detail_footer_total").text(rs.realPrice);
        //id
        $("#detail_footer_btn").attr({"_id":rs.id});

        //应用id
        var appId = rs.app.id;

        $$("#detail_app_icon").myclickok(function(){
            JK.openUrl("index/info.html?id="+appId);
        });


    },
    //banner动画
    setBanner:function(){
        new DEVICE.bannerAnimate({
            win: $("#banner"),                     // @param:jqobj    外层窗口
            body: $("#banner_main"),        //@param:jqobj    滑动层
            time: 2000,                     //@param:number   滑动间隔时间
            animateTime: window.innerWidth,         //@param:number   滑动动画时间
            showPoint:true,                //@param:number   是否显示下面的小点
            //leftBtn:$("#story_right_btn"),  //@param:jqobj    左滑动按钮
            //rightBtn:$("#story_left_btn"),  //@param:jqobj    右滑动按钮
            changeStartFn:function(page){}, //@param:fn       滑动开始时执行函数，传递当前要滑动到的页面number
            changeEndFn:function(page){}    //@param:fn       滑动结束时执行函数，传递当前要滑动到的页面number
        });
    },
    //按钮事件绑定
    bindBtnEvent:function(){
        var tel = $("#detail_tel"),
            btn = $("#detail_footer_btn");

        tel.find("span").text("客服电话:"+SYS.mallAdvisoryTel1);

        $$(tel).myclickok(function(){
            JK.tel(SYS.mallAdvisoryTel);
        });

        $$(btn).myclickok(function(){
            var id = $(this).attr("_id");
            JK.openUrl("mall/order.html?id="+id);
        });

    }
};