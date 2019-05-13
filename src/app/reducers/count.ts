import { COUNT__DECREMENT, COUNT__INCREMENT } from 'dictionary/actionTypes';
import { Action } from 'redux/configure';
import initialState from 'redux/initialState';

export default function count(state: number = initialState.count, { type }: Action) {
  switch (type) {
    case COUNT__DECREMENT.SUCCESS:
      return state - 1;
    case COUNT__INCREMENT.SUCCESS:
      return state + 1;
    default:
      return state;
  }
}
