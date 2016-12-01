function getToken_S(getDataMy) {
	JK.loading.show("急速加载中");
	$.ajax({
		url: SYS.apiUrl+"auth.do?appkey=qiNWUrR5ILoZFnXJjZQo6jPcNr5rvz0akt",//测试aoqsh9VdYzAfVC6XDlub9gnxwSLvNngjqt
		data: "",
		type: 'post',
		cache: true,
		dataType: 'JSON',
		success: function(res) {
			JK.loading.hide();
			if(res.return_code == "SUCCESS") {
				getDataMy(res.token)
			}
			//if (res.msg.Code == 10000) {
			//    register.locData = res.msg.Result;
			//    register.locSearch(register.locData);
			//    register.addData(res.msg)
			//} else {
			//    alert("获取数据失败");
			//}

		},
		complete: function(xhr, status) {
			JK.loading.hide();
		},
		error: function(res) {
			JK.loading.hide();
			JK.alert("提示","获取数据失败")

		}
	})

}
function openURL(url,data){
	var urlData = "";
		var urlEed = "";
		if(data) {
			for(var item in data) {
				urlData += item + "=" + data[item] + "&"; //key所对应的value
			}
			urlEed = urlData.substr(0, urlData.length - 1);
		}
		if(data) {
			JK.openUrl(url + '?' + urlEed);
		} else {
			JK.openUrl(url);
		}
}
