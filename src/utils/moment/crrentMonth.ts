import moment from 'moment'

/** 返回本月1号 至 现在 */
export const crrentMonth = () => {
  return [moment(moment().format('YYYY-MM') + '-01'), moment()]
}
