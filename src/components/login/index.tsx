import './style.css';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { User } from '../../user';

function login(history) {
  User.isLogin = true;
  history.replace('/');
}

export const Login = withRouter(({history}) => (
  <Button type="primary" onClick={() => {login(history);}}>Login</Button>
))
