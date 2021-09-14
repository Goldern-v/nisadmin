import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
export default class NurseHandBookService extends BaseApiService {
  /*查询分页*/
  public getPage(type: string, obj: PageOptions | any) {
    return this.post(`/nurseManual/getPage/${type}`, obj)
  }
  /*新增编辑*/
  public saveOrUpdate(type: string, obj: PageOptions | any) {
    return this.post(`/nurseManual/saveOrUpdate/${type}`, obj)
  }
  /*删除*/
  public delete(id: string, obj: PageOptions | any) {
    return this.post(`/nurseManual/delete/${id}`, obj)
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
    return this.post(`/nurseManual/export/${type}`, obj ,{ responseType: 'blob' })
  }
  /*删除附件*/
  public deleteAttachment(id: string) {
    return this.post(`/nurseManual/deleteAttachment/${id}`)
  }
  /*获取科室*/
  public download(id: string) {
    return this.get(`/nurseManual/download?id=${id}` ,{ responseType: 'blob' })
  }
}

export const nurseHandBookService = new NurseHandBookService()
