import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  /**
   * The full name of the book's author.
   */
  authorName: String,
  /**
   * The page number representing the book's reading progression.
   * If the book is on the Kindle, the value is expressed as a percentage [0, 100].
   */
  currentPageNumber: Number,
  /**
   * The page number of the book's first page.
   * If the book is on the Kindle, the value is expressed as a percentage [0, 100].
   */
  firstPageNumber: Number,
  /**
   * Indicates whether the book is on the Kindle.
   */
  isKindle: Boolean,
  /**
   * The page number of the book's last page.
   * If the book is on the Kindle, the value is expressed as a percentage [0, 100].
   */
  lastPageNumber: Number,
  /**
   * The length of the book.
   */
  length: Number,
  /**
   * The title of the book.
   */
  title: String,
});

export default mongoose.model('Book', bookSchema);
