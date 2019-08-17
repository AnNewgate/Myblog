// 引入模块
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();
require("node-jsx").install();//安装"node-jsx"，安装该模块可以使nodejs兼容jsx语法
var ReactDOMServer = require('react-dom/server');

// 新增数据接口路由
app.get('/data/:module', function (req, res, next) {
    var c_path = req.params.module;
    var Action = require('./server/action/data/' + c_path);
    Action.execute(req, res);
});

// 新增文章页面路由
app.get('/article/:artClass/:artId',function (req,res){
    // var info = {
    //     title: "这是测试文章",
    //     content: "<strong>hahahhahhahahah</strong>",
    //     author: "chen",
    //     time: "20190107",
    //     tags: ["laji","putong","meishenme"]
    // };
    var comment = {
        content: "2223333"
    };
    var Action = require('./server/action/data/getArt_Info');
    var info = Action.execute(req, res);
    var ArticlePage = require('./client/static/js/view/main/article/index').Art_Page; //引入react组件
    //console.log(info);
    var art_page = ReactDOMServer.renderToString(ArticlePage({info: info,comment: comment}));
    res.render('client/view/article.ejs',{
        title:info.title,
        art_page:art_page
    });
})
// app.get('/article/:artClass/:artId',function (req,res){
//     var articleClass = req.params.artClass;
//     var articleId = req.params.artId;
//     var Component=require('./client/static/js/view/main/article/index').Component; //引入react组件
//     var Title=require('./client/static/js/view/main/article/index').Title; 
//     var html=ReactDOMServer.renderToString(Component({articleClass: articleClass,articleId:articleId}));
//     var articleTitle = ReactDOMServer.renderToString(Title({articleClass: articleClass,articleId:articleId}));
//     res.render("article",{title:articleTitle,component:html});
// })
// 文章获取内容的接口
// app.get('/article/getData/:artClass/:artId',function (req,res){
//     var Action = require('./server/action/view/renderArticle');
//     Action.execute(req, res);
// })

// 新增页面跳转路由
app.get('/client/:view', function (req, res, next) {
    var viewname = req.params.view;
    res.render(path.join('client/view/',viewname));
});
app.get('/admin/:view', function (req, res, next) {
    var viewname = req.params.view;
    res.render(path.join('admin/view/',viewname));
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