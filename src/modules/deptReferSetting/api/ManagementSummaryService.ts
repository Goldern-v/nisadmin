import { fileDownload } from './../../../utils/file/file'
import { format } from 'date-fns'
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
import moment from 'moment'
export default class ManagementSummaryService extends BaseApiService {
  public getList(obj: any) {
    // let startDate = `${obj.year.format('YYYY')}-${obj.month < 10 ? '0' + obj.month : obj.month}-01`
    // let endDate = moment(startDate)
    //   .add('M', 1)
    //   .subtract(1, 'd')
    //   .format('YYYY-MM-DD')
    // const postObj = {
    //   deptCode: obj.deptCode,
    //   startDate,
    //   endDate,
    //   status: obj.status,
    //   pageIndex: obj.pageIndex
    // }
    return this.post(`/flatManageInstance/getInstanceListByYMD`, obj)
  }
  public totalExcel(obj: any, fileName?: string) {
    // let startDate = `${obj.year.format('YYYY')}-${obj.month < 10 ? '0' + obj.month : obj.month}-01`
    // let endDate = moment(startDate)
    //   .add('M', 1)
    //   .subtract(1, 'd')
    //   .format('YYYY-MM-DD')
    // const postObj = {
    //   deptCode: obj.deptCode,
    //   startDate,
    //   endDate,
    //   status: obj.status,
    //   pageIndex: obj.pageIndex
    // }
    return this.post(`/flatManageInstance/totalExcel`, obj, { responseType: 'blob' }).then((res) => {
      fileDownload(res, fileName)
    })
  }
  /**审核质量问题 */
  public audit(id: string) {
    return this.get(`/flatManageInstance/audit/${id}`)
  }
}

export const managementSummaryService = new ManagementSummaryService();
