import { createAction } from '.redux';
import { COUNT__DECREMENT, COUNT__INCREMENT } from 'dictionary/actionTypes';

/**
 * Decrements the count of the application.
 */
export const decrementCount = createAction({ type: COUNT__DECREMENT });

/**
 * Increments the count of the application.
 */
export const incrementCount = createAction({ type: COUNT__INCREMENT });
