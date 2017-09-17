import {
  deleteBook as deleteBookAdapter,
  getAllBooks,
  getDeadline,
  saveBook as saveBookAdapter,
  saveDeadline,
} from 'adapters/book';

import {
  BOOK__DELETE,
  BOOK__FETCH,
  BOOK__SAVE,
  BOOK_DEADLINE__FETCH,
  BOOK_DEADLINE__SAVE,
} from './actionTypes';

/**
 * Deletes the book corresponding to the given identifier.
 * @param   {string}    bookId  The identifier of the book to delete.
 * @returns {Function}
 */
export function deleteBook(bookId) {
  return (dispatch) => {
    return deleteBookAdapter(bookId)
      .then(
        () => dispatch(deleteBookSuccess(bookId)),
        (e) => dispatch(deleteBookFailure(e))
      );
  };
}
function deleteBookFailure(error) {
  return { type: BOOK__DELETE.FAILURE, error };
}
function deleteBookSuccess(bookId) {
  return { type: BOOK__DELETE.SUCCESS, bookId };
}

/**
 * Fetches the deadline of the books.
 * @returns {Function}
 */
export function fetchBookDeadline() {
  return (dispatch) => {
    return getDeadline()
      .then(
        (deadline) => dispatch(fetchBookDeadlineSuccess(deadline)),
        (e) => dispatch(fetchBookDeadlineFailure(e))
      );
  };
}
function fetchBookDeadlineFailure(error) {
  return { type: BOOK_DEADLINE__FETCH.FAILURE, error };
}
function fetchBookDeadlineSuccess(deadline) {
  return { type: BOOK_DEADLINE__FETCH.SUCCESS, deadline };
}

/**
 * Fetches the books.
 * @returns {Function}
 */
export function fetchBooks() {
  return (dispatch) => {
    return getAllBooks()
      .then(
        (books) => dispatch(fetchBooksSuccess(books)),
        (e) => dispatch(fetchBooksFailure(e))
      );
  };
}
export function fetchBooksFailure(error) {
  return { type: BOOK__FETCH.FAILURE, error };
}
export function fetchBooksSuccess(books) {
  return { type: BOOK__FETCH.SUCCESS, books };
}

/**
 * Saves the new or updated book.
 * @param   {module:adapters/book~Book} book  The book to save.
 * @returns {Function}
 */
export function saveBook(book) {
  return (dispatch) => {
    return saveBookAdapter(book)
      .then(
        (b) => dispatch(saveBookSuccess(b)),
        (e) => dispatch(saveBookFailure(e))
      );
  };
}
export function saveBookFailure(error) {
  return { type: BOOK__SAVE.FAILURE, error };
}
export function saveBookSuccess(book) {
  return { type: BOOK__SAVE.SUCCESS, book };
}

/**
 * Saves the deadline of the books as the given date.
 * @param   {Date}      deadline  The date of the deadline.
 * @returns {Function}
 */
export function saveBookDeadline(deadline) {
  return (dispatch) => {
    return saveDeadline(deadline)
      .then(
        (d) => dispatch(saveBookDeadlineSuccess(d)),
        (e) => dispatch(saveBookDeadlineFailure(e))
      );
  };
}
export function saveBookDeadlineFailure(error) {
  return { type: BOOK_DEADLINE__SAVE.FAILURE, error };
}
export function saveBookDeadlineSuccess(deadline) {
  return { type: BOOK_DEADLINE__SAVE.SUCCESS, deadline };
}
