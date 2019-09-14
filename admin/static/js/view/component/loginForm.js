import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import md5 from 'md5';
import '../../../css/loginForm.css'

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.setFieldValue = this.setFormFieldValue.bind(this);
    }
    
    setFormFieldValue(){
        let storage = window.localStorage;
        if((storage.email != "" && storage.password != "") || (storage.email != undefined && storage.password != undefined)){
            this.props.form.setFieldsValue({['email']: storage.email,['password']: storage.password,['remember']: true});
        }else{
            this.props.form.setFieldsValue({['remember']: false});
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const error = () => {
            message.error('用户名或者密码有误！');
        };
        let history = this.props.history;
        this.props.form.validateFields((err, values) => {
            if (!err) {
               // console.log('Received values of form: ', values);
                let storage = window.localStorage;
                axios.post('/action/login', {
                    email: values.email,
                    password: md5(values.password),
                  })
                  .then(function (response) {
                    if(response.data.Code == 200){
                        // 登录成功后，将token存储到localStorage中
                        storage.token = response.data.tokenRes;
                        if(values.remember == true){
                            storage.email = values.email;
                            storage.password = values.password;
                            storage.userName = response.data.userName;
                        }else{
                            storage.email = "";
                            storage.password = "";
                        }
                        history.push('/index');
                    }else if(response.data.Code == 400){
                        console.log(response.data.mes);
                        error();
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
        });
    };
    
    componentDidMount(){
        this.setFieldValue();
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-form-container mask">
                <div className="login-form-box">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                  },
                                  {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                  },],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const NormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default NormalLoginForm;