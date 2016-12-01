var res = PMZ_all.getUrl();
var PAGE = {
	init: function() {
		this.getReservation(); //预约详情
		
		this.cancelReservation(); //取消预约
	},
	getReservation: function() {
		$(".has_header").html('就诊提示：请于' + res.orderTime + ' 医院服务时间前往取号');
		$(".res_name").html(res.doctName + "医生") //赵医生
		$(".res_alias").html(res.doctTile); //医生职称
		if(res.doctIcon) {
			$(".res_img>img").attr("src", res.doctIcon);
		}
		$(".details_info:eq(0)>span").html(res.deptName) //科室主任
		$(".details_info:eq(1)>span").html(res.createTime) //下单时间
		var timeId = DEVICE.getParamFromUrl("timeId");
		$(".details_info:eq(2)>label").html(res.orderTime) //就诊时间
		$(".details_info:eq(3)>label").html(res.orderId); //预约号
		$(".details_info:eq(4)>label").html("￥"+parseInt(res.visitCost).toFixed(2)); //价格
	},
	cancelReservation: function() {
		if(res.orderStatus == "1") {
			$(".cancel_res").show();
		};
		var cancel = $(".cancel_res>input");
		$$(cancel).myclickok(function() { //取消预约
			JK.confirm("提示","确定要取消挂号吗?",function(){
			getToken_S(PAGE.canceJKSJ);
			});
		})
	},
	canceJKSJ: function(token) { //健康成都平台
		
		var data = {
			"msgHeader": {
				"sign": Md5(["timestamp=" + getDate(new Date), "token=" + token, "cancelDesc=不想挂号了", "cancelReason=0", "id=" + String(res.id)].sort()),
				"timeStamp": getDate(new Date),
				"token": token
			},
			"param": {
				"cancelDesc": "不想挂号了",
				"cancelReason": "0",
				"id": String(res.id)
			}
		};
		AJAX.go2(SYS.otherUrl + "api/ws/restful/service/getOrderCancelService", {paramString:JSON.stringify(data)}, function(data) { //取消预约
			if(data.msgHeader.code == "0") {
				JK.alert("提示","取消预约成功!", function() {
					window.location.reload()
				});
			} else {
				JK.alert("提示","取消失败!")
			}
		})
	}
}