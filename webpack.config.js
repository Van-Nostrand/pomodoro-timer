let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ""
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
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
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
          "css-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.wav$/,
        use: "file-loader",
        exclude: /node_modules/
      }
    ]
  },
  // mode: 'development',
  plugins: [
    new HtmlWebpackPlugin ({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: "body"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}