import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import React from 'react';

function Button({ isDisabled = false, isFlat = false, onClick, ...props }) {
  if (isFlat) {
    return (
      <FlatButton
        {...props}
        disabled={isDisabled}
        onTouchTap={isDisabled ? Function.prototype : onClick}
      />
    );
  }

  return (
    <RaisedButton
      {...props}
      disabled={isDisabled}
      onTouchTap={isDisabled ? Function.prototype : onClick}
    />
  );
}

Button.propTypes = {
  isDisabled: PropTypes.bool,
  isFlat: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;
