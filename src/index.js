import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import store from './store';

import User from 'layouts/User.js';

import 'assets/css/material-dashboard-react.css?v=1.8.0';

const hist = createBrowserHistory();

Amplify.configure(config);

ReactDOM.render(
  <Router history={hist}>
    <StoreProvider store={store}>
      <Switch>
        <Route path='/user' component={User} />
        <Redirect from='/' to='/user/records' />
      </Switch>
    </StoreProvider>
  </Router>,
  document.getElementById('root')
);

