/**
 * @module BookCatalog/NewBookDialog
 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';

import NewBookForm from './NewBookForm/NewBookForm';

export default class NewBookDialog extends PureComponent {
  static propTypes = {
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
      isNewBookValid: false,
    };

    /**
     * The values of the new book.
     * @private
     * @type {Object|null}
     */
    this._newBook = null;
  }

  /**
   * Updates the values of the new book.
   * @param {Object}  evt                 The event object.
   * @param {boolean} evt.isNewBookValid  Indicates whether all values for the new book are defined.
   * @param {Object}  evt.newBook         The values of the new book.
   */
  onFormChange = ({ isNewBookValid, newBook }) => {
    this._newBook = newBook;
    this.setState({ isNewBookValid });
  }

  /**
   * Saves the new book.
   */
  saveNewBook = () => {
    const { onClose, saveBook } = this.props;

    saveBook(this._newBook);
    this._newBook = null;
    onClose();
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { isOpen, onClose, title, tokens } = this.props;
    const { isNewBookValid } = this.state;

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
              isDisabled={!isNewBookValid}
              isFlat={true}
              label={tokens.global.save}
              onClick={this.saveNewBook}
            />,
          ]
        }
        isOpen={isOpen}
        title={title}
      >
        <NewBookForm
          onChange={this.onFormChange}
          tokens={tokens}
        />
      </Dialog>
    );
  }
}
