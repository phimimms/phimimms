import { combineReducers, Reducer } from 'redux';

import settings from './settings';

/**
 * Creates the root reducer.
 */
export default function createReducer(): Reducer {
  return combineReducers({
    settings,
  });
}
