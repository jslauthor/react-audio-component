const webpack = require('webpack');
const path = require('path');
const precss       = require('precss');
const autoprefixer = require('autoprefixer');
const simpleVars = require('postcss-simple-vars');
const postcssMixins = require('postcss-mixins');
const postcssBEM = require('postcss-bem')({style: 'bem'});
const postcssNested = require('postcss-nested');
const colorFunctions = require('postcss-color-function');
const postcssImport = require('postcss-import');
const customMedia = require('postcss-custom-media');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        plugins: [
          'transform-runtime',
          'add-module-exports',
          'transform-decorators-legacy',
        ]
      },
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.json$/, loaders: ['json-loader'] }
    ]
  },
  postcss: function(webpack) {
      return [
        postcssImport({addDependencyTo: webpack}),
        precss,
        autoprefixer,
        postcssMixins,
        simpleVars,
        colorFunctions,
        postcssBEM,
        postcssNested,
        customMedia
      ];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
