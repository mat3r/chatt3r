const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },

  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Chatt3r'
    }
  }
};
