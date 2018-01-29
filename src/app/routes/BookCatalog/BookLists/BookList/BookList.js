/**
 * @module BookLists/BookList
 */

import Guid from 'guid';
import PerfectScrollbar from 'perfect-scrollbar';
import PropTypes from 'prop-types';
import React from 'react';

import { compareAlphabetically } from 'util/localization';

import './BookList.scss';
import BookListItem from './BookListItem/BookListItem';

export default class UnfinishedBookList extends React.PureComponent {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    languageCode: PropTypes.string.isRequired,
    onDeselectBook: PropTypes.func.isRequired,
    onSelectBook: PropTypes.func.isRequired,
    selectedBook: PropTypes.object,
    title: PropTypes.string.isRequired,
  }

  /**
   * Instantiates the component.
   * @param {Object}  props The property definition.
   */
  constructor(props) {
    super(props);

    /**
     * The unique identifier of the component.
     * @type  {string}
     */
    this._id = Guid.raw();

    /**
     * The horizontal scrollbar for the content of the component.
     * @type  {Object|null}
     */
    this._scrollbar = null;
  }

  /**
   * Instantiates the scrollbar.
   */
  componentDidMount() {
    this._scrollbar = new PerfectScrollbar(document.getElementById(`BookList__content__${this._id}`), {
      suppressScrollY: true,
      wheelPropagation: true,
    });

    window.addEventListener('resize', this.onUpdateScrollbar);
  }

  /**
   * Dereferences the scrollbar.
   */
  componentWillUnmount() {
    this._scrollbar.destroy();
    this._scrollbar = null;

    window.removeEventListener('resize', this.onUpdateScrollbar);
  }

  /**
   * Updates the scrollbar.
   */
  onUpdateScrollbar = () => {
    if (this._scrollbar) {
      this._scrollbar.update();
    }
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { books, languageCode, onDeselectBook, onSelectBook, selectedBook, title } = this.props;

    return (
      <div className="BookList">
        <div className="BookList__title">{title}</div>

        <div id={`BookList__content__${this._id}`} className="BookList__content">
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
}
