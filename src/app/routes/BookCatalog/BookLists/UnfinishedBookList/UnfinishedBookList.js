/**
 * @module BookLists/UnfinishedBookList
 */

import PropTypes from 'prop-types';
import React from 'react';

import BookListItem from 'components/BookListItem/BookListItem';

import './UnfinishedBookList.scss';

function UnfinishedBookList({ books, onDeselectBook, onSelectBook, selectedBook, tokens }) {
  return (
    <div className="UnfinishedBookList">
      <div className="UnfinishedBookList__title">{tokens.UnfinishedBookList.title}</div>

      <div className="UnfinishedBookList__content">
        {
          books.map((book) => {
            const isSelected = (!!selectedBook && selectedBook._id === book._id);

            return (
              <BookListItem
                book={book}
                key={book._id}
                isSelected={isSelected}
                onSelect={isSelected ? onDeselectBook : onSelectBook}
              />
            );
          })
        }
      </div>
    </div>
  );
}

UnfinishedBookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeselectBook: PropTypes.func.isRequired,
  onSelectBook: PropTypes.func.isRequired,
  selectedBook: PropTypes.object,
  tokens: PropTypes.object.isRequired,
};

export default UnfinishedBookList;
