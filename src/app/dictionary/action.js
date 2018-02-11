/**
 * @module dictionary/action
 */

import { createActionType } from 'util/action';

/* book */
export const BOOK__DELETE = createActionType('BOOK__DELETE');

export const BOOK__FETCH = createActionType('BOOK__FETCH');

export const BOOK__SAVE = createActionType('BOOK__SAVE');

export const BOOK_DEADLINE__FETCH = createActionType('BOOK_DEADLINE__FETCH');

export const BOOK_DEADLINE__SAVE = createActionType('BOOK_DEADLINE__SAVE');

/* localization */
export const LANGUAGE__UPDATE = createActionType('LANGUAGE__UPDATE');
