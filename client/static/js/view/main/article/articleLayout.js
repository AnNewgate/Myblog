var React = require('react');
var ReactDOM = require('react-dom');
import { BackTop} from 'antd';
import 'antd/dist/antd.css';
import MyNavBar from '../../component/MyNavBar';
import Footer from '../../component/footer';

class LayFooter extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div>
        <Footer></Footer>
        <BackTop>
        <div className="ant-back-top-inner">UP</div>
      </BackTop>
      </div>
    )
  };
}

class Reprint extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div style={{backgroundColor: "#bfc2bb",marginTop: "1em",marginBottom: "1em",overflow: "hidden"}}>
        <p style={{margin: "1em"}}><strong>转载：</strong>
        感谢您对本个人博客网站平台的认可，以及对我们原创作品以及文章的青睐，非常欢迎各位朋友分享到博客网站或者朋友圈，但转载请说明文章出处“来源DuveChen个人博客”并附上文章链接！
        </p>
      </div>
    );
  }
}

ReactDOM.render(
    <MyNavBar />,
    document.getElementById('nav')
  );

ReactDOM.render(
    <LayFooter />,
    document.getElementById('footer')
  );

ReactDOM.render(
    <Reprint />,
    document.getElementById('Reprint')
);