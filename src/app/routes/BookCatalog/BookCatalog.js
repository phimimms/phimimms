/**
 * @module routes/BookCatalog
 */

import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  deleteBook as deleteBookAction,
  fetchBookDeadline,
  fetchBooks,
  saveBook as saveBookAction,
} from 'actions/book';
import Button from 'components/Button/Button';
import EditBookDialog from 'components/EditBookDialog/EditBookDialog';

import './BookCatalog.scss';
import BookList from './BookList/BookList';

/**
 * The default values of the new book.
 * @readonly
 * @static
 * @type  {Object}
 */
const defaultBook = {
  authorName: '',
  coverImageURL: '',
  currentPageNumber: 0,
  firstPageNumber: 0,
  isKindle: false,
  lastPageNumber: 0,
  numberOfPages: 0,
  title: '',
};

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

  state = {
    isEditBookDialogOpen: false,
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
   * Closes the Edit Book Dialog.
   */
  onCloseEditBookDialog = () => {
    this.setState({ isEditBookDialogOpen: false });
  }

  /**
   * Opens the Edit Book Dialog.
   */
  onOpenEditBookDialog = () => {
    this.setState({ isEditBookDialogOpen: true });
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { books, deleteBook, saveBook, tokens } = this.props;
    const { isEditBookDialogOpen } = this.state;

    return (
      <div className="BookCatalog">
        <div className="BookCatalog__content">

          <div className="BookCatalog__header">
            <div className="BookCatalog__title">{tokens.BookCatalog.title}</div>

            <Button
              icon={<AddIcon />}
              onClick={this.onOpenEditBookDialog}
              title={tokens.BookCatalog.addBook}
            />
          </div>

          <BookList
            books={books}
            deleteBook={deleteBook}
            saveBook={saveBook}
            tokens={tokens}
          />
        </div>

        <EditBookDialog
          book={defaultBook}
          isOpen={isEditBookDialogOpen}
          onClose={this.onCloseEditBookDialog}
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
  deleteBook: deleteBookAction,
  fetchBookDeadline,
  fetchBooks,
  saveBook: saveBookAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCatalog);
