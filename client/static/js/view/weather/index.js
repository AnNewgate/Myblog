import React from 'react';
var ReactDOM = require('react-dom');
var logo  = require('../../../../../images/blog/weatherImg/default.jpg');
import '../../../css/weather.css';
import store from '../../store/main/weather';

const WeatherDiv = (props) => {
    let info = props.info;
    //console.log(info);
    if(info.code == 0){
        return (
            <div className="weather_info">
                <h6>今天的天气：</h6>
                <span>天气情况：<img className="weather_img" alt={info.now.text} src={`/images/blog/weather/${info.now.code}@1x.png`}></img></span><br></br>
                <span> 温度：{info.now.temperature}摄氏度</span><br></br>
                <span>风向：{info.now.wind_direction == undefined ? "无" : info.now.wind_direction}</span>
            </div>
        );
    }
    else{
        return(
            <div className="weather_info">
                <p>出了点问题，暂时查不到天气信息啦！</p>
            </div>
        );
    }
}
class Weather extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            weatherImg : logo,
            weather_info : {
                "code" : 1
            }
        };
        this.getWeatherInfo();
    }

    getWeatherInfo(){
        var self = this;
        store.getWeatherInfo(function(data){
            if(data.weather_img != "" && data.weather_img != undefined){
                self.setState({
                    weather_info: data,
                    weatherImg: data.weather_img
                });
            }else{
                self.setState({
                    weather_info: data
                });
            }
        });
    }

    componentDidMount(){
        var self=this;
        setInterval(function(){
       self.getWeatherInfo();
       //console.log("重新获取天气");
      },60000);
    }

    render(){
        return(
            <div>
                <div className="weather_img">
                <img src={this.state.weatherImg} alt="logo" />
                </div>
                <WeatherDiv info={this.state.weather_info}></WeatherDiv>
            </div>
        );
    }
}

ReactDOM.render(
    <Weather />,
    document.getElementById('weather')
  );