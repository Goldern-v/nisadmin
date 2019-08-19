let weekdays = ['', '一', '二', '三', '四', '五', '六', '日']
import moment from 'moment'
export const getWeekString = (data: string) => {
  if (moment(data).isoWeekday() >= 0) {
    return '星期' + weekdays[moment(data).isoWeekday()]
  } else {
    return ''
  }
}
