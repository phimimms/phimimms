import BookListRow from './BookList/BookListRow';
import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

const BookList = ({ books, deleteBook, saveBook }) => {
    return (
        <div className="BookList">
            <Table>
                <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                    >
                    <TableRow>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Author</TableHeaderColumn>
                        <TableHeaderColumn>Progress</TableHeaderColumn>
                        <TableHeaderColumn />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((book) =>
                        <BookListRow
                            key={book._id}
                            book={book}
                            deleteBook={deleteBook}
                            saveBook={saveBook}
                            />
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired
};

export default BookList;
