var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/accounts');

var db = mongoose.connection;

db.on('error', function () {
    console.log("连接数据库失败");
});

db.once('open', function () {
    console.log("连接数据库成功");
});

var userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    userid: { type: String, unique: true },
    userphone: { type: String, unique: true },
    useremail: { type: String, unique: true },
    userpassword: String
});

var userModel = mongoose.model("user", userSchema);

module.exports = userModel;