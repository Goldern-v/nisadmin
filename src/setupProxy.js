const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/crNursing/api', {
      // target: 'http://120.25.105.45:9865',
      // target: 'http://120.25.105.45:9866',
      //厚街正式环境
      // target: 'http://120.197.141.41:9094',
      // target: 'http://120.197.141.41:9091',
      // target: 'http://192.168.2.144:8062', //广豪
      //武汉正式环境
      // target: 'http://nurse.cr-health.com:34001',
      // target: 'http://192.168.2.75:8080',
      //武汉测试
      target: 'http://nurse.cr-health.com:34002',
      // target: 'http://192.168.2.144:8062',
      // target: 'http://192.168.2.75:8080',  //俊涛
      // target: 'http://172.16.199.58:8062',  //俊涛
      secure: false,
      changeOrigin: true
    })
  )
  app.use(
    proxy('/asset', {
      // target: 'http://192.168.1.48:8062',
      // target: 'http://120.197.141.41:9091',
      // target: 'http://192.168.1.20:8964',
      // 广豪
      // target: 'http://192.168.2.144:8080',
      // target: 'http://120.25.105.45:9864',
      //正式环境
      // target: 'http://120.197.141.41:9094',
      //武汉测试
      target: 'http://nurse.cr-health.com:34002',
      secure: false,
      changeOrigin: true
    })
  )
  app.use(
    proxy('/crNursing/asset/', {
      // target: 'http://120.25.105.45:9864',
      // target: 'http://120.197.141.41:9094',
      // target: 'http://111.47.19.230:9091',
      //武汉测试
      target: 'http://nurse.cr-health.com:34002',
      secure: false,
      changeOrigin: false
    })
  )
}
