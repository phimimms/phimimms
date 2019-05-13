import { applyMiddleware, compose, createStore as createReduxStore, Store } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';

import { ActionType } from 'dictionary/actionTypes';
import createReducer from 'reducers';

import initialState from './initialState';

let store: Store = null;

export interface Action {
  error?: object,
  header: object,
  payload?: object,
  type: string,
}

export function createAction(actionType: ActionType, action: Function = Function.prototype, mapArgsToHeader?: Function): Function {
  return async(...args) => {
    if (!store) {
      return;
    }

    const thunkDispatch = store.dispatch as ThunkDispatch<Store, void, Action>;

    const header = mapArgsToHeader && mapArgsToHeader(...args) || {};

    await thunkDispatch((dispatch) => dispatch({ header, type: actionType.REQUEST }));

    try {
      const payload: object = await action(...args) || {};

      await thunkDispatch((dispatch) => dispatch({ header, payload, type: actionType.SUCCESS }));

      return payload;
    } catch (error) {
      await thunkDispatch((dispatch) => dispatch({ header, error, type: actionType.FAILURE }));

      return Promise.reject(error);
    }
  }
}

export function createStore(): void {
  const rootReducer = createReducer();

  const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

  const middlewares = [
    thunkMiddleware,
  ];

  // @ifdef DEVELOPMENT
  middlewares.push(
    /* Middleware to detect Redux state mutation */
    require('redux-immutable-state-invariant').default()
  );
  // @endif

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  store = createReduxStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    /* Enables Redux hot reloading */
    module.hot.accept('reducers/index', () => {
      import('reducers/index')
        .then(({ default: getReducer }) => store && store.replaceReducer(getReducer()));
    });
  }
}
