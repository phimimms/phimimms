import { createAction } from '.redux';
import { COUNT__DECREMENT, COUNT__INCREMENT } from 'dictionary/actionTypes';

export const decrementCount = createAction({ type: COUNT__DECREMENT });

export const incrementCount = createAction({ type: COUNT__INCREMENT });
