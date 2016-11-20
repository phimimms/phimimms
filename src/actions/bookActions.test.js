import * as types from './actionTypes';
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
                expect(actions[0].type).toEqual(types.LOAD_BOOKS_SUCCESS);
                expect(actions[0].books).toBeA('object');
                expect(actions[0].books.length).toBeA('number');
                done();
            });
    });
});
