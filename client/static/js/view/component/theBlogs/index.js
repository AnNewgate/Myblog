import React from 'react';
import { List, Menu, Icon, Card, Dropdown } from 'antd';
// import 'antd/dist/antd.css';
import store from '../../../store/common/BlogList';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

// const ClassMenu = ({ menuitems, reloadData, articleClass }) => (
//     <Menu>
//         {
//             menuitems.map((item, index) => {
//                 return (
//                     <Menu.Item key={index}>
//                         <a onClick={reloadData(articleClass, this)}>
//                             {item}
//                         </a>
//                     </Menu.Item>);
//             })
//         }
//     </Menu>
// );
    
class TheBlog extends React.Component{
    constructor(props){
        super(props);
        this.state = {listData: [], menuitems: []};
        this.getData(this.props.blogClass);
        this.reloadData = this.reloadData.bind(this);
    }

    getData(articleClass){
        var self = this;
        store.getAllItem(articleClass,"按时间",function (data) {
            var itemListArr = data;
            var menuitems = ["按时间", "按热度"];
            self.setState({ listData: itemListArr, menuitems: menuitems });
      });
    }

    reloadData(event){
        var self = this;
        event = event.nativeEvent;
        const tr = event.target;
        let category = tr.innerHTML;
        let articleClass = self.props.blogClass;
        var menuitems = self.state.menuitems;
        store.getAllItem(articleClass,category,function(data){
            var itemListArr = data;
            var temp = menuitems[0];
            menuitems[0] = menuitems[1];
            menuitems[1] = temp;
            self.setState({ listData: itemListArr, menuitems: menuitems });
        })
    }

    render(){
        if (this.props.blogClass == 0) {
            return (
                <Card title={this.props.title}
                    style={{ width: "100%", marginTop: "1em" }}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={this.state.listData}
                        style={{
                            marginTop: "0"
                        }}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText type="user" text={item.author} />,
                                    <IconText type="history" text={item.time} />,
                                    <IconText type="eye-o" text={item.pageViews} />,
                                    <IconText type="like-o" text={item.likeNum} />,
                                    <IconText type="message" text={item.commentNum} />,
                                ]}
                                extra={
                                    <img
                                        style = {{width: "auto", maxWidth: "100%"}}
                                        alt="logo"
                                        src={item.imgSrc}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            );
        } else {
            return (
                <Card title={this.props.title}
                    extra={
                        <Dropdown 
                        overlay={<Menu>{
                                this.state.menuitems.map((item, index) => {
                                    return(
                                    <Menu.Item key={index}>
                                        <a onClick={this.reloadData}>
                                            {item}
                                        </a>
                                    </Menu.Item>);
                                })
                            }</Menu>} >
                        <a className="ant-dropdown-link" >{this.state.menuitems[0]} <Icon type="down" /></a>
                        </Dropdown>
                    }
                    style={{ width: "100%", marginTop: "1em" }}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 8,
                        }}
                        dataSource={this.state.listData}
                        style={{
                            marginTop: "0"
                        }}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText type="user" text={item.author} />,
                                    <IconText type="history" text={item.time} />,
                                    <IconText type="eye-o" text={item.pageViews} />,
                                    <IconText type="like-o" text={item.likeNum} />,
                                    <IconText type="message" text={item.commentNum} />,
                                ]}
                                extra={
                                    <img
                                        style = {{width: "auto", maxWidth: "100%"}}
                                        alt="logo"
                                        src={item.imgSrc}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            );
        }
    }
}

export default TheBlog;