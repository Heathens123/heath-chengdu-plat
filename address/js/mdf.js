var PAGE = {
    id:"",
    userInfo:{},
    token:"",
    isSelect:false,
    init:function(){
        this.getToken();
        this.addBtnEvent();

    },
    getToken:function(){
        var _this = this;
        JK.user.getInfo(function(rs){
            var token = rs.token || "";
            if(token){
                _this.userInfo = rs || {};
                _this.token = token;
                _this.checkUrlParam();
            }else{
                JK.reLogin();
            }
        })
    },
    checkUrlParam:function(){
        var id = DEVICE.getParamFromUrl("id");
        this.id = id;

        if(id != ""){
            this.getData();
        }else{
            this.setBtn(true);
        }
    },
    setBtn:function(state){
        state = state || false;
        this.isSelect = state;

        var _this = this;

        new DEVICE.iosCheckBox({
            dom:$("#mdf_btn"),                //要放置的容器
            isCheck:state,                    //默认状态是否选中
            selectBg:"#5856d6",                 //选中后的边框颜色
            bg:"#e5e5e5",                        //未选中的边框颜色
            btnBg:"#fff",                     //圆形按钮的颜色
            btnBodyBg:"#fff",                 //关闭时圆形按钮外的背景色
            borderWidth:3,                    //边框厚度  px
            spd:400,                          //动画速度
            callback:function(state){         //点击执行
                _this.isSelect = state;
                //console.log(state);           //输出选中状态 true /false
            }
        });
    },
    getData:function(){
        var _this = this;

        AJAX.getAddressById({
            data:{
                addressId:_this.id
            },
            success:function(rs){
                _this.bindData(rs);
            }
        })
    },
    bindData:function(data){

        $("#address_name").val(data.username);
        $("#address_phone").val(data.phonenum);
        $("#address_info").val(data.streetaddress);
        var isSelect = (data.isdefault == 1);
        this.setBtn(isSelect);
    },
    addBtnEvent:function(){
        var btn = $("#mdf_submit"),
            _this = this;

        $$(btn).myclickok(function(){
            _this.submit();
        });

    },
    submit:function(){
        var name = $.trim($("#address_name").val()),
            phone = parseInt($.trim($("#address_phone").val())),
            address = $.trim($("#address_info").val()),
            _this = this;

        if(name.length>0 && $.isNumber(phone) && phone.toString().length==11 && address.length!=0){

        }else{
            JK.info.showError("请输入您的详细联系信息");
            return;
        }


        AJAX.saveAddress({
            data:{
                token:_this.token,
                id:_this.id,
                userName:name,
                phoneNum:phone,
                zipCode:"610000",
                streetAddress:address,
                isdefault:(_this.isSelect)? 1: 0
            },
            success:function(){
                JK.info.showSuccess("地址保存成功!");
                setTimeout(function(){
                    JK.goBack();
                },2000);
            }
        })
    }
};