/**
 * The set of action type derivatives.
 */
export interface ActionType {
  readonly FAILURE: string;
  readonly REQUEST: string;
  readonly SUCCESS: string;
}

/**
 * Creates an action type.
 * @param actionName  The name of the action type.
 */
function createActionType(actionName: string): ActionType {
  return {
    FAILURE: `${actionName}__FAILURE`,
    REQUEST: `${actionName}__REQUEST`,
    SUCCESS: `${actionName}__SUCCESS`,
  };
}

export const COUNT__DECREMENT = createActionType('COUNT__DECREMENT');
export const COUNT__INCREMENT = createActionType('COUNT__INCREMENT');
