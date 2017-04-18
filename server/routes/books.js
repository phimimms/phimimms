import Book from '../models/Book';
import BookDeadline from '../models/BookDeadline';
import express from 'express';

const deadlineId = 0;
const router = express.Router();

router.route('/books')
    /**
     * Gets all of the books.
     */
    .get((req, res) => {
        Book.find((err, books) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json(books);
        });
    })
    /**
     * Saves the new book.
     */
    .post((req, res) => {
        const book = new Book(req.body);

        book.save((err) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json(book);
        });
    });

router.route('/books/deadline')
    /**
     * Gets the deadline of the books.
     */
    .get((req, res) => {
        BookDeadline.findById(deadlineId, (err, deadline) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json(deadline);
        });
    })
    /**
     * Upserts the deadline of the books.
     */
    .put((req, res) => {
        BookDeadline.findOneAndUpdate({ _id: deadlineId }, req.body, { new: true, upsert: true },
            (err, deadline) => {
                if (err) {
                    return res.status(500).send(err);
                }

                res.json(deadline);
            }
        );
    });

router.route('/books/:id')
    /**
     * Gets the book.
     */
    .get((req, res) => {
        Book.findById(req.params.id, (err, book) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.json(book);
        });
    })
    /**
     * Updates the book.
     */
    .put((req, res) => {
        Book.findById(req.params.id, (err, book) => {
            if (err) {
                return res.status(500).send(err);
            }

            book = Object.assign(book, req.body);

            book.save((err) => {
                if (err) {
                    return res.status(500).send(err);
                }

                res.json(book);
            });
        });
    })
    /**
     * Deletes the book.
     */
    .delete((req, res) => {
        Book.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.send(req.params.id);
        });
    });

export default router;
