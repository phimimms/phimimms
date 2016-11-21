import * as bookActions from '../actions/bookActions';
import expect from 'expect';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import { createStore } from 'redux';

describe('Store', () => {
    it('Save New Book', () => {
        const store = createStore(rootReducer, initialState);

        const book = {
            id: 'Dune'
        };

        const action = bookActions.saveBookSuccess(book);
        store.dispatch(action);

        const actual = store.getState().books[0];

        expect(actual).toEqual(book);
    });

    it('Save Existing Book', () => {
        const store = createStore(rootReducer, initialState);

        const book = {
            id: 'Dune'
        };

        let action = bookActions.saveBookSuccess(book);
        store.dispatch(action);

        const newBook = {
            id: 'Dune',
            authorId: 'frank-herbert'
        };

        action = bookActions.saveBookSuccess(newBook);
        store.dispatch(action);

        const actual = store.getState().books[0];

        expect(actual).toEqual(newBook);
    });
});
