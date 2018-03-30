
var nameValid = false,
    idValid = false,
    phoneValid = false,
    emailValid = false;

window.onload = function() {
    //reset button
    $('.but')[0].onclick = function() {
        nameValid = idValid = phoneValid = emailValid = false;
        //clear the error message
        $("._name")[0].innerText = "";
        $("._id")[0].innerText = "";
        $("._phone")[0].innerText = "";
        $("._email")[0].innerText = "";
    
        for(var i = 0; i < 4; i++) {
            console.log($("input")[i].value);
            $("input")[i].value = "";
            $('.state')[i].classList = "state";
        }
    };
    //submit button
    $('.but')[1].onclick = function() {
        if(checkInfo()) {
            document.forms[0].submit();
        }
    };
    //check userName
    $("input")[0].onblur = checkName;
    //check userId
    $("input")[1].onblur = checkId;
    //check userPhone
    $("input")[2].onblur = checkPhone;
    //check userEmail
    $("input")[3].onblur = checkEmail;

}

/*
*   校验:
*       用户名6~18位英文字母、数字或下划线，必须以英文字母开头
*       学号8位数字，不能以0开头
*       电话11位数字，不能以0开头
*       邮箱按照课程讲义中的规则校验

*/

function checkInfo() {  
    //userName
    checkName();
  
    //userId
    checkId();
   
    //userPhone
    checkPhone();
   
    //userEmail
    checkEmail();
    
    return nameValid && idValid && phoneValid && emailValid;
}

function checkName() {
    var nameStanard = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
    var name = document.getElementsByName("userName")[0].value;
    if (!nameStanard.test(name)) {
        $("._name")[0].innerText = "*用户名6~18位英文字母、数字或下划线，必须以英文字母开头";
        $('.state')[0].classList.remove("p_false");
        $('.state')[0].classList.add("p_false");
        nameValid = false;
    } else {
        $("._name")[0].innerText = "";
        $('.state')[0].classList.remove("p_false");
        $('.state')[0].classList.add("p_true");
        nameValid = true;
    }
}

function checkId() {
    var idStandard = /^[1-9]\d{7}$/;
    var id = document.getElementsByName("userId")[0].value;
    if (!idStandard.test(id)) {
        $("._id")[0].innerText = "*学号8位数字，不能以0开头";
        $('.state')[1].classList.remove("p_false");
        $('.state')[1].classList.add("p_false");
        idValid = false;
    } else {
        $("._id")[0].innerText = "";
        $('.state')[1].classList.remove("p_false");
        $('.state')[1].classList.add("p_true");
        idValid = true;
    }
}

function checkPhone() {
    var phoneStandard = /^[1-9]\d{10}$/;
    var phone = document.getElementsByName("userPhone")[0].value;
    if (!phoneStandard.test(phone)) {
        $("._phone")[0].innerText = "*电话11位数字，不能以0开头";
        $('.state')[2].classList.remove("p_false");
        $('.state')[2].classList.add("p_false");
        phoneValid = false;
    } else {
        $("._phone")[0].innerText = "";
        $('.state')[2].classList.remove("p_false");
        $('.state')[2].classList.add("p_true");
        phoneValid = true;
    }
}

function checkEmail() {
    var emailStandard = /^[a-zA-Z_\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/;
    var email = document.getElementsByName("userEmail")[0].value;
    if (!emailStandard.test(email)) {
        $("._email")[0].innerText = "*请输入正确的邮箱,不可包含数字";
        $('.state')[3].classList.remove("p_false");
        $('.state')[3].classList.add("p_false");
        emailValid = false;
    } else {
        $("._email")[0].innerText = "";
        $('.state')[3].classList.remove("p_false");
        $('.state')[3].classList.add("p_true");
        emailValid = true;
    }
}