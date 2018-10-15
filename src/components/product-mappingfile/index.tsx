import "./style.css";
import * as React from "react";
import { Link } from 'react-router-dom';
import { Layout, Button, Icon, Modal, Input, Select } from "antd";
import ConditionalFilterProductMappingFile from "../conditional-filter-product-mappingfile";
import ProductBigTypeTable from "../product-bigtype-table";
import ProductSmallTypeTable from "../product-smalltype-table";
import SampleProductionModule from "../../model/SampleProductionModule";
import HttpClient from "../../services/HttpClient";

const {Sider, Content} = Layout;
const Option = Select.Option;


class ProductMappingFile extends React.Component {

  state = {
    popupVisible: false, // (新增时期)弹窗可见性
    newPeriodName: '',   // 新增时期名称
    oldPeriodName: '',   // 复刻的旧时期名称
    bigTypes: [],        // 大类映射表数据
    smallTypes: [],      // 中小类映射表数据
    periods: []          // 时期下拉框选项
  }

  // 请求所有时期
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
  }

  // 时期下拉列表导入数据
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

  // 弹窗显示
  showModal = () => {
    this.setState({
      popupVisible: true,
      newPeriodName: '',
      oldPeriodValue: ''
    });
  }

  // 弹窗表单提交
  handleOk = () => {
    if (!this.state.newPeriodName || !this.state.oldPeriodName) {
      alert('请填写完整');
      return;
    }
    
    this.setState({
      popupVisible: false,
    }, () => {
      HttpClient.copyPeriod(this.state.newPeriodName, this.state.oldPeriodName).then(res => {
        if (res) {
          this.getBigTypes();
          setTimeout(() => alert('新增时期成功'), 500);
        } else {
          setTimeout(() => alert('新增时期失败，请重新操作。'), 500);
        }
      });
    });
  }

  // 弹窗取消
  handleCancel = () => {
    this.setState({
      popupVisible: false,
    });
  }

  // 新增时期名称改变
  onNewPeriodNameChange = (e: any) => {
    this.setState({
      newPeriodName: e.target.value
    });
  }

  // 复刻时期改变
  onSelectOldPeriodForCopy = (value: string) => {
    this.setState({
      oldPeriodName: value
    });
  }

  // 请求大类和中小类映射表数据
  searchTypes = () => {
    HttpClient.getSpecificTypes().then(res => {
      let bigTypes = res[0].slice();
      let smallTypes = res[1].slice();
	
      const code = SampleProductionModule.getCode();
      if (code) {
        bigTypes = res[0].filter(item => item.label === code);
        smallTypes = res[1].filter(item => item.label === code);
      }
      this.setState({ bigTypes, smallTypes });
    });
  }

  // 更新大类列表
  updateBigTypeMappingTable = (oldCode: string, code: string, name: string) => {
    HttpClient.updateBigType(oldCode, code, name).then(res => {
      this.getBigTypes();
    });
  }

  // 更新中小类列表
  updateSmallTypeMappingTable = (oldCode: string, code: string, name: string) => {
    HttpClient.updateSmallType(oldCode, code, name).then(res => {
      this.getSmallTypes();
    });
  }

  // 请求大类列表
  getBigTypes = () => {
    HttpClient.getSpecificBigTypes().then(res => {
      this.setState({
        bigTypes: res
      });
    });
  }

  // 请求中小类列表
  getSmallTypes = () => {
    HttpClient.getSpecificSmallTypes().then(res => {
      this.setState({
        smallTypes: res
      });
    });
  }

  render () {
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
          <h3>映射文件管理</h3>
          <Button 
            className='btn-right' 
            size='large' 
            style={{float: 'right', top: '14px', right: '24px'}} 
            onClick={this.showModal}
          >
            <Icon type="plus" />新增时期
          </Button>
          <Modal
            title="新增时期"
            visible={this.state.popupVisible}
            okText='确定'
            cancelText='取消'
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>
              <span className='star-red'>*</span>
              新时期名称：
              <Input 
                placeholder='请输入' 
                onChange={this.onNewPeriodNameChange} 
                style={{ width: '70%' }} 
                value={this.state.newPeriodName}                
              /><br />
              <small className='small-notes'>备注：文件夹名不能含有空格及其他特殊字符</small>
            </p>
            <div>
              <span className='star-red'>*</span>&nbsp;&nbsp;
              复刻时期：
              <Select
                placeholder='请选择'
                onChange={this.onSelectOldPeriodForCopy}
                style={{ width: '70%' }}
                value={this.state.oldPeriodName}
              >
                {this.loadPeriods()}
              </Select>
            </div>
          </Modal>

          <ConditionalFilterProductMappingFile
            periods={this.state.periods} 
            searchTypes={this.searchTypes} 
          />
          <ProductBigTypeTable
            bigTypes={this.state.bigTypes} 
            updateBigTypeMappingTable={this.updateBigTypeMappingTable} 
            tableChange={this.getBigTypes} 
          />
          <ProductSmallTypeTable
            smallTypes={this.state.smallTypes} 
            updateSmallTypeMappingTable={this.updateSmallTypeMappingTable} 
            tableChange={this.getSmallTypes}
          />
        </Content>
      </Layout>
    );
  }
}

export default ProductMappingFile;