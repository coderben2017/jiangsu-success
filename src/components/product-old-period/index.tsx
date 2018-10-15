import './style.css';
import * as React from "react";
import { Link } from 'react-router-dom';
import { Layout, Upload, Button, Icon, Radio, Cascader, Input } from "antd";
import HttpClient from "../../services/HttpClient";

const { Sider, Content } = Layout;
const RadioGroup = Radio.Group;


class ProductOldPeriod extends React.Component {

  state = {
    folderPath: [],     // 新建文件夹路径
    folderName: '',     // 新建文件夹名称

    vectorFilePath: '', // 矢量文件
    videoFilePath: '',  // 影像文件
    sampleFormat: '',   // 切割样本格式
    samplePath: '',     // 存储路径

    imgPathOptions: [], // 矢量文件和影像文件目录结构 
    pathOptions: []     // 存储路径下拉框数据
  }

  // 请求存储路径下拉框数据
  componentWillMount() {
    HttpClient.getSampleDir().then(res => {
      this.setState({
        pathOptions: res
      });
    });
    HttpClient.getSampleDirForOldPeriod().then(res => {
      this.setState({
        imgPathOptions: res
      });
    });
  }

  // 新增文件夹存储路径改变
  onFolderPathChange = (value: string[]) => {
    this.setState({
      folderPath: value
    });
  }

  // 新增文件夹名称改变
  onFolderNameChange = (e: any) => {
    this.setState({
      folderName: e.target.value
    });
  }

  // 提交表单，新增文件夹
  saveFolder = () => {
    HttpClient.createOldPeriodFolder(this.state.folderPath.join('/'), this.state.folderName).then(res => {
      if (res === 'Success') {
        alert('新建文件夹成功！');
      } else {
        alert('新建文件夹失败，请重试。');
      }
    });
  }

  // 上传的矢量文件改变
  onUploadVectorChange = (info: any) => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
      console.log(info.fileList.response);
      this.setState({
        vectorFilePath: info.fileList.reponse.data[0]
      });
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  };

  // 上传的影像文件改变
  onUploadVideoChange = (info: any) => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
      this.setState({
        videoFilePath: info.file.response.data
      });
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }

  // 矢量文件路径改变
  onVectorFileChange = (value: string[]) => {
    this.setState({
      vectorFilePath: value.join('/')
    });
  }

  // 影像文件路径改变
  onVideoFileChange = (value: string[]) => {
    this.setState({
      videoFilePath: value.join('/')
    });
  }

  // 切割样本格式改变
  onFormatChange = (e: any) => {
    this.setState({
      sampleFormat: e.target.value
    });
  }

  // 新增样本存储路径改变
  onSamplePathChange = (value: string[]) => {
    this.setState({
      samplePath: value.join('/')
    });
  }

  // 提交表单，新增样本
  saveSample = () => {
    console.log('save sample: ', this.state.sampleFormat, this.state.samplePath);
    HttpClient.createSample(this.state.vectorFilePath, this.state.videoFilePath, this.state.sampleFormat, this.state.samplePath);
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
          <div className='container-create-sample'>
            <span className='star-red'>*</span>&emsp;
            选择存储路径：&emsp;
            <Cascader
              placeholder='请选择'
              options={this.state.pathOptions}
              onChange={this.onFolderPathChange}
              changeOnSelect
            />
            <br /><br />

            <span className='star-red'>*</span>&emsp;&emsp;&emsp;
            文件夹名：&emsp;
            <Input 
              placeholder='请输入'
              style={{width: '175px'}}
              onChange={this.onFolderNameChange}
            /><br />
            <small style={{marginLeft: '143px'}}>备注：文件夹名不能含有空格及其他特殊字符</small>
            <br /><br />

            <Button className='btn-save' onClick={this.saveFolder}>保存</Button>
          </div>

          <h3>新增样本</h3>
          <div className='container-create-sample'>
            <span className='star-red'>*</span>&emsp;
              选择矢量文件：&emsp;
              <Cascader
                placeholder='请选择'
                options={this.state.imgPathOptions}
                onChange={this.onVectorFileChange}
              />
              <br /><br />

              <span className='star-red'>*</span>&emsp;
              选择影像文件：&emsp;
              <Cascader
                placeholder='请选择'
                options={this.state.imgPathOptions}
                onChange={this.onVideoFileChange}
              />
            {/* <span className='star-red'>*</span>&emsp;
            上传矢量文件：&emsp;
            <Upload
              multiple            
              name='file'
              action='http://jiangsu.gagogroup.cn/api/beta/sample-library/uploadoldperiodsamplefile'
              onChange={this.onUploadVectorChange}
            >
              <Button><Icon type='upload' /> 选择文件 </Button>
            </Upload>
            <small>支持扩展名: .shp</small>
            <br /><br />

            <span className='star-red'>*</span>&emsp;
            上传影像文件：&emsp;
            <Upload
              name='file'
              action='http://jiangsu.gagogroup.cn/api/beta/sample-library/uploadoldperiodsamplefile'
              onChange={this.onUploadVideoChange}
            >
              <Button><Icon type='upload' /> 选择文件 </Button>
            </Upload>
            <small>支持文件名: .tif，大小需小于2G</small> */}
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
              options={this.state.pathOptions}
              onChange={this.onSamplePathChange}
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

export default ProductOldPeriod;