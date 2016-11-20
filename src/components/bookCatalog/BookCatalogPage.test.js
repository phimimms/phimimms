import { BookCatalogPage } from './BookCatalogPage';
//import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

function setup({ actions = {}, books = [] } = {}) {
    const props = {
        actions,
        books
    };

    return mount(<BookCatalogPage {...props} />);
}

describe('Book Catalog Page', () => {
    it('Initialize without Books', () => {
        setup();
    });
});
