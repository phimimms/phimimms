import './BookDeadlineDatePicker/BookDeadlineDatePicker.scss';
import { saveBookDeadline } from '../../../actions/bookActions';
import DatePicker from '../../common/DatePicker';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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
     * Saves the given date as the deadline of the books.
     * @param  {Object} err     The error object
     * @param  {String} dateStr The string representation of the new date
     * @private
     */
    _onDateChange(err, dateStr) {
        if (err) {
            return console.warn(err);
        }

        this.props.saveBookDeadline(new Date(dateStr));
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
                    minDate={tomorrow}
                    name="book-deadline"
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

function mapStateToProps(state) {
    return {
        bookDeadline: state.bookCatalog.deadline
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveBookDeadline: (date) => {
            dispatch(saveBookDeadline(date));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDeadlineDatePicker);
