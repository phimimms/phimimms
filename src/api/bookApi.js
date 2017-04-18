import rest from './rest';

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
    return rest({
        method: 'DELETE',
        url: `${url}/${bookId}`
    });
};

/**
 * Gets the list of all books.
 * @return {Promise}
 */
export const getAllBooks = function() {
    return rest({
        method: 'GET',
        url
    });
};

/**
 * Gets the deadline of the books.
 * @return {Promise}
 */
export const getDeadline = function() {
    return rest({
        method: 'GET',
        url: `${url}/deadline`
    }).then((deadline) => {
        if (!deadline) {
            return null;
        }
        return new Date(deadline.date);
    });
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
        return rest({
            data: book,
            method: 'PUT',
            url: `${url}/${book._id}`
        });
    }

    /* Saves the new book */
    return rest({
        data: Object.assign(book, { progress: 0 }),
        method: 'POST',
        url
    });
};

/**
 * Saves the deadline of the books as the specified date.
 * @param   {Date}      date    The new date of the deadline
 * @return  {Promise}
 */
export const saveDeadline = function(date) {
    return rest({
        data: { date },
        method: 'PUT',
        url: `${url}/deadline`
    }).then((deadline) => {
        return new Date(deadline.date);
    });
};
