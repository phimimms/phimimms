import * as actionTypes from './actionTypes';

export function setHomeView(component) {
    return function(dispatch) {
        return new Promise(function(resolve) {
            dispatch({type: actionTypes.SET_HOME_VIEW, component});
            resolve();
        });
    };
}
