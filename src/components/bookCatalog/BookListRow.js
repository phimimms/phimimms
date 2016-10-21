import React, { PropTypes } from 'react';

const BookListRow = ({book}) => {
    return (
        <div>{book.title}</div>
    );
};

BookListRow.propTypes = {
    book: PropTypes.object.isRequired
};

export default BookListRow;
