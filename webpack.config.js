const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = function getWebpackConfig() {
  const isDev = (process.env.NODE_ENV === 'development');

  return {
    devServer: {
      compress: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      port: 3001,
      proxy: {
        '/v1': 'http://localhost:3000',
      },
      stats: 'errors-only',
      watchOptions: {
        ignored: [
          'node_modules',
        ],
      },
    },

    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',

    entry: {
      app: path.join(__dirname, 'src/client/index.js'),
    },

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
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
          ],
        },
        {
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'svelte-loader',
              options: {
                emitCss: true,
                hotReload: isDev,
              },
            },
            {
              loader: `preprocess-loader?${isDev ? '+DEVELOPMENT' : ''}`,
            },
          ],
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: 'awesome-typescript-loader',
        },
      ],
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            minChunks: 2,
            name: 'vendor',
            test: /node_modules/,
          },
        },
      },
    },

    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'public'),
      publicPath: '/',
    },

    plugins: getPlugins(isDev),

    resolve: {
      extensions: [ '.js', '.json', '.svelte', '.ts' ],
      mainFields: [ 'svelte', 'browser', 'module', 'main' ],
      modules: [
        path.join(__dirname, 'src/app'),
        'node_modules',
      ],
    },

    target: 'web',
  };
}

function getPlugins(isDev) {
  const devPlugins = [];

  if (isDev) {
    devPlugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return [
    ...devPlugins,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, 'src/client/index.html'),
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].[hash].css',
    }),
  ];
}
