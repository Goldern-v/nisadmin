import moment from 'moment'
/** 返回当前月的第一天和最后一天 */
export function getCurrentMonth() {
  let firstDate = moment(moment().format('YYYY-MM-01'))
  let _firstDate = moment(moment().format('YYYY-MM-01'))
  let lastDate = _firstDate.add(1, 'M').subtract(1, 'd')
  return [firstDate, lastDate]
}
