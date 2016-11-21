import * as actionTypes from './actionTypes';
import * as bookActions from './bookActions';
import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Book Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('loadBooks() Dispatches LOAD_BOOKS_SUCCESS Action on Success', (done) => {
        const expectedActions = [
            { type: 'LOAD_BOOKS_SUCCESS' }
        ];

        const store = mockStore({books: []}, expectedActions);
        store.dispatch(bookActions.loadBooks())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(actionTypes.LOAD_BOOKS_SUCCESS);
                expect(actions[0].books).toBeA('object');
                expect(actions[0].books.length).toBeA('number');
                done();
            });
    });

    it('saveBook() Dispatches SAVE_BOOK_SUCCESS Action on Success', (done) => {
        const book = {
            title: 'batman'
        };
        const expectedActions = [
            { type: 'SAVE_BOOK_SUCCESS' }
        ];

        const store = mockStore({books: []}, expectedActions);
        store.dispatch(bookActions.saveBook(book))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(actionTypes.SAVE_BOOK_SUCCESS);
                expect(actions[0].book.id).toBeA('string');
                expect(actions[0].book.title).toEqual(book.title);
                done();
            });
    });
});
