/**
 * @module components/DropDownMenu
 */

import { DropDownMenu as DropDownMenuMUI } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';

import { selectedColor } from 'dictionary/colors';

export default class DropDownMenu extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }

  /**
   * Invokes the provided handler to change the value of the component.
   * @param {Object}  evt   The event object.
   * @param {number}  key   The index.
   * @param {*}       value The new value of the component.
   */
  onChange = (evt, key, value) => {
    this.props.onChange(value);
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { children, isDisabled = false, ...props } = this.props;

    return (
      <DropDownMenuMUI
        {...props}
        disabled={isDisabled}
        onChange={this.onChange}
        selectedMenuItemStyle={{ color: selectedColor }}
      >
        {children}
      </DropDownMenuMUI>
    );
  }
}
