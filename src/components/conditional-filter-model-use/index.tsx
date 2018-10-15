import './style.css';
import * as React from 'react';
import { Row, Col, Radio, Button, Upload, Icon, message } from 'antd';
import HttpClient from "../../services/HttpClient";

const RadioGroup = Radio.Group;


interface IndexProps {
  changeImages: any
}

class ConditionalFilterModelUse extends React.Component<IndexProps, {}> {

  state = {
    format: '',  // 样本格式（分辨率）
    filePath: '' // 上传文件路径
  };

  // 上传文件改变
  onUploadVideoChange = (info) => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({
        filePath: info.file.response.data
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // 影像文件类型改变
  onRadioChange = (e: any) => {
    this.setState({
      format: e.target.value,
    });
  };

  // 运行模型
  run = () => {
    this.props.changeImages(this.state.format, this.state.filePath);
  }

  // 重置表单
  resetForm = () => {
    this.setState({
      format: 0,
      videoFile: null
    });
  };

  render() {
    return (
      <Row className='container-recommend' style={{marginLeft: '24px', marginRight: '24px'}}>
        <Col span={10}>
          <div className='icon-1' /><span className='star-red'>*</span>上传影像文件：
          <Upload
            name={'file'}
            action='http://jiangsu.gagogroup.cn/api/beta/model-management/upload'
            onChange={this.onUploadVideoChange}
          >
            <Button size={'small'}>
              <Icon type="upload" /> 选择文件
            </Button>
            <span className='tip-upload'>（支持后缀名：.tif; 大小需小于2G）</span>
          </Upload>
        </Col>

        <Col span={11}>
          <div className='icon-1' /><span className='star-red'>*</span>影像文件类型：
          <RadioGroup onChange={this.onRadioChange} value={this.state.format}>
            <Radio value={'0.3'}>航片(0.3米)</Radio>
            <Radio value={'0.5'}>航片(0.5米)</Radio>
            <Radio value={'1'}>卫片(1米)</Radio>
          </RadioGroup>
        </Col>

        <Col span={3}>
          <Button size={'small'} type={'primary'} onClick={this.run} className='btn-use'>运行</Button>
          <Button size={'small'} onClick={this.resetForm}>重置</Button>
        </Col>
      </Row>
    );
  }
}

export default ConditionalFilterModelUse;