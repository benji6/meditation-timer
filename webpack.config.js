const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const minify = require('html-minifier').minify
const OfflinePlugin = require('offline-plugin')
const path = require('path')

const htmlMinifierOpts = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  decodeEntities: true,
  processConditionalComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  sortAttributes: true,
  sortClassName: true,
}

const isProduction = process.env.NODE_ENV === 'production'

const cssRuleUse = isProduction
  ? [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { minimize: true },
      },
    ]
  : ['style-loader', 'css-loader']

const config = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssRuleUse,
      },
      {
        loader: 'awesome-typescript-loader',
        test: /\.ts$/,
      },
    ],
  },
  output: {
    filename: 'index.js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets',
        transform: (content, path) =>
          isProduction && path.endsWith('.svg')
            ? minify(content.toString(), htmlMinifierOpts)
            : content,
      },
      {
        from: 'src/index.html',
        transform: content =>
          isProduction
            ? minify(
                content
                  .toString()
                  .replace(
                    '<!-- css-tag -->',
                    '<link href="index.css" rel="stylesheet">',
                  ),
                htmlMinifierOpts,
              )
            : content,
      },
      {
        from: 'src/manifest.json',
        transform: content =>
          isProduction
            ? JSON.stringify(JSON.parse(content.toString()))
            : content,
      },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
}

if (isProduction) {
  config.plugins.unshift(new CleanWebpackPlugin('dist'))
  config.plugins.unshift(new MiniCssExtractPlugin({ filename: 'index.css' }))
  config.plugins.push(
    new OfflinePlugin({
      AppCache: false,
      autoUpdate: 1e3 * 60 * 60 * 24,
      externals: ['favicon.ico'],
      ServiceWorker: {
        minify: true,
      },
    }),
  )
}

module.exports = config
