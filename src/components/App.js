import './App.scss';
import { indigo500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const muiTheme = {
    datePicker: {
        selectColor: indigo500
    },
    raisedButton: {
        textColor: 'white'
    }
};

/**
 * The Application Container
 */
class App extends React.Component {
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
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(App);
