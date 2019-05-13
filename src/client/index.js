import { createStore } from 'redux/configure';

import './style.css';

createStore();

import('components/App')
  .then(({ default: App }) => new App({
    target: document.body,
  }));
