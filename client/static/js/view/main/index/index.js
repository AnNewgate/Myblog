import React from 'react';
var ReactDOM = require('react-dom');
import 'antd/dist/antd.css';
import MyCarousel from '../../component/MyCarousel';
import MyBlog from '../../component/theBlogs';
import MyCard from '../../component/businessCard';
import ArticleList from '../../component/latestArticles';
import Links from '../../component/links';
import SiteInfo from '../../component/siteInfo';
import SpecialRecom from '../../component/specialRecom';

class IndexContent extends React.Component{
    render(){
        return(
            <div className="content-div">
                <div className="content">
                    <div className="left">
                    <MyCarousel></MyCarousel>
                    <SpecialRecom blogClass={-1}></SpecialRecom>
                    <MyBlog blogClass={0} title={"最新博客"}></MyBlog>
                    </div>
                    <div className="right">
                    <MyCard></MyCard>
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

