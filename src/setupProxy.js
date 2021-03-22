const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/crNursing/api", {
      /** 厚街正式环境 */
      // target: 'http://120.197.141.41:9094', // 厚街正式
      // target: 'http://120.197.141.41:9091', // 厚街测试
      target: "http://192.168.1.54:9866", // 公司-厚街测试
      /** 继续教育接口测试 */
      // target: "http://192.168.1.54:9864", 
      /** 武汉环境 */
      // target: "http://nurse.cr-health.com:34001", // 武汉正式
      // target: "http://nurse.cr-health.com:34002", // 武汉测试
      // target: 'http://192.168.2.144:8062',
      /** 花都环境 */
      // target: "http://192.168.1.54:9868", // 公司-花都测试
      /** 江门妇幼环境 */
      //target: "http://192.168.1.54:9872", // 公司-江门妇幼测试
      /** 南医三环境 */
      // target: "http://119.145.71.86:9801", // 南医三正式
      // target: "http://119.145.71.86:9098", // 南医三测试
      // target: "http://192.168.1.54:8062", //公司-南医三测试
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    proxy("/asset", {
      target: "http://192.168.1.54:9866",
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    proxy("/crNursing/asset/", {
      target: "http://192.168.1.54:9866",
      secure: false,
      changeOrigin: false
    })
  );
  app.use(
    proxy("/crNursing/formUrl", {
      target: "http://192.168.1.54:8062", //南医三测试
      secure: false,
      changeOrigin: false
    })
  );
};
