const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    clean: true, // Clean the output directory before emit.
    path: path.resolve(__dirname, 'build'),
    filename: 'main-[hash].js',
    assetModuleFilename: '[name]-[hash][ext]'
  },
  devServer: {
    hot: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name]-[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name]-[hash][ext]'
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    filename: 'index.html'
  })]
}