import { BookCatalog } from '../BookCatalog';
//import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

/* Needed for Material-UI click events */
injectTapEventPlugin();

function setup() {
    const props = {};

    return shallow(<BookCatalog {...props} />);
}

describe('Book Catalog', () => {
    it('Initialize without Books', () => {
        setup();
    });
});
