var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    // './example/index.js',
    // './redux/tutorial/index.js',
    // './index.js',
    './src/typescript/index.tsx',
  ],

  // devtool: 'cheap-module-eval-source-map',
  devtool: ['cheap-module-eval-source-map', 'inline-source-map'],

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /(node_modules|bower_components)/,
      include: __dirname
    }]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },

  output: {
    path: __dirname + '/example/',
    filename: 'all.js',
    publicPath: '/example'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
};
