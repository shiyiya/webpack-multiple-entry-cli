/**
 * 多页面开发环境
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    //热替换入口
    hot: 'react-hot-loader/patch',
    main: './src/js/index.js',
    home: './src/js/home.js'
  },
  output: {
    filename: './js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//热替换
    new HtmlWebpackPlugin({
      title: 'My main',
      filename: 'index.html',
      template: './src/templates/index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      title: 'My home',
      filename: 'home.html',
      template: './src/templates/home.html',
      chunks: ['home']
    })
  ],
  //源地图
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, "build"),
    //compress: true,//启用gzip 压缩
    port: 1215,
    hot: true,//热替换
    open: true
  },
  module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader'],
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
              test: /\.scss$/,
              exclude: /node_modules/,
              use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 2 } },
                'postcss-loader',
                 'sass-loader'
                ]
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [{loader: 'file-loader',options: {name: 'assets/[hash:8].[name].[ext]'}  }]
            },
            {
              test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
              loader: [{loader: 'url-loader',options: {limit: 1024}}],
            }
          ]
        }
      };
 
