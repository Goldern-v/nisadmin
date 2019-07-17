export function mergeDayObj(record: any, weekName: string) {
  let keys = Object.keys(record)
  let filterKeys = keys.filter((item) => item.indexOf(weekName) > -1)
  let result: any = {}
  for (let key of filterKeys) {
    result[key.replace(weekName, '') || 'Name'] = record[key]
  }
  return result
}
