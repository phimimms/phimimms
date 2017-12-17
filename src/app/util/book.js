/**
 * @module util/book
 */

/**
 * The entity to represent the schedule for a book.
 * @typedef   {Object}                    BookSchedule
 * @property  {module:adapters/book~Book} book          The book entity.
 * @property  {number}                    readingGoal   The goal for the book's reading progression.
 */

/**
 * Returns the current page number of the given book.
 * @param   {module:adapters/book~Book} book  The book entity.
 * @returns {number}
 */
function getCurrentPageNumber(book) {
  if (book.isKindle) {
    return Math.floor(
      book.numberOfPages * book.currentPageNumber /
      (book.lastPageNumber - book.firstPageNumber) / 100
    );
  }
  return book.currentPageNumber;
}

/**
 * Returns the reading goal of the given book in terms of its reading progression metric.
 * @param   {module:adapters/book~Book} book                  The book entity.
 * @param   {number}                    readingGoalPageNumber The page number of the reading goal.
 * @returns {number}
 */
function getReadingGoal(book, readingGoalPageNumber) {
  if (book.isKindle) {
    return Math.floor(
      readingGoalPageNumber * (book.lastPageNumber - book.firstPageNumber) / book.numberOfPages
    );
  }
  return readingGoalPageNumber;
}

/**
 * Returns the number of pages remaining for the given book.
 * @param   {module:adapters/book~Book} book  The book entity.
 * @returns {number}
 */
function getRemainingNumberOfPages(book) {
  if (book.isKindle) {
    return Math.floor(
      book.numberOfPages * (book.lastPageNumber - book.currentPageNumber) /
      (book.lastPageNumber - book.firstPageNumber) / 100
    );
  }
  return book.lastPageNumber - book.currentPageNumber + 1;
}

/**
 * Returns the number of pages remaining to read for all the given books.
 * @param   {Array.<module:adapters/book~Book>} books The book entities.
 * @returns {number}
 */
function getTotalRemainingNumberOfPages(books) {
  let sumOfPages = 0;

  for (const book of books) {
    sumOfPages += getRemainingNumberOfPages(book);
  }

  return sumOfPages;
}

/**
 * Returns the reading completion percentage of the given book.
 * @param   {module:adapters/book~Book} book  The book entity.
 * @returns {number}
 */
export function getReadingCompletionPercentage(book) {
  return Math.floor(
    (book.currentPageNumber - book.firstPageNumber) /
    (book.lastPageNumber - book.firstPageNumber) * 100
  );
}

/**
 * Returns the presentational string of the given book's schedule.
 * @param   {module:util/book~BookSchedule} bookSchedule  The schedule of the book.
 * @returns {string}
 */
export function getPresentationSchedule({ book, readingGoal }) {
  // TODO: Support localization
  if (readingGoal === book.lastPageNumber) {
    return `Finish "${book.title}"`;
  }

  if (book.isKindle) {
    return `Read "${book.title}" to ${readingGoal}%`;
  }

  return `Read "${book.title}" to Page ${readingGoal}`;
}

/**
 * Returns today's schedule to complete all of the given books by the deadline.
 * @param   {Array.<module:adapters/book~Book>} books     The book entities.
 * @param   {Date}                              deadline  The deadline for the books.
 * @returns {Array.<util/book~BookSchedule>}
 */
export function getSchedule(books, deadline) {
  const schedule = [];
  if (!deadline || !books.length) {
    return schedule;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const duration = Math.ceil((deadline.valueOf() - today.valueOf()) / 1000 / 60 / 60 / 24);

  let dailyNumberOfPages = Math.ceil(getTotalRemainingNumberOfPages(books) / duration);

  for (const book of books) {
    if (dailyNumberOfPages <= 0) {
      return schedule;
    }

    const currentPageNumber = getCurrentPageNumber(book);
    const readingGoalPageNumber = currentPageNumber + dailyNumberOfPages;
    const readingGoal = getReadingGoal(book, readingGoalPageNumber);

    if (readingGoal >= book.lastPageNumber) {
      schedule.push({
        book,
        readingGoal: book.lastPageNumber,
      });

      if (book.isKindle) {
        dailyNumberOfPages -= book.numberOfPages - currentPageNumber;
      } else {
        dailyNumberOfPages -= book.lastPageNumber - currentPageNumber;
      }

      continue;
    }

    schedule.push({
      book,
      readingGoal,
    });

    return schedule;
  }
}
