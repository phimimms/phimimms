import * as actionTypes from './actionTypes';
import * as bookApi from '../api/bookApi';

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
 * Fetches the deadline of the books.
 * @return  {Function}
 */
export function fetchBookDeadline() {
    return (dispatch) => {
        return bookApi.getDeadline()
            .then(
                (deadline) => {
                    dispatch(fetchBookDeadlineSuccess(deadline));
                },
                (e) => {
                    console.warn(e);
                }
            );
    };
}
export function fetchBookDeadlineSuccess(deadline) {
    return { type: actionTypes.FETCH_BOOK_DEADLINE_SUCCESS, deadline };
}

/**
 * Fetches the books.
 * @return {Function}
 */
export function fetchBooks() {
    return (dispatch) => {
        return bookApi.getAllBooks()
            .then(
                (books) => {
                    dispatch(fetchBooksSuccess(books));
                },
                (e) => {
                    console.warn(e);
                }
            );
    };
}
export function fetchBooksSuccess(books) {
    return { type: actionTypes.FETCH_BOOKS_SUCCESS, books };
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
    deadline.setHours(23, 59, 59, 999);

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
