const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const sassLoaders = [
  "css-loader",
  "autoprefixer-loader?browsers=last 2 version",
  "sass-loader?outputStyle=compressed",
];

var RELEASE_ID;
if (!process.env.HEROKU_SLUG_COMMIT) {
  RELEASE_ID = 'test-build'
} else {
  RELEASE_ID = process.env.HEROKU_SLUG_COMMIT.substr(0, 10);
}

module.exports = {
  entry: {
    app: path.join(__dirname, './src/client/entry'),
  },
  output: {
    path: path.join(__dirname, '/public/build/'),
    filename: 'scripts/[name].js',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({output: {comments: false}, minimize: true, compress: { warnings: false }}),
    new ExtractTextPlugin("styles/[name].css"),
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        RAVEN_KEY: JSON.stringify(process.env.RAVEN_KEY),
        RAVEN_SECRET: JSON.stringify(process.env.RAVEN_SECRET),
        RAVEN_APP_ID: JSON.stringify(process.env.RAVEN_APP_ID),
        RELEASE_ID: JSON.stringify(RELEASE_ID)
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?experimental'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!")),
      }
    ]
  }
};
