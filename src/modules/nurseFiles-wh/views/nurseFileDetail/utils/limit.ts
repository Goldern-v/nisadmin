export default function (row: any, limit: string = '') {
  if (limit === '附件审核') {
    if (row.statusColor === '0') {
      return false
    } else if (row.statusColor === '1' && row.type > 6) {
      if (limit === '附件审核') return true
    } else {
      return false
    }
  }
  if (row.statusColor === '0') {
    return false
  } else if (row.statusColor === '1') {
    return true
  }
}
