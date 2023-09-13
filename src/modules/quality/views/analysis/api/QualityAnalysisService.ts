import BaseApiService from 'src/services/api/BaseApiService'
import qs from 'qs'
import {getDeptAverageScoreIn} from "src/modules/quality/views/qcNursingAnalysis/api";

export default class QualityAnalysisService extends BaseApiService {
  public qcRoleCode() {
    return this.get('/qcItem/dict/qcRoleCode')
  }
  public qcRoleCodeSelf() {
    return this.get('/qcItem/dict/qcRoleCodeSelf')
  }
  public getPage(query: any) {
    return this.post('/qcAnalysis/getPage', query)
  }
  public createReport(params: any) {
    return this.post('/qcAnalysis/createReport', params)
  }

  public push(params: any) {
    return this.post('/qcItem/push/deptNotAuditList', params)
  }
/**江门妇幼--图表数据
 *
 * {
 *     "beginDate": "2023-09-01 00:00:00",
 *     "endDate": "2023-09-30 23:59:59",
 *     "flag": "mz"//住院的填zy，门诊的填mz
 * }
 *
 * **/
public countDeptQc(params: any) {
  return this.post('/qcAnalysis/countDeptQc', params)
}
  /**
   * 获取具体扣分项目列表
   * @param params getDeptAverageScoreIn
   * @returns
   */
  public getSpecificDeductionList(params: getDeptAverageScoreIn) {
    return this.post(`/qcNursingAnalysis/getSpecificDeductionList`, params)
  }
}
