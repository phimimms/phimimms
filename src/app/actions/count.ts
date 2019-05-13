import { COUNT__DECREMENT, COUNT__INCREMENT} from 'dictionary/actionTypes'
import { createAction } from 'redux/configure';

export const decrementCount = createAction(COUNT__DECREMENT);

export const incrementCount = createAction(COUNT__INCREMENT);
