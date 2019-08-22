//var getBlogList = require("../../data/getBlogList");
var addPageviewNum = require("../data/changeData");
exports.execute = function (req, res) {
    var artId = req.params.artId;
    addPageviewNum.addPageviewNum(artId);
};