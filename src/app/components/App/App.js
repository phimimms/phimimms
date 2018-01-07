/**
 * @module components/App
 */

import 'perfect-scrollbar/css/perfect-scrollbar.css';
import PropTypes from 'prop-types';
import React from 'react';
import { asyncComponent } from 'react-async-component';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import 'assets/icomoon/style.css';
import { history } from 'store/configureStore';

import './App.scss';
import Header from './Header/Header';

function App({ directionality, pathname, tokens }) {
  const BookCatalog = asyncComponent({
    resolve: () => import('routes/BookCatalog/BookCatalog'),
  });
  const Dashboard = asyncComponent({
    resolve: () => import('routes/Dashboard/Dashboard'),
  });

  return (
    <ConnectedRouter history={history}>
      <div className={`App ${directionality}`} dir={directionality}>
        <Header
          history={history}
          pathname={pathname}
          tokens={tokens}
        />

        <div className="App__content">
          <Route
            exact
            component={Dashboard}
            path="/"
          />
          <Route
            exact
            component={BookCatalog}
            path="/bookCatalog"
          />
        </div>
      </div>
    </ConnectedRouter>
  );
}

App.propTypes = {
  directionality: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  tokens: PropTypes.object.isRequired,
};

function mapStateToProps({ localization: { directionality, tokens }, router: { location } }) {
  return {
    directionality,
    pathname: location ? location.pathname : '',
    tokens,
  };
}

export default connect(mapStateToProps)(App);
