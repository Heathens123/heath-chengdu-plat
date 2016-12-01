/**
 * Created by Administrator on 2016/10/17.
 */
var PAGE = {

	init: function() {
		this.uploadInfo(); //信息初始化
		this.clickFunc();
	},
	//初始化
	clickFunc: function() {
		
	},
	uploadInfo: function() {
		$('#uploadBtn').click(function() {
			JK.user.getInfo(function(res ){
				PAGE.validaOne(res.phoneNumber)
			});
			//PAGE.validaOne("13321545")
		})
	},
	validaOne : function(phone){
		var tel = $("#tel").val().trim(), //成员手机号码
			pwd = $("#pwd").val().trim(); //成员密码
		if(tel == "" || !(/^[1][3578][0-9]{9}$/.test(tel))) {
			JK.alert("系统提示", "手机号码输入错误!");
			return;
		} else if($.trim(phone) ==  tel){
			JK.alert("系统提示","不能添加自己为家庭成員");
			return;
		}else if(pwd == "") {
			JK.alert("系统提示", "密码不能为空!");
			return;
		}
		var data = {
			account: tel, //成员手机号码
			password: pwd,  //成员密码
			appType: "2" //APP版本
		};
		PAGE.validateFunc(data);
	}
	,
	validateFunc : function(data){
		AJAX.go1("family_addMemberByBaseInfo.do", data, function(res) {
			JK.openUrl(SYS.localUrl+"personal_center/user_proof.html?"+PAGE.getPageInfo(res))
		})
	},
	//获取验证成员基本信息  等待传递
	getPageInfo : function (res){
		var resData = res.data;
		//account: "15208313242"
		//appType: 2
		//area: 1
		//areaCode: ""
		//areaName: ""
		//blood: 0
		//bornDate: "1989-12-30"
		//cid: "4906990898451696554"
		//clientType: 0
		//deviceType: 4
		//headImg: "/headImg/2016-10-24/e4d8643a-f8f0-485c-b336-7b6d81430a94.png"
		//idCard: "513902198912308894"
		//importState: ""
		//importUpdateState: ""
		//isReal: 0
		//mail: ""
		//name: "彭茂召"
		//passWord: "43d9e106eab45ca30ed3294d4296de99"
		//pationid: ""
		//phoneNumber: "15208313242"
		//realName: "彭茂召123"
		//rh: 0
		//sex: "女                  "
		//token: ""
		//type: ""
		//unionid: "ceshi"
		//updateTime: null
		//userId: 5453
		//versionCode: ""
		var account = resData.account; //用戶名
		var name = resData.name || resData.realName; //姓名
		var sex = $.trim(resData.sex);
		var phoneNumber = resData.phoneNumber;
		var idCard = resData.idCard;
		var bornDate = resData.bornDate;
		var userId = resData.userId;

		return "Member_account="+account+"&Member_name="+name+"&Member_sex="+sex+
			"&Member_phoneNumber="+phoneNumber+"&Member_idCard="+idCard+"&Member_bornDate="+bornDate+"&Member_userId="+userId

	}


};