const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
// 这个是主角
const compressing = require("compressing");
const moment = require("moment");

let hospitalName = process.env.REACT_APP_HOSPITAL_NAME;

let sourcePath = "build/";
let zipPath = `publish/护理管理_${hospitalName}_${moment().format(
  "YYYY_MM_DD_HH_mm"
)}.zip`;

console.log(process.env.REACT_APP_ONLY_BAD_EVENT)

if (process.env.REACT_APP_ONLY_BAD_EVENT)
  zipPath = `publish/不良事件审核_${hospitalName}_${moment().format(
    "YYYY_MM_DD_HH_mm"
  )}.zip`;

const resolve = dir => path.join(__dirname, "./", dir);
const publishPath = resolve("publish");
const zipName = (() => zipPath)();

// 判断是否存在当前publish路径，没有就新增
if (!fs.existsSync(publishPath)) {
  fs.mkdirSync(publishPath);
}

compressing.zip
  .compressDir(resolve(sourcePath), resolve(zipName))
  .then(() => {
    console.log(
      chalk.yellow(`Tip: 文件压缩成功，已压缩至【${resolve(zipName)}】`)
    );
  })
  .catch(err => {
    console.log(chalk.red("Tip: 压缩报错"));
    console.error(err);
  });
