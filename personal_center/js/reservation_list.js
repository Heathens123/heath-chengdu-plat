/**
 * Created by Adminzjs1 on 2016/7/6.
 */
var nullBool = true;
var PAGE = {
	init: function() {
		getToken_S(PAGE.getMakeInfo);
	},
	tabsFunction: function(url_hash) { //初始切换tabs
		if(url_hash == "") {
			$(".bar_header .tabs:eq(0)").addClass("hover");
		} else {
			$(".bar_header .tabs:eq(" + window.location.hash.substr(1) + ")").addClass("hover");
		}
	},
	getMakeInfo: function(token) { //健康成都
		//      var _this=this;
		var url_hash = window.location.hash.substr(1);
		PAGE.tabsFunction(url_hash);

		JK.user.getInfo(function(res) {
			if(!res.token) {
				JK.reLogin();
				return;
			}
			var data = {
				"msgHeader": {
					"sign": Md5(["userid=" + res.userId, "timestamp=" + getDate(new Date()), "token=" + token].sort()),
					"timeStamp": getDate(new Date()),
					"token": token
				},
				"param": {
					"userId": String(res.userId)
				}
			};
			AJAX.go2(SYS.otherUrl + "api/ws/restful/service/getOrderListService", { //健康成都
				paramString: JSON.stringify(data)
			}, function(data) {
				PAGE.getMakeData(data.orderInfo, token);
			});
		});

		var header = $(".bar_header .tabs");
		$$(header).myclickok(function() {
			header.removeClass("hover");
			$(this).addClass("hover");
			$(".reseration").hide();
			//window.location.hash = $(this).index();
			JK.urlHash($(this).index());
			$(".reseration:eq(" + $(this).index() + ")").show();
			JK.setTitle("我的预约");
		});
	},
	getMakeData: function(result, token) {
		var dataT = result;
		if(nullBool && dataT.length <= 0) {
			nullBool = false;
			JK.noListShow.reservation(); //无内容
			return;
		};
		for(var i = 0; i < dataT.length; i++) {
			var dataStr = dataT[i];
			var obj = $("#reseraton").find(".reseration_list").clone();
			obj.find("img").attr("src", (dataStr.doctIcon ? dataStr.doctIcon : "images/defalutDoctor.png"));
			var label = obj.find("p.name");
			obj.find(".editor_info").html("就诊时间：" + dataStr.orderTime + " " + (dataStr.timeRange == 1 ? '上午' : dataStr.timeRange == 2 ? '下午' : '晚上'));
			//1.预约成功 2.个人取消,3.系统取消
			if(dataStr.orderStatus == 1||dataStr.orderStatus == 2) {
				label.append("<label>预约成功</label>");
				obj.find(".editor_info").append("<span class='cancel'>取消</span>");
			}else if(dataStr.orderStatus == 3) {
				label.html("<label>已取消</label>");
				//obj.find(".editor_info").append("<span class='confirm'>已取消</span>");
			}

			obj.find("p.name").html(dataStr.orgName + label.html()); //医院名字
			obj.find("p.nick_name").html(dataStr.doctName + "医生"); //以上姓名
			obj.find("p.nick_info:eq(0)>span").html(dataStr.deptName); //预约科室
			obj.find("p.nick_info:eq(1)").html("<span>" + (dataStr.doctTile||"") + "</span><label>" + dataStr.createTime + "</label>");

			var objtion = obj.clone();

			$(".reseration_pList", objtion).on("click", dataStr, function(data) { //预约详情
				PAGE.clickDetail(data);
			});
			$(".reseration_pList", obj).on("click", dataStr, function(data) { //预约详情
				PAGE.clickDetail(data);
			});

			//取消预约挂号
			obj.find(".editor_info>.cancel").on("click", dataStr, function(data) {
					JK.confirm("提示", "确定要取消挂号吗?", function() {
						PAGE.canceJKSJ(data.data.id, token);
					});
				})
			//取消预约挂号
			objtion.find(".editor_info>.cancel").on("click", dataStr, function(data) {
				JK.confirm("提示", "确定要取消挂号吗?", function() {
					PAGE.canceJKSJ(data.data.id, token);
				});
			})
			$(".reseration:eq(0)").append(objtion);
			if(dataStr.orderStatus == 1||dataStr.orderStatus == 2) { //预约成功数据
				$(".reseration:eq(1)").append(obj);
			} else { //预约失败数据
				$(".reseration:eq(2)").append(obj);
			}
		}
		var id = window.location.hash.substr(1);
		if(id == 1) {
			$(".reseration").hide();
			$(".reseration:eq(1)").show()
		} else if(id == 2) {
			$(".reseration").hide();
			$(".reseration:eq(2)").show()
		} else {
			$(".reseration").hide();
			$(".reseration:eq(0)").show();
		}
	},
	clickDetail: function(data) {
		var data = data.data;
		//健康成都详情
		openURL("personal_center/reservation_detail_1.html", { //重写openURL(url,data)
			id: data.id, //ID
			orderId: data.orderId, //订单ID
			createTime: data.createTime, //下单时间
			doctIcon: data.doctIcon || "", //医生头像
			deptName: data.deptName, //预约科室
			visitCost: data.visitCost, //预约价格
			orderStatus: data.orderStatus, //预约状态
			doctTile: data.doctTile, //医生职称
			doctName: data.doctName, //医生名称
			orderTime: (data.orderTime + " " + (data.timeRange == 1 ? '上午' : data.timeRange == 2 ? '下午' : '晚上')) //就诊时间
		});
	},
	canceJKSJ: function(orderId, token) { //健康成都平台
		var data = {
			"msgHeader": {
				"sign": Md5(["timestamp=" + getDate(new Date), "token=" + token, "cancelDesc=不想挂号了", "cancelReason=0", "id=" + String(orderId)].sort()),
				"timeStamp": getDate(new Date),
				"token": token
			},
			"param": {
				"cancelDesc": "不想挂号了",
				"cancelReason": "0",
				"id": String(orderId)
			}
		};
		AJAX.go2(SYS.otherUrl + "api/ws/restful/service/getOrderCancelService", {paramString:JSON.stringify(data)}, function(data) { //取消预约
			if(data.msgHeader.code == "0") {
				JK.alert("提示", "取消预约成功!", function() {
					window.location.reload()
				});
			} else {
				JK.alert("提示", "取消失败!")
			}
		})
	}

}