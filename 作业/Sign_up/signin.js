/*
*   server
*/
var http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs   = require("fs"),
    querystring = require("querystring");

//judge wheather the information has been register
var nameRegistered = false,
    idRegistered   = false,
    phoneRigstered = false,
    emailRegistered = false;

var userList = [];  //store user information


var indexHtml = [ 
    '<!DOCTYPE html>',
    '<html>',
        '<head>',
            '<meta charset="utf-8" />',
            '<title>Welcome</title>',
            '<link href="index.css" type="text/css" rel="stylesheet" />',
            '<script src="register.js" type=\'text/javascript\'></script>',
            '<script src="jquery-3.2.1.min.js" type=\'text/javascript\'></script>',
        '</head>',
        '<body>',
            '<div id="position">',
                '<div id="loginBlock">',
                    '<form method="post">',
                        '<h1>用户注册</h1>',
                        '<span class="message">用户名: <input type="text" name="userName" placeholder="用户名" class="info" /><div class="state"></div></span>',
                        '<span class="_name error"></span>',
                        '<span class="message">学号  :  <input type="text" name="userId" placeholder="学号" class="info" /><div class="state"></div></span>',
                        '<span class="_id error"></span>',
                        '<span class="message">电话  :  <input type="text" name="userPhone" placeholder="电话" class="info" /><div class="state"></div></span>',
                        '<span class="_phone error"></span>',
                        '<span class="message">邮箱  :  <input type="text" name="userEmail" placeholder="电子邮箱" class="info" /><div class="state"></div></span>',
                        '<span class="_email error"></span>',
                        '<input type="button" value="重置" class="but" id="reset">',
                        '<input type="button" value="提交" class="but" id="_submit">',
                    '</form>',
                '</div>',
            '</div>',
        '</body>',
    '</html>'
];


var userDetail = [
    "<!DOCTYPE html>",
    "<html>",
        "<head>",
            '<meta charset="utf-8\" />',
            "<title>Welcome</title>",
            '<link href=\"detail.css\" type="text/css" rel="stylesheet" />',
        "</head>",
        '<body>',
            '<div id="position">',
                '<div id="infoBlock">',
                    '<h1>用户详情</h1>',
                    '<span>用户名:','name','</span>',
                    '<span>学号   :','id','</span>',
                    '<span>电话   :','phone', '</span>',
                    '<span>邮箱   :','email','</span>',
                '</div>',
            '</div>',
        '</body>',
    '</html>'
];


http.createServer(function (req, res) {
    var info = querystring.parse(url.parse(req.url).query);
    if (req.method.toLowerCase() === "post") {
        handleInfo(req,res);
    } else {
        if(!info.username || newUser(info.username)) 
            show(req, res);
        else {
            for(var i = 0; i < userList.length; ++i) {
                if(userList[i].userName == info.username) {
                    userInfo = userList[i];
                    break;
                }
            }
            showDetail(res,userInfo);
        }
    }

}).listen(8000);
console.log('服务成功开启');
console.log('Server running at http://172.18.32.216:8000/');

function newUser(name) {
    for (var i = 0; i < userList.length; ++i) {
        if (userList[i].userName == name) 
            return false;
    }
    return true;
}


//index -- register
function show(req,res) {
    var pathname = __dirname + url.parse(req.url).pathname;
    if (pathname.charAt(pathname.length - 1) == "/" || path.extname(pathname) == "") {
        showIndex(res);
    } else {
        fs.exists(pathname, function (exists) {
            if (exists) {
                switch (path.extname(pathname)) {
                    case ".html":
                        res.writeHead(200, { "Content-Type": "text/html" });
                        break;
                    case ".js":
                        res.writeHead(200, { "Content-Type": "text/javascript" });
                        break;
                    case ".css":
                        res.writeHead(200, { "Content-Type": "text/css" });
                        break;
                    case ".gif":
                        res.writeHead(200, { "Content-Type": "image/gif" });
                        break;
                    case ".jpg":
                        res.writeHead(200, { "Content-Type": "image/jpg" });
                        break;
                    case ".png":
                        res.writeHead(200, { "Content-Type": "image/png" });
                        break;
                    default:
                        res.writeHead(200, { "Content-Type": "application/octet-stream" });
                }

                fs.readFile(pathname, function (err, data) {
                    res.end(data);
                });
            } else {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>404 Not Found</h1>");
            }
        });
    }
}

function showIndex(res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(indexHtml.join(""));
    res.end();
    //errror message reset
    indexHtml[15] = '<span class="_name error"></span>';
    indexHtml[17] = '<span class="_id error"></span>';
    indexHtml[19] = '<span class="_phone error"></span>';
    indexHtml[21] = '<span class="_email error"></span>';
    //right message reset
    indexHtml[14] = '<span class="message">用户名:<input type="text" name="userName" placeholder="用户名" class="info" /><div class="state"></div></span>';
    indexHtml[16] = '<span class="message">学号  :  <input type="text" name="userId" placeholder="学号" class="info" /><div class="state"></div></span>';
    indexHtml[18] = '<span class="message">电话  :  <input type="text" name="userPhone" placeholder="电话" class="info" /><div class="state"></div></span>';
    indexHtml[20] = '<span class="message">邮箱  :  <input type="text" name="userEmail" placeholder="电子邮箱" class="info" /><div class="state"></div></span>';
}

//detail information
function showDetail(res, userInfo) {
    userDetail[12] = "<div class=\"message\">" + userInfo.userName + "</div>";
    userDetail[15] = "<div class=\"message\">" + userInfo.userId + "</div>";
    userDetail[18] = "<div class=\"message\">" + userInfo.userPhone + "</div>";
    userDetail[21] = "<div class=\"message\">" + userInfo.userEmail + "</div>";
    res.write(userDetail.join(""));
    res.end();
}

/*get user information */
function handleInfo(req,res) {
    var userInfo = "";
    req.on('data', function (chunk) {
        userInfo += chunk;
    });

    req.on('end', function () {
        userInfo = querystring.parse(userInfo);
        console.log("userInfo : ",userInfo);
        if (!checkRegisterInfo(userInfo)) {
            userList.push(userInfo);
            res.writeHead(301, { Location: "?username=" + userInfo.userName });
            res.end();
        } else {
            if (nameRegistered) {
                console.log(userInfo.userName, "--this username has been registed");
                indexHtml[15] = '<span class="_name error">' + userInfo.userName + " --- " + '该用户名已经被注册</span>';
            } else {
                indexHtml[14] = '<span class="message">用户名:<input type="text" name="userName" placeholder="用户名"' + 'value = ' + '\"' + userInfo.userName + '\"' + 'class="info" /><div class="state"></div></span>';
            }

            if (idRegistered) {
                console.log(userInfo.userId, "--this userid has been registed");
                indexHtml[17] = '<span class="_id error">' + userInfo.userId + " --- " + '该ID已经被注册</span>';
            } else {
                indexHtml[16] = '<span class="message">学号  :  <input type="text" name="userId" placeholder="学号"' + 'value = ' + '\"' + userInfo.userId + '\"' + 'class="info" /><div class="state"></div></span>';
            }

            if (phoneRigstered) {
                console.log(userInfo.userPhone, "--this userphone has been registed");
                indexHtml[19] = '<span class="_phone error">' + userInfo.userPhone + " --- " + '该电话已经被注册</span>';
            } else {
                indexHtml[18] = '<span class="message">电话  :  <input type="text" name="userPhone" placeholder="电话"' + "value = " + '\"' + userInfo.userPhone + '\"' + 'class="info" /><div class="state"></div></span>';
            }

            if (emailRegistered) {
                console.log(userInfo.userEmail, "--this useremail has been registed");
                indexHtml[21] = '<span class="_email error">' + userInfo.userEmail + " --- " + '该邮箱已经被注册</span>';
            } else {
                indexHtml[20] = '<span class="message">邮箱  :  <input type="text" name="userEmail" placeholder="电子邮箱"' + "value = " + '\"' + userInfo.userEmail + '\"' + 'class="info" /><div class="state"></div></span>';
            }
            showIndex(res);
        }
    });
}




/*
*       校验发现错误时，要在界面上提示具体出错的原因
*       用户名、学号、电话、邮箱均不可重复，重复时要在界面上显示具体重复的内容
*       注册过的返回true，否则返回false
*/
function checkRegisterInfo(userInfo) {
    nameRegistered = idRegistered = phoneRigstered = emailRegistered = false;
    for(var i = 0; i < userList.length; i++) {
        if(userInfo.userName == userList[i].userName)
            nameRegistered = true;
        if(userInfo.userId == userList[i].userId)
            idRegistered = true;
        if (userInfo.userPhone == userList[i].userPhone)
            phoneRigstered = true;
        if(userInfo.userEmail == userList[i].userEmail)
            emailRegistered = true;
    }
    return nameRegistered || idRegistered || phoneRigstered || emailRegistered;
}