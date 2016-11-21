import bookReducer from './bookReducer';
import expect from 'expect';
import * as actions from '../actions/bookActions';

describe('Book Reducer', () => {
    it('Load Books', () => {
        const initialState = [];
        const books = [
            {title: 'a'},
            {title: 'b'}
        ];

        const action = actions.loadBooksSuccess(books);

        const newState = bookReducer(initialState, action);

        expect(newState.length).toEqual(2);
        expect(newState[0].title).toEqual('a');
        expect(newState[1].title).toEqual('b');
    });

    it('Save New Book', () => {
        const initialState = [
            { id: 'batman' },
            { id: 'joker' }
        ];
        const newBook = {
            id: 'robin'
        };

        const action = actions.saveBookSuccess(newBook);

        const newState = bookReducer(initialState, action);

        expect(newState.length).toEqual(3);
        expect(newState[2].id).toEqual(newBook.id);
    });

    it('Save Existing Book', () => {
        const initialState = [
            { id: 'batman' },
            { id: 'joker' },
            { id: 'robin' }
        ];
        const newBook = {
            id: 'joker',
            title: 'why so serious'
        };

        const action = actions.saveBookSuccess(newBook);

        const newState = bookReducer(initialState, action);

        expect(newState.length).toEqual(3);
        expect(newState[1].id).toEqual(newBook.id);
        expect(newState[1].title).toEqual(newBook.title);
    });
});
