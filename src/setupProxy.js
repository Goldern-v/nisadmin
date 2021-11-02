const proxy = require("http-proxy-middleware");

/** 根据开发环境医院ID参数,切换proxyUrl */
const urlFromHospitalId = (HOSPITAL_ID) => {
  /** 继续教育接口测试 */
  // return 'https://info.cr-health.com:20202' //外网
  // return 'http://192.168.1.54:9864' //内网
  // return 'http://192.168.20.68:8062' //广豪本地

  switch (HOSPITAL_ID) {
    /** 厚街 */
    case 'hj':
      // return 'http://120.197.141.41:9091' // 厚街正式
      // return 'http://120.197.141.41:9094' // 厚街测试
      return 'https://info.cr-health.com:20203' // 公司-厚街测试-外网
    // return "http://192.168.1.54:9866" // 公司-厚街测试-内网
    /** 南医三 */
    case 'nys':
      // return 'http://119.145.71.86:9801' // 南医三正式
      // return 'http://119.145.71.86:9098' // 南医三测试
      // return 'https://info.cr-health.com:20205' //公司-南医三测试-外网
      return 'http://192.168.1.54:8062' //公司-南医三测试-内网
    /** 武汉 */
    case 'wh':
      // return 'http://nurse.cr-health.com:34021' // 武汉正式
      // return 'http://nurse.cr-health.com:34022' // 武汉测试
      return 'http://192.168.20.61:9091' // 宏群本地

    /** 花都 */
    case 'gzhd':
      return 'https://info.cr-health.com:20206' // 公司-花都测试-外网
    //return 'http://192.168.1.54:9868' // 公司-花都测试-内网
    /** 江门妇幼 */
    case 'jmfy':
      // return 'http://218.14.180.38:9094' // 江门妇幼正式
      // return 'http://info.cr-health.com:20103' // 公司-江门妇幼测试-外网
    // return 'http://192.168.1.54:9872' // 公司-江门妇幼测试-内网
    return 'http://192.168.20.61:9091' // 宏群本地

    /** 东莞横沥 */
    case 'dghl':
      // return 'http://183.63.206.194:9091' // 东莞横沥正式
      // return 'http://192.168.1.54:9874' // 公司-东莞横沥测试-内网
      return 'http://192.168.20.61:9091' // 宏群本地
    // return 'https://info.cr-health.com:20203' // 公司-厚街测试-外网

    /** 聊城二院 */
    case 'lcey':
      return 'http://192.168.1.54:9871' // 聊城二院测试
    // return 'http://192.168.20.18:9091' // 后端本机ip
    // return 'http://192.168.20.61:9091' // 宏群本地

    /** 默认公司本地内网厚街测试环境 */
    case 'gzsrm':
      // return 'http://192.168.8.204:9091' // 贵州人民医院-内网
      // return 'https://info.cr-health.com:20203' // 公司厚街测试环境-和公司测试环境地址对接
      // return 'http://info.cr-health.com:20103' // 公司厚街测试环境-和公司测试环境地址对接
      // return 'http://192.168.20.61:9091' // 宏群本地
      return "http://192.168.1.54:9875" // 公司-贵州省人民医院-内网
    /** 福清妇幼保健院 */
    case 'fqfybjy':
      // return 'http://183.63.206.194:9091' // 东莞横沥正式
      // return 'http://110.90.211.113:9091/' // 正式
      return 'http://192.168.1.54:9874' // 公司-东莞横沥测试-内网
    // return 'http://192.168.20.61:9091' // 宏群本地

    /** 武警广东省总队医院 */
    case 'wjgdszd':
      return "http://120.24.240.231:15091 " // 武警广东省总队医院正式
    // 暂无对应的测试环境
    case 'gxjb':
      return 'http://58.59.133.37:9091' // 聊城二院测试
    case 'yczyy'://阳春
      return 'http://192.168.1.54:9866' // 聊城二院测试
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
