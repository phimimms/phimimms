import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    /**
     * The full name of the book's author.
     */
    authorName: String,
    /**
     * Indicates whether the book is on the Kindle.
     */
    isKindle:   Boolean,
    /**
     * The number of pages in the book.
     */
    length:     Number,
    /**
     * The reading completion of the book.
     * If the book is on the Kindle, the value is expressed as a percentage [0, 100].
     * Otherwise the value is the current page of the book's reading progression.
     */
    progress:   Number,
    /**
     * The title of the book.
     */
    title:      String
});

export default mongoose.model('Book', bookSchema);
