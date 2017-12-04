/**
 * @module NewBookDialog/NewBookForm
 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Checkbox from 'components/Checkbox/Checkbox';
import InputField from 'components/InputField/InputField';

import './NewBookForm.scss';

// TODO: Support editing an existing book.

/**
 * The default values of the new book.
 * @readonly
 * @static
 * @type      {Object}
 */
const defaultState = {
  authorName: '',
  currentPageNumber: 0,
  firstPageNumber: 0,
  isKindle: false,
  lastPageNumber: 0,
  length: 0,
  title: '',
};

export default class NewBookForm extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  state = { ...defaultState }

  /**
   * Invokes the provided handler with the updated values for the new book.
   * @param {Object}  nextProps The new property definition.
   * @param {Object}  nextState The new state of the component.
   */
  componentWillUpdate(nextProps, nextState) {
    this.props.onChange({
      isNewBookValid: this.isNewBookValid(nextState),
      newBook: { ...nextState },
    });
  }

  /**
   * Resets the state of the component.
   */
  componentWillUnmount() {
    this.setState({ ...defaultState });
  }

  /**
   * Indicates whether all values for the new book are defined and valid.
   * @param   {Object}  state The state of the component.
   * @returns {boolean}
   */
  isNewBookValid = (state) => {
    const {
      authorName,
      currentPageNumber,
      firstPageNumber,
      isKindle,
      lastPageNumber,
      length,
      title,
    } = state;

    if (!authorName.length) {
      return false;
    }

    if (firstPageNumber > currentPageNumber ||
        lastPageNumber < currentPageNumber ||
        firstPageNumber >= lastPageNumber) {
      return false;
    }

    if (isKindle && !length) {
      return false;
    }

    if (!title.length) {
      return false;
    }

    return true;
  }

  /**
   * Updates the author of the new book.
   * @param {string}  value The new value of the author.
   */
  onAuthorNameChange = (value) => {
    this.setState({ authorName: value });
  }

  /**
   * Updates the current page number of the new book.
   * @param {string}  value The new value of the current page number.
   */
  onCurrentPageNumberChange = (value) => {
    value = Number(value);

    if (!Number.isInteger(value)) {
      return;
    }

    value = Math.max(0, value);

    this.setState({ currentPageNumber: value });
  }

  /**
   * Updates the first page number of the new book.
   * @param {string}  value The new value of the first page number.
   */
  onFirstPageNumberChange = (value) => {
    value = Number(value);

    if (!Number.isInteger(value)) {
      return;
    }

    value = Math.max(0, value);

    this.setState({ firstPageNumber: value });
  }

  /**
   * Toggles the Kindle format indicator of the new book.
   */
  onIsKindleChange = () => {
    this.setState({ isKindle: !this.state.isKindle });
  }

  /**
   * Updates the last page number of the new book.
   * @param {string}  value The new value of the last page number.
   */
  onLastPageNumberChange = (value) => {
    value = Number(value);

    if (!Number.isInteger(value)) {
      return;
    }

    value = Math.max(0, value);

    this.setState({ lastPageNumber: value });
  }

  /**
   * Updates the length of the new book.
   * @param {string}  value The new value of the length.
   */
  onLengthChange = (value) => {
    value = Number(value);

    if (!Number.isInteger(value) || value < 0) {
      return;
    }

    this.setState({ length: value });
  }

  /**
   * Updates the title of the new book.
   * @param {string}  value The new value of the title.
   */
  onTitleChange = (value) => {
    this.setState({ title: value });
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { tokens } = this.props;
    const {
      authorName,
      currentPageNumber,
      firstPageNumber,
      isKindle,
      lastPageNumber,
      length,
      title,
    } = this.state;

    return (
      <div className="NewBookForm">
        <div className="NewBookForm__row">
          <InputField
            className="NewBookForm__field"
            label={tokens.global.bookProperty.title}
            onChange={this.onTitleChange}
            value={title}
          />

          <InputField
            className="NewBookForm__field"
            label={tokens.global.bookProperty.author}
            onChange={this.onAuthorNameChange}
            value={authorName}
          />
        </div>

        <div className="NewBookForm__row">
          <InputField
            className="NewBookForm__field"
            label={tokens.global.bookProperty.firstPage}
            onChange={this.onFirstPageNumberChange}
            value={firstPageNumber}
          />

          <InputField
            className="NewBookForm__field"
            label={tokens.global.bookProperty.currentPage}
            onChange={this.onCurrentPageNumberChange}
            value={currentPageNumber}
          />

          <InputField
            className="NewBookForm__field"
            label={tokens.global.bookProperty.lastPage}
            onChange={this.onLastPageNumberChange}
            value={lastPageNumber}
          />
        </div>

        <div className="NewBookForm__row--short">
          <Checkbox
            className="NewBookForm__field"
            isChecked={isKindle}
            onChange={this.onIsKindleChange}
            label={tokens.global.bookProperty.isKindle}
          />

          <InputField
            className={`NewBookForm__field ${isKindle ? '' : 'NewBookForm__field--hidden'}`}
            label={tokens.global.bookProperty.length}
            onChange={this.onLengthChange}
            value={length}
          />
        </div>
      </div>
    );
  }
}
