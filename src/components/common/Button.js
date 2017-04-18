import { indigo500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import React, { PropTypes } from 'react';

const Button = ({ isDisabled = false, label, onClick }) => {
    return (
        <RaisedButton
            backgroundColor={indigo500}
            disabled={isDisabled}
            label={label}
            onClick={onClick}
            />
    );
};

Button.propTypes = {
    isDisabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Button;
