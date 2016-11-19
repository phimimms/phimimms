import delay from './delay';

/**
 * The entity to represent a book
 * @typedef     {Object}    mockBookApi~Book
 * @property    {String}    id          The identifier of the book
 * @property    {String}    title       The title of the book
 * @property    {String}    authorId    The identifier of the book's author
 * @property    {Number}    length      The number of pages in the books
 * @property    {Number}    progress    The reading completion percentage
 */

/**
 * The mock book data
 * @type {Array.<module:mockBookApi~Book>}
 */
const books = [
    {
        id: "batman-year-one",
        title: "Batman: Year One",
        authorId: "frank-miller",
        length: 136,
        progress: 0
    },
    {
        id: "batman-long-halloween",
        title: "Batman: The Long Halloween",
        authorId: "jeph-loeb",
        length: 384,
        progress: 0
    },
    {
        id: "batman-death-in-family",
        title: "Batman: A Death in the Family",
        authorId: "jim-starlin",
        length: 272,
        progress: 0
    },
    {
        id: "batman-killing-joke",
        title: "Batman: The Killing Joke",
        authorId: "alan-moore",
        length: 64,
        progress: 0
    }
];

/**
 * Generates a book's identifier based on its title.
 * @param {module:mockBookApi~Book} book    The book entity
 */
const generateId = (book) => {
    return book.title.replace(new RegExp(' ', 'g'), '-');
};

class BookApi {
    /**
     * Deletes the book corresponding to the given identifier value.
     * @param   {String}    bookId  The identifier of the book to delete
     * @return  {Promise}
     */
    static deleteBook(bookId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfBookToDelete = books.findIndex(book => {
                    book.id === bookId;
                });

                if (~indexOfBookToDelete) {
                    reject(`A book with the identifier '${bookId}' does not exist.`);
                }

                books.splice(indexOfBookToDelete, 1);
                resolve();
            }, delay);
        });
    }

    /**
     * Gets the list of all books.
     * @return {Promise}
     */
    static getAllBooks() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], books));
            }, delay);
        });
    }

    /**
     * Saves the given book to the list.
     * If the book is new to the list, then it is added to the list.
     * If the book is in the list, then its entry is updated with the given entity.
     * @param   {module:mockBookApi~Book}   book    The book entity to save
     * @return  {Promise}
     */
    static saveBook(book) {
        book = Object.assign({}, book);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const minBookTitleLength = 1;
                if (book.title.length < minBookTitleLength) {
                    reject(`Title must be at least ${minBookTitleLength} characters.`);
                }

                if (book.id) {
                    /* Replaces the corresponding entry with the updated book data */
                    const existingBookIndex = books.findIndex(a => a.id == book.id);
                    books.splice(existingBookIndex, 1, book);
                } else {
                    /* Adds the new book */
                    book.id = generateId(book);
                    books.push(book);
                }

                resolve(book);
            }, delay);
        });
    }
}

export default BookApi;
