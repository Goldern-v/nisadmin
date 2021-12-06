// 本文件用于存放渲染时需要用到的函数

// 用来复制空行的函数
export const copyNullRow = (nullRow: any, config: any, index: any, key: any) => {
  // 对于函数属性进行借用
  if (Object.prototype.toString.call(config[key]) == "[object Function]") {
    nullRow[index][key] = config[key].bind()
  } else {
    // 其他属性进行深拷贝
    nullRow[index][key] = JSON.parse(JSON.stringify(config[key]))
  }
}