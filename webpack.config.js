const BabiliPlugin = require('babili-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const minify = require('html-minifier').minify
const path = require('path')
const webpack = require('webpack')

const config = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {loader: 'babel-loader'},
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/index.css'},
      {
        from: 'src/index.html',
        transform: content => minify(content.toString(), {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          sortAttributes: true,
          sortClassName: true,
        }),
      },
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new BabiliPlugin())
}

module.exports = config
