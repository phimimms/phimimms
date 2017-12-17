/**
 * @module BookList/BookListItem
 */

import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';

import './BookListItem.scss';

class BookListItem extends React.PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    /**
     * The root element of the component.
     * @private
     * @type  {Element|null}
     */
    this._element = null;
  }

  /**
   * Captures a reference to the root element of the component.
   */
  componentDidMount() {
    this._element = document.getElementById(`BookListItem__${this.props.book._id}`);
  }

  /**
   * Invokes the provided handler to select the book represented by the component.
   */
  onSelect = () => {
    this.props.onSelect(this.props.book, this._element);
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { book, isSelected } = this.props;

    return (
      <div
        id={`BookListItem__${book._id}`}
        className={`BookListItem${isSelected ? ' BookListItem--selected' : ''}`}
      >
        <Button
          icon={
            <img
              className="BookListItem__cover-image"
              src={book.coverImageURL}
            />
          }
          isFlat={true}
          onClick={this.onSelect}
        />
      </div>
    );
  }
}

export default BookListItem;
