import { UITheme } from 'dictionary/settings';
import { Action } from '.redux';
import { initialState, SettingsState } from '.redux/state';
import { UI_THEME__UPDATE } from 'dictionary/actionTypes';

export default function settings(state: SettingsState = initialState.settings, { payload, type }: Action): SettingsState {
  switch (type) {
    case UI_THEME__UPDATE.SUCCESS:
      return {
        ...state,
        uiTheme: payload as UITheme,
      };
    default:
      return state;
  }
}
