/** 数字转成数组 */
export function numberToArray(min: number, max?: number) {
  if (!max) {
    max = min
    min = 0
  }
  let array = []
  for (let i = min; i < max; i++) {
    array.push(i)
  }
  return array
}
