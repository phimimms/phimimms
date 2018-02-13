/**
 * @module dictionary/language
 */

/**
 * The map of language codes to their list of article terms in its respective language.
 * @readonly
 * @type  {Object}
 */
export const articles = {
  en: [
    'a',
    'an',
    'the',
  ],
};

/**
 * An enum of language directionalities.
 * @readonly
 * @type  {Object}
 */
export const directionality = {
  ltr: 'ltr',
  rtl: 'rtl',
};

/**
 * The map of supported language codes to their localized name.
 * @readonly
 * @type  {Object}
 */
export const supportedLanguages = {
  en: 'English',
};
