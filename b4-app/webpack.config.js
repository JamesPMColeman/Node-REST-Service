'use strict'
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './entry.js',
  output: {
    filename: 'bundle.js',
    path: distDir,
  },
  devServer: {
    contentBase: distDir,
    port: 60800,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Better Book Bundle Builder',
    }),
  ],
};

