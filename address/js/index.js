
var add_address = function(){
    PAGE.addAddAddressEvent();
};


var PAGE = {
    userInfo:{},
    token:{},
    address:[],
    init:function(){
        this.getToken();
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

        AJAX.getAddress({
            data:{
                token:_this.token
            },
            success:function(rs){
                rs = rs || [];
                _this.address = rs;
                _this.bindData(rs);
            }
        })
    },
    bindData:function(data){
        var body = $("body"),
            item = $("#address_list");

        if(data.length == 0){
            JK.noListShow.address();
            return;
        }

        for(var i= 0,l=data.length;i<l;i++){
            var this_data = data[i],
                this_list = item.clone().attr({id:""}).css({display:"block"});

            //id
            this_list.attr({"_id":this_data.id});
            //姓名
            this_list.find(".__address_name").text(this_data.username);
            //电话
            this_list.find(".__address_phone").text(this_data.phonenum);
            //地址
            this_list.find(".order_address_address").text(this_data.streetaddress);
            //默认地址
            var display = (this_data.isdefault == 1)? "block" : "none";
            this_list.find(".__address_default").css({display:display});

            this.bindSlideEvent(this_list);
            this.bindClickEvent(this_list);
            this.bindDelEvent(this_list);

            body.append(this_list);
        }
    },
    bindSlideEvent:function(dom){
        var obj = dom.find(".order_address_main");

        new DEVICE.touchSlideEvent({
            dom:dom,          //@param:jqobj   要监听的dom
            startFn:function(){},   //@param:fn      手指按下时执行
            moveFn:function(opt){   //@param:fn      手指滑动时执行
                //opt.start.x   初始点 x，y
                //opt.start.y
                //opt.end.x     当前点 x ，y
                //opt.end.y
                //opt.move.x    当前点到初始点的距离  x ，y
                //opt.move.y
            },
            endFn:function(opt,isSlide){    //@param：fn  手指释放的时候执行
                //opt同上
                //isSlide   布尔，是否触发快速滑动
            },
            slideLeftFn:function(){
                obj.cssAnimate({
                    transform:"translateX(-1.28rem)"
                },300)
            },     //@param:fn   快速左滑促发
            slideRightFn:function(){
                obj.cssAnimate({
                    transform:"translateX(0)"
                },300)
            },    //@param:fn   快速右滑促发
            slideUpFn:function(){},       //@param:fn   快速上滑促发
            slideDownFn:function(){},     //@param:fn   快速下滑促发
            slideMaxTime:500,       //@param：number  触发快速滑动的最大时间 默认：500 ms
            useDirection:"x"        //@param:str    "x","y","xy"
                                    //使用哪个方向的滑动   默认：x
        });
    },
    bindClickEvent:function(dom){
        $$(dom).myclickok(function(){
            var id = $(this).attr("_id");
            JK.backRefreshPage();
            JK.openUrl("address/mdf.html?id="+id);
        });
    },
    bindDelEvent:function(dom){
        var obj = dom.find(".order_address_del");

        $$(obj).myclickok(function(){
            var id = dom.attr("_id");

            AJAX.delAddress({
                data:{
                    addressId:id
                },
                success:function(){
                    dom.remove();
                    JK.info.showSuccess("删除成功");
                }
            })

        });
    },
    addAddAddressEvent:function(){

        JK.backRefreshPage();
        JK.openUrl("address/mdf.html");
    }
};