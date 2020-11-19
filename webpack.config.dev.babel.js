import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { DuplicatesPlugin } from "inspectpack/plugin";

export default {
  mode: 'development',
  devtool: 'inline-source-map',
  entry:
    path.resolve(__dirname, 'src/index.js')
  ,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new DuplicatesPlugin({
      emitErrors: false,
      verbose: false
    }),
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      inject: true
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9000
  }
}