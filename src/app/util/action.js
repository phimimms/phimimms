/**
 * @module util/action
 */

/**
 * Creates the function to dispatch all action type derivatives for the given action.
 * @param   {Object}    type    The action type.
 * @param   {Function}  action  The action function.
 * @returns {Function}
 */
export function createAction(type, action) {
  return (dispatch) => {
    return (
      new Promise((res) => {
        dispatch({ type: type.REQUEST });

        return res(action());
      })
    ).then(
      (payload) => dispatch({ type: type.SUCCESS, payload }),
      (error) => dispatch({ type: type.FAILURE, error })
    );
  };
}

/**
 * Creates the failure, request, and success type derivatives for the given action identifier.
 * @param   {string}  id  The identifier of the action.
 * @returns {Object}
 */
export function createActionType(id) {
  return {
    FAILURE: `${id}__FAILURE`,
    REQUEST: `${id}__REQUEST`,
    SUCCESS: `${id}__SUCCESS`,
  };
}
