var setCarouselInfo = require("../../data/adminChangeData");
 
exports.execute = function (req, res) {
    //面对post提交，nodejs用监听的写法处理
    //data是一个事件，表示一个小包传输完毕后做的事情
    var result = "";
    req.on("data", function (chunk) {
        //console.log("小包传输完毕");
        result += chunk;
    });
    //end也是一个事件，表示所有的包传输完毕
    req.on("end", function () {
        //所有的包传输完毕
        //console.log(result.toString());
        result = JSON.parse(result);  //将一个字符串转化为一个对象
        var data = JSON.stringify(result.info);
        setCarouselInfo.setCarouselInfo(data, function(data){
            res.send(data);
        });
    });
};