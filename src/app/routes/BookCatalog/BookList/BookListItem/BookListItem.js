/**
 * @module BookList/BookListItem
 */

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { getReadingCompletionPercentage } from 'util/book';

import './BookListItem.scss';

class BookListItem extends React.PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    onOpenDeleteBookDialog: PropTypes.func.isRequired,
    onOpenEditBookDialog: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  /**
   * Invokes the provided handler to open the Delete Book Dialog.
   */
  onOpenDeleteBookDialog = () => {
    this.props.onOpenDeleteBookDialog(this.props.book);
  }

  /**
   * Invokes the provided handler to open the Edit Book Dialog.
   */
  onOpenEditBookDialog = () => {
    this.props.onOpenEditBookDialog(this.props.book);
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { book, className, tokens } = this.props;

    const readingCompletionPercentage = getReadingCompletionPercentage(book);

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
      </div>
    );
  }
}

export default BookListItem;
