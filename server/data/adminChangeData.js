var mysqlconnect = require('../../database/database').mysqlconnect;// 实例化数据库对象
var fs = require('fs'); //文件模块

// 对数据库连接进行了封装，可根据传入的sql语句进行增删改
function changeDatabaseData(sql) {
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


// 对文件读取进行了封装，可根据文件路径修改文件中的数据
function setFileData(fileUrl, data) {
    return new Promise(function (resolve, reject) {
        //fileUrl为json文件的路径,data要写入为json文件的数据，是一段json字符串
        fs.writeFile(fileUrl, data, function (err) {
            if (err) {
                reject(err);
            }
            resolve("success");
        });
    });
}

function getNowDate(){
    var nowDate = new Date();
    var date = nowDate.getFullYear() + "-" + (parseInt(nowDate.getMonth()) + 1) + "-" + nowDate.getDate() + " " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds();
    return date;
}
exports.register = function (info, callback) {
    var sql = `INSERT INTO administrator(adminEmail, adminPass) VALUE ("${info.email}","${info.password}")`;

    let registerPromise = changeDatabaseData(sql);
    registerPromise.then(function (result) {
        //console.log(result);
        if (result) {
            var message = {};
            message["Code"] = 201;
            message["mes"] = "注册成功";
            callback(message);
        }
    }, function (mes) {
        console.log("register " + mes)
        var message = {};
        message["Code"] = 501;
        message["mes"] = "插入数据出错，注册失败！";
        callback(message);
    });
};


// 读取json文件进行修改并返回结果
exports.setBusinessCardInfo = function (data, callback) {
    var file = 'database/json/BusinessCardInfo.json'; //文件路径，__dirname为当前运行js文件的目录
    var message = {};
    var setBusinessCardInfoPromise = setFileData(file, data);
    setBusinessCardInfoPromise.then(function (data) {
        if (data == "success") {
            message["Code"] = 200;
            message["mes"] = "修改成功！";
        } else {
            message["Code"] = 400;
            message["mes"] = "修改失败！";
        }
        callback(message);
    }, function (mes) {
        console.log("setBusinessCardInfo " + mes);
        message["Code"] = 400;
        message["mes"] = "修改失败！";
        callback(message);
    });
};

// 读取json文件进行修改并返回结果
exports.setCarouselInfo = function (data, callback) {
    var file = 'database/json/CarouselImg.json'; //文件路径，__dirname为当前运行js文件的目录
    var message = {};
    var setCarouselInfoPromise = setFileData(file, data);
    setCarouselInfoPromise.then(function (data) {
        if (data == "success") {
            message["Code"] = 200;
            message["mes"] = "修改成功！";
        } else {
            message["Code"] = 400;
            message["mes"] = "修改失败！";
        }
        callback(message);
    }, function (mes) {
        console.log("setCarouselInfo " + mes);
        message["Code"] = 400;
        message["mes"] = "修改失败！";
        callback(message);
    });
};

// 读取json文件进行修改并返回结果
exports.setLinkInfo = function (data, callback) {
    var file = 'database/json/LinkInfo.json'; //文件路径，__dirname为当前运行js文件的目录
    var message = {};
    var setLinkInfoPromise = setFileData(file, data);
    setLinkInfoPromise.then(function (data) {
        if (data == "success") {
            message["Code"] = 200;
            message["mes"] = "修改成功！";
        } else {
            message["Code"] = 400;
            message["mes"] = "修改失败！";
        }
        callback(message);
    }, function (mes) {
        console.log("setLinkInfo " + mes);
        message["Code"] = 400;
        message["mes"] = "修改失败！";
        callback(message);
    });
};

// 根据blogID删除文章
exports.adminDeteleBlog = function (blogId, callback) {
    var message = {};
    var sql = `DELETE FROM blogdetail WHERE blogID=${blogId}`;
    let deleteBlogPromise = changeDatabaseData(sql);
    deleteBlogPromise.then(function (result) {
        //console.log(result);
        if (result) {
            message["Code"] = 200;
            message["mes"] = "删除成功";
            callback(message);
        }
    }, function (mes) {
        console.log("delete blog info error " + mes)
        message["Code"] = 400;
        message["mes"] = "删除出错";
        callback(message);
    });
};

// // 根据blogID删除文章
// exports.adminDeteleBlog = function (blogId, callback) {
//     var message = {};
//     mysqlconnect.getConnection(function (err, connection) {
//         if (err) throw err;
//         connection.beginTransaction(function (err) {
//             try{
//                 if (err) throw err;
//                 var sql1=`DELETE FROM bloglabeltable WHERE blogID=${blogId}`;
  
//                 var sql2=`DELETE FROM blogdetail WHERE blogID=${blogId}`;
  
//                 connection.query(sql1,function (err,results) {
//                     if (err) {
//                         console.log(err)
//                         //回滚事务
//                         conn.rollback(function () {
//                             message["Code"] = 400;
//                             message["mes"] = "删除失败！";
//                             callback(message);
//                         });
//                     }
//                     connection.query(sql2,function (err,results) {
//                         if (err) {
//                             conn.rollback(function () {
//                                 message["Code"] = 400;
//                                 message["mes"] = "删除失败！";
//                                 callback(message);
//                             });
//                         }else{
//                             console.log('提交事务');
//                             connection.commit(function() {
//                                 message["Code"] = 200;
//                                 message["mes"] = "修改成功！";
//                                 callback(message);
//                             });
//                         }
//                     });
//                 })
//             }finally {
//                 connection.release();//返回连接对象到 连接池中
//             }
//         });
//     });
// };

exports.adminModifyBlog = function(info, callback){
    var message = {};
    var date = getNowDate();
    var sql = `UPDATE blogdetail SET classID = ${info.classId}, blogTitle = '${info.title}',blogAuthor= '${info.name}',blogModifyTime='${date}',blogContent='${info.content}',blogIntroduction='${info.introduction}',blogCover='${info.cover}',blogStar=${info.star},blogStatus=${info.statu},blogTags='${info.tags}' WHERE blogID=${info.id}`;
    let modifyBlogPromise = changeDatabaseData(sql);
    modifyBlogPromise.then(function (result) {
        //console.log(result);
        if (result) {
            message["Code"] = 200;
            message["mes"] = "更新成功";
            callback(message);
        }
    }, function (mes) {
        console.log("update blog info error " + mes)
        message["Code"] = 400;
        message["mes"] = "更新出错";
        callback(message);
    });
}

exports.adminAddBlog = function(info, callback){
    var message = {};
    var date = getNowDate();
    var sql = `INSERT INTO blogdetail(classID,blogTitle,blogAuthor,blogEditTIme,blogModifyTime,blogContent,blogLikeNum,blogPageviews,blogCommentsNum,blogIntroduction,blogCover,blogStar,blogStatus,blogTags) 
    VALUES (${info.classId},'${info.title}','${info.name}','${date}','${date}','${info.content}',0,0,0,'${info.introduction}','${info.cover}',${info.star},${info.statu},'${info.tags}')`;
    let modifyBlogPromise = changeDatabaseData(sql);
    modifyBlogPromise.then(function (result) {
        //console.log(result);
        if (result) {
            message["Code"] = 200;
            message["mes"] = "新增文章成功";
            callback(message);
        }
    }, function (mes) {
        console.log("insert blog info error " + mes)
        message["Code"] = 400;
        message["mes"] = "新增出错";
        callback(message);
    });
}