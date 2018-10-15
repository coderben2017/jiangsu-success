import './style.css';
import * as React from 'react';
import { Link } from "react-router-dom";
import { Layout, Icon } from "antd";
import ConditionalFilterModelUse from "../conditional-filter-model-use";
import ModelUseResult from "../model-use-result";
import HttpClient from "../../services/HttpClient";
import nullImage from "../../assets/img/null.png";

const { Sider, Content } = Layout;


class ModelUse extends React.Component {

  state = {
    oriImages: [],
    disImages: [],
    bigImage: '',
    imageId: 0
  }

  // 模型运行
  changeImages = (format: string, path: string) => {
    const ratio = format;
    if (format.length === 1) {
      format = '卫片';
    } else {
      format = '航片';
    }
    HttpClient.runModel(format, ratio, path).then(res => {
      // this.setState({
      //   oriImages: res.discernPics,
      //   disImages: res.originPics,
      //   bigImage: res.downloadPath
      // });
    });
  }

  imgBack = () => {
    this.setState({
      imageId: (this.state.imageId + 1) % 200
    });
  }
  
  imgGo = () => {
    if (this.state.imageId === 0) {
      this.setState({
        imageId: 199
      });
    } else {
      this.setState({
        imageId: this.state.imageId - 1
      });
    }
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
          <h3>模型使用</h3>
          <ConditionalFilterModelUse changeImages={this.changeImages} />
          <h3 className='h3-inline'>结果对比显示</h3><a href={this.state.bigImage} download='final-image'><Icon type='download' className='icon-download' /></a>
          <ModelUseResult 
            oriImg={this.state.oriImages[this.state.imageId]} 
            disImg={this.state.disImages[this.state.imageId]} 
            bigImg={this.state.bigImage} 
            imgBack={this.imgBack}
            imgGo={this.imgGo}
          />
        </Content>
      </Layout>
    );
  }

}

export default ModelUse;