import "./style.css";
import * as React from "react";
import { Table, Button, Icon, Modal, Input } from "antd";
import EditableTableSmallType from "../editable-table-smalltype";
import SampleProductionModule from "../../model/SampleProductionModule";
import HttpClient from "../../services/HttpClient";

interface IndexProps {
  smallTypes: any,
  updateSmallTypeMappingTable: any,
  tableChange: any
}

class ProductSmallTypeTable extends React.Component<IndexProps, {}> {

  state = {
    visible: false,       // 新增小类弹窗可见性
    newSmallTypeCode: '', // 新增小类的要素代码
    newSmallTypeName: ''  // 新增小类的名称
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
      newSmallTypeCode: '',
      newSmallTypeName: '',
      dataSource: [],
    });
  }

  // 提交表单，新增小类
  handleOk = (e: any) => {
    if (!SampleProductionModule.getPeriod()) {
      alert('请先选择一个时期');
      this.setState({
        visible: false,
      });
    } else if (!this.state.newSmallTypeCode || !this.state.newSmallTypeName) {
      alert('请填写完整');
    } else {
      this.setState({
        visible: false,
      });
      HttpClient.createSmallType(this.state.newSmallTypeCode, this.state.newSmallTypeName).then(res => {
        if (res === 'Success') {
          setTimeout(() => {
            alert('中小类创建成功');
          }, 500);
        } else {
          setTimeout(() => {
            alert('中小类创建失败，请重新操作。');
          }, 500);
        }
      });
    }
  }

  // 弹窗取消
  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  // 要素代码改变
  onCodeChange = (e: any) => {
    this.setState({
      newSmallTypeCode: e.target.value
    });
  }

  // 要素名称改变
  onNameChange = (e: any) => {
    this.setState({
      newSmallTypeName: e.target.value
    });
  }
  
  render() {
    return (
      <div className='container-smalltype-table'>
        <h4>中小类映射表</h4>
        
        <Button className='btn-right-small' style={{float: 'right'}} onClick={this.showModal}><Icon type='plus' />新增</Button>
        <Modal
          title="新增中小类信息"
          visible={this.state.visible}
          okText='确定'
          cancelText='取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>
            <span className='star-red'>*</span>
            要素代码：
            <Input 
              placeholder='请输入' 
              value={this.state.newSmallTypeCode}
              onChange={this.onCodeChange}
              style={{ width: '70%' }}
            />
          </p>
          <p>
            <span className='star-red'>*</span>
            要素名称：
            <Input 
              placeholder='请输入' 
              value={this.state.newSmallTypeName}
              onChange={this.onNameChange}
              style={{ width: '70%' }}
            />
          </p>
        </Modal>

        <EditableTableSmallType 
          smallTypes={this.props.smallTypes} 
          updateSmallTypeMappingTable={this.props.updateSmallTypeMappingTable}  
          tableChange={this.props.tableChange}
        />
      </div>
    );
  }
}

export default ProductSmallTypeTable;