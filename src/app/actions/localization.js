import { supportedLanguages } from 'dictionary/language';

import { LANGUAGE__UPDATE } from './actionTypes';

/**
 * Updates the application language to the language corresponding to the given code.
 * @param   {string}    languageCode  The code of the new application language.
 * @returns {Function}
 */
export function updateLanguage(languageCode) {
  return (dispatch) => {
    return new Promise((resolve) => {
      if (~Object.keys(supportedLanguages).indexOf(languageCode)) {
        /* Supported language */
        return resolve(dispatch(updateLanguageSuccess(languageCode)));
      }
      /* Unsupported language */
      return resolve(dispatch(updateLanguageFailure(languageCode)));
    });
  };
}
function updateLanguageFailure(languageCode) {
  return { type: LANGUAGE__UPDATE.FAILURE, languageCode };
}
function updateLanguageSuccess(languageCode) {
  return { type: LANGUAGE__UPDATE.SUCCESS, languageCode };
}
