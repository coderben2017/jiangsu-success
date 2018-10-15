import * as React from "react";
import { Table, Input, Popconfirm } from 'antd';
import HttpClient from "../../services/HttpClient";

interface IndexPropsForCell {
  value: any,
  editable: any,
  status: any,
  onChange: any,
}

class EditableCell extends React.Component<IndexPropsForCell, {}> {

  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  }

  cacheValue = null;  

  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
      nextState.value !== this.state.value;
  }

  onInputChange(e) {
    const value = e.target.value;
    this.setState({value});
  }

  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={e => this.onInputChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value.toString() || ' '}
            </div>
        }
      </div>
    );
  }
}


interface IndexPropsForBigTypeTable {
  bigTypes: any,
  updateBigTypeMappingTable: any,
  tableChange: any
}

class EditableTableBigType extends React.Component<IndexPropsForBigTypeTable, {}> {
  
  state = {
    data: [], 
  };

  oldCode = ''; // 原要素代码  
  columns = [{  // 表格列
    title: '序号',
    dataIndex: 'key',
    width: '15%',
    render: (text, record, index) => `${index + 1}`,
  }, {
    title: '要素代码',
    dataIndex: 'code',
    width: '25%',
    render: (text, record, index) => this.renderColumns(this.state.data, index, 'code', text),
  }, {
    title: '要素名称',
    dataIndex: 'name',
    width: '40%',
    render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record, index) => {
      const { editable } = this.state.data[index].code;
      return (
        <div className="editable-row-operations">
          {
            editable ?
              <span>
                <a onClick={() => this.editDone(index, 'save')}>保存</a>&nbsp;
                  <Popconfirm title="确定要放弃保存吗?" okText="确定" cancelText="取消" onConfirm={() => this.editDone(index, 'cancel')}>
                  <a>放弃</a>
                </Popconfirm>
              </span>
              :
              <span>
                <a onClick={() => this.edit(index)}>编辑</a>&nbsp;
                  <a onClick={() => {
                    if (window.confirm('确定要删除吗？')) { 
                      HttpClient.deleteBigType(this.state.data[index].code.value).then((res) => {
                        if (res === 'Success') {
                          alert('删除成功');
                          this.props.tableChange();
                        } else {
                          alert('删除失败，请重新操作。');
                        }
                      })
                    }
                  }}>删除</a>
              </span>
          }
        </div>
      );
    },
  }];

  componentWillReceiveProps(nextProps) {
    let data = [];
    nextProps.bigTypes.forEach((item, index) => {
      data.push({
        key: item.label + item.value + index,
        id: {
          value: index + 1 + ''
        },
        code: {
          editable: false,
          value: item.label
        },
        name: {
          editable: false,
          value: item.value
        }
      });
    });
    this.setState({
      data: data
    });
  }

  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }

  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }

  edit(index) {
    const { data } = this.state;
    this.oldCode = data[index].code.value;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }

  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
      this.props.updateBigTypeMappingTable(this.oldCode, data[index].code.value, data[index].name.value);
    });
  }
  
  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    return <Table bordered dataSource={dataSource} columns={this.columns} pagination={{ pageSize: 8 }} />;
  }
}


export default EditableTableBigType;