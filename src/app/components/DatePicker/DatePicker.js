/**
 * @module components/DatePicker
 */

import { DatePicker as DatePickerMUI } from 'material-ui';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import './DatePicker.scss';

class DatePicker extends React.PureComponent {
  /**
   * Returns the presentational representation of the component's value.
   * @param   {Date}    value The value of the component.
   * @returns {string}
   */
  formatDate = (value) => {
    return moment(value).format('MMMM Do YYYY');
  }

  /**
   * Invokes the provided handler to change the value of the component.
   * @param {Object}  evt   The event object.
   * @param {Date}    value The new value of the component.
   */
  onChange = (evt, value) => {
    this.props.onChange(value);
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { ...props } = this.props;

    return (
      <DatePickerMUI
        {...props}
        className="DatePicker"
        formatDate={this.formatDate}
        onChange={this.onChange}
      />
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
