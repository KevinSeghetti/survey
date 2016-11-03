var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: {     // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
    'index': './assets/js/index',
    'answers_edit': './assets/js/answers_edit',
    'answers_view': './assets/js/answers_view',
  },

  output: {
      path: path.resolve('./assets/bundles/'),
      publicPath: '/static/bundles/',
      filename: "[name]-[hash].js",
      sourceMapFilename: "[name]-[hash].js.map",

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
            presets: ['es2015', 'react', 'stage-2' ]
          }
      },
      {
        test: require.resolve("jquery"),
        loader: 'expose?_'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192&name=[hash].[ext]'
      } // inline base64 URLs for <=8k images, direct URLs for the rest

    ],
  },



  resolve: {
    root: [
      path.resolve( './static/js')
    ],
    modulesDirectories: ['node_modules', 'bower_components', 'assets/js'],
    extensions: ['', '.js', '.jsx']
  },
}
