import BookCatalogLink from './BookCatalogLink';
import { setHomeView } from '../../../actions/homeActions';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class LandingPage extends React.Component {
    /**
     * Instantiates the component.
     * @param {Object}  props   The initial values of instance properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * Generates the HTML representation of the component.
     * @return {Element}
     */
    render() {
        const { setHomeView } = this.props;

        return (
            <div className="LandingPage">
                <Link to="display" activeClassName="active">Display Page</Link>
                <BookCatalogLink
                    setHomeView={setHomeView}
                    />
            </div>
        );
    }
}

LandingPage.propTypes = {
    setHomeView: PropTypes.func.isRequired
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        setHomeView: (componentName) => {
            dispatch(setHomeView(componentName));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
