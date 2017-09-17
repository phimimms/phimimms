import { indigo500 } from 'material-ui/styles/colors';
import TextFieldUI from 'material-ui/TextField';
import React, { PropTypes } from 'react';

const styles = {
    el: {
        margin: '1em'
    },
    floatingLabelText: {
        color: indigo500
    },
    inputText: {
        color: 'black'
    },
    underline: {
        borderColor: indigo500
    }
};

const TextField = ({ isFloating = true, label, name, onChange, value }) => {
    return (
        <TextFieldUI
            id={name}
            inputStyle={styles.inputText}
            floatingLabelText={isFloating ? label : ''}
            floatingLabelStyle={isFloating ? styles.floatingLabelText : {}}
            onChange={onChange}
            style={styles.el}
            underlineStyle={styles.underline}
            underlineFocusStyle={styles.underline}
            value={value}
            />
    );
};

TextField.propTypes = {
    isFloating: PropTypes.bool,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default TextField;
