import { getApplicationTokens, getLanguageDirectionality } from 'util/localization';

const tokens = getApplicationTokens();
const languageCode = tokens.getInterfaceLanguage();

export default {
  bookCatalog: {
    /**
     * The list of books to read.
     * @type {Array.<module:adapters/book~Book>}
     */
    books: [],
    /**
     * The string representation of the date by which to complete all of the books.
     * @type {string}
     */
    deadline: null,
  },
  localization: {
    /**
    * The code of the application language.
    * @type {string}
    */
    code: languageCode,
    /**
    * The directionality of the application language.
    * @type {string}
    */
    directionality: getLanguageDirectionality(languageCode),
    /**
    * The localized static text of the application.
    * @type {Object}
    */
    tokens,
  },
};
