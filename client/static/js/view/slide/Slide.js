import React from 'react';
import '../../../css/slide.css';
class Slide extends React.Component{
    constructor(props){
        super(props);
        this.state={
            iNow : 0,
            bCheck:true
        };
        console.log(props);
        console.log(this.props.timer);
       // this.showslide = this.showslide.bind(this);
       this.getInitialState = this.getInitialState.bind(this);
       this.setInow = this.setInow.bind(this);
       this.checkSwitch = this.checkSwitch.bind(this);
    }
    // showslide(){
    //     console.log("this is"+this);
    // }
    getInitialState(){
        return {
            iNow: this.state.iNow,
            bCheck: this.state.bCheck
        };
    }
    setInow(index){//核心状态计算工具：依赖定时器进行实时刷新
        if(index!==undefined){//如果参数有内容。
            this.setState({
                iNow:index
            });
        }else{
            var _this=this;
            console.log(this.props.timer);
            this.timer=setInterval(function(){
                if(_this.state.bCheck){
                    //console.log(_this.state.bCheck)
                    _this.setState(function(prev){
                        if(prev.iNow == this.props.nums-1){
                            return {
                                iNow:0
                            };
                        }else{
                            return {
                                iNow:prev.iNow+1
                            };
                        }
                    });
                }else{
                    //console.log('该停了!')
                    return false;
                }
            },this.props.timer);
        }
    }
    checkSwitch(){
        //console.log(this.state.bCheck)
        this.setState(function(prev){
            return {
                bCheck:!prev.bCheck
            };
        });
    }
    render(){
        return (
            <div id={this.props.idNames.main}
              onMouseOver={this.checkSwitch}
              onMouseOut={this.checkSwitch}>

                <Btns iNow={this.state.iNow}
                  setInow={this.setInow}
                  nums={this.props.nums}
                  idNames={this.props.idNames} />

                <Imgs iNow={this.state.iNow}
                nums={this.props.nums}
                idNames={this.props.idNames}
                imgType={this.props.imgType} />

            </div>
        );
    }
}

class Btns extends React.Component{
    constructor(props){
        super(props);
        this.state={
            iNow : this.props.iNow,
        };
       // this.showslide = this.showslide.bind(this);
       this.getIndex = this.getIndex.bind(this);
       this.changeInow = this.changeInow.bind(this);
    }
    componentDidMount(){
        this.props.setInow();//插入后就执行回调方法
    }
    getIndex(e){//获取a的父级索引值
        var list=e.target.parentNode.parentNode.childNodes;
        for(var i=0;i<list.length;i++){
            if(list[i]===e.target.parentNode){
                return i;
            }
        }
    }
    changeInow(e){//回调方法
        //console.log($(e.target).parent().index());
        //console.log(this.getIndex(e));
        var index=this.getIndex(e);
        this.props.setInow(index)
    }
    render(){
        var arr=[];
            for(var i=0;i<this.props.nums;i++){
                var btnsContent=null;
                if(i==this.props.iNow){
                    btnsContent=
                        <li key={i.toString()}>
                            <a onMouseOver={this.changeInow} id={this.props.idNames.active} href="javascript:;"></a>
                        </li>
                }else{
                    btnsContent=
                        <li key={i.toString()}>
                            <a  onMouseOver={this.changeInow} href="javascript:;"></a>
                        </li>
                }
                arr.push(btnsContent);
            }
            return (
                <ul id={this.props.idNames.btns}>{arr}</ul>
            );
    }
}

class Imgs extends React.Component{
    componentDidMount(){//刚开始加载时，就执行动画函数
        //var iNow=this.props.iNow;
        //var obj=document.getElementById(this.props.idNames.imgs).getElementsByTagName('li')[iNow].childNodes[0];
        //startMove(obj,{'opacity':100});
    }

    componentWillReceiveProps(nextProps){
        //var obj=document.getElementById(this.props.idNames.imgs).getElementsByTagName('li')[nextProps.iNow].childNodes[0];
        //console.log(obj)
        //startMove(obj,{'opacity':100});
    }

    render(){
        var arr=[];
            for(var i=0;i<this.props.nums;i++){
                var imgsContent=null;
                var src=this.props.imgType.url+this.props.imgType.name+(i+1)+'.'+this.props.imgType.type;
                if(i==this.props.iNow){
                    imgsContent=
                        <li key={i.toString()}>
                            <img style={{display:'block'}} src={src} alt=""/>
                        </li>
                    arr.push(imgsContent);
                }else{
                    imgsContent=
                        <li key={i.toString()}>
                            <img style={{display:'none'}} src={src} alt=""/>
                        </li>
                    arr.push(imgsContent);
                }
            }

            return (
                <ul id={this.props.idNames.imgs}>{arr}</ul>
            );
    }
}

export default Slide;