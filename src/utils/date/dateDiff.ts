export function dateDiff(sDate1: string, sDate2: string) {
  //sDate1和sDate2是2006-12-18格式
  var dateSpan, tempDate, iDays
  let date1 = Date.parse(sDate1)
  let date2 = Date.parse(sDate2)
  dateSpan = date2 - date1
  // dateSpan = Math.abs(dateSpan)
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
  return iDays
}
