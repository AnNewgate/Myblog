var React = require('react');
var ReactDOM = require('react-dom');
import { BackTop } from 'antd';
import MyNavBar from '../../component/MyNavBar';
import Footer from '../../component/footer';

class Layout extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div>
      <div id="nav">
        <MyNavBar></MyNavBar>
      </div>
      <div id="pageContent">
      </div>
      <div id="footer">
        <Footer></Footer>
        <BackTop>
        <div className="ant-back-top-inner">UP</div>
      </BackTop>
      </div>
      </div>
    )
  };
}

ReactDOM.render(
    <Layout />,
    document.getElementById('page')
  );