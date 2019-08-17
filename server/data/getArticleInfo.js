
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
     
    exports.getArticleInfo = function (articleClass, articleId) {
        return articleInfo;
    }