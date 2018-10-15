import './style.css';
import * as React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';

import { NavTabs } from '../navtabs';
import { Role } from '../role';
import Sample from "../sample";
import ProductMappingFile from "../product-mappingfile";
import ProductNewPeriod from "../product-new-period";
import ProductOldPeriod from "../product-old-period";
import ModelRecommend from "../model-recommend";
import ModelUse from "../model-use";
import Statistics from "../statistics";

import logoImg from '../../assets/img/logo.png';


interface IHome {
  (props: RouteComponentProps<void>): JSX.Element;
}

const {Header, Content} = Layout;

export const Home: IHome = ({location}) => (
  <Layout>
    <Header className="header">
      <img className='img-logo' src={logoImg} />
      <h1 className="title"><a href="#">江苏省基于深度学习遥感影像样例库</a></h1>
      <NavTabs path={location.pathname.slice(1)} />
    </Header>
    <Layout className='layout'>
      <Content>
        <Switch>
          <Route exact path="/sample" component={Sample} />
          <Route exact path="/product/mappingfile" component={ProductMappingFile} />
          <Route exact path="/product/newperiod" component={ProductNewPeriod} />
          <Route exact path="/product/oldperiod" component={ProductOldPeriod} />
          <Route exact path="/model/recommend" component={ModelRecommend} />
          <Route exact path="/model/use" component={ModelUse} />
          <Route exact path="/statistics" component={Statistics} />
          {/* <Route exact path="/role" component={Role} /> */}
          <Redirect from="/" to="/sample" />
        </Switch>
      </Content>
    </Layout>
  </Layout>
);
