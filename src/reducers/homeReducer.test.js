import * as actions from '../actions/homeActions';
import homeReducer from './homeReducer';
import * as homeViews from '../dictionary/homeViews';
import expect from 'expect';

describe('Home Reducer', () => {
    it('Set Home View', () => {
        const initialState = {
            componentName: homeViews.LANDING
        };

        const componentName = homeViews.BOOK_CATALOG;

        const action = actions.setHomeViewSuccess(componentName);

        const newState = homeReducer(initialState, action);

        expect(newState.componentName).toEqual(componentName);
    });
});
