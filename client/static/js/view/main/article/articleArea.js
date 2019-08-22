var React = require( 'react');
var Component=React.Component;
var { Card, Breadcrumb, Icon, Tag, Button, message} = require('antd');

const bread = {
    "1": [{
        "href": "http://localhost:8080/client/index",
        "content": "首页"
    },{
        "href": "http://localhost:8080/client/moodEssay",
        "content": "心情随笔"
    }],
    "2": [{
        "href": "http://localhost:8080/client/index",
        "content": "首页"
    },{
        "href": "http://localhost:8080/client/techSharing",
        "content": "技术分享"
    }],
    "3":[{
        "href": "http://localhost:8080/client/index",
        "content": "首页"
    },{
        "href": "http://localhost:8080/client/hobbySharing",
        "content": "爱好分享"
    }],
    "4":[{
        "href": "http://localhost:8080/client/index",
        "content": "首页"
    }]
}

const Bread=({art_class}) => (
    <div>
        您现在所在位置：
        <Breadcrumb separator=">">
            {
                bread[`${art_class}`].map((item, index) => {
                    return(
                        <Breadcrumb.Item href={item.href} key={index}>{item.content}</Breadcrumb.Item>
                    );
                })
            }
            {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
            <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
        </Breadcrumb>
    </div>
)

const SmallNav = ({pre,next}) => {
    if(JSON.stringify(pre) === '{}' && JSON.stringify(next) === '{}'){
        return(
            <div></div>
        )
    };
    return(
        <div>
            上一篇：<a href={pre.link}>{pre.title}</a><br></br>
            下一篇：<a href={next.link}>{next.title}</a>
        </div>
    )   
}

const Card_1 = ({props}) => {
    return (
        <Card title="文章内容"
            extra={
                <Bread art_class={props.art_classNum}></Bread>
            }
            style={{ width: "100%", marginTop: "1em" }}>
            <div style={{ margin: "1em" }}>
                <h3>{props.title}</h3>
                <div>
                    <span style={{ marginRight: "1em" }}><Icon type="user" />{props.author}</span>
                    <span><Icon type="history" />{props.time}</span>
                </div>
                <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                    <div dangerouslySetInnerHTML={{ __html: props.content }} />
                </div>
            </div>
        </Card>
    )
}

const Card_2 = ({props}) => {
    return (
        <Card title="文章内容"
            extra={
                <Bread art_class={props.art_classNum}></Bread>
            }
            style={{ width: "100%", marginTop: "1em" }}>
            <div style={{ margin: "1em" }}>
                <h3>{props.title}</h3>
                <div>
                    <span style={{ marginRight: "1em" }}><Icon type="user" />{props.author}</span>
                    <span><Icon type="history" />{props.time}</span>
                </div>
                <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                    <div dangerouslySetInnerHTML={{ __html: props.content }} />
                </div>
                <div>
                    Tags: <Tags tagItems={props.tags} />
                </div>
                <div id="Reprint"></div>
                <div id="Reward_Attention" style={{ overflow: "hidden" }}>
                    <div style={{ margin: "1em auto 1em auto", textAlign: "center" }}>
                        <Button type="primary" size='large' style={{ marginRight: "2em" }}>
                            打赏
                        </Button>
                        <Button type="primary" icon="like" size='large' id="addLikeNum">
                            很赞哦！(<span id="likeNum">{props.likeNum}</span>）
                        </Button>
                    </div>
                </div>
                <SmallNav pre={props.pre} next={props.next}></SmallNav>
            </div>
        </Card>
    )
}

const Area = ({info}) =>{
    if(info.art_classNum == 4){
        return <Card_1 props={info}></Card_1>
    }else{
        return <Card_2 props={info}></Card_2>
    }
}

const Tags = ({tagItems}) => (
    <span>
        {
            tagItems.map((item,index) => {
                return (
                    <Tag key={index}>{item}</Tag>
                );
            })
        }
    </span>
)

class ArticleArea extends Component{
    constructor(props){
        super(props);
        //console.log(this.props.info.tags);
    }

    render(){
        return(
            <div id="articleInfo" data-art={this.props.info.art_classNum+"-"+this.props.info.id}>
                <Area info={this.props.info}></Area>
            </div>
        );
    }
}

class ArticleComment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return( 
            // <div dangerouslySetInnerHTML={{__html: `<div id="SOHUCS"></div><script charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/changyan.js" ></script>
            // <script type="text/javascript">
            //     window.changyan.api.config({
            //         appid: 'cyun358XB',
            //         conf: 'prod_60f497698dd87519881c4adbd5fb33f1'
            //     });
            // </script>`}} />
            // <div>
            //     <div id="SOHUCS"></div>

            //     <script charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/changyan.js" ></script>
            //     <script type="text/javascript">
            //         window.changyan.api.config({
            //             appid: 'cyun358XB',
            //             conf: 'prod_60f497698dd87519881c4adbd5fb33f1'
            //         });Ov3sEyNCF0y9pY7E  debian-sys-maint
            //     </script>
            // </div>
            <div></div>
        );
    }
}

module.exports = {
    "ArticleArea" : ArticleArea,
    "ArticleComment" : ArticleComment
};