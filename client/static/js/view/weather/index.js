import React from 'react';
var ReactDOM = require('react-dom');
var logo  = require('../../../../../images/logo.svg');
import '../../../css/weather.css';

class Weather extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                <div className="weather_img">
                <img src={logo} alt="logo" />
                </div>
                <div className="weather_info">
                <p>天气信息</p>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Weather />,
    document.getElementById('weather')
  );