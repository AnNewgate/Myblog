import React from 'react';
var ReactDOM = require('react-dom');
import '../../../../css/index.css';
import MyCarousel from '../../component/MyCarousel';
class IndexContent extends React.Component{
    render(){
        return(
            <div className="content-div">
                <div className="content">
                    <div className="left">
                    <MyCarousel></MyCarousel>
                    </div>
                    <div className="right">
                    右边内容
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <IndexContent />,
    document.getElementById('pageContent')
);

