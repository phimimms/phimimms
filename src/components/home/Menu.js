import './Menu/Menu.scss';
import BookCatalogLink from './Menu/BookCatalogLink';
import { grey100 } from 'material-ui/styles/colors';
import DisplayPageLink from './Menu/DisplayPageLink';
import React from 'react';

const classNames = {
    link: 'Menu__link'
};

const styles = {
    el: {
        backgroundColor: grey100
    }
};

const Menu = () => {
    return (
        <div className="Menu" style={styles.el}>
            <DisplayPageLink className={classNames.link} />
            <BookCatalogLink className={classNames.link} />
        </div>
    );
};

Menu.propTypes = {};

export default Menu;
