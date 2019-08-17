var getArticleInfo = require("../../data/getArticleInfo");
 
exports.execute = function (req, res) {
    var articleClass = req.params.class;
    var articleId = req.params.id;
    return getArticleInfo.getArticleInfo(articleClass, articleId);
};