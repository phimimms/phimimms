/*
import * as bookActions from '../actions/bookActions';
import expect from 'expect';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import { createStore } from 'redux';

describe('Store', () => {
    it('Save New Book', () => {
        const store = createStore(rootReducer, initialState);

        const book = {
            title: 'Dune'
        };

        const action = bookActions.saveBookSuccess(book);
        store.dispatch(action);

        const actual = store.getState().books[0];

        expect(actual).toEqual(book);
        expect(actual.id).toExist();
    });
});
*/
