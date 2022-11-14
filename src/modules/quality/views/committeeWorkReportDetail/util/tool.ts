import { appStore, authStore } from './../../../../../stores/index'

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

export const getBlank = (tempList: any) => {
  let blank: Record<string, any> = {}
  tempList.map((v: any) => {
    !v.hidden && (blank[v.fieldName] = '')
  })

  Object.keys(blank).map((v: any) => blank[v] = '')
  return blank
}

export const routePath = () => {
  let { id, level, type } = appStore.queryObj
  if (level == 1) return '/qcOneWhyx/analysis?level=1'
  if (level == 2) return '/qcTwo/analysis?level=2'
  if (level == 3.1) return '/qcThree/committeeWorkReport'
  if (level == 3) return '/qcThree/qcThreeResult'
  return ''
}

// 审核权限
export const checkRole = () => {
  let { level } = appStore.queryObj
  if (level == 1) return authStore.level2Watch
  return authStore.level3Check
}

/**
 * 检查数据是否合格
 */
// export const checkQualified = (item: any, keys: any ) => {
//   const flag = false
//   Object.keys(keys).forEach((v:string) => {})
// }