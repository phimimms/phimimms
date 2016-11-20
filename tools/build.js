import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production...');

webpack(webpackConfig).run((error, stats) => {
    if (error) {
        console.log(error);
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

    console.log(`Webpack stats: ${stats}`);

    return 0;
});
