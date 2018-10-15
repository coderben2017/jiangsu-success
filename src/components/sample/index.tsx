import './style.css';
import * as React from 'react';
import { Layout } from "antd";
import ConditionalFilterManage from "../conditional-filter-sample-manage";
import SampleTable from "../sample-table/index";
import SampleSiderTree from "../sample-sider-tree";
import SampleLibraryModule from "../../model/SampleLibraryModule";
import HttpClient from "../../services/HttpClient";

const {Sider, Content} = Layout;


class Sample extends React.Component {

  state = {
    base_type: '',    // ’基础测绘‘or’地理国情‘
    period: '',       // 时期
    areaOptions: [],  // 选择区域下拉框数据
    typeOptions: [],  // 选择类别下拉框数据
    samples: []       // 查询到的样例列表
  }

  // 树形组件选择的值刷新
  updateTreeData = (base_type: string, period: string) => {
    this.setState({
      base_type: base_type,
      period: period
    });

    HttpClient.getTypeOptions().then(res => {
      this.setState({
        typeOptions: res
      }, () => {
        console.log(this.state.typeOptions);        
      });
    });
  }

  // 表单提交，获取样例列表
  getSamples = () => {
    HttpClient.getSamplesInSampleLibrary().then(res => {
      if (res.length > 0) {
        this.setState({
          samples: res
        });
      }
    });
  }

  render() {
    return (
      <Layout>
        <Sider className='sider'>
          <SampleSiderTree updateTreeData={this.updateTreeData} />
        </Sider>
        <Content>
          <ConditionalFilterManage areaOptions={this.state.areaOptions} typeOptions={this.state.typeOptions} getSamples={this.getSamples} />
          <SampleTable samples={this.state.samples} />
        </Content>
      </Layout>
    );
  }
}

export default Sample;
