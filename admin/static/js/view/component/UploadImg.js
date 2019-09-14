import { Upload, Icon, Modal } from 'antd';
import React from 'react';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

class BusinessImg extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: this.props.url != '' ? [
                {
                    uid: '1',
                    name: this.props.name,
                    status: 'done',
                    url: this.props.url,
                }
            ] : [],
            imgSrc: this.props.url
        };
    }

    componentWillReceiveProps(nextProps){
        var nextfileList = nextProps.url != '' ? [
            {
                uid: '1',
                name: nextProps.name,
                status: 'done',
                url: nextProps.url,
            }
        ] : [];

        var nextImgsrc = nextProps.url;
        this.setState({
            imgSrc: nextImgsrc,
            fileList: nextfileList
        });
    }

    _handleCancel = () => this.setState({ previewVisible: false });

    _handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    _handleChange = ({ fileList }) => {
        let src = '';
        if (fileList.length != 0) {
            let file = fileList[0];
            console.log(file);
            if(file.response != undefined){
                src = file.response.imgSrc;
                if(src != ""){
                    this.setState({ imgSrc: src });
                }
                src = '/' + src;
            }
        } 
        this.setState({ fileList: fileList });
        this.props.handelImg(src);
    };

    render() {
        const { previewVisible, previewImage, fileList, imgSrc } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="http://localhost:8080/action/uploadImg"
                    listType="picture-card"
                    fileList={fileList}
                    accept=".jpg,.png,.webp.jpeg,.gif,.bmp"
                    onPreview={this._handlePreview}
                    onChange={this._handleChange}
                    data={{ url: imgSrc }}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this._handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default BusinessImg;