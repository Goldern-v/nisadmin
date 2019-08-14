import { format } from 'date-fns'
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
import moment from 'moment'
export default class ManagementSummaryService extends BaseApiService {
  public getList(obj: any) {
    let startDate = `${obj.year.format('YYYY')}-${obj.month < 10 ? '0' + obj.month : obj.month}-01`
    let endDate = moment(startDate)
      .add('M', 1)
      .subtract(1, 'd')
      .format('YYYY-MM-DD')
    const postObj = {
      deptCode: obj.deptCode,
      startDate,
      endDate
    }
    return this.post(`/flatManageInstance/getInstanceListByYMD`, postObj)
  }
}
