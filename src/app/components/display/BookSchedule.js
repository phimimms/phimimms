import './BookSchedule/BookSchedule.scss';
import { getDailySchedule } from '../../util/bookSchedule';
import BookScheduleRow from './BookSchedule/BookScheduleRow';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const BookSchedule = ({ bookDeadline, books }) => {
    const schedule = getDailySchedule(bookDeadline, books);

    return (
        <div className="BookSchedule">
            {schedule.map((s) =>
                <BookScheduleRow
                    key={s.book._id}
                    book={s.book}
                    progressGoal={s.progressGoal}
                    />
            )}
        </div>
    );
};

BookSchedule.propTypes = {
    bookDeadline: PropTypes.object,
    books: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        bookDeadline: state.bookCatalog.deadline,
        books: state.bookCatalog.books
    };
}

export default connect(mapStateToProps)(BookSchedule);
