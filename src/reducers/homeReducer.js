import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function bookReducer(state = initialState.home, action) {
    switch(action.type) {
        case actionTypes.SET_HOME_VIEW:
            return Object.assign({}, state, { component: action.component });
        default:
            return state;
    }
}
