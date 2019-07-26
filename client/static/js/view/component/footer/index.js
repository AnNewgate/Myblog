import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import '../../../../font-awesome-4.7.0/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

const Footer = () => {
  return (
    <MDBFooter color="cyan" className="font-small darken-3 pt-0">
      <MDBContainer>
        <MDBRow>
           <MDBCol md="12" className="py-3">
            <div className="mb-5 flex-center">
              <p>网站说明：网站目前正在测试中，网站内容部分取自网上，如有侵权之处，根据下方联系方式联系网站管理员进行删除，对您造成的不便，请谅解！</p>
            </div>
          </MDBCol>
          <MDBCol md="12" className="py-1">
            <div className="mb-5 flex-center">
            <a className="fb-ic">
                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                </i>
              </a>
              <a className="qq-ic">
                <i className="fab fa-qq fa-lg white-text mr-md-5 mr-3 fa-2x" alt="QQ">
                </i>
              </a>
              <a className="wc-ic">
                <i className="far fa-comments white-text mr-md-5 mr-3 fa-2x" alt="微信">
                </i>
              </a>
              <a className="git-ic">
                <i className="fab fa-github fa-lg white-text mr-md-5 mr-3 fa-2x" alt="GitHUb">
                </i>
              </a>
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