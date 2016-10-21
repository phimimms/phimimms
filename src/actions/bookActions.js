import * as types from './actionTypes';
import bookApi from '../api/mockBookApi';

export function loadBooksSuccess(books) {
    return {type: types.LOAD_BOOKS_SUCCESS, books};
}

export function loadBooks() {
    return function(dispatch) {
        return bookApi.getAllBooks().then(books => {
            dispatch(loadBooksSuccess(books));
        }).catch(e => {
            throw(e);
        });
    };
}
