var getMessageList = require("../../data/getImgItemList");
 
exports.execute = function (req, res) {
     getMessageList.getImgItemList(function (data) {
         res.send(data);
     });
};