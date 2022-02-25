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
    return this.post(`/${type}/excel`, obj, { responseType: 'blob', onDownloadProgress })
  }
}

export const statisticsService = new StatisticsService()
