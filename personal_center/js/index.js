/**
 * Created by Administrator on 2016/10/17.
 */
var PAGE = {

    init: function () {
        if(!DEVICE.isAndroid){
            $("#message").css({
                top:"0.75rem"
            })
        }
        $("#message").css({display:"block"});


        this.infoInitial.getUserInfo(); //信息初始化
    },
    UserInfo: ""
    ,
    //初始化
    infoInitial: {
        getUserInfo: function () {
            JK.user.getInfo(function (res) {
                if (!res.token) {
                    JK.reLogin();
                } else {
                    PAGE.UserInfo = res;
                    PAGE.infoInitial.setData(res);
                    PAGE.infoInitial.getNum(res.token);
                    PAGE.localHrefs(); //跳转链接
                }

            });
        },
        setData: function (res) {

            $('#index_text').text(res.realName);
            $('.index_head_img').attr('src', res.headImg)

        },
        //获取消息次数
        getNum: function (token) {

            var datas = {};
            datas.token = token;
            AJAX.go1("servicePort/messageCount.do", datas, function (res) {

                if (res.data[0].counts == 0) {
                    $('.index_ld_div_num').remove();
                } else {
                    var n = res.data[0].counts;
                    n = (n>99)? "99+" : n;
                    $('#message').append('<button class="index_ld_div_num">' + n + '</button>');
                }

            })
        }
    }
    ,
    localHrefs: function () {

        ////资料填写跳转
        $('#index_head,#index_text').click(function () {
            JK.backRefreshPage();
            JK.openUrl(basePath + "myInfo.html");
        });
        //我的预约
        $('#my_order').click(function () {
            JK.backRefreshPage();
            JK.openUrl(basePath + "reservation_list.html");
        });
        //商品列表
        $('#commodity_order').click(function () {
            JK.openUrl(basePath + "commodity_order.html");
        });
        //业务订单
        $('#business_order').click(function () {
            JK.openUrl(basePath + "business_order.html?businessList=1");
        });
        //收货地址
        $('#getAddress').click(function () {
            JK.openUrl("address/" + "index.html");
        });
        //我的家庭
        $('#myFamily').click(function () {
            JK.openUrl(basePath + "myFamily.html");
        });
        //收藏信息
        $('#collect_info').click(function () {
            JK.openUrl(basePath + "collect_info.html");
        });
        //意见反馈
        $('#Complaint_feedback').click(function () {
            JK.openUrl(basePath + "Complaint_feedback.html");
        });
        //设置
        $('#user_set').click(function () {
            JK.openUrl(basePath + "user_set.html");
        });
        //右上角消息提示
        $('#message').click(function () {
            JK.backRefreshPage(function () {
                PAGE.NewsBack();
            });
            JK.openUrl(basePath + "myNews.html");
        })

    }
    ,
    NewsBack: function () {
        PAGE.infoInitial.getNum(PAGE.UserInfo.token);
    },
    /**
     * 判断是否为空对象
     * @param obj 对象
     * @returns {boolean}
     */
    isNullObject: function judge(obj) {
        for (var i in obj) {//如果不为空，则会执行到这一步，返回true
            return true;
        }
        return false;
    },
    isReLogin: function () {
        JK.user.getInfo(function (rs) {
            if (!rs.token) {
                JK.reLogin()
            }
        })
    }


};