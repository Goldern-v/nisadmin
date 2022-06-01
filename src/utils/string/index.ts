/** 获取字符串字节长度 */
export const getCodeLength: (str: string) => number = (str) => {
  if (str.length === 0) return 0
  const list = str.split('')
  let sum  = str.length
  list.map((v: string) =>{
    if (v.charCodeAt(0) > 255)
      sum += 1
  })
  return sum
}