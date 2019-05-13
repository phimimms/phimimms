import { combineReducers } from 'redux';

import count from './count';

export default function createReducer() {
  return combineReducers({
    count,
  });
}
