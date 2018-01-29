/**
 * @module BookCatalog/BookLists
 */

import PropTypes from 'prop-types';
import React from 'react';

import DeleteDialog from 'components/DeleteDialog/DeleteDialog';
import EditBookDialog from 'components/EditBookDialog/EditBookDialog';
import Popover from 'components/Popover/Popover';
import { orientation } from 'dictionary/element';

import './BookLists.scss';
import BookDetails from './BookDetails/BookDetails';
import BookList from './BookList/BookList';

export default class BookLists extends React.PureComponent {
  static propTypes = {
    deleteBook: PropTypes.func.isRequired,
    finishedBooks: PropTypes.object.isRequired,
    isDialogDisabled: PropTypes.bool.isRequired,
    languageCode: PropTypes.string.isRequired,
    saveBook: PropTypes.func.isRequired,
    tokens: PropTypes.object.isRequired,
    unfinishedBooks: PropTypes.array.isRequired,
  }

  state = {
    bookDetailsAnchor: null,
    isBookDetailsPopoverOpen: false,
    isDeleteBookDialogOpen: false,
    isEditBookDialogOpen: false,
    selectedBook: null,
  }

  /**
   * Closes the Delete Book Dialog.
   */
  onCloseDeleteBookDialog = () => {
    this.setState({
      isDeleteBookDialogOpen: false,
      selectedBook: null,
    });
  }

  /**
   * Closes the Edit Book Dialog.
   */
  onCloseEditBookDialog = () => {
    this.setState({
      isEditBookDialogOpen: false,
      selectedBook: null,
    });
  }

  /**
   * Deletes the selected book.
   */
  onDeleteBook = () => {
    this.props.deleteBook(this.state.selectedBook._id);
    this.onCloseDeleteBookDialog();
  }

  /**
   * Deselects the book and closes the Book Details Popover.
   */
  onDeselectBook = () => {
    this.setState({
      bookDetailsAnchor: null,
      isBookDetailsPopoverOpen: false,
      selectedBook: null,
    });
  }

  /**
   * Opens the Delete Book Dialog.
   */
  onOpenDeleteBookDialog = () => {
    this.setState({
      bookDetailsAnchor: null,
      isBookDetailsPopoverOpen: false,
      isDeleteBookDialogOpen: true,
    });
  }

  /**
   * Opens the Edit Book Dialog.
   */
  onOpenEditBookDialog = () => {
    this.setState({
      bookDetailsAnchor: null,
      isBookDetailsPopoverOpen: false,
      isEditBookDialogOpen: true,
    });
  }

  /**
   * Aelects the book and opens the Book Details Popover.
   * @param {module:adapters/book~Book} selectedBook  The new selected book.
   * @param {Element}                   anchor        The anchor to the Book Details Popover.
   */
  onSelectBook = (selectedBook, anchor) => {
    this.setState({
      bookDetailsAnchor: anchor,
      isBookDetailsPopoverOpen: true,
      selectedBook,
    });
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { finishedBooks, isDialogDisabled, languageCode, saveBook, tokens, unfinishedBooks } = this.props;
    const {
      bookDetailsAnchor,
      isBookDetailsPopoverOpen,
      isDeleteBookDialogOpen,
      isEditBookDialogOpen,
      selectedBook,
    } = this.state;

    return (
      <div className="BookLists">
        <BookList
          books={unfinishedBooks}
          languageCode={languageCode}
          onDeselectBook={this.onDeselectBook}
          onSelectBook={this.onSelectBook}
          selectedBook={selectedBook}
          title={tokens.BookLists.currentlyReading}
        />

        {
          Array.from(finishedBooks).map(([category, categoryBooks]) => {
            return (
              <BookList
                books={categoryBooks}
                key={category}
                languageCode={languageCode}
                onDeselectBook={this.onDeselectBook}
                onSelectBook={this.onSelectBook}
                selectedBook={selectedBook}
                title={tokens.global.bookCategory[category]}
              />
            );
          })
        }

        <Popover
          anchor={bookDetailsAnchor}
          anchorOrigin={{ horizontal: orientation.right, vertical: orientation.top }}
          className="BookLists__book-details"
          isOpen={!isDialogDisabled && isBookDetailsPopoverOpen}
          onClose={this.onDeselectBook}
          targetOrigin={{ horizontal: orientation.left, vertical: orientation.top }}
        >
          <BookDetails
            book={selectedBook}
            onCloseBookDetailsPopover={this.onDeselectBook}
            onOpenDeleteBookDialog={this.onOpenDeleteBookDialog}
            onOpenEditBookDialog={this.onOpenEditBookDialog}
            tokens={tokens}
          />
        </Popover>

        <EditBookDialog
          book={selectedBook || {}}
          isOpen={!isDialogDisabled && isEditBookDialogOpen}
          onClose={this.onCloseEditBookDialog}
          saveBook={saveBook}
          title={tokens.BookLists.editBook}
          tokens={tokens}
        />

        <DeleteDialog
          isOpen={!isDialogDisabled && isDeleteBookDialogOpen}
          name={selectedBook ? selectedBook.title : ''}
          onClose={this.onCloseDeleteBookDialog}
          onDelete={this.onDeleteBook}
          title={tokens.BookLists.deleteBook}
          tokens={tokens}
        />
      </div>
    );
  }
}
