import React from 'react';
import axios from 'axios';
import { Table, Divider, Tag, message, Switch, Button, Input, Icon, Rate, Modal, Drawer } from 'antd';
import Highlighter from 'react-highlight-words';
import BlogEditForm from '../component/BlogEditForm';
const { confirm } = Modal;


class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sortedInfo: null,
      searchText: '',
      visible: false,
      formData: {},
      type: "modify"
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

  getBlogList(blogId) {
    var self = this;
    var url = '/data/adminGetBlogList';
    if(blogId != undefined) url += '?blogId='+blogId;
    axios.get(url)
      .then(function (response) {
        var data = response.data;
        if(blogId == undefined){
          self.setState({
            data: data,
          });
        }else{
          self.setState({
            formData:data[0],
            visible: true,
            type: "modify"
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDelete = blogId => {
    var self = this;
    const data = [...this.state.data];
    const success = () => {
      message.success('删除成功！', 2);
    };
    const error = () => {
      message.error('删除失败！', 2);
    };
    var url = '/data/adminDeleteBlog?blogId='+blogId;
    axios.get(url)
      .then(function (response) {
        var result = response.data;
        //console.log(response);
        if(result.Code == 200){
          self.setState({ data: data.filter(item => item.id !== blogId) });
        }else if(result.Code == 400){
          error();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  showConfirm = (blogId) => {
    var self = this;
    //console.log(blogId);
    confirm({
      title: '请问您确定要删除此文章吗？',
      content: '删除后文章的数据将会消失，无法撤销',
      onOk() {
        self.handleDelete(blogId);
        console.log("已删除");
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleAdd = () => {
    this.setState({
      formData: {},
      visible: true,
      type: "add"
    });
  };

  handleChange = (pagination, filters, sorter) => {
    //console.log('Various parameters', pagination, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  showDrawer = (blogId) => {
    this.getBlogList(blogId);
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
    this.getBlogList();
  };

  componentWillMount(){
    this.getBlogList();
  };

  render() {
    const { sortedInfo, data, formData, type } = this.state;
    const SortedInfo = sortedInfo || {};
    const columns = [
      {
        title: 'BlogTitle',
        dataIndex: 'title',
        key: 'title',
        width: '15%',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: 'AuthorName',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'ClassName',
        dataIndex: 'class',
        key: 'class',
      },
      {
        title: 'Star',
        dataIndex: 'star',
        key: 'star',
        sorter: (a, b) => a.star - b.star,
        sortOrder: SortedInfo.columnKey === 'star' && SortedInfo.order,
        render: star => (
          <Rate disabled value={star} />
        ),
      },
      {
        title: 'ModifyTime',
        dataIndex: 'modifyTime',
        key: 'modifyTime',
        sorter: (a, b) => new Date(Date.parse(a.modifyTime)) - new Date(Date.parse(b.modifyTime)),
        sortOrder: SortedInfo.columnKey === 'modifyTime' && SortedInfo.order,
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              // if (tag === 'loser') {
              //   color = 'volcano';
              // }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Statu',
        dataIndex: 'statu',
        width: '10%',
        key: 'statu',
        render: (text, record) => (
          <Switch checkedChildren="发布中" unCheckedChildren="修改中" disabled checked={record.statu == 1 ? true : false} />
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.showDrawer(record.id)}>Edit</a>
            <Divider type="vertical" />
            <a onClick={() => this.showConfirm(record.id)}>
              Delete
            </a>
          </span>
        ),
      },
    ];
    console.log(data);
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginTop: 10, marginBottom: 10 }}>
          新增文章
        </Button>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
        <Drawer
          title="博客内容编辑区"
          width={"80%"}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          {
            this.state.visible ? <BlogEditForm 
            dataSource={formData} 
            type={type}
            onCancel={this.onClose}
          ></BlogEditForm> : null
          }
        </Drawer>
      </div>
    );
  }
}

export default BlogList;