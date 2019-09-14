import React from 'react';
import axios from 'axios';
import { Table, Input, Button, Popconfirm, Form, message } from 'antd';
import UploadImg from './UploadImg';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

class CarouselTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'key',
                dataIndex: 'key',
                width: '8%',
            },
            {
                title: 'altText',
                dataIndex: 'altText',
                editable: true,
            },
            {
                title: 'caption',
                dataIndex: 'caption',
                editable: true,
            },
            {
                title: 'src',
                dataIndex: 'src',
                render: (text, record) =>
                    <UploadImg name="图片" url={record.src} handelImg={this.handelImg.bind(this,record.key)}></UploadImg>,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.carouselInfo.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            carouselInfo: [],
            count: 0,
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

    get_setCarouselInfo(type) {
        var self = this;
        var url = '';
        const success = () => {
            message.success('走马灯信息修改成功！', 2);
        };

        const error = () => {
            message.error('走马灯信息修改失败！', 2);
        };
        if (type == 'get') {
            url = '/data/getImgItemList';
            axios.get(url)
                .then(function (response) {
                    //console.log(response.data);
                    var data = response.data;
                    self.setState({
                        carouselInfo: data,
                        count: data.length + 1
                    });
                    //console.log("已调用setState方法");
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (type == 'set') {
            url = '/data/setImgItemList';
            var reg = new RegExp('/');
            var info = {};
            var { carouselInfo } = self.state;
            info = carouselInfo;
            info.map( item => {
                item.src = item.src.replace(reg, '')
            });
            //console.log(info);
            axios.post(url, {
                info: info
            })
                .then(function (response) {
                    if (response.data.Code == 200) {
                        console.log(response.data.mes);
                        success();
                    } else if (response.data.Code == 400) {
                        console.log(response.data.mes);
                        error();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.get_setCarouselInfo("get");
        }
    }

    handelImg(id,url) {
        id = id - 1;
        this.setState((prevState) => {
            let info = prevState.carouselInfo;
            info[id].src = url;
            //console.log(info[id]);
            return { carouselInfo: info }
        })
    }

    handleDelete = key => {
        const carouselInfo = [...this.state.carouselInfo];
        this.setState({ carouselInfo: carouselInfo.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const { count, carouselInfo } = this.state;
        const newData = {
            key: count,
            src: `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`,
            altText: '这是altText',
            caption: `这是caption`,
        };
        this.setState({
            carouselInfo: [...carouselInfo, newData],
            count: count + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.carouselInfo];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ carouselInfo: newData });
    };

    componentDidMount() {
        this.get_setCarouselInfo("get");
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.carouselInfo !== nextState.carouselInfo){
            return true;
        }else{
            return false;
        }
    }

    // componentWillUpdate(nextProps, nextState) {
    // }

    render() {
        const { carouselInfo } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
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
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    新增
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={carouselInfo}
                    columns={columns}
                />
                <Button onClick={this.get_setCarouselInfo.bind(this, 'set')} type="primary" style={{ marginBottom: 16 }}>
                    保存修改
                </Button>
            </div>
        );
    }
}

export default CarouselTable;
