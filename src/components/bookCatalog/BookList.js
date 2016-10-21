import BookListRow from './BookListRow';
import React, { PropTypes } from 'react';

const BookList = ({books}) => {
    return (
        <div>
            {books.map(book =>
                <BookListRow key={book.id} book={book} />
            )}
        </div>
    );
};

BookList.propTypes = {
    books: PropTypes.array.isRequired
};

export default BookList;
