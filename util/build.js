import webpack from 'webpack';

import getWebpackConfig from '../webpack.config';

/* Sets Production Environment */
process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production...');

/* Builds Production Application */
webpack(getWebpackConfig()).run((err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(e => console.log(e));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings:');
    jsonStats.warnings.map(warning => console.log(warning));
  }

  return 0;
});
