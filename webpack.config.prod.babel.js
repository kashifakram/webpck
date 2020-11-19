import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { DuplicatesPlugin } from "inspectpack/plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import stylesheetUrl from "file-loader!extract-loader!css-loader!main.css";
// import CompressionPlugin from 'compression-webpack-plugin';

export default {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    math: path.resolve(__dirname, 'src/math.js'),
    number: path.resolve(__dirname, 'src/vendor.js'),
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist-prod'),
    publicPath: '',
    filename: '[name].[contenthash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\*.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    //Minify JS
    // new CompressionPlugin({
    //   test: /\.js(\?.*)?$/,
    //   exclude: /node_modules/
    // }),
    new DuplicatesPlugin({
      emitErrors: false,
      verbose: false
    }),
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      inject: true
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module.identifier().split('/').reduceRight(item => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          }
        }
      }
    }
  }
}