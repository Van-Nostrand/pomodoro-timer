const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use:'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.wav$/,
        use: 'file-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  devtool: 'source-map'
}
