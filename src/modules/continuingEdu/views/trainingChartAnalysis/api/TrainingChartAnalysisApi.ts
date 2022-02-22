import BaseApiService from 'src/services/api/BaseApiService';

export interface QueryIn extends Record<string, any> {
  startDate: string;
  endDate: string;
  deptCode: string;
}
export interface QueryIn2 extends Exclude<QueryIn, 'deptCode'> {
  empNo: string;
}
export default class TrainingChartAnalysisApi extends BaseApiService {
  apiPath: string = 'studyAndTrain/chartStatistical/'
  /**获取全部科室 */
  getDeptList() {
    return this.get(`/user/nursingUnit/all`)
  }
  /** 本人有权限的科室列表 */
  getRoleDeptList() {
    return this.get(`/qcItem/dict/qcWardCodeList`);
  } 
  // 根据科室编号获取用户列表
  getUserListByDeptCode(params: Pick<QueryIn, 'deptCode'>) {
    return this.post(`${this.apiPath}getUserListByDeptCode`, params)
  }
  // 获取全院或科室培训类型的数据 1-1 2-1
  queryStudyType(params: QueryIn): Promise<any> {
    return this.post(`${this.apiPath}getStudyTypeData`, params)
  }
  // 获取全部科室培训类型的数据 1-2
  queryDeptStudyType(params: Exclude<QueryIn, 'deptCode'>): Promise<any> {
    return this.post(`${this.apiPath}getDeptStudyTypeData`, params)
  }
  // 查询个人统计 3-1
  queryPerson(params: Exclude<QueryIn2, 'deptCode'>): Promise<any> {
    return this.post(`${this.apiPath}getPersonStudyTypeData`, params)
  }
  // 查询对应培训人员统计 2-2
  queryParticipants(params: QueryIn): Promise<any> {
    return this.post(`${this.apiPath}getParticipantsData`, params)
  }
}
export const trainingChartAnalysisApi = new TrainingChartAnalysisApi()