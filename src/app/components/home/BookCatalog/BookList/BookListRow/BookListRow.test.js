import { BookListRow } from '../BookListRow';
import expect from 'expect';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { TableRow } from 'material-ui/Table';

function setup({ book = {}, deleteBook, saveBook }) {
    const props = {
        book,
        deleteBook: deleteBook || Function.prototype,
        saveBook: saveBook || Function.prototype
    };

    return mount(<MuiThemeProvider><BookListRow {...props} /></MuiThemeProvider>);
}

describe('Book List Row', () => {
    it('Renders <TableRow>', () => {
        const wrapper = setup({});
        expect(wrapper.find(TableRow).length).toBe(1);
    });
});
