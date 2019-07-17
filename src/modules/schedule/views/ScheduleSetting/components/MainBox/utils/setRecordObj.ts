export function setRecordObj(record: any, weekName: string, key: string, value: any) {
  let fullKey = key == 'Name' ? '' : key
  record[weekName + fullKey] = value
}
