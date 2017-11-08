const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathList = require("./pathList");
const path = require('path');
const loaders = require('./webpack.loaders');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('develop')
  }),
  new HtmlWebpackPlugin({
    template: './static/index.html',
  }),
];

module.exports = {
  entry: `${pathList.src}/index.jsx`,
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/dist'),
    sourceMapFilename: '[name].js,map',
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
      validation: path.resolve(__dirname, `${pathList.src}/validation/`),
      styledComponents: path.resolve(__dirname, `${pathList.src}/styledComponents/`),
    }
  },
  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
  devServer: {
    contentBase: pathList.src,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    loaders,
  },
  plugins: plugins
};
