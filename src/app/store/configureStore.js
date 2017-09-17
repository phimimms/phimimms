import createHistory from 'history/createBrowserHistory'; // eslint-disable-line
import { applyMiddleware, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import createReducer from 'reducers/root';

export const history = createHistory();

export default function configureStore(initialState = {}) {
  /* The Root Reducer */
  const rootReducer = createReducer();

  const enhancements = [
    /* Persist State in Local Storage */
    persistState(),
  ];

  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
  ];

  if (process.env.NODE_ENV !== 'production') {
    /* Enables Redux DevTools Browser Extension */
    enhancements.push(
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

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
    initialState,
    enhancer
  );

  if (module.hot) {
    /* Enables Redux Hot Reloading */
    module.hot.accept('reducers/root', () => {
      store.replaceReducer(require('reducers/root').default());
    });
  }

  return store;
}
