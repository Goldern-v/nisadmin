/** 对象key - value 反转 */

export const reverseKeyValue = (obj: any) => {
  let result: any = {};
  for (let key in obj) {
    if (obj.hasOwnProperty) {
      result[obj[key]] = key;
    }
  }
  return result;
};

type VarType =
  | "number"
  | "string"
  | "boolean"
  | "undefined"
  | "Null"
  | "Function"
  | "Array"
  | "Object";
/** 获取变量类型 */

export function getVarType(obj: any): VarType {
  let type = typeof obj;
  if (type != "object") {
    return type as VarType;
  }
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (\S+)\]$/, "$1") as VarType;
}
/**
 * 创建 v*属性的对象 
 * @param count 对象属性个数
 * @param defVal 初始值
 * @returns 
 */
export const createObjV = function(count: number, defVal = {}) {
  let newObj: any = {}
  for (let i = 1; i <= count; i++) {
    newObj[`v${i}`] = defVal[`v${i}`] || '' 
  }
  return newObj
}