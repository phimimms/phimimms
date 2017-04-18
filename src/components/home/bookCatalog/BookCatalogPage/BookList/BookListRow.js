import Button from '../../../../common/Button';
import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from '../../../../common/TextField';

class BookListRow extends React.Component {
    /**
     * Instantiates the component.
     * @param {Object}  props   The initial values of instance properties
     */
    constructor(props) {
        super(props);

        /* Contextually binds the DOM event callbacks to the component */
        this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
        this._onProgressChange = this._onProgressChange.bind(this);
    }

    /**
     * Deletes the book associated to the component.
     * @private
     */
    _onDeleteButtonClick() {
        const { book, deleteBook } = this.props;

        deleteBook(book._id);
    }

    /**
     * Saves the specified progress of the book associated to the component.
     * @param   {Object}    evt         The DOM event object
     * @param   {String}    progress    The new progress value
     * @private
     */
    _onProgressChange(evt, progress) {
        progress = +progress;
        if (!Number.isInteger(progress)) {
            return;
        }

        const { book, saveBook } = this.props;

        if (book.isKindle) {
            progress = Math.min(100, Math.max(0, progress));
        } else {
            progress = Math.min(book.length, Math.max(0, progress));
        }

        if (book.progress === progress) {
            return;
        }

        saveBook(Object.assign({}, book, { progress }));
    }

    /**
     * Generates the HTML representation of the component.
     * @return {Element}
     */
    render() {
        const { book } = this.props;

        return (
            <TableRow>
                <TableRowColumn>{book.title}</TableRowColumn>
                <TableRowColumn>{book.authorName}</TableRowColumn>
                <TableRowColumn>
                    <TextField
                        isFloating={false}
                        label="Progress"
                        name="progress"
                        onChange={this._onProgressChange}
                        value={'' + (book.progress || 0)}
                        />
                </TableRowColumn>
                <TableRowColumn>
                    <Button
                        label="Delete"
                        onClick={this._onDeleteButtonClick}
                        />
                </TableRowColumn>
            </TableRow>
        );
    }
}

BookListRow.propTypes = {
    book: PropTypes.object.isRequired,
    deleteBook: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired
};

export default BookListRow;
