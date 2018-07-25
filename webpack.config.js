const path = require('path');

module.exports = {
  // Tell webpack to begin building its 
  // dependency graph from this file.
  entry: {
    gallery : path.join(__dirname, 'gallery', 'gallery.js'),
    contactForm : path.join(__dirname, 'contactForm', 'contactForm.js'),
  },
  // And to place the output in the `build` directory
  output: {
    path: path.join(__dirname, 'js'),
    filename: '[name]-compiled.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        /* We'll leave npm packages as is and not 
           parse them with Babel since most of them 
           are already pre-transpiled anyway. */
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
  
}