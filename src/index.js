import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import './index.scss';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginComponent from './app/components/LoginComponent';
import TicketsComponent from './app/components/Tickets';
import CreateTicketComponent from './app/components/CreateTicket';

import SnackBar from './app/common/Snackbar/index';
import LoaderComponent from './app/common/Loader/index';
import PageNotFoundComponent from './app/components/PageNotFound';
import HeaderComponent from './app/common/Header';

const routes = (
  <div>
    <Router>
      <div className='body-wrapper'>
        <HeaderComponent />
        <Switch>
          <div className='details-wrapper'>
            <Route path="/tickets" component={TicketsComponent} />
            <Route path="/create-ticket" component={CreateTicketComponent} />
          </div>
        </Switch>
      </div>
    </Router>
  </div>
)

const routing = (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" component={LoginComponent} />
        {routes}
        <Route component={PageNotFoundComponent} />
      </Switch>
    </Router>
  )

ReactDOM.render(
    <Provider store={store}>
        <LoaderComponent />
        {routing}
        <SnackBar />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
