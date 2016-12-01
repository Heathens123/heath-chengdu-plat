/**
 * Created by Administrator on 2016/10/17.
 */
var PAGE = {

    init:function(){
        this.infoInitial(); //信息初始化
        this.clickPay(); //支付
    } ,
    //初始化
    infoInitial:function(){
        var data =  PAGE.getInfo();
        PAGE.addData(data);
    },
    clickPay: function(){
        $('#Pay').click(function(){
            //JK.alert('',"支付")
            //TODO
            var data =       {
                    "outTradeNo": t.data.order.outTradeNo //订单号
                };

            PMZ_all.pay_h(data,function(res){
                if (res.status == 0) {
                    //支付成功
                    //DEVICE.alert("支付成功!")
                    //DEVICE.locationHref("My_reservation.html");
                } else {
                    //支付失败
                    //DEVICE.alert("支付失败,请重新支付!")
                    //DEVICE.locationHref("My_reservation.html");
                }
            })

        })
    },
    getInfo : function(){

        return PMZ_all.getUrl();
    },
    addData : function (data){
        //chargeUnitType: "1"
        //expirationTime: ""
        //howMany: "10"
        //outTrade_no: "2016090816324132411347510"
        //subject: "四川省人民医院施阳"
        //timeStart: "2016-09-08"
        //totalFee: "0.01"
        var type = {
            "1" : "计次",
            "2" : "计时",
            "3" : "代收"
        };

        $('#Name').text(data.subject);
        $('#Type').text(type[data.chargeUnitType]);
        $('#timeStart').text(data.timeStart);
        $('#howMany').text(data.howMany);
        $('#expirationTime').text(data.expirationTime);
        $('#totalFee').text("￥"+data.totalFee);
        if(data.chargeUnitType == "1"){
            $('#expirationTime').parent().css('display',"none");
        }else  if(data.chargeUnitType == "2"){
            $('#howMany').parent().css('display','none');
        }

    }

};