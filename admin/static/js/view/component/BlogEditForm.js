import React from 'react';
import { Form, Button, Col, Row, Input, Select, Rate, message, Switch } from 'antd';
import PropTypes from 'prop-types'
import axios from 'axios';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
// import ArticleUploadImg from './UploadImg';
import ArticleUploadImg from './MyUpload';
import EditableTags from './EditableTagGroup';

const { Option } = Select;
const ClassArr = [
    {
        key: 1,
        text: "心情随笔"
    },
    {
        key: 2,
        text: "技术分享"
    },
    {
        key: 3,
        text: "爱好分享"
    },
    {
        key: 4,
        text: "网站公告"
    },
];

class BlogEditForm extends React.Component {
    static propTypes = {
        dataSource: PropTypes.object,
        type: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            imgCover: this.props.dataSource.cover,
            tags: this.props.dataSource.tags || ["空"]
        };
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

    onClose = () => {
        this.props.onCancel();
    };

    onSubmit = () => {
        var self = this;
        var { type, dataSource } = this.props;
        var { imgCover, tags } = this.state;
        var id;
        if(dataSource.id != undefined) id = dataSource.id;
        const error = () => {
            message.error('保存失败！请重试', 2);
        };
        const success = () => {
            message.success('保存成功！', 2);
        };
        var url = "/data/adminAdd_modifyBlog?type="+type;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                const submitData = {
                    id: id,
                    title: values.title,
                    name: values.name,
                    classId: values.classId,
                    introduction: values.introduction,
                    star: values.star,
                    statu: values.statu == true ? 1 : 0,
                    content: values.content.toHTML(),
                    cover: imgCover,
                    tags: tags.join(" "),
                };
                //console.log(submitData);
                axios.post(url, {
                    data: submitData
                })
                    .then(function (response) {
                        if (response.data.Code == 200) {
                            //console.log(response.data.mes);
                            success();
                            self.props.onCancel();
                        } else if (response.data.Code == 400) {
                            //console.log(response.data.mes);
                            error();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }else{
                console.log(err);
            }
        });
    };

    handelImg(url){
        //console.log("返回的图片链接"+url);
        this.setState({
            imgCover: url
        });
    }

    handelTagsChange = tags => {
        this.setState({
            tags: tags
        })
    }

    preview = () => {
        if (window.previewWindow) {
            window.previewWindow.close()
        }
        window.previewWindow = window.open()
        window.previewWindow.document.write(this.buildPreviewHtml())
        window.previewWindow.document.close()
    }

    buildPreviewHtml() {
        return `
        <!Doctype html>
          <html>
            <head>
              <title>Preview Content</title>
              <style>
                html,body{
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  overflow: auto;
                  background-color: #f1f2f3;
                }
                .container{
                  box-sizing: border-box;
                  width: 1000px;
                  max-width: 100%;
                  min-height: 100%;
                  margin: 0 auto;
                  padding: 30px 20px;
                  overflow: hidden;
                  background-color: #fff;
                  border-right: solid 1px #eee;
                  border-left: solid 1px #eee;
                }
                .container img,
                .container audio,
                .container video{
                  max-width: 100%;
                  height: auto;
                }
                .container p{
                  white-space: pre-wrap;
                  min-height: 1em;
                }
                .container pre{
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-radius: 5px;
                }
                .container blockquote{
                  margin: 0;
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-left: 3px solid #d1d1d1;
                }
              </style>
            </head>
            <body>
              <div class="container">${this.props.form.getFieldValue("content").toHTML()}</div>
            </body>
          </html>
          `
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        var { dataSource } = this.props;
        var { tags, imgCover } = this.state;
        const extendControls = [
            {
              key: 'custom-button',
              type: 'button',
              text: '预览',
              onClick: this.preview
            }
        ];
        //console.log(dataSource);
        return (
            <div>
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="文章标题(必填项)">
                                {getFieldDecorator('title', {
                                    initialValue: dataSource.title || "文章标题",
                                    rules: [{ required: true, message: 'Please enter article title' }],
                                })(<Input placeholder="Please enter article title" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="作者姓名(必填项)">
                                {getFieldDecorator('name', {
                                    initialValue: dataSource.name || "作者姓名",
                                    rules: [{ required: true, message: 'Please enter author name' }],
                                })(<Input placeholder="Please enter author name" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="文章封面" extra="上传文章封面">
                                <ArticleUploadImg name="articleCover" url={imgCover} handelImg={this.handelImg.bind(this)}></ArticleUploadImg>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="文章类别(必填项)">
                                {getFieldDecorator('classId', {
                                    initialValue: dataSource.classId || 1,
                                    rules: [{ required: true, message: 'Please select an article category' }],
                                })(
                                    <Select placeholder="Please select an article category">
                                        {
                                            ClassArr.map( item => (
                                              <Option key={item.key} value={item.key}>{item.text}</Option>
                                            ))
                                        }
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="文章简介">
                                {getFieldDecorator('introduction', {
                                    initialValue: dataSource.introduction || null,
                                    rules: [
                                        {
                                            message: 'please enter article introduction',
                                        },
                                    ],
                                })(<Input.TextArea rows={4} placeholder="please enter article introduction" />)}
                            </Form.Item>
                            <Form.Item label="文章内容编辑(必填项)">
                                {getFieldDecorator('content', {
                                    validateTrigger: 'onBlur',
                                    initialValue: dataSource.content ? BraftEditor.createEditorState(dataSource.content) : ``,
                                    rules: [{
                                        required: true,
                                        validator: (_, value, callback) => {
                                            if (value.isEmpty()) {
                                                callback('请输入正文内容')
                                            } else {
                                                callback()
                                            }
                                        }
                                    }],
                                })(
                                    <BraftEditor
                                        className="my-editor"
                                        extendControls={extendControls}
                                        placeholder="请输入正文内容"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="推荐度">
                                {getFieldDecorator('star', {
                                    initialValue: dataSource.star || 0,
                                })(<Rate />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="文章状态">
                                {getFieldDecorator('statu', { 
                                    initialValue: dataSource.statu == 1 ? true : false,
                                    valuePropName: 'checked' 
                                })(<Switch checkedChildren="发布中" unCheckedChildren="修改中"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="文章标签">
                                <EditableTags tags={tags} onChange={this.handelTagsChange}></EditableTags>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={this.onSubmit} type="primary">
                        保存
                    </Button>
                </div>
            </div>
        );
    }
}

BlogEditForm = Form.create()(BlogEditForm);

export default BlogEditForm;