/**
 * @module App/Header
 */

import NavigateBackIcon from 'material-ui/svg-icons/image/navigate-before';
import PropTypes from 'prop-types';
import React from 'react';

import './Header.scss';

export default class Header extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    tokens: PropTypes.object.isRequired,
  }

  /**
   * Navigates the application to the previous route.
   */
  onBackButtonClick = () => {
    const { history, pathname } = this.props;

    history.push(pathname.split('/').slice(0, -1).join('/'));
  }

  /**
   * Generates the HTML representation of the component.
   * @returns {Element}
   */
  render() {
    const { pathname, tokens } = this.props;

    const route = pathname.split('/').pop();
    const isHome = !route.length;

    return (
      <div className="Header">
        <div
          className={`Header__back-button${isHome ? ' Header__back-button--disabled' : ''}`}
          title={tokens.Header.back}
        >
          <NavigateBackIcon
            className="Header__back-icon"
            onClick={!isHome ? this.onBackButtonClick : Function.prototype}
          />
        </div>

        <div className="Header__content-container">
          <div className="Header__content">
            <div className="Header__title">
              {isHome ? tokens.Header.title.home : tokens.Header.title[route]}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
