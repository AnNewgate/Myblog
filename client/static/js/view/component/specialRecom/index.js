import React from 'react';
import {  Card, Col, Row } from 'antd';
// import 'antd/dist/antd.css';
import store from '../../../store/common/BlogList';

const { Meta } = Card;
    
class SpecialRecom extends React.Component{
    constructor(props){
        super(props);
        this.state = {listData1: [],listData2: []};
         this.getData(this.props.blogClass);
    }

    getData(articleClass){
        var self = this;
        store.getAllItem(articleClass,"按热度",function (data) {
            var itemListArr1 = [], itemListArr2 = [];
            for(let i = 0; i < data.length; i++){
                if(i < 3) itemListArr1.push(data[i]);
                else itemListArr2.push(data[i]);
            }
            self.setState({listData1: itemListArr1, listData2: itemListArr2});
      })
    }

    render(){
        return(
            <Card 
            className="special"
            title="特别推荐"  
            style={{ width: "100%", marginTop: "1em"}}>
                <Row gutter={16}>
                    {
                        this.state.listData1.map(item => {
                            return(
                                <a key={item.blogid} href={item.href}>
                                <Col span={8}>
                                    <Card
                                        hoverable
                                        style={{ width: "100%", minHeiht: "100%", marginBottom: "1em"}}
                                        cover={<img style = {{width: "auto", maxWidth: "100%", marginLeft: "auto", marginRight: "auto"}} alt={item.title} src={item.imgSrc} />}
                                    >
                                        <Meta title={item.title} description={item.description == null ? "null" : item.description} />
                                    </Card>
                                </Col>
                                </a>
                            );
                        })
                    }
                </Row>
                <Row gutter={16}>
                    {
                        this.state.listData2.map(item => {
                            return(
                                <a key={item.blogid} href={item.href}>
                                <Col span={8}>
                                    <Card
                                        hoverable
                                        style={{ width: "100%", minHeiht: "100%", marginBottom: "1em"}}
                                        cover={<img style = {{width: "auto", maxWidth: "100%", marginLeft: "auto", marginRight: "auto"}} alt={item.title} src={item.imgSrc} />}
                                    >
                                        <Meta title={item.title} description={item.description == null ? "null" : item.description} />
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