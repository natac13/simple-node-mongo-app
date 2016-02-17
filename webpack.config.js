'use strict';

const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

var buildPath = path.join(__dirname, 'build');
var entry = path.join(__dirname, 'app', 'index.js');


module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: [
    // sets up an ES6-ish environment with promise support
    'babel-polyfill',
    // webpack-hot-middleware needs this
    'webpack-hot-middleware/client',
    // the main application script
    entry
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/' // need for hot reload. or hit refresh each time
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'stage-0']
          }
        },
      // {
      //   test: /\.css$/,
     //    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      // }
    ]
  },
  plugins: [
    // new ExtractTextPlugin('style.css', { allChunk: true }),
    new NpmInstallPlugin({
      save: true,       // --save
      // saveDev: true,    // --save-dev
      saveExact: true,  // --save-exact
      }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};