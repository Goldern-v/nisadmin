/** 区分不同的code,返回不同的实例 */
export function codeAdapter(map: any, code: string) {
  if (map[code]) {
    return map[code];
  } else {
    return map["other"] || map["all"] || null;
  }
}
