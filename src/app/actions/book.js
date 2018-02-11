/**
 * @module actions/book
 */

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
} from 'dictionary/action';

import { createAction } from 'util/action';

/**
 * Deletes the book corresponding to the given identifier.
 * @param   {string}    bookId  The identifier of the book to delete.
 * @returns {Function}
 */
export function deleteBook(bookId) {
  return createAction(BOOK__DELETE, () => deleteBookAdapter(bookId));
}

/**
 * Fetches the deadline of the books.
 * @returns {Function}
 */
export function fetchBookDeadline() {
  return createAction(BOOK_DEADLINE__FETCH, () => getDeadline());
}

/**
 * Fetches the books.
 * @returns {Function}
 */
export function fetchBooks() {
  return createAction(BOOK__FETCH, () => getAllBooks());
}

/**
 * Saves the new or updated book.
 * @param   {module:adapters/book~Book} book  The book to save.
 * @returns {Function}
 */
export function saveBook(book) {
  return createAction(BOOK__SAVE, () => saveBookAdapter(book));
}

/**
 * Saves the deadline of the books as the given date.
 * @param   {Date}      deadline  The date of the deadline.
 * @returns {Function}
 */
export function saveBookDeadline(deadline) {
  return createAction(BOOK_DEADLINE__SAVE, () => saveDeadline(deadline));
}
