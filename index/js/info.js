var openApp = function(){
    PAGE.openApp();
};


PAGE = {
    data:{},
    init:function(){
        this.addInstallProgressEvent();
        this.getData();
    },
    //从缓存获取app列表
    getData:function(){
        var appId = DEVICE.getParamFromUrl("id"),
            data = [],
            _this = this;
        JK.cache.get("__app_list__",function(rs){
            rs = JSON.parse(rs);
            _this.data = rs[appId];
            _this.bindData();

            var isNeedInstall = _this.data.needInstall;
            if(isNeedInstall){
                _this.installApp(appId);
            }else{
                _this.setRightBtn();
            }
        });
    },
    //数据绑定
    bindData:function(){
        var data = this.data,
            bg = $("#app_bg"),
            icon = $("#app_icon"),
            bg_img_src = SYS.serverUrl + data.versionImg,
            icon_img_src = SYS.serverUrl + data.appIcon;

        if(data.versionImg){
            JK.imageSaveAndShow.img(bg,bg_img_src);
        }
        if(data.appIcon){
            JK.imageSaveAndShow.img(icon,icon_img_src);
        }


        $("#app_name").text(data.appName);
        JK.setTitle(data.appName);
        $("#app_info").text(data.app_info || "暂无应用介绍");
        $("#app_update_time").text(data.updateDate || DEVICE.stamp2date());
        $("#app_update_info").text(data.updateDesc || "暂无更新介绍");
        $("#app_sp_name").text(data.spName);
        $("#app_type_name").text(data.typeName);
        $("#app_update_time1").text(data.updateDate || DEVICE.stamp2date());



    },
    installApp:function(id){
        var _this = this;
        JK.app.install(id,function(){
            _this.refreshCacheAppListData(function(){
                _this.setRightBtn();
            });

        },function(){
            JK.alert("","应用安装失败，请稍后在试！");
        });
    },
    //设置使用按钮可以点击
    setRightBtn:function(){
        JK.topBar.setBtn({
            "btnTitle":"使用",
            "btnTitleColor" : "#5856d6",
            "btnFunction": openApp
        });
    },

    openApp:function(){
        var id = this.data.appId;
        JK.useAppList.save(id,function(){
            JK.app.open(id);
        })
    },

    addInstallProgressEvent:function(){
        var dom = $("#info_loading"),
            _this = this;

        window.addEventListener("install_app",function(e){
            var pro = e.process;
            for(var i= 0,l=pro.length;i<l;i++){
                var this_data = pro[i],
                    this_id = this_data.h5Id,
                    progress = this_data.process;

                if(this_id == _this.data.appId){
                    dom.css({width:progress+"%"});
                    if(progress == 100){
                        dom.css({display:"none"});
                    }
                }
            }
        },false);
    },
    refreshCacheAppListData:function(callback){
        var id = this.data.appId,
            _this = this;

        var _get = function(){
            JK.cache.get("__app_list__",function(rs){
                rs = JSON.parse(rs);
                rs[id].needInstall = false;
                _save(rs);
            });
        };

        var _save = function(data){
            _this.data = data[id];
            data = JSON.stringify(data);
            JK.cache.save("__app_list__",data,function(){
                callback();
            })
        };

        _get();
    }
};