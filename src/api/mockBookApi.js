/**
 * The mock book data.
 * @type {Array.<module:bookApi~Book>}
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
 * @param {module:bookApi~Book} book    The book entity
 */
const generateId = function(book) {
    return book.title.replace(new RegExp(' ', 'g'), '-');
};

export default class BookApi {
    /**
     * Deletes the book corresponding to the given identifier value.
     * @param   {String}    bookId  The identifier of the book to delete
     * @return  {Promise}
     */
    static deleteBook(bookId) {
        return new Promise((resolve, reject) => {
            const indexOfBookToDelete = books.findIndex(book => book.id === bookId);

            if (~indexOfBookToDelete) {
                return reject(`A book with the identifier '${bookId}' does not exist.`);
            }

            books.splice(indexOfBookToDelete, 1);
            resolve();
        });
    }

    /**
     * Gets the list of all books.
     * @return {Promise}
     */
    static getAllBooks() {
        return new Promise((resolve) => {
            resolve(Object.assign([], books));
        });
    }

    /**
     * Saves the given book to the list.
     * If the book is new to the list, then it is added to the list.
     * If the book is in the list, then its entry is updated with the given entity.
     * @param   {module:bookApi~Book}   book    The book entity to save
     * @return  {Promise}
     */
    static saveBook(book) {
        book = Object.assign({}, book);

        return new Promise((resolve, reject) => {
            const minBookTitleLength = 1;
            if (book.title.length < minBookTitleLength) {
                return reject(`Title must be at least ${minBookTitleLength} characters.`);
            }

            let bookIndex = books.length;

            if (book.id) {
                /* Replaces the corresponding entry with the updated book entity */
                bookIndex = books.findIndex(a => a.id == book.id);
                if (~bookIndex) {
                    return reject(`A book with the identifier '${book.id}' does not exist.`);
                }
            } else {
                /* Adds the new book */
                book.id = generateId(book);
            }

            /* Updates the book list */
            books.splice(bookIndex, 1, book);

            resolve(book);
        });
    }
}
