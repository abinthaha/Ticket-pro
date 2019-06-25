import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import './index.scss';

import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './app/components/LoginComponent';
import TicketsComponent from './app/components/Tickets';
import CreateTicketComponent from './app/components/CreateTicket';

const routing = (
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/tickets" component={TicketsComponent} />
      <Route path="/create-ticket" component={CreateTicketComponent} />
    </Router>
  )

ReactDOM.render(
    <Provider store={store}>
        {routing}
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
