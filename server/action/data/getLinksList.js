var getLinksList = require("../../data/getData");
 
exports.execute = function (req, res) {
    getLinksList.getLinksList(function (data) {
         res.send(data);
     });
};