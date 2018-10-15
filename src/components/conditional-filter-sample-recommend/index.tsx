import './style.css';
import * as React from 'react';
import { Row, Col, Radio, Checkbox, InputNumber, Select, Button } from 'antd';
import ModelManagementModule from "../../model/ModelManagementModule";
import HttpClient from "../../services/HttpClient";

const Option = Select.Option;
const RadioGroup = Radio.Group;

interface IndexProps {
  startRecommend: any
}

class ConditionalFilterSampleRecommend extends React.Component<IndexProps, {}> {

  state = {
    baseType: 0,        // 模型数据类型：基础测绘/地理国情
    pictureType: '',    // 模型影像类型：航片0.3米/航片0.5米/卫片1米
    distinguishType: '' // 模型识别类型：大类
  }

  // 模型数据类型改变
  onRadioChange = (e: any) => {
    this.setState({
      baseType: e.target.value
    });
    ModelManagementModule.setModelDataType(e.target.value);
  };

  // 模型影像类型改变
  onPictureTypeChange = (value: string) => {
    this.setState({
      pictureType: value
    });
    ModelManagementModule.setModelPictureType(value);
  };

  // 模型识别类型改变
  onDistinguishTypeChange = (value: string) => {
    this.setState({
      distinguishType: value
    });
    ModelManagementModule.setModelDistinguishType(value);
  };

  // 表单提交
  search = () => {
    this.props.startRecommend();
  };

  // 表单重置
  resetForm = () => {
    this.setState({
      baseType: 0,
      pictureType: '',
      distinguishType: ''
    });
  };

  render() {
    return (
      <Row className='container-recommend' style={{marginLeft: '24px', marginRight: '24px'}}>
        <Col span={8}>
          <div className='icon-1' /><span className='star-red'>*</span>模型数据类型：
          <RadioGroup onChange={this.onRadioChange} value={this.state.baseType}>
            <Radio value={1}>基础测绘</Radio>
            <Radio value={2}>地理国情</Radio>
          </RadioGroup>
        </Col>

        <Col span={6}>
          <div className='icon-1' /><span className='star-red'>*</span>模型影像类型：
          <Select
            placeholder="请选择"
            style={{width: '120px'}}
            onChange={this.onPictureTypeChange}
            value={this.state.pictureType}
          >
            <Option key={1}>航片(0.3米)</Option>
            <Option key={2}>航片(0.5米)</Option>
            <Option key={3}>卫片(1.0米)</Option>
          </Select>
        </Col>

        <Col span={6}>
          <div className='icon-1' /><span className='star-red'>*</span>模型识别类型：
          <Select
            placeholder="请选择"
            style={{width: '120px'}}
            onChange={this.onDistinguishTypeChange}
            value={this.state.distinguishType}
          >
            <Option key={'水体'}>水体</Option>
            <Option key={'居民地'}>居民地</Option>
            <Option key={'道路'}>道路</Option>
            <Option key={'植被'}>植被</Option>
          </Select>
        </Col>

        <Col span={4}>
          <Button type={'primary'} onClick={this.search} className='btn-recommend'>开始推荐</Button>
          <Button onClick={this.resetForm}>重置</Button>
        </Col>
      </Row>
    );
  }
}

export default ConditionalFilterSampleRecommend;