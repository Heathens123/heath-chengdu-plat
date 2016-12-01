var topRightBtnClick = function() { //分享图标及接口
	var id = DEVICE.getParamFromUrl("id"),
		url = SYS.shareUrl + "?id=" + id;

	JK.share({
		title: PAGE.data.title, //分享的标题
		content: PAGE.data.content, //分享的内容简介
		url: url, //分享打开的地址
		imgUrl: SYS.shareIcon //分享时显示的图片地址
	});
};
var PAGE = {
	data: {
		"title": "",
		"content": ""
			//"url": SYS.shareUrl,
			//"imgUrl": SYS.shareIcon
	},
	init: function() {
		this.getNewsDetail(); //根据资讯ID获取资讯详情
		this.Addcollect(); //点赞，收藏及取消收藏
	},
	getNewsDetail: function() {
		localStorage.removeItem("newId");
		localStorage.removeItem("state");
		var id = DEVICE.getParamFromUrl("id");
		JK.user.getInfo(function(res) {
			if (!res.token) JK.reLogin();
			var data = {
				id: id,
				userId: res.userId || ""
			};
			AJAX.go1("hotSpot_getHotSpotById.do", data, function(data) {
				if (data.stateCode == "success") {
					PAGE.newsInfoBind(data);
				} else {
					JK.alert("提示", data.stateCode);
				}
			});
		});
	},
	newsInfoBind: function(dataT) {
		var data = dataT.data;
		PAGE.data.title = data.title;
		PAGE.data.content = data.content.replace(/<.*?>+/ig,'').substr(0, 60);
		$(".new_title").html(data.title);
		$(".new_img").html(data.content);
		if (data.isMyCollect) {
			$(".bar_footer>.bar_nav:eq(0)").addClass("hover");
		}
		if (data.isMyLiked) {
			$(".bar_footer>.bar_nav:eq(1)").addClass("hover");
		}
		$(".time").html(data.createDate + "<span>浏览" + data.showNum + "</span>");
	},
	Addcollect: function() {
		var collect = $(".bar_footer>.bar_nav:eq(0)"),
			support = $(".bar_footer>.bar_nav:eq(1)");
		$$(collect).myclickok(function() {
			var col = $(this);
			var id = DEVICE.getParamFromUrl("id");
			JK.user.getInfo(function(res) { //用户登录状态
				if (!res.token) {
					JK.backRefreshPage();
					JK.reLogin();
				}
				if (!col.hasClass('hover')) {
					PAGE.addCollect(col, id, res.userId); //收藏
				} else {
					PAGE.delCollect(col, id, res.userId); //取消收藏
				}
			});
		});
		//点赞
		$$(support).myclickok(function() {
			var col = $(this);
			var id = DEVICE.getParamFromUrl("id");
			JK.user.getInfo(function(res) {
				if (!res.token) {
					JK.backRefreshPage();
					JK.reLogin();
				}
				var data = {
					hotSpotId: id,
					userId: res.userId
				};
				AJAX.go1("hotSpot_likedHotspot.do", data, function(data) {
					if (data.stateCode == "success") {
						col.addClass("hover");
					} else if (data.stateCode == "error-060") {
						JK.alert("提示", "点赞失败!");
					} else if (data.stateCode == "error-144") {
						JK.alert("提示", "你已经赞过了!");
					}
				});
			});
		});
	},
	addCollect: function(col, id, userId) {
		var data = {
			hotSpotId: id,
			userId: userId
		};
		AJAX.go1("hotSpot_collectHotspot.do", data, function(data) {
			if (data.stateCode == "success") {
				var a={"state":"1","newId":id};
				localStorage.obj=JSON.stringify(a);
				col.addClass("hover");
			} else if (data.stateCode == "error-060") {
				JK.alert("提示", "收藏失败!");
			} else if (data.stateCode == "error-144") {
				JK.alert("提示", "你已经收藏过了!");
			}
		});
	},
	delCollect: function(col, id, userId) {
		var data = {
			hotSpotId: id,
			userId: userId
		};
		AJAX.go1("hotSpot_delCollectHotspot.do", data, function(data) {
			if (data.stateCode == "success") {
				col.removeClass('hover');
				var a={"state":"0","newId":id};
				localStorage.obj=JSON.stringify(a);
				//localStorage.setItem("state","a");
			} else if (data.stateCode == "error-060") {
				JK.alert("提示", "取消失败!");
			}
		});
	}
};