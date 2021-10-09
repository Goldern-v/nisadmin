import BaseApiService from 'src/services/api/BaseApiService'
import { PageOptions } from 'src/components/BaseTable'
export default class NurseSatisfactionSurveyService extends BaseApiService {
  /*查询满意度分页*/
  public getPage(obj: PageOptions | any) {
    return this.post(`/satisfaction/survey/getPage`, obj)
  }
  
  /*查询设置分页*/
  public getSetPage(obj: PageOptions | any) {
    return this.post(`/satisfaction/setting/getPage`, obj)
  }

  /*查询满意度调查汇总分页*/
  public surveyReport(obj: PageOptions | any) {
    return this.post(`/satisfaction/survey/report`, obj)
  }

  /*下拉框获取调查表*/
  public getSettingList() {
    return this.get(`/satisfaction/setting/getSettingList`)
  }

  /*设置表启用*/
  public setUseStatus(obj: PageOptions | any) {
    return this.post(`/satisfaction/setting/setUseStatus`, obj)
  }

  /*问卷导入模板下载*/
  public getTemplate() {
    return this.get(`/satisfaction/setting/getTemplate`,{ responseType: 'blob' })
  }

  /*导入*/
  public uploadSetting(obj: PageOptions | any) {
    return this.post(`/satisfaction/setting/uploadSetting`, obj)
  }
  
  /*设置表删除*/
  public setDelete(id: string, obj: PageOptions | any) {
    return this.post(`/satisfaction/setting/delete/${id}`, obj)
  }

  /*问卷预览*/
  public previewPaper(id: string) {
    return this.get(`/satisfaction/setting/previewPaper?id=${id}`)
  }

  /*满意度调查结果汇总导出*/
  public exportReport(obj: PageOptions | any) {
    return this.post(`/satisfaction/survey/exportReport`, obj ,{ responseType: 'blob' })
  }

  /*调查表编辑获取详情*/
  public surveyShow(id: string) {
    return this.get(`/satisfaction/survey/show?id=${id}`)
  }
}

export const nurseSatisfactionSurveyService = new NurseSatisfactionSurveyService()
