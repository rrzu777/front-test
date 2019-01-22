const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  devServer: {
    contentBase: "./docs",
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html',
        filename: 'index.html',
        inject: 'body'
    }),
  ]
};
