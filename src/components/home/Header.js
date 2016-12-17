import AppBar from 'material-ui/AppBar';
import * as colors from 'material-ui/styles/colors';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import { browserHistory } from 'react-router';

const Header = () => {
    const classNames = {
        el: 'unselectable'
    };

    const styles = {
        el: {
            backgroundColor: colors.indigo500
        },
        title: {
            color: colors.grey100
        }
    };

    /**
     * Returns the application to the home page
     */
    const onHomeButtonClick = function() {
        browserHistory.push('/');
    };

    return (
        <AppBar
            className={classNames.el}
            iconElementLeft={<IconButton><ActionHome color={colors.grey100}/></IconButton>}
            onLeftIconButtonTouchTap={onHomeButtonClick}
            style={styles.el}
            title={<span style={styles.title}>The Daily Phi</span>}
        />
    );
};

export default Header;
