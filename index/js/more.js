PAGE = {
    data:{},
    init:function(){
        this.getData();

        var _this = this;
        JK.backRefreshPage(function(){
            _this.getData(true);
        });
    },
    //从缓存获取app列表
    getData:function(notBindData){
        var typeId = DEVICE.getParamFromUrl("id"),
            data = [],
            _this = this;

        JK.cache.get("__app_list__",function(rs){
            rs = JSON.parse(rs);
            _this.data = rs;

            if(notBindData){return;}

            for(var key in rs){
                if(rs.hasOwnProperty(key)){
                    var this_typeId = rs[key].typeCode;
                    if(this_typeId == typeId){
                        data.push(rs[key]);
                    }
                }
            }


            _this.bindData(data);

        });
    },
    //数据绑定
    bindData:function(data){
        var body = $("body"),
            item = $("#more_list"),
            _this = this,
            titleName = "更多应用";

        for(var i= 0,l=data.length;i<l;i++) {
            var this_data = data[i],
                this_item = item.clone().attr({id: ""}).css3({display:"box"}),
                this_img = SYS.serverUrl + this_data.appIcon;

            titleName = this_data.typeName;


            var icon = this_item.find("img");
            if(this_data.appIcon){
                JK.imageSaveAndShow.img(icon, this_img);
            }
            this_item.find("span").text(this_data.appDesc || "暂无");
            this_item.find("p").text(this_data.appName);
            this_item.attr({"_id": this_data.appId});

            var dom = this_item.find(".more_list_left"),
                btn = this_item.find(".more_list_btn");
            $$(dom).myclickok(function(){
                var id = $(this).parent().attr("_id");
                JK.openUrl("index/info.html?id="+id);
            });
            $$(btn).myclickok(function(){
                var id = $(this).parent().attr("_id"),
                    appData = _this.data[id],
                    isNeedInstall = appData.needInstall;

                if(isNeedInstall){
                    JK.openUrl("index/info.html?id="+id);
                }else{
                    JK.useAppList.save(id,function(){
                        JK.app.open(id);
                    })
                }
            });


            body.append(this_item);
        }

        JK.setTitle(titleName);

    }
};