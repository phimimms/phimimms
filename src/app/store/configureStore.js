import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import { environment, isEnvironment } from 'util/environment';
import createReducer from 'reducers/root';

export const history = createHistory();

export default function configureStore(initialState = {}) {
  /* The Root Reducer */
  const rootReducer = createReducer();

  const enhancements = [
    /* Enables Redux DevTools Browser Extension */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ];

  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
  ];

  let persistedState = {};

  if (isEnvironment(environment.production)) {
    persistedState = JSON.parse(localStorage.getItem('redux')) || {};
  } else {
    middlewares.push(
      /* Middleware to Detect Redux State Mutation */
      require('redux-immutable-state-invariant').default()
    );
  }

  /* The Redux Enhancements */
  const enhancer = compose(
    applyMiddleware(...middlewares),
    ...enhancements
  );

  /* The Redux Store */
  const store = createStore(
    rootReducer,
    Object.assign({}, initialState, persistedState),
    enhancer
  );

  if (isEnvironment(environment.production)) {
    store.subscribe(() => {
      const { localization } = store.getState();

      localStorage.setItem('redux', JSON.stringify({ localization }));
    });
  }

  if (module.hot) {
    /* Enables Redux Hot Reloading */
    module.hot.accept('reducers/root', () => {
      store.replaceReducer(require('reducers/root').default());
    });
  }

  return store;
}
