interface DataIn {
  data: any
  config: Record<string, any>
  name: string
  len: number
}
// 填充固定行数的数组数据
export const replenishList: (data: DataIn) => any[] = ({ data, config, name, len }) => {
  let arr: any[] = data && data[name] ? (data[name] as any[]) : [] || []

  if (arr.length < len) {
    let blank: Record<string, any> = {}
    if (arr[0]) {
      blank = { ...arr[0] }
      delete blank.tableDataId
    } else {
      let tempList: any[] = config?.tableTempList[name] ? config?.tableTempList[name] : [] || []
      if (tempList.length <= 0) return arr
      tempList.map((v: any) => {
        !v.hidden && (blank[v.fieldName] = '')
      })
    }
    Object.keys(blank).map((v: any) => blank[v] = '')
    const missArr = Array.from(new Array(len - arr.length), () => ({ ...blank }))
    return arr.concat(missArr)
  }
  return arr
}
