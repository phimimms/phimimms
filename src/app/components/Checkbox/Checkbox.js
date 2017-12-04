/**
 * @module components/Checkbox
 */

import CheckboxMUI from 'material-ui/Checkbox';
import PropTypes from 'prop-types';
import React from 'react';

function Checkbox({ isChecked, label, onChange, ...props }) {
  return (
    <CheckboxMUI
      {...props}
      checked={isChecked}
      label={label}
      onCheck={onChange}
      style={{ width: `${label.length - 1}em` }}
    />
  );
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
