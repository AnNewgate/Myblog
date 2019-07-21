import React from 'react';
import '../../../css/home.css';
//import Slide from '../slide/Slide';
import MyCarousel from '../slide/MyCarousel';
class Home extends React.Component{
    render(){
        return(
            <div className="content-div">
                <div className="content">
                    <div className="left">
                    {/* {<Slide nums={6} timer={2000} idNames={{main:"tabs",btns:"btns",imgs:"imgs",active:"btn-active"}} 
                     imgType={{type:"webp",url:"/client/static/image/images/",name:"banner"}} /> } */}
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

export default Home;