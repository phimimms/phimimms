import DeleteIcon from 'material-ui/svg-icons/action/delete';
import CloseIcon from 'material-ui/svg-icons/content/clear';
import EditIcon from 'material-ui/svg-icons/image/edit';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { getReadingCompletionPercentage } from 'util/book';

import './BookDetails.scss';

function BookDetails({ book, onCloseBookDetailsPopover, onOpenDeleteBookDialog, onOpenEditBookDialog, tokens }) {
  if (!book) {
    return false;
  }

  return (
    <div className="BookDetails">
      <div className="BookDetails__close-row">
        <CloseIcon
          onClick={onCloseBookDetailsPopover}
          title={tokens.global.close}
        />
      </div>

      <div className="BookDetails__title">{book.title}</div>

      <div className="BookDetails__author">{book.authorName}</div>

      <ProgressBar
        value={getReadingCompletionPercentage(book)}
      />

      <div className="BookDetails__option-container">
        <Button
          className="BookDetails__option"
          icon={<EditIcon />}
          onClick={onOpenEditBookDialog}
          title={tokens.global.edit}
        />

        <Button
          className="BookDetails__option"
          icon={<DeleteIcon />}
          onClick={onOpenDeleteBookDialog}
          title={tokens.global.delete}
        />
      </div>
    </div>
  );
}

BookDetails.propTypes = {
  book: PropTypes.object,
  onCloseBookDetailsPopover: PropTypes.func.isRequired,
  onOpenDeleteBookDialog: PropTypes.func.isRequired,
  onOpenEditBookDialog: PropTypes.func.isRequired,
  tokens: PropTypes.object.isRequired,
};

export default BookDetails;
