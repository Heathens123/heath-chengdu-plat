/**
 * Created by Administrator on 2016/10/17.
 */
var PAGE = {

	init: function() {
		this.infoInitial(); //信息初始化
	},
	//初始化
	infoInitial:function(){
		JK.user.getInfo(function(res) {
			if(!res.token) {
				JK.openUrl("/login/index.html");
				return;
			}
			var data = {
				token: res.token
			};
			AJAX.go1("family_getMyHolderById.do", data, function(res) {
				for(var i = 0; i < res.data.length; i++) {
					var family = $("#clone_family>.commodity_list").clone();
					var data = res.data[i];
					family.find(".commodity_pro_img").html((data.headImg ? '<img src="' + SYS.serverUrl + data.headImg + '">' : '<img src="images/testCommment.jpg" alt="">'));
					family.find(".jz_phoneNum").html(data.phoneNumber); //成员手机号
					family.find(".jz_name").html(data.name); //成员姓名
					family.attr("proId", data.userId);
					$("#family").append(family);
					family.find("button").on("click",data, function(data) {
						var data=data.data;
						JK.openUrl(SYS.localUrl+"personal_center/root_set.html?id="+data.userId+"&name="+data.name+"&headImg="+data.headImg+"&phoneNumber="+data.phoneNumber+"&idCard="+data.idCard);
					});
				}
			});
		});
	}
};