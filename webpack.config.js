module.exports = [
  {
    mode: 'development',
    entry: './index.js',
    output: {
      filename: './bundle.js'
    },
    target: 'web',
    externals: ['@deck.gl/core', '@deck.gl/layers', '@luma.gl/core']
  }
];
