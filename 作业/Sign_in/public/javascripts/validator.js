var validator = {
    form: {
        username: {
            status: false,
            errorMessage: '6~18位英文字母、数字或下划线，必须以英文字母开头'
        },
        userid: {
            status: false,
            errorMessage: '学号：8位数字，不能以0开头'
        },
        userphone: {
            status: false,
            errorMessage: '电话：11位数字，不能以0开头'
        },
        useremail: {
            status: false,
            errorMessage: '请输入合法邮箱'
        },
        userpassword: {
            password: 'myPassword',
            status: false,
            errorMessage: '密码：6~12位数字、大小写字母、中划线、下划线'
        },
        passwordTwice: {
            status: false,
            errorMessage: '密码输入不相同，请再次确认'
        }
    },

    isUsernameValid: function (username) {
        return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
    },

    isUseridValid: function (userid) {
        return this.form.userid.status = /^[1-9]\d{7}$/.test(userid);
    },

    isUserphoneValid: function (userphone) {
        return this.form.userphone.status = /^[1-9]\d{10}$/.test(userphone);
    },

    isUseremailValid: function (useremail) {
        return this.form.useremail.status = /^[a-zA-Z_0-9\-]+@([a-zA-Z0-9_\-]+\.)+[a-zA-Z]{2,4}$/.test(useremail);
    },

    isUserpasswordValid: function(userpassword) {
        if(this.form.userpassword.status = /^[a-zA-Z0-9_-]{6,12}$/.test(userpassword)){
            this.form.userpassword.password = userpassword;
            return true;
        } else {
            return false;
        }

    },

    isPasswordTwiceValid: function(passwordTwice) {
        return this.form.passwordTwice.status = (passwordTwice == this.form.userpassword.password);
    },

    isFieldValid: function (fieldname, value) {
        var CapFiledname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
        return this["is" + CapFiledname + 'Valid'](value);
    },

    isFormValid: function () {
        return this.form.username.status && this.form.userid.status && this.form.userphone.status && this.form.useremail.status && this.form.userpassword.status && this.form.passwordTwice.status;
    },

    isLoginFormValid: function() {
        return this.form.username.status && this.form.userpassword.status;
    },

    getErrorMessage: function (fieldname) {
        return this.form[fieldname].errorMessage;
    },
}

if (typeof module == 'object') { // 服务端共享
    module.exports = validator
}


