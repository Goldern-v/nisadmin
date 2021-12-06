export const copyNullRow = (nullRow: any, config: any, index: any, key: any) => {
  if (Object.prototype.toString.call(config[key]) == "[object Function]") {
    nullRow[index][key] = config[key].bind()
  } else {
    nullRow[index][key] = JSON.parse(JSON.stringify(config[key]))
  }
}