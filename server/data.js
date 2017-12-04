/**
 * Created by chloe on 2017/5/24.
 */
var express = require('express');
var app = express();

var mysql = require('mysql');
//配置模块
var settings = require('./setting');
//连接数据库
var connection = mysql.createConnection(settings.db);
connection.connect();

//url.parse 方法来解析 URL 中的参数
var url = require('url');

var http = require('http');
var path = require('path');
/*创建服务*/
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
    //把搜索值输出

app.all('/login', function(req, res,next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-requested-with,content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    console.log(req.method)
    if(req.method=="POST"){
        console.log("body==",req.body);
        var params=req.body;
        var selSql = 'select pwd from users where username="'+params.username+'"';
        console.log("select:",selSql);
        connection.query(selSql, function (err, rows) {
            console.log("rows:",rows);
            if (err) throw err;
            var reqpwd = rows[0].pwd;
            console.log("select pwd:",reqpwd);
            if(reqpwd==params.pwd){
                res.send("登入成功");
            }else{
                res.send("用户名或者密码错误");
            }

        })
    }else {
        res.sendStatus(200);
        next();
    }
});
/*app.all('/postCommet', function (req, res,next) {
   console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Access-Control-Allow-Headers", "accept, content-type");
    res.header("Content-Type", "application/json;charset=utf-8");
    var data = { email: 'example@163.com', name: 'jaxu' };
    res.send(JSON.stringify(data));
    next();
    //connection.query("insert into message(user,pwd,content) values('" + 11 + "'," + 11 + ",'" + 555 + "')", function (err, rows) {
    //
    //})
});*/
//关闭连接
//
var server=app.listen(3001,function(){
    var host=server.address();
    console.log(host);
   // console.log("访问的地址是:http://%s:%s",host,post);
});