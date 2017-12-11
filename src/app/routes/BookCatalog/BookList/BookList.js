/**
 * @module BookCatalog/BookList
 */

import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import PropTypes from 'prop-types';
import React from 'react';

import Button from 'components/Button/Button';

import './BookList.scss';
import BookListItem from './BookListItem/BookListItem';
import NewBookDialog from './NewBookDialog/NewBookDialog';

export default class BookList extends React.PureComponent {
  static propTypes = {
    books: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired,
    saveBook: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  state = {
    isNewBookDialogOpen: false,
  }

  /**
   * Closes the New Book Dialog.
   */
  onCloseNewBookDialog = () => {
    this.setState({ isNewBookDialogOpen: false });
  }

  /**
   * Opens the New Book Dialog.
   */
  onOpenNewBookDialog = () => {
    this.setState({ isNewBookDialogOpen: true });
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { books, deleteBook, saveBook, tokens } = this.props;
    const { isNewBookDialogOpen } = this.state;

    return (
      <div className="BookList">
        <div className="BookList__content">

          <div className="BookList__title">
            <div>{tokens.BookList.bookCatalog}</div>

            <Button
              icon={<AddIcon />}
              onClick={this.onOpenNewBookDialog}
              title={tokens.BookList.addBook}
            />
          </div>

          <div className="BookList__header BookList__grid">
            <div>{tokens.global.bookProperty.title}</div>
            <div>{tokens.global.bookProperty.author}</div>
            <div>{tokens.global.bookProperty.progress}</div>
            <div>{tokens.global.options}</div>
          </div>

          <div className="BookList__divider" />

          {
            books.map((book) => {
              return (
                <BookListItem
                  book={book}
                  deleteBook={deleteBook}
                  key={book._id}
                  saveBook={saveBook}
                  tokens={tokens}
                />
              );
            })
          }
        </div>

        <NewBookDialog
          isOpen={isNewBookDialogOpen}
          onClose={this.onCloseNewBookDialog}
          saveBook={saveBook}
          title={tokens.BookList.addBook}
          tokens={tokens}
        />
      </div>
    );
  }
}
