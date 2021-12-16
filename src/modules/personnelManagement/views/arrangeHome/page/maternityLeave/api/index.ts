import BaseApiService from "src/services/api/BaseApiService"
import { iSearchForm, iModalForm } from '../modal'
import moment from 'moment'

class Api extends BaseApiService {
  // 获取列表
  getList(data: iSearchForm) {
    const params = {
      ...data,
      'deliveryStartDate': data.date && data.date[0] ? moment(data.date[0]).format('YYYY-MM-DD') : '',
      'deliveryEndDate': data.date && data.date[1] ? moment(data.date[1]).format('YYYY-MM-DD') : ''
    }
    params.deptCode = params.deptCode === '全院' ? '' : params.deptCode
    delete params.date
    return this.post(`/schBabyBreak/findBylist`, params)
  }

  // 获取
  getItem(id: string) {
    return this.get(`schBabyBreak/get/${id}`)
  }

  // 新增 && 获取
  updateItem(data: iModalForm) {
    const params = {
      ...data,
      'lastMenstrualPeriod': data.lastMenstrualPeriod && moment(data.lastMenstrualPeriod).format('YYYY-MM-DD'),
      'expectedDate': data.expectedDate && moment(data.expectedDate).format('YYYY-MM-DD'),
      'deliveryDate': data.deliveryDate && moment(data.deliveryDate).format('YYYY-MM-DD'),
      'babyBreakStartDate': data.babyBreakStartDate && moment(data.babyBreakStartDate).format('YYYY-MM-DD')
    }
    return this.post(`/schBabyBreak/saveOrUpdate`, params)
  }

  // 删除
  deleteItem(id: string) {
    return this.get(`/schBabyBreak/delete/${id}`)
  }

  // 护士列表
  getNursingList(deptCode: string) {
    return this.get(`/schShiftUser/getByDeptCode/${deptCode}`)
  }

  // 获取产假及哺乳期归档列表
  getJusticeList(data: iSearchForm) {
    const params = {
      ...data,
      'deliveryStartDate': data.date && data.date[0] ? moment(data.date[0]).format('YYYY-MM-DD') : '',
      'deliveryEndDate': data.date && data.date[1] ? moment(data.date[1]).format('YYYY-MM-DD') : ''
    }
    params.deptCode = params.deptCode === '全院' ? '' : params.deptCode
    delete params.date
    return this.post(`/schBabyBreak/getArchivesPage`, params)
  }
}




export default new Api()
