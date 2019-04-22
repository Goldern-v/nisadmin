const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/crNursing/api', {
      // target: 'http://192.168.1.20:8964',
      target: 'http://120.25.105.45:9864',
      secure: false,
      changeOrigin: true
    })
  )
}
