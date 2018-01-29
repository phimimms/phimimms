/**
 * @module routes/BookCatalog
 */

import Guid from 'guid';
import PerfectScrollbar from 'perfect-scrollbar';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  deleteBook as deleteBookAction,
  fetchBookDeadline,
  fetchBooks,
  saveBook as saveBookAction,
  saveBookDeadline as saveBookDeadlineAction,
} from 'actions/book';
import EditBookDialog from 'components/EditBookDialog/EditBookDialog';

import './BookCatalog.scss';
import BookAdminMenu from './BookAdminMenu/BookAdminMenu';
import BookLists from './BookLists/BookLists';

/**
 * The default values of the new book.
 * @readonly
 * @static
 * @type  {Object}
 */
const defaultBook = {
  authorName: '',
  category: '',
  coverImageURL: '',
  currentPageNumber: 0,
  firstPageNumber: 0,
  isKindle: false,
  lastPageNumber: 0,
  numberOfPages: 0,
  rating: 0,
  title: '',
};

class BookCatalog extends React.PureComponent {
  static propTypes = {
    bookDeadline: PropTypes.string,
    books: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired,
    fetchBookDeadline: PropTypes.func.isRequired,
    fetchBooks: PropTypes.func.isRequired,
    languageCode: PropTypes.string.isRequired,
    saveBook: PropTypes.func.isRequired,
    saveBookDeadline: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  /**
   * Instantiates the component.
   * @param {Object}  props The property definition.
   */
  constructor(props) {
    super(props);

    this.state = {
      isEditBookDialogOpen: false,
    };

    /**
     * The unique identifier of the component.
     * @type  {string}
     */
    this._id = Guid.raw();

    /**
     * The vertical scrollbar for the content of the component.
     * @type  {Object|null}
     */
    this._scrollbar = null;
  }

  /**
   * Fetches the data required by the component and instantiates the scrollbar.
   */
  componentDidMount() {
    const { bookDeadline, books } = this.props;

    if (!bookDeadline) {
      this.props.fetchBookDeadline();
    }

    if (!books.length) {
      this.props.fetchBooks();
    }

    this._scrollbar = new PerfectScrollbar(document.getElementById(`BookCatalog__${this._id}`), {
      suppressScrollX: true,
      wheelPropagation: true,
    });

    window.addEventListener('resize', this.onUpdateScrollbar);
  }

  /**
   * Dereferences the scrollbar.
   */
  componentWillUnmount() {
    this._scrollbar.destroy();
    this._scrollbar = null;

    window.removeEventListener('resize', this.onUpdateScrollbar);
  }

  /**
   * The books categorized by completion.
   * @type      {Object}
   * @property  {Map.<string, Array.<module:adapters/book~Book>>} finishedBooks
   *                                                              The map of categories to finished books.
   * @property  {Array.<module:adapters/book~Book>}               unfinishedBooks
   *                                                              The list of unfinished books.
   */
  get categorizedBooks() {
    const { books } = this.props;

    const finishedBooks = new Map();
    const unfinishedBooks = [];

    for (const book of books) {
      if (book.currentPageNumber !== book.lastPageNumber) {
        unfinishedBooks.push(book);
        continue;
      }

      const { category } = book;

      if (finishedBooks.has(category)) {
        finishedBooks.get(category).push(book);
        continue;
      }
      finishedBooks.set(category, [ book ]);
    }

    return { finishedBooks, unfinishedBooks };
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
   * Updates the scrollbar.
   */
  onUpdateScrollbar = () => {
    if (this._scrollbar) {
      this._scrollbar.update();
    }
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { bookDeadline, deleteBook, languageCode, saveBook, saveBookDeadline, tokens } = this.props;
    const { isEditBookDialogOpen } = this.state;

    const { finishedBooks, unfinishedBooks } = this.categorizedBooks;

    return (
      <div id={`BookCatalog__${this._id}`} className="BookCatalog">
        <div className="BookCatalog__content">

          <BookAdminMenu
            bookDeadline={bookDeadline}
            onOpenAddBookDialog={this.onOpenEditBookDialog}
            saveBookDeadline={saveBookDeadline}
            tokens={tokens}
            unfinishedBooks={unfinishedBooks}
          />

          <BookLists
            deleteBook={deleteBook}
            finishedBooks={finishedBooks}
            isDialogDisabled={isEditBookDialogOpen}
            languageCode={languageCode}
            saveBook={saveBook}
            tokens={tokens}
            unfinishedBooks={unfinishedBooks}
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

function mapStateToProps({ bookCatalog: { books, deadline }, localization: { code, tokens } }) {
  return {
    books,
    bookDeadline: deadline,
    languageCode: code.split('-').shift(),
    tokens,
  };
}

const mapDispatchToProps = {
  deleteBook: deleteBookAction,
  fetchBookDeadline,
  fetchBooks,
  saveBook: saveBookAction,
  saveBookDeadline: saveBookDeadlineAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCatalog);
