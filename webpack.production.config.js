const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathList = require("./pathList");
const path = require('path');
const loaders = require('./webpack.loaders');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new HtmlWebpackPlugin({
    template: './static/index.html',
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ),
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      })
    );
}

module.exports = {
  entry: `${pathList.src}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      pathList.src,
      'node_modules'
    ],
    alias: {
      components: path.resolve(__dirname, `${pathList.src}/components/`),
      containers: path.resolve(__dirname, `${pathList.src}/containers/`),
      reduxConfig: path.resolve(__dirname, `${pathList.src}/reduxConfig/`),
    }
  },
  devtool: "source-map",
  devServer: {
    contentBase: pathList.src,
    hot: true,
    port: 3000,
  },
  module: {
    loaders,
  },
  plugins: plugins
};
