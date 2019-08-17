import React from 'react';
var ReactDOM = require('react-dom');
import 'antd/dist/antd.css';
import TimeLine from '../../component/timeLine';

class IndexContent extends React.Component{
    render(){
        return(
            <div className="content-div">
                <div className="content">
                    <TimeLine></TimeLine>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <IndexContent />,
    document.getElementById('pageContent')
);

