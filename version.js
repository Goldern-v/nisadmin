var moment = require("moment");
var fs = require("fs");
var chalk = require("chalk");
// const username = require("./username.js");

// var _origin = process.env.npm_config_argv
//   ? JSON.parse(process.env.npm_config_argv).original
//   : "";
// var _builderUserName = _origin[3] || ""; // 打包者署名
// var _gitUserName = ""; // 打包者git用户名

var info = {
  医院名: process.env.REACT_APP_HOSPITAL_NAME,
  软件名称: "百辰源智慧护理系统",
  版本号: moment().format("YYYY.MM.DD"),
  最近打包时间: moment().format("YYYY-MM-DD HH:mm"),
  // 最近打包人员: _builderUserName || "cr",
  // proxyTable: config.dev.proxyTable || "",
  // 关于: {
  //   研发单位: "百辰源(广州)科技有限公司",
  //   电话: "020-81192725  |  020-81192726",
  //   邮箱: "gzcr@cr-health.com",
  //   地址: "广州市海珠区江南大道中180号富力天域中心1301-1314室",
  //   官网: "https://www.baichenyuan.cn/",
  //   投递简历: "https://www.baichenyuan.cn/jobs12321321",
  // },
};

let writeToFile = (deployer) => {
  console.log(chalk.bgCyan.black("\n 打包 "));
  // info["最近打包人员"] = _builderUserName || deployer || "cr";
  fs.writeFile(
    "./src/version.json",
    JSON.stringify(info, null, 4),
    "utf8",
    function(err) {
      if (err) {
        return console.error(err);
      }
      console.log(chalk.blue(">已生成: version.json"));
    }
  );
};

(cmd_get_git_username = () => {
  // const { exec } = require("child_process");
  // exec("git config user.name", (error, stdout, stderr) => {
  //   if (stdout) {
  //     _gitUserName = stdout.replace(/[\r\s\n]/g, "");
  //   }
  //   //
  //   (async () => {
  //     let name = await username();
  //     let fname = _builderUserName || _gitUserName || name || "cr";
  //     console.log(chalk.bgCyan.black("\n 打包人员 "), chalk.yellow(fname));
  //     writeToFile(fname);
  //   })();
  // });
  // 生产环境执行
  if (process.env.NODE_ENV === 'production') {
    writeToFile();
  }
})();

module.exports = info;
