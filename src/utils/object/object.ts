/** 对象key - value 反转 */

export const reverseKeyValue = (obj: any) => {
  let result: any = {}
  for (let key in obj) {
    if (obj.hasOwnProperty) {
      result[obj[key]] = key
    }
  }
  return result
}
