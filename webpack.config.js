var webpack = require('webpack');

module.exports = {
   entry: {
      app: __dirname + '/index.js',
      vendor: ['xml2js', 'http']
   },
   output: {
      path: __dirname + '/build',
      filename: 'bundle.[name].js'
   },
   watch: true,
   devtool: 'source-map',
   module: {
      loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }
      ]
   },
   plugins: []
};