import React from 'react';
import { message, Layout, Menu, Icon, Empty, Divider, Button, Modal } from 'antd';
import axios from 'axios';
import WebInfo from '../WebInfo/index';
import BlogInfo from '../BlogList/index';

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

class Clock extends React.Component{
    constructor(){
        super();
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <span>现在是:{this.state.date.toLocaleTimeString()}  </span>
        );
    }

}

class IndexPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            ifLogin: false,
            userName: '未登录用户',
            LayoutContent: <WebInfo />
        }
        this.initial();
    }

    initial() {
        let storage = window.localStorage;
        // 设置以后的请求配置：把token放在请求头中
        axios.interceptors.request.use(function (config) {
            config.withCredentials = true;
            config.headers = {
                token: storage.token
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentWillMount(){
        this.checkLogin();
    }

    componentDidMount(){
        this.LoginStatus = setInterval(
            () => this.checkLogin(),
            1800000
        );
    }

    componentWillUnmount() {
        clearInterval(this.LoginStatus);
    }

    checkLogin(){
        var self = this;
        let history = this.props.history;
        let storage = window.localStorage;
        const error = () => {
            message.error('检测到您的登录已过期或者还未登录，请先登录！',3);
        };
        axios.get('/action/ifLogin?type=checkLoginStatu')
            .then(function (response) {
                //console.log(response.data);
                if(response.data.Code == 403){
                    self.setState({ ifLogin: false});
                    setTimeout(function(){
                        history.replace('/');
                    },3000);
                    error();
                }else if(response.data.Code == 200){
                    self.setState({ ifLogin: true, userName: storage.userName  });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    showConfirm = (e) => {
        var self = this;
        let history = self.props.history;
        let storage = window.localStorage;
        confirm({
            title: '请问您是要退出登录吗？',
            content: '退出后会跳转到登录页面',
            onOk() {
                self.setState({ ifLogin: false});
                storage.token = null;
                history.replace('/');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onMenuItemClick = (e) => {
        //var self = this;
        const menuItem = {
            "1": <WebInfo />,
            "2": <BlogInfo />,
            "3": <Empty description={false} />
        }
        //console.log(e.key);
        this.setState({
            LayoutContent: menuItem[e.key]
        });
    };

    render(){
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} breakpoint="lg">
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.onMenuItemClick}>
                        <Menu.Item key="1">
                            <Icon type="info-circle" />
                            <span>网站信息管理</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="file-text" />
                            <span>博文管理</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="message" />
                            <span>评论管理</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div style={{ float: "right" }}>
                            <span>您好! {this.state.userName}</span>
                            <Divider type="vertical" />
                            <Clock />
                            <Divider type="vertical" />
                            <Button type="primary" onClick={this.showConfirm} icon="logout" size='default' style={{ marginRight: 10 }}>
                                退出登录
                            </Button>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 5px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                            overflow: 'scroll'
                        }}
                    >
                        {this.state.ifLogin == true ? this.state.LayoutContent : <Empty description={false} />}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default IndexPage;