import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
import { fileDownload } from 'src/utils/file/file'
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
}

export const nurseHandBookService = new NurseHandBookService()
