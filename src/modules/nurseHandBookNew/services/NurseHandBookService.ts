import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
import { appStore } from 'src/stores'

const hospital: string =
appStore.hisMatch({
  map: {
    jmfy: 'nurseManualJM',
    'lcey,lyrm,stmz': 'nurseManualLC',
    default: 'nurseManualJM',
  },
  vague: true,
})
export default class NurseHandBookService extends BaseApiService {
  /*查询分页(通用)*/
  public getPage(type: string, obj: PageOptions | any) {
    return this.post(`/${hospital}/getPage/${type}`, obj)
  }
  /*删除(通用)*/
  public delete(id: string, obj: PageOptions | any) {
    return this.post(`/nurseManualJM/delete/${id}`, obj)
  }
  /*导出文件(通用)*/
  public export(type: string, obj: PageOptions | any) {
    return this.post(`/${hospital}/export/${type}`, obj ,{ responseType: 'blob' })
  }
  /*附件下载(通用)*/
  public download(id: string) {
    return this.get(`/nurseManualJM/download?id=${id}` ,{ responseType: 'blob' })
  }
  /*删除附件(通用)*/
  public deleteAttachmentJM(id: string) {
    return this.post(`/nurseManualJM/deleteAttachment/${id}`)
  }
  /*通过id获取pdfPath(通用)*/
  public getPdfPath(id: string) {
    return this.get(`nurseManualJM/getFile?id=${id}`)
  }
  /*获取手册类型(通用)*/
  public getChildCodeList(itemCode: string) {
    return this.get(`/${hospital}/getChildCodeList?itemCode=${itemCode}`)
  }
  //存在审核流程------------------------------------------------------------------------------------------
  /*保存草稿（审核流程）*/
  public saveDraft(type: string, obj: PageOptions | any) {
    return this.post(`/nurseManualJM/saveDraft/${type}`, obj)
  }
  /*江门提交审核（审核流程）*/
  public auditJM(type: string, obj: PageOptions | any) {
    return this.post(`/nurseManualJM/audit/${type}`, obj)
  }
  /*江门撤销（审核流程）*/
  public undo(obj: PageOptions | any) {
    return this.post(`/nurseManualJM/undo`, obj)
  }
  /*江门查看（审核流程）*/
  public getByIdAudited(id: string) {
    return this.get(`/nurseManualJM/getByIdAudited?id=${id}`)
  }

  //不存在审核流程------------------------------------------------------------------------------------------
  /*保存（无审核流程）*/
  public saveOrUpdate(type: string, obj: PageOptions | any) {
    return this.post(`/nurseManualLC/saveOrUpdate/${type}`, obj)
  }
  /*查看（无审核流程）*/
  public getById(id: string) {
    return this.get(`/nurseManualLC/getById?id=${id}`)
  }

  /*同步会诊的数据（护理会诊登记独有）*/
  public getListToManual(obj: PageOptions | any) {
    return this.post(`/nurseManualLC/getListToManual`, obj)
  }
  /**江门妇幼 同比环比接口 */
  public getCalculate(id: string) {
    return this.get(`/nurseManualJM/getCalculate?id=${id}`)
  }
}

export const nurseHandBookService = new NurseHandBookService()
