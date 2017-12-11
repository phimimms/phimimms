/**
 * @module routes/BookCatalog
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  deleteBook as deleteBookAction,
  fetchBookDeadline,
  fetchBooks,
  saveBook as saveBookAction,
} from 'actions/book';

import BookList from './BookList/BookList';

class BookCatalog extends React.PureComponent {
  static propTypes = {
    bookDeadline: PropTypes.string,
    books: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired,
    fetchBookDeadline: PropTypes.func.isRequired,
    fetchBooks: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
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
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { books, deleteBook, saveBook, tokens } = this.props;

    return (
      <div className="BookCatalog">
        <BookList
          books={books}
          deleteBook={deleteBook}
          saveBook={saveBook}
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
  deleteBook: deleteBookAction,
  fetchBookDeadline,
  fetchBooks,
  saveBook: saveBookAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCatalog);
