import './style.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

interface INavTabs {
  (props: {path: string}): JSX.Element;
}

export const NavTabs: INavTabs = ({path}) => (
  <Menu mode="horizontal" selectedKeys={[path]} className="nav-tabs">
    <Menu.Item className="menu-item" key="sample">
      <Link to="/sample">样本查询</Link>
    </Menu.Item>
    <Menu.Item className="menu-item" key="product/mappingfile">
      <Link to="/product/mappingfile">样本生产</Link>
    </Menu.Item>
    <Menu.Item className="menu-item" key="model/recommend">
      <Link to="/model/recommend">模型管理</Link>
    </Menu.Item>
    <Menu.Item className="menu-item" key="statistics">
      <Link to="/statistics">样本统计</Link>
    </Menu.Item>
    <Menu.Item className="menu-item" key="role">
      <Link to="/role">角色管理</Link>
    </Menu.Item>
  </Menu>
);
