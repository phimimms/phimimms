/**
 * @module components/Popover
 */

import PopoverMUI from 'material-ui/Popover';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * The supported values for the horizontal and vertical orientations in relation
 * to the component's anchor and target element.
 * @type  {Object.<string>}
 */
export const orientation = {
  bottom: 'bottom',
  center: 'center',
  left: 'left',
  middle: 'middle',
  right: 'right',
  top: 'top',
};

class Popover extends React.PureComponent {
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

Popover.propTypes = {
  anchor: PropTypes.instanceOf(Element),
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popover;
