import BaseApiService from 'src/services/api/BaseApiService'
import moment from 'moment'

class DayNursingCheckWard extends BaseApiService {
  /**
   * 查房列表
   * @param query.status 状态
   * @param query.year 年
   * @param query.day 月
   * @param query.date 日
   * @returns 
   */
  public queryList(query: any) {
    const { status, year, month, date } = query
    const dateArr = [year, month, date].filter((val) => val)
    const dateStr = dateArr.join('/')

    let beginDate = moment(dateStr)

    let endDate: moment.Moment

    if (dateArr.length === 1) {
      endDate = moment(`${dateStr}-12-30`)

    } else if (dateArr.length === 2) {
      endDate = moment(`${dateStr}-1`)
      endDate.add(1, 'month').subtract(1)
    } else if (dateArr.length === 3) {
      endDate = moment(dateStr)
    } else {
      endDate = moment()
    }

    const formatQuery = {
      status,
      wardCode: '',
      formCodes: ['SR0002'],
      beginDate: beginDate.format('YYYY-MM-DD 00:00'),
      endDate: endDate.format('YYYY-MM-DD 23:59'),
    } as any

    return this.post('/form/searchRoom/master/getPage', formatQuery)
  }
}

export const dayNursingCheckWard = new DayNursingCheckWard()