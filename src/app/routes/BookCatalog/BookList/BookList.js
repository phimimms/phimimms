/**
 * @module BookCatalog/BookList
 */

import PropTypes from 'prop-types';
import React from 'react';

import './BookList.scss';
import BookListItem from './BookListItem/BookListItem';

function BookList({ books, deleteBook, saveBook, tokens }) {
  return (
    <div className="BookList">
      <div className="BookList__content">
        <div className="BookList__header BookList__grid">
          <div>{tokens.global.bookProperty.title}</div>
          <div>{tokens.global.bookProperty.author}</div>
          <div>{tokens.global.bookProperty.progress}</div>
          <div>{tokens.global.options}</div>
        </div>
        {
          books.map((book) => {
            return (
              <BookListItem
                book={book}
                deleteBook={deleteBook}
                key={book._id}
                saveBook={saveBook}
                tokens={tokens}
              />
            );
          })
        }
      </div>
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired,
  saveBook: PropTypes.func.isRequired,
  tokens: PropTypes.object.isRequired,
};

export default BookList;
