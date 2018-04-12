const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve('dist'),
    publicPath: './',
    filename: '[name]-[id].[chunkhash].js',
    chunkFilename: '[name]-[id].[chunkhash].bundle.js', // 代码分割
    sourceMapFilename: '[name].js.map',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin('./dist'),
    new HtmlWebpackPlugin({
      title: 'hello,xc-cli!',
      filename: 'index.html',
      template: 'src/index.html',
      //js资源插入位置,true表示插入到body元素底部
      inject: true, //压缩配置
      minify: {
        //删除Html注释
        removeComments: true,
        //去除空格
        collapseWhitespace: true,
        //去除属性引号
        removeAttributeQuotes: true,
      },
      //根据依赖引入chunk
      chunksSortMode: 'dependency',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true,
    }),
    new OptimizeCSSPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../dist'),
    //     to: 'dist',
    //     ignore: ['.*'],
    //   },
    // ]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
});
