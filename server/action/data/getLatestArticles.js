var getLatestArticles = require("../../data/getData");
 
exports.execute = function (req, res) {
    getLatestArticles.getArticleList(function (data) {
         res.send(data);
     });
};