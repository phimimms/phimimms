/**
 * @module actions/localization
 */

import { LANGUAGE__UPDATE } from 'dictionary/action';
import { supportedLanguages } from 'dictionary/language';
import { createAction } from 'util/action';

/**
 * Updates the application language to the language corresponding to the given code.
 * @param   {string}    languageCode  The code of the new application language.
 * @returns {Function}
 */
export function updateLanguage(languageCode) {
  return createAction(LANGUAGE__UPDATE, () => {
    return new Promise((resolve, reject) => {
      if (~Object.keys(supportedLanguages).indexOf(languageCode)) {
        /* Supported language */
        return resolve(languageCode);
      }
      /* Unsupported language */
      return reject(languageCode);
    });
  });
}
