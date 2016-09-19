var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: {     // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
    'answers_edit': './assets/js/answers_edit',
    'answers_view': './assets/js/answers_view',
  },

  output: {
      path: path.resolve('./assets/bundles/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [
      {   // to transform JSX into JS
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
      },
      {
        test: require.resolve("jquery"),
        loader: 'expose?_'
      },
    ],
  },



  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}
