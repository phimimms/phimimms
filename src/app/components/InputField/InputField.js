/**
 * @module components/InputField
 */

import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class InputField extends PureComponent {
  static propTypes = {
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
    const { label, value, ...props } = this.props;

    return (
      <TextField
        {...props}
        floatingLabelText={label}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}
