import axios from 'axios';

/**
 * The entity to represent a book.
 * @typedef     {Object}    bookApi~Book
 * @property    {String}    authorName  The full name of the book's author
 * @property    {Boolean}   isKindle    Indicates whether the book is on the Kindle
 * @property    {Number}    length      The number of pages in the books
 * @property    {Number}    progress    The reading completion of the book
 * @property    {String}    title       The title of the book
 */

const { protocol, hostname, port } = window.location;

const url = `${protocol}//${hostname}:${port}/api/books`;

/**
 * Deletes the book corresponding to the given identifier.
 * @param   {String}    bookId  The identifier of the book to delete
 * @return  {Promise}
 */
export const deleteBook = function(bookId) {
    return axios({
        method: 'DELETE',
        url: `${url}/${bookId}`
    }).then(
        (res) => {
            return res.data;
        }
    );
};

/**
 * Gets the list of all books.
 * @return {Promise}
 */
export const getAllBooks = function() {
    return axios({
        method: 'GET',
        url
    }).then(
        (res) => {
            return res.data;
        }
    );
};

/**
 * Gets the deadline of the books.
 * @return {Promise}
 */
export const getDeadline = function() {
    return axios({
        method: 'GET',
        url: `${url}/deadline`
    }).then(
        (res) => {
            return new Date(res.data.date);
        }
    );
};

/**
 * Saves the new or updated book.
 * @param   {module:bookApi~Book}   book    The book to save
 * @return  {Promise}
 */
export const saveBook = function(book) {
    book = Object.assign({}, book);

    if (book._id) {
        /* Updates the existing book */
        return axios({
            data: book,
            method: 'PUT',
            url: `${url}/${book._id}`
        }).then(
            (res) => {
                return res.data;
            }
        );
    }

    /* Saves the new book */
    return axios({
        data: Object.assign(book, { progress: 0 }),
        method: 'POST',
        url
    }).then(
        (res) => {
            return res.data;
        }
    );
};

/**
 * Saves the deadline of the books as the specified date.
 * @param   {Date}      date    The new date of the deadline
 * @return  {Promise}
 */
export const saveDeadline = function(date) {
    return axios({
        data: { date },
        method: 'PUT',
        url: `${url}/deadline`
    }).then(
        (res) => {
            return new Date(res.data.date);
        }
    );
};
