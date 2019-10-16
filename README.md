## MyBlog

**前言**：接触了React、NodeJS后，萌发了基于React框架，NodeJS后台来实现个人博客的想法，于是有了本项目。本项目属于练手类型，实现了基本功能，也存在一些问题，希望得到读者的指教！


#### 正文

### 一、功能描述

- 展示页面功能
  - 根据IP位置显示图片及天气信息（采用了简单的爬虫）
  - 显示博文列表、我的名片、友情链接等信息
- 后台管理系统
  - 对我的名片、友情链接等网站基本信息的修改
  - 对博客进行增删改操作

### 二、开发环境
- NodeJS: v12.4.0
- Express: v4.17.1
- MYSQL: v5.7.17

> 安装：  
> 安装Express : npm install express --save  
> 安装NodeJS: npm install mysql --save

>需要安装的依赖(部分重要的)：  
> "dependencies": {  
>     "@babel/preset-env": "^7.5.5",  
>     "@babel/preset-react": "^7.0.0",  
>     "antd": "^3.21.2", //Ant Design UI库  
>     "axios": "^0.19.0", //用于进行Ajax请求  
>     "braft-editor": "^2.3.8", //后台管理系统的博文编辑插件  
>     "cheerio": "^1.0.0-rc.3", //爬虫  
>     "ejs": "^2.6.2", //服务器动态渲染模板引擎  
>     "express": "^4.17.1", //用于搭建网站应用  
>     "jsonwebtoken": "^8.5.1", //生成和验证token  
>     "md5": "^2.2.1", //生成md5  
>     "mdbreact": "^4.18.1", //MDBReact UI组件  
>     "multiparty": "^4.2.1", //接收表单文件  
>     "nodemon": "^1.19.1",  
>     "react": "^16.8.6",  
>     "react-dom": "^16.8.6",  
>     "react-highlight-words": "^0.16.0",  
>     "react-router-dom": "^5.0.1",  
>   },  
>   "devDependencies": {  
>     "font-awesome": "^4.7.0", //字体  
>     "node-jsx": "^0.13.3", //用于nodejs解析JSX，服务器渲染  
>   }  

### 三、项目结构

项目的主要目录如下：  
**后台管理系统页面目录结构**：  
![后台管理系统目录](https://note.youdao.com/yws/public/resource/d5b9d6638b2c544141451d0c0feb3224/xmlnote/DC4D40F98CB040E0957D102E0638686B/2195)  
**前台页面目录结构**：  
![前台页面目录](https://note.youdao.com/yws/public/resource/d5b9d6638b2c544141451d0c0feb3224/xmlnote/EFFA0D44B9A748AD863BE406FB36FEFD/2197)  
后台管理系统及前台页面的目录结构很相似，view文件中存放的是HTML文件视图，static中存放了css，js等文件，js文件夹中的view则是各种React Component，store并非Redux意义上的store，更多像一个获取数据的操作的专用地点（本项目并没有使用Redux）  

**数据库目录结构**：  
![数据库目录](https://note.youdao.com/yws/public/resource/d5b9d6638b2c544141451d0c0feb3224/xmlnote/47A4BAFBB6E648CA93C5E82CFA3F7FD5/2199)  
database.js文件是用于创建数据库连接的，文件中保存了建立连接时所需要的信息和设置；json文件是属于数据库的一部分，里面保存了不必要保留在MySQL，但也需要保存的数据，例如网站的站点信息设置；

**后台目录结构**：  
![后台目录结构：](https://note.youdao.com/yws/public/resource/d5b9d6638b2c544141451d0c0feb3224/xmlnote/D8E2A906A5814686B0354D7A29CC80AE/2203)  
server文件中的action文件为接口文件，action中的子文件夹data文件为数据获取以及修改接口，server子文件夹data文件夹是对数据库的操作，包括增删改等操作，由接口文件调用执行；  

### 四、页面展示
部分页面展示如下：  
**前台页面：**
![前台页面](https://note.youdao.com/yws/public/resource/d5b9d6638b2c544141451d0c0feb3224/xmlnote/D1A8E62F3F8643139714A1D1CA5379F9/2184)  

**后台系统（登录页面）：**
![登录页面](https://note.youdao.com/yws/public/resource/d5b9d6638b2c544141451d0c0feb3224/xmlnote/BEB43F0D228842BD86117AD57381B222/2188)

**后台系统（主要页面）：**
![管理页面](https://note.youdao.com/yws/public/resource/d5b9d6638b2c544141451d0c0feb3224/xmlnote/21A6F2A689634BB9AF7CC7B3F0A135DC/2186)

### 五、功能点实现
此处的功能点指网站的小功能点，例如爬虫等，既包括已经实现的，也包括未实现的，未实现的功能点先记录下实现想法，后期进行更新尝试实现。  
1. 根据用户IP获取用户所处地点的天气信息及地理信息（用到简单的爬虫技术）
2. 根据文章的点赞数、评论数、浏览数对文章进行推荐度的修改，实现推荐文章板块的良好推荐能力
3. 文章的浏览量的统计
4. 用Token对用户进行验证
5. 。。。

### 六、需要修改的问题
此版块记录在回顾项目情况时发现的问题，记录并不定时进行问题解决和修改。  
1. 界面设计的不够好看，有点丑
2. 文章内容页面服务器渲染速度慢，需要找找原因
3. React Component没有好好的划分出Dumb组件，需要优化修改
4. 后台代码存在一定的重复性，需要进行抽离封装

### 七、联系我
此项目属于本人练习项目，也存在挺多问题，如果读者发现有新的问题，希望您能给我反馈，帮助我改进，谢谢！
![QQ二维码](https://note.youdao.com/yws/public/resource/d5b9d6638b2c544141451d0c0feb3224/xmlnote/0040221F2A414FA4A6C9DC04D5707F4C/2325)  
![微信二维码](https://note.youdao.com/yws/public/resource/d5b9d6638b2c544141451d0c0feb3224/xmlnote/7F681D65D3954A1AB585A20F70968D33/2327)
