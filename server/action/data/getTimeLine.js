var getTimeLine = require("../../data/getData");
 
exports.execute = function (req, res) {
    getTimeLine.getTimeLine(function (data) {
         res.send(data);
     });
};