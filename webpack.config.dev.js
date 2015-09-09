var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: [path.join(__dirname, './src/client/entry'),
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:8081'],
  },
  output: {
    path: path.join(__dirname, '/public/js/'),
    filename: '[name].js',
    publicPath: 'http://localhost:8081/js/',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin({output: {comments: false}, minimize: true, compress: { warnings: false }}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader?experimental'], exclude: /node_modules/ }
    ]
  }
};
