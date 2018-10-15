import "./style.css";
import * as React from "react";
import { Table, Button, Icon, Modal, Input } from "antd";
import EditableTableBigType from "../editable-table-bigtype";
import SampleProductionModule from "../../model/SampleProductionModule";
import HttpClient from "../../services/HttpClient";

interface IndexProps {
  bigTypes: any,
  updateBigTypeMappingTable: any,
  tableChange: any
}

class ProductBigTypeTable extends React.Component<IndexProps, {}> {

  state = {
    visible: false,     // (新增按钮)弹窗可见性
    newBigTypeCode: '', // 新增的大类要素代码
    newBigTypeName: '', // 新增的大类名称
  }

  columns = [{
    title: '序号',
    dataIndex: 'key',
  }, {
    title: '要素代码',
    dataIndex: 'code',
  }, {
    title: '要素名称',
    dataIndex: 'name',
  }, {
    title: '操作',
    dataIndex: 'operate',
  }];

  // 弹窗显示
  showModal = () => {
    this.setState({
      visible: true,
      newBigTypeCode: '',
      newBigTypeName: ''
    });
  }

  // 弹窗表单提交
  handleOk = (e) => {
    if (!SampleProductionModule.getPeriod()) {
      alert('请先选择一个时期');
      this.setState({
        visible: false,
      });
    } else if (!this.state.newBigTypeCode || !this.state.newBigTypeName) {
      alert('请填写完整');
    } else {
      this.setState({
        visible: false,
      });
      HttpClient.createBigType(this.state.newBigTypeCode, this.state.newBigTypeName).then(res => {
        if (res === 'Success') {
          setTimeout(() => {
            alert('大类创建成功');
          }, 500);
        } else {
          setTimeout(() => {
            alert('大类创建失败，请重新操作。');
          }, 500);
        }
      }); 
    }
  }

  // 弹窗取消
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  // 要素代码改变
  onCodeChange = (e: any) => {
    this.setState({
      newBigTypeCode: e.target.value
    });
  }

  // 大类名称改变
  onNameChange = (e: any) => {
    this.setState({
      newBigTypeName: e.target.value
    });
  }
  
  render() {
    return (
      <div className='container-bigtype-table'>
        <h4>大类映射表</h4>
        
        <Button className='btn-right-small' style={{float: 'right'}} onClick={this.showModal}><Icon type='plus' />新增</Button>
        <Modal
          title="新增大类信息" 
          visible={this.state.visible}          
          okText='确定'
          cancelText='取消'          
          onOk={this.handleOk} 
          onCancel={this.handleCancel}
        >
          <p>
            <span className='star-red'>*</span>
            要素代码：
            <Input placeholder='请输入' value={this.state.newBigTypeCode} onChange={this.onCodeChange} style={{width: '70%'}} />
          </p>
          <p>
            <span className='star-red'>*</span>
            要素名称：
            <Input placeholder='请输入' value={this.state.newBigTypeName} onChange={this.onNameChange} style={{width: '70%'}} />
          </p>        
        </Modal>

        <EditableTableBigType 
          bigTypes={this.props.bigTypes} 
          updateBigTypeMappingTable={this.props.updateBigTypeMappingTable} 
          tableChange={this.props.tableChange} 
        />
      </div>
    );
  }
}

export default ProductBigTypeTable;