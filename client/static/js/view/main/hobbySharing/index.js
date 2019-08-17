import React from 'react';
var ReactDOM = require('react-dom');
import 'antd/dist/antd.css';
import MyBlog from '../../component/theBlogs';
import ArticleList from '../../component/latestArticles';
import Links from '../../component/links';
import SiteInfo from '../../component/siteInfo';

class IndexContent extends React.Component{
    render(){
        return(
            <div className="content-div">
                <div className="content">
                    <div className="left">
                    <MyBlog blogClass={3} title={"爱好分享"}></MyBlog>
                    </div>
                    <div className="right">
                    <ArticleList></ArticleList>
                    <Links></Links>
                    <SiteInfo></SiteInfo>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <IndexContent />,
    document.getElementById('pageContent')
);

