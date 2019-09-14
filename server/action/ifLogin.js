var JWT= require("../JsonWebToken");
var url = require('url');
exports.execute = function (req, res) {
    //面对get提交，nodejs用监听的写法处理
    var params = url.parse(req.url, true).query;
    var type = params.type;
    if(type == "checkLoginStatu"){
        let token = req.headers.token;
        //console.log(token);
        let jwt = new JWT(token);
        let result = jwt.verifyToken();
        //console.log(result);
        if (result == 'err') {
            res.send({ Code: 403, mes: '登录已过期,请重新登录'});
        } else {
            res.send({ Code: 200, mes: 'OK' });
        }
    }else{
        res.send({ Code: 404, mes: '请检查参数！' })
    }
};