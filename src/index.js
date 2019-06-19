import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './store/index';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './app/components/LoginComponent';

const routing = (
    <Router>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/login" component={LoginComponent} />
      </div>
    </Router>
  )

ReactDOM.render(
    <Provider store={store}>
        {routing}
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
