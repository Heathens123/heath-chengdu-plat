/**
 * Created by Administrator on 2016/10/17.
 */
var PAGE = {
    init:function(){

        this.clickElement(); //跳转链接
        this.uploadFunc(); //信息上传
        this.infoInitial.getUserInfo(); //信息初始化

    },
    clickElement : function(){

        //头像点击
        $('#headImg').click(function(){
            PAGE.localFunc.changeHeadImg();
        });
        //编辑点击
        $('#edit.bj').click(function(){
            PAGE.localFunc.editNickName.edit()
        });
        $('.wc').click(function(){
            PAGE.localFunc.editNickName.compalte()
        });
        //日期选择
        $('.date_div').click(function(){
            PAGE.nativeFunc.selectDate();
        });
        //选择性别
        $('.sex_div').click(function(){
            PAGE.nativeFunc.selectSex();
        });
        //选择证件类型
        $('.pidType_div').click(function(){
            PAGE.nativeFunc.selectIDtype();
        })

    },
    localFunc : {

        //编辑头像
        changeHeadImg : function (){

            JK.getLocalImage(function(rs){
               JK.user.getInfo(function(rsInfo){
                   if(!rsInfo.token){
                       JK.reLogin();
                       return;
                   }
                   //上传头像
                   var data = {
                       token : rsInfo.token,
                       headImg : rs,
                       appType:"2"
                   };
                   AJAX.go1("upimgByBase.do",data,function(res){
                        if(PMZ_all.isNullObject(res)){
                            $('#index_head_img').attr({src:rs});
                        }
                   });

               });
            },function(res){});

        },
        uploadHead : function(){

        },
        //编辑nickName
        editNickName:{

            edit : function(){
                var textInput,moniDiv,inputs;
                moniDiv = $('.moyi_inp');
                inputs = $('#user_nick');

                moniDiv.css("display",'none');
                inputs.css("display","block").focus().val(moniDiv.text());

                $('.bj').css({display:"none"});
                $('.wc').css({display:"block"});

            },
            compalte : function(){

                var textInput,moniDiv,inputs;

                moniDiv = $('.moyi_inp');
                inputs = $('#user_nick');
                moniDiv.css("display",'block');
                inputs.css("display","none").focus();

                $('.bj').css({display:"block"});
                $('.wc').css({display:"none"});

                textInput = inputs.val();
                moniDiv.text(textInput.substr(0,8));



            }

        }

    },
    //日期 证件 性别选择
    nativeFunc : {

        selectDate : function(){

            var nowTime = PAGE.getNowTime();

            JK.showPickerView(function(res){

                //JK.alert('',PAGE.getNowTime());
                $('.date_div input[type="button"]').val(res.result).css('color',"#000")
            },function(res){},"0",nowTime,"sadf")

        },
        selectSex : function(){

            var data = [{key:"男",val:"男"},{key:"女",val:"女"}];
            JK.select("选择性别","",data,function(res){

                if(res){
                    //var Num = res+1;
                    //JK.alert('',res)
                    $('.sex_div input[type="button"]').val(res).css('color',"#000")
                }

            })

        },

        selectIDtype : function(){

            var data = [{key:1,val:"身份证"}];
            JK.select("选择证件类型","",data,function(res){

                if(res){
                    var Num = res+1;
                    $('.pidType_div input[type="button"]').val(data[res-1].val).css('color',"#000")
                }

            })
        }

    },

    //获取当前时间
    getNowTime : function (){
        var date,year,month,day;
        date = new Date();
        year = date.getFullYear();
        month = date.getMonth()+1;
        day = date.getDay();

        return year+"-"+month+"-"+day;
    },
    //数据上传Ajax
    uploadInfoAjaX : function(){
        JK.user.getInfo(function(rsInfo){
            var data = PAGE.getUploadInfo();
            data.token = rsInfo.token;  //用户token

            AJAX.go1("user_updateUser.do",data,function(res){
                PAGE.saveLocalData(res.userInfo);
                JK.info.showSuccess("更新信息成功");
            });
        });

    },

    //更新成功保存本地数据
    saveLocalData : function(res){
        JK.user.saveInfo(res)
    }
    ,
    //验证信息
    Verification : function(){
        var e = PAGE.getElement();
        //JSON.headImg = $('#headImg>img');
        //JSON.nickName = $('#nickName');
        //JSON.Name = $('#Name');
        //JSON.sex = $('#sex');
        //JSON.bornDate = $('#bornDate');
        //JSON.cardType = $('#cardType');
        //JSON.idCard = $('#idCard');
        //JSON.phoneNum = $('#phoneNum');
        //JSON.mail = $('#mail');
        if($('#user_nick').css('display') == 'block'){
            JK.info.showError("请点击右上角完成按钮");
            return
        }
        //if(e.Name.val() == ''){
        //    JK.info.showError("请填写真实姓名");
        //    return
        //}
        //if(e.sex.val() == ''){
        //    JK.info.showError("请选择性别");
        //    return
        //}
        //if(e.bornDate.val() == ''){
        //    JK.info.showError("请选择出生日期");
        //    return
        //}
        //if(e.idCard.val() == ''){
        //    JK.info.showError("请填写证件号");
        //    return
        //}
        //if(!PAGE.isCnNewID(e.idCard.val())){
        //    JK.info.showError("请填写正确的证件号码");
        //    return
        //}
        //if(e.phoneNum.val() == ''){
        //    JK.info.showError("请填写手机号");
        //    return
        //}
        //if(!(/^[1][3578][0-9]{9}$/.test(e.phoneNum.val() ))){
        //    JK.info.showError("请填写正确的手机号");
        //    return
        //}
        $("body").checkFrom(function(errDom,info){
            if(errDom.length == 0){
                PAGE.uploadInfoAjaX();
            }else{
                var dom = errDom[0],
                    msg = dom.data("error") || "您输入的信息有误";

                JK.info.showError(msg);
            }
        });
        //
    },
    //获取用户上传信息
    getUploadInfo : function(){

        var data = {};

        //data.token = PMZ_all.token;
        data.json={};
        data.appType="2";
        data.json.headImg = PAGE.getElement().headImg.attr('src');
        data.json.realName = PAGE.noSpace(PAGE.getElement().nickName.text());
        data.json.name = PAGE.noSpace(PAGE.getElement().Name.val());
        data.json.sex = PAGE.noSpace(PAGE.getElement().sex.val());
        data.json.bornDate = PAGE.noSpace(PAGE.getElement().bornDate.val());
        //data.json.bornDate = PAGE.noSpace("2006-08-02");
        data.json.idCard = PAGE.noSpace(PAGE.getElement().idCard.val());
        data.json.phoneNumber = PAGE.noSpace(PAGE.getElement().phoneNum.val());
        data.json.mail = PAGE.noSpace(PAGE.getElement().mail.val());


        //data.json.headImg = PAGE.getElement().headImg.attr('src');
        //data.json.realName = PAGE.noSpace("彭茂召");
        //data.json.name = PAGE.noSpace("彭茂召");
        //data.json.sex = PAGE.noSpace("男");
        ////data.json.bornDate = PAGE.noSpace(PAGE.getElement().bornDate.val());
        //data.json.bornDate = PAGE.noSpace("1989-12-30");
        //data.json.idCard = PAGE.noSpace("513902198912308894");
        //data.json.phoneNumber = PAGE.noSpace("15208313242");
        //data.json.mail = PAGE.noSpace(PAGE.getElement().mail.val());

        data.json = JSON.stringify(data.json);

        return data;
    }
    ,
    uploadFunc : function(){

        $('#submit_btn').click(function(){
            PAGE.Verification();
        })

    },
    //初始化信息
    infoInitial : {
        //获取用户信息
        getUserInfo : function(){

            //身份证获取
            PAGE.selectIdcard();
            JK.user.getInfo(function(rs){
                if(!rs.token){
                    JK.reLogin();
                }else {
                    PAGE.infoInitial.addData(rs);
                    PAGE.infoInitial.setColor();
                }
            })



        },
        setColor : function () {
            if(PAGE.getElement().sex.val() != "必填"){
                PAGE.getElement().sex.css({"color":"#000"})
            }
            if(PAGE.getElement().bornDate.val() != "必填"){
                PAGE.getElement().bornDate.css({"color":"#000"})
            }
            if(PAGE.getElement().cardType.val() != "必填"){
                PAGE.getElement().cardType.css({"color":"#000"})
            }
            if(PAGE.getElement().phoneNum.val() != "必填"){
                PAGE.getElement().phoneNum.css({"color":"#ccc"})
            }
        }
        ,
        //用户信息组装
        addData : function(res){

            //var headImg,nickName,Name,sex,bornDate,cardType,idCard,phoneNum,mail;
            //
            //headImg = $('#headImg>img');
            //nickName = $('#nickName');
            //Name = $('#Name');
            //sex = $('#sex');
            //bornDate = $('#bornDate');
            //cardType = $('#cardType');
            //idCard = $('#idCard');
            //phoneNum = $('#phoneNum');
            //mail = $('#mail');

            PAGE.getElement().headImg.attr('src',res.headImg);
            PAGE.getElement().nickName.text(res.realName);
            PAGE.getElement().Name.val(res.name);
            PAGE.getElement().sex.val($.trim(res.sex));
            PAGE.getElement().bornDate.val(res.bornDate);
            PAGE.getElement().cardType.val("身份证");
            PAGE.getElement().idCard.val(res.idCard);
            PAGE.getElement().phoneNum.val(res.phoneNumber);
            PAGE.getElement().mail.val(res.mail);



        }

    },
    /**
     * 判断是否为空对象
     * @param obj 对象
     * @returns {boolean}
     */
    isNullObject :function judge(obj){
        for(var i in obj){//如果不为空，则会执行到这一步，返回true
            return true;
        }
        return false;
    },
    //获取页面元素
    getElement : function (){
        var JSON = {};
        JSON.headImg = $('#headImg>img');
        JSON.nickName = $('#nickName');
        JSON.Name = $('#Name');
        JSON.sex = $('#sex');
        JSON.bornDate = $('#bornDate');
        JSON.cardType = $('#cardType');
        JSON.idCard = $('#idCard');
        JSON.phoneNum = $('#phoneNum');
        JSON.mail = $('#mail');

        return JSON ;
    },
    //去掉所有空格
    noSpace : function(StringS){
            return StringS.replace(/\s+/g, "");
    },
    selectIdcard : function(){

        $('#idCard').on("input",function(){
            if(PAGE.isCnNewID($(this).val())){
                //alert(typeof $(this).val());
                var all = $(this).val().substr(6,8);
                var length = $(this).val().length;
                var sex = $(this).val().substr(length-2,1);
                //all.substr(0,2)
                var birthy = all.substr(0,4)+"-"+all.substr(4,2)+"-"+all.substr(6,2);
                $('#bornDate').val(birthy).css("color","#000");

                if(sex/2 == 0){
                    $('#sex').val("女");
                }else {
                    $('#sex').val("男");
                }

            }
            //else {
            //    $('#bornDate').val("必填").css("color","#aaa")
            //}

        });
    },
    /**
     * 检验18位身份证号码（15位号码可以只检测生日是否正确即可）
     * @author wolfchen
     * @param cid 18为的身份证号码
     * @return Boolean 是否合法
     **/
    isCnNewID: function(cid){
            var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
            var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
            if(/^\d{17}\d|x$/i.test(cid)){
                var sum = 0, idx;
                for(var i = 0; i < cid.length - 1; i++){
                    // 对前17位数字与权值乘积求和
                    sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
                }
                // 计算模（固定算法）
                idx = sum % 11;
                // 检验第18为是否与校验码相等
                return arrValid[idx] == cid.substr(17, 1).toUpperCase();
            }else{
                return false;
            }
    }





};