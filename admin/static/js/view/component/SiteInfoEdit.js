import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import BusinessImg from './UploadImg';
//刚从BusinessCardEdit文件复制过来，由于还没确定，所以暂时先不实现
class SiteInfoFrom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            businessCardInfo: {
                name: "",
                career: "",
                living: "",
                email: "",
                qq_img: "",
                wx_img: "",
                git_href: ""
            }
        };
        this.initial();
    }

    initial(){
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

    get_setBusinessCardInfo(type) {
        var self = this;
        var url = '';
        const success = () => {
            message.success('名片信息修改成功！', 2);
        };

        const error = () => {
            message.error('名片信息修改失败！', 2);
        };
        const { businessCardInfo } = self.state;
        if (type == 'get') {
            url = '/data/getBusinessCardInfo';
            axios.get(url)
                .then(function (response) {
                    //console.log(response.data);
                    var data = response.data;
                    self.setState({
                        businessCardInfo: data
                    });
                    //console.log("已调用setState方法");
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (type == 'set') {
            url = '/data/setBusinessCardInfo';
            this.props.form.validateFields((err, values) => {
                if(!err){
                    var reg = new RegExp('/');
                    var info = {};
                    info = values;
                    info.qq_img = businessCardInfo.qq_img.replace(reg, '');
                    info.wx_img = businessCardInfo.wx_img.replace(reg, '');
                    // console.log(info);
                    axios.post(url, {
                        info: info
                    })
                        .then(function (response) {
                            if (response.data.Code == 200) {
                                //console.log(response.data.mes);
                                success();
                            } else if (response.data.Code == 400) {
                                //console.log(response.data.mes);
                                error();
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
            this.get_setBusinessCardInfo("get");
        }
    }

    handelQQImg(url){
        //console.log(url);
        this.setState((prevState) => {
            let info = prevState.businessCardInfo;
            info.qq_img = url;
            return { businessCardInfo: info }
        })
    }

    handelWXImg(url){
        //console.log(url);
        this.setState((prevState) => {
            let info = prevState.businessCardInfo;
            info.wx_img = url;
            return { businessCardInfo: info }
        })
    }

    componentDidMount(){
        this.get_setBusinessCardInfo("get");
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.businessCardInfo !== nextState.businessCardInfo || this.props !== nextProps){
            return true;
        }else{
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState){
    }

    render(){
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        const buttonItemLayout ={
            wrapperCol: { span: 16, offset: 4 },
        }
        const { getFieldDecorator } = this.props.form;
        const { businessCardInfo } = this.state;
        return (
            <div>
                <Form layout='horizontal'>
                    <Form.Item label="姓名" {...formItemLayout}>
                        {getFieldDecorator('name',{ initialValue: businessCardInfo.name })(
                            <Input placeholder="input name" />,
                        )}
                    </Form.Item>
                    <Form.Item label="职业" {...formItemLayout}>
                        {getFieldDecorator('career', { initialValue: businessCardInfo.career })(
                            <Input placeholder="input career" />,
                        )}
                    </Form.Item>
                    <Form.Item label="现住地" {...formItemLayout}>
                        {getFieldDecorator('living', { initialValue: businessCardInfo.living })(
                            <Input placeholder="input living" />,
                        )}
                    </Form.Item>
                    <Form.Item label="邮箱" {...formItemLayout}>
                        {getFieldDecorator('email', {
                            initialValue: businessCardInfo.email ,
                            rules: [{
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            }],
                        })(
                            <Input placeholder="input email" />,
                        )}
                    </Form.Item>
                    <Form.Item label="QQ二维码" {...formItemLayout}>
                        <BusinessImg name="QQ二维码" url={businessCardInfo.qq_img} handelImg={this.handelQQImg.bind(this)}/>,
                    </Form.Item>
                    <Form.Item label="微信二维码" {...formItemLayout}>
                        <BusinessImg name="微信二维码" url={businessCardInfo.wx_img} handelImg={this.handelWXImg.bind(this)}/>,
                    </Form.Item>
                    <Form.Item label="GitHub链接" {...formItemLayout}>
                        {getFieldDecorator('git_href', { initialValue: businessCardInfo.git_href })(
                            <Input placeholder="input GitHub Link" />,
                        )}
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Button type="primary" onClick={this.get_setBusinessCardInfo.bind(this,"set")}>保存修改</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const SiteInfoFromEdit = Form.create({ name: 'normal_Editform' })(SiteInfoFrom);

export default SiteInfoFromEdit;
