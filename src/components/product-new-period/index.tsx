import './style.css';
import * as React from "react";
import { Link } from 'react-router-dom';
import { Layout, Select, InputNumber, Button, Radio, Upload, Icon, Cascader, Input, Checkbox } from "antd";
import SampleProductionModule from "../../model/SampleProductionModule";
import HttpClient from "../../services/HttpClient";

const { Sider, Content } = Layout;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class ProductNewPeriod extends React.Component {

  state = {
    baseType: '基础测绘', // ‘基础测绘’or‘地理国情’
    period: '',          // 时期名称
    videoType1: false,   // 卫片是否被选中
    videoType2: false,   // 航片是否被选中
    ratio1: 0,           // 卫片分辨率
    ratio2: 0,           // 航片分辨率
    bigType: '',         // 大类

    vectorFile: [],      // 矢量文件路径
    videoFile: [],       // 影像文件路径
    format: '',          // 切割样本格式
    path: [],            // 存储路径

    periods: [],         // 时期下拉框数据
    bigTypes: [],        // 大类下拉框数据
    imagePath: [],       // 矢量文件和影像文件下拉框数据
    samplePath: []       // 存储路径下拉框数据
  }

  // 请求下拉框数据 —— 时期\矢量文件\影像文件\存储路径
  componentWillMount() {
    HttpClient.getAllPeriods().then(res => {
      let periods = [];
      res.forEach((item, index) => {
        periods.push(item.label);
      })
      this.setState({
        periods: periods
      });
    });
    HttpClient.getImageDir().then(res => {
      this.setState({
        imagePath: res
      })
    });
    HttpClient.getSampleDir().then(res => {
      this.setState({
        samplePath: res
      });
    });
  }

  // 渲染时期下拉框选项
  loadPeriods = () => {
    const data = this.state.periods;
    let periods = [];
    for (let i = 0; i < data.length; ++i) {
      periods.push(
        <Option key={data[i]}>{data[i]}</Option>
      );
    }
    return periods;
  }

  // 渲染大类下拉框选择
  loadTypes = () => {
    const data = this.state.bigTypes;
    let periods = [];
    for (let i = 0; i < data.length; ++i) {
      periods.push(
        <Option key={data[i]}>{data[i]}</Option>
      );
    }
    return periods;
  }

  // 选择‘基础测绘’
  selectBaseType1 = () => {
    this.setState({
      baseType: '基础测绘'
    });
  }

  // 选择'地理国情'
  selectBaseType2 = () => {
    this.setState({
      baseType: '地理国情'
    });
  }

  // 时期改变
  onPeriodChange = (value: string) => {
    this.setState({
      period: value
    });
    SampleProductionModule.setPeriod(value); // 更新model里的period
    HttpClient.getBigTypes().then(res => {   // 更新大类下拉框数据
      let arr = [];
      res.forEach((item, index) => {
        arr.push(item.label);
      })
      this.setState({
        bigTypes: arr
      });
    });
  }

  // 卫片是否被选择
  onVideoTypeChange1 = (e: any) => {
    this.setState({
      videoType1: e.target.checked
    });
  } 

  // 航片是否被选择
  onVideoTypeChange2 = (e: any) => {
    this.setState({
      videoType2: e.target.checked
    });
  } 

  // 卫片分辨率改变
  onRatioChange1 = (value: number) => {
    this.setState({
      ratio1: value
    });
  }

  // 航片分辨率改变
  onRatioChange2 = (value: number) => {
    this.setState({
      ratio2: value
    });
  }

  // 大类改变
  onBigTypesChange = (value: string[]) => {
    let str = '';
    value.forEach((item, index) => {
      str += item + ',';
    })
    str = str.substr(0, str.length - 1);
    this.setState({
      bigType: str
    });
  }

  // 表单提交，新建文件夹
  saveFolder = () => {
    let ratio1 = this.state.ratio1 + '';
    let ratio2 = this.state.ratio2 + '';
    if (!this.state.videoType1)  ratio1 = ''
    if (!this.state.videoType2)  ratio2 = '';
    if (!((ratio1 && Number(ratio1)) || (ratio2 && Number(ratio2))) || !this.state.period || !this.state.bigType) {
      alert('请将新文件夹信息填写完整');
      return;
    } else {
      HttpClient.createFolder(this.state.baseType, this.state.period, ratio1, ratio2, this.state.bigType).then(res => {
        if (res === 'Success') {
          alert('新建文件夹成功！');
        } else {
          alert('新建文件夹失败，请重新操作。');
        }
      });
    }
  }

  // 矢量文件路径改变
  onVectorFileChange = (value: string[]) => {
    this.setState({
      vectorFile: value
    });
  }

  // 影像文件路径改变
  onVideoFileChange = (value: string[]) => {
    this.setState({
      videoFile: value
    });
  }

  // 切割样本格式改变
  onFormatChange = (e: any) => {
    this.setState({
      format: e.target.value
    });
  }

  // 存储路径改变
  onPathChange = (value: string[]) => {
    this.setState({
      path: value
    });
  }

  // 提交表单，新增样本
  saveSample = () => {
    console.log(this.state)
    if (this.state.vectorFile.length === 0 || this.state.videoFile.length === 0 || this.state.format === '' || this.state.path.length === 0) {
      alert('请将新样本信息选择完整');
    } else {
      const vectorFilePath = this.state.vectorFile.join('/');
      const imageFilePath = this.state.videoFile.join('/');
      const savePath = this.state.path.join('/');
      HttpClient.createSample(vectorFilePath, imageFilePath, this.state.format, savePath).then(res => {
        if (res === 'Success') {
          alert('新增样本成功！');
        } else {
          alert('新增样本失败，请重试。');
        }
      });
    }
  }

  render() {
    return (
      <Layout>
        <Sider className='sider'>
          <Link to='/product/mappingfile'>
            <p>映射文件管理</p>
          </Link>
          <Link to='/product/newperiod'>
            <p>新增新时期样本</p>
          </Link>
          <Link to='/product/oldperiod'>
            <p>新增旧时期样本</p>
          </Link>
        </Sider>

        <Content className='content'>
          <h3>新增文件夹</h3>
          <div className='container-create-folder'>
            <div className='div-basetype'>
              <p onClick={this.selectBaseType1}>
                基础测绘 
                <span className={this.state.baseType === '基础测绘' ? 'span-vertical-active' : 'span-vertical'} />
              </p>
              <p onClick={this.selectBaseType2}>
                地理国情 
                <span className={this.state.baseType === '地理国情' ? 'span-vertical-active' : 'span-vertical'} />
              </p>
            </div>
            <div className='div-form-folder'>
              <span className='star-red'>*</span>&emsp;
              选择时期：&emsp;
              <Select
                placeholder="请选择"
                style={{ width: '200px' }}
                onChange={this.onPeriodChange}
              >
                {this.loadPeriods()}
              </Select>
              <br /><br />

              <span className='star-red'>*</span>&emsp;
              影像类型：&emsp;
              <Checkbox onChange={this.onVideoTypeChange1}>卫片</Checkbox>
              <InputNumber
                className='input-ratio'
                style={{ width: '140px' }}
                min={0}
                max={1}
                step={0.1}
                onChange={this.onRatioChange1}
                placeholder='请输入'
              />（单位：米）
              <br /><br />
              <Checkbox onChange={this.onVideoTypeChange2} style={{marginLeft: '116px'}}>航片</Checkbox>
              <InputNumber
                className='input-ratio'
                style={{ width: '140px' }}
                min={0}
                max={1}
                step={0.1}
                onChange={this.onRatioChange2}
                placeholder='请输入'
              />（单位：米）
              <br /><br />

              <span className='star-red'>*</span>&emsp;
              选择大类：&emsp;
              <Select
                mode={'multiple'}
                style={{ width: '200px' }}
                placeholder="请先选择一个时期"
                onChange={this.onBigTypesChange}
              >
                {this.loadTypes()}
              </Select>
              <br /><br />

              <Button className='btn-save' onClick={this.saveFolder}>保存</Button>
            </div>
          </div>

          <h3>新增样本</h3>
          <div className='container-create-sample'>
            <span className='star-red'>*</span>&emsp;
            选择矢量文件：&emsp;
            <Cascader
              placeholder='请选择'
              options={this.state.imagePath}
              onChange={this.onVectorFileChange}
            />
            <br /><br />

            <span className='star-red'>*</span>&emsp;
            选择影像文件：&emsp;
            <Cascader
              placeholder='请选择'
              options={this.state.imagePath}
              onChange={this.onVideoFileChange}
            />
            <br /><br />

            <span className='star-red'>*</span>&emsp;
            切割样本格式：&emsp;
            <RadioGroup onChange={this.onFormatChange}>
              <Radio value={'单像素'}>单像素</Radio>
              <Radio value={'3x3像素'}>3x3像素</Radio>
              <Radio value={'5x5像素'}>5x5像素</Radio>
              <Radio value={'切片图形'}>切片图形</Radio>
            </RadioGroup>
            <br /><br />

            <span className='star-red'>*</span>&emsp;
            选择存储路径：&emsp;
            <Cascader 
              placeholder='请选择'
              options={this.state.samplePath} 
              onChange={this.onPathChange} 
              changeOnSelect
            />
            <br /><br />

            <Button className='btn-save' onClick={this.saveSample}>运行</Button>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default ProductNewPeriod;