/**
 * @module BookLists/BookList
 */

import PropTypes from 'prop-types';
import React from 'react';

import { compareAlphabetically } from 'util/string';

import './BookList.scss';
import BookListItem from './BookListItem/BookListItem';

function UnfinishedBookList({ books, languageCode, onDeselectBook, onSelectBook, selectedBook, title }) {
  return (
    <div className="BookList">
      <div className="BookList__title">{title}</div>

      <div>
        {
          books.sort(compareAlphabetically('title', languageCode)).map((book) => {
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
  languageCode: PropTypes.string.isRequired,
  onDeselectBook: PropTypes.func.isRequired,
  onSelectBook: PropTypes.func.isRequired,
  selectedBook: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default UnfinishedBookList;
