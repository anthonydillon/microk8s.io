/* eslint-env node */

const TerserPlugin = require("terser-webpack-plugin");

const production = process.env.ENVIRONMENT !== "devel";

// turn on terser plugin on production
const minimizer = production
  ? [
      new TerserPlugin({
        sourceMap: true,
      }),
    ]
  : [];

module.exports = {
  entry: {
    "global-nav": "./static/js/global-nav.js",
    main: [
      "./static/js/installversion.js",
      "./static/js/tabs.js",
      "./static/js/copytoclipboard.js",
    ],
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/static/js/dist",
  },
  mode: production ? "production" : "development",
  devtool: production ? "source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        // Exclude node_modules from using babel-loader
        // except some that use ES6 modules and need to be transpiled:
        // such as swiper http://idangero.us/swiper/get-started/
        // and also react-dnd related
        exclude: /node_modules\/(?!(dom7|ssr-window)\/).*/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer,
  },
};
