var mysqlconnect = require('../../database/database').mysqlconnect;// 实例化数据库对象
var fs = require('fs'); //文件模块

// 对数据库连接进行了封装，可根据传入的sql语句返回查询数据
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


// 对文件读取进行了封装，可根据文件路径返回文件中的数据
function getFileData(fileUrl){
  return new Promise(function(resolve,reject){
    //fileUrl为json文件的路径
    //读取json文件
    fs.readFile(fileUrl, 'utf-8', function (err, data) {
      if (err) {
        reject('[ReadFile ERROR] - ' + err.message);
        return;
      }
      //console.log(data);
      resolve(data);
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
                    callback(message);
                });
            },function(mes){
                console.log("addLikeNum " + mes);
            });
        }else{
            var message = {};
            message["Code"] = 0;
            callback(message);
        }
    }, function (mes) {
        console.log("selectLikeRecord " + mes)
    });
};

exports.addPageviewNum= function (artId) {
    var sql = `UPDATE blogdetail SET blogPageviews=blogPageviews+1 WHERE blogID=${artId}`;

    let addPageviewNumPromise = changeDatabaseData(sql);
    addPageviewNumPromise.then(function (result) {
        console.log("successful");
    }, function (mes) {
        console.log("addPageviewNum " + mes)
    });
};