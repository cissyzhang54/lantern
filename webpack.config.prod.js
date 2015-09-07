var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './lib/client/entry'
  ],
  output: {
    path: __dirname + '/public/js/',
    filename: 'app.js'
  },
  plugins: [
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
