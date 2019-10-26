const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const minify = require('html-minifier').minify
const OfflinePlugin = require('offline-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

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

const config = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
      {
        loader: 'awesome-typescript-loader',
        test: /\.ts$/,
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
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
  config.plugins.unshift(new MiniCssExtractPlugin({ filename: 'index.css' }))
  config.plugins.push(
    new OfflinePlugin({
      AppCache: false,
      autoUpdate: 1e3 * 60 * 60 * 24,
      externals: ['assets/icons/favicon.ico'],
      ServiceWorker: {
        minify: true,
      },
    }),
  )
}

module.exports = config
