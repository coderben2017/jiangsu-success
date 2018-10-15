import './style.css';
import React from 'react';
import { Table, Icon } from 'antd';


interface IndexProps {
  samples: any[]
}

export class SampleTable extends React.Component<IndexProps, {}> {

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
    title: '影像类型',
    dataIndex: 'pictureWay',
  }, {
    title: '空间分辨率',
      dataIndex: 'precision',
  }, {
    title: '所属市',
    dataIndex: 'city',
  }, {
    title: '所属县区',
    dataIndex: 'county'
  }, {
    title: '样本格式',
    dataIndex: 'format',
  }, {
    title: '样本数量',
    dataIndex: 'number',
  }];

  render() {
    return (
      <div className='container-sample-table'>
        <Icon type="download" style={{margin: '0 0 12px 1170px'}} />
        <Table
          columns={this.columns}
          dataSource={this.props.samples}
          pagination={{pageSize: 8}}
          bordered
        />
      </div>
    );
  }
}

export default SampleTable;