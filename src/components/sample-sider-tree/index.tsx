import React from 'react';
import { Tree } from 'antd';
import Promise from 'Promise';
import { getPeriod, getCities, getYear } from '../../services/mock';
import SampleLibraryModule from "../../model/SampleLibraryModule";
import HttpClient from "../../services/HttpClient";

const TreeNode = Tree.TreeNode;

// 渲染树形组件节点
function generateTreeNodes(treeNode: any) {
  let arr = [];
  let names = [];
  const key = treeNode.props.eventKey;
  if (key === '1') {
    names = getPeriod();
  } else if (key === '2'){
    names = getYear();
  }
  for (let i = 1; i <= names.length; i++) {
    arr.push({name: names[i-1], key: `${key}-${i}`});
  }
  return arr;
}

function setLeaf(treeData: any, curKey: any, level: any) {
  const loopLeaf = (data: any, lev: any) => {
    const l = lev - 1;
    data.forEach((item: any) => {
      if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
          curKey.indexOf(item.key) !== 0) {
        return;
      }
      if (item.children) {
        loopLeaf(item.children, l);
      } else if (l < 1) {
        item.isLeaf = true;
      }
    });
  };
  loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData: any, curKey: any, child: any, level: any) {
  const loop = (data: any) => {
    if (level < 1 || curKey.length - 3 > level * 2) return;
    data.forEach((item: any) => {
      if (curKey.indexOf(item.key) === 0) {
        if (item.children) {
          loop(item.children);
        } else {
          item.children = child;
        }
      }
    });
  };
  loop(treeData);
  setLeaf(treeData, curKey, level);
}


interface IndexProps {
  updateTreeData: any
}

class SampleSiderTree extends React.Component<IndexProps, {}> {
  state = {
    treeData: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        treeData: [
          {name: '基础测绘', key: '1', isLeaf: false},
          {name: '地理国情', key: '2', isLeaf: false},
        ],
      });
    }, 100);
  }

  // 选中一个节点
  onSelect = (value, e): void => {
    const props = e.node.props;
    console.log(props);
    const base_type = props.eventKey.charAt(0); // 记录基础测绘or地理国情

    let period = props.eventKey.charAt(2);      // 记录时期
    if (base_type === '2') {
      period = String(Number(period) + 4);
    }

    SampleLibraryModule.setTreeData(base_type, period); // 更新model
    this.props.updateTreeData(base_type, period);       // 将更新传至父组件，用于下拉列表的更新
  };

  onLoadData = (treeNode: any): any => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...this.state.treeData];
        getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 1);
        this.setState({ treeData });
        resolve();
      }, 300);
    });
  };

  // 树形组件节点展开
  onExpand = (event: any): void => {
    // console.log(event);
  };

  render() {
    const loop = (data: any) => data.map((item: any) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} />
    });
    const treeNodes = loop(this.state.treeData);
    return (
      <Tree
        defaultExpandedKeys={['1-1-1']}
        onSelect={this.onSelect}
        loadData={this.onLoadData}
        onExpand={this.onExpand}
      >
        {treeNodes}
      </Tree>
    );
  }
}


export default SampleSiderTree;