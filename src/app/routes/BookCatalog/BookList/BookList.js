/**
 * @module BookCatalog/BookList
 */

import PropTypes from 'prop-types';
import React from 'react';

import DeleteDialog from 'components/DeleteDialog/DeleteDialog';
import EditBookDialog from 'components/EditBookDialog/EditBookDialog';

import './BookList.scss';
import BookListItem from './BookListItem/BookListItem';

export default class BookList extends React.PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  state = {
    isDeleteBookDialogOpen: false,
    isEditBookDialogOpen: false,
    selectedBook: null,
  }

  /**
   * Closes the Delete Book Dialog.
   */
  onCloseDeleteBookDialog = () => {
    this.setState({ isDeleteBookDialogOpen: false, selectedBook: null });
  }

  /**
   * Closes the Edit Book Dialog.
   */
  onCloseEditBookDialog = () => {
    this.setState({ isEditBookDialogOpen: false, selectedBook: null });
  }

  /**
   * Deletes the selected book.
   */
  onDeleteBook = () => {
    this.props.deleteBook(this.state.selectedBook._id);
    this.onCloseDeleteBookDialog();
  }

  /**
   * Opens the Delete Book Dialog.
   * @param {module:adapters/book~Book} selectedBook  The new selected book.
   */
  onOpenDeleteBookDialog = (selectedBook) => {
    this.setState({ isDeleteBookDialogOpen: true, selectedBook });
  }

  /**
   * Opens the Edit Book Dialog.
   * @param {module:adapters/book~Book} selectedBook  The new selected book.
   */
  onOpenEditBookDialog = (selectedBook) => {
    this.setState({ isEditBookDialogOpen: true, selectedBook });
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { books, saveBook, tokens } = this.props;
    const { isDeleteBookDialogOpen, isEditBookDialogOpen, selectedBook } = this.state;

    return (
      <div className="BookList">
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
                key={book._id}
                onOpenDeleteBookDialog={this.onOpenDeleteBookDialog}
                onOpenEditBookDialog={this.onOpenEditBookDialog}
                tokens={tokens}
              />
            );
          })
        }

        <EditBookDialog
          book={selectedBook || {}}
          isOpen={isEditBookDialogOpen}
          onClose={this.onCloseEditBookDialog}
          saveBook={saveBook}
          title={tokens.BookList.editBook}
          tokens={tokens}
        />

        <DeleteDialog
          isOpen={isDeleteBookDialogOpen}
          name={selectedBook ? selectedBook.title : ''}
          onClose={this.onCloseDeleteBookDialog}
          onDelete={this.onDeleteBook}
          title={tokens.BookList.deleteBook}
          tokens={tokens}
        />
      </div>
    );
  }
}
