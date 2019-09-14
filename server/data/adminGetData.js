var mysqlconnect = require('../../database/database').mysqlconnect;// 实例化数据库对象
var fs = require('fs'); //文件模块
var JWT = require('../JsonWebToken');

const baseUrl = "http://localhost:8080/";

// 对数据库连接进行了封装，可根据传入的sql语句返回查询数据
function getDatabaseData(sql) {
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
          reject('[SELECT ERROR] - ' + err.message);
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
function getFileData(fileUrl) {
  return new Promise(function (resolve, reject) {
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

//登录接口（info为用户邮箱及密码）
exports.login = function (info, callback) {
  var sql = `SELECT adminPass,adminName FROM administrator WHERE adminEmail="${info.email}"`;

  let loginPromise = getDatabaseData(sql);
  loginPromise.then(function (result) {
    //console.log(result);
    if (JSON.stringify(result) != '[]') {
      if (info.password == result[0].adminPass) {
        // 登陆成功，添加token验证
        // 将用户邮箱传入并生成token
        let jwt = new JWT(info.email);
        let tokenRes = jwt.generateToken();
        // 将 token 返回给客户端
        var message = {};
        message["Code"] = 200;
        message["mes"] = "登录成功！";
        message["tokenRes"] = tokenRes;
        message["userName"] = result[0].adminName;
        // let verify = new JWT(tokenRes);
        // verifyRes = verify.verifyToken();
        // message["verify"] = verifyRes;
        callback(message);
      } else {
        var message = {};
        message["Code"] = 400;
        message["mes"] = "账号或者密码有错！";
        callback(message);
      }
    } else {
      var message = {};
      message["Code"] = 400;
      message["mes"] = "账号或者密码有错！";
      callback(message);
    }
  }, function (mes) {
    console.log("register " + mes);
    var message = {};
    message["Code"] = 501;
    message["mes"] = "查询出错！";
    callback(message);
  });
};

// // 读取数据库，返回全部博文列表(也可根据博客ID获取博客的信息)
// exports.adminGetBlogList = function (blogId, callback) {
//   const listData = [];
//   var sql = "";
//   if(blogId != undefined){
//     sql = `SELECT blogID AS id,blogTitle AS title,blogAuthor AS name,blogContent AS content,blogIntroduction AS introduction,blogCover AS cover,blogStar AS star,blogStatus AS statu,classID AS classId`
//     +` FROM blogdetail WHERE blogdetail.blogID=${blogId}`;
//   }else{
//     sql = "SELECT blogID AS id,blogTitle AS title,blogAuthor AS name,blogModifyTime AS modifyTime,blogStar AS star,blogStatus AS statu,className AS class"
//     + " FROM blogcategorytable,blogdetail WHERE blogcategorytable.classID=blogdetail.classID";
//   }

//   let adminGetBlogListPromise = getDatabaseData(sql);
//   adminGetBlogListPromise.then(function (result) {
//     const res = new Array(result.length).fill('false');
//     for (let i = 0; i < result.length; i++) {
//       //let date = new Date(Date.parse(result[i].modifyTime));
//       var tagsql = `SELECT tagName as tag FROM blogtagstable RIGHT JOIN bloglabeltable ON blogtagstable.tagID=bloglabeltable.tagID WHERE bloglabeltable.blogID=${result[i].id}`
//       let getTagPromise = getDatabaseData(tagsql);
//       getTagPromise.then(function (tagresult) {
//         let tags = [];
//         if (JSON.stringify(tagresult) != '[]') {
//           for(let j = 0; j < tagresult.length; j++){
//             tags.push(tagresult[j].tag);
//           }
//         } else {
//           tags.push("空");
//         }
//         if(blogId){
//           if(result[i].cover == null){
//             result[i].cover = baseUrl + "images/blog/null.jpg";
//           }
//           listData.push(result[i]);
//           res[i] = 'true';
//         }else{
//           listData.push({
//             key: i + 1,
//             id: result[i].id,
//             title: result[i].title,
//             name: result[i].name,
//             //modifyTime: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
//             modifyTime: result[i].modifyTime,
//             star: result[i].star,
//             statu: result[i].statu,
//             class: result[i].class,
//             tags: tags,
//           });
//           res[i] = 'true';
//         }
//         var ifSend = res.every(function(item){
//           return item == 'true';
//         });
//         //console.log(i);
//         if(ifSend){
//           callback(listData);
//         }
//       }, function (mes) {
//         console.log("getBlogTags " + mes);
//       });
//     }
    
//   }, function (mes) {
//     console.log("adminGetBlogList " + mes);
//   });
// };

// 读取数据库，返回全部博文列表(也可根据博客ID获取博客的信息)
exports.adminGetBlogList = function (blogId, callback) {
  const listData = [];
  var sql = "";
  if (blogId != undefined) {
    sql = `SELECT blogID AS id,blogTitle AS title,blogAuthor AS name,blogContent AS content,blogIntroduction AS introduction,blogCover AS cover,blogStar AS star,blogStatus AS statu,classID AS classId,blogTags AS tags`
      + ` FROM blogdetail WHERE blogdetail.blogID=${blogId}`;
  } else {
    sql = "SELECT blogID AS id,blogTitle AS title,blogAuthor AS name,blogModifyTime AS modifyTime,blogStar AS star,blogStatus AS statu,className AS class,blogTags AS tags"
      + " FROM blogcategorytable,blogdetail WHERE blogcategorytable.classID=blogdetail.classID";
  }

  let adminGetBlogListPromise = getDatabaseData(sql);
  adminGetBlogListPromise.then(function (result) {
    const res = new Array(result.length).fill('false');
    for (let i = 0; i < result.length; i++) {
      if (blogId) {
        if (result[i].cover == null) {
          result[i].cover = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
        }
        if (result[i].tags == null) {
          result[i].tags = "空";
        }
        result[i].tags = result[i].tags.split(" ");
        listData.push(result[i]);
      } else {
        if (result[i].tags == null) {
          result[i].tags = "空";
        }
        listData.push({
          key: i + 1,
          id: result[i].id,
          title: result[i].title,
          name: result[i].name,
          //modifyTime: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
          modifyTime: result[i].modifyTime,
          star: result[i].star,
          statu: result[i].statu,
          class: result[i].class,
          tags: result[i].tags.split(" "),
        });
      }
    }
    callback(listData);
  }, function (mes) {
    console.log("adminGetBlogList " + mes);
  });
};