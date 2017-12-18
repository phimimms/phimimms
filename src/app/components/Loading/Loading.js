/**
 * @module components/Loading
 */

import { CircularProgress } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';

import { primaryColor } from 'dictionary/colors';

import './Loading.scss';

function Loading({ className, size = 40, thickness = 3.5, ...props }) {
  return (
    <div className={`Loading${className ? ` ${className}` : ''}`}>
      <CircularProgress
        {...props}
        color={primaryColor}
        size={size}
        thickness={thickness}
      />
    </div>
  );
}

Loading.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  thickness: PropTypes.number,
};

export default Loading;
