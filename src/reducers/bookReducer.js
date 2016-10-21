import * as types from '../actions/actionTypes';

export default function bookReducer(state = [], action) {
    switch(action.type) {
        case types.LOAD_BOOKS_SUCCESS:
            return action.books;
        default:
            return state;
    }
}
