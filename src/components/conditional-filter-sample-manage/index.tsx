import './style.css';
import * as React from 'react';
import { Row, Col, Cascader, Checkbox, Input, Select, Button, Radio } from 'antd';
import SampleLibraryModule from "../../model/SampleLibraryModule";
import HttpClient from "../../services/HttpClient";

const Option = Select.Option;
const RadioGroup = Radio.Group;

interface IndexProps {
  getSamples: any,
  areaOptions: any,
  typeOptions: any
}

class ConditionalFilterManage extends React.Component<IndexProps, {}> {

  state = {
    area: [],       // 区域：市、区、县
    type: [],       // 类别
    videoType: 0,   // 影像类型：航片，卫片
    ratio: '',      // 空间分辨率
    format1: false, // 单像素
    format2: false, // 多像素
    format3: false, // 切片图形
  }

  // 用于动态加载级联选择框数据
  loadOptionsData = (selectedOptions) => {
    console.log(selectedOptions[selectedOptions.length - 1]);
  };

  // 区域改变
  onAreaChange = (value: string[]) => {
    this.setState({
      area: value
    });
    SampleLibraryModule.setType(value);
  };

  // 类别改变
  onTypeChange = (value: string[]) => {
    this.setState({
      type: value
    });
    SampleLibraryModule.setType(value);
  };

  // 影像类型改变
  onVideoTypeChange = (e: any) => {
    this.setState({
      videoType: e.target.value
    });
    SampleLibraryModule.setVideoType(e.target.value);
  }

  // 空间分辨率改变
  onRatioChange = (value: any) => {
    this.setState({
      ratio: value
    });
    SampleLibraryModule.setRadio(value);
  };

  // 复选框1（单像素）被选中或取消
  onCheckbox1Change = (e: any) => {
    this.setState({
      format1: e.target.checked
    });
    SampleLibraryModule.setFormat1(e.target.checked);
  };
  
  // 复选框2（多像素）被选中或取消
  onCheckbox2Change = (e: any) => {
    this.setState({
      format2: e.target.checked
    });
    SampleLibraryModule.setFormat2(e.target.checked);
  };

  // 复选框3（切片图形）被选中或取消
  onCheckbox3Change = (e: any) => {
    this.setState({
      format3: e.target.checked
    });
    SampleLibraryModule.setFormat3(e.target.checked);
  };

  // 提交表单
  search = () => {
    this.props.getSamples();
  };

  // 重置表单
  resetForm = () => {
    this.setState({
      area: [],
      type: [],
      videoType: 0,
      ratio: '',
      format1: false,
      format2: false,
      format3: false,
    });
  };

  render() {
    return (
      <Row className='container' style={{marginLeft: '24px', marginRight: '24px'}}>
        <Col span={4}>
          <div className='icon-1' />选择区域：
          <Cascader
            options={this.props.areaOptions}
            loadData={this.loadOptionsData}
            onChange={this.onAreaChange}
            changeOnSelect
            placeholder="请选择"
            style={{ width: '100px' }}
            value={this.state.area}
          />
        </Col>

        <Col span={4}>
          <div className='icon-1' />选择类别：
          <Cascader
            options={this.props.typeOptions}
            loadData={this.loadOptionsData}
            onChange={this.onTypeChange}
            changeOnSelect
            placeholder="请选择"
            style={{width: '110px'}}
            value={this.state.type}
          />
        </Col>

        <Col span={5}>
          <div className='icon-1' />影像类型：
          <RadioGroup 
            onChange={this.onVideoTypeChange} 
            value={this.state.videoType}
          >
            <Radio value={1}>卫片</Radio>
            <Radio value={2}>航片</Radio>
          </RadioGroup>
        </Col>

        <Col span={4}>
          <div className='icon-1' />空间分辨率：
          <Select
            style={{ width: '80px' }}
            onChange={this.onRatioChange}
            value={this.state.ratio}
          >
            <Option key={1}>0.3米</Option>
            <Option key={2}>0.5米</Option>
            <Option key={3}>1米</Option>
          </Select>
        </Col>

        <Col span={7}>
          <div className='icon-1' />样例格式：
          <Checkbox onChange={this.onCheckbox1Change} checked={this.state.format1}>单像素</Checkbox>
          <Checkbox onChange={this.onCheckbox2Change} checked={this.state.format2}>多像素</Checkbox>
          <Checkbox onChange={this.onCheckbox3Change} checked={this.state.format3}>切片图形</Checkbox>
        </Col>

        <Col span={3} offset={21}>
          <Button 
            type={'primary'} 
            onClick={this.search} 
            style={{ width: '68px', height: '28px', marginRight: '10px', borderRadius: '4px', backgroundColor: '#20b2c1'}}
          >
            查询
          </Button>
          <Button 
            onClick={this.resetForm}
            style={{ width: '68px', height: '28px', borderRadius: '4px'}}
          >
            重置
          </Button>
        </Col>
      </Row>
    );
  }
}

export default ConditionalFilterManage;