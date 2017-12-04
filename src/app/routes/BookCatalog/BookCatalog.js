/**
 * @module routes/BookCatalog
 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  fetchBookDeadline,
  fetchBooks,
  saveBook as saveBookAction,
} from 'actions/book';
import Button from 'components/Button/Button';

import NewBookDialog from './NewBookDialog/NewBookDialog';

class BookCatalog extends PureComponent {
  static propTypes = {
    bookDeadline: PropTypes.string,
    books: PropTypes.array.isRequired,
    fetchBookDeadline: PropTypes.func.isRequired,
    fetchBooks: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  state = {
    isNewBookDialogOpen: false,
  }

  /**
   * Fetches the data required by the component.
   */
  componentDidMount() {
    const { bookDeadline, books } = this.props;

    if (!bookDeadline) {
      this.props.fetchBookDeadline();
    }

    if (!books.length) {
      this.props.fetchBooks();
    }
  }

  /**
   * Closes the New Book Dialog.
   */
  closeNewBookDialog = () => {
    this.setState({ isNewBookDialogOpen: false });
  }

  /**
   * Opens the New Book Dialog.
   */
  openNewBookDialog = () => {
    this.setState({ isNewBookDialogOpen: true });
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { saveBook, tokens } = this.props;
    const { isNewBookDialogOpen } = this.state;

    return (
      <div className="BookCatalog">
        <Button
          label={tokens.BookCatalog.addBook}
          onClick={this.openNewBookDialog}
        />

        <NewBookDialog
          isOpen={isNewBookDialogOpen}
          onClose={this.closeNewBookDialog}
          saveBook={saveBook}
          title={tokens.BookCatalog.addBook}
          tokens={tokens}
        />
      </div>
    );
  }
}

function mapStateToProps({ bookCatalog: { books, deadline }, localization: { tokens } }) {
  return {
    books,
    bookDeadline: deadline,
    tokens,
  };
}

const mapDispatchToProps = {
  fetchBookDeadline,
  fetchBooks,
  saveBook: saveBookAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCatalog);
