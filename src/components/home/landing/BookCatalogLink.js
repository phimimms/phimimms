import ActionBook from 'material-ui/svg-icons/action/book';
import { grey900 } from 'material-ui/styles/colors';
import { BOOK_CATALOG } from '../../../dictionary/homeViews';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import React, { PropTypes } from 'react';

const styles = {
    paper: {
        cursor: 'pointer',
        display: 'inline-block',
        height: '7em',
        textAlign: 'center',
        width: '7em'
    }
};

class BookCatalogLink extends React.Component {
    /**
     * Instantiates the component.
     * @param {Object}  props   The initial values of instance properties
     */
    constructor(props) {
        super(props);

        /* Contextually binds the DOM event callbacks to the component */
        this._onBookCatalogClick = this._onBookCatalogClick.bind(this);
    }

    /**
     * Sets the home view to the book catalog page.
     * @private
     */
    _onBookCatalogClick() {
        this.props.setHomeView(BOOK_CATALOG);
    }

    /**
     * Generates the HTML representation of the component.
     * @return {Element}
     */
    render() {
        return (
            <Paper
                circle={true}
                onClick={this._onBookCatalogClick}
                style={styles.paper}
                zDepth={4}
                >
                <IconButton>
                    <ActionBook color={grey900} />
                </IconButton>
                <div className="user-select--none">Book Catalog</div>
            </Paper>
        );
    }
}

BookCatalogLink.propTypes = {
    setHomeView: PropTypes.func.isRequired
};

export default BookCatalogLink;
