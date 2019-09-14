//var getBlogList = require("../../data/getBlogList");
var adminAdd_modifyBlog = require("../../data/adminChangeData");
var url = require('url');
exports.execute = function (req, res) {
    var params = url.parse(req.url, true).query;
    var type = params.type;
    var result = "";
    req.on("data", function (chunk) {
        //console.log("小包传输完毕");
        result += chunk;
    });
    //end也是一个事件，表示所有的包传输完毕
    req.on("end", function () {
        //所有的包传输完毕
        //console.log(result.toString());
        result = JSON.parse(result);  //将一个字符串转化为一个对象
        if(type == "modify"){
            adminAdd_modifyBlog.adminModifyBlog(result.data, function (data) {
                res.send(data);
            });
        }else if(type == "add"){
            adminAdd_modifyBlog.adminAddBlog(result.data, function (data) {
                res.send(data);
            });
        }
        
    });
};