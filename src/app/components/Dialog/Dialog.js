/**
 * @module components/Dialog
 */

import { Dialog as DialogMUI } from 'material-ui';
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
