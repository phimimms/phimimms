/**
 * @module util/localization
 */

import LocalizedStrings from 'react-localization';

import { articles, directionality } from 'dictionary/language';
import staticText from 'assets/json/staticText';

/**
 * Returns the provided phrase with all articles removed.
 * @param    {string}  phrase        The string from which to remove articles.
 * @param    {string}  languageCode  The code of the application language.
 * @returns  {string}
 */
function removeArticlesFromPhrase(phrase, languageCode) {
  return phrase
    .split(' ')
    .filter((term) => {
      for (const article of articles[languageCode]) {
        if (term.toLowerCase() === article.toLowerCase()) {
          return false;
        }
      }
      return true;
    })
    .join(' ');
}

/**
 * The comparator function to sort alphabetically.
 * @param   {string}  prop            The alias of the property to sort against.
 * @param   {string}  languageCode    The code of the application language.
 * @param   {boolean} [isDescending]  Indicates whether to sort in descending order.
 * @returns {number}
 */
export function compareAlphabetically(prop, languageCode, isDescending = true) {
  return ({ [prop]: propA }, { [prop]: propB }) => {
    propA = removeArticlesFromPhrase(propA, languageCode).toLowerCase();
    propB = removeArticlesFromPhrase(propB, languageCode).toLowerCase();

    if (propA < propB) {
      return isDescending ? -1 : 1;
    }

    if (propA > propB) {
      return isDescending ? 1 : -1;
    }

    return 0;
  };
}

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
