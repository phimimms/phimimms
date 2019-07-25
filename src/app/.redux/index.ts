import { sha1 } from 'crypto-hash';
import { applyMiddleware, compose, createStore as createReduxStore, Store } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';

import { ActionType } from 'dictionary/actionTypes';
import createReducer from 'reducers';

import { initialState, State } from './state';

interface StoreSubscription<SubscriptionArgument> {
  /**
   * The callback of the subscription.
   * @param arg The argument of the application state subscription.
   */
  callback: (arg: SubscriptionArgument) => void,
  /**
   * Maps the state of the application to the argument of the subscription.
   * @param   state The state of the application.
   * @returns The argument of the application state subscription.
   */
  mapStateToArg: (state: State) => SubscriptionArgument,
  /**
   * The hash of the application state subscription argument from the former callback invocation.
   */
  serial?: string,
}

/**
 * The map of subscriptions to the store.
 */
const storeSubscriptions: Map<string, StoreSubscription<unknown>[]> = new Map();

/**
 * The Redux store.
 */
let store: Store = null;

export interface Action {
  readonly error?: object,
  readonly header: object,
  readonly payload?: unknown,
  readonly type: string,
}

interface ActionDefinition<Payload> {
  /**
   * Gets the payload of the action.
   */
  getPayload?: (...args: unknown[]) => Promise<Payload>,
  /**
   * Maps the arguments of the payload callback to the header of the action.
   */
  mapArgsToHeader?: (...args: unknown[]) => object,
  /**
   * The action type.
   */
  readonly type: ActionType,
}

/**
 * Creates the dispatch function of the action.
 * @param actionDefinition  The definition of the action.
 */
export function createAction<Payload>(actionDefinition: ActionDefinition<Payload>): (...args: unknown[]) => Promise<Payload> {
  const {
    getPayload = (...args) => Promise.resolve(null),
    mapArgsToHeader = () => ({}),
    type,
  } = actionDefinition;

  return async(...args): Promise<Payload> => {
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
      const payload: Payload = await getPayload(...args);

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

  store = createReduxStore(rootReducer, initialState, enhancer);

  store.subscribe(() => {
    const state: State = store.getState();

    Promise.all(
      Array.from(storeSubscriptions.values())
        .reduce((subscriptions, s) => subscriptions.concat(s), [])
        .map(async(subscription) => {
          const { callback, mapStateToArg } = subscription;
          let { serial: formerSerial } = subscription;

          const arg = mapStateToArg(state);
          const serial = await sha1(JSON.stringify(arg));

          if (serial === formerSerial) {
            return;
          }

          subscription.serial = serial;
          return callback(arg);
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
export async function subscribeToStore(mapStateToArg: (state: State) => unknown, callback: (arg: unknown) => void): Promise<void> {
  const subscriptionId: string = await sha1(callback.toString());

  let subscriptions: StoreSubscription<unknown>[] = storeSubscriptions.get(subscriptionId);
  if (!subscriptions) {
    subscriptions = [];
    storeSubscriptions.set(subscriptionId, subscriptions);
  }

  const subscription: StoreSubscription<unknown> = {
    callback,
    mapStateToArg,
  };

  subscriptions.push(subscription);

  if (!store) {
    return;
  }

  const arg = mapStateToArg(store.getState());

  subscription.serial = await sha1(JSON.stringify(arg));

  callback(arg);
}
