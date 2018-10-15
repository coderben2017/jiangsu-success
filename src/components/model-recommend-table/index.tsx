import './style.css';
import React from 'react';
import { Table } from 'antd';

interface IndexProps {
  results: any
}

export class ModelRecommendTable extends React.Component<IndexProps, {}> {

  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'key',
    }, {
      title: '要素名称',
      dataIndex: 'name',
    }, {
      title: '所属时期',
      dataIndex: 'period'
    }, {
      title: '影像类型',
      dataIndex: 'pictureWay',
    }, {
      title: '空间分辨率',
      dataIndex: 'precision',
    }, {
      title: '样本格式',
      dataIndex: 'format',
    }];

    return (
      <div className='container-sample-table'>
        <Table
          columns={columns}
          dataSource={this.props.results}
          pagination={{pageSize: 8}}
          bordered
        />
      </div>
    );
  }
}

export default ModelRecommendTable;