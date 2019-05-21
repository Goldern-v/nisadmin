const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/crNursing/api', {
      //正式环境 -不可以
      // target: 'http://120.197.141.41:9094',
      // target: 'http://192.168.2.144:8080',
      target: 'http://120.25.105.45:9864',
      // target: 'http://120.25.105.45:9864',
      secure: false,
      changeOrigin: true
    })
  )
  app.use(
    proxy('/asset', {
      //正式环境-不可以
      // target: 'http://120.197.141.41:9094',
      // target: 'http://192.168.1.20:8964',
      target: 'http://120.25.105.45:9864',
      // target: 'http://192.168.2.144:8080',
      secure: false,
      changeOrigin: true
    })
  )
}
