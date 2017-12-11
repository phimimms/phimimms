/**
 * @module BookList/BookListItem
 */

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';
import { getReadingCompletionPercentage } from 'util/book';

import './BookListItem.scss';

export default class BookListItem extends React.PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    deleteBook: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  state = {
    isDeleteBookDialogOpen: false,
  }

  /**
   * Closes the Delete Book Dialog.
   */
  onCloseDeleteBookDialog = () => {
    this.setState({ isDeleteBookDialogOpen: false });
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
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { book, tokens } = this.props;
    const { isDeleteBookDialogOpen } = this.state;

    return (
      <div className="BookListItem BookList__grid">
        <div>{book.title}</div>
        <div>{book.authorName}</div>
        <div>{getReadingCompletionPercentage(book)}</div>
        <div className="BookListItem__options">
          <Button
            icon={<EditIcon />}
            onClick={Function.prototype}
            title={tokens.global.edit}
          />

          <Button
            icon={<DeleteIcon />}
            onClick={this.onOpenDeleteBookDialog}
            title={tokens.global.delete}
          />
        </div>

        <Dialog
          actions={
            [
              <Button
                isFlat={true}
                label={tokens.global.close}
                onClick={this.onCloseDeleteBookDialog}
              />,
              <Button
                isFlat={true}
                label={tokens.global.confirm}
                onClick={this.onDeleteBook}
              />,
            ]
          }
          isOpen={isDeleteBookDialogOpen}
          title={tokens.BookListItem.deleteBook}
        >
          <div>{tokens.formatString(tokens.BookListItem.confirmDeleteBook, book.title)}</div>
        </Dialog>
      </div>
    );
  }
}
