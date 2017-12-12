/**
 * @module BookCatalog/BookList
 */

import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';
import EditBookDialog from 'components/EditBookDialog/EditBookDialog';

import './BookList.scss';
import BookListItem from './BookListItem/BookListItem';

/**
 * The default values of the new book.
 * @readonly
 * @static
 * @type      {Object}
 */
const defaultBook = {
  authorName: '',
  currentPageNumber: 0,
  firstPageNumber: 0,
  isKindle: false,
  lastPageNumber: 0,
  length: 0,
  title: '',
};

export default class BookList extends React.PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  state = {
    isEditBookDialogOpen: false,
  }

  /**
   * Closes the Edit Book Dialog.
   */
  onCloseEditBookDialog = () => {
    this.setState({ isEditBookDialogOpen: false });
  }

  /**
   * Opens the Edit Book Dialog.
   */
  onOpenEditBookDialog = () => {
    this.setState({ isEditBookDialogOpen: true });
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { books, deleteBook, saveBook, tokens } = this.props;
    const { isEditBookDialogOpen } = this.state;

    return (
      <div className="BookList">
        <div className="BookList__content">

          <div className="BookList__header">
            <div className="BookList__title">{tokens.BookList.bookCatalog}</div>

            <Button
              icon={<AddIcon />}
              onClick={this.onOpenEditBookDialog}
              title={tokens.BookList.addBook}
            />
          </div>

          <div className="BookList__grid-header BookList__grid">
            <div>{tokens.global.bookProperty.title}</div>
            <div>{tokens.global.bookProperty.completion}</div>
            <div>{tokens.global.options}</div>
          </div>

          <div className="BookList__divider" />

          {
            books.map((book) => {
              return (
                <BookListItem
                  book={book}
                  className="BookList__grid"
                  deleteBook={deleteBook}
                  key={book._id}
                  saveBook={saveBook}
                  tokens={tokens}
                />
              );
            })
          }
        </div>

        <EditBookDialog
          book={defaultBook}
          isOpen={isEditBookDialogOpen}
          onClose={this.onCloseEditBookDialog}
          saveBook={saveBook}
          title={tokens.BookList.addBook}
          tokens={tokens}
        />
      </div>
    );
  }
}
