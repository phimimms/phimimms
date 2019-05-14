import { sha1 } from 'crypto-hash';
import { applyMiddleware, compose, createStore as createReduxStore, Store } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';

import { ActionType } from 'dictionary/actionTypes';
import createReducer from 'reducers';

import initialState from './initialState';

interface StoreSubscription {
  callback: (...any) => void,
  mapStateToArgs: (...any) => object,
  serial?: string,
}

const storeSubscriptions: { [ subscriptionId: string ]: StoreSubscription[] } = {};

let store: Store = null;

export interface Action {
  error?: object,
  header: object,
  payload?: object,
  type: string,
}

interface ActionDefinition {
  getPayload?: (...any) => Promise<any>,
  mapArgsToHeader?: (...any) => object,
  type: ActionType,
}

export function createAction(actionDefinition: ActionDefinition): (...any) => Promise<any> {
  const {
    getPayload = () => Promise.resolve(null),
    mapArgsToHeader = () => ({}),
    type,
  } = actionDefinition;

  return async(...args) => {
    if (!store) {
      // @ifdef DEVELOPMENT
      console.warn('Cannot dispatch the following action without a store', type);
      // @endif
      return;
    }

    const thunkDispatch = store.dispatch as ThunkDispatch<Store, void, Action>;

    const header = mapArgsToHeader(...args);

    await thunkDispatch((dispatch) => dispatch({ header, type: type.REQUEST }));

    try {
      const payload: object = await getPayload(...args);

      await thunkDispatch((dispatch) => dispatch({ header, payload, type: type.SUCCESS }));

      return payload;
    } catch (error) {
      await thunkDispatch((dispatch) => dispatch({ header, error, type: type.FAILURE }));

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

  store = createReduxStore(rootReducer, initialState as any, enhancer);

  store.subscribe(() => {
    const state: {} = store.getState();

    Promise.all(
      Object.values(storeSubscriptions)
        .map((subscriptions: StoreSubscription[]) => subscriptions.map(async(subscription) => {
          const { callback, mapStateToArgs } = subscription;
          let { serial: formerSerial } = subscription;

          const args = mapStateToArgs(state);
          const serial = await sha1(JSON.stringify(args));

          if (serial === formerSerial) {
            return;
          }

          subscription.serial = serial;
          return callback(args);
        }))
    );
  });

  if (module.hot) {
    /* Enables Redux hot reloading */
    module.hot.accept('reducers', () => {
      import('reducers')
        .then(({ default: getReducer }) => store && store.replaceReducer(getReducer()));
    });
  }
}

export async function subscribeToStore(mapStateToArgs: (object) => object, callback: (object) => void): Promise<void> {
  const subscriptionId: string = await sha1(callback.toString());

  let subscriptions: StoreSubscription[] = storeSubscriptions[subscriptionId];
  if (!subscriptions) {
    subscriptions = [];
    storeSubscriptions[subscriptionId] = subscriptions;
  }

  const subscription: StoreSubscription = {
    callback,
    mapStateToArgs,
  };

  subscriptions.push(subscription);

  if (!store) {
    return;
  }

  const args = mapStateToArgs(store.getState());

  subscription.serial = await sha1(JSON.stringify(args));

  callback(args);
}
