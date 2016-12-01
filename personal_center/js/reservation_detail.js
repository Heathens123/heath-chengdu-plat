function JKalert(alt) {
	JK.alert("提示", alt);
}
var PAGE = {
	init: function() {
		getToken_S(PAGE.getReservation);
	},
	getReservation: function(token) {
		PAGE.cancelReservation(token);
		var id = DEVICE.getParamFromUrl("id");
		JK.user.getInfo(function(res) {
			var data = {
				"msgHeader": {
					"sign": Md5(["id=" + String(id), "timestamp=" + getDate(new Date), "token=" + token].sort()),
					"timeStamp": getDate(new Date),
					"token": token
				},
				"param": {
					"id": String(id)
				}
			};
			$.ajax({
				url: pageurl + "getOrderDetailService",
				data: {
					paramString: JSON.stringify(data)
				},
				type: 'post',
				cache: true,
				dataType: 'JSON',
				success: function(res) {
					if(res.msgHeader.code == "ORDER_NOT_EXIST") {
						JKalert(res.msgHeader.desc);
						//JK.goBack();
						return;
					}
					res = res.data;
					$(".has_header").html('就诊提示：请于' + res.orderTime + ' 医院服务时间前往取号');
					$(".res_name").html(doctName + "医生")
					$(".res_alias").html(res.visitCost);//职称
					$(".res_img>img").attr("src","images/defalutDoctor.png");//头像
					$(".details_info:eq(0)>span").html(res.sdeptName)//
					$(".details_info:eq(1)>span").html(res.createTime)//预约时间
					$(".details_info:eq(2)>span").html(res.orderTime)//就诊时间
					$(".details_info:eq(3)>label").html(res.patientName)//患者姓名
				}
			})
		});
	},
	cancelReservation: function() {
		var state = DEVICE.getParamFromUrl("state");
		var id = DEVICE.getParamFromUrl("id");
		if(state) {
			$(".cancel_res").show();
		}
		var cancel = $(".cancel_res>input");
		$$(cancel).myclickok(function() { //取消预约
			JK.user.getInfo(function(res) { //获取手机号
				var data = {
					"msgHeader": {
						"sign": Md5(["timestamp=" + getDate(new Date), "token=" + token, "cancelDesc=不想挂号了", "cancelReason=0", "id=" + String(id)].sort()),
						"timeStamp": getDate(new Date),
						"token": token
					},
					"param": {
						"cancelDesc": "不想挂号了",
						"cancelReason": "0",
						"id": String(id)
					}
				};
				$.ajax({
					url: pageurl + "getOrderCancelService",
					data: {
						paramString: JSON.stringify(data)
					},
					type: 'post',
					cache: true,
					dataType: 'JSON',
					success: function(res) {
						if(res.msgHeader.code == "ORDER_NOT_EXIST") {
							JJKalert(res.msgHeader.desc);
						} else if(res.msgHeader.code == "0") {
							JKalert("取消预约成功!");
						}
					}
				})
			});
		})
	}
}