/**
 * @module routes/BookCatalog
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchBookDeadline,
  fetchBooks,
} from 'actions/book';

class BookCatalog extends Component {
  static propTypes = {
    bookDeadline: PropTypes.instanceOf(Date),
    books: PropTypes.array.isRequired,
    fetchBookDeadline: PropTypes.func.isRequired,
    fetchBooks: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { books, bookDeadline } = this.props;

    if (!books.length) {
      this.props.fetchBooks();
    }

    if (!bookDeadline) {
      this.props.fetchBookDeadline();
    }
  }

  render() {
    return (
      <div className="BookCatalog" />
    );
  }
}

function mapStateToProps({ bookCatalog: { books, deadline } }) {
  return {
    books,
    bookDeadline: deadline,
  };
}

const mapDispatchToProps = { fetchBookDeadline, fetchBooks };

export default connect(mapStateToProps, mapDispatchToProps)(BookCatalog);
