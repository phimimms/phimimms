import { combineReducers, Reducer } from 'redux';

import count from './count';

/**
 * Creates the root reducer.
 */
export default function createReducer(): Reducer {
  return combineReducers({
    count,
  });
}
