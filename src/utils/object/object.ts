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
