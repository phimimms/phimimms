import { indigo500 } from 'material-ui/styles/colors';
import DatePickerUI from 'material-ui/DatePicker';
import { getPresentationFormat } from '../../util/dateFormat';
import React, { PropTypes } from 'react';

const styles = {
    input: {
        backgroundColor: 'white',
        color: indigo500
    },
    underline: {
        borderColor: indigo500
    }
};

const DatePicker = ({ autoOk = true, maxDate, minDate, name, onChange, value }) => {
    return (
        <DatePickerUI
            id={name}
            autoOk={autoOk}
            container="inline"
            dialogContainerStyle={styles.dialog}
            formatDate={getPresentationFormat}
            inputStyle={styles.input}
            maxDate={maxDate}
            minDate={minDate}
            mode="landscape"
            onChange={onChange}
            underlineStyle={styles.underline}
            value={value}
            />
    );
};

DatePicker.propTypes = {
    autoOk: PropTypes.bool,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
};

export default DatePicker;
