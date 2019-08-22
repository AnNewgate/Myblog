//var getBlogList = require("../../data/getBlogList");
var getArt_Info = require("../../data/getData");
exports.execute = function (req, res) {
    var artClass = req.params.artClass;
    var artId = req.params.artId;
    let getArt_InfoPromise = new Promise(function(resolve, reject){
        getArt_Info.getArt_Info(artClass,artId,function(data){
            resolve(data);
        });
    });
    return getArt_InfoPromise;
};