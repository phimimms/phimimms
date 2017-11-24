/**
 * Creates the failure, request, and success type derivatives for the given action type.
 * @param   {string}  type  The action type.
 * @returns {Object}
 */
function createActionType(type) {
  return {
    FAILURE: `${type}__FAILURE`,
    REQUEST: `${type}__REQUEST`,
    SUCCESS: `${type}__SUCCESS`,
  };
}

/* book */
export const BOOK__DELETE = createActionType('BOOK__DELETE');

export const BOOK__FETCH = createActionType('BOOK__FETCH');

export const BOOK__SAVE = createActionType('BOOK__SAVE');

export const BOOK_DEADLINE__FETCH = createActionType('BOOK_DEADLINE__FETCH');

export const BOOK_DEADLINE__SAVE = createActionType('BOOK_DEADLINE__SAVE');

/* localization */
export const LANGUAGE__UPDATE = createActionType('LANGUAGE__UPDATE');
