import { combineReducers } from 'redux';

/* Reducers */
import books from './bookReducer';

/* Builds the Root Reducer */
const rootReducer = combineReducers({
    books
});

export default rootReducer;
