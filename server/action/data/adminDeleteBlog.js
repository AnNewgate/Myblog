//var getBlogList = require("../../data/getBlogList");
var adminDeteleBlog = require("../../data/adminChangeData");
var url = require('url');
exports.execute = function (req, res) {
    var params = url.parse(req.url, true).query;
    var blogId = params.blogId;
    adminDeteleBlog.adminDeteleBlog(blogId, function (data) {
        res.send(data);
    });
};