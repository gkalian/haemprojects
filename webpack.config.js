const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
  favicon: "./public/fav.ico",
});

module.exports = {
    devServer: {
      static: path.join(__dirname, "public"),
      port: 3000,
      historyApiFallback: true,
      hot: true,
      open: true,
      compress: true
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(eot|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'assets/fonts/[name][ext]'
              }
            },
            {
              test: /\.(sass|less|css)$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
    plugins: [
        htmlPlugin,
          // need to restart the server to see the changes
        new webpack.DefinePlugin({
          'process.env.LOG_LEVEL': JSON.stringify(process.env.LOG_LEVEL || 'INFO')
        })
    ],
};
