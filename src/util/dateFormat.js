const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Returns the presentational representation of the specified date.
 * @param  {Date}   [date]  The date to represent
 * @return {String}
 */
export const getPresentationFormat = function(date = new Date()) {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
