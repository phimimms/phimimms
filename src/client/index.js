import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from 'components/App';
import configureStore from 'store/configureStore';
import initialState from 'store/initialState';

import './style.css';

/* Register Material-UI Click Events */
injectTapEventPlugin();

/* Create Redux Store */
const store = configureStore(initialState);

const renderApplication = (Component) => {
  render(
    <AppContainer>
      <MuiThemeProvider>
        <BrowserRouter>
          <Provider store={store}>
            <Component />
          </Provider>
        </BrowserRouter>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

/* Render the Application */
renderApplication(App);

if (module.hot) {
  /* Enables React Hot Reloading */
  module.hot.accept('components/App', () => {
    renderApplication(require('components/App').default);
  });
}
