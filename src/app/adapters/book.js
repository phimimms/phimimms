/**
 * @module adapters/book
 */

import axios from 'axios';

import { defaultURL } from 'dictionary/network';

/**
 * The entity to represent a book.
 * @typedef   {Object}  Book
 * @property  {string}  authorName        The full name of the book's author.
 * @property  {string}  category          The category of the book.
 * @property  {string}  coverImageURL     The URL to the image of the book's cover art.
 * @property  {number}  currentPageNumber The page number representing the book's reading progression.
 * @property  {number}  firstPageNumber   The page number of the book's first page.
 * @property  {boolean} isKindle          Indicates whether the book is on the Kindle.
 * @property  {number}  lastPageNumber    The page number of the book's last page.
 * @property  {number}  numberOfPages     The length of the book in terms of pages.
 * @property  {number}  rating            The rating of the book.
 * @property  {string}  title             The title of the book.
 */

const url = `${defaultURL}/books`;

/**
 * Sanitizes the values of the given book.
 * @param   {module:adapters/book~Book} book  The book entity.
 * @returns {module:adapters/book~Book}
 */
function sanitizeBook(book) {
  const { authorName, coverImageURL, title } = book;

  book.authorName = authorName.trim();
  book.coverImageURL = encodeURI(coverImageURL.trim());
  book.title = title.trim();

  return book;
}

/**
 * Deletes the book corresponding to the given identifier.
 * @param   {string}  bookId  The identifier of the book to delete.
 * @returns {Promise}
 */
export function deleteBook(bookId) {
  return axios({
    method: 'DELETE',
    url: `${url}/${bookId}`,
  }).then(res => res.data);
}

/**
 * Gets the list of all books.
 * @returns {Promise}
 */
export function getAllBooks() {
  return axios({
    method: 'GET',
    url,
  }).then(res => res.data);
}

/**
 * Gets the deadline of the books.
 * @returns {Promise}
 */
export function getDeadline() {
  return axios({
    method: 'GET',
    url: `${url}/deadline`,
  }).then(res => res.data.date);
}

/**
 * Saves the new or updated book.
 * @param   {module:adapters/book~Book} book  The book to save.
 * @returns {Promise}
 */
export function saveBook(book) {
  book = sanitizeBook({ ...book });

  if (book._id) {
    /* Updates the existing book */
    return axios({
      data: book,
      method: 'PUT',
      url: `${url}/${book._id}`,
    }).then(res => res.data);
  }

  /* Saves the new book */
  return axios({
    data: book,
    method: 'POST',
    url,
  }).then(res => res.data);
}

/**
 * Saves the deadline of the books as the given date.
 * @param   {Date}    date  The new date of the deadline.
 * @returns {Promise}
 */
export function saveDeadline(date) {
  return axios({
    data: { date },
    method: 'PUT',
    url: `${url}/deadline`,
  }).then(res => res.data.date);
}
