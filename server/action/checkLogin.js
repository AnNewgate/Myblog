var JWT= require("../JsonWebToken");

exports.checkLLogin = function(req){
    let token = req.headers.token;
    //console.log(token);
    let jwt = new JWT(token);
    let result = jwt.verifyToken();
    //console.log(result);
    if (result == 'err') {
        return false
    } else {
        return true;
    }
}
