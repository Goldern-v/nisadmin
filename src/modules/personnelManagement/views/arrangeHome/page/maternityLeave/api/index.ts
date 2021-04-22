import BaseApiService from "src/services/api/BaseApiService"
import { iSearchForm, iModalForm } from '../modal'
import moment from 'moment'

class Api extends BaseApiService {
  // 获取列表
  getList(data: iSearchForm) {
    const params = {
      ...data,
      'deliveryStartDate': data.date && moment(data.date[0]).format('YYYY-MM-DD'),
      'deliveryEndDate': data.date && moment(data.date[1]).format('YYYY-MM-DD')
    }
    delete params.date
    return this.post(`/schBabyBreak/findBylist`, params)
  }

  // 获取
  getItem(id: string) {
    return this.post(`/schBabyBreak/findBylist`, id)
  }

  // 新增 && 获取
  updateItem(data: iModalForm) {
    const params = {
      ...data,
      'lastMenstrualPeriod': data.lastMenstrualPeriod && moment(data.lastMenstrualPeriod).format('YYYY-MM-DD'),
      'expectedDate': data.expectedDate && moment(data.expectedDate).format('YYYY-MM-DD'),
      'deliveryDate': data.deliveryDate && moment(data.deliveryDate).format('YYYY-MM-DD')
    }
    return this.post(`/schBabyBreak/saveOrUpdate`, params)
  }

  // 删除
  deleteItem(id: string) {
    return this.post(`/schBabyBreak/delete/${id}`);
  }

  // 护士列表
  getNursingList(deptCode: string) {
    return this.get(`/schShiftUser/getByDeptCode/${deptCode}`)
  }
}

export default new Api()
