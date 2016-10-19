var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: [     // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './assets/js/index',
  ],

  output: {
      path: path.resolve('./assets/bundles/'),
      publicPath: 'http://localhost:3000/assets/bundles/',
      filename: "[name]-[hash].js",
      sourceMapFilename: "[name]-[hash].js.map",

  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [
      {   // to transform JSX into JS
          test: /.jsx?$/,
          loaders: [ 'babel'],
          exclude: /node_modules/,
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
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}
