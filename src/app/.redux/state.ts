import { UITheme } from 'dictionary/settings';

/**
 * The settings state of the application.
 */
export interface SettingsState {
  uiTheme: UITheme,
}

/**
 * The state of the application.
 */
export interface State {
  readonly settings: SettingsState,
}

/**
 * The initial state of the application.
 */
export const initialState: State = {
  settings: {
    uiTheme: UITheme.Default,
  },
};
