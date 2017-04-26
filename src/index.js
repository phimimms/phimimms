import 'babel-polyfill';
import configureStore from './store/configureStore'; // eslint-disable-line import/default
import { fetchBookDeadline, fetchBooks } from './actions/bookActions';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';

/* Registers Material-UI click events */
injectTapEventPlugin();

/* Creates Redux Store */
const store = configureStore();

/* Load the Application Data */
store.dispatch(fetchBookDeadline());
store.dispatch(fetchBooks());

/* Renders the Application to the DOM */
render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
