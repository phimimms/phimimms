/*
import * as actionTypes from './actionTypes';
import expect from 'expect';
import * as homeActions from './homeActions';
import * as homeViews from '../dictionary/homeViews';
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
        const componentName = homeViews.BOOK_CATALOG;

        const expectedActions = [
            { type: 'SET_HOME_VIEW', componentName }
        ];

        const store = mockStore({ componentName: homeViews.LANDING }, expectedActions);
        store.dispatch(homeActions.setHomeView(componentName))
            .then(
                () => {
                    const actions = store.getActions();
                    expect(actions[0].type).toEqual(actionTypes.SET_HOME_VIEW);
                    expect(actions[0].componentName).toEqual(componentName);
                    done();
                }
            );
    });
});
*/
