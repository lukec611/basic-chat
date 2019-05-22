const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// const env = process.env.NODE_ENV || 'production';
// const isDevelopmentMode = env === 'development';

module.exports = {
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.min.js',
    // publicPath: isDevelopmentMode ? '' : '/ppro',
  },
//   mode: env,
  mode: 'development',
//   devtool: isDevelopmentMode ? 'source-map' : undefined,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.j(s|sx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
    },
    
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            // loader: 'typings-for-css-modules-loader',
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            //   namedExport: true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' }
        ],
      }
    ],
},
// resolve: {

//     extensions: ['.js', '.jsx', '.css'],
// },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
      filename: './index.html',
    }),
    // new webpack.DefinePlugin({
    //   PROJECT_ENV: JSON.stringify(env),
    // }),
  ],
};