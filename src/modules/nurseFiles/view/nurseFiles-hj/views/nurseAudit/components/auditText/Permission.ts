export default function Permission (row: any) {
  if (row.statusColor === '0') {
    return false
  } else if (row.statusColor === '1') {
    return true
  }
}
