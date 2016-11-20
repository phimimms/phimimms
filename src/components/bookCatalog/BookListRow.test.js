import BookListRow from './BookListRow';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

function setup(book) {
    const props = {
        book
    };

    return shallow(<BookListRow {...props} />);
}

describe('Book List Row', () => {
    it('Renders <div> with Book Title as innerHTML', () => {
        const wrapper = setup({title: 'Batman'});
        expect(wrapper.find('div').length).toBe(1);
        expect(wrapper.find('div').text()).toEqual('Batman');
    });
});
