const BabiliPlugin = require('babili-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const minify = require('html-minifier').minify
const OfflinePlugin = require('offline-plugin')
const path = require('path')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'

const cssRuleUse = isProduction
  ? ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: {
      loader: 'css-loader',
      options: {
        minimize: true,
      },
    },
  })
  : ['style-loader', 'css-loader']

const config = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssRuleUse,
      },
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
      {
        from: 'src/index.html',
        transform: content => {
          if (!isProduction) return content
          return minify(
            content.toString().replace('<!-- css-tag -->', '<link href="index.css" rel="stylesheet">'),
            {
              collapseBooleanAttributes: true,
              collapseWhitespace: true,
              sortAttributes: true,
              sortClassName: true,
            }
          )
        },
      },
      {from: 'src/assets', to: 'assets'},
    ]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: null,
    }),
    new webpack.optimize.ModuleConcatenationPlugin,
  ],
}

if (isProduction) {
  config.plugins.unshift(new CleanWebpackPlugin('dist'))
  config.plugins.unshift(new ExtractTextPlugin('index.css'))
  config.plugins.push(new BabiliPlugin)
  config.plugins.push(new OfflinePlugin({
    AppCache: false,
    ServiceWorker: {
      minify: true,
    },
  }))
}

module.exports = config
