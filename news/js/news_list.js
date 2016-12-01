var data = {
	state: 1, //活动热点的状态（多个状态用逗号隔开传入）
	size: 15, //当前页码
	userId: "",
	index: 1 //每页显示记录个数
};
var pagebool = true,
	pullbool = true,
	onebool = true;
var PAGE = {
	init: function() {

		JK.backRefreshPage(function() {
			PAGE.localStorage();
		});
		JK.msgBtnInit();
		this.getNewsList(); //获取资讯列表
	},
	//
	localStorage: function() {
		var state = JSON.parse(localStorage.obj);
		var newId = state.newId.split(',');

		for(var i = 0; i < newId.length; i++) {

			if(state.state == "1") { //添加收藏
				var num_max= $(".new_max[newid=" + newId[i] + "]").find("label").text();
				var num_min= $(".news_min[newid=" + newId[i] + "]").find("label").text();
				$(".new_max[newid=" + newId[i] + "]").find("label").text(parseInt(num_max)+1);
				$(".news_min[newid=" + newId[i] + "]").find("label").text(parseInt(num_min)+1);
				
				
				$(".new_max[newid=" + newId[i] + "]").find(".info_bar").addClass("hover");
				$(".news_min[newid=" + newId[i] + "]").find(".info_bar").addClass("hover");
			} else if(state.state == "0") { //取消收藏
				
				var num_max= $(".new_max[newid=" + newId[i] + "]").find("label").text();
				var num_min= $(".news_min[newid=" + newId[i] + "]").find("label").text();
				$(".new_max[newid=" + newId[i] + "]").find("label").text(parseInt(num_max)-1);
				$(".news_min[newid=" + newId[i] + "]").find("label").text(parseInt(num_min)-1);
				
				$(".new_max[newid=" + newId[i] + "]").find(".info_bar").removeClass("hover");
				$(".news_min[newid=" + newId[i] + "]").find(".info_bar").removeClass("hover");
			}
		}

		//localStorage.removeItem("obj");
	},
	getNewsList: function() {
		var PAGE = this;
		JK.user.getInfo(function(res) {
			data.userId = res.userId || "";
			AJAX.go1("hotSpot_getListPage.do", data, function(data) {
				if(data.stateCode == "success") {
					PAGE.newsListBind(data);
				} else {
					JK.alert("提示", data.stateCode);
				}
			});
		});
	},
	newsListBind: function(res) {
		console.log(res.data.length)
		if(pagebool) {
			pagebool = false;
			if(res.data.length <= 0) {
				JK.noListShow.collection(); //无数据
				return;
			}
		}

		if(pullbool) {
			pullbool = false;
			if(res.data.length == data.size) {
				JK.pullUpLoad.set( //上滑加载下一页数据
					function() {
						data.index += 1;
						PAGE.getNewsList();
					}
				);
			}
		}
		if(res.data.length == data.size) {
			if(onebool) {
				onebool = false;
			} else {
				JK.pullUpLoad.end(false);
			}
		} else {
			if(onebool) {
				onebool = false;
			} else {
				JK.pullUpLoad.end(true);
			}
		}

		for(var i = 0; i < res.data.length; i++) {
			var cloneMax = $("#cloneMax").find(".new_max").clone();
			var cloneMin = $("#cloneMin").find(".news_min").clone();
			cloneMax.attr("newid", res.data[i].id);
			cloneMin.attr("newid", res.data[i].id);
			if(i % 5 === 0) { //大图
				cloneMax.find("p").html(res.data[i].title);
				cloneMax.find("img").attr("src", SYS.imgUrl + res.data[i].img);
				cloneMax.find(".info_bar").html(res.data[i].typeName + "<span>" + res.data[i].timeNear + "</span><label>" + res.data[i].collectNum + "</label>");
				if(res.data[i].isMyCollect) {
					cloneMax.find(".info_bar").addClass("hover");
				}
				PAGE.setCollect(cloneMax, res.data[i].id);
			} else {
				cloneMin.find("p").html(res.data[i].title);
				cloneMin.find("img").attr("src", SYS.imgUrl + res.data[i].img);
				cloneMin.find(".info_bar").html(res.data[i].typeName + "<span>" + res.data[i].timeNear + "</span><label>" + res.data[i].collectNum + "</label>");
				if(res.data[i].isMyCollect) {
					cloneMin.find(".info_bar").addClass("hover");
				}
				PAGE.setCollect(cloneMin, res.data[i].id);
			}
		}
	},
	setCollect: function(ele, cid) {
		var new_from = $(".new_from");
		$("label", ele).on("click", function(e) {
			e.stopPropagation();
			var _this = $(this);
			JK.user.getInfo(function(res) { //收藏和取消收藏判断用户是否登录
				if(!res.token) {
					JK.backRefreshPage();
					JK.openUrl("login/index.html");
				} else {
					if(!_this.parent().hasClass('hover')) {
						PAGE.addCollect(_this, cid, res.userId); //收藏
					} else {
						PAGE.delCollect(_this, cid, res.userId); //取消收藏
					}
				}
			});
		});
		//跳转到资讯详情
		ele.on("click", function(e) {
			e.stopPropagation();
			JK.openUrl("news/news_detail.html?id=" + cid);
		});
		new_from.append(ele);
	},
	addCollect: function(ele, cid, userId) {
		var data = {
			hotSpotId: cid,
			userId: userId
		};
		AJAX.go1("hotSpot_collectHotspot.do", data, function(data) {
			if(data.stateCode == "success") {
				ele.html(data.collectNum);
				ele.parent().addClass("hover");
			} else if(data.stateCode == "error-060") {
				JK.alert("提示", "收藏失败!");
			} else if(data.stateCode == "error-144") {
				JK.alert("提示", "你已经收藏过了!");
			}
		});
	},
	delCollect: function(ele, hotSpotId, userId) { //取消收藏
		var data = {
			hotSpotId: hotSpotId, //资讯ID
			userId: userId //用户ID
		};
		AJAX.go1("hotSpot_delCollectHotspot.do", data, function(data) {
			if(data.stateCode == "success") {
				ele.html(data.collectNum);
				ele.parent().removeClass("hover");
			} else if(data.stateCode == "error-060") {
				JK.alert("提示", "提交失败!");
			}
		});
	}
};