import BookIcon from 'material-ui/svg-icons/action/book';
import { grey900 } from 'material-ui/styles/colors';
import { setHomeView } from '../../../actions/homeActions';
import { BOOK_CATALOG } from '../../../dictionary/homeViews';
import IconButton from 'material-ui/IconButton';
import PaperLink from '../../common/PaperLink';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const BookCatalogLink = ({ className, goToBookCatalog }) => {
    return (
        <div className={`BookCatalogLink ${className}`}>
            <PaperLink
                onClick={goToBookCatalog}
                >
                <IconButton>
                    <BookIcon color={grey900} />
                </IconButton>
                <div className="user-select--none">Book Catalog</div>
            </PaperLink>
        </div>
    );
};

BookCatalogLink.propTypes = {
    className: PropTypes.string.isRequired,
    goToBookCatalog: PropTypes.func.isRequired
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        goToBookCatalog: () => {
            dispatch(setHomeView(BOOK_CATALOG));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCatalogLink);
