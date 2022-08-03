import { appStore } from 'src/stores/index'
import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'

export interface saveTextIn {
  id: string
  text: string
}
export default class BadEventReportService extends BaseApiService {
  /** 获取晋升申请表数据 */
  public getDetailList(obj?: any) {
    let newFormData = new FormData()
    newFormData.set('id', obj.id)
    return this.post(`/nurse/promotion/getById`,newFormData)
  }
  // 根据员工号和表格获取信息
  public getByEmpNoAndFormCode(obj:any){
    let newFormData = new FormData()
    newFormData.set('empNo', obj.empNo)
    newFormData.set('formCode', obj.formCode)
    return this.post(
      `/nurse/promotion/getByEmpNoAndFormCode`,
      newFormData
    )
  }
   //检查用户名和密码
   public async checkUser(query: any) {
    return this.post(`/form/checkUser`, query);
  }
  //删除附件
  public async deleteAttachment(query: any) {
    let newFormData = new FormData()
    newFormData.set('id', query.id)
    newFormData.set('masterId', query.masterId)
    return this.post(`/nurse/promotion/deleteAttachment`, newFormData);
  }
  // 晉升审核
  public getHandleNode(query:any) {
    return this.post(`/nurse/promotion/handleNode`,query)
  }

}

export const badEventReportService = new BadEventReportService()
