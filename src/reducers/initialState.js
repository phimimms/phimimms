import * as homeViews from '../dictionary/homeViews';

/* The Initial State of the Redux Store */
export default {
    bookCatalog: {
        books: [],
        deadline: null
    },
    home: {
        componentName: homeViews.LANDING
    }
};
