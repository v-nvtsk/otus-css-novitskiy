/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    // require('autoprefixer'),
    ['postcss-uncss',
      {
        html: ['./src/index.html'],
        ignore: ['.navigation-link.active']
      }]
  ]
}

module.exports = config