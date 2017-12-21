/**
 * @module EditBookDialog/BookForm
 */

import PropTypes from 'prop-types';
import React from 'react';

import Checkbox from 'components/Checkbox/Checkbox';
import InputField from 'components/InputField/InputField';

import './BookForm.scss';

export default class BookForm extends React.PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  /**
   * Instantiates the component.
   * @param {Object}  props The property definition.
   */
  constructor(props) {
    super(props);

    this.state = { ...this.props.book };
  }

  /**
   * Invokes the provided handler with the initial values of the book.
   */
  componentWillMount() {
    this.props.onChange({
      book: { ...this.state },
      isSaveValid: this.isSaveValid(this.state),
    });
  }

  /**
   * Invokes the provided handler with the updated values of the book.
   * @param {Object}  nextProps The new property definition.
   * @param {Object}  nextState The new state of the component.
   */
  componentWillUpdate(nextProps, nextState) {
    this.props.onChange({
      book: { ...nextState },
      isSaveValid: this.isSaveValid(nextState),
    });
  }

  /**
   * Indicates whether all values of the book are valid and updated.
   * @param   {Object}  state The state of the component.
   * @returns {boolean}
   */
  isSaveValid = (state) => {
    const {
      authorName,
      coverImageURL,
      currentPageNumber,
      firstPageNumber,
      isKindle,
      lastPageNumber,
      numberOfPages,
      title,
    } = state;

    /* Ensure all values are valid */
    if (!authorName.length) {
      return false;
    }

    if (!coverImageURL.length) {
      return false;
    }

    if (firstPageNumber > currentPageNumber ||
        lastPageNumber < currentPageNumber ||
        firstPageNumber >= lastPageNumber) {
      return false;
    }

    if (isKindle && !numberOfPages) {
      return false;
    }

    if (!title.length) {
      return false;
    }

    /* Ensure all values are updated */
    if (authorName !== this.props.book.authorName) {
      if (authorName.trim() === this.props.book.authorName.trim()) {
        return false;
      }

      return true;
    }

    if (coverImageURL !== this.props.book.coverImageURL) {
      if (coverImageURL.trim() === this.props.book.coverImageURL.trim()) {
        return false;
      }

      return true;
    }

    if (currentPageNumber !== this.props.book.currentPageNumber) {
      return true;
    }

    if (firstPageNumber !== this.props.book.firstPageNumber) {
      return true;
    }

    if (lastPageNumber !== this.props.book.lastPageNumber) {
      return true;
    }

    if (isKindle !== this.props.book.isKindle) {
      return true;
    }

    if (isKindle && numberOfPages !== this.props.book.numberOfPages) {
      return true;
    }

    if (title !== this.props.book.title) {
      if (title.trim() === this.props.book.title.trim()) {
        return false;
      }

      return true;
    }

    /* No values were updated */
    return false;
  }

  /**
   * Updates the author of the book.
   * @param {string}  value The new value of the author.
   */
  onAuthorNameChange = (value) => {
    this.setState({ authorName: value });
  }

  /**
   * Updates the cover image URL of the book.
   * @param {string}  value The new value of the cover image URL.
   */
  onCoverImageChange = (value) => {
    this.setState({ coverImageURL: value });
  }

  /**
   * Updates the current page number of the book.
   * @param {string}  value The new value of the current page number.
   */
  onCurrentPageNumberChange = (value) => {
    value = Number(value);

    if (!Number.isInteger(value)) {
      return;
    }

    value = Math.max(0, value);

    if (this.state.isKindle) {
      value = Math.min(value, 100);
    }

    this.setState({ currentPageNumber: value });
  }

  /**
   * Updates the first page number of the book.
   * @param {string}  value The new value of the first page number.
   */
  onFirstPageNumberChange = (value) => {
    value = Number(value);

    if (!Number.isInteger(value)) {
      return;
    }

    value = Math.max(0, value);

    if (this.state.isKindle) {
      value = Math.min(value, 100);
    }

    this.setState({ firstPageNumber: value });
  }

  /**
   * Toggles the Kindle format indicator value of the book.
   */
  onIsKindleChange = () => {
    this.setState({
      isKindle: !this.state.isKindle,
      numberOfPages: 0,
    });
  }

  /**
   * Updates the last page number of the book.
   * @param {string}  value The new value of the last page number.
   */
  onLastPageNumberChange = (value) => {
    value = Number(value);

    if (!Number.isInteger(value)) {
      return;
    }

    value = Math.max(0, value);

    if (this.state.isKindle) {
      value = Math.min(value, 100);
    }

    this.setState({ lastPageNumber: value });
  }

  /**
   * Updates the length of the book.
   * @param {string}  value The new value of the length.
   */
  onNumberOfPagesChange = (value) => {
    value = Number(value);

    if (!Number.isInteger(value) || value < 0) {
      return;
    }

    this.setState({ numberOfPages: value });
  }

  /**
   * Updates the title of the book.
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
    const { bookProperty } = this.props.tokens.BookForm;
    const {
      authorName,
      coverImageURL,
      currentPageNumber,
      firstPageNumber,
      isKindle,
      lastPageNumber,
      numberOfPages,
      title,
    } = this.state;

    return (
      <div className="BookForm">
        <div className="BookForm__row">
          <InputField
            className="BookForm__field"
            label={bookProperty.title}
            onChange={this.onTitleChange}
            value={title}
          />

          <InputField
            className="BookForm__field"
            label={bookProperty.author}
            onChange={this.onAuthorNameChange}
            value={authorName}
          />
        </div>

        <div className="BookForm__row">
          <InputField
            className="BookForm__field"
            label={isKindle ? bookProperty.firstPercent : bookProperty.firstPage}
            onChange={this.onFirstPageNumberChange}
            value={firstPageNumber}
          />

          <InputField
            className="BookForm__field"
            label={isKindle ? bookProperty.currentPercent : bookProperty.currentPage}
            onChange={this.onCurrentPageNumberChange}
            value={currentPageNumber}
          />

          <InputField
            className="BookForm__field"
            label={isKindle ? bookProperty.lastPercent : bookProperty.lastPage}
            onChange={this.onLastPageNumberChange}
            value={lastPageNumber}
          />
        </div>

        <div className="BookForm__row">
          <InputField
            className="BookForm__field"
            label={bookProperty.coverImage}
            onChange={this.onCoverImageChange}
            value={coverImageURL}
          />
        </div>

        <div className="BookForm__row--short">
          <Checkbox
            className="BookForm__field"
            isChecked={isKindle}
            onChange={this.onIsKindleChange}
            label={bookProperty.isKindle}
          />

          <InputField
            className={`BookForm__field${isKindle ? '' : ' BookForm__field--hidden'}`}
            isFullWidth={false}
            label={bookProperty.numberOfPages}
            onChange={isKindle ? this.onNumberOfPagesChange : Function.prototype}
            value={numberOfPages}
          />
        </div>
      </div>
    );
  }
}
