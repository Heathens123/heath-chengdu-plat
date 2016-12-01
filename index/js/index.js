//__useAppList__




//设置顶部右按钮执行方式  入口在json配置文件里面
var show_msg = function(){
    JK.openUrl("personal_center/myNews.html");
};







var PAGE = {
    data:{},
    appData:{},
    typeData:{},
    useAppId:[],
    topAppIds:[],
    init:function(){

        JK.loading.show("急速加载中");

        this.getAppData();
        this.addEventLister();
        //this.addEventAppOpenAndClose();

    },
    run:function(){

        this.bindBannerList();
        this.setBanner();
        this.setBanner1();
        this.setBanner2();

        this.setTopApp();


        //异步的
        this.getServerUseAppData();

        JK.loading.hide();
        JK.msgBtnInit();


    },
    cacheAppListData:function(callback){
        var data = this.data.dataList,
            newData = {};
        for(var i= 0,l=data.length;i<l;i++){
            var id = data[i].appId;
            newData[id] = data[i];
        }

        this.appData = newData;
        newData = JSON.stringify(newData);
        JK.cache.save("__app_list__",newData,function(){
            callback();
        });

    },
    //获取app数据
    getAppData:function(){
        var _this = this;
        JK.app.getList(
            function(rs){
                _this.data = rs;
                _this.cacheAppListData(function(){
                    _this.run();
                })
            },
            function(){

            }
        )
    },
    //绑定banner
    bindBannerList:function(){
        var data = this.data.bannerList,
            body1 = $("#banner_main"),
            body2 = $("#banner_main1"),
            body3 = $("#banner_main2");

        for(var i= 0,l=data.length;i<l;i++) {
            var this_data = data[i],
                this_type = this_data.type,
                this_body = null,
                img_src = (this_data.img)? SYS.serverUrl+this_data.img : "#";

            if (this_type == 1) {
                this_body = body1;
            } else if (this_type == 2) {
                this_body = body2;
            } else {
                this_body = body3;
            }

            var this_item = $("<a></a>");
            this_item.attr({
                href:this_data.url || "#"
            });

            if(img_src != "#"){
                this.setBgImg(this_item,img_src);
            }else{
                this_item.css3({
                    "background":"url("+img_src+")",
                    "background-size":"100% 100%"
                });
            }

            this_body.append(this_item);
        }
    },
    //获取本地图片并设置背景
    setBgImg:function(dom,imgSrc){
        JK.saveImageGetLocalUrl(imgSrc,function(rs){
            dom.css({
                "background":"url('"+rs+"')",
                "background-size":"100% 100%",
                "-webkit-background-size":"100% 100%"
            });
        });
    },
    //获取本地图片设置图片地址
    setImgSrc:function(dom,imgSrc){
        JK.saveImageGetLocalUrl(imgSrc,function(rs){
            dom.attr({src:rs});
        });
    },
    //设置顶banner
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
    //设置中间banner
    setBanner1:function(){
        new DEVICE.bannerAnimate({
            win: $("#banner1"),                     // @param:jqobj    外层窗口
            body: $("#banner_main1"),        //@param:jqobj    滑动层
            time: 2000,                     //@param:number   滑动间隔时间
            animateTime: window.innerWidth,         //@param:number   滑动动画时间
            showPoint:true,                //@param:number   是否显示下面的小点
            //leftBtn:$("#story_right_btn"),  //@param:jqobj    左滑动按钮
            //rightBtn:$("#story_left_btn"),  //@param:jqobj    右滑动按钮
            changeStartFn:function(page){}, //@param:fn       滑动开始时执行函数，传递当前要滑动到的页面number
            changeEndFn:function(page){}    //@param:fn       滑动结束时执行函数，传递当前要滑动到的页面number
        });
    },
    //设置底banner
    setBanner2:function(){
        new DEVICE.bannerAnimate({
            win: $("#banner2"),                     // @param:jqobj    外层窗口
            body: $("#banner_main2"),        //@param:jqobj    滑动层
            time: 2000,                     //@param:number   滑动间隔时间
            animateTime: window.innerWidth,         //@param:number   滑动动画时间
            showPoint:true,                //@param:number   是否显示下面的小点
            //leftBtn:$("#story_right_btn"),  //@param:jqobj    左滑动按钮
            //rightBtn:$("#story_left_btn"),  //@param:jqobj    右滑动按钮
            changeStartFn:function(page){}, //@param:fn       滑动开始时执行函数，传递当前要滑动到的页面number
            changeEndFn:function(page){}    //@param:fn       滑动结束时执行函数，传递当前要滑动到的页面number
        });
    },
    //设置顶部固定应用
    setTopApp:function(){
        var data = this.data.autoList || [],
            body = $("#top_app"),
            list = $("#top_app_list"),
            _this = this,
            topAppIds = [];

        for(var i= 0,l=data.length;i<l;i++){
            var this_list = list.clone().css3({display:"box"}).attr({id:""}),
                this_data = data[i],
                img_src = SYS.serverUrl+this_data.appIcon || "";

            if(this_data.appIcon){
                this.setImgSrc(this_list.find("img"),img_src);
            }

            this_list.find("span").text(this_data.appName);
            this_list.attr({_id:this_data.appId});

            topAppIds.push(this_data.appId);

            $$(this_list).myclickok(function(){
                var id = $(this).attr("_id");
                _this.openApp(id);
            });

            body.append(this_list);
        }

        this.topAppIds = topAppIds;

        JK.cache.save("__top_app_ids__",JSON.stringify(topAppIds),function(){

        });

    },
    //获取服务器的默认常用应用列表
    getServerUseAppData:function(){
        var data = this.data.dataList,
            newData = {},
            userApps = [],
            _this = this;



        //取前6个应用 不含顶部3个指定的应用作为常用应用
        //生成服务器的默认应用列表
        for(var z= 0,zl=data.length;z<zl;z++){
            if(userApps.length == 6){
                break;
            }
            var id = data[z].appId;
            if(this.topAppIds.indexOf(id) == -1){
                userApps.push(id);
            }
        }

        //获取应用类别数据
        for(var i= 0,l=data.length;i<l;i++){
            var type = data[i].typeCode;
            if(!newData[type]){
                newData[type] = data[i];
                this.typeData[type] = [];
                this.typeData[type].push(data[i]);
            }else{
                this.typeData[type].push(data[i]);
            }
        }

        //生成服务器的默认应用列表
        //var useAppId = [];
        //for(var key in newData){
        //    if(newData.hasOwnProperty(key)){
        //        useAppId.push(newData[key].appId);
        //    }
        //}
        this.useAppId = userApps;
        this.setListTypeData();
        this.reCreateUseAppList();
    },
    //重新生成常用应用列表
    reCreateUseAppList:function(){
        var _this = this;

        //删除不存在的应用
        var clearDelApps  = function(rs){
            var appList = [];

            for(var i= 0,l=rs.length;i<l;i++){
                var id = rs[i];
                if(_this.appData[id]){
                    appList.push(id);
                }
            }
            clearTopApps(appList);
        };

        //删除顶部已存在的id
        var clearTopApps = function(rs){
            var appList = [],
                topData = _this.topAppIds;

            for(var i= 0,l=rs.length;i<l;i++){
                var id = rs[i];
                if(topData.indexOf(id) > -1 || rs.indexOf(id.toString()) > -1){

                }else{
                    appList.push(id);
                }
            }
            createNewAppList(appList);
        };

        //生成新的列表
        var createNewAppList = function(rs){
            for(var i= 0,l=_this.useAppId.length;i<l;i++){
                if(rs.length == 6){break;}

                var id = _this.useAppId[i];
                if(rs.indexOf(id) > -1 || rs.indexOf(id.toString()) > -1){

                }else{
                    rs.push(id);
                }
            }

            _this.createUseAppList(rs);
        };


        //获取本地使用的应用列表
        JK.useAppList.get(function(rs){

            clearDelApps(rs);
        });

        //JK.cache.get("__useAppList__",function(rs){
        //
        //});
    },
    //设置常用应用列表
    createUseAppList:function(data){
        var body = $("#index_use_app"),
            list = $("#index_use_app_list"),
            _this = this;
        body.html("");

        for(var i= 0,l=data.length;i<l;i++){
            var id = data[i],
                this_data = this.appData[id],
                this_list = list.clone().attr({id:""}).css({display:"block"}),
                img_src = SYS.serverUrl+this_data.appIcon || "";

            if(this_data.appIcon){
                this.setImgSrc(this_list.find("img"),img_src);
            }

            this_list.find("span").text(this_data.appName);
            this_list.attr({"_id":this_data.appId});

            $$(this_list).myclickok(function(){
                var id = $(this).attr("_id");
                _this.openApp(id);
            });

            body.append(this_list);



        }


    },
    //设置应用分类列表
    setListTypeData:function(){
        var typeData = this.data.typeList || [],
            showListType = [],
            notShowListType = [];

        for(var i= 0,l=typeData.length;i<l;i++){
            var this_data = typeData[i];
            if(this_data.num == 0){
                notShowListType.push(this_data);
            }else{
                showListType.push(this_data);
            }
        }

        //生成下面的无列表的分类
        this.createNoListTypes(notShowListType);
        //生成应用列表
        this.createListTypes(showListType);
        //增加滚动条
        this.createScroll();

    },
    //生成下面的无列表的分类
    createNoListTypes:function(data){
        var body = $("#index_other"),
            list = $("#index_other_item"),
            _this = this;

        for(var i= 0,l=data.length;i<l;i++){
            if(i>=3){return;}
            var type_id = data[i].code,
                this_data = this.typeData[type_id] || [],
                this_list = list.clone().attr({id:""}).css({display:"block"}),
                img_src = SYS.serverUrl + this_data[0].typeImg1;
            var _temp = this_data[0].typeImg1;

            this_data = this_data[0] || {};

            if(_temp){
                this.setImgSrc(this_list.find("img"),img_src);
            }


            this_list.find("span").text(this_data.typeName);
            this_list.attr({_id:this_data.typeCode});

            $$(this_list).myclickok(function(){
                var id = $(this).attr("_id");
                _this.openMoreApp(id);
            });

            body.append(this_list);
        }
    },
    //生成应用列表
    createListTypes:function(data){
        var body = $("#index_app_types_body"),
            typeList = $("#index_app_types"),
            itemList = $("#index_app_types_item"),
            typeListData = data,
            itemData = this.data.dataList,
            _this = this;

        //生成类别列表
        for(var i= 0,l=typeListData.length;i<l;i++){
            var this_type_id = typeListData[i].code,
                this_type_data = this.typeData[this_type_id] || [],
                this_type_list = typeList.clone().attr({id:""}).css3({display:"block"});


            this_type_list.find(".index_app_types_title").find("span").text(this_type_data[0].typeName);

            var more_btn = this_type_list.find(".index_app_types_title").find("a");
            more_btn.attr({"_id":this_type_data[0].typeCode});

            $$(more_btn).myclickok(function(){
                var _id = $(this).attr("_id");
                _this.openMoreApp(_id);
            });

            body.append(this_type_list);
            var num = typeListData[i].num,
                items = this_type_data.length,
                _body = this_type_list.find(".index_app_types_apps_main");

            num = (num > items)? items : num;

            //生成具体应用
            for(var z= 0,zl=num;z<zl;z++){
                var that_data = this_type_data[z] || {},
                    that_list = itemList.clone().attr({id:""}).css({display:"block"}),
                    img_src = SYS.serverUrl + that_data.appIcon;

                if(that_data.appIcon){
                    this.setImgSrc(that_list.find("img"),img_src);
                }

                that_list.find("span").text(that_data.appName);
                that_list.attr({"_id":that_data.appId});

                $$(that_list).myclickok(function(){
                    var id = $(this).attr("_id");
                    _this.openApp(id);
                });

                _body.append(that_list);
            }

        }

    },
    //生成横向滚动条
    createScroll:function(){
        var body = $("#index_app_types_body").find(".index_app_types");



        body.each(function(){
            var dom = $(this),
                main = dom.find(".index_app_types_apps_main"),
                now_x = 0,
                room = dom.find(".index_app_types_apps"),
                padding = parseInt(room.css("padding-left"))*2,
                items = main.find(".index_app_types_item"),
                item_w = parseInt(items.outerWidth());
            main.css({
                width:items.length * item_w + "px"
            });

            var min_x = parseInt(main.width()) + padding - parseInt(dom.width());
            min_x = (min_x < 0 )? 0 : min_x;
            min_x = -min_x;

            new DEVICE.touchSlideEvent({
                dom:dom,          //@param:jqobj   要监听的dom
                startFn:function(){

                },   //@param:fn      手指按下时执行
                moveFn:function(opt){   //@param:fn      手指滑动时执行
                    //opt.start.x   初始点 x，y
                    //opt.start.y
                    //opt.end.x     当前点 x ，y
                    //opt.end.y
                    //opt.move.x    当前点到初始点的距离  x ，y
                    //opt.move.y

                    var move = now_x + opt.move.x;
                    move = (move > 0)? 0 : move;
                    move = (move < min_x)? min_x : move;
                    main.css3({
                        transform:"translateX("+ move +"px)"
                    })
                },
                endFn:function(opt,isSlide){    //@param：fn  手指释放的时候执行
                    var move = now_x + opt.move.x;
                    move = (move > 0)? 0 : move;
                    move = (move < min_x)? min_x : move;

                    now_x = move;

                    //opt同上
                    //isSlide   布尔，是否触发快速滑动
                },
                slideLeftFn:function(){},     //@param:fn   快速左滑促发
                slideRightFn:function(){},    //@param:fn   快速右滑促发
                slideUpFn:function(){},       //@param:fn   快速上滑促发
                slideDownFn:function(){},     //@param:fn   快速下滑促发
                slideMaxTime:500,       //@param：number  触发快速滑动的最大时间 默认：500 ms
                useDirection:"x"        //@param:str    "x","y","xy"
                                        //使用哪个方向的滑动   默认：x
            });
        });




    },







    openApp:function(id){
        var needInstall = this.appData[id].needInstall;
        if(!needInstall){
            //this.saveUseAppList(id);
            JK.useAppList.save(id,function(){
                JK.app.open(id);
            });
            return;
        }


        JK.openUrl("index/info.html?id="+id);

    },
    openMoreApp:function(type_id){
        JK.openUrl("index/more.html?id="+type_id);
    },




    //页面回到显示层的时候执行
    addEventLister:function(){
        var _this = this;
        JK.backRefreshPage(function(){
            _this.reCreateUseAppList();
            _this.refreshAppCacheList();
        });
    },
    refreshAppCacheList:function(){
        var _this = this;
        JK.cache.get("__app_list__",function(rs){
            rs = JSON.parse(rs);
            _this.appData = rs;
        });
    },



    //增加app打开或关闭事件
    addEventAppOpenAndClose:function(){
        var _this = this;
        window.addEventListener("operation_app",function(e){
            console.log("close");
            console.log(e);
            var data = e.eventValue;
            if(data){
                _this.sendUsedTime(data);
            }
        },false);
    },
    //app关闭时发送使用时间
    sendUsedTime:function(rs){
        var appId = rs.h5Id,
            appStartTime = rs.openTime,
            appEndTime = rs.closeTime,
            druTime = appEndTime - appStartTime;


        var getUser = function(){
            JK.user.getInfo(function(rs){
                var token = rs.token;
                if(token){
                    sendInfo(token);
                }else{

                }
            })
        };


        var sendInfo = function(token){
            $.ajax({
                type:"post",
                cache:false,
                url:SYS.apiUrl+"use.do",
                data:{
                    userToken:token,
                    appId:appId,
                    second:parseInt(druTime/1000)
                },
                //contentType:"application/json",
                dataType:"json",
                timeout:60000,
                success:function(rs){
                    console.log(rs)
                },
                error:function(){

                }
            });
        };

        getUser();
    }

};