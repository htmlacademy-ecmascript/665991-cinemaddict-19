// path — встроенный в Node.js модуль
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // Указываем путь до входной точки:
  entry: './src/main.js',
  // Описываем, куда следует поместить результат работы:
  output: {
    // Путь до директории (важно использовать path.resolve):
    path: path.resolve(__dirname, 'build'),
    // Имя файла со сборкой:
    filename: 'bundle.js',
    clean:true
  },
  devtool: 'source-map',

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "build" },
      ],
    }),
  ]
}

module.rules = [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      }
    }
  ]