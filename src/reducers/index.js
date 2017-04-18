import { combineReducers } from 'redux';

/* Reducers */
import bookCatalog from './bookCatalogReducer';
import home from './homeReducer';

/* Builds the Root Reducer */
const rootReducer = combineReducers({
    bookCatalog,
    home
});

export default rootReducer;
