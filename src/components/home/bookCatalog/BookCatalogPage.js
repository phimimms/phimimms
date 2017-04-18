import './BookCatalogPage/BookCatalogPage.scss';
import { deleteBook, saveBook, saveBookDeadline } from '../../../actions/bookActions';
import BookDeadlineDatePicker from './BookCatalogPage/BookDeadlineDatePicker';
import BookList from './BookCatalogPage/BookList';
import NewBookForm from './BookCatalogPage/NewBookForm';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class BookCatalogPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {Object}  props   The initial values of instance properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * Generates the HTML representation of the component.
     * @return {Element}
     */
    render() {
        const { bookDeadline, books, deleteBook, saveBook, saveBookDeadline } = this.props;

        return (
            <div className="BookCatalogPage">
                <h1 className="user-select--none">Book Catalog</h1>
                <BookDeadlineDatePicker
                    bookDeadline={bookDeadline}
                    saveBookDeadline={saveBookDeadline}
                    />
                <BookList
                    books={books}
                    deleteBook={deleteBook}
                    saveBook={saveBook}
                    />
                <NewBookForm
                    saveBook={saveBook}
                    />
            </div>
        );
    }
}

BookCatalogPage.propTypes = {
    bookDeadline: PropTypes.object,
    books: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired,
    saveBookDeadline: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        bookDeadline: state.bookCatalog.deadline,
        books: state.bookCatalog.books
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteBook: (bookId) => {
            dispatch(deleteBook(bookId));
        },
        saveBook: (book) => {
            dispatch(saveBook(book));
        },
        saveBookDeadline: (date) => {
            dispatch(saveBookDeadline(date));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCatalogPage);
