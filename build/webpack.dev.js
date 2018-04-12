const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name]-[id].[hash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true
            }
          },
          {
            loader: 'scss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //开启HMR(热替换功能,替换更新部分,不重载页面！)
    new webpack.HotModuleReplacementPlugin(),

    //配置html入口信息
    new HtmlWebpackPlugin({
      title: 'hello,xc-cli!',
      filename: 'index.html',
      template: 'src/index.html',
      //js资源插入位置,true表示插入到body元素底部
      inject: true
    })
  ]
});