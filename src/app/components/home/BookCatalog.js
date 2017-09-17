import './BookCatalog/BookCatalog.scss';
import BookDeadlineDatePicker from './BookCatalog/BookDeadlineDatePicker';
import BookList from './BookCatalog/BookList';
import NewBookForm from './BookCatalog/NewBookForm';
import React from 'react';

export const BookCatalog = () => {
    return (
        <div className="BookCatalog">
            <h1 className="user-select--none">Book Catalog</h1>
            <BookDeadlineDatePicker />
            <BookList />
            <NewBookForm />
        </div>
    );
};

BookCatalog.propTypes = {};

export default BookCatalog;
