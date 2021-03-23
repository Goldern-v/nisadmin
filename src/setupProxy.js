const proxy = require("http-proxy-middleware");

/** 根据开发环境医院ID参数,切换proxyUrl */
const urlFromHospitalId = (HOSPITAL_ID) => {
  /** 继续教育接口测试 */
  // return 'https://info.cr-health.com:20202' //外网
  // return 'http://192.168.1.54:9864' //内网

  switch (HOSPITAL_ID) {
    /** 厚街 */
    case 'hj':
      // return 'http://120.197.141.41:9091' // 厚街正式
      // return 'http://120.197.141.41:9094' // 厚街测试
      // return 'https://info.cr-health.com:20203 // 公司-厚街测试-外网
      return "http://192.168.1.54:9866" // 公司-厚街测试-内网
    /** 南医三 */
    case 'nys':
      // return 'http://119.145.71.86:9801' // 南医三正式
      // return 'http://119.145.71.86:9098' // 南医三测试
      // return 'https://info.cr-health.com:20205' //公司-南医三测试-外网
      return 'http://192.168.1.54:8062' //公司-南医三测试-内网
    /** 武汉 */
    case 'wh':
      // return 'http://nurse.cr-health.com:34001' // 武汉正式
      return 'http://nurse.cr-health.com:34002' // 武汉测试
    /** 花都 */
    case 'gzhd':
      // return 'https://info.cr-health.com:20206' // 公司-花都测试-外网
      return 'http://192.168.1.54:9868' // 公司-花都测试-内网
    /** 江门妇幼 */
    case 'jmfy':
      // return 'http://218.14.180.38:9094' // 公司-江门妇幼正式
      // return 'https://info.cr-health.com:20211' // 公司-江门妇幼测试-外网
      return 'http://192.168.1.54:9872' // 公司-江门妇幼测试-内网
    /** 默认公司本地内网厚街测试环境 */
    default:
      return 'http://192.168.1.54:9866'
  }
}

const currentUrl = urlFromHospitalId(process.env.REACT_APP_HOSPITAL_ID)

module.exports = function (app) {
  app.use(
    proxy("/crNursing/api", {
      target: currentUrl, // 公司-厚街测试
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    proxy("/asset", {
      target: currentUrl,
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    proxy("/crNursing/asset/", {
      target: currentUrl,
      secure: false,
      changeOrigin: false
    })
  );
  app.use(
    proxy("/crNursing/formUrl", {
      target: currentUrl,
      secure: false,
      changeOrigin: false
    })
  );
};
