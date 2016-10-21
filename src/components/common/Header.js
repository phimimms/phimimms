import React from 'react';
import { IndexLink } from 'react-router';

const Header = () => {
    return (
        <IndexLink to="/" activeClassName="active">
            <h1>The Daily Phi</h1>
        </IndexLink>
    );
};

export default Header;
