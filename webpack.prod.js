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
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /node_modules/,
        loader : 'babel',
        plugins: [
          'transform-runtime',
          'add-module-exports',
          'transform-decorators-legacy',
        ]
      },
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.json$/, loaders: ['json-loader'] },
      {
        test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
        loader: 'imports?define=>false&this=>window'
      }
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};

module.exports = config;
