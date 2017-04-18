import AppBar from 'material-ui/AppBar';
import * as colors from 'material-ui/styles/colors';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import React, { PropTypes } from 'react';

const styles = {
    el: {
        backgroundColor: colors.indigo500
    },
    title: {
        color: colors.grey100
    }
};

const Header = ({ onHomeButtonClick }) => {
    return (
        <AppBar
            className="user-select--none"
            iconElementLeft={<IconButton><ActionHome color={colors.grey100}/></IconButton>}
            onLeftIconButtonTouchTap={onHomeButtonClick}
            style={styles.el}
            title={<span style={styles.title}>The Daily Phi</span>}
            />
    );
};

Header.propTypes = {
    onHomeButtonClick: PropTypes.func.isRequired
};

export default Header;
