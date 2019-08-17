//var getBlogList = require("../../data/getBlogList");
var getArt_Info = require("../../data/getData");
var url = require('url');
exports.execute = function (req, res) {
    var params = url.parse(req.url, true).query;
    var artClass = params.artClass;
    var artId = params.artId;
    
    getArt_Info.getArt_Info1(artClass,artId,function(data){
        //console.log(data);
    })
    return getArt_Info.getArt_Info(artClass,artId);
};