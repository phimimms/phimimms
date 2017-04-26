import './HomePage/HomePage.scss';
import BookCatalog from './BookCatalog';
import Header from './HomePage/Header';
import { setHomeView } from '../../actions/homeActions';
import * as homeViews from '../../dictionary/homeViews';
import Menu from './Menu';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const HomePage = ({ goToMenu, homeView }) => {
    return (
        <div className="HomePage">
            <Header
                onHomeButtonClick={goToMenu}
                />
            {homeView === homeViews.MENU && <Menu />}
            {homeView === homeViews.BOOK_CATALOG && <BookCatalog />}
        </div>
    );
};

HomePage.propTypes = {
    goToMenu: PropTypes.func.isRequired,
    homeView: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        homeView: state.home.componentName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goToMenu: () => {
            dispatch(setHomeView(homeViews.MENU));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
