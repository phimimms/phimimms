import * as actionTypes from '../actions/actionTypes';
import * as homeViews from '../dictionary/homeViews';
import initialState from './initialState';

export default function homeReducer(state = initialState.home, action) {
    switch(action.type) {
        case actionTypes.SET_HOME_VIEW:
            return setHomeView(state, action.componentName);
        default:
            return state;
    }
}

/**
 * Sets the component representing the Home view.
 * @param {Object}  state           The home state
 * @param {String}  componentName   The name of the component
 */
function setHomeView(state, componentName) {
    switch (componentName) {
        case homeViews.BOOK_CATALOG:
        case homeViews.LANDING:
            return Object.assign({}, state, { componentName });
        default:
            return state;
    }
}
