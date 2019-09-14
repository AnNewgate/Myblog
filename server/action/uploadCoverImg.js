var fs = require('fs'); //文件模块
var multiparty = require('multiparty');
exports.execute = function (req, res) {
    var message = {};
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: 'images/blog/cover' });
    form.parse(req, function(err, fields, files) {
        //console.log(fields, files)
        if (err) {
            message["Code"] = 1;
            message["Msg"] = err;
        } else {
            var reg = new RegExp('/');
            let url = fields.url[0];
            url = url.replace(reg, '');
            console.log(url);
            // if(url != ''){
            //     fs.unlink(url, function(err){
            //         if(err){
            //             console.log("文件删除失败！");
            //         }else{
            //             console.log("文件删除成功");
            //         }
            //     });
            // }
            message["Code"] = 0;
            message["imgSrc"] = files.file[0].path;
        }
        //console.log(message);
        res.send(message);
    });
};