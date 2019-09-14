import React from 'react';
import { Card, CardBody, CardText, CardImg, CardHeader } from 'reactstrap';
import store from '../../../store/common/SiteInfo';

class SiteInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = { siteinfo: {} };
        this.getData();
    }

    getData(){
        var self = this;
        store.getAllItem(function (data) {
        var itemListArr = data;
        self.setState({ siteinfo: itemListArr });
      })
    }

    render(){
        return(
            <div>
            <style>
                {
                    `.card-img{
                        display : block;
                        width : 150px;
                        height : 150px;
                        margin : 0 auto;
                    }
                    #siteinfo{
                        margin-top: 1em;
                    }`
                }
            </style>
            <Card id="siteinfo">
                <CardHeader><strong>站点信息：</strong></CardHeader>
                <CardBody>
                    <CardText><strong>建站时间：</strong>{this.state.siteinfo.startTime}</CardText>
                    <CardText><strong>公众号:</strong>{this.state.siteinfo.public_introduction}</CardText>
                    <CardImg src={this.state.siteinfo.public_imgSrc} alt="公众号二维码" />
                </CardBody>
            </Card>
        </div>
        );
    };
}

export default SiteInfo;