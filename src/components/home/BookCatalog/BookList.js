import BookListRow from './BookList/BookListRow';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

const BookList = ({ books }) => {
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
                            />
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

BookList.propTypes = {
    books: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        books: state.bookCatalog.books
    };
}

export default connect(mapStateToProps)(BookList);
