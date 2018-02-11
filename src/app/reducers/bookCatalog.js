/**
 * @module reducers/bookCatalog
 */

import {
  BOOK__DELETE,
  BOOK__FETCH,
  BOOK__SAVE,
  BOOK_DEADLINE__FETCH,
  BOOK_DEADLINE__SAVE,
} from 'dictionary/action';
import initialState from 'store/initialState';

export default function bookCatalog(state = initialState.bookCatalog, { payload, type }) {
  switch(type) {
    case BOOK__DELETE.SUCCESS:
      return deleteBook(state, payload);
    case BOOK__FETCH.SUCCESS:
      return Object.assign({}, state, { books: payload });
    case BOOK__SAVE.SUCCESS:
      return saveBook(state, payload);
    case BOOK_DEADLINE__FETCH.REQUEST:
      return Object.assign({}, state, { deadline: null });
    case BOOK_DEADLINE__FETCH.SUCCESS:
    case BOOK_DEADLINE__SAVE.SUCCESS:
      return Object.assign({}, state, { deadline: payload });
    default:
      return state;
  }
}

/**
 * Deletes the book from the state.
 * @param   {Object}  state   The book catalog state.
 * @param   {string}  bookId  The identifier of the book to delete.
 * @returns {Object}
 */
function deleteBook(state, bookId) {
  const { books } = state;
  const bookIndex = books.findIndex(b => b._id === bookId);

  if (~bookIndex) {
    /* Removes the entry from the list */
    return Object.assign({}, state, {
      books: books.slice(0, bookIndex).concat(books.slice(bookIndex + 1)),
    });
  }

  return state;
}

/**
 * Updates the state with the new or updated book.
 * @param   {Object}                    state   The book state.
 * @param   {module:adapters/book~Book} newBook The new/updated book.
 * @returns {Object}
 */
function saveBook(state, newBook) {
  const { books } = state;
  const bookIndex = books.findIndex(b => b._id === newBook._id);

  if (~bookIndex) {
    /* Updates the existing entry in the list */
    return Object.assign({}, state, {
      books: books.slice(0, bookIndex).concat(newBook, books.slice(bookIndex + 1)),
    });
  }

  /* Adds the book to the list */
  return Object.assign({}, state, { books: [...books, newBook] });
}
