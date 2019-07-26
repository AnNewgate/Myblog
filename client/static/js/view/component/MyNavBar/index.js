var React = require('react');
import 'bootstrap/dist/css/bootstrap.min.css';
var { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } =  require('reactstrap');

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
                <NavLink href="/index/">首页</NavLink>
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
      </div>
    );
  }
}

export default MyNavBar;