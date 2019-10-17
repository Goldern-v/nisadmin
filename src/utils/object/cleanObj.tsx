export const cleanObj = function(obj: any, value = '') {
  let keys = Object.keys(obj)
  let newObj: any = {}
  for (let item of keys) {
    newObj[item] = value
  }
  return newObj
}
