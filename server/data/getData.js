var mysqlconnect = require('../../database/database').mysqlconnect;// 实例化数据库对象
var fs = require('fs'); //文件模块

const baseUrl = "http://localhost:8080/";

// 对数据库连接进行了封装，可根据传入的sql语句返回查询数据
function getDatabaseData(sql){
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

// 读取数据库，根据参数返回博文列表
exports.getBlogList = function (artClass, category, callback) {
  const listData = [];
  var sql = "";
  if( artClass == -1){
    sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogIntroduction`,`blogCover` FROM artinfo ORDER BY blogStar DESC LIMIT 0,6";
  }else if(artClass == 0){
    sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogAuthor`,`blogModifyTime`,`blogLikeNum`,`blogPageviews`,`blogCommentsNum`,`blogIntroduction`,`blogCover` "
     + "FROM blogdetail WHERE `blogStatus`=1 ORDER BY `blogModifyTime` DESC LIMIT 0,10";
  }else{
    if(category == "按时间"){
      sql = `SELECT blogID,classID,blogTitle,blogAuthor,blogModifyTime,blogLikeNum,blogPageviews,blogCommentsNum,blogIntroduction,blogCover "
     + "FROM blogdetail WHERE classID=${artClass} ORDER BY blogModifyTime DESC`;
    }else if(category == "按热度"){
      sql = `SELECT blogID,classID,blogTitle,blogAuthor,blogModifyTime,blogLikeNum,blogPageviews,blogCommentsNum,blogIntroduction,blogCover "
      + "FROM blogdetail WHERE classID=${artClass} ORDER BY blogStar DESC`;
    }
  }

  let getBlogListPromise = getDatabaseData(sql);
  getBlogListPromise.then(function(result){
    for (let i = 0; i < result.length; i++) {
      let date = new Date(Date.parse(result[i].blogModifyTime));
      if (result[i].blogCover == null) { result[i].blogCover = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"; }
      listData.push({
        blogid: result[i].blogID,
        href: baseUrl + `article/${result[i].classID}/${result[i].blogID}`,
        title: result[i].blogTitle,
        // imgSrc: '/' + result[i].blogCover,
        imgSrc: result[i].blogCover,
        description: result[i].blogIntroduction,
        author: result[i].blogAuthor,
        time: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        // new Date(result[i].blogModifyTime),
        likeNum: result[i].blogLikeNum,
        pageViews: result[i].blogPageviews,
        commentNum: result[i].blogCommentsNum
      });
    }
    callback(listData);
  },function(mes){
    console.log("getBlogList " + mes);
  });
};

//获得client首页的文章栏目的数据接口
exports.getArticleList = function (callback) {
  const listData = [];
  var sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogAuthor`,`blogModifyTime` FROM `artinfo` ORDER BY `blogModifyTime`";

  let getArticleListPromise = getDatabaseData(sql);
  getArticleListPromise.then(function(result){
    for (let i = 0; i < result.length; i++) {
      let date = new Date(Date.parse(result[i].blogModifyTime));
      listData.push({
        blogid: result[i].blogID,
        href: baseUrl+`article/${result[i].classID}/${result[i].blogID}`,
        title: result[i].blogTitle,
        description: "Published by " + result[i].blogAuthor + " in " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      });
    }
    callback(listData);
  },function(mes){
    console.log("getArticleList " + mes)
  });
};

// 获取时间轴页面的内容
exports.getTimeLine = function (callback){
  const listData = {};
  var sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogStatus`,`blogModifyTime` FROM blogdetail ORDER BY `blogModifyTime` DESC";

  let getTimeLinePromise = getDatabaseData(sql);
  getTimeLinePromise.then(function(result){
    listData["years"] = [];
    for (let i = 0; i < result.length; i++) {
      let date = new Date(Date.parse(result[i].blogModifyTime));
      let year = date.getFullYear() + "";
      result[i].blogStatus = (result[i].blogStatus == 1) ? "green" : "red";
      if(listData["years"].indexOf(year) == -1){
        listData["years"].push(year);
        listData[year] = [];
      }
      listData[year].push({
        blogid: result[i].blogID,
        href: baseUrl + `article/${result[i].classID}/${result[i].blogID}`,
        title: result[i].blogTitle + " (" +date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ")",
        status: result[i].blogStatus,
        time: result[i].blogModifyTime
      });
    }
    callback(listData);
  },function(mes){
    console.log("getTimeLine " + mes);
  });
}

// 根据文章类别和id获取文章详细内容
exports.getArt_Info = function (artClass,artId,callback){
  const Art_Info = {};
  var sql = `SELECT blogID AS id,blogTitle AS title,className AS art_class,classID AS art_classNum,blogContent AS content,blogAuthor AS author,blogModifyTime AS time,blogLikeNum AS likeNum,blogTags AS tags FROM artinfo WHERE classID=${artClass} AND blogID=${artId}`;
  
  let getArt_InfoPromise = getDatabaseData(sql);
  getArt_InfoPromise.then(function(result){
    if(JSON.stringify(result) != '[]'){
      let date = new Date(Date.parse(result[0].time));
      if (result[0].tags == null) {
        result[0].tags = "空";
      }
      Art_Info["id"] = result[0].id;
      Art_Info["title"] = result[0].title;
      Art_Info["art_class"] = result[0].art_class;
      Art_Info["art_classNum"] = result[0].art_classNum;
      Art_Info["content"] = result[0].content;
      Art_Info["author"] = result[0].author;
      Art_Info["time"] = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      Art_Info["likeNum"] = result[0].likeNum;
      Art_Info["tags"] = result[0].tags.split(" ");
      var presql = `SELECT classID AS art_class,blogID AS art_blogID,blogTitle AS title FROM artinfo WHERE blogID = (SELECT blogID FROM artinfo WHERE classID = ${artClass} AND blogID < ${artId} ORDER BY blogID DESC LIMIT 1)`
      let getPrePromise = getDatabaseData(presql);
      getPrePromise.then(function (result) {
        let pre = {};
        if (JSON.stringify(result) != '[]') {
          pre["link"] = baseUrl + `article/${result[0].art_class}/${result[0].art_blogID}`;
          pre["title"] = result[0].title;
        }else{
          pre["link"] = baseUrl + `article/${artClass}/${artId}#`;
          pre["title"] = "没有啦！";
        }
        Art_Info["pre"] = pre;
        var nextsql = `SELECT classID AS art_class,blogID AS art_blogID,blogTitle AS title FROM artinfo WHERE blogID = (SELECT blogID FROM artinfo WHERE  classID = ${artClass} AND blogID > ${artId} ORDER BY blogID ASC LIMIT 1)`
        let getNextPromise = getDatabaseData(nextsql);
        getNextPromise.then(function (result) {
          let next = {};
          if (JSON.stringify(result) != '[]') {
            next["link"] = baseUrl + `article/${result[0].art_class}/${result[0].art_blogID}`;
            next["title"] = result[0].title;
          }else{
            next["link"] = baseUrl + `article/${artClass}/${artId}#`;
            next["title"] = "没有啦！";
          }
          Art_Info["next"] = next;
          callback(Art_Info);
        },function(mes){
          console.log("getArt_Info Third" + mes);
        });
      },function(mes){
        console.log("getArt_Info Second" + mes);
      });
    }else{
      callback(Art_Info);
    }
  },function(mes){
    console.log("getArt_Info First" + mes);
  });
};

// client和admin的公共数据接口
// 读取json文件获得首页的轮播图图文信息并交由反馈函数执行
exports.getImgItemList = function (callback) {
  var file = 'database/json/CarouselImg.json';
  var getImgItemListPromise = getFileData(file);
  getImgItemListPromise.then(function (data) {
    data = JSON.parse(data);
    data.map( item => {
      item.src = "/" + item.src;
    });
    callback(data);
  },function(mes){
    console.log("getImgItemList "+mes);
  });
};

// 读取json文件获得"我的名片"信息并交由反馈函数执行
exports.getBusinessCardInfo = function (callback) {
  var file = 'database/json/BusinessCardInfo.json'; //文件路径，__dirname为当前运行js文件的目录
  var getBusinessCardInfoPromise = getFileData(file);
  getBusinessCardInfoPromise.then(function (data) {
    data = JSON.parse(data);
    data.qq_img = "/" + data.qq_img;
    data.wx_img = "/" + data.wx_img;
    callback(data);
  },function(mes){
    console.log("getBusinessCardInfo " + mes);
  });
};

//读取json文件获得"友情链接"信息并交由反馈函数执行
exports.getLinksList = function (callback) {
  var file = 'database/json/LinkInfo.json'; //文件路径，__dirname为当前运行js文件的目录
  var getLinksListPromise = getFileData(file);
  getLinksListPromise.then(function (data) {
    callback(data);
  },function(mes){
    console.log("getLinksList " + mes);
  });
};

//读取json文件获得"站点信息"信息并交由反馈函数执行
exports.getSiteInfo = function (callback) {
  var file = 'database/json/SiteInfo.json'; //文件路径，__dirname为当前运行js文件的目录
  var getSiteInfoPromise = getFileData(file);
  getSiteInfoPromise.then(function (data) {
    callback(data);
  },function(mes){
    console.log("getSiteInfo " + mes);
  });
};