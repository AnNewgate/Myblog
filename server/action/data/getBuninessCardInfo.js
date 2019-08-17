var getBusinessCardInfo = require("../../data/getData");
 
exports.execute = function (req, res) {
    getBusinessCardInfo.getBusinessCardInfo(function (data) {
         res.send(data);
     });
};