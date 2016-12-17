import * as actionTypes from './actionTypes';
import expect from 'expect';
import * as homeActions from './homeActions';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Home Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('setHomeView() Dispatches SET_HOME_VIEW Action', (done) => {
        const component = 'newHomeView';

        const expectedActions = [
            { type: 'SET_HOME_VIEW', component }
        ];

        const store = mockStore({home: {}}, expectedActions);
        store.dispatch(homeActions.setHomeView(component))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(actionTypes.SET_HOME_VIEW);
                expect(actions[0].component).toEqual(component);
                done();
            });
    });
});
