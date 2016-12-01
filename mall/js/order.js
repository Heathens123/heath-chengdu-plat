var PAGE = {
    userInfo:{},
    token:"",
    address:{},
    product:{},
    number:1,
    init:function(){
        this.getToken();
        this.bindSubmitBtn();
    },
    getToken:function(){
        var _this = this;
        JK.user.getInfo(function(rs){
            var token = rs.token || "";
            if(token){
                _this.userInfo = rs || {};
                _this.token = token;
                _this.getAddress();
            }else{
                JK.reLogin();
            }
        })
    },
    getAddress:function(){
        var _this = this;

        AJAX.getDefaultAddress({
            data:{
                token:_this.token
            },
            success:function(rs){
                _this.address = rs;
                _this.getProductInfo();
            }
        })
    },
    getProductInfo:function(){
        var _this = this,
            id = DEVICE.getParamFromUrl("id");

        AJAX.mallInfo({
            data:{
                id:id
            },
            success:function(rs){
                rs = rs || [];
                rs = rs[0];
                _this.product = rs;
                _this.checkAddress();
            }
        })
    },
    checkAddress:function(){
        var addDom = $("#order_address_add"),
            showDom = $("#order_address");

        if(this.address){
            showDom.css({display:"block"});
            addDom.css({display:"none"});
            this.bindAddress();
        }else{
            showDom.css({display:"none"});
            addDom.css({display:"block"});
        }

        this.bindProduct();
    },
    bindAddress:function(){
        var data = this.address || {};

        //id
        $("#order_address").attr({id:data.id});
        //姓名
        $("#order_address_name").text(data.username);
        //电话
        $("#order_address_phone").text(data.phonenum);
        //是否默认地址
        var display = (data.isdefault == 1)? "block" : "none";
        $("#order_address_default").css({display:display});
        //地址
        $("#order_address_address").text(data.streetaddress);

    },
    bindProduct:function(){
        var data = this.product || {};

        //商品名
        $("#product_name").text(data.name);
        //商品信息
        $("#product_info").text(data.remark);
        //商品图片
        var src = JK.getNewImageUrl(data.photoPath2);
        if(data.photoPath2){
            JK.imageSaveAndShow.img($("#product_icon"),src);
        }
        //价格
        $("#product_price").text(data.realPrice);


        this.setTotalPrice();
    },


    setTotalPrice:function(){
        var data = this.product || {},
            n = parseInt($("#product_number").text()),
            price = data.realPrice || 0,
            total = n * price;

        //总价
        $("#product_total_price").text(total);
        //总价
        $("#detail_footer_total").text(total);
    },
    bindSubmitBtn:function(){
        var btn = $("#detail_footer_btn"),
            add = $("#mill_info_add"),
            less = $("#mill_info_less"),
            text = $("#product_number"),
            add_address = $("#order_address_add"),
            mdf_address = $("#order_address"),
            _this = this;

        $$(btn).myclickok(function(){
            if(!_this.address.id){
                JK.info.showError("您还未添加收货地址");
                return;
            }
            _this.pay();
        });

        $$(add).myclickok(function(){
            var val = parseInt(text.text());
            val++;
            val = (val > 99)? 99 :val;
            text.text(val);
            _this.number = val;
            _this.setTotalPrice();
        });

        $$(less).myclickok(function(){
            var val = parseInt(text.text());
            val--;
            val = (val <=1)? 1 : val;
            text.text(val);
            _this.number = val;
            _this.setTotalPrice();
        });

        $$(add_address).myclickok(function(){
            JK.backRefreshPage();
            JK.openUrl("address/mdf.html");
        });

        $$(mdf_address).myclickok(function(){
            JK.backRefreshPage();
            JK.openUrl("address/index.html");
        });
    },
    pay:function(){
        var money = this.product.realPrice * this.number,
            number = this.number,
            user_bz = "";

        money = money.toFixed(2);

        var data = {
            userid:this.userInfo.userId,      //用户id
            cid:this.product.id,         //商品id
            subject:this.product.name,     //商品名称
            body:user_bz,         //用户备注
            show_url:JK.getNewImageUrl(this.product.photoPath2),      //商品图地址
            totalFee:money,      //总价
            color:"",           //颜色
            nums:number,            //数量
            addressId:this.address.id            //地址id
        };

        console.log(data);

        JK.pay(data,function(rs){
            var code = rs.status;
            if(code == 0){
                //成功
                JK.openUrl("personal_center/commodity_order.html");
            }else{
                var msg = rs.des;
                JK.info.showError(msg);
            }
        });
    }
};