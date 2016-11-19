import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* Page Components */
import App from './components/App';
import BookCatalogPage from './components/bookCatalog/BookCatalogPage';
import DisplayPage from './components/display/DisplayPage';
import HomePage from './components/home/HomePage';

/* Pairs Routes to Components */
export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="bookCatalog" component={BookCatalogPage} />
        <Route path="display" component={DisplayPage} />
    </Route>
);
