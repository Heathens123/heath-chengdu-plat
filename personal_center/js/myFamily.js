/**
 * Created by Administrator on 2016/10/17.
 */
/**
 * Created by Administrator on 2016/10/17.
 */
var topRightBtnClick = function() {
	JK.editChangeToCancelBtn(function() {
		PAGE.clickRight.clickDel();
	}, function() {
		PAGE.clickRight.left();
	});
};
var PAGE = {
	init: function() {
		JK.editChangeToCancelBtnInit();
		this.localHrefs(); //跳转链接
		this.clickFunc(); //点击事件
		//初始化数据
		this.infoInitial(); //初始化数据
		this.editInfo(); //删除家庭成员
	},
	infoInitial: function() {
		//初始化户主信息

		JK.user.getInfo(function(res) {
			$(".float_div>button:eq(1)").show();
			$(".commodity_pro_img>img").attr("src", (res.headImg ? res.headImg : "")); //户主头像
			$(".jz_name").html(res.name); //户主姓名
			$(".commodity_price>span").html(res.idCard); //户主身份证
			$(".commodity_list .jz_phoneNum").html(res.phoneNumber); //户主手机号
			if (!res.token) {
				JK.openUrl("/login/index.html");
				return;
			}
			var data = {
				token: res.token
			};
			AJAX.go1("family_getMyFamilyByMemberId.do", data, function(res) {
				for (var i = 0; i < res.data.length; i++) {
					var family = $("#clone_family>.commodity_family_list").clone();
					var data = res.data[i];
					family.find(".jz_name_family").html(data.name);
					family.find(".commodity_family_img").html((data.headImg ? '<img src="' +   SYS.serverUrl+data.headImg + '">' : '<img src="images/testCommment.jpg" alt="">'));
					family.find(".jz_phoneNum").html(data.phoneNumber); //成员手机号
					family.find(".commodity_price_price").html(data.idCard); //成员身份证
					family.attr("proId", data.userId);
					//<img class="commodity_family_list_select" src="images/select_icon.png" alt="">
					//关联户主
//					family.on("click", data, function(dataT) {
//						var dataT = dataT.data;
//						
//						if (!$(this).hasClass('DE_div')) {
//							JK.openUrl(SYS.localUrl + "personal_center/myFamily_connect.html?userId=" + dataT.userId + "&name=" + dataT.name + "&headImg=" + dataT.headImg + "&phoneNumber=" + dataT.phoneNumber + "&idCard=" + dataT.idCard);
//						}
//					});
					$("#family").append(family);
				}
			});
		});
	},
	localHrefs: function() {
		////资料填写跳转
		$('#add_peo').click(function() {
			JK.backRefreshPage();
			JK.openUrl(SYS.localUrl + "add_family.html");
		});
	},
	clickRight: {
		left: function() {
			$(".float_div>button:eq(0)").hide();
			$(".float_div>button:eq(1)").show();
			$('#family .clickB').removeClass("DE_div left_delete");
			$('#family .clickB .commodity_family_list_select').remove();
		},
		clickDel: function() { //编辑
			$(".float_div>button:eq(1)").hide();
			$(".float_div>button:eq(0)").show();
			$('#family .clickB').addClass("DE_div").eq(0).addClass("left_delete");
			setTimeout(function() {
				$('#family .clickB').append('<img class="commodity_family_list_select" src="images/select_icon.png" alt="">');
				$('#family .clickB:eq(0)').find('.commodity_family_list_select').show();
			}, 100);
		}
	},
	clickFunc: function() {
		$('#family').on('click', '.DE_div', function() {
			var _this = $(this);
			if (_this.hasClass('DE_div')) {
				if (_this.hasClass('left_delete')) {
					_this.removeClass('left_delete').find('.commodity_family_list_select').hide();
					setTimeout(function() {
						_this.find('.commodity_family_list_select').hide();
					}, 100);
				} else {
					_this.addClass('left_delete');
					setTimeout(function() {
						_this.find('.commodity_family_list_select').show();
					}, 100);
				}
			}
		});
	},
	editInfo: function() {
		//户主权限
//		$(".commodity_list").click(function() { //户主权限
//			JK.openUrl(SYS.localUrl + "personal_center/user_competence.html");
//		});

		var myInfo_button = $(".float_div button:eq(0)");
		var myInfo_button1 = $(".float_div button:eq(1)");
		$$(myInfo_button1).myclickok(function() { //添加家庭成员
			JK.openUrl(SYS.localUrl + "personal_center/add_family.html");
		});
		$$(myInfo_button).myclickok(function() { //删除家庭成员
			JK.confirm("系统提示", "您是否确定删除？", function() {
				PAGE.delList();
			});
		});
	},
	delList: function() {
		var idNum = PAGE.getId();
		JK.user.getInfo(function(res) {
			if (!res.token) {
				JK.reLogin();
			}
			var data = {
				token: res.token,
				memberIdList: idNum.string
			};
			AJAX.go1("family_delmemberListByIdList.do", data, function(res) {
				JK.alert("提示","删除成功!",function(){
					window.location.reload();
				})
			});
		});
	},
	getId: function() {
		var string = "";
		var array = [];
		$('#family .clickB').each(function(e) {
			if ($(this).hasClass('left_delete')) {
				string += $(this).attr("proid") + ",";
				array.push(e);
			}
		});
		var stringS = string.substring(0, string.length - 1);
		var data = {
			string: stringS,
			array: array
		};
		return data;
	}
};