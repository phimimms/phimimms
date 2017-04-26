import bookCatalogReducer from './bookCatalogReducer';
import expect from 'expect';
import * as actions from '../actions/bookActions';

describe('Book Catalog Reducer', () => {
    it('Load Books', () => {
        const initialState = {
            books: []
        };
        const books = [
            { title: 'a' },
            { title: 'b' }
        ];

        const action = actions.fetchBooksSuccess(books);

        const newState = bookCatalogReducer(initialState, action);

        expect(newState.books.length).toEqual(2);
        expect(newState.books[0].title).toEqual('a');
        expect(newState.books[1].title).toEqual('b');
    });

    it('Save New Book', () => {
        const initialState = {
            books: [
                { _id: 'batman' },
                { _id: 'joker' }
            ]
        };
        const newBook = {
            _id: 'robin'
        };

        const action = actions.saveBookSuccess(newBook);

        const newState = bookCatalogReducer(initialState, action);

        expect(newState.books.length).toEqual(3);
        expect(newState.books[2]._id).toEqual(newBook._id);
    });

    it('Save Existing Book', () => {
        const initialState = {
            books: [
                { _id: 'batman' },
                { _id: 'joker' },
                { _id: 'robin' }
            ]
        };
        const newBook = {
            _id: 'joker',
            title: 'why so serious'
        };

        const action = actions.saveBookSuccess(newBook);

        const newState = bookCatalogReducer(initialState, action);

        expect(newState.books.length).toEqual(3);
        expect(newState.books[1]._id).toEqual(newBook._id);
        expect(newState.books[1].title).toEqual(newBook.title);
    });
});
