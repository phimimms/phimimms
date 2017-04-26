/**
 * The entitiy to represent the schedule for a book.
 * @typedef     {Object}                bookSchedule~BookSchedule
 * @property    {module:bookApi~Book}   book            The book entity
 * @property    {Number}                progressGoal    The goal for the book's progress value
 */

/**
 * Returns the specified book's progress in terms of pages.
 * @param  {module:bookApi~Book}    book    The book entity
 * @return {Number}
 */
const getBookProgress = function(book) {
    if (book.isKindle) {
        return Math.floor(book.length * book.progress / 100);
    }
    return book.progress;
};

/**
 * Returns the number of pages remaining to read for all the given books
 * @param  {Array.<module:bookApi~Book>}    books   The book entities
 * @return {Number}
 */
const getRemainingProgress = function(books) {
    let progress = 0;

    for (let book of books) {
        progress += book.length - getBookProgress(book);
    }

    return progress;
};

/**
 * Returns today's schedule to complete all of the specified books by the deadline.
 * @param  {Date}                           deadline    The deadline for the books
 * @param  {Array.<module:bookApi~Book>}    books       The book entities
 * @return {Array.<bookSchedule~BookSchedule>}
 */
export const getDailySchedule = function(deadline, books) {
    const schedule = [];
    if (!deadline || !books.length) {
        return schedule;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const duration = Math.ceil((deadline.valueOf() - today.valueOf()) / 1000 / 60 / 60 / 24);

    let avgProgress = Math.ceil(getRemainingProgress(books) / duration);

    for (let book of books) {
        if (!avgProgress) {
            return schedule;
        }

        const bookProgress = getBookProgress(book);
        const bookSchedule = bookProgress + avgProgress;

        if (bookSchedule >= book.length) {
            schedule.push({
                book,
                progressGoal: book.isKindle ? 100 : book.length
            });

            avgProgress -= book.length - bookProgress;
            continue;
        }

        schedule.push({
            book,
            progressGoal: book.isKindle ? Math.ceil(bookSchedule / book.length * 100) : bookSchedule
        });

        return schedule;
    }
};

/**
 * Returns the presentational string of the specified book's schedule.
 * @param  {module:bookApi~Book}    book            The book entity
 * @param  {Number}                 progressGoal    The goal for the book's progress value
 * @return {String}
 */
export const getPresentationSchedule = function(book, progressGoal) {
    const maxProgress = book.isKindle ? 100 : book.length;

    if (progressGoal === maxProgress) {
        return `Finish "${book.title}"`;
    }

    if (book.isKindle) {
        return `Read "${book.title}" to ${progressGoal}%`;
    }

    return `Read "${book.title}" to Page ${progressGoal}`;
};
