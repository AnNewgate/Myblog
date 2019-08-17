var mysqlconnect = require('../../database/database').mysqlconnect;// 实例化数据库对象
var fs = require('fs'); //文件模块

const baseUrl = "http://localhost:8080/";

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
          console.log('[SELECT ERROR] - ', err.message);
          return;
        }
        resolve(result);
        connection.release();
        // Don't use the connection here, it has been returned to the pool.
      });
    });
  });
}

function getFileData(fileUrl){
  return new Promise(function(resolve,reject){
    //fileUrl为json文件的路径
    //读取json文件
    fs.readFile(fileUrl, 'utf-8', function (err, data) {
      if (err) {
        console.log('[ReadFile ERROR] - ', err.message);
        return;
      }
      //console.log(data);
      resolve(data);
    });
  });
}

// 读取json文件获得首页的轮播图图文信息并交由反馈函数执行
exports.getImgItemList = function (callback) {
  var file = 'database/json/CarouselImg.json';
  var getImgItemListPromise = getFileData(file);
  getImgItemListPromise.then(function (data) {
    callback(data);
  });
};

// 读取数据库，根据参数返回博文（还需要修改）
exports.getBlogList = function (artClass,callback) {
  const listData = [];
  var sql = "";
  if( artClass == -1){
    sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogAuthor`,`blogModifyTime`,`blogLikeNum`,`blogPageviews`,`blogCommentsNum`,`blogIntroduction`,`blogCover` FROM blogdetail";
  }else if(artClass == 0){
    sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogAuthor`,`blogModifyTime`,`blogLikeNum`,`blogPageviews`,`blogCommentsNum`,`blogIntroduction`,`blogCover` FROM blogdetail";
  }else{
    sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogAuthor`,`blogModifyTime`,`blogLikeNum`,`blogPageviews`,`blogCommentsNum`,`blogIntroduction`,`blogCover` FROM blogdetail";
  }

  let getBlogListPromise = getDatabaseData(sql);
  getBlogListPromise.then(function(result){
    for (let i = 0; i < result.length; i++) {
      let date = new Date(Date.parse(result[i].blogModifyTime));
      if (result[i].blogCover == null) { result[i].blogCover = baseUrl + "images/blog/null.jpg"; }
      listData.push({
        blogid: result[i].blogID,
        href: baseUrl + `article/${result[i].classID}/${result[i].blogID}`,
        title: result[i].blogTitle,
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
  });
};

// 读取json文件获得"我的名片"信息并交由反馈函数执行
exports.getBusinessCardInfo = function (callback) {
  var file = 'database/json/BusinessCardInfo.json'; //文件路径，__dirname为当前运行js文件的目录
  var getBusinessCardInfoPromise = getFileData(file);
  getBusinessCardInfoPromise.then(function (data) {
    callback(data);
  });
};

exports.getArticleList = function (callback) {
  const listData = [];
  var sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogAuthor`,`blogModifyTime` FROM blogdetail";

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
  });
};

exports.getLinksList = function (callback) {
  var file = 'database/json/LinkInfo.json'; //文件路径，__dirname为当前运行js文件的目录
  var getLinksListPromise = getFileData(file);
  getLinksListPromise.then(function (data) {
    callback(data);
  });
};

exports.getSiteInfo = function (callback) {
  var file = 'database/json/SiteInfo.json'; //文件路径，__dirname为当前运行js文件的目录
  var getSiteInfoPromise = getFileData(file);
  getSiteInfoPromise.then(function (data) {
    callback(data);
  });
};

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
  });
}

exports.getArt_Info = function (artClass,artId){
  const Art_Info = {};
  var sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogStatus`,`blogModifyTime` FROM blogdetail ORDER BY `blogModifyTime` DESC;";
  var articleInfo = {
    title: "这是测试文章",
    art_class: "心情随笔",
    art_classNum: 1,
    content: `<p><strong>hahahahahaha</strong></p>`,
    author: "chen",
    time: "20190107",
    tags: ["laji","putong","meishenme"],
    likeNum: 3,
    pre: {
        link: "http://localhost:8080/article/0/1",
        title: "测试文章的上一篇文章"
    },
    next: {
        link: "http://localhost:8080/article/0/3",
        title: "测试文章的下一篇文章"
    }
};
  
  return articleInfo;
}

exports.getArt_Info1 = function (artClass,artId,callback){
  const Art_Info = {};
  var sql = "SELECT `blogID`,`classID`,`blogTitle`,`blogStatus`,`blogModifyTime` FROM blogdetail ORDER BY `blogModifyTime` DESC";
  let getArt_InfoPromise = getDatabaseData(sql);
  getArt_InfoPromise.then(function(result){
    callback(result);
  })
}