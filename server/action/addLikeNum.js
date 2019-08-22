var addLikeNum = require('../data/changeData');
var url = require('url');

function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};

exports.execute = function (req, res) {
    var params = url.parse(req.url, true).query;
    var artId = params.art_Id;
    var ip = getClientIP(req);
    addLikeNum.addLikeNum(artId, ip, function(data) {
        res.send(data);
     });
};