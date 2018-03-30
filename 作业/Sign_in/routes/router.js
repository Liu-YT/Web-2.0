var express = require('express');
var userInfoHandle = require("../model/userInfoHandle");
var promise = require('bluebird');
var router = express.Router();




/* 用户注册 */
router.get('/regist', function(req, res, next) {
  res.render('signup', { user: {}, error: {}});
});

router.post('/regist', function (req, res, next) {
  var error = {};
  var userInfo = req.body;
  asyncuserInfoCheckRegist(userInfo, error).then(function (result) {
    //console.log(data);
    //console.log(error);
    if (result) {
      userInfoHandle.createUser(userInfo);
      req.session.loginUser = userInfo.username;
      res.redirect('/?username='+userInfo.username);
    } else {
      //console.log(error);
      res.render('signup', { user: userInfo, error: error });
    }
  })
});

/* 用户登录 */
router.get('/', function (req, res, next) {
  var askUsername = req.query.username;
  var userInfo = {};
  var error = {};

  if (!req.session.loginUser) {
    res.render('login', { user: userInfo, error: error });
  } else {
    if (askUsername && req.session.loginUser != askUsername) 
      error.msg = "只能够访问自己的数据!";
    userInfo.username = req.session.loginUser;
    asyncUserInfoGet(userInfo).then(function (result) {
      console.log(result);
      if (result) {
        console.log(error);
        res.render("userDetail", { user: userInfo, error: error });
      }
    });
  } 
});

router.post('/', function (req, res, next) {
  var error = { status: false };
  var userInfo = req.body;
  console.log(userInfo);
  asyncuserInfoCheckLogin(userInfo, error).then(function (result) {
    console.log(error);
    if (error.status) {
      res.render('login', { user: userInfo, error: error });
    } else {
      req.session.loginUser = userInfo.username;
      res.render('userDetail', { user: userInfo, error: error });
    }
  })
});

/* 用户退出 */
router.get('/layout',function (req, res, next){
  req.session.destroy(function () {
    res.clearCookie('myCookie');
    res.redirect('/');
  });
})

/* 用户不按规则操作 */
router.get('*',function(req,res,next){
  res.redirect('/');
});



/* method */
//注册
async function asyncuserInfoCheckRegist(userInfo, error) {
  var isInfoUnique = await userInfoHandle.checkUserInfoUnique(userInfo, error);
  return isInfoUnique;
}

//登陆
async function asyncuserInfoCheckLogin(userInfo, error) {
  var loginCheck = await userInfoHandle.loginUserInfoCheck(userInfo,error);
  return loginCheck;
}

//用户详情
async function asyncUserInfoGet(userInfo) {
  var getUserInfo = await userInfoHandle.getUserInfo(userInfo);
  return getUserInfo;
}

module.exports = router;
