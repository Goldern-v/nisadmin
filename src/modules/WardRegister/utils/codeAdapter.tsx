/** 区分不同的code,返回不同的实例 */
export function codeAdapter(map: any, code: string, vague?: boolean) {
  if (vague) {
    for (let codeArr in map) {
      if (codeArr.split(',').indexOf(code) >= 0)
        return map[codeArr]
    }
  } else {
    if (map[code]) return map[code]
  }

  return map["other"] || map["all"] || null
}
