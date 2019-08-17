var getImgItemList = require("../../data/getData");
 
exports.execute = function (req, res) {
    getImgItemList.getImgItemList(function (data) {
         res.send(data);
     });
};