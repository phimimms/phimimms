/**
 * @module util/localization
 */

import LocalizedStrings from 'react-localization';

import { directionality } from 'dictionary/language';
import staticText from 'assets/json/staticText';

/**
 * Returns the localized static text of the application.
 * @returns {Object}
 */
export function getApplicationTokens() {
  return new LocalizedStrings(staticText);
}

/**
 * Returns the directionality of the language corresponding to the given code.
 * @param   {string}  code  The language code.
 * @returns {string}
 */
export function getLanguageDirectionality(code) {
  switch (code) {
    default:
      return directionality.ltr;
  }
}
