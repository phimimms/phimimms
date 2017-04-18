import * as actionTypes from './actionTypes';

/**
 * Sets the component representing the home view.
 * @param   {String}    componentName The name of the component
 * @return  {Function}
 */
export function setHomeView(componentName) {
    return (dispatch) => {
        return new Promise((resolve) => {
            dispatch(setHomeViewSuccess(componentName));
            resolve();
        });
    };
}
export function setHomeViewSuccess(componentName) {
    return { type: actionTypes.SET_HOME_VIEW, componentName };
}
