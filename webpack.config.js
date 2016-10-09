//webpack.config.js  
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');


var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {  
  plugins: [commonsPlugin, new HtmlWebpackPlugin()],
  // 入口文件  
  entry: {
    page1: "./page/page1.js",
    page2: "./page/page2.js"
  },  
  // 编译输出的文件路径  
  output: {  
    publicPath:'./public',  
    path: './dist',
    filename: "[name].bundle.js"
  },  
  //加载器  
  module: {  
    loaders: [{  
      test: /\.vue$/,   
      exclude: /node_modules/,  
      loader: 'vue'  
    }, {  
        test: /\.css$/,   
        exclude: /node_modules/,  
        loader: 'style-loader!css-loader'  
      }, {  
        test: /\.js$/,  
        exclude: /node_modules/,  
        loader: 'babel'  
      }]  
  },  
  babel: {  
    presets: ['es2015'],  
    plugins: ['transform-runtime']  
  }   
}  


if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}