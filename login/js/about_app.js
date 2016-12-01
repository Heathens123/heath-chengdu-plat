var PAGE={
	init:function(){
		JK.getVer(function(res){
			$(".version span").html("&nbsp;"+res);
		});
	}
};