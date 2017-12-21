/**
 * @module components/BookListItem
 */

import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';
import Loading from 'components/Loading/Loading';

import './BookListItem.scss';

class BookListItem extends React.PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isCoverImageLinkBroken: false,
      isCoverImageLoaded: false,
    };

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
   * Updates the state to indicate that the cover image failed to load.
   */
  onCoverImageFailed = () => {
    this.setState({ isCoverImageLinkBroken: true });
  }

  /**
   * Updates the state to indicate that the cover image is loaded.
   */
  onCoverImageLoaded = () => {
    this.setState({ isCoverImageLoaded: true });
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
    const { isCoverImageLinkBroken, isCoverImageLoaded } = this.state;

    return (
      <div
        id={`BookListItem__${book._id}`}
        className={`BookListItem${isSelected ? ' BookListItem--selected' : ''}`}
      >
        {
          !isCoverImageLoaded && <Loading className="BookListItem__loading BookListItem__cover-image" />
        }

        <Button
          icon={
            <img
              className={
                `BookListItem__cover-image${isCoverImageLinkBroken ? ' BookListItem__cover-image--hidden' : ''}`
              }
              onError={this.onCoverImageFailed}
              onLoad={this.onCoverImageLoaded}
              src={book.coverImageURL}
            />
          }
          isFlat={true}
          onClick={this.onSelect}
          title={book.title}
        />
      </div>
    );
  }
}

export default BookListItem;
