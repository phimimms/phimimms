import BookCatalogPage from './bookCatalog/BookCatalogPage'; // eslint-disable-line import/no-named-as-default
import Header from './Header';
import { setHomeView } from '../../actions/homeActions';
import * as homeViews from '../../dictionary/homeViews';
import LandingPage from './landing/LandingPage';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    /**
     * Instantiates the component.
     * @param {Object}  props   The initial values of instance properties
     */
    constructor(props) {
        super(props);

        /* Contextually binds the DOM event callbacks to the component */
        this._onHomeButtonClick = this._onHomeButtonClick.bind(this);
    }

    /**
     * Sets the home view to the landing page.
     * @private
     */
    _onHomeButtonClick() {
        this.props.setHomeView(homeViews.LANDING);
    }

    /**
     * Generates the HTML representation of the component.
     * @return {Element}
     */
    render() {
        const { homeView } = this.props;

        return (
            <div className="HomePage">
                <Header
                    onHomeButtonClick={this._onHomeButtonClick}
                    />
                {homeView === homeViews.LANDING && <LandingPage />}
                {homeView === homeViews.BOOK_CATALOG && <BookCatalogPage />}
            </div>
        );
    }
}

HomePage.propTypes = {
    homeView: PropTypes.string.isRequired,
    setHomeView: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        homeView: state.home.componentName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setHomeView: (componentName) => {
            dispatch(setHomeView(componentName));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
