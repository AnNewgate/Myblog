var mysqlconnect = require('../../database/database').mysqlconnect;// 实例化数据库对象
var fs = require('fs'); //文件模块

// 对数据库连接进行了封装，可根据传入的sql语句进行增删改
function changeDatabaseData(sql){
  return new Promise(function (resolve, reject) {
    mysqlconnect.getConnection(function (err, connection) {
      if (err) {
        console.log('[CONNECT ERROR] - ', err.message);
        return;
      }
      // Use the connection
      connection.query(sql, function (err, result) {
        // And done with the connection.
        if (err) {
          reject('[CHANGE ERROR] - ' + err.message);
          return;
        }
        //console.log(result);
        resolve(result);
        connection.release();
        // Don't use the connection here, it has been returned to the pool.
      });
    });
  });
}

exports.addLikeNum = function (artId, ip, callback) {
    var sql = `SELECT blogID,likeIP FROM likerecord WHERE blogID=${artId} AND likeIP="${ip}"`;

    let addLikeNumPromise = changeDatabaseData(sql);
    addLikeNumPromise.then(function (result) {
        if(JSON.stringify(result) == '[]'){
            var date = new Date();
            var datestring = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
            sql = `INSERT INTO likerecord(blogID,likeIP,likeTime) VALUE (${artId},"${ip}","${datestring}")`;
            addPromise = changeDatabaseData(sql);
            addPromise.then(function(result){
                sql = `UPDATE blogdetail SET blogLikeNum=blogLikeNum+1 WHERE blogID=${artId}`;
                upDatePromise = changeDatabaseData(sql);
                upDatePromise.then(function(result){
                    var message = {};
                    message["Code"] = 1;
                    message["Mes"] = "";
                    callback(message);
                });
            },function(mes){
                var message = {};
                message["Code"] = 0;
                message["Mes"] = "插入点赞记录失败！";
                console.log("addLikeNum " + mes);
                callback(message);
            });
        }else{
            var message = {};
            message["Code"] = 0;
            message["Mes"] = "已有点赞记录";
            callback(message);
        }
    }, function (mes) {
        console.log("selectLikeRecord " + mes)
        var message = {};
        message["Code"] = 0;
        message["Mes"] = "查询点赞记录出错";
        callback(message);
    });
};

exports.addPageviewNum= function (artId) {
    var sql = `UPDATE blogdetail SET blogPageviews=blogPageviews+1 WHERE blogID=${artId}`;

    let addPageviewNumPromise = changeDatabaseData(sql);
    addPageviewNumPromise.then(function (result) {
        console.log("addPageviewNum successful");
    }, function (mes) {
        console.log("addPageviewNum " + mes);
    });
};