/**
 * Created by Administrator on 2016/10/19.
 */
//    http://172.16.12.9:8080
//    http://172.16.12.9:8080
var basePath = 'personal_center/';
var basePathS = 'login/';

var PMZ_all = {
    /**
     * 判断是否为空对象
     * @param obj 对象
     * @returns {boolean}
     */
    isNullObject :function judge(obj){
        for(var i in obj){//如果不为空，则会执行到这一步，返回true
            return true;
        }
        return false;
    },
    reLogin : function(){

            //从app获取个人信息
            JK.user.getInfo(function(res){
                if(!PMZ_all.isNullObject(res)){
                    JK.reLogin();
                }
            });

    },
    getUserInfo : function(Callback){

        JK.user.getInfo(function(res){

            var Info = res;
            Callback(res);


        });

    },
    token : "118ebceb2cb6952f09355a2317b1169a",
    ImgServerImg : "http://118.123.173.101:7001/HealthServer",
    //获取url参数
    getUrl : function(){
        var find_val = "";
        var paramJson = {};

        var search = window.location.search;
        search = search.substr(1);
        var searchs = search.split("&");

        for( var i= 0,l=searchs.length;i<l;i++){
            var this_val =  searchs[i],
                this_num = this_val.indexOf('='),
                this_key = this_val.substr(0,this_num),
                this_vals = this_val.substr(this_num+1,this_val.length-1);
            paramJson[this_key] = decodeURI(this_vals);
        }
        return paramJson;
    },
    isHasToken : function(){
        PMZ_all.getUserInfo(function(res){
            if(!PMZ_all.isNullObject(res)){
                JK.reLogin();
            }
        })
    },
    pay_h : function(data,success){

        YJH.H5ModuleManager.requestPayment(
            function(res) {
                success(res);
            }, 0, data
        )

    }
};