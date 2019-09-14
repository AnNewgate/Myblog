import React from 'react';
import { Collapse } from 'antd';
import BusinessCardEdit from '../component/BusinessCardEdit';
import CarouselEdit from '../component/CarouselEdit';
import LinkInfoEdit from '../component/LinkInfoEdit';
const { Panel } = Collapse;

const text = `
  这个版块由于内容还没有很好的确定下来，暂时先不实现
`;

class WebInfo extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Collapse defaultActiveKey={['1']} accordion>
                <Panel header="名片编辑" key="1">
                    <BusinessCardEdit />
                </Panel>
                <Panel header="首页走马灯编辑" key="2">
                    <CarouselEdit />
                </Panel>
                <Panel header="友情链接编辑" key="3">
                    <LinkInfoEdit />
                </Panel>
                <Panel header="站点信息编辑" key="4">
                    <p>{text} 可看SiteInfoEdit组件</p>
                </Panel>
            </Collapse>
        );
    }
}

export default WebInfo;