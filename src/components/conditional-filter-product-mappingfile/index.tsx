import "./style.css";
import * as React from "react";
import { Row, Col, Select, Button, Input } from "antd";
import SampleProductionModule from "../../model/SampleProductionModule";

const Option = Select.Option;


interface IndexProps {
  searchTypes: any,
  periods: any
}

class ConditionalFilterMappingFile extends React.Component<IndexProps, {}> {

  state = {
    period: '',       // 时期名称
    code: '',         // 要素代码
  }

  // 导入时期下拉框数据
  loadPeriods = () => {
    const data = this.props.periods;
    let periods = [];
    for (let i = 0; i < data.length; ++i) {
      periods.push(
        <Option key={data[i]}>{data[i]}</Option>
      );
    }
    return periods;
  }

  // 时期改变
  onPeriodChange = (value: string) => {
    this.setState({
      period: value
    });
    SampleProductionModule.setPeriod(value);
  }

  // 要素代码改变
  onCodeChange = (e: any) => {
    this.setState({
      code: e.target.value
    });
    SampleProductionModule.setCode(e.target.value);
  }

  // 查询
  search = () => {
    if (!SampleProductionModule.getPeriod()) {
      alert('请选择一个时期');
      return;
    }
    this.props.searchTypes();
  }

  render() {
    return (
      <Row className='container-recommend' style={{ marginLeft: '24px', marginRight: '24px'}}>
        <Col span={6}>
          <div className='icon-1' /><span className='star-red'>*</span>选择时期：
           <Select
            placeholder="请选择"
            style={{ width: '140px' }}
            onChange={this.onPeriodChange}
          >
            {this.loadPeriods()}
          </Select>
        </Col>

        <Col span={5}>
          <div className='icon-1' />要素代码：
          <Input 
            type='text' 
            placeholder='请输入'
            style={{width: '100px'}}
            onChange={this.onCodeChange}
          />
        </Col>

        <Col span={3}>
          <Button type={'primary'} onClick={this.search} className='btn-mappingfile'>查询</Button>
        </Col>
      </Row>
    );
  }
}

export default ConditionalFilterMappingFile;