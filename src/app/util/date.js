// TODO: Support localization
const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

/**
 * Returns the presentational representation of the given date.
 * @param   {Date}   [date]  The date to represent.
 * @returns {string}
 */
export function getPresentationFormat(date = new Date()) {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
