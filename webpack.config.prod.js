var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './lib/client/entry',
  },
  output: {
    path: path.join(__dirname, '/public/js/'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({output: {comments: false}, minimize: true, compress: { warnings: false }}),
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        RAVEN_KEY: JSON.stringify(process.env.RAVEN_KEY),
        RAVEN_SECRET: JSON.stringify(process.env.RAVEN_SECRET),
        RAVEN_APP_ID: JSON.stringify(process.env.RAVEN_APP_ID)
      }
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader?experimental'], exclude: /node_modules/ }
    ]
  }
};
