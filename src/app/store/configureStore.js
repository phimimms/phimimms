import createHistory from 'history/createBrowserHistory';
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
    /* Enables Redux DevTools Browser Extension */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ];

  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(
      /* Middleware to Detect Redux State Mutation */
      require('redux-immutable-state-invariant').default()
    );
  } else {
    enhancements.push(
      /* Persist State in Local Storage */
      persistState()
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
