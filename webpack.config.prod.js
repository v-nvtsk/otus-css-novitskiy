/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development',
  target: 'browserslist',
  entry: './src/index.js',
  output: {
    clean: true, // Clean the output directory before emit.
    path: path.resolve(__dirname, 'prod'),
    filename: 'main-[hash].js',
    assetModuleFilename: 'assets/[name]-[hash][ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        {
          loader: 'postcss-loader'
        }]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true
        },
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    filename: 'index.html',
  })],
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin(
        {
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                toFormat: { format: 'webp' },
                jpeg: {
                  // https://sharp.pixelplumbing.com/api-output#jpeg
                  quality: 90,
                },
                webp: {
                  // https://sharp.pixelplumbing.com/api-output#webp
                  lossless: true,
                },
                avif: {
                  // https://sharp.pixelplumbing.com/api-output#avif
                  lossless: true,
                },
              },
            },
          }, generator: [
            {
              // You can apply generator using `?as=webp`, you can use any name and provide more options
              preset: "webp",
              implementation: ImageMinimizerPlugin.imageminGenerate,
              options: {
                // Please specify only one plugin here, multiple plugins will not work
                plugins: ["imagemin-webp"],
              },
            },
          ],
        }
      ),
      new TerserPlugin(),
      // new ImageminWebpWebpackPlugin(),
    ],
  },
}