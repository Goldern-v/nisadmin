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
type Cb = (j: any, k: number) => any
export function itemToArray(count: number, callback: Cb) {
 return Array.from(new Array(count), callback)
}

/**
 * 广度优先
 * @param {array} treeArr 树形数组
 * @param {string} childName 节点名称
 * @param {boolean} includesRoot 是否包含非叶子节点
 * @returns 一维数组
 */
 export const wideTraversal = (treeArr: any[], childName = 'columns', includesRoot = false) => {
  let arr = []
  if (treeArr != null) {
    let queue = [...treeArr]
    while (queue.length != 0) {
      let item = queue.shift()
      if (!item[childName] || includesRoot) {
        arr.push(item)
      }
      let children = item[childName] || []
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i])
      }
    }
  }
  return arr
}
/**创建数组 */
export const createArr = (len: number, cb: (v: any, k: number) => any) => {
  return Array.from(Array(len), cb)
}