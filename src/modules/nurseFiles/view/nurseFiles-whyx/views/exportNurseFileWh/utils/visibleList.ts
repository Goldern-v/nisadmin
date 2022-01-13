export const visibleList = (originList: any[], minRow = 5) => {
  let arr = []
  if (originList.length < minRow) {
    let idx = 0
    while (idx < minRow) {
      if (originList[idx])
        arr.push(originList[idx])
      else
        arr.push({})

      idx++
    }
  } else {
    arr = originList.concat()
  }

  return arr
}