const MinifyJS = require('babel-minify-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const minify = require('html-minifier').minify
const OfflinePlugin = require('offline-plugin')
const path = require('path')
const webpack = require('webpack')

const htmlMinifierOpts = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  sortAttributes: true,
  sortClassName: true,
}

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
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets',
      transform: (content, path) => {
        if (isProduction && path.endsWith('.svg')) {
          return minify(content.toString(), htmlMinifierOpts)
        }
        return content
      },
    }, {
      from: 'src/index.html',
      transform: content => {
        if (!isProduction) return content
        return minify(
          content.toString().replace('<!-- css-tag -->', '<link href="index.css" rel="stylesheet">'),
          htmlMinifierOpts
        )
      },
    }, {
      from: 'src/manifest.json',
      transform: content => isProduction ? JSON.stringify(JSON.parse(content.toString())) : content,
    }]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: null,
    }),
    new webpack.optimize.ModuleConcatenationPlugin,
  ],
}

if (isProduction) {
  config.plugins.unshift(new CleanWebpackPlugin('dist'))
  config.plugins.unshift(new ExtractTextPlugin('index.css'))
  config.plugins.push(new MinifyJS)
  config.plugins.push(new OfflinePlugin({
    AppCache: false,
    ServiceWorker: {
      minify: true,
    },
  }))
}

module.exports = config
