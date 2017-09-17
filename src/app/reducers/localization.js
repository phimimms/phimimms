import { LANGUAGE__UPDATE } from 'actions/actionTypes';
import initialState from 'store/initialState';
import { getApplicationTokens, getLanguageDirectionality } from 'util/localization';

export default function localization(state = initialState.localization, action) {
  switch (action.type) {
    case LANGUAGE__UPDATE.FAILURE:
      console.warn(`Unsupported language: ${action.languageCode}`);
      return state;
    case LANGUAGE__UPDATE.SUCCESS:
      return updateLocalizationState(action.languageCode);
    default:
      return state;
  }
}

/**
 * Returns the state representing the new language.
 * @param   {string}  code  The code corresponding to the new language.
 * @returns {Object}
 */
function updateLocalizationState(code) {
  const directionality = getLanguageDirectionality(code);
  const tokens = getApplicationTokens();

  tokens.setLanguage(code);

  return { code, directionality, tokens };
}
