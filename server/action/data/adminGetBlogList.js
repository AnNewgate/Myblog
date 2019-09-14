//var getBlogList = require("../../data/getBlogList");
var adminGetBlogList = require("../../data/adminGetData");
var url = require('url');
exports.execute = function (req, res) {
    var params = url.parse(req.url, true).query;
    var blogId = params.blogId;
    adminGetBlogList.adminGetBlogList(blogId, function (data) {
        res.send(data);
    });
};