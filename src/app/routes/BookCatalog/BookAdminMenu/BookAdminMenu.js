/**
 * @module BookCatalog/BookAdminMenu
 */

import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import PropTypes from 'prop-types';
import React from 'react';

import AdminMenu from 'components/AdminMenu/AdminMenu';
import Button from 'components/Button/Button';
import DatePicker from 'components/DatePicker/DatePicker';
import { getSchedule } from 'util/book';

import './BookAdminMenu.scss';

export default class BookAdminMenu extends React.PureComponent {
  static propTypes = {
    bookDeadline: PropTypes.string,
    onOpenAddBookDialog: PropTypes.func.isRequired,
    saveBookDeadline: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
    unfinishedBooks: PropTypes.array.isRequired,
  }

  /**
   * Returns the presentational string of the given book's schedule.
   * @param   {module:util/book~BookSchedule} bookSchedule  The schedule of the book.
   * @returns {string}
   */
  getPresentationSchedule = ({ book, readingGoal }) => {
    const { tokens } = this.props;

    if (readingGoal === book.lastPageNumber) {
      return tokens.formatString(tokens.BookAdminMenu.bookSchedule.finishBook, book.title);
    }

    if (book.isKindle) {
      return tokens.formatString(tokens.BookAdminMenu.bookSchedule.readKindle, book.title, readingGoal);
    }

    return tokens.formatString(tokens.BookAdminMenu.bookSchedule.readBook, book.title, readingGoal);
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { bookDeadline, onOpenAddBookDialog, saveBookDeadline, tokens, unfinishedBooks } = this.props;

    return (
      <AdminMenu
        tokens={tokens}
      >
        <div className="BookAdminMenu__content">
          <div className="BookAdminMenu__deadline">

            <div className="BookAdminMenu__item">
              <div className="BookAdminMenu__book-schedule-title">{tokens.BookAdminMenu.goal}</div>
              {
                getSchedule(unfinishedBooks, new Date(bookDeadline)).map((bookSchedule) => {
                  return (
                    <div
                      className="BookAdminMenu__book-schedule"
                      key={bookSchedule.book._id}
                    >
                      {this.getPresentationSchedule(bookSchedule)}
                    </div>
                  );
                })
              }
            </div>

            <div className="BookAdminMenu__item">
              <div className="BookAdminMenu__book-schedule-title">{tokens.BookAdminMenu.deadline}</div>
              <DatePicker
                hintText={tokens.BookAdminMenu.deadline}
                minDate={new Date()}
                onChange={saveBookDeadline}
                value={new Date(bookDeadline)}
              />
            </div>
          </div>

          <Button
            icon={<AddIcon />}
            onClick={onOpenAddBookDialog}
            title={tokens.BookCatalog.addBook}
          />
        </div>
      </AdminMenu>
    );
  }
}
