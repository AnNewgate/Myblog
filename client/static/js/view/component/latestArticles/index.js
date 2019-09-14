import React from 'react';
import { List } from 'antd';
// import 'antd/dist/antd.css';
import store from '../../../store/common/ArticleList';

class ArticlesList extends React.Component{
    constructor(props){
        super(props);
        this.state = {data: []};
        this.getData();
    }
    
    getData(){
        var self = this;
        store.getAllItem(function (data) {
        //var i = 0;
        //var len = data.length;
        var ListArr = data;
        // for(; i<len; i++) {
        //   itemListArr[i] = data[i].Message;
        // }
        self.setState({data: ListArr});
      })
    }

    render(){
        return(
            <div>
            <style>
                {
                    `.ant-list{
                        background-color : white;
                        margin-top: 1em;
                    }`
                }
            </style>
            <List
            itemLayout="horizontal"
            header={<div style={{fontWeight: "bolder"}}>最新文章</div>}
            bordered
            dataSource={this.state.data}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
                />
            </List.Item>
            )}/>
            </div>
        );
    };
}

export default ArticlesList;