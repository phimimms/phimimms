/**
 * @module BookList/EditBookDialog
 */

import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';

import BookForm from './BookForm/BookForm';

export default class NewBookDialog extends React.PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  /**
   * Instantiates the component.
   * @param {Object}  props The property definition.
   */
  constructor(props) {
    super(props);

    this.state = {
      isSaveValid: false,
    };

    /**
     * The new values of the book.
     * @private
     * @type {Object|null}
     */
    this._book = { ...this.props.book };
  }

  /**
   * Updates the values of the book.
   * @param {Object}  evt             The event object.
   * @param {Object}  evt.book        The values of the book.
   * @param {boolean} evt.isSaveValid Indicates whether the book can be saved.
   */
  onFormChange = ({ book, isSaveValid }) => {
    this._book = book;
    this.setState({ isSaveValid });
  }

  /**
   * Saves the book.
   */
  onSaveBook = () => {
    const { onClose, saveBook } = this.props;

    saveBook(this._book);
    this._book = { ...this.props.book };
    onClose();
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { book, isOpen, onClose, title, tokens } = this.props;
    const { isSaveValid } = this.state;

    return (
      <Dialog
        actions={
          [
            <Button
              isFlat={true}
              label={tokens.global.close}
              onClick={onClose}
            />,
            <Button
              isDisabled={!isSaveValid}
              isFlat={true}
              label={tokens.global.save}
              onClick={this.onSaveBook}
            />,
          ]
        }
        isOpen={isOpen}
        title={title}
      >
        <BookForm
          book={book}
          onChange={this.onFormChange}
          tokens={tokens}
        />
      </Dialog>
    );
  }
}
