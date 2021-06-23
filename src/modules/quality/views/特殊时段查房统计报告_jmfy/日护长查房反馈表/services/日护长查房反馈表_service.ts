import BaseApiService from 'src/services/api/BaseApiService'
import moment from 'moment'

class MonthNursingCheckWard extends BaseApiService {
  /**
   * 查房列表
   * @param query.status 状态
   * @param query.year 年
   * @param query.month 月
   * @param query.date 日
   * @returns 
   */
  public queryList(query: any) {
    const { status, year, month, date } = query
    const dateStr = [year, month, date].filter((val) => val).join('/')

    let beginDate = moment(dateStr)

    let endDate = moment(beginDate)

    // if()


    const formatQuery = {
      status,
      wardCode: '',
      beginDate: beginDate.format('YYYY-MM-DD 00:00'),
      endDate: moment(dateStr).format('YYYY-MM-DD 23:59'),
    }

    // return this.get('/form/searchRoom/master/getPage', query)
  }
}

export const monthNursingCheckWard = new MonthNursingCheckWard()