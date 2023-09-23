/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    // require('autoprefixer'),
    ['postcss-uncss',
      {
        html: ['./src/index.html']
      }]
  ]
}

module.exports = config