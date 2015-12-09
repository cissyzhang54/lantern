const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const sassLoaders = [
  "css-loader?sourceMap",
  "autoprefixer-loader?browsers=last 2 version",
  "sass-loader?sourceMap&outputStyle=expanded",
];

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: [path.join(__dirname, './src/client/entry'),
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:8082'],
  },
  output: {
    path: path.join(__dirname, '/public/build/'),
    filename: 'scripts/[name].js',
    publicPath: 'http://localhost:8082/build/',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin({output: {comments: false}, minimize: true, compress: { warnings: false }}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles/[name].css"),
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
    extensions: ['', '.js', '.scss'],
    root: path.resolve(__dirname, 'bower_components')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader?experimental'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!")),
      }
    ]
  }
};
