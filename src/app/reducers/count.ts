import { Action } from '.redux';
import initialState from '.redux/initialState';
import { COUNT__DECREMENT, COUNT__INCREMENT } from 'dictionary/actionTypes';

export default function count(state: number = initialState.count, { type }: Action): number {
  switch (type) {
    case COUNT__DECREMENT.SUCCESS:
      return state - 1;
    case COUNT__INCREMENT.SUCCESS:
      return state + 1;
    default:
      return state;
  }
}
