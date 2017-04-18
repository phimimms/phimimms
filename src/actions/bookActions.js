import * as actionTypes from './actionTypes';
import * as bookApi from '../api/bookApi';

/**
 * Loads the deadline of the books.
 * @return  {Function}
 */
export function loadBookDeadline() {
    return (dispatch) => {
        return bookApi.getDeadline()
            .then(
                (deadline) => {
                    dispatch(loadBookDeadlineSuccess(deadline));
                },
                (e) => {
                    console.warn(e);
                }
            );
    };
}
export function loadBookDeadlineSuccess(deadline) {
    return { type: actionTypes.LOAD_BOOK_DEADLINE_SUCCESS, deadline };
}

/**
 * Deletes the book corresponding to the given identifier.
 * @param   {String}    bookId  The identifier of the book to delete
 * @return  {Function}
 */
export function deleteBook(bookId) {
    return (dispatch) => {
        return bookApi.deleteBook(bookId)
            .then(
                () => {
                    dispatch(deleteBookSuccess(bookId));
                },
                (e) => {
                    console.warn(e);
                }
            );
    };
}
export function deleteBookSuccess(bookId) {
    return { type: actionTypes.DELETE_BOOK_SUCCESS, bookId };
}

/**
 * Loads the books.
 * @return {Function}
 */
export function loadBooks() {
    return (dispatch) => {
        return bookApi.getAllBooks()
            .then(
                (books) => {
                    dispatch(loadBooksSuccess(books));
                },
                (e) => {
                    console.warn(e);
                }
            );
    };
}
export function loadBooksSuccess(books) {
    return { type: actionTypes.LOAD_BOOKS_SUCCESS, books };
}

/**
 * Saves the new or updated book.
 * @param   {module:bookApi~Book}   book    The book to save
 * @return  {Function}
 */
export function saveBook(book) {
    return (dispatch) => {
        return bookApi.saveBook(book)
            .then(
                (b) => {
                    dispatch(saveBookSuccess(b));
                },
                (e) => {
                    console.warn(e);
                }
            );
    };
}
export function saveBookSuccess(book) {
    return { type: actionTypes.SAVE_BOOK_SUCCESS, book };
}

/**
 * Saves the deadline of the books as the specified date.
 * @param  {Date}       deadline    The date of the deadline
 * @return {Function}
 */
export function saveBookDeadline(deadline) {
    return (dispatch) => {
        return bookApi.saveDeadline(deadline)
            .then(
                (d) => {
                    dispatch(saveBookDeadlineSuccess(d));
                },
                (e) => {
                    console.warn(e);
                }
            );
    };
}
export function saveBookDeadlineSuccess(deadline) {
    return { type: actionTypes.SAVE_BOOK_DEADLINE_SUCCESS, deadline };
}
