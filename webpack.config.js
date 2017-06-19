var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './react/App.jsx',
  output: { path: path.join(__dirname,"public"), filename: 'minesweeper.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
