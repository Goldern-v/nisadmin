import moment from 'moment'

/** 返回本月1号 至 现在 */
export const crrentMonth = () => {
  return [moment(moment().format('YYYY-MM') + '-01'), moment()]
}

/** 不设置默认时间 */
export const noCrrentMonth = () => {
  return ['', '']
}

/**字符串转moment对象 */
export const strFormatIntoMoment = (str: string) => {
  return str ? moment(str) : null
}