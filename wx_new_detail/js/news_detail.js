
var PAGE = {
	data: {
		"title": "",
		"content": "",
		"url": SYS.shareUrl,
		"imgUrl": SYS.shareIcon
	},
	init: function() {
		JK.alert = function(title,message){
			alert(message);
		};

		JK.loading = (function(){
			var a = new DEVICE.loading();
			return {
				show:function(text){
					a.show(text);
				},
				hide:function(){
					a.hide();
				}
			}
		})();


		this.getNewsDetail(); //根据资讯ID获取资讯详情
		this.Addcollect(); //点赞，收藏
	},
	getNewsDetail: function() {
		JK.loading.show("急速加载中");
		PAGE = this;
		var id = DEVICE.getParamFromUrl("id");
		//JK.user.getInfo(function(res) {
			$.ajax({
				url: SYS.serverUrl + "hotSpot_getHotSpotById.do",
				data: {
					id: id
					//userId: res.userId||""
				},
				type: "POST",
				dataType: "JSON",
				timeout: 40000,
				success: function(data) {
					JK.loading.hide();
					if(data.stateCode == "success") {
						PAGE.data.title = data.data.title;
						PAGE.data.content = data.data.content.match(/[\u4e00-\u9fa5]+/ig).join("").substr(0, 60);
						$(".new_title").html(data.data.title);
						$(".new_img").html(data.data.content);
						if(data.isMyCollect) {
							$(".bar_footer>.bar_nav:eq(0)").addClass("hover")
						}
						if(data.isMyLiked) {
							$(".bar_footer>.bar_nav:eq(1)").addClass("hover")
						}
						$(".time").html(data.data.createDate + "<span>浏览" + data.data.showNum + "</span>")
					} else {
						JK.alert("提示", ErrorMsg[data.stateCode]);
					}
				}
			});
		//})
	},
	Addcollect: function() {
		var collect = $(".bar_footer>.bar_nav:eq(0)"),
			support = $(".bar_footer>.bar_nav:eq(1)");
		//收藏
		$$(collect).myclickok(function() {
			var col = $(this);
			var id = DEVICE.getParamFromUrl("id");
			JK.user.getInfo(function(res) {
				if(!res.token) {
					JK.backRefreshPage();
					JK.openUrl("login/index.html");
				} else {
					$.ajax({
						url: SYS.serverUrl + "hotSpot_collectHotspot.do",
						data: {
							hotSpotId: id,
							userId: res.userId
						},
						type: "POST",
						dataType: "JSON",
						timeout: 40000,
						success: function(data) {
							if(data.stateCode == "success") {
								//collect.val(+1);
								col.addClass("hover")
							} else if(data.stateCode == "error-060") {
								JK.alert("提示", "收藏失败!");
							} else if(data.stateCode == "error-144") {
								JK.alert("提示", "你已经收藏过了!");
							}
						}
					})
				}
			})
		});
		//点赞
		$$(support).myclickok(function() {
			var col = $(this);
			JK.user.getInfo(function(userId) {
				if(userId == "") {
					//跳转到登录
				} else {
					$.ajax({
						url: SYS.serverUrl + "hotSpot_likedHotspot.do",
						data: {
							hotSpotId: 56
						},
						type: "POST",
						dataType: "JSON",
						timeout: 40000,
						success: function(data) {
							if(data.stateCode == "success") {
								//collect.val(+1);
								col.addClass("hover")
							} else if(data.stateCode == "error-060") {
								JK.alert("提示", "提交失败!");
							} else if(data.stateCode == "error-144") {
								JK.alert("提示", "你已经收藏过了!");
							}
						}
					})
				}
			})
		})
	}
}