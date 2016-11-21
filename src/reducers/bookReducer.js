import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function bookReducer(state = initialState.books, action) {
    switch(action.type) {
        case actionTypes.LOAD_BOOKS_SUCCESS:
            return action.books;
        case actionTypes.SAVE_BOOK_SUCCESS:
            return addOrUpdateBook(state, action.book);
        default:
            return state;
    }
}

function addOrUpdateBook(books, newBook) {
    const bookIndex = books.findIndex(b => b.id === newBook.id);

    if (~bookIndex) {
        /* Updates the existing entry in the list */
        return books.slice(0, bookIndex).concat(newBook, books.slice(bookIndex + 1));
    }

    /* Adds the book to the list */
    return [...books, newBook];
}
