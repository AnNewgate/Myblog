var getSiteInfo = require("../../data/getData");
 
exports.execute = function (req, res) {
    getSiteInfo.getSiteInfo(function (data) {
         res.send(data);
     });
};