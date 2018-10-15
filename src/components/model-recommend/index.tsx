import './style.css';
import * as React from 'react';
import { Link } from "react-router-dom";
import { Layout, Icon } from "antd";
import ConditionalFilterRecommend from "../conditional-filter-sample-recommend";
import ModelRecommendTable from "../model-recommend-table";
import HttpClient from "../../services/HttpClient";

const {Sider, Content} = Layout;


class ModelRecommend extends React.Component{

  state = {
    recommendResults: [], // 推荐结果数据
  }

  // 表单提交
  startRecommend = () => {
    HttpClient.getRecommendResults()
      .then(result => {
        this.setState({recommendResults: result});
      });
  }
  
  render() {
    return (
      <Layout>
        <Sider className='sider'>
          <Link to='/model/recommend'>
            <p><Icon type="dot-chart" className='icon-model' />样本推荐</p>
          </Link>
          <Link to='/model/use'>
            <p><Icon type="database" className='icon-model' />模型使用</p>
          </Link>
        </Sider>

        <Content className='content'>
          <h3>样本属性筛选</h3>
          <ConditionalFilterRecommend startRecommend={this.startRecommend} />
          <h3>智能推荐结果</h3>
          <ModelRecommendTable results={this.state.recommendResults} />
        </Content>
      </Layout>
    );
  }
}

export default ModelRecommend;