import('components/App')
  .then(({ default: App }) => new App({
    target: document.body,
  }));
