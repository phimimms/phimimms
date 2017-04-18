import * as bookActions from '../actions/bookActions';
import expect from 'expect';
import * as homeActions from '../actions/homeActions';
import * as homeViews from '../dictionary/homeViews';
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

        const actual = store.getState().bookCatalog.books[0];

        expect(actual).toEqual(book);
    });

    it('Save Existing Book', () => {
        const store = createStore(rootReducer, initialState);

        const book = {
            title: 'Dune'
        };

        let action = bookActions.saveBookSuccess(book);
        store.dispatch(action);

        const newBook = {
            authorId: 'frank-herbert',
            title: 'Dune'
        };

        action = bookActions.saveBookSuccess(newBook);
        store.dispatch(action);

        const actual = store.getState().bookCatalog.books[0];

        expect(actual).toEqual(newBook);
    });

    it('Set Home View', () => {
        const store = createStore(rootReducer, initialState);

        const componentName = homeViews.BOOK_CATALOG;

        let action = homeActions.setHomeViewSuccess(componentName);
        store.dispatch(action);

        const actual = store.getState().home.componentName;

        expect(actual).toEqual(componentName);
    });
});
