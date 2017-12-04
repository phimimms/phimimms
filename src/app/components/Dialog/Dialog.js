/**
 * @module components/Dialog
 */

import DialogMUI from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import React from 'react';

function Dialog({ children, isModal = true, isOpen, ...props }) {
  return (
    <DialogMUI
      {...props}
      modal={isModal}
      open={isOpen}
    >
      {children}
    </DialogMUI>
  );
}

Dialog.propTypes = {
  children: PropTypes.node,
  isModal: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
};

export default Dialog;
