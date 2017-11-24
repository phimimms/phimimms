/**
 * @module reducers/root
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import bookCatalog from 'reducers/bookCatalog';
import localization from 'reducers/localization';

export default function createReducer() {
  return combineReducers({
    bookCatalog,
    localization,
    router: routerReducer,
  });
}
