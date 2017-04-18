import './DisplayPage/DisplayPage.scss';
import BookSchedule from './BookSchedule';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class DisplayPage extends React.Component {
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
        const { bookDeadline, books } = this.props;

        return (
            <div className="DisplayPage user-select--none">
                <BookSchedule
                    bookDeadline={bookDeadline}
                    books={books}
                    />
            </div>
        );
    }
}

DisplayPage.propTypes = {
    bookDeadline: PropTypes.object,
    books: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        bookDeadline: state.bookCatalog.deadline,
        books: state.bookCatalog.books
    };
}

export default connect(mapStateToProps)(DisplayPage);
