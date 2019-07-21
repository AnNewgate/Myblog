var React = require('react');
var ReactDOM = require('react-dom');
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/common.css';
//var store = require('../../store/main');
// var Navbar = require('./MyNavBar');
 
// class MessageList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             messageList: []
//         };
//         this.getData();
//     }
 
//     render() {
//         var self = this;
//         var messages = self.state.messageList;
//         var arr = [];
 
//         messages
//         .forEach(function(em) {
//             arr.push(<li key={em}>{em}</li>);
//         });
//         return <section className="pageContentInner">
//             <div className="head-section"><h1>MessageList: </h1></div>
//             <ul>
//                 {arr}
//             </ul>
//         </section>;
//     }
 
//     getData() {
//         var self = this;
//         store.getAllData(function (data) {
//             var i = 0;
//             var len = data.length;
//             var messageListArr = [];
//             for(; i<len; i++) {
//                 messageListArr[i] = data[i].Message;
//             }
//             self.setState({messageList: messageListArr});
//             console.log(self.state.messageList);
//         })
//     }
// }
//var React = require('react');
var { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } =  require('reactstrap');
import Home from '../home/Home';

class MyNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="#272826" dark className="navbar">
          <NavbarBrand href="/" className="mr-auto">DuveChen个人博客</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/home/">首页</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/moodEssay/">心情随笔</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/techSharing/">技术分享</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/timeLine/">时间轴</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/hobbySharing/">爱好分享</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Home></Home>
      </div>
    );
  }
}

ReactDOM.render(
    <MyNavBar />,
    document.getElementById('root')
  );