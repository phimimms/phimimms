/**
 * @module reducers/localization
 */

import moment from 'moment';

import { LANGUAGE__UPDATE } from 'dictionary/action';
import initialState from 'store/initialState';
import { getApplicationTokens, getLanguageDirectionality } from 'util/localization';

export default function localization(state = initialState.localization, { error, payload, type }) {
  switch (type) {
    case LANGUAGE__UPDATE.FAILURE:
      console.warn(`Unsupported language: ${error}`);
      return state;
    case LANGUAGE__UPDATE.SUCCESS:
      return updateLocalizationState(payload);
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
  moment.locale(code);

  return { code, directionality, tokens };
}
