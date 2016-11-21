import * as actionTypes from './actionTypes';
import bookApi from '../api/mockBookApi';

export function loadBooks() {
    return function(dispatch) {
        return bookApi.getAllBooks()
            .then(books => {
                dispatch(loadBooksSuccess(books));
            })
            .catch(e => {
                throw(e);
            });
    };
}
export function loadBooksSuccess(books) {
    return {type: actionTypes.LOAD_BOOKS_SUCCESS, books};
}

export function saveBook(newBookData) {
    return function(dispatch) {
        return bookApi.saveBook(newBookData)
            .then(book => {
                dispatch(saveBookSuccess(book));
            })
            .catch(e => {
                throw(e);
            });
    };
}
export function saveBookSuccess(book) {
    return {type: actionTypes.SAVE_BOOK_SUCCESS, book};
}
