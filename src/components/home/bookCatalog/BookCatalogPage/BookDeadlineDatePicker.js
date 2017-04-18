import './BookDeadlineDatePicker/BookDeadlineDatePicker.scss';
import DatePicker from '../../../common/DatePicker';
import React, { PropTypes } from 'react';

class BookDeadlineDatePicker extends React.Component {
    /**
     * Instantiates the component.
     * @param {Object}  props   The initial values of instance properties
     */
    constructor(props) {
        super(props);

        /* Contextually binds the DOM event callbacks to the component */
        this._onDateChange = this._onDateChange.bind(this);
    }

    /**
     * Saves the specified date as the deadline of the books.
     * @param  {Object} err     The error object
     * @param  {String} dateStr The string representation of the new date
     * @private
     */
    _onDateChange(err, dateStr) {
        if (err) {
            return console.warn(err);
        }

        const deadline = new Date(dateStr);
        deadline.setHours(23, 59, 59, 999);

        this.props.saveBookDeadline(deadline);
    }

    /**
     * Generates the HTML representation of the component.
     * @return {Element}
     */
    render() {
        const { bookDeadline } = this.props;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        return (
            <div className="BookDeadlineDatePicker">
                <div className="BookDeadlineDatePicker__label user-select--none">Deadline:</div>
                <DatePicker
                    name="book-deadline"
                    minDate={tomorrow}
                    onChange={this._onDateChange}
                    value={bookDeadline || tomorrow}
                    />
            </div>
        );
    }
}

BookDeadlineDatePicker.propTypes = {
    bookDeadline: PropTypes.object,
    saveBookDeadline: PropTypes.func.isRequired
};

export default BookDeadlineDatePicker;
