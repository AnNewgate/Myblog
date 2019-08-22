//var getBlogList = require("../../data/getBlogList");
var getBlogList = require("../../data/getData");
var url = require('url');
exports.execute = function (req, res) {
    var params = url.parse(req.url, true).query;
    var artClass = params.artclass;
    var category = params.category;
    getBlogList.getBlogList(artClass, category, function (data) {
         res.send(data);
     });
};