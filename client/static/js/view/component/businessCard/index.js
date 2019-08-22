import React from 'react';
import { Card, CardHeader, CardBody, CardText, UncontrolledTooltip, Button } from 'reactstrap';
import classNames from 'classnames';
var store = require('../../../store/common/BusinessCardInfo');
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

class BusinessCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qqHover: false,
      wxHover: false,
      gitHover: false,
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
      this.setState({ qqHover : true });
    } else if (id == 'weixin' || id == "wc-o") {
      this.setState({ wxHover : true });
    } else {
      this.setState({ gitHover : true });
    }
  }

  onLeave(event) {
    event = event.nativeEvent;
    const tr = event.target;
    let id = tr.id;
    if (id == 'qq' || id == "qq-o") {
      this.setState({ qqHover : false });
    } else if (id == 'weixin' || id == "wc-o") {
      this.setState({ wxHover : false });
    } else {
      this.setState({ gitHover : false });
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
    const iconQQ = classNames({
      'icon-qq': !this.state.qqHover,
      'icon-qq-over': this.state.qqHover
    });
    const iconWX = classNames({
      'icon-wx': !this.state.wxHover,
      'icon-wx-over': this.state.wxHover
    });
    const iconGIT = classNames({
      'icon-git': !this.state.gitHover,
      'icon-git-over': this.state.gitHover
    });
    return (
      <div>
        <style>
          {
            `.icon-qq,.icon-wx,.icon-git{
                width : 2.2em;
                height : 2.2em;
                display : inline-block;
                overflow : hidden;
                border-radius : 1.1em;
                background-color : #eaebe6;
                line-height : 2.2em;
                text-align : center;
                margin: 0 0.5em;
             }
             .icon-qq .fa,.icon-wx .fa,.icon-git .fa{
                font-size : 1.3em;
                color : #a9dcfa;
             }
             .icon-wx .fa,.icon-git .fa{
                font-size : 1.3em;
                color : #a9dcfa;
             }
             .icon-qq img,.icon-wx img{
                display : none;
             }
             .icon-qq-over,.icon-wx-over,.icon-git-over{
                background-color : #a9dcfa;
                width : 2.2em;
                height : 2.2em;
                display : inline-block;
                overflow : hidden;
                border-radius : 1.1em;
                line-height : 2.2em;
                text-align : center;
                margin: 0 0.5em;
             }
             .icon-qq-over .fa, .icon-wx-over .fa, .icon-git-over .fa{
                font-size : 1.3em;
                color : #eaebe6;
             }
             .icon-qq-over img,.icon-wx-over img{
                display : block;
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
              <a className={iconQQ} id="qq" onMouseOver={this.onEnter} onMouseOut={this.onLeave}>
                <i className="fa fa-qq qq" id="qq-o" style={{ display: "inline-block" }}>
                </i>
                <i style={{ display: 'block', position: 'absolute', bottom: '5em', left: '1.5em' }}>
                  <img src={this.state.cardInfo.qq_img} style={{ width: '150px', height: '150px' }}></img>
                </i>
              </a>
              <a className={iconWX} id="weixin" onMouseOver={this.onEnter} onMouseOut={this.onLeave}>
                <i className="fa fa-weixin weixin" id="wc-o" style={{ display: "inline-block" }}>
                </i>
                <i style={{ display: 'block', position: 'absolute', bottom: '5em', left: '5em' }}>
                  <img src={this.state.cardInfo.wx_img} style={{ width: '150px', height: '150px' }}></img>
                </i>
              </a>
              <a className={iconGIT} target="_blank" href={this.state.cardInfo.git_href} id="UncontrolledTooltip-GitHub" onMouseOver={this.onEnter} onMouseOut={this.onLeave}>
                <i className="fa fa-github github">
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