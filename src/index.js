import 'babel-polyfill';
import configureStore from './store/configureStore';
import { loadBooks } from './actions/bookActions';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

const store = configureStore();
store.dispatch(loadBooks());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
