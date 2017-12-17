/**
 * @module components/InputField
 */

import { TextField } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';

export default class InputField extends React.PureComponent {
  static propTypes = {
    isFullWidth: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }

  /**
   * Invokes the provided handler with the proper function signature.
   * @param {Object}  evt   The event object.
   * @param {string}  value The value of the input.
   */
  onChange = (evt, value) => {
    this.props.onChange(value);
  }

  render() {
    const { isFullWidth = true, label, value, ...props } = this.props;

    return (
      <TextField
        {...props}
        floatingLabelText={label}
        fullWidth={isFullWidth}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}
