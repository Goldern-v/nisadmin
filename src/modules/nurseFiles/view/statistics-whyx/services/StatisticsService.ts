import BaseApiService from 'src/services/api/BaseApiService'
import { appStore, authStore } from 'src/stores'

export default class StatisticsService extends BaseApiService {
  // /** 按照人员批量审核 */
  // public auditeList(obj: any) {
  //   return this.post(`/auditeNurseFileIndexWH/findNurseFileAudited`, obj)
  // }
  // /** 批量审核质控表 */
  // public batchHandleNode(obj: any) {
  //   return this.post(`/qcItem/instance/batchHandleNode`, obj)
  // }

  /** 统计查询 */
  public getTableData(type: string, obj: any) {
    let data: string[] = 
    ['nurseWHOutStudy', 'nurseWHSpecializNurse', 'nurseWHArticle', 'nurseWHMonograph', 'nurseWHHostScienceCourse', 'nurseWHGoScienceCourse', 'nurseWHScienceResult', 'nurseWHPatent', 'nurseWHLearnJob', 'nurseWHPersonWinning', 'nurseWHContinueStudy' ]
    if (data.includes(type)) return this.post(`/${type}/yaXincount`, obj)
    else if (type === 'auditeNurseListWH') return this.post(`/${type}/yaXinGetByFormCodePC`, obj)
    else return this.post(`/${type}/count`, obj)
  }
  /** 导出 */
  public exportExcel(type: string, obj: any, onDownloadProgress: (ProgressEvent: any) => void) {
    const data = {
      'nurseWHInnovationDept':'countExcel',//科室创新
      'nurseWHQualificationOut':'countExcel',//资质管理（外）
      'nurseWHQualificationIn':'countExcel',//资质管理（内）
      'nurseWHAcademic':'countExcel',//学术活动
      'auditeNurseListWH':'countExcelyaXinGetByFormCodePC',//基本信息
      'nurseWHRegistrationWork':'yaXinCountExcel',//临床护理工作登记
      "nurseWHLearnJob":"yaXinCountExcel",//学会任职
      'nurseWHContinueStudy':'yaXinCountExcel',//举办继续教育培训班
      'nurseWHPersonWinning':'yaXinCountExcel',//个人获奖
      'nurseWHPatent':'yaXinCountExcel',//专利
      'nurseWHScienceResult':'yaXinCountExcel',//科研课题获奖
      'nurseWHGoScienceCourse':'yaXinCountExcel',//参与科研
      'nurseWHHostScienceCourse':'yaXinCountExcel',//主持科研课题
      'nurseWHMonograph':'yaXinCountExcel',//专著
      'nurseWHArticle':'yaXinCountExcel',//文章
      'nurseWHWorkExperienceOut':'yaXinCountExcel',//院外工作经历
      'nurseWHWorkExperienceIn':'yaXinCountExcel',//院内工作经历
      'nurseWHOutStudy':'yaXinCountExcel',//外出进修查询统计
      'nurseWHSpecializNurse':'yaXinCountExcel',//专科护士查询统计
    }
    // return this.post(`/${type}/excel`, obj, { responseType: 'blob', onDownloadProgress })
    return this.post(`/${type}/${data[type]}`, obj, { responseType: 'blob', onDownloadProgress })
  }
}

export const statisticsService = new StatisticsService()
