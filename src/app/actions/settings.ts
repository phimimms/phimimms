import { createAction } from '.redux';
import { UI_THEME__UPDATE } from 'dictionary/actionTypes';
import { UITheme } from 'dictionary/settings';

export const updateUITheme = createAction({
  getPayload: (uiTheme: UITheme): Promise<UITheme> => Promise.resolve(uiTheme),
  type: UI_THEME__UPDATE,
});
