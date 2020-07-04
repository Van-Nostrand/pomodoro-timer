let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        use:'babel-loader', 
        exclude: /node_modules/
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'], 
        exclude: /node_modules/
      },
      {
        test: /\.wav$/,
        use: "file-loader",
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin ({
      template: 'public/index.html'
    })
  ]
}