import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { UncontrolledTooltip} from 'reactstrap';
import 'mdbreact/dist/css/mdb.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

const Footer = () => {
  return (
    <MDBFooter color="cyan" className="font-small darken-3 pt-0">
      <MDBContainer>
        <MDBRow>
           <MDBCol md="12" className="py-3">
            <div className="mb-5 flex-center">
              <p>网站说明：网站目前正在测试中，网站内容部分取自网上，如有侵权之处，根据下方联系方式联系网站管理员进行删除，如果给您带来了不便，还请谅解！</p>
            </div>
          </MDBCol>
          <MDBCol md="12" className="py-1">
            <div className="mb-5 flex-center">
            <a className="mail-ic">
                <i className="fa fa-envelope-o fa-lg white-text mr-md-5 mr-3 fa-2x" id="UncontrolledTooltip-FooterEmail">
                </i>
              </a>
              <UncontrolledTooltip placement="left" target="UncontrolledTooltip-FooterEmail">
                  我的Email邮箱是：duvechen@163.com
              </UncontrolledTooltip>
              <a className="qq-ic">
                <i className="fa fa-qq fa-lg white-text mr-md-5 mr-3 fa-2x" id="UncontrolledTooltip-FooterQQ">
                </i>
              </a>
              <UncontrolledTooltip placement="bottom" target="UncontrolledTooltip-FooterQQ">
                  我的QQ账号是：1635357925
              </UncontrolledTooltip>
              <a className="wc-ic">
                <i className="fa fa-weixin white-text mr-md-5 mr-3 fa-2x" aria-hidden="true" id="UncontrolledTooltip-FooterWechat">
                </i>
              </a>
              <UncontrolledTooltip placement="top" target="UncontrolledTooltip-FooterWechat">
                  我的微信账号名是：TPKCjie
              </UncontrolledTooltip>
              <a className="git-ic">
                <i className="fa fa-github fa-lg white-text mr-md-5 mr-3 fa-2x" id="UncontrolledTooltip-FooterGitHub">
                </i>
              </a>
              <UncontrolledTooltip placement="right" target="UncontrolledTooltip-FooterGitHub">
                  我的GitHub账号名是：AnNewgate
              </UncontrolledTooltip>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-2">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="http://localhost:8080/"> Myblog.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;