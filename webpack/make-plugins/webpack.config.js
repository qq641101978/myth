const path = require('path');
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  plugins: [
    new CopyrightWebpackPlugin({
      name: 'bai'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}