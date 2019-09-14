var React = require('react');
import { Timeline, Collapse } from 'antd';
const { Panel } = Collapse;
import store from '../../../store/common/TimeLine';

const MyCollapse = ({years,yslist,onChange}) => {
    return(
        <Collapse defaultActiveKey={[years[0]]} onChange={onChange}>
            {
                years.map((item) => {
                    return(
                        <Panel showArrow={false} header={item} key={item+""}>
                            <Timeline>
                                {
                                    yslist[item+""].map((timeitem) => {
                                        return (
                                            <Timeline.Item color={timeitem.status} key={timeitem.blogid}>
                                                <a href={timeitem.href} className="timeLine-item">{timeitem.title}</a>
                                            </Timeline.Item>
                                        );
                                    }
                                    )
                                }
                            </Timeline>
                        </Panel>
                    )
                })
            }
        </Collapse>
    )
}

class MyTimeLine extends React.Component{
    constructor(props) {
        super(props);
        this.state = { years:[], ysList: {}};
        this.getData();
        //this.reloadData();
        this.collapseChange = this.collapseChange.bind(this);
    }

    collapseChange(e){
        //console.log("板块已经切换了！");
    }

    // reloadData = () => {
    //     //console.log("开始查询");
    //     const promise = store.getAllItem();
    //     promise.then(data => {
    //         let years = [];
    //         let list = {};
    //         //console.log(data);
    //         if (!data) return;
    //         //console.log("结果映射");
    //         years = data.years;
    //         for(let i = 0; i < years.length; i++){
    //             list[years[i]+""]=data[years[i]+""];
    //         }
    //         //console.log("更新状态");
    //         this.setState({
    //             years: years,
    //             ysList: list
    //         });
    //         //console.log("状态更新成功");
    //     }).catch((error) => {
    //         console.log("DataGetError" + error);
    //     });
    // }

    getData(){
        var self = this;
        store.getAllItem(function (data) {
            let years = [];
            let list = {};
            //console.log(data);
            if (!data) return;
            //console.log("结果映射");
            years = data.years;
            for(let i = 0; i < years.length; i++){
                list[years[i]+""]=data[years[i]+""];
            }
            self.setState({ 
                years: years,
                ysList: list 
            });
        })
    }

    render(){
        console.log("开始xuanr");
        return(
            <div>
                <style>
                    {
                        `.ant-collapse{
                            overflow: hidden;
                        }
                        .ant-collapse-item{
                            margin: 1em 1em;
                        }
                        .ant-collapse-header{
                            border: 1px solid;
                            border-radius: 3px;
                            width: 5em;
                            heigth: 3em;
                        }
                        .ant-collapse-content{
                            width: 58em;
                            position: relative;
                            left: 6em;
                            top: -3em;
                        }
                        .timeLine-item{
                            text-decoration: none;
                        }`
                    }
                </style>
                <MyCollapse years={this.state.years} yslist={this.state.ysList} onChange={this.collapseChange}></MyCollapse>
            </div>
        );
    }
} 

export default MyTimeLine;