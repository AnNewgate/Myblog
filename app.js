// 引入模块
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
require("node-jsx").install();//安装"node-jsx"，安装该模块可以使nodejs兼容jsx语法
var ReactDOMServer = require('react-dom/server');

// 数据修改接口路由
app.get('/action/:module', function (req, res) {
    var c_path = req.params.module;
    var Action = require('./server/action/' + c_path);
    Action.execute(req, res);
});

// 数据修改接口路由
app.post('/action/:module', function (req, res) {
    var c_path = req.params.module;
    var Action = require('./server/action/' + c_path);
    Action.execute(req, res);
});

// 新增数据接口路由
app.get('/data/:module', function (req, res, next) {
    var c_path = req.params.module;
    var Action = require('./server/action/data/' + c_path);
    Action.execute(req, res);
});

// 新增数据接口路由
app.post('/data/:module', function (req, res) {
    var c_path = req.params.module;
    var Action = require('./server/action/data/' + c_path);
    Action.execute(req, res);
});

// 新增文章页面路由
app.get('/article/:artClass/:artId',function (req,res){
    var comment = {
        content: "2223333"
    };
    var Action = require('./server/action/data/getArt_Info');
    var infoPromise = Action.execute(req, res);
    infoPromise.then(function(info){
        //console.log(info);
        var ArticlePage = require('./client/static/js/view/main/article/index').Art_Page; //引入react组件
        var art_page = ReactDOMServer.renderToString(ArticlePage({ info: info, comment: comment }));
        res.render('client/view/article.ejs', {
            title: info.title,
            art_page: art_page
        });
    });
    Action = require('./server/action/addPageviewNum');
    Action.execute(req, res);
})

// 新增页面跳转路由
app.get('/client/:view', function (req, res, next) {
    var viewname = req.params.view;
    res.render(path.join('client/view/',viewname));
});
app.get('/admin', function (req, res, next) {
    //var viewname = req.params.view;
    res.render(path.join('admin/view/','index'));
});

// 对所有(/)URL或路由返回index.html 
app.get('/client/', function (req, res) {
    res.render('client/view/index');
});
app.get('/admin/', function (req, res) {
    res.render('admin/view/index');
});
 
// 设置views路径和模板
// app.set('views', path.join(__dirname, 'client/view'));
app.set('views', __dirname);
// app.set('views', path.join(__dirname, 'admin/view'));
app.set('view engine', 'html');
app.engine('html', ejs.__express);
 
// 静态文件配置
// app.use('/client/static', express.static(path.join(__dirname, 'client/static')));
app.use('/', express.static(__dirname));
// 启动一个服务，监听从8080端口进入的所有连接请求
var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});