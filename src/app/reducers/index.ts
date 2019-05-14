import { combineReducers, Reducer } from 'redux';

import count from './count';

export default function createReducer(): Reducer {
  return combineReducers({
    count,
  });
}
