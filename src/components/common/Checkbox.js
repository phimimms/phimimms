import CheckboxUI from 'material-ui/Checkbox';
import { indigo500 } from 'material-ui/styles/colors';
import React, { PropTypes } from 'react';

const styles = {
    el: {
        display: 'inline-block',
        userSelect: 'none'
    },
    icon: {
        fill: indigo500
    },
    label: {
        color: indigo500
    }
};

const Checkbox = ({ isChecked, label, onCheck }) => {
    styles.el.width = `${label.length}em`;

    return (
        <CheckboxUI
            checked={isChecked}
            iconStyle={styles.icon}
            label={label}
            labelPosition="right"
            labelStyle={styles.label}
            onCheck={onCheck}
            style={styles.el}
            />
    );
};

Checkbox.propTypes = {
    isChecked: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired
};

export default Checkbox;
