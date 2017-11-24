/* eslint-disable import/unambiguous */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = function getWebpackConfig() {
  const isDev = (process.env.NODE_ENV !== 'production');

  const extractSass = new ExtractTextPlugin({
    disable: isDev,
    filename: 'styles.css',
  });

  return {
    devServer: {
      compress: true,
      historyApiFallback: true,
      hot: true,
      port: 3001,
      proxy: {
        '/api': 'http://localhost:3000',
      },
      stats: 'errors-only',
    },

    devtool: isDev ? 'inline-source-map' : 'hidden-source-map',

    entry: getEntry(isDev),

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: getStyleLoader(extractSass),
        },
        {
          test: /\.(eot|svg|ttf)(\?[a-z0-9]+)?$/,
          loader: 'file-loader',
        },
        {
          test: /\.(gif|jpg|png)$/,
          use: [
            {
              loader: 'url-loader',
              options: { limit: 8192 },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            { loader: 'babel-loader' },
          ],
        },
        {
          test: /\.woff(2)?(\?[a-z0-9]+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
      ],
    },

    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'src/client/dist'),
      publicPath: '/',
    },

    plugins: [...getPlugins(isDev), extractSass],

    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        path.join(__dirname, 'src/app'),
        'node_modules',
      ],
    },

    target: 'web',
  };
};

function getEntry(isDev) {
  const middlewares = [];

  if (isDev) {
    middlewares.push(
      'react-hot-loader/patch'
    );
  }

  return {
    app: [...middlewares, './src/client/index'],
    vendor: [
      'axios', 'prop-types', 'react', 'react-async-component', 'react-dom',
      'react-redux', 'react-router-dom', 'redux', 'redux-localstorage', 'redux-thunk',
    ],
  };
}

function getPlugins(isDev) {
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[hash].js',
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, 'src/client/index.html'),
    }),
  ];

  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    );
  } else {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  return plugins;
}

function getStyleLoader(extractSass) {
  return extractSass.extract({
    use: [
      { loader: 'css-loader' },
      {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [
              require('precss'),
              require('autoprefixer'),
            ];
          },
        },
      },
      { loader: 'sass-loader' },
    ],
    fallback: 'style-loader',
  });
}
