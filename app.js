// 引入模块
var express = require('express');
var path = require('path');
var ejs = require('ejs');
//require('font-awesome-webpack');
var app = express();

// 新增接口路由
app.get('/data/:module', function (req, res, next) {
    var c_path = req.params.module;
    var Action = require('./server/action/data/' + c_path);
    Action.execute(req, res);
});

// 新增页面路由
app.get('/:view', function (req, res, next) {
    var viewname = req.params.view;
    res.render(viewname);
});

// 新增font路由(用的footer组件会自动请求 /font/的font文件，但是无法访问到，只能根据这个设置一下)
// 新增了webpack的output的publicPath选项，使得请求路径正确，所以解决了问题
// app.get('/font/:font', function (req, res, next) {
//     var fontname = req.params.font;
//     var fontpath = path.join(__dirname, 'client/static/output/font');
//     fontname = fontpath + "/" + fontname;
//     res.send(fontname);
// });

// 对所有(/)URL或路由返回index.html 
app.get('/', function (req, res) {
    res.render('index');
});
 
// 设置views路径和模板
app.set('views', path.join(__dirname, 'client/view'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
 
// 静态文件配置
app.use('/client/static', express.static(path.join(__dirname, 'client/static')));
 
// 启动一个服务，监听从8080端口进入的所有连接请求
var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});