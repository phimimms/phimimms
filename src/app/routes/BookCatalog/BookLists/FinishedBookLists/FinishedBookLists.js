/**
 * @module BookLists/FinishedBookLists
 */

import PropTypes from 'prop-types';
import React from 'react';

import BookListItem from 'components/BookListItem/BookListItem';
import { compareAlphabetically } from 'util/string';

import './FinishedBookLists.scss';

function FinishedBookLists({ books, languageCode, onDeselectBook, onSelectBook, selectedBook, tokens }) {
  return (
    <div className="FinishedBookLists">
      {
        Array.from(books).map(([category, categoryBooks]) => {
          return (
            <div className="FinishedBookList" key={category}>
              <div className="FinishedBookList__title">{tokens.global.bookCategory[category]}</div>

              <div className="FinishedBookList__content">
                {
                  categoryBooks.sort(compareAlphabetically('title', languageCode)).map((book) => {
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
        })
      }
    </div>
  );
}

FinishedBookLists.propTypes = {
  books: PropTypes.object.isRequired,
  languageCode: PropTypes.string.isRequired,
  onDeselectBook: PropTypes.func.isRequired,
  onSelectBook: PropTypes.func.isRequired,
  selectedBook: PropTypes.object,
  tokens: PropTypes.object.isRequired,
};

export default FinishedBookLists;
