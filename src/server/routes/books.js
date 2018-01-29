import express from 'express';

import Book from '../models/Book';
import BookDeadline from '../models/BookDeadline';

const deadlineId = 0;
const router = express.Router(); // eslint-disable-line babel/new-cap

router.route('/books')
  /**
   * Gets all of the books.
   */
  .get((req, res) => {
    Book.find((error, books) => {
      if (error) {
        return res.status(500).send(error);
      }

      res.json(books);
    });
  })
  /**
   * Saves the new book.
   */
  .post((req, res) => {
    const book = new Book(req.body);

    book.save((error) => {
      if (error) {
        return res.status(500).send(error);
      }

      res.json(book);
    });
  });

router.route('/books/deadline')
  /**
   * Gets the deadline of the books.
   */
  .get((req, res) => {
    BookDeadline.findById(deadlineId, (error, deadline) => {
      if (error) {
        return res.status(500).send(error);
      }

      res.json(deadline);
    });
  })
  /**
   * Upserts the deadline of the books.
   */
  .put((req, res) => {
    let { date } = req.body;

    date = Date.parse(date);

    if (Number.isNaN(date)) {
      return res.status(500).send({ error: 'The provided date is invalid' });
    }

    date = new Date(date);
    date.setHours(23, 59, 59, 999);

    BookDeadline.findOneAndUpdate({ _id: deadlineId }, { date }, { new: true, upsert: true },
      (error, deadline) => {
        if (error) {
          return res.status(500).send(error);
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
    Book.findById(req.params.id, (error, book) => {
      if (error) {
        return res.status(500).send(error);
      }

      res.json(book);
    });
  })
  /**
   * Updates the book.
   */
  .put((req, res) => {
    Book.findById(req.params.id, (error, book) => {
      if (error) {
        return res.status(500).send(error);
      }

      book = Object.assign(book, req.body);

      book.save((e) => {
        if (e) {
          return res.status(500).send(e);
        }

        res.json(book);
      });
    });
  })
  /**
   * Deletes the book.
   */
  .delete((req, res) => {
    Book.findByIdAndRemove(req.params.id, (error) => {
      if (error) {
        return res.status(500).send(error);
      }

      res.send(req.params.id);
    });
  });

export default router;
