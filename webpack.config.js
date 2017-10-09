const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'awesome-typescript-loader',
        ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: [
          'json-loader',
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          'source-map-loader',
        ],
      },
    ],
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-modal': 'Modal',
    // d3: 'd3',
    // 'prop-types': 'PropTypes',
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
