import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Home } from './components/home';
import { Login } from './components/login';
import { User } from './user';

const AuthRoute = ({component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    User.isLogin ? <Component {...props}/> : <Redirect to="/login"/>
  )}/>
)

export class App extends React.Component<any, any> {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path="/login" component={Login} />
          <AuthRoute path="/" component={Home} /> */}
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    );
  }
}
