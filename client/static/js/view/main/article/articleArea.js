var React = require( 'react');
var Component=React.Component;
var { Card, Breadcrumb, Icon, Tag, Button} = require('antd');

const Bread=() => (
    <Breadcrumb separator=">">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
        <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
)

const SmallNav = ({pre,next}) => {
    if(pre == null && next == null){
        return(
            <div></div>
        )
    };
    let Null = {
        link: "#",
        title: "没有啦！"
    }
    let preShow = pre == null ? Null : pre;
    let nextShow = next == null ? Null : next;
    return(
        <div>
            上一篇：<a href={preShow.link}>{preShow.title}</a><br></br>
            下一篇：<a href={nextShow.link}>{nextShow.title}</a>
        </div>
    )   
}

const Card_1 = ({props}) => {
    return (
        <Card title={props.art_class}
            extra={
                <Bread></Bread>
            }
            style={{ width: "100%", marginTop: "1em" }}>
            <div style={{ margin: "1em" }}>
                <h3>{props.title}</h3>
                <div>
                    <span style={{ marginRight: "1em" }}><Icon type="user" />{props.author}</span>
                    <span><Icon type="history" />{props.time}</span>
                </div>
                <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                    <div dangerouslySetInnerHTML={{ __html: props.info.content }} />
                </div>
            </div>
        </Card>
    )
}

const Card_2 = ({props}) => {
    return (
        <Card title={props.art_class}
            extra={
                <Bread></Bread>
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
                        <Button type="primary" icon="like" size='large'>
                            很赞哦！（{props.likeNum}）
                    </Button>
                    </div>
                </div>
                <SmallNav pre={props.pre} next={props.next}></SmallNav>
            </div>
        </Card>
    )
}
const Area = ({props}) =>{
    if(props.art_class == 4){
        return <Card_1 props={props}></Card_1>
    }else{
        return <Card_2 props={props}></Card_2>
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
            <Area props={this.props.info}></Area>
        );
    }
}

class ArticleComment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return( 
            <div dangerouslySetInnerHTML={{__html: `<div id="SOHUCS"></div><script charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/changyan.js" ></script>
            <script type="text/javascript">
                window.changyan.api.config({
                    appid: 'cyun358XB',
                    conf: 'prod_60f497698dd87519881c4adbd5fb33f1'
                });
            </script>`}} />
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
        );
    }
}

module.exports = {
    "ArticleArea" : ArticleArea,
    "ArticleComment" : ArticleComment
};