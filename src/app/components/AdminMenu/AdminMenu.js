/**
 * @module components/AdminMenu
 */

import PropTypes from 'prop-types';
import React from 'react';

import './AdminMenu.scss';

function AdminMenu({ children, tokens }) {
  return (
    <div className="AdminMenu">
      <div className="AdminMenu__content-container">
        <div className="AdminMenu__title">{tokens.AdminMenu.title}</div>

        <div className="AdminMenu__content">
          {children}
        </div>
      </div>
    </div>
  );
}

AdminMenu.propTypes = {
  children: PropTypes.node.isRequired,
  tokens: PropTypes.object.isRequired,
};

export default AdminMenu;
