import './BookScheduleRow/BookScheduleRow.scss';
import { getPresentationSchedule } from '../../../util/bookSchedule';
import React, { PropTypes } from 'react';

const BookScheduleRow = ({ book, progressGoal }) => {
    const schedule = getPresentationSchedule(book, progressGoal);

    return (
        <div className="BookScheduleRow">
            <h2 className="BookScheduleRow__content">{schedule}</h2>
        </div>
    );
};

BookScheduleRow.propTypes = {
    book: PropTypes.object.isRequired,
    progressGoal: PropTypes.number.isRequired
};

export default BookScheduleRow;
