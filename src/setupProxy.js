const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/crNursing/api', {
      // target: 'http://120.197.141.41:9094',
      //广
      // target: 'http://192.168.2.144:8080',
      target: 'http://120.25.105.45:9864',
      //正式环境
      // target: 'http://120.197.141.41:9094',
      secure: false,
      changeOrigin: true
    })
  )
  app.use(
    proxy('/asset', {
      // target: 'http://120.197.141.41:9094',
      // target: 'http://192.168.1.20:8964',
      // 广豪
      target: 'http://192.168.2.144:8080',
      // target: 'http://120.25.105.45:9864',
      //正式环境
      // target: 'http://120.197.141.41:9094',
      secure: false,
      changeOrigin: true
    })
  )
}
