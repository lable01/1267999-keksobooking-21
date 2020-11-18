const path = require("path");

  module.exports = {
    entry: [
      "./js/card.js",
      "./js/data.js",
      "./js/debounce.js",
      "./js/filter.js",
      "./js/form.js",
      "./js/image.js",
      "./js/main.js",
      "./js/pin.js",
      "./js/server.js",
      "./js/util.js"
    ],
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname),
      iife: true
    },
    devtool: false
  };