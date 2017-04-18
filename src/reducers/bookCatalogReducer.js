import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function bookCatalogReducer(state = initialState.bookCatalog, action) {
    switch(action.type) {
        case actionTypes.DELETE_BOOK_SUCCESS:
            return deleteBook(state, action.bookId);
        case actionTypes.LOAD_BOOKS_SUCCESS:
            return Object.assign({}, state, { books: action.books });
        case actionTypes.SAVE_BOOK_SUCCESS:
            return saveBook(state, action.book);
        case actionTypes.LOAD_BOOK_DEADLINE_SUCCESS:
        case actionTypes.SAVE_BOOK_DEADLINE_SUCCESS:
            return Object.assign({}, state, { deadline: action.deadline });
        default:
            return state;
    }
}

/**
 * Deletes the book from the state.
 * @param   {Object}    state   The book state
 * @param   {String}    bookId  The identifier of the book to delete
 */
function deleteBook(state, bookId) {
    const { books } = state;
    const bookIndex = books.findIndex(b => b._id === bookId);

    if (~bookIndex) {
        /* Removes the entry from the list */
        return Object.assign({}, state, {
            books: books.slice(0, bookIndex).concat(books.slice(bookIndex + 1))
        });
    }

    return state;
}

/**
 * Updates the state with the new or updated book.
 * @param   {Object}                state   The book state
 * @param   {module:bookApi~Book}   newBook The new/updated book
 */
function saveBook(state, newBook) {
    const { books } = state;
    const bookIndex = books.findIndex(b => b._id === newBook._id);

    if (~bookIndex) {
        /* Updates the existing entry in the list */
        return Object.assign({}, state, {
            books: books.slice(0, bookIndex).concat(newBook, books.slice(bookIndex + 1))
        });
    }

    /* Adds the book to the list */
    return Object.assign({}, state, { books: [...books, newBook] });
}
