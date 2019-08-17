import React from 'react';
import { Card, CardHeader, CardBody, CardText, UncontrolledTooltip, Button } from 'reactstrap';
//import { Popover } from 'antd';
var store = require('../../../store/common/BusinessCardInfo');
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

class BusinessCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      QQstate: "none",
      WXstate: "none",
      QQcolor: "#a9dcfa",
      WXcolor: "#a9dcfa",
      GITcolor: "#a9dcfa",
      QQbgColor: "#eaebe6",
      WXbgColor: "#eaebe6",
      GITbgColor: "#eaebe6",
      cardInfo: {}
    }
    // 用classname库来控制样式，书《深入React技术栈》第65页的例子
    this.getData();
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }
  onEnter(event) {
    event = event.nativeEvent;
    const tr = event.target;
    let id = tr.id;
    if (id == 'qq' || id == "qq-o") {
      this.setState({ QQstate: "block", QQcolor: "#eaebe6", QQbgColor: "#a9dcfa" });
    } else if (id == 'weixin' || id == "wc-o") {
      this.setState({ WXstate: "block", WXcolor: "#eaebe6", WXbgColor: "#a9dcfa" });
    } else {
      this.setState({ GITcolor: "#eaebe6", GITbgColor: "#a9dcfa" });
    }
  }

  onLeave(event) {
    event = event.nativeEvent;
    const tr = event.target;
    let id = tr.id;
    if (id == 'qq' || id == "qq-o") {
      this.setState({ QQstate: "none", QQcolor: "#a9dcfa", QQbgColor: "#eaebe6" });
    } else if (id == 'weixin' || id == "wc-o") {
      this.setState({ WXstate: "none", WXcolor: "#a9dcfa", WXbgColor: "#eaebe6" });
    } else {
      this.setState({ GITcolor: "#a9dcfa", GITbgColor: "#eaebe6" });
    }
  }

  getData() {
    var self = this;
    store.getAllItem(function (data) {
      var info = data;
      self.setState({ cardInfo: info });
    })
  }

  render() {
    return (
      <div>
        <style>
          {
            `.qq,.weixin,.github {
                font-size : 1.3em;
             }
             .qq-ic1,.wc-ic1,.git-ic1{
                width : 2.2em;
                height : 2.2em;
                display : inline-block;
                overflow : hidden;
                border-radius : 1.1em;
                line-height : 2.2em;
                text-align : center;
                margin: 0 0.5em;
             }
             .mb-2{
              text-align : center;
             }
            `
          }
        </style>
        <Card>
          <CardHeader><strong>我的名片</strong></CardHeader>
          <CardBody>
            <CardText>姓名：{this.state.cardInfo.name}<Button outline color="primary" style={{ width: "5em", height: "1.5em", padding: "0em", lineHeight: "1.5em" }}>
              <a style={{ textDecoration: "none" }} href="http://localhost:8080/article/4/0">了解我</a></Button>{' '}</CardText>
            <CardText>职业：{this.state.cardInfo.career}</CardText>
            <CardText>现居：{this.state.cardInfo.living}</CardText>
            <CardText>Email: {this.state.cardInfo.email}</CardText>
            <div className="mb-2">
              <a className="qq-ic1" id="qq" onMouseOver={this.onEnter} onMouseOut={this.onLeave} style={{ backgroundColor: this.state.QQbgColor }}>
                <i className="fa fa-qq qq" id="qq-o" style={{ color: this.state.QQcolor, display: "inline-block" }}>
                </i>
                <i style={{ display: 'block', position: 'absolute', bottom: '5em', left: '1.5em' }}>
                  <img src={this.state.cardInfo.qq_img} style={{ display: this.state.QQstate, width: '150px', height: '150px' }}></img>
                </i>
              </a>
              <a className="wc-ic1" id="weixin" onMouseOver={this.onEnter} onMouseOut={this.onLeave} style={{ backgroundColor: this.state.WXbgColor }}>
                <i className="fa fa-weixin weixin" id="wc-o" aria-hidden="true" style={{ color: this.state.WXcolor }}>
                </i>
                <i style={{ display: 'block', position: 'absolute', bottom: '5em', left: '5em' }}>
                  <img src={this.state.cardInfo.wx_img} style={{ display: this.state.WXstate, width: '150px', height: '150px' }}></img>
                </i>
              </a>
              <a className="git-ic1" target="_blank" href={this.state.cardInfo.git_href} id="UncontrolledTooltip-GitHub" onMouseOver={this.onEnter} onMouseOut={this.onLeave} style={{ backgroundColor: this.state.GITbgColor }}>
                <i className="fa fa-github github" style={{ color: this.state.GITcolor }}>
                </i>
              </a>
              <UncontrolledTooltip placement="top" target="UncontrolledTooltip-GitHub">
                我的GitHub
              </UncontrolledTooltip>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
};

export default BusinessCard;