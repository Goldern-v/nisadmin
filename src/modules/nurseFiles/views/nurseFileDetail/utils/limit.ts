export default function (row: any, limit: string = '') {
  // if (limit === '附件审核') {
  //   return row.isShow
  // }
  if (row.statusColor === '0') {
    return false
  } else if (row.statusColor === '1') {
    return true
  }
}
