import './style.css';
import * as React from "react";
import { Icon } from 'antd';

interface IndexProps {
  oriImg: any,
  disImg: any,
  bigImg: any,
  imgBack: any,
  imgGo: any
}

class ModelUseResult extends React.Component<IndexProps, {}> {
  render() {
    return (
      <div className='container-model-use-result'>
        <Icon type="left" className='icon-2' onClick={this.props.imgBack} />
        <div>
          <span>原始影像</span>
          <img src={this.props.oriImg} alt="原始图像" />
        </div>
        <div>
          <span>识别结果</span>
          <img src={this.props.disImg} alt="识别结果" />
        </div>
        <Icon type="right" className='icon-2' onClick={this.props.imgGo} />
      </div>
    );
  }
}

export default ModelUseResult;