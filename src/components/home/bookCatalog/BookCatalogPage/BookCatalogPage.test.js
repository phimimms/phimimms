import { BookCatalogPage } from '../BookCatalogPage';
//import expect from 'expect';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

/* Needed for Material-UI click events */
injectTapEventPlugin();

function setup({ bookDeadline, books, deleteBook, saveBook, saveBookDeadline } = {}) {
    const props = {
        bookDeadline,
        books: books || [],
        deleteBook: deleteBook || Function.prototype,
        saveBook: saveBook || Function.prototype,
        saveBookDeadline: saveBookDeadline || Function.prototype
    };

    return mount(<MuiThemeProvider><BookCatalogPage {...props} /></MuiThemeProvider>);
}

describe('Book Catalog Page', () => {
    it('Initialize without Books', () => {
        setup();
    });
});
