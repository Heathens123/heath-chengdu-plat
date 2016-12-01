/**
 * Created by beens on 16/5/24.
 */


SYS = {
    //是否是app
    isApp:false,
    //服务器地址
    serverUrl:"http://118.123.173.101:7001/HealthServer/",
    localUrl:"",//
    otherUrl:"http://118.123.173.101:7001/",//第三方项目url
    imgUrl:"",
    //商城banner跳转地址
    //mallBannerLink:"http://www.baidu.com",
    //客服电话
    mallAdvisoryTel:"4001158811",
    //意见反馈默认显示文字
    chatWelcomeText:"请留言建议，我们将第一时间回复您",
    //分享图标
    shareIcon:"http://118.123.173.101:7001/wx/icon.png",
    //分享地址
    shareUrl:"http://118.123.173.101:7001/wx/news_detail.html"
};

(function(){
    $(document).ready(function(){
        init();
    });
    document.addEventListener("deviceready",function(){
        init();
    },false);


    var aa = 0;
    var init = function(){
        aa++;
        var n = (SYS.isApp)? 2 : 1;
        if(aa>=n){
            if(SYS.isApp){
                JK.getServerUrl(function(src){
                    //SYS.serverUrl = src;
                    //SYS.serverUrl = "http://118.123.173.101:7001/HealthServer/";
                    //SYS.serverUrl = "http://172.16.12.10:8090/HealthService/";
                    PAGE.init();
                });
            }else{
                PAGE.init();
            }
        }
    };
})();





//改变viewport大小
(function(){
    var psd_width = 750,
        win_width = window.outerWidth || window.innerWidth,
        viewport = document.querySelector('meta[name="viewport"]'),
        dpr = window.devicePixelRatio || 1,
        scale = 1 / dpr,
        rem;

    //viewport.setAttribute('content', 'width=' + dpr * win_width + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

    $(viewport).remove();
    $("head").append('<meta name="format-detection" content="telphone=no, email=no"/><meta name="viewport" content="width='+psd_width+',user-scalable=no">');


    var style = document.createElement('style');
    //win_width = window.innerWidth;
    win_width = psd_width;
    rem = win_width/psd_width*100;

    style.innerHTML = "html{font-size:"+rem+"px!important;}";
    document.querySelector("head").appendChild(style);


    $(window).resize(function(){
        win_width = window.innerWidth;
        rem = win_width/psd_width*100;
        style.innerHTML = "html{font-size:"+rem+"px!important;}";
    });


})();


var JK = {

};

