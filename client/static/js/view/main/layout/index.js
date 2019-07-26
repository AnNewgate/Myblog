var React = require('react');
var ReactDOM = require('react-dom');
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
      <div id="pageContent"></div>
      <div id="footer">
        <Footer></Footer>
      </div>
      </div>
    )
  };
}

ReactDOM.render(
    <Layout />,
    document.getElementById('page')
  );