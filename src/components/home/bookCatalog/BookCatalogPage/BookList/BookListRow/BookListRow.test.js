import BookListRow from '../BookListRow';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { TableRow } from 'material-ui/Table';

function setup({ book = {}, deleteBook, saveBook }) {
    const props = {
        book,
        deleteBook: deleteBook || Function.prototype,
        saveBook: saveBook || Function.prototype
    };

    return shallow(<BookListRow {...props} />);
}

describe('Book List Row', () => {
    it('Renders <div> with Book Title as innerHTML', () => {
        const wrapper = setup({});
        expect(wrapper.find(TableRow).length).toBe(1);
    });
});
