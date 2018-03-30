var userModel = require("./mongo.js");
var promise = require('bluebird');
var crypto = require('crypto');

var userInfoHandle = function(){};

userInfoHandle.prototype = {
    /* 获取用户信息 */
    getUserInfo: async function (userInfo) {
        return userModel.findOne({ username: userInfo.username }, function (error, doc) {
            console.log("获取用户信息");
            if (error) {
                console.log(error);
                console.log('发生错误，请再次尝试');
            } else {
                if (doc) {
                    //console.log("past message");
                    userInfo.username = doc.username;
                    userInfo.userid = doc.userid;
                    userInfo.userphone = doc.userphone;
                    userInfo.useremail = doc.useremail;
                }
            }
        });
    },

    /*
    *       检查登陆用户是否是否已注册以及密码是否正确   
    */
    loginUserInfoCheck: async function (userInfo,err) {
        return userModel.findOne({ username: userInfo.username }, function (error, doc) {
            console.log("检验用户登录信息");
            if (error) {
                console.log(error);
                console.log('发生错误，请再次尝试');
            } else {
                if (doc) {
                    var md5 = crypto.createHash('md5');
                    md5.update(userInfo.userpassword);
                    userInfo.userpassword = md5.digest('hex');
                    if(doc.userpassword != userInfo.userpassword) {
                        err.status = true;
                        err.userpassword = "密码错误，请重新输入";
                    } else {
                        //console.log("past message");
                        userInfo.username = doc.username;
                        userInfo.userid = doc.userid;
                        userInfo.userphone = doc.userphone;
                        userInfo.useremail = doc.useremail;
                    }
                } else {
                    err.status = true;
                    err.username = "该用户名未注册，请确认用户名是否正确";
                }
            }
        });
    },

    /*
    *       检查注册用户信息是否重复
    */
    checkUserInfoUnique: function (userInfo,err) {
        var self = this;
        var user =  {
            usernameUnique: false,
            useridUnique: false,
            userphoneUnique: false,
            useremailUnique: false,
        };
        return self.checkUserNameUnique(userInfo.username,err,user)
            .then(function(data){
                return self.checkUserIdUnique(userInfo.userid,err,user);
            })
            .then(function(data){
                return self.checkUserPhoneUnique(userInfo.userphone,err,user);
            })
            .then(function(data){
                return self.checkUserEmailUnique(userInfo.useremail,err,user);
            })
            .catch(function(reason){
                console.log("error: ",reason);
            }).then(function(data){
                console.log("get checkAnswer!");
                return user.useremailUnique && user.useridUnique && user.userphoneUnique && user.usernameUnique;
            });
    },

    //username
    checkUserNameUnique: function (name,err,user) {
        var p = new Promise(function (resolve, reject) {
            userModel.findOne({ username: name }, function (error, doc) {
                console.log("检验用户名是否唯一");
                if (error) {
                    console.log(error);
                    reject('发生错误，请再次尝试');
                } else {   
                    if (doc) {
                        err.username = "该用户名已经被注册";
                    } else {
                        user.usernameUnique = true;
                    }
                    resolve();
                }
            });
        });
        return p;   
    },

    //userid
    checkUserIdUnique: function (id, err,user) {
        var p = new Promise(function (resolve, reject) {
            userModel.findOne({ userid: id }, function (error, doc) {
                console.log("检验学号是否唯一");
                if (error) {
                    console.log(error);
                    reject('发生错误，请再次尝试');
                } else {      
                    if (doc) {
                        err.userid = "该学号已经被注册";
                    } else {
                        user.useridUnique = true;
                    }
                    resolve();
                }
            });
        });
        return p;  
    },

    //userphone
    checkUserPhoneUnique: function (phone, err,user) {
        var p = new Promise(function (resolve, reject) {
            userModel.findOne({ userphone: phone }, function (error, doc) {
                console.log("检验电话号码是否唯一");
                if (error) {
                    console.log(error);
                    reject('发生错误，请再次尝试');
                } else {
                    if (doc) {
                        err.userphone = "该手机号码已经被注册";
                    } else {
                        user.userphoneUnique = true;
                    }
                    resolve();
                }  
            });
        });
        return p;   
    },

    //useremail
    checkUserEmailUnique: async function (email, err,user) {
        var p = new Promise(function (resolve, reject) {
            userModel.findOne({ useremail: email }, function (error, doc) {
                console.log("检验邮箱是否唯一");
                if (error) {
                    console.log(error);
                    reject('发生错误，请再次尝试');
                } else {
                    if (doc) {
                        err.useremail = "该邮箱已经被注册";
                    } else {
                        user.useremailUnique = true;
                    }
                    resolve();
                }
            });
        });
        return p;   
    },

    /*
    *       创建新用户    
    */
    createUser: async function (userInfo) {
        var md5 = crypto.createHash('md5');
        md5.update(userInfo.userpassword);
        userInfo.userpassword = md5.digest('hex');
        var newUser = new userModel(userInfo);
        newUser.save();
    }
};

module.exports = new userInfoHandle();