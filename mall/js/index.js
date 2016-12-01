PAGE = {
    init:function(){
        this.getData();
        //this.bindBannerEvent();
        JK.msgBtnInit();
    },
    //获取数据
    getData:function(){
        var _this = this;

        AJAX.getMallBanner({
            data:{},
            success:function(rs){
                _this.bindBannerData(rs);
            }
        });



        AJAX.mallList({
            data:{},
            success:function(rs){
                rs = rs || [];
                _this.bindData(rs);
            }
        })
    },
    //banner绑定
    bindBannerData:function(data){
        data = data[0] || {};
        var dom = $(".list_banner").find("img"),
            img_src = JK.getNewImageUrl(data.img);

        //if(img_src){
            dom.attr({src:img_src});
        //}

        if(data.url){
            $$(dom).myclickok(function(){
                var url = data.url;
                JK.openUrl(url);
            });
        }
    },
    //数据绑定
    bindData:function(rs){
        var body = $("#list_products"),
            list = $("#list_products_item");

        for(var i= 0,l=rs.length;i<l;i++){
            var this_list = list.clone().attr({id:""}).css({display:"block"}),
                this_data = rs[i],
                product_img = this_data.photoPath2,
                img = this_list.find("img"),
                product_img_src = JK.getNewImageUrl(product_img);



            if(product_img){
                //商品图片绑定
                JK.imageSaveAndShow.img(img,product_img_src);
            }

            //商品名
            this_list.find(".list_proudcts_name").text(this_data.name);
            //商品详情
            this_list.find(".list_products_info").text(this_data.remark);
            //应用提供商
            if(this_data.app && this_data.app.appName){
                this_list.find(".list_product_cs").text(this_data.app.appName+"提供");
            }else{
                this_list.find(".list_product_cs").css({display:"none"});
            }
            //价格
            this_list.find(".list_product_price").text(this_data.realPrice);
            //商品id
            this_list.attr({"_id":this_data.id});

            $$(this_list).myclickok(function(){
                var id = $(this).attr("_id");
                JK.openUrl("mall/detail.html?id="+id);
            });

            body.append(this_list);
        }
    },
    bindBannerEvent:function(){
        var dom = $(".list_banner").find("img");

        $$(dom).myclickok(function(){

            //JK.openUrl(SYS.mallBannerLink);
        });
    }
};