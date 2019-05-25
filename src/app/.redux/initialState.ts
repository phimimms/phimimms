/**
 * The state of the application.
 */
export interface State {
  readonly count: number,
}

/**
 * The initial state of the application.
 */
export default {
  count: 0,
} as State;
