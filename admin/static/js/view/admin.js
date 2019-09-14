import React from 'react';
import {
    HashRouter,
    Route
} from 'react-router-dom';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import Login from './component/loginForm';
import Index from './Index/index';

class Main extends React.Component{
    constructor(props){
        super(props);
    }

    
    render(){
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/index" component={Index} />
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById("admin")
)