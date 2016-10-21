import delay from './delay';

const books = [
  {
    id: "batman-year-one",
    title: "Batman: Year One",
    authorId: "frank-miller",
    length: "136",
    progress: 0
  },
  {
    id: "batman-long-halloween",
    title: "Batman: The Long Halloween",
    authorId: "jeph-loeb",
    length: "384",
    progress: 0
  },
  {
    id: "batman-death-in-family",
    title: "Batman: A Death in the Family",
    authorId: "jim-starlin",
    length: "272",
    progress: 0
  },
  {
    id: "batman-killing-joke",
    title: "Batman: The Killing Joke",
    authorId: "alan-moore",
    length: "64",
    progress: 0
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class BookApi {
  static getAllBooks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], books));
      }, delay);
    });
  }

  static saveBook(book) {
    book = Object.assign({}, book); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minBookTitleLength = 1;
        if (book.title.length < minBookTitleLength) {
          reject(`Title must be at least ' + minBookTitleLength + ' characters.`);
        }

        if (book.id) {
          const existingBookIndex = books.findIndex(a => a.id == book.id);
          books.splice(existingBookIndex, 1, book);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new books in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          book.id = generateId(book);
          books.push(book);
        }

        resolve(book);
      }, delay);
    });
  }

  static deleteBook(bookId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfBookToDelete = books.findIndex(book => {
          book.id === bookId;
        });
        books.splice(indexOfBookToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default BookApi;
