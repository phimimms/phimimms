import { createAction } from '.redux';
import { UI_THEME__UPDATE } from 'dictionary/actionTypes';
import { UITheme } from 'dictionary/settings';

/**
 * Updates the UI theme of the application.
 */
export const updateUITheme: (uiTheme: UITheme) => Promise<UITheme> = createAction<[ UITheme ], UITheme>({
  getPayload: (uiTheme: UITheme): Promise<UITheme> => Promise.resolve(uiTheme),
  type: UI_THEME__UPDATE,
});
