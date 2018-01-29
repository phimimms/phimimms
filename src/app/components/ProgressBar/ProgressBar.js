/**
 * @module components/ProgressBar
 */

import { LinearProgress } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import tinygradient from 'tinygradient';

import './ProgressBar.scss';

const gradient = tinygradient('red', 'yellow', 'green').rgb(50);

/**
 * @param   {number}  value A number in the range of [0, 100].
 * @returns {Element}
 */
function ProgressBar({ value, ...props }) {
  const index = Math.max(0, Math.round(value / 2) - 1);
  const color = gradient[index].toHexString();

  return (
    <div className="ProgressBar">
      <LinearProgress
        {...props}
        color={color}
        mode="determinate"
        value={value}
      />
      <div className="ProgressBar__label">{value}%</div>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBar;
