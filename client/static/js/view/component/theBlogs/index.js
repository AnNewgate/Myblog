import React from 'react';
import { List, Menu, Icon, Card, Dropdown } from 'antd';
// import 'antd/dist/antd.css';
var store = require('../../../store/common/BlogList');

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
    );
const ClassMenu = ({menuitems}) => (
        <Menu>
            {
                menuitems.map(item => {
                    return(
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                            {item}
                        </a>
                    </Menu.Item>);
                })
            }
        </Menu>
    );
    
class TheBlog extends React.Component{
    constructor(props){
        super(props);
        this.state = {listData: [], menuitems: []};
        this.getData(this.props.blogClass);
    }

    getData(articleClass){
        var self = this;
        store.getAllItem(articleClass,function (data) {
        var itemListArr = data;
        var menuitems = ["按热度", "按时间"];
        self.setState({listData: itemListArr,menuitems : menuitems});
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
                        <Dropdown overlay={<ClassMenu menuitems={this.state.menuitems}/>} >
                            <a className="ant-dropdown-link" href="#">{this.state.menuitems[0]} <Icon type="down" /></a>
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