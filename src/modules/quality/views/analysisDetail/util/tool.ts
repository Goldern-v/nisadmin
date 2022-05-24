// 填充固定行数的数组数据
export const replenishList: (arr: any[], len: number) => any[] = (arr, len) => {
  console.log('test-arr[0], arr.length', arr[0], arr.length)
  if (arr[0] && arr.length < len) {
    let blank = {...arr[0]}
    Object.keys(blank).map((v: any) => blank[v] = '')
    const missArr = Array.from(new Array(len - arr.length), () => ({...blank}))
    console.log('test-missArr', missArr)
    return arr.concat(missArr)
  }
  return arr
}