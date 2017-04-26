import './DisplayPage/DisplayPage.scss';
import BookSchedule from './BookSchedule';
import React from 'react';

const DisplayPage = () => {
    return (
        <div className="DisplayPage user-select--none">
            <BookSchedule />
        </div>
    );
};

DisplayPage.propTypes = {};

export default DisplayPage;
