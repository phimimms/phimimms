/**
 * @module components/Popover
 */

import { Popover as PopoverMUI } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';

export default class Popover extends React.PureComponent {
  static propTypes = {
    anchor: PropTypes.instanceOf(Element),
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  /**
   * Invokes the provided handler to close the component.
   * @param {string}  reason  Expresses the cause of the event trigger.
   */
  onClose = (reason) => {
    if (reason === 'clickAway') {
      return;
    }

    this.props.onClose();
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { anchor, children, isOpen, ...props } = this.props;

    return (
      <PopoverMUI
        {...props}
        anchorEl={anchor}
        onRequestClose={this.onClose}
        open={isOpen}
        useLayerForClickAway={false}
      >
        {children}
      </PopoverMUI>
    );
  }
}
