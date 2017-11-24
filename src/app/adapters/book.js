/**
 * @module adapters/book
 */

import axios from 'axios';

import { defaultURL } from 'dictionary/network';

/**
 * The entity to represent a book.
 * @typedef   {Object}  Book
 * @property  {String}  authorName        The full name of the book's author.
 * @property  {Number}  currentPageNumber The page number representing the book's reading progression.
 * @property  {Number}  firstPageNumber   The page number of the book's first page.
 * @property  {Boolean} isKindle          Indicates whether the book is on the Kindle.
 * @property  {Number}  lastPageNumber    The page number of the book's last page.
 * @property  {Number}  length            The number of pages in the books.
 * @property  {String}  title             The title of the book.
 */

const url = `${defaultURL}/books`;

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
  }).then(res => new Date(res.data.date));
}

/**
 * Saves the new or updated book.
 * @param   {module:adapters/book~Book} book  The book to save.
 * @returns {Promise}
 */
export function saveBook(book) {
  book = Object.assign({}, book);

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
  }).then(res => new Date(res.data.date));
}
