import React from 'react';
import axios from 'axios';
import { Table, Input, Button, Popconfirm, Form, message, InputNumber, Divider } from 'antd';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class LinkInfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'key',
                dataIndex: 'key',
                width: '8%',
            },
            {
                title: 'SiteName',
                dataIndex: 'name',
                editable: true,
            },
            {
                title: 'SiteLink',
                dataIndex: 'src',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        onClick={() => this.save(form, record.key)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Save
                                </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <span>
                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                Edit
                            </a>
                            <Divider type="vertical" />
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a disabled={editingKey !== ''}>
                                Delete
                            </a>
                           </Popconfirm>
                        </span>
                        );
                },
            },
        ];
        this.state = {
            linkInfo: [
                {
                    key: 1,
                    src: `http://www.baidu.com`,
                    name: '百度',
                },
                {
                    key: 2,
                    src: `http://www.baidu.com`,
                    name: '百度',
                },
                {
                    key: 3,
                    src: `http://www.baidu.com`,
                    name: '百度',
                },
            ],
            count: 4,
            editingKey: ''
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

    get_setLinkInfo(type) {
        var self = this;
        var url = '';
        const success = () => {
            message.success('友情链接信息修改成功！', 2);
        };

        const error = () => {
            message.error('友情链接信息修改失败！', 2);
        };
        if (type == 'get') {
            url = '/data/getLinksList';
            axios.get(url)
                .then(function (response) {
                    //console.log(response.data);
                    var data = response.data;
                    self.setState({
                        linkInfo: data,
                        count: data.length + 1
                    });
                    //console.log("已调用setState方法");
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (type == 'set') {
            url = '/data/setLinksList';
            var { linkInfo } = self.state;
            //console.log(info);
            axios.post(url, {
                info: linkInfo
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
            this.get_setLinkInfo("get");
        }
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    handleDelete = key => {
        const linkInfo = [...this.state.linkInfo];
        this.setState({ linkInfo: linkInfo.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const { count, linkInfo } = this.state;
        const newData = {
            key: count,
            src: `请输入网址`,
            name: '请输入网站名',
        };
        this.setState({
            linkInfo: [...linkInfo, newData],
            count: count + 1,
        });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.linkInfo];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ linkInfo: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ linkInfo: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    componentDidMount() {
        this.get_setLinkInfo("get");
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState || this.props !== nextProps){
            return true;
        }else{
            return false;
        }
    }

    // componentWillUpdate(nextProps, nextState) {
    // }

    render() {
        const { linkInfo } = this.state;
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.name,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div>
                <EditableContext.Provider value={this.props.form}>
                    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                        新增
                    </Button>
                    <Table
                        components={components}
                        bordered
                        dataSource={linkInfo}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                        }}
                    />
                    <Button onClick={this.get_setLinkInfo.bind(this,"set")} type="primary" style={{ marginBottom: 16 }}>
                        保存修改
                    </Button>
                </EditableContext.Provider>
            </div>
        );
    }
}

const LinkInfoFormTable = Form.create()(LinkInfoTable)

export default LinkInfoFormTable;
