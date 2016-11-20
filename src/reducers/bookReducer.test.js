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
});
