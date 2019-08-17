var React = require( 'react');
// var ReactDom = require( 'react-dom');
var ArticleText = require('./articleArea').ArticleArea;
var ArticleComment = require('./articleArea').ArticleComment;

class ArticleContent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="content-div">
                <div className="content">
                    <div className="articleContent">
                        <ArticleText info={this.props.info} />
                    </div>
                    <div className="articleComment">
                        <ArticleComment comment={this.props.comment} />
                    </div>
                </div>
            </div>
            );
    }
}

module.exports={
    "Art_Page":function(props){
        return <ArticleContent info={props.info} comment={props.comment}/>;
    }
};