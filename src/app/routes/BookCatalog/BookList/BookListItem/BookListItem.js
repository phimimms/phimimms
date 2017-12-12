/**
 * @module BookList/BookListItem
 */

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';
import DeleteDialog from 'components/DeleteDialog/DeleteDialog';
import EditBookDialog from 'components/EditBookDialog/EditBookDialog';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { getReadingCompletionPercentage } from 'util/book';

import './BookListItem.scss';

export default class BookListItem extends React.PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    deleteBook: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  state = {
    isDeleteBookDialogOpen: false,
    isEditBookDialogOpen: false,
  }

  /**
   * Closes the Delete Book Dialog.
   */
  onCloseDeleteBookDialog = () => {
    this.setState({ isDeleteBookDialogOpen: false });
  }

  /**
   * Closes the Edit Book Dialog.
   */
  onCloseEditBookDialog = () => {
    this.setState({ isEditBookDialogOpen: false });
  }

  /**
   * Deletes the book represented by the component.
   */
  onDeleteBook = () => {
    this.props.deleteBook(this.props.book._id);
  }

  /**
   * Opens the Delete Book Dialog.
   */
  onOpenDeleteBookDialog = () => {
    this.setState({ isDeleteBookDialogOpen: true });
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
    const { book, className, saveBook, tokens } = this.props;
    const { isDeleteBookDialogOpen, isEditBookDialogOpen } = this.state;

    const readingCompletionPercentage = getReadingCompletionPercentage(book)

    return (
      <div className={`BookListItem ${className}`}>
        <div>{book.title}</div>

        <ProgressBar
          value={readingCompletionPercentage}
        />

        <div className="BookListItem__option-container">
          <Button
            className="BookListItem__option"
            icon={<EditIcon />}
            onClick={this.onOpenEditBookDialog}
            title={tokens.global.edit}
          />

          <Button
            className="BookListItem__option"
            icon={<DeleteIcon />}
            onClick={this.onOpenDeleteBookDialog}
            title={tokens.global.delete}
          />
        </div>

        <EditBookDialog
          book={book}
          isOpen={isEditBookDialogOpen}
          onClose={this.onCloseEditBookDialog}
          saveBook={saveBook}
          title={tokens.BookListItem.editBook}
          tokens={tokens}
        />

        <DeleteDialog
          isOpen={isDeleteBookDialogOpen}
          name={book.title}
          onClose={this.onCloseDeleteBookDialog}
          onDelete={this.onDeleteBook}
          title={tokens.BookListItem.deleteBook}
          tokens={tokens}
        />
      </div>
    );
  }
}
