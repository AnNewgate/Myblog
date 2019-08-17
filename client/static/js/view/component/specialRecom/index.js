import React from 'react';
import {  Menu, Icon, Card, Dropdown, Col, Row } from 'antd';
import Item from 'antd/lib/list/Item';
// import 'antd/dist/antd.css';
var store = require('../../../store/common/BlogList');

const { Meta } = Card;
    
class SpecialRecom extends React.Component{
    constructor(props){
        super(props);
        this.state = {listData: []};
         this.getData(this.props.blogClass);
    }

    getData(articleClass){
        var self = this;
        store.getAllItem(articleClass,function (data) {
        var itemListArr = data;
        self.setState({listData: itemListArr});
      })
    }

    render(){
        return(
            <Card title="特别推荐"  
            style={{ width: "100%", marginTop: "1em"}}>
                <Row gutter={16}>
                    {
                        this.state.listData.map(item => {
                            return(
                                <a key={item.blogid} href={item.href}>
                                <Col span={8}>
                                    <Card
                                        hoverable
                                        style={{ width: "100%", marginBottom: "1em"}}
                                        cover={<img style = {{width: "auto", maxWidth: "100%", marginLeft: "auto", marginRight: "auto"}} alt={item.title} src={item.imgSrc} />}
                                    >
                                        <Meta title={item.title} description={item.description} />
                                    </Card>
                                </Col>
                                </a>
                            );
                        })
                    }
                </Row>
            </Card>
        );
    }
}

export default SpecialRecom;