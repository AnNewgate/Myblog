import React from 'react';
import { List } from 'antd';
// import 'antd/dist/antd.css';
var store = require('../../../store/common/LinkList');

class LinkList extends React.Component{
    constructor(props){
        super(props);
        this.state = {data: []};
        this.getData();
    }
    
    getData(){
        var self = this;
        store.getAllItem(function (data) {
        var itemListArr = data;
        self.setState({data: itemListArr});
      })
    }

    render(){
        return(
            <div>
            <List
            itemLayout="horizontal"
            header={<div style={{fontWeight: "bolder"}}>友情链接</div>}
            bordered
            dataSource={this.state.data}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                title={<a href={item.src}>{item.name}</a>}
                />
            </List.Item>
            )}/>
            </div>
        );
    };
}

export default LinkList;