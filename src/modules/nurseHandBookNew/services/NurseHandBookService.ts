import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
import { appStore } from "src/stores";

const hospitalPath: string =
  appStore.hisMatch({
    map: {
      gzsrm: 'exportSgy',
      default: 'export',
    },
    vague: true,
  })

  const hospital: string =
  appStore.hisMatch({
    map: {
      jmfy: 'nurseManualJM',
      default: 'nurseManual',
    },
    vague: true,
  })
export default class NurseHandBookService extends BaseApiService {
  /*查询分页*/
  public getPage(type: string, obj: PageOptions | any) {
    return this.post(`/${hospital}/getPage/${type}`, obj)
  }
  /*新增编辑*/
  public saveOrUpdate(type: string, obj: PageOptions | any) {
    return this.post(`/nurseManual/saveOrUpdate/${type}`, obj)
  }
  /*删除*/
  public delete(id: string, obj: PageOptions | any) {
    return this.post(`/${hospital}/delete/${id}`, obj)
  }
  /*获取科室*/
  public findTemplates() {
    return this.get(`/InpatientAreaLog/findTemplates`)
  }
  /*上传文件*/
  public uploadFile(obj: PageOptions | any) {
    return this.post(`/nurseManual/attachment/nurseManual`, obj)
  }
  /*导出文件*/
  public export(type: string, obj: PageOptions | any) {
    return this.post(`/${hospital}/${hospitalPath}/${type}`, obj ,{ responseType: 'blob' })
  }
  /*删除附件*/
  public deleteAttachment(id: string) {
    return this.post(`/nurseManual/deleteAttachment/${id}`)
  }
  /*获取科室*/
  public download(id: string) {
    return this.get(`/nurseManual/download?id=${id}` ,{ responseType: 'blob' })
  }
  /*保存草稿*/
  public saveDraft(type: string, obj: PageOptions | any) {
    return this.post(`/nurseManualJM/saveDraft/${type}`, obj)
  }
  /*江门删除附件*/
  public deleteAttachmentJM(id: string) {
    return this.post(`/nurseManualJM/deleteAttachment/${id}`)
  }
  /*江门提交审核*/
  public auditJM(type: string, obj: PageOptions | any) {
    return this.post(`/nurseManualJM/audit/${type}`, obj)
  }
  /*江门撤销*/
  public undo(obj: PageOptions | any) {
    return this.post(`/nurseManualJM/undo`, obj)
  }
  /*江门查看*/
  public getByIdAudited(id: string) {
    return this.get(`/nurseManualJM/getByIdAudited?id=${id}`)
  }
  /*通过id获取pdfPath*/
  public getPdfPath(id: string) {
    return this.get(`nurseManualJM/getFile?id=${id}`)
  }
  
}

export const nurseHandBookService = new NurseHandBookService()
