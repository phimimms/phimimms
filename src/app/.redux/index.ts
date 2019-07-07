import { sha1 } from 'crypto-hash';
import { applyMiddleware, compose, createStore as createReduxStore, Store } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';

import { ActionType } from 'dictionary/actionTypes';
import createReducer from 'reducers';

import initialState, { State } from './initialState';

interface StoreSubscription {
  /**
   * The callback of the subscription.
   * @param arg The argument of the application state subscription.
   */
  callback: (arg: object) => void,
  /**
   * Maps the state of the application to the callback argument of the subscription.
   * @param   state The state of the application.
   * @returns The callback argument of the subscription.
   */
  mapStateToArg: (state: State) => object,
  /**
   * The hash of the callback argument from the former callback invocation.
   */
  serial?: string,
}

/**
 * The map of subscriptions to the store.
 */
const storeSubscriptions: Map<string, StoreSubscription[]> = new Map();

/**
 * The Redux store.
 */
let store: Store = null;

export type Action = {
  readonly header: object,
  readonly payload?: object,
  readonly type: string,
} | {
  readonly error: object,
  readonly header: object,
  readonly type: string,
}

interface ActionDefinition {
  /**
   * Gets the payload of the action.
   */
  getPayload?: (...any) => Promise<any>,
  /**
   * Maps the arguments of the payload callback to the header of the action.
   */
  mapArgsToHeader?: (...any) => object,
  /**
   * The action type.
   */
  readonly type: ActionType,
}

/**
 * Creates the dispatch function of the action.
 * @param actionDefinition  The definition of the action.
 */
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

/**
 * Creates the Redux store.
 */
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

  store = createReduxStore(rootReducer, initialState as object, enhancer);

  store.subscribe(() => {
    const state: State = store.getState();

    Promise.all(
      Array.from(storeSubscriptions.values())
        .reduce((subscriptions, s) => subscriptions.concat(s), [])
        .map(async(subscription) => {
          const { callback, mapStateToArg } = subscription;
          let { serial: formerSerial } = subscription;

          const args = mapStateToArg(state);
          const serial = await sha1(JSON.stringify(args));

          if (serial === formerSerial) {
            return;
          }

          subscription.serial = serial;
          return callback(args);
        }))
  });

  if (module.hot) {
    /* Enables Redux hot reloading */
    module.hot.accept('reducers', () => {
      import('reducers')
        .then(({ default: getReducer }) => store && store.replaceReducer(getReducer()));
    });
  }
}

/**
 * Subscribes to the Redux store.
 * @param mapStateToArg Maps the state of the application to the callback argument.
 * @param callback      The callback of the subscription.
 */
export async function subscribeToStore(mapStateToArg: (state: State) => object, callback: (object) => void): Promise<void> {
  const subscriptionId: string = await sha1(callback.toString());

  let subscriptions: StoreSubscription[] = storeSubscriptions.get(subscriptionId);
  if (!subscriptions) {
    subscriptions = [];
    storeSubscriptions.set(subscriptionId, subscriptions);
  }

  const subscription: StoreSubscription = {
    callback,
    mapStateToArg,
  };

  subscriptions.push(subscription);

  if (!store) {
    return;
  }

  const args = mapStateToArg(store.getState());

  subscription.serial = await sha1(JSON.stringify(args));

  callback(args);
}
