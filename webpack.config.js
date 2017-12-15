const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    'bundle.min': './src/secure-string.js',
    'bundle.spec': './test/secure-string.spec.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: "SecureString",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    }]
  }
}
