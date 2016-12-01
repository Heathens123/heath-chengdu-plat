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